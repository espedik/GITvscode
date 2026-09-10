// ─── APP: navegación, render y checklist de compra ────────────────────────────
const KEY = 'vestimenta_v1';
let S = { marcados: [], color: [] };
const save = () => { localStorage.setItem(KEY, JSON.stringify(S));
  // La cabecera lleva el contador de prendas: se repinta al marcar una.
  if (typeof cpCabVest === 'function') cpCabVest(); };
const load = () => { try { const d = localStorage.getItem(KEY); if (d) S = { ...S, ...JSON.parse(d) }; } catch(e){}
  if (!Array.isArray(S.color)) S.color = []; };
load();

const SECS = ['comose','hoy','closet','comprar','colorimetria','combinaciones','capas','reglas','basicos','chaquetas','zapatos','accesorios','ejercicio','bodas'];
const STITLE = {
  comose:'Cómo se usa', hoy:'Hoy', closet:'Mi clóset', comprar:'Qué comprar',
  basicos:'👕 Básicos', chaquetas:'🧥 Chaquetas', zapatos:'👞 Zapatos', accesorios:'⌚ Accesorios',
  colorimetria:'🎨 Colorimetría', combinaciones:'🧩 Combinaciones', capas:'Capas y zapatos', reglas:'Las reglas', ejercicio:'🏋️ Ejercicio', bodas:'💍 Bodas'
};

let secActual = 'hoy';

function nav(s) {
  secActual = s;
  document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.getAttribute('onclick') === `nav('${s}')`));
  document.getElementById('topTitle').textContent = STITLE[s];
  document.getElementById('content-root').innerHTML = RENDERS[s]();
  window.scrollTo(0,0);
  document.getElementById('sidebar')?.classList.remove('open');
}

function toggleCheck(id) {
  const i = S.marcados.indexOf(id);
  if (i === -1) S.marcados.push(id); else S.marcados.splice(i,1);
  save();
  document.getElementById('card-'+id)?.classList.toggle('checked');
  updateCounter();
}
function updateCounter() {
  const total = BASICOS.length + CHAQUETAS.length + ZAPATOS.length + ACCESORIOS.length;
  const el = document.getElementById('checkCounter');
  if (el) el.textContent = `${S.marcados.length}/${total}`;
}

function itemCard(it) {
  const checked = S.marcados.includes(it.id);
  return `<div class="item-card${checked?' checked':''}" id="card-${it.id}">
    <div class="item-body">
      <h3>${it.nombre}</h3>
      <div class="item-use">${it.uso}</div>
      <div class="buy-list">${it.compra.map(c=>`<div class="buy-opt"><span class="store">${c.u?`<a href="${c.u}" target="_blank" rel="noopener">${c.t} ↗</a>`:c.t}</span><span class="price">${c.p}</span></div>`).join('')}</div>
      <div class="item-tip">💡 ${it.tip}</div>
      <label class="item-check"><input type="checkbox" ${checked?'checked':''} onchange="toggleCheck('${it.id}')"><span>Ya lo tengo / lo quiero comprar</span></label>
    </div>
  </div>`;
}

// ─── Combos por ocasión ───────────────────────────────────────────────────────
// Un combo se dibuja con las fotos de SUS PROPIAS piezas, no con una foto de outfit:
// las que había eran de banco y no correspondían (la misma imagen en dos combos de
// Trabajo, y un traje completo ilustrando "jeans, polo y mocasines").
// Cada pieza dice si ya la tienes marcada y, si no, desde cuánto sale; de ahí salen
// también el estado del combo y lo que falta para cerrarlo.
const CATALOGO = {};
[BASICOS, CHAQUETAS, ZAPATOS, ACCESORIOS].forEach(a => a.forEach(it => { CATALOGO[it.id] = it; }));

// El precio más bajo de todas sus tiendas. Los rangos vienen como texto ('$599-799',
// '$199-299 c/u', 'variable'), así que se leen los números y se toma el menor; una
// tienda sin cifra (el 'variable' de Innovasport) simplemente no aporta ninguna.
function precioMin(it) {
  const n = (it.compra || []).flatMap(c => (String(c.p).match(/\d[\d,]*/g) || [])
    .map(x => parseInt(x.replace(/,/g, ''), 10)));
  return n.length ? Math.min(...n) : null;
}
const pesos = n => '$' + n.toLocaleString('es-MX');

// Una pieza resuelta: los productos que la cubren, si ya tienes alguno y su precio.
// Varios ids son alternativas ("cuero o bomber"): basta tener una, y el precio es el
// de la más barata. Sin ids, la prenda no está en el catálogo y la vista lo dice.
function piezaEstado(p) {
  const its = (p.ids || []).map(id => CATALOGO[id]).filter(Boolean);
  const mios = its.filter(it => S.marcados.includes(it.id));
  const precios = its.map(precioMin).filter(x => x !== null);
  return { its, tengo: mios.length > 0, precio: precios.length ? Math.min(...precios) : null };
}

function piezaCard(p) {
  const e = piezaEstado(p);
  if (!e.its.length) {
    return `<div class="pz sin">
      <div class="pz-n">${p.n}</div>
      <div class="pz-p">no está en tus listas</div>
    </div>`;
  }
  return `<div class="pz${e.tengo ? ' tengo' : ''}">
    <div class="pz-n">${e.tengo ? '<span class="pz-ok">✓</span>' : ''}${p.n}</div>
    <div class="pz-p">${e.tengo ? 'YA LA TIENES' : (e.precio !== null ? 'desde ' + pesos(e.precio) : '—')}</div>
  </div>`;
}

