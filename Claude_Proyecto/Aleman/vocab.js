// ═══════════════════════════════════════════════════════════════════════════
// EL VOCABULARIO DE ALEMÁN — el motor, escrito una sola vez
// ═══════════════════════════════════════════════════════════════════════════
//
// Lo cargan `Aleman/vocabulario.html` (donde Adán trabaja el vocabulario) y la pantalla
// de Alemán del Dashboard (que lo refleja). Antes había 9 funciones en un lado y 8 en el
// otro haciendo lo mismo con nombres distintos, así que un arreglo en una no llegaba a
// la otra. Petición del 2026-09-02: *"quiero un solo diseño, no lo quiero duplicado,
// entonces el principal es el html de aleman"*.
//
// LO QUE EXPORTA
//   vocSeccionesHtml(cats, activa, op)  la tira de secciones
//   vocArbolHtml(cats, abierta, sub, op)  el árbol de secciones y subsecciones
//   vocFiltrosHtml(f, op)               los filtros de nivel y género
//   vocFiltrar(voc, f)                  las palabras que tocan
//   vocPalabrasHtml(lista, op)          la rejilla, con encabezados si procede
//   vocPartizipHtml(partizip)           el tema, con su índice
//   vocVerSeccion(tira)                 trae la sección abierta a la vista (móvil)
//   vocIrA(id, cont) / vocIdxSigue(cont)  el índice del Partizip
//
// El HTML que devuelven usa las clases `.v-*` de `vocab.css`. Ninguna de las dos apps
// define esas clases: si algo se ve distinto entre pantallas, es un token, no una regla.

const VOC_COLOR = { der:'var(--v-der)', die:'var(--v-die)', das:'var(--v-das)',
                    'pl.':'var(--v-pl)' };

