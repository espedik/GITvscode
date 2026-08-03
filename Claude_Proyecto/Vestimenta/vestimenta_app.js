// ─── APP: navegación, render y checklist de compra ────────────────────────────
const KEY = 'vestimenta_v1';
let S = { marcados: [] };
const save = () => localStorage.setItem(KEY, JSON.stringify(S));
const load = () => { try { const d = localStorage.getItem(KEY); if (d) S = { ...S, ...JSON.parse(d) }; } catch(e){} };
load();

const SECS = ['inicio','basicos','chaquetas','zapatos','accesorios','trabajo','casual','ejercicio','bodas','fiestas'];
const STITLE = {
  inicio:'🏠 Inicio', basicos:'👕 Básicos', chaquetas:'🧥 Chaquetas', zapatos:'👞 Zapatos', accesorios:'⌚ Accesorios',
  trabajo:'💼 Trabajo', casual:'🙂 Casual', ejercicio:'🏋️ Ejercicio', bodas:'💍 Bodas', fiestas:'🎉 Fiestas'
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
    <div class="item-img"><img src="${it.img}" alt="${it.nombre}" loading="lazy"></div>
    <div class="item-body">
      <h3>${it.nombre}</h3>
      <div class="item-use">${it.uso}</div>
      <div class="buy-list">${it.compra.map(c=>`<div class="buy-opt"><span class="store">${c.u?`<a href="${c.u}" target="_blank" rel="noopener">${c.t} ↗</a>`:c.t}</span><span class="price">${c.p}</span></div>`).join('')}</div>
      <div class="item-tip">💡 ${it.tip}</div>
      <label class="item-check"><input type="checkbox" ${checked?'checked':''} onchange="toggleCheck('${it.id}')"><span>Ya lo tengo / lo quiero comprar</span></label>
    </div>
  </div>`;
}

function comboCard(c) {
  return `<div class="combo-card">
    <div class="combo-img"><img src="${c.img}" alt="${c.nombre}" loading="lazy"></div>
    <div class="combo-body">
      <h3>${c.nombre}</h3>
      <div class="combo-desc">${c.desc}</div>
      <div class="piece-list">${c.piezas.map(p=>`<span class="piece">${p}</span>`).join('')}</div>
      <div class="combo-total">Costo aprox.: <b>${c.total}</b></div>
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
    <div class="d">Recorre <b>Básicos → Chaquetas → Zapatos → Accesorios</b> para armar la base de tu clóset (marca ✓ lo que ya tienes o quieres comprar, se guarda automáticamente). Cada tienda con link (↗) te lleva directo a su sitio oficial verificado — algunas marcas quedaron sin link a propósito porque no tienen tienda oficial confirmada en México (ver el tip de esa prenda). Luego revisa <b>Trabajo, Casual, Ejercicio, Bodas y Fiestas</b> para ver cómo combinar esas mismas piezas según la ocasión — la mayoría de los outfits reutilizan lo que ya compraste en las 4 primeras secciones.</div>
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

const RENDERS = {
  inicio: renderInicio,
  basicos: () => renderCategoria('👕 Básicos', 'Las piezas que más combinaciones desbloquean por peso invertido — la base de todo lo demás.', BASICOS),
  chaquetas: () => renderCategoria('🧥 Chaquetas', 'Una capa exterior cambia todo un outfit. No necesitas las 6 — elige 2-3 según tu temporada y presupuesto.', CHAQUETAS),
  zapatos: () => renderCategoria('👞 Zapatos', 'El zapato es lo primero que se nota. Cada uno de estos cubre una función distinta, no son intercambiables.', ZAPATOS),
  accesorios: () => renderCategoria('⌚ Accesorios', 'Los detalles que más se notan por lo poco que cuestan — un reloj o unos lentes bien elegidos suben cualquier outfit de la lista.', ACCESORIOS),
  trabajo: () => renderOcasion('trabajo'),
  casual: () => renderOcasion('casual'),
  ejercicio: () => renderOcasion('ejercicio'),
  bodas: () => renderOcasion('bodas'),
  fiestas: () => renderOcasion('fiestas'),
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