function comboCard(c) {
  const est = c.piezas.map(piezaEstado);
  const faltan = est.filter(e => !e.tengo);
  const sinCatalogo = faltan.filter(e => !e.its.length).length;
  const cuesta = faltan.reduce((a, e) => a + (e.precio || 0), 0);

  let chip, pie, valor, clave;
  if (!faltan.length) {
    chip = '<div class="combo-est ok">✓ YA LO PUEDES ARMAR</div>';
    pie = 'Todas sus piezas están marcadas en tu clóset.';
    valor = '$0'; clave = 'te falta comprar';
  } else {
    const lejos = faltan.length > 3 || sinCatalogo === faltan.length;
    chip = `<div class="combo-est ${lejos ? 'lejos' : 'falta'}">TE FALTA${faltan.length > 1 ? 'N' : ''} ${faltan.length}</div>`;
    pie = sinCatalogo
      ? `${sinCatalogo} de las que faltan no ${sinCatalogo > 1 ? 'están' : 'está'} en Básicos, Chaquetas, Zapatos ni Accesorios: eso hay que comprarlo fuera de esta guía.`
      : 'Todas las que faltan están en tus listas — márcalas ahí cuando las compres.';
    valor = cuesta ? 'desde ' + pesos(cuesta) : '—';
    clave = sinCatalogo ? 'lo que sí está en tus listas' : 'para completarlo';
  }

  return `<div class="combo-card${faltan.length ? '' : ' listo'}">
    <div class="combo-h">
      <div><h3>${c.nombre}</h3><div class="combo-desc">${c.desc}</div></div>
      ${chip}
    </div>
    <div class="pz-list">${c.piezas.map(piezaCard).join('')}</div>
    <div class="combo-f">
      <div class="combo-f-t">${pie}<br>Costo aprox. de todo nuevo: <b>${c.total}</b></div>
      <div class="combo-f-r"><div class="combo-f-v">${valor}</div><div class="combo-f-k">${clave}</div></div>
    </div>
  </div>`;
}

function renderCategoria(titulo, sub, arr) {
  return `<div class="sh"><h2>${titulo}</h2><div class="sub">${sub}</div></div>
  <div class="item-grid">${arr.map(itemCard).join('')}</div>`;
}

function renderOcasion(key) {
  const o = OCASIONES[key];
  return `<div class="sh"><h2>${o.titulo} <span class="badge b-p" style="margin-left:8px;font-size:10px">${o.icoBadge}</span></h2>
    <div class="sub">${o.intro}</div></div>
  ${o.combos.map(comboCard).join('')}`;
}

