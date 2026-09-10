// ─── APP: navegación, render y checklist de compra ────────────────────────────
const KEY = 'vestimenta_v1';
let S = { marcados: [], color: [] };
const save = () => { localStorage.setItem(KEY, JSON.stringify(S));
  // La cabecera lleva el contador de prendas: se repinta al marcar una.
  if (typeof cpCabVest === 'function') cpCabVest(); };
const load = () => { try { const d = localStorage.getItem(KEY); if (d) S = { ...S, ...JSON.parse(d) }; } catch(e){}
  if (!Array.isArray(S.color)) S.color = []; };
load();

const SECS = ['hoy','inicio','basicos','chaquetas','zapatos','accesorios','colorimetria','combinaciones','ejercicio','bodas'];
const STITLE = {
  hoy:'Hoy', inicio:'🏠 Inicio', basicos:'👕 Básicos', chaquetas:'🧥 Chaquetas', zapatos:'👞 Zapatos', accesorios:'⌚ Accesorios',
  colorimetria:'🎨 Colorimetría', combinaciones:'🧩 Combinaciones', ejercicio:'🏋️ Ejercicio', bodas:'💍 Bodas'
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

// ─── LO QUE YA TIENES, EN COLOR ──────────────────────────────────────────────
// El catálogo solo conoce cuatro de las 22 prendas de la colorimetría (playera blanca,
// negra, jeans azul y chino caqui): las otras 18 no se pueden marcar ahí. Por eso el
// color lleva su propia lista.
//
// Las claves van CUALIFICADAS por tipo (`p:negro`, `t:negro`) y no por id a secas:
// «negro» y «marino» existen como pantalón Y como playera, y con la id sola marcar la
// playera negra habría marcado también los jeans negros.
function tengoColor(tipo, id) { return S.color.indexOf(tipo + ':' + id) >= 0; }

function toggleColor(tipo, id) {
  const k = tipo + ':' + id;
  const i = S.color.indexOf(k);
  if (i === -1) S.color.push(k); else S.color.splice(i, 1);
  save();
  document.getElementById('content-root').innerHTML = RENDERS[secActual]();
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
          ${o.ocs.map(x => `<div><div class="hy-lbl">${x.n}</div>
            <div class="hy-dato">${x.zapato}</div></div>`).join('')}
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
        <span class="hy-paso-n">${String(S.color.length + i + 1).padStart(2, '0')}</span>
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
  hoy: renderHoy,
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
  nav('hoy');
});
