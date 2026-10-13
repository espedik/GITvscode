
function buildPages() {
  const content = document.getElementById('content');
  for (const [id, d] of Object.entries(T)) {
    const page = document.createElement('div');
    const isWayve = d.mod === 'wayve';
    const isCheat = id === 'py-cheatsheet';
    page.className = 'topic-page' + (isWayve ? ' wayve-page' : '') + (isCheat ? ' fullwidth' : '');
    page.id = 'page-' + id;
    const tagsHtml = d.tags.map(t => `<span class="t-tag">${t}</span>`).join('');

    const richContent = WAYVE_RICH[id] || CODING_RICH[id] || PYTHON_RICH[id] || PYTHON_RICH2[id] || PYTHON_RICH3[id]
      || AUTO_RICH[id] || PROTO_RICH[id] || DIAG_RICH[id] || TOOLS_RICH[id]
      || STANDARDS_RICH[id] || TESTING_RICH[id] || GIT_RICH[id] || DEVOPS_RICH[id]
      || METOD_RICH[id] || ISTQB_RICH[id] || GENAI_RICH[id] || INTERVIEW_RICH[id] || SYSDESIGN_RICH[id] || API_RICH[id] || AI_RICH[id] || CLAUDECODE_RICH[id]
      ? (WAYVE_RICH[id] || CODING_RICH[id] || PYTHON_RICH[id] || PYTHON_RICH2[id] || PYTHON_RICH3[id]
         || AUTO_RICH[id] || PROTO_RICH[id] || DIAG_RICH[id] || TOOLS_RICH[id]
         || STANDARDS_RICH[id] || TESTING_RICH[id] || GIT_RICH[id] || DEVOPS_RICH[id]
         || METOD_RICH[id] || ISTQB_RICH[id] || GENAI_RICH[id] || INTERVIEW_RICH[id] || SYSDESIGN_RICH[id] || API_RICH[id] || AI_RICH[id] || CLAUDECODE_RICH[id])
      : `<div class="notes-card">
          <div class="notes-card-label">Mis notas</div>
          <p class="notes-placeholder">Agrega aquí tus apuntes sobre "${d.title}"...<br><br>
          <b>Sugerencia de contenido:</b> ${d.hint}</p>
        </div>`;

    page.innerHTML = `
      <div class="topic-top">
        <div class="t-icon">${d.icon}</div>
        <div class="t-meta">
          <h2>${d.title}</h2>
          <div class="t-breadcrumb"><b>${d.mod.toUpperCase()}</b> › ${d.title}</div>
          <div class="t-tags">${tagsHtml}</div>
        </div>
        <button class="btn-done ${done[id]?'done':''}" onclick="toggleDone('${id}',this)">
          ${done[id]?'✓ Estudiado':'◯ Marcar estudiado'}
        </button>
      </div>
      <div class="hr"></div>
      ${richContent}`;
    content.appendChild(page);
  }
}

// ══════════════════════════════════════════════════════════════════
//  NAVEGACIÓN
// ══════════════════════════════════════════════════════════════════
let currentPage = null;

function go(id) {
  document.getElementById('welcome').style.display = 'none';
  if (currentPage) document.getElementById('page-' + currentPage)?.classList.remove('visible');
  document.getElementById('page-' + id)?.classList.add('visible');
  currentPage = id;
  document.querySelectorAll('.s-link, .module-link .module-header').forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.s-link, .module-link .module-header').forEach(l => {
    if ((l.getAttribute('onclick')||'').includes(`'${id}'`)) l.classList.add('active');
  });
  document.getElementById('content').scrollTo({ top: 0, behavior: 'smooth' });
  const isFullwidth = id === 'py-cheatsheet';
  document.getElementById('content').classList.toggle('cheatsheet-active', isFullwidth);
}

// ══════════════════════════════════════════════════════════════════
//  TOGGLE MÓDULO
// ══════════════════════════════════════════════════════════════════
function toggleMod(header) {
  header.classList.toggle('open');
  header.nextElementSibling.classList.toggle('open');
}

// ══════════════════════════════════════════════════════════════════
//  DONE
// ══════════════════════════════════════════════════════════════════
function toggleDone(id, btn) {
  done[id] = !done[id];
  localStorage.setItem('study-done-v2', JSON.stringify(done));
  btn.textContent = done[id] ? '✓ Estudiado' : '◯ Marcar estudiado';
  btn.classList.toggle('done', done[id]);
  refreshSidebar();
  refreshProgress();
}