// ─── COLORIMETRÍA ────────────────────────────────────────────────────────────
// La matriz entera: 16 playeras en FILAS y 6 pantalones en columnas, no al revés —
// 16 columnas no caben ni en escritorio, y en filas entra sin apretar nada.
//
// El veredicto es un PUNTO y no una palabra: son 96 celdas, y leer 96 etiquetas no es
// leer. El porqué de cada una vive en el `title`, que es donde no estorba: la tabla
// se barre de un vistazo y el detalle sale solo si se pregunta por él.
function cmEsc(t) {
  return String(t == null ? '' : t)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderColorimetria() {
  const C = COLORIMETRIA;
  const CLS = { s: 'si', o: 'ojo', n: 'no' };
  const TXT = { s: 'Va siempre', o: 'Con cuidado', n: 'Evítalo' };

  const cab = C.pantalones.map(p =>
    `<div class="cm-p" title="${cmEsc(p.n)} · ${p.hex} — ${cmEsc(p.lectura)}">
       <div class="cm-sw" style="background:${p.hex}"></div>
       <div class="cm-pn">${cmEsc(p.n)}</div>
     </div>`).join('');

  const filas = C.playeras.map(t => {
    const celdas = C.pantalones.map(p => {
      const [v, porque] = C.reglas[p.id][t.id];
      return `<div class="cm-cel"><span class="cm-pt ${CLS[v]}"
        title="${cmEsc(t.n)} + ${cmEsc(p.n)} · ${TXT[v]} — ${cmEsc(porque)}"></span></div>`;
    }).join('');
    return `<div class="cm-fila">
      <div class="cm-et"><span class="cm-sw2" style="background:${t.hex}"></span>
        <span class="cm-tn">${cmEsc(t.n)}</span></div>${celdas}</div>`;
  }).join('');

  return `
  <div class="sh"><h2>🎨 Colorimetría</h2>
    <div class="sub">Qué playera va con qué pantalón, y por qué. Sin fotos: lo que decide
    una combinación es el color, y el color se juzga viéndolo. En escritorio, pasa el
    cursor por cualquier punto para leer el motivo de esa pareja.</div>
  </div>

  <div class="card">
    <div class="cm-ley">
      <span><i class="cm-pt si"></i>Va siempre</span>
      <span><i class="cm-pt ojo"></i>Con cuidado</span>
      <span><i class="cm-pt no"></i>Evítalo</span>
    </div>
    <div class="cm-wrap">
      <div class="cm-tabla">
        <div class="cm-cab">
          <div class="cm-lbl">Playera ↓ · Pantalón →</div>
          ${cab}
        </div>
        ${filas}
      </div>
    </div>
  </div>

  <div class="card cm-nota">
    <div class="t">Lo que dice la tabla leída en horizontal</div>
    <ul>
      <li><b>Blanco, verde oliva y burdeos</b> van con los seis pantalones. Son las tres
        playeras que compras primero — de las tres, solo tienes la blanca.</li>
      <li><b>Celeste</b> va con cinco: todos menos el jeans índigo, donde choca por ser
        el mismo azul sin salto de valor suficiente.</li>
      <li><b>Rojo ladrillo, rosa palo y berenjena</b> no tienen un solo verde en toda la
        tabla. La berenjena es «evítalo» en los seis: no la compres.</li>
      <li>Si quieres <b>playera azul marino</b>, necesitas un pantalón que no sea azul ni
        negro: solo funciona sobre el chino caqui y sobre el chino gris.</li>
      <li>Los seis pantalones aceptan <b>ocho playeras cada uno</b>, así que ninguno es
        «más combinable» que otro — lo que cambia es <i>cuáles</i> ocho.</li>
    </ul>
  </div>`;
}

// ─── LO QUE YA TIENES, EN COLOR ──────────────────────────────────────────────
// El catálogo solo conoce cuatro de las 22 prendas de la colorimetría (playera blanca,
// negra, jeans azul y chino caqui): las otras 18 no se pueden marcar ahí. Por eso el
// color lleva su propia lista.
//
// Las claves van CUALIFICADAS por tipo (`p:negro`, `t:negro`) y no por id a secas:
// «negro» y «marino» existen como pantalón Y como playera, y con la id sola marcar la
// playera negra habría marcado también los jeans negros.
//
// CUATRO DE LAS 22 VIVEN EN EL CATÁLOGO. `COLORIMETRIA` las enlaza con el campo `item`
// (blanco→b1, negro→b2, índigo→b3, caqui→b4), así que esas se leen de `S.marcados` y no
// de `S.color`: marcar «Playera blanca lisa» en Básicos y marcarla en la ruta tienen que
// ser la misma acción. Sin esto se marcaban las cuatro en Básicos y Hoy seguía diciendo
// que no había outfit, que es exactamente lo que pasó.
function prendaColor(tipo, id) {
  const arr = tipo === 'p' ? COLORIMETRIA.pantalones : COLORIMETRIA.playeras;
  return arr.filter(x => x.id === id)[0] || null;
}

function tengoColor(tipo, id) {
  const pr = prendaColor(tipo, id);
  if (pr && pr.item) return S.marcados.indexOf(pr.item) >= 0;
  return S.color.indexOf(tipo + ':' + id) >= 0;
}

function toggleColor(tipo, id) {
  const pr = prendaColor(tipo, id);
  if (pr && pr.item) {
    const i = S.marcados.indexOf(pr.item);
    if (i === -1) S.marcados.push(pr.item); else S.marcados.splice(i, 1);
  } else {
    const k = tipo + ':' + id;
    const i = S.color.indexOf(k);
    if (i === -1) S.color.push(k); else S.color.splice(i, 1);
  }
  save();
  updateCounter();
  document.getElementById('content-root').innerHTML = RENDERS[secActual]();
}

// Cuántas de las 22 prendas de COLOR tienes, mirando los dos sitios. Es lo que usa la
// ruta de compra, que solo mueve playeras y pantalones.
function closetColor() {
  return COLORIMETRIA.pantalones.filter(x => tengoColor('p', x.id)).length
       + COLORIMETRIA.playeras.filter(x => tengoColor('t', x.id)).length;
}

// El clóset ENTERO son 31: las 22 de color más las cinco capas y los cuatro zapatos.
// Sale de una sola función porque la cabecera y Mi clóset llegaron a decir cifras
// distintas de lo mismo — 22 una y 31 la otra.
function closetTotal() {
  const C = COLORIMETRIA;
  return closetColor()
       + C.capas.filter(x => S.marcados.indexOf(x.item) >= 0).length
       + C.calzado.filter(x => S.marcados.indexOf(x.item) >= 0).length;
}
function closetCuantas() {
  const C = COLORIMETRIA;
  return C.playeras.length + C.pantalones.length + C.capas.length + C.calzado.length;
}

// Las combinaciones que YA puedes armar: las dos prendas marcadas.
function disponibles() {
  return combLista().filter(c => tengoColor('p', c.p.id) && tengoColor('t', c.t.id));
}

// El outfit de hoy: el mismo todo el día y distinto cada día. Mismo criterio que la
// palabra del día del Dashboard — no es aleatorio, es el día del año.
function diaDelAnio() {
  const h = new Date();
  return Math.floor((h - new Date(h.getFullYear(), 0, 0)) / 86400000);
}
function outfitDelDia() {
  const d = disponibles();
  return d.length ? d[diaDelAnio() % d.length] : null;
}

// ─── LA RUTA DE COMPRA ───────────────────────────────────────────────────────
// En cada paso se elige la prenda que abre MÁS combinaciones nuevas con lo que ya
// tienes marcado, y se dice cuántas abre. No es una lista de deseos ni un orden por
// precio: es el orden que más rápido convierte dinero en outfits.
//
// Es codicioso, no óptimo: mira solo el siguiente paso. Con 22 prendas la diferencia
// no compensa el coste de explicar un resultado que no se puede seguir a ojo.
function rutaCompra(cuantos) {
  const C = COLORIMETRIA;
  const verdes = combLista().map(c => [c.p.id, c.t.id]);
  const P = new Set(C.pantalones.filter(x => tengoColor('p', x.id)).map(x => x.id));
  const T = new Set(C.playeras.filter(x => tengoColor('t', x.id)).map(x => x.id));
  const cuenta = (a, b) => verdes.filter(([p, t]) => a.has(p) && b.has(t)).length;

  let hechos = cuenta(P, T);
  const pasos = [];
  while (pasos.length < (cuantos || 4)) {
    const cand = C.pantalones.filter(x => !P.has(x.id)).map(x => ['p', x])
      .concat(C.playeras.filter(x => !T.has(x.id)).map(x => ['t', x]));
    if (!cand.length) break;
    let mejor = null;
    cand.forEach(([k, x]) => {
      const A = new Set(P), B = new Set(T);
      (k === 'p' ? A : B).add(x.id);
      const n = cuenta(A, B);
      if (!mejor || n - hechos > mejor.gana) mejor = { k: k, x: x, gana: n - hechos, total: n };
    });
    (mejor.k === 'p' ? P : T).add(mejor.x.id);
    pasos.push({ tipo: mejor.k, id: mejor.x.id, n: mejor.x.n, hex: mejor.x.hex,
                 gana: mejor.gana, total: mejor.total });
    hechos = mejor.total;
  }
  return pasos;
}

// ─── HOY ─────────────────────────────────────────────────────────────────────
const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto',
               'septiembre','octubre','noviembre','diciembre'];

function torreHtml(c, alto) {
  return `<div class="hy-torre" style="height:${alto}">
    <div style="height:42%;background:${c.t.hex}"></div>
    <div style="flex:1;background:${c.p.hex}"></div>
  </div>`;
}

