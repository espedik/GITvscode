/* ══════════════════════════════════════════════════════════════════════════════════════════
   EJERCICIOS INTERACTIVOS — Kapitel 10 (Cenlex Santo Tomás)
   ══════════════════════════════════════════════════════════════════════════════════════════
   Tres tipos, los que de verdad se usan para practicar Perfekt:

     k10Escribir(id, items)   escribir el Partizip II y que se corrija solo al teclear
     k10Opciones(id, items)   elegir entre 2-4 opciones, con el porqué de cada respuesta
     k10Ordenar(id, items)    arrastrar/tocar palabras para armar la frase en el orden correcto

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

  /* Cuánto se ha practicado, para que el Dashboard lo pueda mostrar sin abrir la lección. */
  window.k10Progreso = function () {
    const d = cargar();
    let hechos = 0, total = 0;
    Object.keys(d).forEach(k => { hechos += d[k].hechos || 0; total += d[k].total || 0; });
    return { hechos: hechos, total: total, pct: total ? Math.round(hechos / total * 100) : 0 };
  };
})();