function resetProgress() {
  if (!confirm('¿Reiniciar todo el progreso?')) return;
  done = {};
  localStorage.removeItem('study-done-v2');
  refreshSidebar();
  refreshProgress();
  document.querySelectorAll('.btn-done').forEach(b => {
    b.textContent = '◯ Marcar estudiado';
    b.classList.remove('done');
  });
}

// ══════════════════════════════════════════════════════════════════
//  SIDEBAR DOTS + BADGES
// ══════════════════════════════════════════════════════════════════
function refreshSidebar() {
  document.querySelectorAll('.s-link').forEach(link => {
    const m = (link.getAttribute('onclick')||'').match(/'([^']+)'/);
    if (m) {
      link.classList.toggle('done', !!done[m[1]]);
    }
  });
  // module counts
  const counts = {};
  for (const [id, d] of Object.entries(T)) {
    if (!counts[d.mod]) counts[d.mod] = { t:0, d:0 };
    counts[d.mod].t++;
    if (done[id]) counts[d.mod].d++;
  }
  for (const [mod, c] of Object.entries(counts)) {
    const el = document.getElementById('cnt-' + mod);
    if (el) {
      el.textContent = `${c.d}/${c.t}`;
      el.closest('.module-header')?.classList.toggle('has-done', c.d > 0);
    }
  }
}

// ══════════════════════════════════════════════════════════════════
//  PROGRESO GLOBAL
// ══════════════════════════════════════════════════════════════════
function refreshProgress() {
  const doneCount = Object.keys(done).filter(k => done[k] && T[k]).length;
  const pct = Math.round((doneCount / TOTAL) * 100);
  document.getElementById('progress-text').textContent = `${doneCount} / ${TOTAL}`;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-pct').textContent = pct + '%';
  renderInicio();
}

// ══════════════════════════════════════════════════════════════════
//  LA PORTADA — «Tu preparación, hoy»
// ══════════════════════════════════════════════════════════════════
// Antes abría en el plan de Wayve («la entrevista es el martes 14 de julio»), ya vencido. Ahora la
// portada sale del avance real: arriba las prioridades (lo que piden Mis Metas y Mi Día: el CT-GenAI,
// Python y coding), cada una con su siguiente tema sin estudiar; abajo todos los módulos con su barra.
// El orden de los temas es el del panel lateral. Wayve queda al final, como archivo.
const INICIO_PRIORIDAD = [
  ['istqbai', 'La certificación de tu meta: el CT-GenAI'],
  ['pyfund', 'El Python de Mi Día'],
  ['poo', 'Python orientado a objetos'],
  ['testing', 'pytest, lo que más te preguntan'],
  ['coding', 'Retos de código, con el razonamiento en voz alta'],
  ['interview', 'Conducta y estrategia: tus historias STAR'],
];