function renderHoy() {
  const hoy = new Date();
  const fecha = DIAS[hoy.getDay()] + ' ' + hoy.getDate() + ' de ' + MESES[hoy.getMonth()];
  const dis = disponibles();
  const o = outfitDelDia();
  // El zapato y la capa se eligen por el PANTALÓN del outfit, no por la ocasión: es lo
  // que de verdad manda, y así el par que se propone nunca contradice a la tabla.
  const zap = o ? elegir(COLORIMETRIA.calzado, COLORIMETRIA.reglasZapato, o.p.id) : null;
  const capa = o ? elegir(COLORIMETRIA.capas, COLORIMETRIA.reglasCapa, o.p.id) : null;
  const ruta = rutaCompra(4);
  const gana = ruta.reduce((a, p) => a + p.gana, 0);

  // El bloque grande: el outfit de hoy, o el empujón para que haya uno.
  const grande = o ? `
    <div class="hy-h">
      <div class="hy-h-tx">
        <div class="hy-lbl" style="color:var(--p)">${fecha}</div>
        <div class="hy-dsp">${o.t.n.toUpperCase()}</div>
        <div class="hy-dsp2">+ ${o.p.n.toUpperCase()}</div>
        <div class="hy-por">${o.porque}</div>
        <div class="hy-datos">
          <div><div class="hy-lbl">Zapato</div>
            <div class="hy-dato">${zap ? cmEsc(zap.x.n) : '—'}</div>
            ${zap && !zap.tengo ? '<div class="hy-falta">no lo tienes</div>' : ''}</div>
          <div><div class="hy-lbl">Capa</div>
            <div class="hy-dato">${capa ? cmEsc(capa.x.n) : 'ninguna le va'}</div>
            ${capa && !capa.tengo ? '<div class="hy-falta">no la tienes</div>' : ''}</div>
          <div><div class="hy-lbl">Sirve para</div>
            <div class="hy-dato">${o.ocs.map(x => x.n).join(' · ') || '—'}</div></div>
        </div>
      </div>
      ${torreHtml(o, 'auto')}
    </div>`
  : `
    <div class="hy-h hy-vacio">
      <div class="hy-h-tx">
        <div class="hy-lbl" style="color:var(--p)">${fecha}</div>
        <div class="hy-dsp">TODAVÍA<br>NO HAY OUTFIT</div>
        <div class="hy-por">Esta pantalla sale de lo que tengas marcado, y ahora mismo
          no hay nada. Marca abajo lo que ya esté en tu clóset — en cuanto tengas un
          pantalón y una playera que se lleven bien, aquí aparece qué ponerte.</div>
      </div>
    </div>`;

  const alt = dis.filter(c => !o || c.p.id !== o.p.id || c.t.id !== o.t.id).slice(0, 3);
  const alternativas = alt.length ? `
    <div class="hy-lbl" style="color:var(--text3);margin:26px 0 14px">Otras que ya puedes armar</div>
    <div class="hy-alts">
      ${alt.map(c => `<div class="hy-alt">
        ${torreHtml(c, '62px')}
        <div style="min-width:0">
          <div class="hy-alt-n">${c.t.n}<br>+ ${c.p.n}</div>
          <div class="hy-alt-o">${c.ocs.map(x => x.n).join(' · ') || '—'}</div>
        </div>
      </div>`).join('')}
    </div>` : '';

  return `
  <div class="sh"><h2>Hoy te pones esto</h2></div>
  ${grande}
  ${alternativas}

  <div class="hy-lbl" style="color:var(--text3);margin:30px 0 14px">Qué comprar, en orden</div>
  <div class="hy-compra">
    <div class="hy-compra-n">
      <div class="hy-lbl" style="color:var(--text3)">Si compras las ${ruta.length}</div>
      <div class="hy-big">${dis.length + gana}</div>
      <div class="hy-big-t">outfits, contra ${dis.length === 1 ? 'el 1 de ahora' : 'los ' + dis.length + ' de ahora'}</div>
      <div class="hy-nota">El orden no es una opinión: en cada paso se elige la prenda
        que abre más combinaciones nuevas con lo que ya tienes marcado.</div>
    </div>
    <div class="hy-pasos">
      ${ruta.map((p, i) => `<label class="hy-paso">
        <span class="hy-paso-n">${String(closetColor() + i + 1).padStart(2, '0')}</span>
        <span class="hy-sw" style="background:${p.hex}"></span>
        <span class="hy-paso-t">${p.n}
          <em>${p.tipo === 'p' ? 'PANTALÓN' : 'PLAYERA'}</em></span>
        <span class="hy-gana">+${p.gana}</span>
        <input type="checkbox" onchange="toggleColor('${p.tipo}','${p.id}')">
        <span class="hy-tick">Ya la tengo</span>
      </label>`).join('')}
    </div>
  </div>`;
}

// ─── LAS PRENDAS DE COLOR, PARA COMPRAR ──────────────────────────────────────
// Las 22 de la colorimetría, cada una con LO QUE ABRE: con cuántas contrapartes está
// en verde. Ese número es el que ordena la lista, y es el mismo que manda en la ruta de
// compra de Hoy — aquí se ve el catálogo entero y allí solo el siguiente paso.
//
// Las fichas no están escritas a mano: salen de `COLORIMETRIA` cruzada con
// `COLORIMETRIA.compra`, que guarda tiendas y precio POR TIPO de prenda. Un color nuevo
// en los datos aparece aquí solo.
function abreCon(tipo, id) {
  const C = COLORIMETRIA;
  const otros = tipo === 'p' ? C.playeras : C.pantalones;
  return otros.map(o => {
    const r = tipo === 'p' ? C.reglas[id][o.id] : C.reglas[o.id][id];
    return { id: o.id, n: o.n, hex: o.hex, v: r[0] };
  });
}