function vocEsc(t){
  return String(t == null ? '' : t)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Se compara sin acentos para que "Bucher" encuentre "Bücher" y "aleman" encuentre
// "alemán": escribir los diéresis para buscar es pedirle demasiado a quien está
// aprendiendo justo eso.
function vocNorm(t){
  return String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function vocResaltar(texto, q){
  if(!q) return vocEsc(texto);
  const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
  return vocEsc(texto).replace(re, '<mark>$1</mark>');
}

// ── LA TIRA DE SECCIONES ──────────────────────────────────────────────
// op.fn      nombre de la función que recibe el clic (cada app tiene la suya)
// op.todas   texto del botón "todas"; si falta, no se pinta ese botón
// op.cuenta  cuántas palabras tiene cada sección, para el número
// op.gram    {id, texto} de la pestaña de gramática, si la pantalla la tiene
function vocSeccionesHtml(cats, activa, op){
  op = op || {};
  const fn = op.fn || 'vocSet';
  const cuenta = op.cuenta || function(){ return null; };
  let h = '';
  if(op.todas){
    h += '<button type="button" class="v-sec todas' + (activa === 'all' ? ' on' : '') +
         '" onclick="' + fn + '(\'all\')">' + vocEsc(op.todas) + '</button>';
  }
  h += Object.keys(cats).map(function(k){
    const c = cats[k];
    const n = cuenta(k);
    return '<button type="button" class="v-sec' + (activa === k ? ' on' : '') +
      '" onclick="' + fn + '(\'' + k + '\')">' + c.icon + ' ' + vocEsc(c.label) +
      (n == null ? '' : ' <b>' + n + '</b>') + '</button>';
  }).join('');
  if(op.gram){
    h += '<button type="button" class="v-sec gram' + (activa === op.gram.id ? ' on' : '') +
      '" onclick="' + fn + '(\'' + op.gram.id + '\')">' + vocEsc(op.gram.texto) + '</button>';
  }
  return h;
}

// En el teléfono la tira se desliza y la sección abierta puede quedar fuera de vista.
// Se mueve el scroll de la TIRA y nada más: `scrollIntoView` sube al ancestro con
// scroll más cercano — en el dashboard, el carrusel de pantallas — y dejaba la página
// entera corrida a la izquierda. Y se mide con rectángulos, no con `offsetLeft`, que es
// relativo al ancestro posicionado y hacía que el scroll se pasara hasta saturarse.
function vocVerSeccion(tira){
  const c = (typeof tira === 'string') ? document.getElementById(tira) : tira;
  const b = c && c.querySelector('.v-sec.on');
  if(!b || c.scrollWidth <= c.clientWidth) return;
  const cr = c.getBoundingClientRect(), br = b.getBoundingClientRect();
  c.scrollLeft += (br.left - cr.left) - (cr.width - br.width) / 2;
}

// ── LAS PALABRAS ──────────────────────────────────────────────────
// La búsqueda manda sobre la sección: si escribe algo espera verlo aunque esté en otra
// parte. Mira en alemán, en español y en los ejemplos — buscar "essen" y que no salga
// *Ich habe schon gegessen* es raro cuando el ejemplo está ahí.
//
// `f` es {q, cat, sub, niv, art}: la búsqueda, dónde se está y los filtros. Acepta
// también la forma vieja (voc, q, cat) porque el Dashboard la usaba así.
function vocFiltrar(voc, f, cat){
  if(typeof f === 'string' || f == null) f = { q: f || '', cat: cat };
  const qq = vocNorm((f.q || '').trim());
  return voc.filter(function(w){
    if(f.cat && f.cat !== 'all' && w.cat !== f.cat) return false;
    if(f.sub && w.sub !== f.sub) return false;
    if(f.niv && f.niv !== 'all' && w.niv !== f.niv) return false;
    // El género incluye el plural sin singular: pl. es un género más a la hora de filtrar.
    if(f.art && f.art !== 'all' && (w.art || '-').split('/')[0].trim() !== f.art) return false;
    if(!qq) return true;
    return vocNorm(w.de).indexOf(qq) >= 0 || vocNorm(w.es).indexOf(qq) >= 0
        || vocNorm(w.ex || '').indexOf(qq) >= 0;
  });
}

// ── EL ÁRBOL ─────────────────────────────────────────────────────
// Las 21 secciones; la abierta despliega sus subsecciones. Se pinta entero siempre —
// son 21 filas, no hay nada que ahorrar — y el CSS decide si se ve.
// op.fnSec / op.fnSub  las funciones que reciben el clic
// op.cuenta(cat)       cuántas palabras tiene la sección
// op.subs(cat)         [{id, label, n}] de esa sección
// op.gram              {id, texto} de la pestaña de gramática, si la hay
function vocArbolHtml(cats, abierta, sub, op){
  op = op || {};
  const fnSec = op.fnSec || 'vocSet';
  const fnSub = op.fnSub || 'vocSetSub';
  const FLECHA = '<svg class="v-arbol-fl" viewBox="0 0 24 24" fill="none" stroke="currentColor"'
    + ' stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    + '<path d="M6 9l6 6 6-6"></path></svg>';

  let h = '<div class="v-arbol-t"><span>Secciones</span><span>' +
          Object.keys(cats).length + '</span></div>';

  h += Object.keys(cats).map(function(k){
    const c = cats[k];
    const ab = (k === abierta);
    const n = op.cuenta ? op.cuenta(k) : null;
    let fila = '<button type="button" class="v-arbol-sec' + (ab ? ' abierta' : '') +
      '" onclick="' + fnSec + '(\'' + k + '\')">' +
      '<span class="v-arbol-ico">' + c.icon + '</span>' +
      '<span class="v-arbol-nom">' + vocEsc(c.label) + '</span>' +
      (n == null ? '' : '<span class="v-arbol-n">' + n + '</span>') +
      FLECHA + '</button>';
    if(ab && op.subs){
      const subs = op.subs(k) || [];
      if(subs.length){
        fila += '<div class="v-arbol-subs">' + subs.map(function(x){
          return '<button type="button" class="v-arbol-sub' + (x.id === sub ? ' on' : '') +
            '" onclick="' + fnSub + '(\'' + x.id + '\')">' +
            '<span class="v-arbol-nom">' + vocEsc(x.label) + '</span>' +
            '<span class="v-arbol-n">' + x.n + '</span></button>';
        }).join('') + '</div>';
      }
    }
    return fila;
  }).join('');

  if(op.gram){
    h += '<button type="button" class="v-arbol-sec' + (abierta === op.gram.id ? ' abierta' : '') +
      '" onclick="' + fnSec + '(\'' + op.gram.id + '\')" style="margin-top:10px;' +
      'padding-top:14px;border-top:1px solid var(--v-borde);color:var(--v-gram)">' +
      '<span class="v-arbol-ico">\ud83e\udde9</span>' +
      '<span class="v-arbol-nom">' + vocEsc(op.gram.texto) + '</span></button>';
  }
  return h;
}

// ── LOS FILTROS ────────────────────────────────────────────────
// Nivel y género, que son los dos cortes que se hacen de verdad al estudiar.
function vocFiltrosHtml(f, op){
  op = op || {};
  const fn = op.fn || 'vocFiltro';
  const b = function(clave, val, txt, cls){
    const act = (f[clave] || 'all') === val;
    return '<button type="button" class="v-filtro' + (cls ? ' ' + cls : '') +
      (act ? ' on' : '') + '" onclick="' + fn + '(\'' + clave + '\',\'' + val + '\')">' +
      txt + '</button>';
  };
  return '<span class="v-filtros-t">Nivel</span>' +
    b('niv','all','Todos') + b('niv','A1','A1') + b('niv','A2','A2') + b('niv','B1','B1') +
    '<span class="v-sep"></span>' +
    b('art','all','Todo') + b('art','der','der','der') + b('art','die','die','die') +
    b('art','das','das','das');
}

// La tira de SUBsecciones, para las pantallas donde el árbol no cabe (el slide del
// Dashboard es apaisado y bajo: una barra lateral le quitaría el ancho a las palabras).
// Sale de la sección abierta y lleva su color, para que se vea de dónde cuelga.
function vocSubsHtml(subs, activa, op){
  op = op || {};
  const fn = op.fn || 'vocSetSub';
  if(!subs || !subs.length) return '';
  return '<button type="button" class="v-sub' + (activa ? '' : ' on') +
    '" onclick="' + fn + '(null)">Todas <b>' +
    subs.reduce(function(a, x){ return a + x.n; }, 0) + '</b></button>' +
    subs.map(function(x){
      return '<button type="button" class="v-sub' + (x.id === activa ? ' on' : '') +
        '" onclick="' + fn + '(\'' + x.id + '\')">' + vocEsc(x.label) +
        ' <b>' + x.n + '</b></button>';
    }).join('');
}

// Las migas: dónde estoy, en una línea.
function vocMigasHtml(cat, sub){
  const FL = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"'
    + ' stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    + '<path d="M9 6l6 6-6 6"></path></svg>';
  let h = '<span>' + (cat.icon || '') + '</span><span>' + vocEsc(cat.label) + '</span>';
  if(sub) h += FL + '<b>' + vocEsc(sub) + '</b>';
  return h;
}

function vocPalabraHtml(w, op){
  op = op || {};
  const q = op.q || '';
  const art = (w.art || '-').split('/')[0].trim().toLowerCase();
  const color = VOC_COLOR[art] || 'var(--v-sin)';
  const pil = (w.art && w.art !== '-')
    ? '<span class="v-w-art">' + vocEsc(w.art) + '</span>' : '';
  // Modo estudio: la traducción tapada hasta que se toca. Es una clase y no estilos en
  // línea para que la tarjeta recupere su aspecto sola al volver a pintarse.
  const es = op.estudio
    ? '<span class="v-tapa" onclick="this.classList.add(\'abierta\')" ' +
      'title="Toca para revelar">' + vocEsc(w.es) + '</span>'
    : vocResaltar(w.es, q);
  // La línea técnica. Cada tipo de palabra enseña lo suyo y lo que no tiene no se
  // pinta, así que una preposición no arrastra huecos de verbo.
  const datos = [];
  if(w.pl && w.pl !== '-') datos.push('Pl. <b>' + vocEsc(w.pl) + '</b>');
  else if(w.pl === '-' && w.tipo === 'sust' && !w.tag) datos.push('Pl. <b>\u2014</b>');
  if(w.gen && w.gen !== '-') datos.push('Gen. <b>' + vocEsc(w.gen) + '</b>');
  if(w.conj) datos.push(vocEsc(w.conj).replace(/\u00b7/g, '\u00b7'));
  if(w.aux) datos.push('<b>' + vocEsc(w.aux) + '</b>');
  if(w.comp) datos.push(vocEsc(w.comp));

  let tec = datos.map(function(d){ return '<span class="v-w-dato">' + d + '</span>'; }).join('');
  if(w.reg) tec += '<span class="v-w-reg">' + vocEsc(w.reg) + '</span>';
  if(w.tag) tec += '<span class="v-w-tag' +
    (/irregular|separable|mixto/.test(w.tag) ? ' dif' : '') + '">' + vocEsc(w.tag) + '</span>';

  return '<article class="v-w" style="--c:' + color + '">' +
    '<div class="v-w-top">' + pil + '<span class="v-w-de">' + vocResaltar(w.de, q) + '</span>' +
      (w.niv ? '<span class="v-w-niv">' + vocEsc(w.niv) + '</span>' : '') + '</div>' +
    '<div class="v-w-es">' + es + '</div>' +
    (tec ? '<div class="v-w-tec">' + tec + '</div>' : '') +
    (w.ex ? '<div class="v-w-ex v-w-ex-sep">' + vocResaltar(w.ex, q) +
       (w.esEx ? '<div class="v-w-ex-es">' + vocEsc(w.esEx) + '</div>' : '') + '</div>' : '') +
    (w.uso ? '<div class="v-w-uso">' + vocEsc(w.uso) + '</div>' : '') +
  '</article>';
}

// op.agrupar  pinta un encabezado al cambiar de sección (para la vista "todas")
// op.cats     las secciones, para sacar el nombre y el icono del encabezado
// op.vacio    qué decir cuando no hay ninguna
function vocPalabrasHtml(lista, op){
  op = op || {};
  if(!lista.length){
    return '<div class="v-vacio">' + (op.vacio ||
      'Ninguna palabra con eso. Se busca en alem\u00e1n, en espa\u00f1ol y en los ejemplos.') +
      '</div>';
  }
  const cats = op.cats || {};
  let seccion = null;

  // El agrupado detecta cambios CONSECUTIVOS, así que depende del orden: una palabra
  // suelta al final de la lista repetiría su encabezado a mitad de página. Se ordena
  // por el orden en que las subsecciones están declaradas, que es el del árbol.
  if(op.agrupar){
    const pos = function(w){
      const c = cats[w.cat] || {};
      const ids = Object.keys(c.subs || {});
      const i = ids.indexOf(w.sub);
      return i < 0 ? 999 : i;
    };
    const orden = Object.keys(cats);
    lista = lista.slice().sort(function(a, b){
      const ca = orden.indexOf(a.cat), cb = orden.indexOf(b.cat);
      return ca !== cb ? ca - cb : pos(a) - pos(b);
    });
  }

  return '<div class="v-grid">' + lista.map(function(w){
    let cab = '';
    // Dentro de una sección se agrupa por SUBsección; viendo varias, por sección.
    const clave = op.porSub ? (w.cat + '/' + w.sub) : w.cat;
    if(op.agrupar && clave !== seccion){
      seccion = clave;
      const c = cats[w.cat] || {label:w.cat, icon:'\u2022'};
      const n = lista.filter(function(x){
        return op.porSub ? (x.cat === w.cat && x.sub === w.sub) : x.cat === w.cat;
      }).length;
      const titulo = op.porSub
        ? (((c.subs || {})[w.sub]) || w.sub || 'Sin agrupar')
        : c.label;
      cab = '<div class="v-h">' + (op.porSub ? '' :
              '<span class="v-h-ico">' + c.icon + '</span>') +
            '<span class="v-h-t">' + vocEsc(titulo) + '</span>' +
            '<span class="v-h-n">' + n + ' palabra' + (n !== 1 ? 's' : '') + '</span></div>';
    }
    return cab + vocPalabraHtml(w, op);
  }).join('') + '</div>';
}

// ── PARTIZIP ────────────────────────────────────────────────────────
// Cada bloque puede traer tabla, lista de tres columnas, comparativa, aviso o truco;
// se pinta lo que tenga y nada más. El índice se pinta siempre y el CSS decide si se
// ve: así no hay dos caminos distintos según el ancho de la ventana.
function vocPartizipHtml(P){
  if(!P) return '';
  const idx = '<nav class="v-pz-idx"><div class="v-pz-idx-t">El tema, por partes</div>' +
    P.secciones.map(function(x){
      return '<button type="button" onclick="vocIrA(\'' + x.id + '\')">' +
        '<span>' + x.ico + '</span>' + vocEsc(x.t) + '</button>';
    }).join('') + '</nav>';

  return '<div class="v-pz-wrap"><p class="v-pz-sub">' + P.sub + '</p><div class="v-pz-col">' +
    P.secciones.map(function(x){
      let h = '<section class="v-pz" id="pz-' + x.id + '">' +
        '<div class="v-pz-h"><span class="v-pz-ico">' + x.ico + '</span><h3>' + x.t +
        '</h3></div><div class="v-pz-c">' + x.cuerpo + '</div>';
      if(x.tabla){
        h += '<div class="v-tabla"><table><thead><tr>' +
          x.tabla.cols.map(function(c){ return '<th>' + c + '</th>'; }).join('') +
          '</tr></thead><tbody>' +
          x.tabla.filas.map(function(f){
            return '<tr>' + f.map(function(y){ return '<td>' + y + '</td>'; }).join('') + '</tr>';
          }).join('') + '</tbody></table></div>';
      }
      if(x.lista){
        h += '<div class="v-lst">' + x.lista.map(function(it){
          return '<div class="v-li"><div><div class="v-li-t">' + it[0] + '</div>' +
            '<div class="v-li-d">' + it[1] + '</div></div>' +
            '<div class="v-li-e">' + it[2] + '</div></div>';
        }).join('') + '</div>';
      }
      if(x.comparativa){
        h += '<div class="v-tabla"><table><thead><tr><th>En espa\u00f1ol</th>' +
          '<th>Lo que NO se dice</th><th>Lo que s\u00ed se dice</th></tr></thead><tbody>' +
          x.comparativa.map(function(f){
            return '<tr>' + f.map(function(y){ return '<td>' + y + '</td>'; }).join('') + '</tr>';
          }).join('') + '</tbody></table></div>';
      }
      if(x.aviso) h += '<div class="v-pz-aviso">' + x.aviso + '</div>';
      if(x.truco) h += '<div class="v-pz-truco">' + x.truco + '</div>';
      return h + '</section>';
    }).join('') + '</div>' + idx + '</div>';
}

// Quién se desplaza cambia según la pantalla: en el dashboard es un contenedor con
// scroll propio; en la app de Alemán, la página. `vocCont` guarda cuál, y se mide con
// rectángulos porque `offsetTop` es relativo al ancestro posicionado, que aquí no es el
// contenedor — con él el salto se quedaba un bloque corto.
let vocCont = null;
function vocIdxCont(c){ vocCont = c || null; }

function vocIrA(id){
  const el = document.getElementById('pz-' + id);
  if(!el) return;
  if(vocCont){
    const dif = el.getBoundingClientRect().top - vocCont.getBoundingClientRect().top;
    vocCont.scrollTo({ top: vocCont.scrollTop + dif - 6, behavior:'smooth' });
  } else {
    el.scrollIntoView({ behavior:'smooth', block:'start' });
  }
  vocIdxActivo(id);
}

function vocIdxActivo(id){
  document.querySelectorAll('.v-pz-idx button').forEach(function(b){
    b.classList.toggle('on', b.getAttribute('onclick').indexOf("'" + id + "'") >= 0);
  });
}

// Marca el último bloque que ya cruzó una franja pegada al borde de arriba. La franja
// es estrecha a propósito: con un corte a media altura, recién abierto el tema y sin
// tocar nada, ya se marcaba el segundo bloque.
function vocIdxSigue(){
  const bloques = document.querySelectorAll('.v-pz');
  if(!bloques.length || !document.querySelector('.v-pz-idx')) return;
  const corte = vocCont ? vocCont.getBoundingClientRect().top + 60 : 120;
  let visto = null;
  bloques.forEach(function(b){
    if(b.getBoundingClientRect().top <= corte) visto = b.id.slice(3);
  });
  // Arriba del todo no hay ninguno cruzado y el que se lee es el primero.
  if(!visto) visto = bloques[0].id.slice(3);
  // Y abajo del todo el último nunca llega a cruzar la franja, así que el índice se
  // quedaba señalando el penúltimo con el final del tema ya en pantalla.
  const fin = vocCont
    ? (vocCont.scrollTop + vocCont.clientHeight >= vocCont.scrollHeight - 4)
    : (scrollY + innerHeight >= document.body.scrollHeight - 4);
  if(fin) visto = bloques[bloques.length - 1].id.slice(3);
  vocIdxActivo(visto);
}