function modulosDelPanel() {
  return [...document.querySelectorAll('#sidebar .module[data-mod]')].map(m => ({
    mod: m.dataset.mod,
    label: (m.querySelector('.m-label') || {}).textContent || m.dataset.mod,
    icon: (m.querySelector('.m-icon') || {}).textContent || '',
    temas: [...m.querySelectorAll('.s-link')].map(l => ((l.getAttribute('onclick') || '').match(/'([^']+)'/) || [])[1]).filter(id => id && T[id]),
  }));
}

function renderInicio() {
  const el = document.getElementById('welcome');
  if (!el) return;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const mods = modulosDelPanel();
  const porMod = Object.fromEntries(mods.map(m => [m.mod, m]));
  const hechos = Object.keys(done).filter(k => done[k] && T[k]).length;
  const estado = m => {
    const d = m.temas.filter(id => done[id]).length;
    return { d, t: m.temas.length, pct: m.temas.length ? Math.round(d / m.temas.length * 100) : 0,
             sig: m.temas.find(id => !done[id]) };
  };
  const tarjetas = INICIO_PRIORIDAD.filter(([mod]) => porMod[mod] && estado(porMod[mod]).sig).slice(0, 3).map(([mod, porque]) => {
    const m = porMod[mod], e = estado(m), t = T[e.sig];
    return `<div class="in-card">
      <div class="in-card-top"><span class="in-mod">${esc(m.icon)} ${esc(m.label)}</span><span class="in-cnt">${e.d}/${e.t}</span></div>
      <div class="in-bar"><i style="width:${e.pct}%"></i></div>
      <div class="in-porque">${esc(porque)}</div>
      <div class="in-sig-lbl">Sigue con</div>
      <div class="in-sig">${esc(t.title)}</div>
      <p class="in-hint">${esc(t.hint || '')}</p>
      <button class="in-btn" onclick="go('${e.sig}')">Abrir el tema →</button>
    </div>`;
  }).join('');
  const lista = mods.filter(m => m.mod !== 'wayve').map(m => {
    const e = estado(m);
    return `<button class="in-mod-fila" onclick="go('${e.sig || m.temas[0]}')">
      <span class="in-mod-nom">${esc(m.icon)} ${esc(m.label)}</span>
      <span class="in-bar in-bar-s"><i style="width:${e.pct}%"></i></span>
      <span class="in-mod-n">${e.d}/${e.t}</span></button>`;
  }).join('');
  el.innerHTML = `<div class="in">
    <div class="in-cab">
      <div><div class="in-ceja">Interview Prep · Automotive SW</div><h2>Tu preparación, hoy</h2>
        <p>Pregunta antes que lectura: abre el tema, explícalo en voz alta en 2 minutos y márcalo como estudiado.</p></div>
      <div class="in-stats">
        <div><b>${hechos}</b><span>estudiados</span></div>
        <div><b>${TOTAL}</b><span>temas</span></div>
        <div><b>${mods.filter(m => m.mod !== 'wayve').length}</b><span>módulos</span></div>
      </div>
    </div>
    <h3 class="in-h3">Tus prioridades</h3>
    <div class="in-cards">${tarjetas || '<p class="in-hint">Terminaste tus prioridades: repasa con los quizzes de cada módulo.</p>'}</div>
    <h3 class="in-h3">Todos los módulos</h3>
    <div class="in-mods">${lista}</div>
    <p class="in-archivo">La preparación de Wayve (julio 2026) quedó al final del panel, en Archivo.</p>
  </div>`;
}

function irInicio() {
  if (currentPage) document.getElementById('page-' + currentPage)?.classList.remove('visible');
  currentPage = null;
  document.querySelectorAll('.s-link.active, .module-header.active').forEach(l => l.classList.remove('active'));
  renderInicio();
  document.getElementById('welcome').style.display = '';
  document.getElementById('content').scrollTo({ top: 0 });
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
}

// ══════════════════════════════════════════════════════════════════
//  BUSCADOR
// ══════════════════════════════════════════════════════════════════
document.getElementById('search').addEventListener('input', function() {
  const q = this.value.toLowerCase().trim();
  document.querySelectorAll('.s-link').forEach(link => {
    link.classList.toggle('hidden', q !== '' && !link.textContent.toLowerCase().includes(q));
  });
  if (!q) {
    document.querySelectorAll('.module').forEach(m => m.classList.remove('hidden'));
    return;
  }
  document.querySelectorAll('.module').forEach(mod => {
    const vis = [...mod.querySelectorAll('.s-link')].some(l => !l.classList.contains('hidden'));
    mod.classList.toggle('hidden', !vis);
    if (vis) { mod.querySelector('.module-body').classList.add('open'); mod.querySelector('.module-header').classList.add('open'); }
  });
});

// ══════════════════════════════════════════════════════════════════
//  AUTO OPEN WAYVE MODULE ON LOAD
// ══════════════════════════════════════════════════════════════════
function autoOpenWayve() {
  // Wayve module body is already open via HTML class, just scroll to it
  const wayveSection = document.querySelector('.wayve-label');
  if (wayveSection) wayveSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ══════════════════════════════════════════════════════════════════
//  MEJORA VISUAL — columnas "Ejemplo" / "Ejemplo → Resultado" en kv-table
// ══════════════════════════════════════════════════════════════════
function enhanceExampleColumns() {
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  document.querySelectorAll('.kv-table').forEach(table => {
    let idx = -1;
    table.querySelectorAll('th').forEach((th, i) => {
      if (idx === -1 && th.textContent.trim().startsWith('Ejemplo')) idx = i;
    });
    if (idx === -1) return;
    table.querySelectorAll('tr').forEach(row => {
      if (row.querySelector('th')) return;
      const cell = row.children[idx];
      if (!cell || cell.querySelector('code')) return;
      const raw = cell.textContent.trim();
      if (!raw) return;
      // Solo tratar " | " como separador de varios ejemplos si hay más de una
      // flecha " → " en total — si no, " | " es sintaxis real de Python (ej. unión de sets)
      const arrowCount = (raw.match(/ → /g) || []).length;
      const groups = arrowCount > 1 ? raw.split(' | ') : [raw];
      const items = groups.map(g => g.trim()).filter(Boolean).map(g => {
        const arrowIdx = g.indexOf(' → ');
        if (arrowIdx === -1) return `<div class="ex-item"><code>${esc(g)}</code></div>`;
        const expr = g.slice(0, arrowIdx);
        const result = g.slice(arrowIdx + 3);
        return `<div class="ex-item"><code>${esc(expr)}</code><span class="ex-arrow">→</span><code class="ex-out">${esc(result)}</code></div>`;
      }).join('');
      cell.innerHTML = `<div class="ex-cell">${items}</div>`;
    });
  });
}

// ══════════════════════════════════════════════════════════════════
//  TEMA CLARO / OSCURO
// ══════════════════════════════════════════════════════════════════
function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
}

// ══════════════════════════════════════════════════════════════════
//  BARRA LATERAL — MOSTRAR / OCULTAR
// ══════════════════════════════════════════════════════════════════
function toggleSidebar() {
  const html = document.documentElement;
  const collapsed = html.getAttribute('data-sidebar-collapsed') === 'true';
  if (collapsed) {
    html.removeAttribute('data-sidebar-collapsed');
    localStorage.setItem('sidebar-collapsed', 'false');
  } else {
    html.setAttribute('data-sidebar-collapsed', 'true');
    localStorage.setItem('sidebar-collapsed', 'true');
  }
}

// ══════════════════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════════════════
buildPages();
enhanceExampleColumns();
refreshSidebar();
refreshProgress();
updateThemeIcon(document.documentElement.getAttribute('data-theme'));
// ═════════════════════════════════════════════════
//  DEEP-LINK POR HASH (2026-08-19)
// ═════════════════════════════════════════════════
// `entrevistas.html#istqb-ch1` abre ese tema directo; `#istqb` abre el módulo completo en su
// primer capítulo. Lo pidió Adán: desde su meta de la certificación CT-GenAI, el Dashboard
// enlazaba aquí y caía en la pantalla de bienvenida — "no me abre bien, no me muestra eso" —
// porque este archivo nunca había leído la URL. Acepta las dos formas a propósito: los ids de
// tema cambian cuando se reordena un módulo, el `data-mod` no.
function irDesdeHash() {
  const id = decodeURIComponent((location.hash || '').replace(/^#/, '')).trim();
  if (!id) return false;

  // ¿es un tema? -> existe su página. ¿es un módulo? -> su primer tema.
  let destino = document.getElementById('page-' + id) ? id : null;
  if (!destino) {
    const mod = document.querySelector('.module[data-mod="' + id.replace(/["\\]/g, '') + '"]');
    const primero = mod && mod.querySelector('.s-link');
    const m = primero && (primero.getAttribute('onclick') || '').match(/go\('([^']+)'\)/);
    if (m) destino = m[1];
  }
  if (!destino) return false;

  // El módulo que lo contiene puede estar plegado: sin esto se abre la página pero el sidebar
  // no muestra dónde está parado, que es justo lo que hace sentir que "no abrió bien".
  const link = [...document.querySelectorAll('.s-link')]
    .find(l => (l.getAttribute('onclick') || '').includes("'" + destino + "'"));
  const header = link && link.closest('.module') && link.closest('.module').querySelector('.module-header');
  if (header && !header.classList.contains('open')) toggleMod(header);

  go(destino);
  if (link) link.scrollIntoView({ block: 'center' });
  return true;
}
window.addEventListener('hashchange', irDesdeHash);

// Sin URL concreta se queda en la portada, «Tu preparación, hoy» (ya pintada por refreshProgress()).
irDesdeHash();