function fichaColor(tipo, pr, max) {
  const con = abreCon(tipo, pr.id);
  const abre = con.filter(x => x.v === 's').length;
  const tengo = tengoColor(tipo, pr.id);
  const cmp = COLORIMETRIA.compra[tipo === 'p' ? pr.tipo : 'playera'];
  const cero = abre === 0;

  const puntos = con.map(x => `<span class="pc-pt${x.v === 's' ? ' si' : ''}"
    style="background:${x.hex}" title="${x.n} — ${x.v === 's' ? 'va siempre'
      : (x.v === 'o' ? 'con cuidado' : 'evítalo')}"></span>`).join('');

  const tiendas = cmp.tiendas.map(c => `<div class="pc-t">
    <span>${c.u ? `<a href="${c.u}" target="_blank" rel="noopener">${c.t} ↗</a>` : c.t}</span>
    <b>${c.p}</b></div>`).join('');

  return `<div class="pc${tengo ? ' tengo' : ''}${cero ? ' cero' : ''}">
    <div class="pc-sw" style="background:${pr.hex}">
      ${abre === max && max > 0 ? '<span class="pc-top">Va con todos</span>' : ''}
      ${tengo ? '<span class="pc-ok">Ya la tienes</span>' : ''}
    </div>
    <div class="pc-b">
      <div class="pc-h">
        <div class="pc-n">${pr.n}</div>
        <div class="pc-abre">${abre}<em>/${con.length}</em></div>
      </div>
      <div class="pc-pts">${puntos}</div>
      ${cero
        ? `<div class="pc-cero">No la compres: no está en verde con ninguno de los
             ${con.length}. ${pr.n === 'Berenjena' ? 'El morado necesita un fondo neutro oscuro que no tienes.'
             : 'Demasiada saturación para lo que hay abajo.'}</div>`
        : `<div class="pc-tiendas">${tiendas}</div>`}
      <label class="pc-check">
        <input type="checkbox" ${tengo ? 'checked' : ''}
          onchange="toggleColor('${tipo}','${pr.id}')">
        <span>Ya la tengo</span>
      </label>
    </div>
  </div>`;
}

function renderColorCompra(tipo, titulo, sub) {
  const arr = (tipo === 'p' ? COLORIMETRIA.pantalones : COLORIMETRIA.playeras)
    .map(pr => ({ pr: pr, abre: abreCon(tipo, pr.id).filter(x => x.v === 's').length }));
  const max = Math.max.apply(null, arr.map(x => x.abre));
  arr.sort((a, b) => b.abre - a.abre);
  const tengo = arr.filter(x => tengoColor(tipo, x.pr.id)).length;

  return `<div class="sh"><h2>${titulo}</h2><div class="sub">${sub}</div></div>
  <div class="pc-barra">
    <div><div class="hy-lbl">Ya tienes</div><div class="pc-cif">${tengo}<em> / ${arr.length}</em></div></div>
    <div><div class="hy-lbl">Ordenadas por</div><div class="pc-cif2">lo que abren</div></div>
  </div>
  <div class="pc-grid">${arr.map(x => fichaColor(tipo, x.pr, max)).join('')}</div>`;
}

// ─── CAPAS Y CALZADO ─────────────────────────────────────────────────────────
// Las dos se leen contra los PANTALONES y no contra las playeras: una chamarra choca
// con lo que lleva debajo, no con lo que lleva encima, y un zapato lo mismo. Comparten
// forma, así que comparten render.
function matrizPantalon(items, reglas, titulo) {
  const P = COLORIMETRIA.pantalones;
  const CLS = { s: 'si', o: 'ojo', n: 'no' };
  const TXT = { s: 'Va siempre', o: 'Con cuidado', n: 'Evítalo' };
  const cab = P.map(p => `<div class="cm-p" title="${cmEsc(p.n)} · ${p.hex}">
      <div class="cm-sw" style="background:${p.hex}"></div>
      <div class="cm-pn">${cmEsc(p.n)}</div></div>`).join('');
  const filas = items.map(it => {
    const celdas = P.map(p => {
      const [v, porque] = reglas[it.id][p.id];
      return `<div class="cm-cel"><span class="cm-pt ${CLS[v]}"
        title="${cmEsc(it.n)} + ${cmEsc(p.n)} · ${TXT[v]} — ${cmEsc(porque)}"></span></div>`;
    }).join('');
    return `<div class="cm-fila">
      <div class="cm-et"><span class="cm-sw2" style="background:${it.hex}"></span>
        <span class="cm-tn">${cmEsc(it.n)}</span></div>${celdas}</div>`;
  }).join('');
  return `<div class="card cm-ancha">
    <div class="cm-ley">
      <span><i class="cm-pt si"></i>Va siempre</span>
      <span><i class="cm-pt ojo"></i>Con cuidado</span>
      <span><i class="cm-pt no"></i>Evítalo</span>
    </div>
    <div class="cm-wrap"><div class="cm-tabla">
      <div class="cm-cab"><div class="cm-lbl">${titulo}</div>${cab}</div>
      ${filas}
    </div></div>
  </div>`;
}

// Las que están en verde con este pantalón, y si las tienes.
function paraPantalon(items, reglas, pantId) {
  return items.map(x => ({ x: x, v: reglas[x.id][pantId][0],
                           porque: reglas[x.id][pantId][1],
                           tengo: S.marcados.indexOf(x.item) >= 0 }))
              .filter(r => r.v === 's');
}
// La que le pondrías hoy: primero una que tengas; si no, la que habría que comprar.
function elegir(items, reglas, pantId) {
  const ok = paraPantalon(items, reglas, pantId);
  if (!ok.length) return null;
  return ok.filter(r => r.tengo)[0] || ok[0];
}

