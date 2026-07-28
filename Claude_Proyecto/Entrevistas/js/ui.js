
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
  document.getElementById('ws-done').textContent = doneCount;
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
document.getElementById('ws-topics').textContent = TOTAL;
buildPages();
enhanceExampleColumns();
refreshSidebar();
refreshProgress();
updateThemeIcon(document.documentElement.getAttribute('data-theme'));
// Auto-navigate to study plan on first load (reset key so it opens again)
if (!localStorage.getItem('wayve-visited-v2')) {
  localStorage.setItem('wayve-visited-v2', '1');
  go('wayve-plan');
}
