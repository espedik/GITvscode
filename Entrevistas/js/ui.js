
function buildPages() {
  const content = document.getElementById('content');
  for (const [id, d] of Object.entries(T)) {
    const page = document.createElement('div');
    const isWayve = d.mod === 'wayve';
    const isCheat = id === 'py-cheatsheet';
    page.className = 'topic-page' + (isWayve ? ' wayve-page' : '') + (isCheat ? ' fullwidth' : '');
    page.id = 'page-' + id;
    const tagsHtml = d.tags.map(t => `<span class="t-tag">${t}</span>`).join('');

    const richContent = WAYVE_RICH[id] || PYTHON_RICH[id] || PYTHON_RICH2[id] || PYTHON_RICH3[id]
      || AUTO_RICH[id] || PROTO_RICH[id] || DIAG_RICH[id] || TOOLS_RICH[id]
      || STANDARDS_RICH[id] || TESTING_RICH[id] || GIT_RICH[id] || DEVOPS_RICH[id]
      || METOD_RICH[id] || ISTQB_RICH[id] || INTERVIEW_RICH[id]
      ? (WAYVE_RICH[id] || PYTHON_RICH[id] || PYTHON_RICH2[id] || PYTHON_RICH3[id]
         || AUTO_RICH[id] || PROTO_RICH[id] || DIAG_RICH[id] || TOOLS_RICH[id]
         || STANDARDS_RICH[id] || TESTING_RICH[id] || GIT_RICH[id] || DEVOPS_RICH[id]
         || METOD_RICH[id] || ISTQB_RICH[id] || INTERVIEW_RICH[id])
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
  document.querySelectorAll('.s-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.s-link').forEach(l => {
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
//  INIT
// ══════════════════════════════════════════════════════════════════
document.getElementById('ws-topics').textContent = TOTAL;
buildPages();
refreshSidebar();
refreshProgress();
// Auto-navigate to study plan on first load (reset key so it opens again)
if (!localStorage.getItem('wayve-visited-v2')) {
  localStorage.setItem('wayve-visited-v2', '1');
  go('wayve-plan');
}