function fichaCapa(it, reglas, tipoTxt) {
  const ok = COLORIMETRIA.pantalones.filter(p => reglas[it.id][p.id][0] === 's');
  const tengo = S.marcados.indexOf(it.item) >= 0;
  const cat = CATALOGO[it.item];
  return `<div class="pc${tengo ? ' tengo' : ''}${ok.length ? '' : ' cero'}">
    <div class="pc-sw" style="background:${it.hex}">
      ${tengo ? '<span class="pc-ok">Ya la tienes</span>' : ''}
    </div>
    <div class="pc-b">
      <div class="pc-h">
        <div class="pc-n">${cmEsc(it.n)}</div>
        <div class="pc-abre">${ok.length}<em>/${COLORIMETRIA.pantalones.length}</em></div>
      </div>
      <div class="pc-pts">${COLORIMETRIA.pantalones.map(p => {
        const v = reglas[it.id][p.id][0];
        return `<span class="pc-pt${v === 's' ? ' si' : ''}" style="background:${p.hex}"
          title="${cmEsc(p.n)}"></span>`; }).join('')}</div>
      ${cat ? `<div class="pc-tiendas">${cat.compra.map(c => `<div class="pc-t">
        <span>${c.u ? `<a href="${c.u}" target="_blank" rel="noopener">${c.t} ↗</a>` : c.t}</span>
        <b>${c.p}</b></div>`).join('')}</div>` : ''}
      <label class="pc-check">
        <input type="checkbox" ${tengo ? 'checked' : ''} onchange="toggleCheck('${it.item}');
          document.getElementById('content-root').innerHTML = RENDERS[secActual]();">
        <span>${tipoTxt}</span>
      </label>
    </div>
  </div>`;
}

function renderCapas() {
  const C = COLORIMETRIA;
  const zapatos = matrizPantalon(C.calzado, C.reglasZapato, 'Zapato ↓ · Pantalón →');
  // Un pantalón sin ninguna capa en verde no es un fallo de la tabla: es un hueco real
  // del guardarropa, y decirlo vale más que forzar un verde para que no quede vacío.
  const huerfanos = C.pantalones.filter(p =>
    !C.capas.some(c => C.reglasCapa[c.id][p.id][0] === 's'));

  return `<div class="sh"><h2>Capas</h2>
    <div class="sub">La chamarra es lo que se ve al llegar a un sitio, y no se elige por
    el color de la playera: se elige por el <b>pantalón</b> —para no chocar con él— y por
    el registro que impone. Por eso la tabla va contra los seis pantalones.</div></div>
  ${matrizPantalon(C.capas, C.reglasCapa, 'Capa ↓ · Pantalón →')}
  ${huerfanos.length ? `<div class="card cm-nota">
    <div class="t">Un hueco que enseña la tabla</div>
    <ul><li>El <b>${huerfanos.map(p => cmEsc(p.n)).join('</b> y el <b>')}</b> no está en verde
      con ninguna de las cinco capas. No es un error de la tabla: su capa natural —un
      blazer gris, o algo en ante camel— no está en tu catálogo. Con lo que hay, ese
      pantalón se lleva sin capa o con la que menos moleste.</li></ul>
  </div>` : ''}
  <div class="hy-lbl" style="color:var(--text3);margin:30px 0 14px">El zapato lo decide el pantalón</div>
  <div class="sub" style="margin-bottom:14px">El derby café con jeans negros no funciona
  por mucho que la ocasión sea de oficina. Los tenis de gimnasio no están: no se combinan.</div>
  ${zapatos}`;
}

function renderReglas() {
  return `<div class="sh"><h2>Las reglas</h2>
    <div class="sub">El color decide si dos prendas se llevan. Esto decide si el conjunto
    se ve bien puesto — son las que se notan cuando fallan y nadie sabe decir por qué.</div></div>
  <div class="rg-grid">
    ${COLORIMETRIA.reglas_oro.map((r, i) => `<div class="rg">
      <div class="rg-n">${String(i + 1).padStart(2, '0')}</div>
      <div class="rg-b">
        <div class="rg-t">${cmEsc(r.t)}</div>
        <div class="rg-d">${cmEsc(r.d)}</div>
        <div class="rg-p">${cmEsc(r.p)}</div>
      </div>
    </div>`).join('')}
  </div>`;
}

// ─── MI CLÓSET ───────────────────────────────────────────────────────────────
// UN solo sitio para marcar lo que tienes. Antes estaba repartido entre las fichas de
// compra y las casillas de la ruta, y marcar treinta y una prendas obligaba a recorrer
// cuatro secciones. Aquí no hay precios ni tiendas: aquí solo se marca.
//
// El recuadro es grande y el color ocupa casi todo, porque lo que hay que reconocer es
// el color, no leer el nombre: se busca «la playera que tengo» mirando, no leyendo.
function bloqueCloset(titulo, items, tipo) {
  const marca = items.map(it => {
    const tengo = tipo === 'x'
      ? S.marcados.indexOf(it.item) >= 0
      : tengoColor(tipo, it.id);
    const fn = tipo === 'x'
      ? `toggleCheck('${it.item}'); document.getElementById('content-root').innerHTML = RENDERS[secActual]();`
      : `toggleColor('${tipo}','${it.id}')`;
    return `<button type="button" class="mc${tengo ? ' tengo' : ''}" onclick="${fn}">
      <span class="mc-sw" style="background:${it.hex}">
        ${tengo ? `<span class="mc-tick">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4"
            stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l6 6L20 6"></path></svg>
        </span>` : ''}
      </span>
      <span class="mc-n">${cmEsc(it.n)}</span>
    </button>`;
  }).join('');
  const n = items.filter(it => tipo === 'x'
    ? S.marcados.indexOf(it.item) >= 0 : tengoColor(tipo, it.id)).length;
  return `<div class="mc-grupo">
    <div class="mc-h"><div class="mc-t">${titulo}</div>
      <div class="mc-c">${n} de ${items.length}</div></div>
    <div class="mc-grid">${marca}</div>
  </div>`;
}

function renderCloset() {
  const C = COLORIMETRIA;
  const total = closetCuantas();
  const tengo = closetTotal();

  return `<div class="sh"><h2>Mi clóset</h2>
    <div class="sub">Toca lo que ya tengas. Es lo único que hay que hacer para que la
    pantalla de <b>Hoy</b> empiece a decirte qué ponerte — todo lo demás sale de aquí.</div></div>
  <div class="pc-barra">
    <div><div class="hy-lbl">Marcadas</div><div class="pc-cif">${tengo}<em> / ${total}</em></div></div>
    <div><div class="hy-lbl">Outfits que abren</div><div class="pc-cif">${disponibles().length}<em> / 48</em></div></div>
  </div>
  ${bloqueCloset('Playeras', C.playeras, 't')}
  ${bloqueCloset('Pantalones', C.pantalones, 'p')}
  ${bloqueCloset('Capas', C.capas, 'x')}
  ${bloqueCloset('Zapatos', C.calzado, 'x')}`;
}

