// ─── APP: navegación, render y checklist de compra ────────────────────────────
const KEY = 'vestimenta_v1';
let S = { marcados: [] };
const save = () => { localStorage.setItem(KEY, JSON.stringify(S));
  // La cabecera lleva el contador de prendas: se repinta al marcar una.
  if (typeof cpCabVest === 'function') cpCabVest(); };
const load = () => { try { const d = localStorage.getItem(KEY); if (d) S = { ...S, ...JSON.parse(d) }; } catch(e){} };
load();

const SECS = ['inicio','basicos','chaquetas','zapatos','accesorios','colorimetria','combinaciones','ejercicio','bodas'];
const STITLE = {
  inicio:'🏠 Inicio', basicos:'👕 Básicos', chaquetas:'🧥 Chaquetas', zapatos:'👞 Zapatos', accesorios:'⌚ Accesorios',
  colorimetria:'🎨 Colorimetría', combinaciones:'🧩 Combinaciones', ejercicio:'🏋️ Ejercicio', bodas:'💍 Bodas'
};

function nav(s) {
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

function renderInicio() {
  return `
  <div class="sh"><h2>🏠 Tu guardarropa, en fases</h2>
    <div class="sub">Con 8 básicos + 6 chaquetas + 6 zapatos + 5 accesorios ya cubres las 5 ocasiones de abajo sin comprar un clóset aparte para cada una — la clave es la versatilidad, no la cantidad. Dado que hoy priorizas liquidar deuda (ver tu plan en Coach), compra por fases en vez de todo de golpe.</div>
  </div>
  <div class="card intro-banner">
    <div class="t">Cómo usar esta guía</div>
    <div class="d">Recorre <b>Básicos → Chaquetas → Zapatos → Accesorios</b> para armar la base de tu clóset (marca ✓ lo que ya tienes o quieres comprar, se guarda automáticamente). Cada tienda con link (↗) te lleva directo a su sitio oficial verificado — algunas marcas quedaron sin link a propósito porque no tienen tienda oficial confirmada en México (ver el tip de esa prenda). Luego <b>Colorimetría</b> te dice qué color va con qué color, y <b>Combinaciones</b> convierte esa tabla en 48 outfits concretos con su zapato y su ocasión. <b>Ejercicio</b> y <b>Bodas</b> van aparte porque no se resuelven con playera y pantalón.</div>
  </div>
  <div class="sh" style="margin-top:22px"><h2 style="font-size:16px">Plan de compra por fases</h2>
    <div class="sub">Mismo criterio de fases que ya usas en tu Plan Maestro — no hay que comprar todo a la vez.</div>
  </div>
  <div class="fase-grid">
    ${FASES.map(f=>`<div class="fase-card"><div class="fn">${f.n} — ${f.t}</div><ul>${f.items.map(i=>`<li>${i}</li>`).join('')}</ul><div class="tot">${f.costo}</div></div>`).join('')}
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
  inicio: renderInicio,
  basicos: () => renderCategoria('👕 Básicos', 'Las piezas que más combinaciones desbloquean por peso invertido — la base de todo lo demás.', BASICOS),
  chaquetas: () => renderCategoria('🧥 Chaquetas', 'Una capa exterior cambia todo un outfit. No necesitas las 6 — elige 2-3 según tu temporada y presupuesto.', CHAQUETAS),
  zapatos: () => renderCategoria('👞 Zapatos', 'El zapato es lo primero que se nota. Cada uno de estos cubre una función distinta, no son intercambiables.', ZAPATOS),
  accesorios: () => renderCategoria('⌚ Accesorios', 'Los detalles que más se notan por lo poco que cuestan — un reloj o unos lentes bien elegidos suben cualquier outfit de la lista.', ACCESORIOS),
  colorimetria: renderColorimetria,
  combinaciones: renderCombinaciones,
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
  nav('inicio');
});
