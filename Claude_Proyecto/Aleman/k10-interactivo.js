/* ══════════════════════════════════════════════════════════════════════════════════════════
   EJERCICIOS INTERACTIVOS — Kapitel 10 (Cenlex Santo Tomás)
   ══════════════════════════════════════════════════════════════════════════════════════════
   Tres tipos, los que de verdad se usan para practicar Perfekt:

     k10Escribir(id, items)      escribir el Partizip II y que se corrija solo al teclear
     k10Opciones(id, items)      elegir entre 2-4 opciones, con el porqué de cada respuesta
     k10Ordenar(id, items)       tocar palabras para armar la frase en el orden correcto
     k10Emparejar(id, pares)     unir dos columnas — reconocer antes de producir
     k10Hueco(id, texto, resp)   Lückentext: huecos dentro de un texto seguido, como en examen
     k10Conjugar(id, verbos)     rellenar las seis personas del Perfekt de un verbo
     k10Test(id, preguntas)      modo examen: una a la vez, con nota, tiempo y repaso de fallos
     k10Dictado(id, items)       escuchar y escribir (comprensión oral)
     k10Hablar(texto)            pronunciar en alemán con la voz del sistema
     k10Altavoces(selector)      poner un botón 🔊 en cada elemento que coincida

   Se corrigen SOLOS mientras escribes, sin botón de "comprobar". La razón es práctica: con un
   botón se acaba escribiendo las diez respuestas a ciegas y revisando al final, que es justo
   como no se aprende. Con corrección inmediata, el error se ve en el momento en que se comete.

   El progreso se guarda en localStorage (`aleman_k10_v1`) para no perder lo hecho al recargar y
   para que el Dashboard pueda leer cuánto se ha practicado.

   Sin dependencias, sin build. Se carga con <script src="k10-interactivo.js">.
   ══════════════════════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const KEY = 'aleman_k10_v1';

  function cargar() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function guardar(id, hechos, total) {
    try {
      const d = cargar();
      d[id] = { hechos: hechos, total: total, fecha: new Date().toISOString().slice(0, 10) };
      localStorage.setItem(KEY, JSON.stringify(d));
    } catch (e) { /* modo privado: el ejercicio sigue funcionando, solo no se recuerda */ }
  }

  /* Comparación tolerante: ignora mayúsculas, espacios de sobra y acepta las grafías que un
     teclado sin teclas alemanas produce (ue/ae/oe/ss por ü/ä/ö/ß). Un acierto real no debe
     marcarse como error solo por cómo está configurado el teclado. */
  function normaliza(s) {
    return String(s).toLowerCase().trim().replace(/\s+/g, ' ')
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
  }
  const acierta = (dado, esperadas) => esperadas.some(e => normaliza(e) === normaliza(dado));

  function barra(cont, hechos, total) {
    let b = cont.querySelector('.k10-prog');
    if (!b) {
      b = document.createElement('div');
      b.className = 'k10-prog';
      b.innerHTML = '<div class="k10-prog-bar"><span></span></div><div class="k10-prog-txt"></div>';
      cont.appendChild(b);
    }
    const pct = total ? Math.round(hechos / total * 100) : 0;
    b.querySelector('span').style.width = pct + '%';
    b.querySelector('.k10-prog-txt').textContent = hechos + ' de ' + total + ' · ' + pct + '%';
    b.classList.toggle('lleno', hechos === total && total > 0);
  }

  /* ── 1. Escribir el Partizip II ──────────────────────────────────────────────────────────── */
  window.k10Escribir = function (id, items) {
    const cont = document.getElementById(id);
    if (!cont) return;
    const estado = new Array(items.length).fill(false);

    items.forEach(function (it, i) {
      const fila = document.createElement('div');
      fila.className = 'k10-ej';
      fila.innerHTML =
        '<span class="k10-ej-n">' + (i + 1) + '</span>' +
        '<span class="k10-ej-inf">' + it.inf + '</span>' +
        '<span class="k10-ej-flecha">→</span>' +
        '<input class="k10-ej-in" type="text" spellcheck="false" autocomplete="off" ' +
        'aria-label="Partizip II de ' + it.inf + '" placeholder="Partizip II">' +
        '<span class="k10-ej-pista">' + (it.pista || '') + '</span>' +
        '<span class="k10-ej-marca"></span>';

      const input = fila.querySelector('.k10-ej-in');
      const marca = fila.querySelector('.k10-ej-marca');

      input.addEventListener('input', function () {
        const v = input.value.trim();
        fila.classList.remove('bien', 'mal');
        marca.textContent = '';
        if (!v) { estado[i] = false; barra(cont, estado.filter(Boolean).length, items.length); return; }
        if (acierta(v, it.resp)) {
          fila.classList.add('bien'); marca.textContent = '✓';
          estado[i] = true;
        } else {
          estado[i] = false;
          // Solo se marca en rojo cuando ya escribió lo suficiente: en mitad de la palabra
          // todavía no es un error, y pintarlo rojo desde la primera letra desanima.
          if (v.length >= Math.min(4, it.resp[0].length)) { fila.classList.add('mal'); marca.textContent = '✗'; }
        }
        const n = estado.filter(Boolean).length;
        barra(cont, n, items.length);
        guardar(id, n, items.length);
      });

      // Pista progresiva: revela la respuesta, pero deja constancia de que se usó
      const ayuda = document.createElement('button');
      ayuda.className = 'k10-ej-ayuda'; ayuda.type = 'button';
      ayuda.textContent = '?'; ayuda.title = 'Ver la respuesta';
      ayuda.addEventListener('click', function () {
        input.value = it.resp[0];
        fila.classList.remove('mal'); fila.classList.add('bien', 'ayudado');
        marca.textContent = '✓';
        estado[i] = true;
        const n = estado.filter(Boolean).length;
        barra(cont, n, items.length); guardar(id, n, items.length);
      });
      fila.appendChild(ayuda);
      cont.appendChild(fila);
    });
    barra(cont, 0, items.length);
  };

  /* ── 2. Elegir entre opciones ────────────────────────────────────────────────────────────── */
  window.k10Opciones = function (id, items) {
    const cont = document.getElementById(id);
    if (!cont) return;
    const estado = new Array(items.length).fill(false);

    items.forEach(function (it, i) {
      const fila = document.createElement('div');
      fila.className = 'k10-q';
      const frase = it.frase.replace('___', '<span class="k10-q-hueco">___</span>');
      fila.innerHTML = '<div class="k10-q-top"><span class="k10-ej-n">' + (i + 1) + '</span>' +
                       '<span class="k10-q-frase">' + frase + '</span></div>' +
                       '<div class="k10-q-ops"></div><div class="k10-q-por"></div>';
      const ops = fila.querySelector('.k10-q-ops');
      const por = fila.querySelector('.k10-q-por');

      it.ops.forEach(function (op, j) {
        const b = document.createElement('button');
        b.className = 'k10-op'; b.type = 'button'; b.textContent = op;
        b.addEventListener('click', function () {
          if (fila.classList.contains('resuelto')) return;
          const bien = j === it.ok;
          b.classList.add(bien ? 'bien' : 'mal');
          if (bien) {
            fila.classList.add('resuelto');
            fila.querySelector('.k10-q-hueco').textContent = op;
            fila.querySelector('.k10-q-hueco').classList.add('lleno');
            estado[i] = true;
            const n = estado.filter(Boolean).length;
            barra(cont, n, items.length); guardar(id, n, items.length);
          }
          // El porqué se muestra acierte o falle: fallar y no saber por qué no enseña nada.
          por.textContent = (bien ? '✓ ' : '✗ ') + it.por;
          por.className = 'k10-q-por visible ' + (bien ? 'bien' : 'mal');
        });
        ops.appendChild(b);
      });
      cont.appendChild(fila);
    });
    barra(cont, 0, items.length);
  };

  /* ── 3. Ordenar la frase ─────────────────────────────────────────────────────────────────
     Para practicar lo que más se falla del Perfekt: dónde va cada pieza. Se toca una palabra
     para ponerla en la línea y se vuelve a tocar para devolverla. */
  window.k10Ordenar = function (id, items) {
    const cont = document.getElementById(id);
    if (!cont) return;
    const estado = new Array(items.length).fill(false);

    items.forEach(function (it, i) {
      const correcta = it.frase;
      const piezas = correcta.split(' ');
      const mezcla = piezas.slice().sort(() => Math.random() - 0.5);

      const fila = document.createElement('div');
      fila.className = 'k10-ord';
      fila.innerHTML = '<div class="k10-ord-top"><span class="k10-ej-n">' + (i + 1) + '</span>' +
                       '<span class="k10-ord-es">' + it.es + '</span></div>' +
                       '<div class="k10-ord-linea"></div><div class="k10-ord-banco"></div>' +
                       '<div class="k10-ord-msg"></div>';
      const linea = fila.querySelector('.k10-ord-linea');
      const banco = fila.querySelector('.k10-ord-banco');
      const msg = fila.querySelector('.k10-ord-msg');

      function revisar() {
        const armada = [...linea.querySelectorAll('.k10-pieza')].map(p => p.textContent).join(' ');
        if (armada.length < correcta.length) { msg.textContent = ''; msg.className = 'k10-ord-msg'; return; }
        const bien = normaliza(armada) === normaliza(correcta);
        msg.textContent = bien ? '✓ ' + correcta : '✗ Revisa el orden: el Partizip II va al final.';
        msg.className = 'k10-ord-msg visible ' + (bien ? 'bien' : 'mal');
        fila.classList.toggle('resuelto', bien);
        estado[i] = bien;
        const n = estado.filter(Boolean).length;
        barra(cont, n, items.length); guardar(id, n, items.length);
      }

      mezcla.forEach(function (w) {
        const p = document.createElement('button');
        p.className = 'k10-pieza'; p.type = 'button'; p.textContent = w;
        p.addEventListener('click', function () {
          (p.parentElement === banco ? linea : banco).appendChild(p);
          revisar();
        });
        banco.appendChild(p);
      });
      cont.appendChild(fila);
    });
    barra(cont, 0, items.length);
  };

  /* ── 4. AUDIO EN ALEMÁN ──────────────────────────────────────────────────────────────────
     Con SpeechSynthesis del navegador: cero dependencias, cero red, y funciona desde file://.
     Para un examen oral, oír la palabra vale más que leerla diez veces. Si el equipo no tiene
     voz alemana instalada, el botón no aparece en vez de leer en español con acento raro. */
  /* getVoices() suele venir VACÍO en la primera llamada: Chrome carga las voces de forma
     asíncrona y avisa después con `voiceschanged`. Decidir "no hay voz alemana" en la primera
     llamada dejaba el dictado desactivado en equipos que sí la tienen. Por eso no se cachea un
     "no": solo se cachea el hallazgo, y quien depende de la voz se apunta a `alLlegarVoz`. */
  let vozDE = null;
  const enEspera = [];
  function buscarVoz() {
    if (vozDE) return vozDE;
    try {
      const vs = (typeof speechSynthesis !== 'undefined' && speechSynthesis.getVoices()) || [];
      vozDE = vs.find(v => /^de[-_]/i.test(v.lang)) || null;
    } catch (e) { vozDE = null; }
    return vozDE;
  }
  function alLlegarVoz(fn) {
    if (buscarVoz()) return fn(vozDE);
    enEspera.push(fn);
  }
  if (typeof speechSynthesis !== 'undefined') {
    speechSynthesis.addEventListener('voiceschanged', function () {
      if (buscarVoz()) { const l = enEspera.splice(0); l.forEach(f => f(vozDE)); }
    });
    // Algunos navegadores no disparan el evento si ya estaban cargadas: se reintenta una vez.
    setTimeout(function () {
      if (buscarVoz()) { const l = enEspera.splice(0); l.forEach(f => f(vozDE)); }
      else { const l = enEspera.splice(0); l.forEach(f => f(null)); }
    }, 1200);
  }

  window.k10Hablar = function (texto, velocidad) {
    if (typeof speechSynthesis === 'undefined') return false;
    const v = buscarVoz();
    if (!v) return false;
    speechSynthesis.cancel();                       // no encolar: interrumpe y dice lo último
    const u = new SpeechSynthesisUtterance(String(texto).replace(/[()·—]/g, ' '));
    u.voice = v; u.lang = v.lang; u.rate = velocidad || 0.9;
    speechSynthesis.speak(u);
    return true;
  };

  /* Pone un botón 🔊 en cada elemento que coincida con el selector. El texto que lee sale del
     atributo data-say si existe, y si no del propio texto del elemento. */
  window.k10Altavoces = function (selector, raiz) {
    if (typeof speechSynthesis === 'undefined') return 0;
    // Se monta solo cuando se confirma que hay voz alemana: un 🔊 que no suena es peor que nada.
    alLlegarVoz(function (v) { if (v) montarAltavoces(selector, raiz); });
    return 0;
  };
  function montarAltavoces(selector, raiz) {
    const base = raiz || document;
    let n = 0;
    base.querySelectorAll(selector).forEach(function (el) {
      if (el.querySelector('.k10-say')) return;
      const b = document.createElement('button');
      b.className = 'k10-say'; b.type = 'button'; b.textContent = '🔊';
      b.title = 'Escuchar en alemán'; b.setAttribute('aria-label', 'Escuchar en alemán');
      b.addEventListener('click', function (ev) {
        ev.preventDefault(); ev.stopPropagation();
        const t = el.getAttribute('data-say') || el.textContent.replace('🔊', '').trim();
        if (!k10Hablar(t)) b.classList.add('mudo');
        else { b.classList.add('sonando'); setTimeout(() => b.classList.remove('sonando'), 900); }
      });
      el.appendChild(b);
      n++;
    });
    return n;
  }

  /* ── 5. EMPAREJAR ────────────────────────────────────────────────────────────────────────
     Dos columnas: se toca una de la izquierda y su pareja de la derecha. Entrena el
     reconocimiento, que es más rápido que la producción y sirve para fijar antes de escribir. */
  window.k10Emparejar = function (id, pares, etiquetas) {
    const cont = document.getElementById(id);
    if (!cont) return;
    const mezcla = a => a.slice().sort(() => Math.random() - 0.5);
    const izq = mezcla(pares.map((p, i) => ({ t: p[0], i: i })));
    const der = mezcla(pares.map((p, i) => ({ t: p[1], i: i })));
    let sel = null, hechos = 0;

    const cab = etiquetas ? '<div class="k10-em-cab"><span>' + etiquetas[0] + '</span><span>' + etiquetas[1] + '</span></div>' : '';
    cont.innerHTML = cab + '<div class="k10-em"><div class="k10-em-col"></div><div class="k10-em-col"></div></div>';
    const [cIzq, cDer] = cont.querySelectorAll('.k10-em-col');

    function pinta(lista, col, lado) {
      lista.forEach(function (o) {
        const b = document.createElement('button');
        b.className = 'k10-em-b'; b.type = 'button'; b.textContent = o.t; b.dataset.i = o.i;
        b.addEventListener('click', function () {
          if (b.classList.contains('ok')) return;
          if (!sel) { limpiaSel(); sel = { b: b, lado: lado, i: o.i }; b.classList.add('sel'); return; }
          if (sel.lado === lado) { limpiaSel(); sel = { b: b, lado: lado, i: o.i }; b.classList.add('sel'); return; }
          if (sel.i === o.i) {
            sel.b.classList.remove('sel'); sel.b.classList.add('ok'); b.classList.add('ok');
            hechos++; barra(cont, hechos, pares.length); guardar(id, hechos, pares.length);
          } else {
            b.classList.add('nope'); sel.b.classList.add('nope');
            const a = sel.b;
            setTimeout(function () { b.classList.remove('nope'); a.classList.remove('nope', 'sel'); }, 550);
          }
          sel = null;
        });
        col.appendChild(b);
      });
    }
    function limpiaSel() { cont.querySelectorAll('.k10-em-b.sel').forEach(x => x.classList.remove('sel')); }
    pinta(izq, cIzq, 'i'); pinta(der, cDer, 'd');
    barra(cont, 0, pares.length);
  };

  /* ── 6. TEXTO CON HUECOS (Lückentext) ────────────────────────────────────────────────────
     El formato de examen: un texto seguido con huecos. Se escribe dentro del propio párrafo,
     que es distinto a una lista de frases sueltas — obliga a leer el contexto. */
  window.k10Hueco = function (id, texto, respuestas) {
    const cont = document.getElementById(id);
    if (!cont) return;
    const partes = texto.split('___');
    const estado = new Array(respuestas.length).fill(false);
    const p = document.createElement('p');
    p.className = 'k10-hueco-txt';

    partes.forEach(function (trozo, i) {
      p.appendChild(document.createTextNode(trozo));
      if (i >= respuestas.length) return;
      const r = respuestas[i];
      const inp = document.createElement('input');
      inp.type = 'text'; inp.className = 'k10-hueco-in'; inp.spellcheck = false;
      inp.autocomplete = 'off';
      inp.placeholder = r.pista || '…';
      inp.style.width = Math.max(70, (r.resp[0].length + 2) * 9) + 'px';
      inp.setAttribute('aria-label', 'Hueco ' + (i + 1));
      inp.addEventListener('input', function () {
        const v = inp.value.trim();
        inp.classList.remove('bien', 'mal');
        if (!v) { estado[i] = false; barra(cont, estado.filter(Boolean).length, respuestas.length); return; }
        if (acierta(v, r.resp)) { inp.classList.add('bien'); estado[i] = true; }
        else { estado[i] = false; if (v.length >= Math.min(4, r.resp[0].length)) inp.classList.add('mal'); }
        const n = estado.filter(Boolean).length;
        barra(cont, n, respuestas.length); guardar(id, n, respuestas.length);
      });
      p.appendChild(inp);
    });
    cont.appendChild(p);
    barra(cont, 0, respuestas.length);
  };

  /* ── 7. CONJUGADOR ───────────────────────────────────────────────────────────────────────
     Rellenar las seis personas del Perfekt de un verbo. Es donde se ve que lo único que cambia
     es el auxiliar: el participio se queda igual las seis veces. */
  window.k10Conjugar = function (id, verbos) {
    const cont = document.getElementById(id);
    if (!cont) return;
    const PRON = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
    const FORMAS = { haben: ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'],
                     sein:  ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'] };
    let idx = 0;

    const sel = document.createElement('div');
    sel.className = 'k10-conj-sel';
    verbos.forEach(function (v, i) {
      const b = document.createElement('button');
      b.className = 'k10-conj-tab' + (i === 0 ? ' on' : ''); b.type = 'button';
      b.textContent = v.inf;
      b.addEventListener('click', function () {
        cont.querySelectorAll('.k10-conj-tab').forEach(x => x.classList.remove('on'));
        b.classList.add('on'); idx = i; pinta();
      });
      sel.appendChild(b);
    });
    const caja = document.createElement('div');
    caja.className = 'k10-conj';
    cont.appendChild(sel); cont.appendChild(caja);

    function pinta() {
      const v = verbos[idx];
      const aux = FORMAS[v.aux];
      caja.innerHTML = '<div class="k10-conj-cab">' + v.inf + ' · <b>' + v.aux + '</b> + ' + v.part +
        ' <span class="k10-conj-es">(' + v.es + ')</span></div>';
      let ok = 0;
      PRON.forEach(function (pr, i) {
        const fila = document.createElement('div');
        fila.className = 'k10-conj-fila';
        fila.innerHTML = '<span class="k10-conj-pron">' + pr + '</span>';
        const inp = document.createElement('input');
        inp.type = 'text'; inp.className = 'k10-conj-in'; inp.spellcheck = false;
        inp.autocomplete = 'off'; inp.placeholder = 'auxiliar';
        inp.setAttribute('aria-label', 'Auxiliar para ' + pr);
        const fin = document.createElement('span');
        fin.className = 'k10-conj-part'; fin.textContent = v.part;
        inp.addEventListener('input', function () {
          const bien = normaliza(inp.value) === normaliza(aux[i]);
          inp.classList.toggle('bien', bien);
          inp.classList.toggle('mal', !bien && inp.value.trim().length >= 2);
          ok = [...caja.querySelectorAll('.k10-conj-in')].filter(x => x.classList.contains('bien')).length;
          barra(cont, ok, 6); guardar(id + '-' + v.inf, ok, 6);
        });
        fila.appendChild(inp); fila.appendChild(fin);
        caja.appendChild(fila);
      });
      const nota = document.createElement('div');
      nota.className = 'k10-conj-nota';
      nota.textContent = 'Fíjate: el participio «' + v.part + '» no cambia ni una vez. Lo único que se conjuga es ' + v.aux + '.';
      caja.appendChild(nota);
      barra(cont, 0, 6);
    }
    pinta();
  };

  /* ── 8. TEST CON PUNTUACIÓN ──────────────────────────────────────────────────────────────
     Modo examen: una pregunta a la vez, sin volver atrás, y nota al final. A diferencia de los
     ejercicios de práctica, aquí NO se explica el fallo hasta el final — así se parece a lo que
     pasa en clase y sirve para medirse de verdad. */
  window.k10Test = function (id, preguntas) {
    const cont = document.getElementById(id);
    if (!cont) return;
    let i = 0, aciertos = 0;
    const fallos = [];
    const t0 = Date.now();

    function pinta() {
      if (i >= preguntas.length) return resultado();
      const q = preguntas[i];
      cont.innerHTML =
        '<div class="k10-test-top"><span class="k10-test-n">Pregunta ' + (i + 1) + ' de ' + preguntas.length + '</span>' +
        '<span class="k10-test-marcador">' + aciertos + ' ✓</span></div>' +
        '<div class="k10-test-bar"><span style="width:' + (i / preguntas.length * 100) + '%"></span></div>' +
        '<div class="k10-test-q">' + q.frase.replace('___', '<span class="k10-q-hueco">___</span>') + '</div>' +
        '<div class="k10-test-ops"></div>';
      const ops = cont.querySelector('.k10-test-ops');
      q.ops.forEach(function (op, j) {
        const b = document.createElement('button');
        b.className = 'k10-op'; b.type = 'button'; b.textContent = op;
        b.addEventListener('click', function () {
          if (j === q.ok) aciertos++;
          else fallos.push({ q: q.frase, dado: op, bien: q.ops[q.ok], por: q.por });
          i++; pinta();
        });
        ops.appendChild(b);
      });
    }

    function resultado() {
      const seg = Math.round((Date.now() - t0) / 1000);
      const pct = Math.round(aciertos / preguntas.length * 100);
      const nivel = pct >= 90 ? ['🏆', 'Listo para el examen', 'bien']
                  : pct >= 70 ? ['👍', 'Casi. Repasa los fallos y repite', 'medio']
                              : ['📚', 'Vuelve a la regla antes de seguir practicando', 'mal'];
      let html = '<div class="k10-test-fin ' + nivel[2] + '">' +
        '<div class="k10-test-nota">' + nivel[0] + ' ' + aciertos + ' / ' + preguntas.length + ' · ' + pct + '%</div>' +
        '<div class="k10-test-msg">' + nivel[1] + '</div>' +
        '<div class="k10-test-t">' + seg + ' segundos</div></div>';
      if (fallos.length) {
        html += '<div class="k10-test-rev"><b>Lo que fallaste:</b>';
        fallos.forEach(function (f) {
          html += '<div class="k10-test-f"><div class="k10-test-fq">' + f.q.replace('___', '<b>' + f.bien + '</b>') + '</div>' +
                  '<div class="k10-test-fp">Pusiste «' + f.dado + '». ' + f.por + '</div></div>';
        });
        html += '</div>';
      }
      html += '<button class="k10-test-otra" type="button">Repetir el test</button>';
      cont.innerHTML = html;
      cont.querySelector('.k10-test-otra').addEventListener('click', function () {
        i = 0; aciertos = 0; fallos.length = 0; pinta();
      });
      guardar(id, aciertos, preguntas.length);
    }
    pinta();
  };

  /* ── 9. DICTADO ──────────────────────────────────────────────────────────────────────────
     Escuchar y escribir. Es lo más parecido a la parte de comprensión oral, y el único
     ejercicio donde no se ve la palabra escrita antes de responder. */
  window.k10Dictado = function (id, items) {
    const cont = document.getElementById(id);
    if (!cont) return;
    cont.innerHTML = '<div class="k10-sin visible">Buscando una voz alemana…</div>';
    alLlegarVoz(function (v) {
      if (!v) {
        cont.innerHTML = '<div class="k10-sin visible">Este ejercicio necesita una voz alemana instalada en el sistema.<br>' +
          'En Windows: <b>Configuración → Hora e idioma → Voz → Agregar voces → Deutsch</b>. ' +
          'Después recarga esta página.</div>';
        return;
      }
      cont.innerHTML = '';
      montarDictado(cont, id, items);
    });
  };
  function montarDictado(cont, id, items) {
    const estado = new Array(items.length).fill(false);
    items.forEach(function (it, i) {
      const fila = document.createElement('div');
      fila.className = 'k10-dic';
      fila.innerHTML = '<span class="k10-ej-n">' + (i + 1) + '</span>' +
        '<button class="k10-dic-play" type="button" title="Escuchar">▶</button>' +
        '<input class="k10-dic-in" type="text" spellcheck="false" autocomplete="off" placeholder="Escribe lo que oyes">' +
        '<span class="k10-dic-es">' + (it.es || '') + '</span><span class="k10-ej-marca"></span>';
      const play = fila.querySelector('.k10-dic-play');
      const inp = fila.querySelector('.k10-dic-in');
      const marca = fila.querySelector('.k10-ej-marca');
      play.addEventListener('click', () => k10Hablar(it.de, 0.85));
      inp.addEventListener('input', function () {
        const v = inp.value.trim();
        fila.classList.remove('bien', 'mal'); marca.textContent = '';
        if (!v) { estado[i] = false; barra(cont, estado.filter(Boolean).length, items.length); return; }
        if (acierta(v, [it.de])) {
          fila.classList.add('bien'); marca.textContent = '✓'; estado[i] = true;
        } else {
          estado[i] = false;
          if (v.length >= it.de.length - 2) { fila.classList.add('mal'); marca.textContent = '✗'; }
        }
        const n = estado.filter(Boolean).length;
        barra(cont, n, items.length); guardar(id, n, items.length);
      });
      cont.appendChild(fila);
    });
    barra(cont, 0, items.length);
  }

  /* Cuánto se ha practicado, para que el Dashboard lo pueda mostrar sin abrir la lección. */
  window.k10Progreso = function () {
    const d = cargar();
    let hechos = 0, total = 0;
    Object.keys(d).forEach(k => { hechos += d[k].hechos || 0; total += d[k].total || 0; });
    return { hechos: hechos, total: total, pct: total ? Math.round(hechos / total * 100) : 0 };
  };
})();
