/* ══ lecciones-datos.js — las 41 lecciones de la app de Alemán, en un solo sitio ══════════════════

   Lo leen el inicio (`index.html`), que pinta con esto sus tarjetas del Kapitel 10, A2 y A1, y Mi Día
   del Dashboard, que enseña en «Hoy aprendes» la lección que toca y la abre en su ventana. Desde
   file:// ninguna página puede abrir otra para leerla: sin este archivo el Dashboard no sabría qué
   lección toca, y la regla viviría escrita dos veces. Corregir una lección aquí la corrige en los dos.

   UNA LECCIÓN
     id       'k10-01', 'a2-07'… — el principio del nombre de su página
     href     su página
     num      cómo se cita: 'K10 · 01', 'A2 · 07'
     de / es  el título en alemán y lo que enseña, en español
     tags     lo que se ve en ella, en una línea
     desc     (Kapitel) la descripción larga del inicio
     parte    (A2) Gramática o Temas: las dos listas del inicio
     foto     en fotos/, la misma del encabezado de su página; `alt` y `credito` (autor · sitio · licencia)
     bloques  (Kapitel) sus ejercicios: los `k10…('id'` de su página; un k10Conjugar va como `id:n`, con
              sus n verbos. Con ellos se cuenta lo que llevas; el control 25 del verificador los compara
              con la página.

   AÑADIR UNA LECCIÓN es una entrada más en `lista`, en su lugar: cada grupo va en el orden del inicio,
   que es el de Coach. Las del Kapitel van en el orden en que conviene estudiarlas, no en el de su número.
   ══════════════════════════════════════════════════════════════════════════════════════════════════ */