// ─── QUÉ COMPRAR ─────────────────────────────────────────────────────────────
// La ruta entera —no los cuatro pasos de Hoy— y debajo todo lo comprable con su precio,
// ordenado por lo que abre. Es la sección que se mira ANTES de gastar.
function renderQueComprar() {
  const C = COLORIMETRIA;
  const ruta = rutaCompra(99);
  const dis = disponibles().length;
  const maxT = Math.max.apply(null, C.playeras.map(p => abreCon('t', p.id).filter(x => x.v === 's').length));
  const maxP = Math.max.apply(null, C.pantalones.map(p => abreCon('p', p.id).filter(x => x.v === 's').length));
  const orden = (tipo, arr) => arr.map(pr => ({ pr: pr,
      abre: abreCon(tipo, pr.id).filter(x => x.v === 's').length }))
    .sort((a, b) => b.abre - a.abre);

  return `<div class="sh"><h2>Qué comprar</h2>
    <div class="sub">En orden, y el orden no es una opinión: en cada paso va la prenda que
    abre <b>más combinaciones nuevas</b> con lo que ya tienes marcado en tu clóset. Es el
    orden que más rápido convierte dinero en outfits.</div></div>

  ${ruta.length ? `<div class="hy-compra">
    <div class="hy-compra-n">
      <div class="hy-lbl" style="color:var(--text3)">Comprándolo todo</div>
      <div class="hy-big">${dis + ruta.reduce((a, p) => a + p.gana, 0)}</div>
      <div class="hy-big-t">outfits, contra ${dis} de ahora</div>
      <div class="hy-nota">Son ${ruta.length} prendas. Las primeras cuatro ya te dan
        ${dis + ruta.slice(0, 4).reduce((a, p) => a + p.gana, 0)}: no hace falta comprarlo todo de golpe.</div>
    </div>
    <div class="hy-pasos">
      ${ruta.map((p, i) => `<label class="hy-paso">
        <span class="hy-paso-n">${String(i + 1).padStart(2, '0')}</span>
        <span class="hy-sw" style="background:${p.hex}"></span>
        <span class="hy-paso-t">${cmEsc(p.n)}
          <em>${p.tipo === 'p' ? 'PANTALÓN' : 'PLAYERA'}</em></span>
        <span class="hy-gana">+${p.gana}</span>
        <input type="checkbox" onchange="toggleColor('${p.tipo}','${p.id}')">
      </label>`).join('')}
    </div>
  </div>` : `<div class="card"><b>Ya tienes las 22 prendas de color.</b> No queda nada que
    comprar para abrir más combinaciones — de aquí en adelante es cuestión de reponer.</div>`}

  <div class="hy-lbl" style="color:var(--text3);margin:30px 0 14px">Playeras · las 16, por lo que abren</div>
  <div class="pc-grid">${orden('t', C.playeras).map(x => fichaColor('t', x.pr, maxT)).join('')}</div>

  <div class="hy-lbl" style="color:var(--text3);margin:30px 0 14px">Pantalones · los 6</div>
  <div class="pc-grid">${orden('p', C.pantalones).map(x => fichaColor('p', x.pr, maxP)).join('')}</div>

  <div class="hy-lbl" style="color:var(--text3);margin:30px 0 14px">Capas · las 5</div>
  <div class="pc-grid">${C.capas.map(c => fichaCapa(c, C.reglasCapa, 'Ya la tengo')).join('')}</div>

  <div class="hy-lbl" style="color:var(--text3);margin:30px 0 14px">Y si prefieres ir por fases</div>
  <div class="sub" style="margin-bottom:14px">La ruta de arriba ordena por lo que abre cada
  prenda; esto ordena por presupuesto. Mientras estés liquidando deuda, esta es la lectura
  que importa.</div>
  <div class="fase-grid">
    ${FASES.map(f => `<div class="fase-card"><div class="fn">${f.n} — ${f.t}</div>
      <ul>${f.items.map(i => `<li>${i}</li>`).join('')}</ul>
      <div class="tot">${f.costo}</div></div>`).join('')}
  </div>`;
}

// ─── CÓMO SE USA ─────────────────────────────────────────────────────────────
function renderComoSeUsa() {
  const pasos = [
    ['Marca lo que ya tienes', 'Mi clóset',
     'Es el único paso obligatorio. Toca cada prenda que esté en tu armario — playeras, pantalones, capas y zapatos. Todo lo demás de la app sale de ahí, así que mientras esté vacío no puede decirte nada.'],
    ['Abre Hoy por la mañana', 'Hoy',
     'Te dice qué ponerte, con su zapato y su capa, y por qué esa combinación funciona. Es el mismo outfit todo el día y cambia cada día. Debajo, las otras que ya puedes armar.'],
    ['Compra en orden, no por antojo', 'Qué comprar',
     'La lista está ordenada por cuántas combinaciones nuevas abre cada prenda con lo que ya tienes. Comprar la número 1 rinde más que comprar la número 8, y la app te dice cuánto.'],
    ['Consulta cuando dudes', 'Colorimetría · Combinaciones · Capas y zapatos',
     'Las tablas están para las preguntas concretas: ¿esta playera con este pantalón? ¿qué chamarra le va? ¿este zapato con estos jeans? Cada punto de color explica su porqué al pasar el cursor.'],
  ];
  return `<div class="sh"><h2>Cómo se usa</h2>
    <div class="sub">Cuatro pasos. El primero es el único que tienes que hacer tú.</div></div>
  <div class="rg-grid">
    ${pasos.map((p, i) => `<div class="rg">
      <div class="rg-n">${String(i + 1).padStart(2, '0')}</div>
      <div class="rg-b">
        <div class="rg-t">${cmEsc(p[0])}</div>
        <div class="rg-d">${cmEsc(p[2])}</div>
        <div class="rg-p">Sección: <b>${cmEsc(p[1])}</b></div>
      </div>
    </div>`).join('')}
  </div>
  <div class="card cm-nota" style="margin-top:22px">
    <div class="t">De dónde salen los números</div>
    <ul>
      <li>Las <b>48 combinaciones</b> son las parejas playera–pantalón que la colorimetría
        da por buenas. No están escritas a mano: salen de la tabla, así que no pueden
        contradecirla.</li>
      <li><b>«Abre +3»</b> quiere decir que esa prenda añade tres combinaciones nuevas a
        las que ya puedes armar. Depende de lo que tengas marcado, así que cambia según
        vas comprando.</li>
      <li>Los <b>precios</b> son rangos de tiendas reales en CDMX y van por tipo de prenda:
        una playera burdeos cuesta lo que una blanca. Conviene revisarlos de vez en cuando.</li>
    </ul>
  </div>`;
}