const ALEMAN_LECCIONES = {
  // Los grupos, en el orden de Coach: el Kapitel que Adán cursa en clase, el A2 que pide Esslingen y el
  // A1 de base. Un Kapitel nuevo es un grupo más, arriba, con su número en `kapitel`; `repaso` es lo que
  // toca cuando ya está completo.
  grupos: [
    { id: 'k10', label: 'Kapitel 10', kapitel: 10, repaso: { id: 'k10-03', ancla: 'minitest' } },
    { id: 'a2', label: 'A2' },
    { id: 'a1', label: 'A1' },
  ],

  lista: [
    // Kapitel 10 · lo que cursa en clase, en el orden en que conviene estudiarlo
    { id: 'k10-01', href: 'k10-01-perfekt-regel.html', num: 'K10 · 01', de: 'Die Regel: Perfekt', es: 'La regla del pasado (Perfekt)',
      tags: 'haben/sein · Partizip II · al final',
      desc: 'La fórmula del Perfekt: haben o sein y el Partizip II al final, con modales, negación y subordinadas.',
      foto: 'k10-01.jpg', alt: 'Cuaderno de estudio con unos lentes y un esquema en rojo', credito: 'Daria Nepriakhina · Stocksnap · CC0 1.0',
      bloques: ['ej-partizip', 'ej-auxiliar', 'em-part', 'conj-perfekt:5', 'hueco-1', 'ej-praeteritum-vs', 'ej-modales', 'ej-negacion', 'ord-sub', 'hueco-tiempo'] },
    { id: 'k10-06', href: 'k10-06-partizip.html', num: 'K10 · 06', de: 'Partizip I & II', es: 'Los dos participios, a fondo',
      tags: 'lesend vs. gelesen · 205 verbos · declinación',
      desc: 'Partizip I y II frente a frente: cómo se forma cada uno, para qué sirve y cómo se declina.',
      foto: 'k10-06.jpg', alt: 'Una persona lee un libro', credito: 'Shopify · Stocksnap · CC0 1.0',
      bloques: ['ej-p1', 'ej-cual', 'ej-decl', 'em-pz', 'hueco-pz'] },
    { id: 'k10-02', href: 'k10-02-verben-liste.html', num: 'K10 · 02', de: 'Verbenliste', es: 'Tabla a memorizar: 207 verbos',
      tags: 'Präteritum · Partizip II · filtros',
      desc: 'Los 207 verbos con sus cuatro formas, los patrones de vocal y los que engañan.',
      foto: 'k10-02.jpg', alt: 'Un montón de tarjetas escritas a mano', credito: 'muninn.net · Flickr · BY 2.0',
      bloques: ['ej-prateritum', 'ej-partizip2', 'em-prat', 'dic-verbos', 'ej-3p'] },
    { id: 'k10-03', href: 'k10-03-perfekt-uben.html', num: 'K10 · 03', de: 'Perfekt üben', es: 'Practicar el pasado: ejercicios y dos minitests',
      tags: '6 bloques · 2 minitests · se corrige solo',
      desc: 'Seis bloques de práctica del Perfekt y dos minitests con nota. Se corrigen solos mientras escribes.',
      foto: 'k10-03.jpg', alt: 'Hoja de respuestas de un examen con un lápiz', credito: 'albertogp123 · Flickr · BY 2.0',
      bloques: ['u1', 'u2', 'u3', 'u4', 'minitest', 'hueco-fds', 'test-final', 'test-2', 'u5', 'u6-dic'] },
    { id: 'k10-04', href: 'k10-04-berufe.html', num: 'K10 · 04', de: 'Berufe', es: 'Profesiones y tu área',
      tags: 'sin artículo · -in · Testingenieur',
      desc: 'Profesiones con su femenino, tu área, lugares y condiciones de trabajo, y las cinco preguntas del oral.',
      foto: 'k10-04.jpg', alt: 'Un técnico conecta cables de red en un rack', credito: 'Field Engineer · Stocksnap · CC0 1.0',
      bloques: ['ej-berufe', 'ord-berufe', 'em-berufe', 'hueco-beruf', 'ej-prep', 'hueco-entrev', 'em-cond'] },
    { id: 'k10-05', href: 'k10-05-mein-tag.html', num: 'K10 · 05', de: 'Mein Tag', es: 'Contar tu día (video)',
      tags: 'zuerst/dann · tu rutina · guion',
      desc: 'Tu rutina con conectores, en presente y en Perfekt, y el guion para grabar tu video.',
      foto: 'k10-05.jpg', alt: 'Desayuno con café y cruasanes', credito: 'JESHOOTS.com · Stocksnap · CC0 1.0',
      bloques: ['mt-ej', 'mt-ord', 'hueco-tag', 'dic-tag', 'ej-hora', 'em-frec', 'ej-sep'] },

    // A2 · el nivel que pide Esslingen: 12 de gramática y 8 de temas
    { id: 'a2-01', href: 'a2-01-modalverben.html', num: 'A2 · 01', de: 'Modalverben', es: 'Verbos modales',
      tags: 'können · müssen · wollen', parte: 'Gramática',
      foto: 'a2-01.jpg', alt: 'Una mujer toca la guitarra', credito: 'Negative Space · Stocksnap · CC0 1.0' },
    { id: 'a2-02', href: 'a2-02-perfekt-haben.html', num: 'A2 · 02', de: 'Perfekt mit haben', es: 'Pasado con haben',
      tags: 'ich habe gemacht · Partizip II', parte: 'Gramática',
      foto: 'a2-02.jpg', alt: 'Panquecitos de chocolate recién horneados', credito: 'Pawel Kadysz · Stocksnap · CC0 1.0' },
    { id: 'a2-03', href: 'a2-03-perfekt-sein.html', num: 'A2 · 03', de: 'Perfekt mit sein', es: 'Pasado con sein',
      tags: 'ich bin gegangen · Bewegung', parte: 'Gramática',
      foto: 'a2-03.jpg', alt: 'Excursionistas caminan por un sendero', credito: 'Austin Ban · Stocksnap · CC0 1.0' },
    { id: 'a2-04', href: 'a2-04-prateritum.html', num: 'A2 · 04', de: 'Präteritum', es: 'Pasado simple (escrito)',
      tags: 'war · hatte · konnte', parte: 'Gramática',
      foto: 'a2-04.jpg', alt: 'Una máquina de escribir sobre una mesa de madera', credito: 'Dustin Lee · Stocksnap · CC0 1.0' },
    { id: 'a2-05', href: 'a2-05-verbos-separables.html', num: 'A2 · 05', de: 'Trennbare Verben', es: 'Verbos separables',
      tags: 'aufstehen · anrufen · mitkommen', parte: 'Gramática',
      foto: 'a2-05.jpg', alt: 'Un teléfono antiguo en una cabina roja', credito: 'Antoine Barrès · Stocksnap · CC0 1.0' },
    { id: 'a2-06', href: 'a2-06-verbos-reflexivos.html', num: 'A2 · 06', de: 'Reflexive Verben', es: 'Verbos reflexivos',
      tags: 'sich freuen · sich waschen', parte: 'Gramática',
      foto: 'a2-06.jpg', alt: 'Unas manos bajo el chorro de la llave', credito: 'Catt Liu · Stocksnap · CC0 1.0' },
    { id: 'a2-07', href: 'a2-07-kasus.html', num: 'A2 · 07', de: 'Kasus: Nom., Akk., Dat.', es: 'Casos gramaticales',
      tags: 'der/den/dem · Subjekt · Objekt', parte: 'Gramática',
      foto: 'a2-07.jpg', alt: 'Unas manos ofrecen un regalo', credito: 'Ben White · Stocksnap · CC0 1.0' },
    { id: 'a2-08', href: 'a2-08-komparativ.html', num: 'A2 · 08', de: 'Komparativ & Superlativ', es: 'Comparativo y superlativo',
      tags: 'größer · am größten · als', parte: 'Gramática',
      foto: 'a2-08.jpg', alt: 'Matrioskas de mayor a menor', credito: 'archer10 (Dennis) · Flickr · BY-SA 2.0' },
    { id: 'a2-09', href: 'a2-09-konjunktionen.html', num: 'A2 · 09', de: 'Konjunktionen', es: 'Conjunciones y conectores',
      tags: 'weil · dass · wenn · obwohl', parte: 'Gramática',
      foto: 'a2-09.jpg', alt: 'Fichas de letras que forman una frase', credito: 'Words as Pictures · Stocksnap · CC0 1.0' },
    { id: 'a2-10', href: 'a2-10-preposiciones.html', num: 'A2 · 10', de: 'Präpositionen', es: 'Preposiciones + casos',
      tags: 'in/an/auf · Wechselpräp.', parte: 'Gramática',
      foto: 'a2-10.jpg', alt: 'Un gato dentro de una caja', credito: 'bnilsen · Flickr · BY-SA 2.0' },
    { id: 'a2-11', href: 'a2-11-adjetivos.html', num: 'A2 · 11', de: 'Adjektivdeklination', es: 'Declinación de adjetivos',
      tags: 'ein großer Mann · Endungen', parte: 'Gramática',
      foto: 'a2-11.jpg', alt: 'Un perro con un gorro de fiesta rojo', credito: 'Shopify · Stocksnap · CC0 1.0' },
    { id: 'a2-12', href: 'a2-12-infinitiv.html', num: 'A2 · 12', de: 'Infinitiv mit zu', es: 'Infinitivo con zu',
      tags: 'Es ist schön, Deutsch zu lernen · versuchen zu', parte: 'Gramática',
      foto: 'a2-12.jpg', alt: 'Una persona escala una pared de roca', credito: 'Tommy Lisbin · Stocksnap · CC0 1.0' },
    { id: 'a2-13', href: 'a2-13-wohnen.html', num: 'A2 · 13', de: 'Wohnen & Haushalt', es: 'Vivienda y hogar',
      tags: 'Miete · Kühlschrank · Nachbar', parte: 'Temas',
      foto: 'a2-13.jpg', alt: 'La fachada de un edificio de departamentos', credito: 'Roman Kraft · Stocksnap · CC0 1.0' },
    { id: 'a2-14', href: 'a2-14-arbeit.html', num: 'A2 · 14', de: 'Arbeit & Beruf', es: 'Trabajo y carrera',
      tags: 'Gehalt · Kollege · Bewerbung', parte: 'Temas',
      foto: 'a2-14.jpg', alt: 'Una entrevista de trabajo', credito: 'amtec_photos · Flickr · BY-SA 2.0' },
    { id: 'a2-15', href: 'a2-15-gesundheit.html', num: 'A2 · 15', de: 'Gesundheit & Körper', es: 'Salud y cuerpo humano',
      tags: 'Schmerzen · Arzt · Apotheke', parte: 'Temas',
      foto: 'a2-15.jpg', alt: 'Un estetoscopio junto a un teléfono', credito: 'Negative Space · Stocksnap · CC0 1.0' },
    { id: 'a2-16', href: 'a2-16-reisen.html', num: 'A2 · 16', de: 'Reisen & Tourismus', es: 'Viajes y turismo',
      tags: 'Flug · Hotel · Ausflug', parte: 'Temas',
      foto: 'a2-16.jpg', alt: 'Maletas antiguas apiladas', credito: 'Mike Birdy · Stocksnap · CC0 1.0' },
    { id: 'a2-17', href: 'a2-17-freizeit.html', num: 'A2 · 17', de: 'Freizeit & Hobbys', es: 'Tiempo libre y aficiones',
      tags: 'Kino · Sport · Musik', parte: 'Temas',
      foto: 'a2-17.jpg', alt: 'La marquesina iluminada de un cine', credito: 'Nathan Engel · Stocksnap · CC0 1.0' },
    { id: 'a2-18', href: 'a2-18-essen.html', num: 'A2 · 18', de: 'Essen, Trinken & Kochen', es: 'Gastronomía y cocina',
      tags: 'Rezept · Restaurant · bestellen', parte: 'Temas',
      foto: 'a2-18.jpg', alt: 'Ingredientes para cocinar pasta', credito: 'JESHOOTS.com · Stocksnap · CC0 1.0' },
    { id: 'a2-19', href: 'a2-19-einkaufen.html', num: 'A2 · 19', de: 'Einkaufen & Preise', es: 'Compras y precios',
      tags: 'Supermarkt · Rabatt · bezahlen', parte: 'Temas',
      foto: 'a2-19.jpg', alt: 'El pasillo de un supermercado', credito: 'Simon Shek · Flickr · BY 2.0' },
    { id: 'a2-20', href: 'a2-20-medien.html', num: 'A2 · 20', de: 'Medien & Technologie', es: 'Medios y tecnología',
      tags: 'Internet · Handy · Nachrichten', parte: 'Temas',
      foto: 'a2-20.jpg', alt: 'Una mano con un celular y un café', credito: 'JESHOOTS.com · Stocksnap · CC0 1.0' },

    // A1 · la base, para repasar cuando algo no sale
    { id: 'a1-01', href: 'a1-01-saludos.html', num: 'A1 · 01', de: 'Begrüßungen', es: 'Saludos y despedidas',
      tags: 'Hallo · Tschüss · Guten Morgen',
      foto: 'a1-01.jpg', alt: 'Dos personas se dan la mano', credito: 'Matt Moloney · Stocksnap · CC0 1.0' },
    { id: 'a1-02', href: 'a1-02-zahlen.html', num: 'A1 · 02', de: 'Zahlen 1–100', es: 'Números del 1 al 100',
      tags: 'eins · zehn · hundert',
      foto: 'a1-02.jpg', alt: 'Buzones con su número', credito: 'Mathyas Kurmann · Stocksnap · CC0 1.0' },
    { id: 'a1-03', href: 'a1-03-farben.html', num: 'A1 · 03', de: 'Farben & Formen', es: 'Colores y formas',
      tags: 'rot · blau · groß',
      foto: 'a1-03.jpg', alt: 'Lápices de colores', credito: 'Artsy Crafty · Stocksnap · CC0 1.0' },
    { id: 'a1-04', href: 'a1-04-wochentage.html', num: 'A1 · 04', de: 'Wochentage & Monate', es: 'Días de la semana y meses',
      tags: 'Montag · Januar · heute',
      foto: 'a1-04.jpg', alt: 'Un calendario de escritorio', credito: 'Jeff Sheldon · Stocksnap · CC0 1.0' },
    { id: 'a1-05', href: 'a1-05-familie.html', num: 'A1 · 05', de: 'Familie', es: 'La familia',
      tags: 'Mutter · Vater · Bruder',
      foto: 'a1-05.jpg', alt: 'Una familia juega en la sala', credito: 'Direct Media · Stocksnap · CC0 1.0' },
    { id: 'a1-06', href: 'a1-06-artikel.html', num: 'A1 · 06', de: 'Artikel: der, die, das', es: 'Los artículos alemanes',
      tags: 'der Mann · die Frau · das Kind',
      foto: 'a1-06.jpg', alt: 'Figuras de juguete: un hombre, una mujer y un niño', credito: 'Steinar Engeland · Stocksnap · CC0 1.0' },
    { id: 'a1-07', href: 'a1-07-pronomen.html', num: 'A1 · 07', de: 'Personalpronomen', es: 'Pronombres personales',
      tags: 'ich · du · er/sie/es',
      foto: 'a1-07.jpg', alt: 'Un grupo de amigos platica en una mesa', credito: 'Brodie Vissers · Stocksnap · CC0 1.0' },
    { id: 'a1-08', href: 'a1-08-sein-haben.html', num: 'A1 · 08', de: 'Verben: sein & haben', es: 'Los verbos ser/estar y tener',
      tags: 'ich bin · du hast · er ist',
      foto: 'a1-08.jpg', alt: 'Un gafete que dice «Hi, my name is»', credito: 'EvelynGiggles · Flickr · BY 2.0' },
    { id: 'a1-09', href: 'a1-09-uhrzeit.html', num: 'A1 · 09', de: 'Uhrzeit', es: 'Decir la hora',
      tags: 'Wie spät ist es? · halb · Uhr',
      foto: 'a1-09.jpg', alt: 'Un reloj de pared sobre fondo rojo', credito: 'Freestocks.org · Stocksnap · CC0 1.0' },
    { id: 'a1-10', href: 'a1-10-laender.html', num: 'A1 · 10', de: 'Länder & Nationalitäten', es: 'Países y nacionalidades',
      tags: 'Deutschland · Mexiko · ich komme aus',
      foto: 'a1-10.jpg', alt: 'Una mano sostiene un globo terráqueo', credito: 'Porapak Apichodilok · Stocksnap · CC0 1.0' },
    { id: 'a1-11', href: 'a1-11-berufe.html', num: 'A1 · 11', de: 'Berufe', es: 'Profesiones',
      tags: 'Arzt · Lehrer · Ingenieur',
      foto: 'a1-11.jpg', alt: 'Un médico con una tableta', credito: 'Direct Media · Stocksnap · CC0 1.0' },
    { id: 'a1-12', href: 'a1-12-essen.html', num: 'A1 · 12', de: 'Essen & Trinken', es: 'Comida y bebida básica',
      tags: 'Brot · Wasser · Bier',
      foto: 'a1-12.jpg', alt: 'Canastas de pan en una panadería', credito: 'Drew Coffman · Stocksnap · CC0 1.0' },
    { id: 'a1-13', href: 'a1-13-wohnen.html', num: 'A1 · 13', de: 'Wohnen: Grundlagen', es: 'Vivienda básica',
      tags: 'Haus · Zimmer · Küche',
      foto: 'a1-13.jpg', alt: 'Una sala con sillones amarillos', credito: 'Dan Gold · Stocksnap · CC0 1.0' },
    { id: 'a1-14', href: 'a1-14-verkehr.html', num: 'A1 · 14', de: 'Verkehr & Richtungen', es: 'Transportes y direcciones',
      tags: 'links · rechts · U-Bahn',
      foto: 'a1-14.jpg', alt: 'Un tren del metro llega al andén', credito: 'Negative Space · Stocksnap · CC0 1.0' },
    { id: 'a1-15', href: 'a1-15-hobbys.html', num: 'A1 · 15', de: 'Hobbys & Freizeit', es: 'Pasatiempos básicos',
      tags: 'lesen · spielen · Sport',
      foto: 'a1-15.jpg', alt: 'Un balón de futbol en el pasto de un estadio', credito: 'Michal Jarmoluk · Stocksnap · CC0 1.0' },
  ],

  // ── Consultas ─────────────────────────────────────────────
  grupoDe: function (l) { return String((l && l.id) || '').replace(/-\d+$/, ''); },
  grupo: function (id) { return this.grupos.filter(function (g) { return g.id === id; })[0] || null; },
  // Una lección por su id o por su página (con o sin carpeta y ancla).
  por: function (x) {
    const k = String(x || '').split('#')[0].split('/').pop();
    return this.lista.filter(function (l) { return l.id === k || l.href === k; })[0] || null;
  },
  delGrupo: function (g) {
    const self = this;
    return this.lista.filter(function (l) { return self.grupoDe(l) === g; });
  },
  // El Kapitel que se ve en clase y tiene lecciones aquí: el de `kapitelAleman` del maestro o, si ese
  // todavía no tiene lecciones, el último que sí.
  kapitel: function (n) {
    const ks = this.grupos.filter(function (g) { return g.kapitel; });
    if (n == null && typeof window !== 'undefined' && window.CIFRAS && window.CIFRAS.PROYECTO) n = window.CIFRAS.PROYECTO.kapitelAleman;
    const hasta = ks.filter(function (g) { return !n || g.kapitel <= n; });
    return (hasta.length ? hasta : ks).slice().sort(function (a, b) { return b.kapitel - a.kapitel; })[0] || null;
  },
  // El orden de Coach que recorre «Siguiente»: el Kapitel en curso y después lo demás, en el orden de la lista.
  orden: function () {
    const k = this.kapitel(), del = k ? this.delGrupo(k.id) : [];
    return del.concat(this.lista.filter(function (l) { return del.indexOf(l) === -1; }));
  },

  // ── Lo que llevas ─────────────────────────────────────────
  // k10-interactivo.js guarda cada ejercicio en `aleman_k10_v1` como {hechos, total, fecha}: uno está
  // completo cuando tiene todos sus reactivos bien. Un k10Conjugar guarda uno por verbo (`id-verbo`) y
  // cuenta completo con sus n verbos bien. Las fechas van en fecha local ('AAAA-MM-DD').
  CLAVE: 'aleman_k10_v1',
  datos: function () {
    try { return JSON.parse(localStorage.getItem(this.CLAVE)) || {}; } catch (e) { return {}; }
  },
  // Lo que llevas de una lección con ejercicios; `null` si no guarda avance (las de A2 y A1).
  avance: function (l, datos) {
    if (!l || !l.bloques) return null;
    datos = datos || {};
    const completo = function (r) { return !!r && r.total > 0 && r.hechos >= r.total; };
    const ej = l.bloques.map(function (spec) {
      const p = spec.split(':'), id = p[0], n = +p[1] || 0;
      if (!n) { const r = datos[id]; return { hecho: completo(r), tocado: !!r, fecha: (r && r.fecha) || '' }; }
      let bien = 0, tocado = false, fecha = '';
      Object.keys(datos).forEach(function (k) {
        if (k.indexOf(id + '-') !== 0) return;
        tocado = true;
        if (completo(datos[k])) bien++;
        if ((datos[k].fecha || '') > fecha) fecha = datos[k].fecha;
      });
      return { hecho: bien >= n, tocado: tocado, fecha: fecha };
    });
    const hechos = ej.filter(function (x) { return x.hecho; }).length;
    return {
      total: ej.length, hechos: hechos,
      tocados: ej.filter(function (x) { return x.tocado; }).length,
      fecha: ej.reduce(function (m, x) { return x.fecha > m ? x.fecha : m; }, ''),
      pct: ej.length ? Math.round(hechos / ej.length * 100) : 0,
    };
  },
  // El último ejercicio guardado, de cualquier lección.
  ultimo: function (datos) {
    datos = datos || {};
    return Object.keys(datos).reduce(function (m, k) { const f = (datos[k] && datos[k].fecha) || ''; return f > m ? f : m; }, '');
  },

  // ── Qué toca hoy: una sola regla para el inicio y para Mi Día ─────
  // La lección del Kapitel que practicaste por última vez y no has terminado; si no hay, la primera sin
  // terminar en el orden del Kapitel; con todo hecho, su repaso (el minitest de K10·03) para no perderlo.
  // Si Adán eligió otra con «‹» o «Siguiente» en la ventana de Mi Día —o la abrió desde una lección—, va
  // la suya hasta que elija otra o vuelva a la del plan con «↺», aunque ya la haya terminado (también se
  // elige para repasar); `rec` sigue diciendo la del plan. La elección vive en `aleman_leccion_v1`.
  CLAVE_ELECCION: 'aleman_leccion_v1',
  eleccion: function () {
    try { return (JSON.parse(localStorage.getItem(this.CLAVE_ELECCION)) || {}).id || null; } catch (e) { return null; }
  },
  elegir: function (id) {
    try {
      if (id) localStorage.setItem(this.CLAVE_ELECCION, JSON.stringify({ id: id }));
      else localStorage.removeItem(this.CLAVE_ELECCION);
    } catch (e) { /* sin almacenamiento, la elección dura lo que la página */ }
  },
  queToca: function (datos, eleccion) {
    datos = datos || this.datos();
    if (eleccion === undefined) eleccion = this.eleccion();
    const self = this, k = this.kapitel(), lecs = k ? this.delGrupo(k.id) : [];
    const av = lecs.map(function (l, orden) { return { l: l, orden: orden, a: self.avance(l, datos) }; });
    const enCurso = av.filter(function (x) { return x.a.tocados && x.a.hechos < x.a.total; })
      .sort(function (a, b) { return a.a.fecha < b.a.fecha ? 1 : a.a.fecha > b.a.fecha ? -1 : a.orden - b.orden; })[0];
    const pendiente = av.filter(function (x) { return x.a.hechos < x.a.total; })[0];
    const alguna = av.some(function (x) { return x.a.tocados; });
    let rec;
    if (enCurso) rec = { l: enCurso.l, ceja: 'Sigue donde te quedaste', boton: 'Continuar la lección →' };
    else if (pendiente && alguna) rec = { l: pendiente.l, ceja: 'La siguiente lección', boton: 'Empezar la lección →' };
    else if (pendiente) rec = { l: pendiente.l, ceja: 'Empieza el ' + k.label, boton: 'Empezar la lección →' };
    else if (lecs.length) {
      const r = k.repaso || {};
      rec = { l: this.por(r.id) || lecs[0], ceja: k.label + ' completo', boton: 'Repasar con el minitest →', ancla: r.ancla };
    } else rec = { l: this.lista[0], ceja: 'Empieza aquí', boton: 'Empezar la lección →' };
    rec.href = rec.l.href + (rec.ancla ? '#' + rec.ancla : '');
    rec.avance = this.avance(rec.l, datos);
    rec.elegida = false;
    rec.rec = rec;
    const e = eleccion ? this.por(eleccion) : null;
    if (e && e !== rec.l)
      return { l: e, ceja: 'Elegida por ti', boton: 'Abrir la lección →', href: e.href, avance: this.avance(e, datos), elegida: true, rec: rec };
    return rec;
  },
};

if (typeof module !== 'undefined' && module.exports) module.exports = ALEMAN_LECCIONES;