// ─── COMBINACIONES ───────────────────────────────────────────────────────────
// Las 48 NO están escritas a mano: son las celdas verdes de `COLORIMETRIA.reglas`
// cruzadas con `COLORIMETRIA.ocasiones`. Si mañana un veredicto de la matriz cambia,
// la combinación aparece o desaparece sola — no hay dos sitios que puedan
// contradecirse. Pedido de Adán (2026-09-09): *"queria que borraras todo y me dieras
// buenas combinaciones, por que lo que tenemos no me gusta nada"*.
let combOc = 'todas';

function combLista() {
  const C = COLORIMETRIA;
  const out = [];
  C.pantalones.forEach(p => C.playeras.forEach(t => {
    const r = C.reglas[p.id][t.id];
    if (r[0] !== 's') return;
    const ocs = C.ocasiones.filter(o =>
      o.pant.indexOf(p.id) >= 0 && (!o.pl || o.pl.indexOf(t.id) >= 0));
    out.push({ p, t, porque: r[1], ocs });
  }));
  return out;
}

function combFiltro(id) { combOc = id; document.getElementById('content-root').innerHTML = RENDERS.combinaciones(); }

function combCard(c) {
  const ocs = c.ocs.map(o =>
    `<span class="cb-oc" title="${o.nota.replace(/"/g, '&quot;')}">${o.ico} ${o.n} · ${o.zapato}</span>`).join('');
  return `<div class="cb">
    <div class="cb-color">
      <div class="cb-t" style="background:${c.t.hex}"></div>
      <div class="cb-p" style="background:${c.p.hex}"></div>
    </div>
    <div class="cb-body">
      <div class="cb-n">${c.t.n} <span>+</span> ${c.p.n}</div>
      <div class="cb-por">${c.porque}</div>
      <div class="cb-ocs">${ocs}</div>
    </div>
  </div>`;
}

function renderCombinaciones() {
  const todas = combLista();
  const cuenta = id => id === 'todas' ? todas.length
    : todas.filter(c => c.ocs.some(o => o.id === id)).length;
  const chips = [{ id: 'todas', n: 'Todas', ico: '' }].concat(COLORIMETRIA.ocasiones)
    .map(o => `<button type="button" class="cb-f${combOc === o.id ? ' on' : ''}"
      onclick="combFiltro('${o.id}')">${o.ico ? o.ico + ' ' : ''}${o.n}
      <b>${cuenta(o.id)}</b></button>`).join('');
  const lista = combOc === 'todas' ? todas
    : todas.filter(c => c.ocs.some(o => o.id === combOc));

  return `
  <div class="sh"><h2>🧩 Combinaciones</h2>
    <div class="sub">Las ${todas.length} parejas que la Colorimetría da por buenas, ya resueltas:
    qué playera, con qué pantalón, con qué zapato y para cuándo. No están escritas aparte —
    salen de la misma tabla, así que no pueden contradecirla.</div>
  </div>
  <div class="cb-filtros">${chips}</div>
  <div class="cb-grid">${lista.map(combCard).join('')}</div>`;
}

const RENDERS = {
  comose: renderComoSeUsa,
  hoy: renderHoy,
  closet: renderCloset,
  comprar: renderQueComprar,
  basicos: () => renderCategoria('👕 Básicos', 'Las piezas que más combinaciones desbloquean por peso invertido — la base de todo lo demás.', BASICOS),
  chaquetas: () => renderCategoria('🧥 Chaquetas', 'Una capa exterior cambia todo un outfit. No necesitas las 6 — elige 2-3 según tu temporada y presupuesto.', CHAQUETAS),
  zapatos: () => `<div class="sh"><h2>👞 Zapatos</h2>
    <div class="sub">Lo primero que se nota. Y el zapato NO lo decide la ocasión sino el
    pantalón: el derby café con jeans negros no funciona por mucho que la ocasión sea de
    oficina.</div></div>
    ${matrizPantalon(COLORIMETRIA.calzado, COLORIMETRIA.reglasZapato, 'Zapato ↓ · Pantalón →')}
    <div class="hy-lbl" style="color:var(--text3);margin:26px 0 14px">Los seis del catálogo</div>
    <div class="item-grid">${ZAPATOS.map(itemCard).join('')}</div>`,
  accesorios: () => renderCategoria('⌚ Accesorios', 'Los detalles que más se notan por lo poco que cuestan — un reloj o unos lentes bien elegidos suben cualquier outfit de la lista.', ACCESORIOS),
  colorimetria: renderColorimetria,
  combinaciones: renderCombinaciones,
  capas: renderCapas,
  reglas: renderReglas,
  ejercicio: () => renderOcasion('ejercicio'),
  bodas: () => renderOcasion('bodas'),
};

function toggleTheme(){
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('coach-theme', next);
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
  updateCounter();
  nav('closet');
});
