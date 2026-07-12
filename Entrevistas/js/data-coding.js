// ══════════════════════════════════════════════════════════════════
//  CODING_RICH — Coding Challenges (movido fuera de WAYVE_RICH)
// ══════════════════════════════════════════════════════════════════
const CODING_RICH = {

'wayve-algo-approach': `
<style>
  .step-flow { display:flex; flex-direction:column; gap:0; margin:16px 0; }
  .step-row {
    display:flex; gap:0; align-items:stretch;
  }
  .step-connector-col { display:flex; flex-direction:column; align-items:center; width:48px; flex-shrink:0; }
  .step-num-bubble {
    width:40px; height:40px; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    font-size:.85rem; font-weight:900; color:#fff; flex-shrink:0;
    box-shadow:0 2px 8px rgba(0,0,0,.18);
    position:relative; z-index:1;
  }
  .step-line { width:2px; flex:1; background:linear-gradient(to bottom, #CBD5E1, #E5E7EB); min-height:12px; }
  .step-body {
    flex:1; background:#fff; border:1px solid #E5E7EB; border-radius:10px;
    padding:14px 18px; margin-bottom:8px; margin-left:12px;
    box-shadow:0 1px 3px rgba(0,0,0,.06);
    transition: box-shadow .15s;
  }
  .step-body:hover { box-shadow:0 4px 12px rgba(0,0,0,.1); }
  .step-body-head { display:flex; align-items:center; gap:10px; margin-bottom:6px; }
  .step-body-head .s-label { font-size:.65rem; font-weight:700; text-transform:uppercase; letter-spacing:.08em; padding:2px 8px; border-radius:4px; }
  .step-body h4 { font-size:.88rem; font-weight:700; color:var(--text); margin-bottom:6px; }
  .step-body p { font-size:.8rem; color:var(--text-muted); line-height:1.75; }
  .step-body .step-chips { display:flex; flex-wrap:wrap; gap:5px; margin-top:8px; }
  .step-body .step-chip { font-size:.7rem; padding:3px 9px; border-radius:99px; background:#F1F5F9; color:#475569; border:1px solid #E2E8F0; }
  .step-b1 { background:#2563EB; } .step-b1-light { background:#EFF6FF; color:#1D4ED8; }
  .step-b2 { background:#7C3AED; } .step-b2-light { background:#F5F3FF; color:#6D28D9; }
  .step-b3 { background:#0891B2; } .step-b3-light { background:#ECFEFF; color:#0E7490; }
  .step-b4 { background:#059669; } .step-b4-light { background:#ECFDF5; color:#047857; }
  .step-b5 { background:#D97706; } .step-b5-light { background:#FFFBEB; color:#B45309; }
  .step-b6 { background:#DC2626; } .step-b6-light { background:#FEF2F2; color:#B91C1C; }

  .approach-summary {
    display:grid; grid-template-columns:repeat(6,1fr); gap:8px; margin:16px 0;
  }
  .approach-mini {
    background:#fff; border:1px solid #E5E7EB; border-radius:8px;
    padding:10px 8px; text-align:center; cursor:pointer; transition:all .15s;
  }
  .approach-mini:hover { border-color:#2563EB; transform:translateY(-2px); box-shadow:0 4px 10px rgba(37,99,235,.15); }
  .approach-mini .am-num { font-size:1.2rem; font-weight:900; margin-bottom:4px; }
  .approach-mini .am-label { font-size:.65rem; color:var(--text-muted); line-height:1.3; }

  .script-card {
    background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
    border-radius:12px; padding:20px; margin:12px 0; color:#E2E8F0;
  }
  .script-card-title { font-size:.7rem; font-weight:800; text-transform:uppercase; letter-spacing:.1em; color:#64748B; margin-bottom:14px; }
  .script-line { display:flex; gap:12px; padding:8px 0; border-bottom:1px solid #1E293B; }
  .script-line:last-child { border-bottom:none; }
  .script-when { font-size:.68rem; font-weight:700; color:#64748B; min-width:80px; padding-top:2px; white-space:nowrap; }
  .script-say { font-size:.8rem; color:#94A3B8; line-height:1.65; font-style:italic; }
  .script-say b { color:#38BDF8; font-style:normal; }
  .script-say em { color:#A5F3FC; }

  .pattern-row { display:grid; grid-template-columns:1.8fr 1.2fr 0.7fr 1.5fr; gap:0; font-size:.79rem; }
  .pattern-row.hdr { font-size:.65rem; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:var(--text-muted); background:var(--bg); padding:8px 12px; border-radius:8px 8px 0 0; }
  .pattern-row.row { padding:10px 12px; border-bottom:1px solid var(--border); background:#fff; }
  .pattern-row.row:last-child { border-bottom:none; border-radius:0 0 8px 8px; }
  .pattern-row.row:hover { background:var(--bg); }
  .pattern-badge { display:inline-flex; align-items:center; gap:5px; font-size:.75rem; font-weight:600; padding:3px 10px; border-radius:99px; white-space:nowrap; }

  .bigo-bar-row { display:flex; align-items:center; gap:10px; margin:5px 0; }
  .bigo-label { font-family:'Consolas',monospace; font-size:.75rem; font-weight:700; min-width:90px; color:var(--text); }
  .bigo-bar-wrap { flex:1; height:22px; background:var(--bg); border-radius:4px; overflow:hidden; position:relative; }
  .bigo-bar { height:100%; border-radius:4px; display:flex; align-items:center; padding-left:8px; font-size:.66rem; font-weight:700; color:#fff; white-space:nowrap; }
  .bigo-example { font-size:.72rem; color:var(--text-muted); min-width:180px; }
  .bigo-n1 { background:#16A34A; width:4%; }
  .bigo-logn { background:#2563EB; width:8%; }
  .bigo-n { background:#7C3AED; width:30%; }
  .bigo-nlogn { background:#D97706; width:50%; }
  .bigo-n2 { background:#DC2626; width:85%; }
  .bigo-2n { background:#7F1D1D; width:100%; }

  .op-table { width:100%; border-collapse:collapse; font-size:.78rem; margin:10px 0; }
  .op-table th { background:var(--sidebar-bg); color:#94A3B8; font-size:.63rem; font-weight:700; text-transform:uppercase; letter-spacing:.07em; padding:7px 10px; text-align:left; }
  .op-table td { padding:8px 10px; border-bottom:1px solid var(--border); vertical-align:top; }
  .op-table tr:last-child td { border-bottom:none; }
  .op-table tr:hover td { background:var(--bg); }
  .op-table td:first-child { font-family:'Consolas',monospace; font-size:.75rem; font-weight:700; color:var(--accent); }
  .op-table td:nth-child(2) { color:var(--text-muted); }
  .op-table td.fast { color:#16A34A; font-weight:700; }
  .op-table td.slow { color:#DC2626; font-weight:700; }
  .op-table td.warn { color:#D97706; font-weight:700; }

  .py-tool-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:10px 0; }
  .py-tool-card { background:#fff; border:1px solid var(--border); border-radius:8px; padding:12px; }
  .py-tool-card h5 { font-size:.75rem; font-weight:800; color:var(--text); margin-bottom:8px; display:flex; align-items:center; gap:6px; }
  .py-tool-card code { display:block; background:#0D1117; color:#E6EDF3; font-family:'Consolas',monospace; font-size:.73rem; padding:8px 10px; border-radius:6px; margin-top:6px; line-height:1.6; white-space:pre; overflow-x:auto; }
  .py-tool-card p { font-size:.76rem; color:var(--text-muted); line-height:1.65; }

  .ec-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin:12px 0; }
  .ec-card { background:#fff; border:1px solid var(--border); border-radius:8px; padding:13px; }
  .ec-card-title { font-size:.68rem; font-weight:800; text-transform:uppercase; letter-spacing:.07em; margin-bottom:8px; padding-bottom:6px; border-bottom:2px solid; }
  .ec-card li { font-size:.76rem; color:var(--text-muted); line-height:1.9; list-style:none; padding-left:14px; position:relative; }
  .ec-card li::before { content:'→'; position:absolute; left:0; font-size:.68rem; }
  .ec-card.red { border-top:3px solid #DC2626; } .ec-card.red .ec-card-title { color:#DC2626; border-color:#FCA5A5; }
  .ec-card.red li::before { color:#DC2626; }
  .ec-card.amber { border-top:3px solid #D97706; } .ec-card.amber .ec-card-title { color:#D97706; border-color:#FCD34D; }
  .ec-card.amber li::before { color:#D97706; }
  .ec-card.blue { border-top:3px solid #2563EB; } .ec-card.blue .ec-card-title { color:#2563EB; border-color:#BFDBFE; }
  .ec-card.blue li::before { color:#2563EB; }

  .err-card { background:#fff; border:1px solid var(--border); border-radius:10px; margin-bottom:8px; overflow:hidden; }
  .err-head { display:flex; align-items:center; gap:10px; padding:12px 16px; background:var(--bg); border-bottom:1px solid var(--border); }
  .err-icon { width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.75rem; font-weight:900; flex-shrink:0; }
  .err-icon.bug { background:#FEE2E2; color:#DC2626; }
  .err-icon.warn { background:#FEF3C7; color:#D97706; }
  .err-title { font-size:.84rem; font-weight:700; color:var(--text); }
  .err-body { padding:12px 16px; font-size:.8rem; color:var(--text-muted); line-height:1.7; }
  .err-fix { background:#F0FDF4; border-top:1px solid #D1FAE5; padding:10px 16px; font-size:.78rem; color:#047857; }
  .err-fix b { color:#047857; }

  .stuck-card { background:#fff; border:1px solid var(--border); border-radius:10px; margin-bottom:10px; padding:14px 18px; }
  .stuck-card h4 { font-size:.84rem; font-weight:700; color:var(--text); margin-bottom:8px; display:flex; align-items:center; gap:8px; }
  .stuck-card p { font-size:.8rem; color:var(--text-muted); line-height:1.75; }
  .stuck-card .say-it { background:#EFF6FF; border-left:3px solid #2563EB; border-radius:0 6px 6px 0; padding:8px 12px; margin-top:8px; font-size:.78rem; color:#1D4ED8; font-style:italic; }

  .optim-card { background:#fff; border:1px solid var(--border); border-radius:10px; overflow:hidden; margin-bottom:10px; }
  .optim-head { display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:8px; padding:12px 16px; background:var(--bg); border-bottom:1px solid var(--border); }
  .optim-from { font-size:.78rem; font-weight:700; color:#DC2626; }
  .optim-arrow { font-size:1.1rem; color:var(--text-muted); }
  .optim-to { font-size:.78rem; font-weight:700; color:#16A34A; }
  .optim-body { padding:12px 16px; font-size:.79rem; color:var(--text-muted); line-height:1.7; }
  .optim-body b { color:var(--text); }
</style>
<div class="tab-group-approach">
  <div class="tab-bar" style="flex-wrap:wrap;gap:3px">
    <button class="tab-btn active" onclick="switchTab(this,'ap-1','approach')">🔢 Los 6 pasos</button>
    <button class="tab-btn" onclick="switchTab(this,'ap-2','approach')">🔍 Reconocer patrón</button>
    <button class="tab-btn" onclick="switchTab(this,'ap-3','approach')">⏱️ Big O visual</button>
    <button class="tab-btn" onclick="switchTab(this,'ap-4','approach')">🐍 Python tools</button>
    <button class="tab-btn" onclick="switchTab(this,'ap-5','approach')">⚠️ Edge cases</button>
    <button class="tab-btn" onclick="switchTab(this,'ap-6','approach')">❌ Errores comunes</button>
    <button class="tab-btn" onclick="switchTab(this,'ap-7','approach')">🆘 Si te atascas</button>
    <button class="tab-btn" onclick="switchTab(this,'ap-8','approach')">⚡ Cómo optimizar</button>
  </div>

  <!-- ════ TAB 1: 6 PASOS ════ -->
  <div id="ap-1" class="tab-panel active">

    <!-- Resumen visual compacto -->
    <div class="approach-summary">
      <div class="approach-mini"><div class="am-num" style="color:#2563EB">01</div><div class="am-label">Clarifica<br>el problema</div></div>
      <div class="approach-mini"><div class="am-num" style="color:#7C3AED">02</div><div class="am-label">Ejemplo<br>manual</div></div>
      <div class="approach-mini"><div class="am-num" style="color:#0891B2">03</div><div class="am-label">Elige<br>el patrón</div></div>
      <div class="approach-mini"><div class="am-num" style="color:#059669">04</div><div class="am-label">Codea<br>en voz alta</div></div>
      <div class="approach-mini"><div class="am-num" style="color:#D97706">05</div><div class="am-label">Traza<br>el ejemplo</div></div>
      <div class="approach-mini"><div class="am-num" style="color:#DC2626">06</div><div class="am-label">Edge<br>cases</div></div>
    </div>

    <div class="alert-card">
      🎯 <strong>El entrevistador evalúa TU PROCESO más que la solución final.</strong> Alguien que sigue estos pasos sin terminar el código supera a quien escribe código en silencio. Habla en todo momento.
    </div>

    <!-- STEP FLOW -->
    <div class="step-flow">

      <div class="step-row">
        <div class="step-connector-col">
          <div class="step-num-bubble step-b1">01</div>
          <div class="step-line"></div>
        </div>
        <div class="step-body">
          <div class="step-body-head">
            <span class="s-label step-b1-light">⏱ 2 min · CRÍTICO</span>
          </div>
          <h4>Clarifica el problema — NUNCA empieces a codear sin esto</h4>
          <p>Haz estas preguntas antes de tocar el teclado. El entrevistador espera que las hagas.</p>
          <div class="step-chips">
            <span class="step-chip"><em>"Is the input always sorted?"</em></span>
            <span class="step-chip"><em>"What if the input is empty?"</em></span>
            <span class="step-chip"><em>"Can values be negative?"</em></span>
            <span class="step-chip"><em>"Are there duplicate values?"</em></span>
            <span class="step-chip"><em>"What's the expected size — 100 or 10 million?"</em></span>
            <span class="step-chip"><em>"Should I optimize for time or memory?"</em></span>
          </div>
          <p style="margin-top:8px"><b>Por qué importa:</b> implementar la solución perfecta para el problema equivocado = fail automático. 2 minutos de preguntas pueden salvarte.</p>
        </div>
      </div>

      <div class="step-row">
        <div class="step-connector-col">
          <div class="step-num-bubble step-b2">02</div>
          <div class="step-line"></div>
        </div>
        <div class="step-body">
          <div class="step-body-head">
            <span class="s-label step-b2-light">⏱ 2 min · OBLIGATORIO</span>
          </div>
          <h4>Trabaja un ejemplo manual con datos concretos</h4>
          <p>Toma el ejemplo del enunciado y resuélvelo <b>a mano</b>, paso a paso, <em>antes</em> de pensar en código:</p>
          <div style="background:#0D1117;border-radius:7px;padding:10px 14px;margin-top:8px;font-family:'Consolas',monospace;font-size:.76rem;color:#E6EDF3;line-height:1.8">
            Input: [0, 33, 66, 600], threshold=200ms<br>
            <span style="color:#7EE787">i=1: 33-0=33    → 33 &lt; 200  ✓ no gap</span><br>
            <span style="color:#7EE787">i=2: 66-33=33   → 33 &lt; 200  ✓ no gap</span><br>
            <span style="color:#FF7B72">i=3: 600-66=534 → 534 &gt; 200 ✗ GAP encontrado! (66ms → 600ms)</span><br>
            <span style="color:#FFA657">Output: [{"start":66, "end":600, "gap":534}]</span>
          </div>
          <p style="margin-top:8px"><b>Por qué importa:</b> Este paso te regala la lógica del algoritmo. El código es solo la traducción de lo que acabas de hacer a mano. Si no puedes hacerlo a mano, no puedes codearlo.</p>
        </div>
      </div>

      <div class="step-row">
        <div class="step-connector-col">
          <div class="step-num-bubble step-b3">03</div>
          <div class="step-line"></div>
        </div>
        <div class="step-body">
          <div class="step-body-head">
            <span class="s-label step-b3-light">⏱ 1-2 min · DECLARA EN VOZ ALTA</span>
          </div>
          <h4>Elige el patrón y declara la complejidad ANTES de codear</h4>
          <p>Di esta frase exacta en inglés:</p>
          <div style="background:#EFF6FF;border-left:3px solid #2563EB;border-radius:0 7px 7px 0;padding:10px 14px;margin-top:8px;font-size:.79rem;color:#1D4ED8;font-style:italic;line-height:1.75">
            "My approach will be <b>[PATRÓN]</b> because the problem asks for <b>[RAZÓN]</b>.<br>
            Time complexity will be <b>O([X])</b> because <b>[EXPLICACIÓN]</b>.<br>
            Space complexity <b>O([Y])</b>. Let me start coding."
          </div>
          <div class="step-chips" style="margin-top:8px">
            <span class="step-chip">🪟 Sliding Window → subarray/stream</span>
            <span class="step-chip">🗄️ HashMap → frecuencias/two sum</span>
            <span class="step-chip">👆 Two Pointers → array ordenado</span>
            <span class="step-chip">🔍 Binary Search → ordenado + búsqueda</span>
            <span class="step-chip">🌊 BFS → camino mínimo</span>
            <span class="step-chip">🏆 Heap → top-K</span>
          </div>
        </div>
      </div>

      <div class="step-row">
        <div class="step-connector-col">
          <div class="step-num-bubble step-b4">04</div>
          <div class="step-line"></div>
        </div>
        <div class="step-body">
          <div class="step-body-head">
            <span class="s-label step-b4-light">⏱ 10-15 min · NARRAR SIEMPRE</span>
          </div>
          <h4>Escribe el código — habla mientras lo haces, sin parar</h4>
          <p><b>Las 5 reglas de oro al codear:</b></p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">
            <div style="background:var(--bg);border-radius:7px;padding:10px 12px">
              <div style="font-size:.7rem;font-weight:800;color:#059669;margin-bottom:4px">✓ HAZ ESTO</div>
              <ul style="font-size:.76rem;color:var(--text-muted);line-height:2;list-style:disc;padding-left:14px">
                <li>Narra cada línea que escribes</li>
                <li>Usa nombres descriptivos siempre</li>
                <li>Empieza simple, luego optimiza</li>
                <li>Type hints en Python (<code>def fn(x: list) -> dict</code>)</li>
                <li>Tacha errores, no borres</li>
              </ul>
            </div>
            <div style="background:var(--bg);border-radius:7px;padding:10px 12px">
              <div style="font-size:.7rem;font-weight:800;color:#DC2626;margin-bottom:4px">✗ EVITA ESTO</div>
              <ul style="font-size:.76rem;color:var(--text-muted);line-height:2;list-style:disc;padding-left:14px">
                <li>Variables <code>i, j, x, a, b</code></li>
                <li>Silencio por más de 20 segundos</li>
                <li>Borrar y empezar de cero</li>
                <li>Optimizar antes de que funcione</li>
                <li>Parar si no recuerdas el API exacto</li>
              </ul>
            </div>
          </div>
          <p style="margin-top:8px;font-size:.78rem;color:var(--text-muted)"><b>Frases para mantener el flujo:</b> <em>"I'm grouping events by sensor ID…" / "Here I check the gap condition…" / "I'll come back to optimize this later — let me get the correctness first."</em></p>
        </div>
      </div>

      <div class="step-row">
        <div class="step-connector-col">
          <div class="step-num-bubble step-b5">05</div>
          <div class="step-line"></div>
        </div>
        <div class="step-body">
          <div class="step-body-head">
            <span class="s-label step-b5-light">⏱ 3 min · ANTES DE DECIR "DONE"</span>
          </div>
          <h4>Traza tu código con el ejemplo del paso 2</h4>
          <p>Ejecuta tu código <em>mentalmente</em>, línea por línea, con los datos concretos que usaste en el paso 2. Di en voz alta:</p>
          <div style="background:#FFFBEB;border-left:3px solid #D97706;border-radius:0 7px 7px 0;padding:10px 14px;margin-top:8px;font-size:.79rem;color:#92400E;font-style:italic;line-height:1.75">
            "Let me trace through my code with the example: timestamps=[0,33,66,600], threshold=200.<br>
            Loop i=1: diff = 33-0 = 33. 33 &lt; 200 → no gap, continue.<br>
            Loop i=2: diff = 66-33 = 33. Same → no gap.<br>
            Loop i=3: diff = 600-66 = 534. 534 &gt; 200 → append gap. Result: [{'start':66,'end':600,'gap':534}].<br>
            Matches my expected output from step 2 — looks correct."
          </div>
          <p style="margin-top:8px"><b>Por qué importa:</b> Encontrar un bug en la traza = mucho mejor que el entrevistador lo encuentre. Muestra que verificas tu propio trabajo.</p>
        </div>
      </div>

      <div class="step-row">
        <div class="step-connector-col">
          <div class="step-num-bubble step-b6">06</div>
        </div>
        <div class="step-body">
          <div class="step-body-head">
            <span class="s-label step-b6-light">⏱ 2 min · AUNQUE NO LOS IMPLEMENTES</span>
          </div>
          <h4>Declara los edge cases — sin que te los pidan</h4>
          <p>Di esta frase y luego enumera:</p>
          <div style="background:#FEF2F2;border-left:3px solid #DC2626;border-radius:0 7px 7px 0;padding:10px 14px;margin-top:8px;font-size:.79rem;color:#991B1B;font-style:italic;line-height:1.75">
            "Before I finish, let me think about edge cases:<br>
            • Empty input → I return an empty list, which my code handles correctly since the loop doesn't execute.<br>
            • Single timestamp → no pairs, result is empty — also handled.<br>
            • All same timestamps → diff=0 which is less than threshold, no gaps — correct.<br>
            • Unsorted input → my solution assumes sorted; if not, I'd sort first, adding O(n log n).<br>
            • Threshold of 0 → every consecutive pair would be a gap — is that intended?"
          </div>
          <p style="margin-top:8px">Declarar edge cases sin que te los pidan = <b>señal de engineer senior</b>. Mencionar que "los manejaría en producción aunque no los implemente aquí por tiempo" es completamente aceptable.</p>
        </div>
      </div>

    </div><!-- end step-flow -->

    <!-- SCRIPT DE APERTURA -->
    <div class="script-card">
      <div class="script-card-title">🎙️ Script exacto de apertura — memoriza estas frases</div>
      <div class="script-line">
        <div class="script-when">Primer minuto</div>
        <div class="script-say"><em>"Let me make sure I understand the problem. We're given <b>[restate input]</b> and we need to return <b>[restate output]</b>. Is that right?"</em></div>
      </div>
      <div class="script-line">
        <div class="script-when">Clarificación</div>
        <div class="script-say"><em>"A few clarifying questions: Is the input always sorted by timestamp? Can there be duplicates? What should I return if the input is empty? What's the expected scale — hundreds or millions of events?"</em></div>
      </div>
      <div class="script-line">
        <div class="script-when">Ejemplo</div>
        <div class="script-say"><em>"Let me work through a small example manually first. With input <b>[X]</b>, the expected output should be <b>[Y]</b> because <b>[razonamiento]</b>. Does that match your expectation?"</em></div>
      </div>
      <div class="script-line">
        <div class="script-when">Anunciar approach</div>
        <div class="script-say"><em>"My approach will be <b>[PATRÓN]</b> — time complexity O(<b>[X]</b>), space O(<b>[Y]</b>). Let me start coding."</em></div>
      </div>
      <div class="script-line">
        <div class="script-when">Mientras codeas</div>
        <div class="script-say"><em>"I'm using a defaultdict to group timestamps by sensor ID… here I sort each sensor's timestamps… and here I scan for gaps by comparing consecutive elements."</em></div>
      </div>
      <div class="script-line">
        <div class="script-when">Al terminar</div>
        <div class="script-say"><em>"Let me trace through the example… [traza]. Looks correct. Edge cases: empty input returns {} — handled. Single event — no gaps, handled. Unsorted — I'd sort first. Any questions about my solution?"</em></div>
      </div>
    </div>

    <!-- TIMING GUIDE -->
    <div class="plan-card" style="margin-top:12px">
      <div class="plan-card-title">⏰ Gestión del tiempo — qué hacer si te está acabando</div>
      <div class="two-col">
        <div class="info-card">
          <h5>Si quedan 10 min y no empezaste</h5>
          <ul>
            <li>Propón la solución O(n²) primero: <em>"Let me start with the brute force and optimize."</em></li>
            <li>Implementa el bruto — es mejor que no tener nada</li>
            <li>Luego di: <em>"The bottleneck is this nested loop. I can eliminate it with a HashMap to get O(n)."</em></li>
            <li>Muestra el approach aunque no termines el código</li>
          </ul>
        </div>
        <div class="info-card">
          <h5>Si quedan 5 min y el código no está completo</h5>
          <ul>
            <li>Para de codear: <em>"I'm running low on time — let me describe what remains."</em></li>
            <li>Explica en pseudocódigo las partes que faltan</li>
            <li>Declara la complejidad aunque el código no compile</li>
            <li>Menciona edge cases verbalmente</li>
          </ul>
        </div>
      </div>
    </div>

  </div>

  <!-- ════ TAB 2: RECONOCER PATRÓN ════ -->
  <div id="ap-2" class="tab-panel">
    <div style="background:linear-gradient(135deg,#0F172A,#1E293B);border-radius:12px;padding:16px 20px;margin-bottom:16px;color:#E2E8F0">
      <div style="font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#64748B;margin-bottom:10px">Cómo usar esta tabla</div>
      <p style="font-size:.82rem;color:#94A3B8;line-height:1.75">Lee el enunciado → busca las <b style="color:#38BDF8">palabras clave</b> → elige el patrón → declara la complejidad. En 30 segundos debes saber la categoría. Con 20 ejercicios practicados, se vuelve reflejo.</p>
    </div>

    <div style="border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:16px">
      <div class="pattern-row hdr">
        <div>Si el enunciado menciona…</div><div>Patrón</div><div>Complejidad</div><div>Tip clave</div>
      </div>
      <div class="pattern-row row">
        <div><b>"subarray/substring contiguo"</b> + max/min/suma / <b>"ventana de tiempo"</b> / <b>"stream"</b></div>
        <div><span class="pattern-badge" style="background:#EFF6FF;color:#1D4ED8">🪟 Sliding Window</span></div>
        <div style="color:#16A34A;font-weight:700">O(n)</div>
        <div style="font-size:.76rem;color:var(--text-muted)">Fija: +nuevo -viejo. Variable: while inválido → encoge izq</div>
      </div>
      <div class="pattern-row row">
        <div><b>"array ORDENADO"</b> + <b>"dos números que sumen X"</b> / comparar / palíndromo / eliminar dups</div>
        <div><span class="pattern-badge" style="background:#F5F3FF;color:#6D28D9">👆 Two Pointers</span></div>
        <div style="color:#16A34A;font-weight:700">O(n)</div>
        <div style="font-size:.76rem;color:var(--text-muted)">left=0, right=n-1. Si no ordenado → sort primero O(n log n)</div>
      </div>
      <div class="pattern-row row">
        <div><b>"frecuencia"</b> / <b>"duplicados"</b> / <b>"two sum"</b> / <b>"primer elemento que..."</b> / agrupar</div>
        <div><span class="pattern-badge" style="background:#ECFDF5;color:#047857">🗄️ HashMap / Counter</span></div>
        <div style="color:#16A34A;font-weight:700">O(n)</div>
        <div style="font-size:.76rem;color:var(--text-muted)">¿Existe X? → set. ¿Cuántas veces? → Counter. ¿Agrupar? → defaultdict</div>
      </div>
      <div class="pattern-row row">
        <div><b>"array ORDENADO"</b> + <b>"encuentra elemento/índice"</b> / <b>"primera posición donde..."</b></div>
        <div><span class="pattern-badge" style="background:#EFF6FF;color:#1D4ED8">🔍 Binary Search</span></div>
        <div style="color:#16A34A;font-weight:700">O(log n)</div>
        <div style="font-size:.76rem;color:var(--text-muted)">bisect_left/right. "Minimizar X tal que f(X)" → BS on answer</div>
      </div>
      <div class="pattern-row row">
        <div><b>"camino más corto"</b> / <b>"mínimos pasos"</b> / <b>"nivel por nivel"</b> / alcanzable / grafo no ponderado</div>
        <div><span class="pattern-badge" style="background:#ECFEFF;color:#0E7490">🌊 BFS</span></div>
        <div style="color:#D97706;font-weight:700">O(V+E)</div>
        <div style="font-size:.76rem;color:var(--text-muted)">deque, no list. Marcar visitado al AGREGAR, no al POP</div>
      </div>
      <div class="pattern-row row">
        <div><b>"todos los caminos"</b> / <b>"ciclos"</b> / <b>"componentes"</b> / orden topológico / backtracking</div>
        <div><span class="pattern-badge" style="background:#ECFDF5;color:#047857">🌲 DFS</span></div>
        <div style="color:#D97706;font-weight:700">O(V+E)</div>
        <div style="font-size:.76rem;color:var(--text-muted)">Recursivo o stack. 3 colores para ciclos (blanco/gris/negro)</div>
      </div>
      <div class="pattern-row row">
        <div><b>"top K"</b> / <b>"K más frecuente/grande/pequeño"</b> / mediana de stream / merge K listas</div>
        <div><span class="pattern-badge" style="background:#FEF3C7;color:#B45309">🏆 Heap</span></div>
        <div style="color:#D97706;font-weight:700">O(n log k)</div>
        <div style="font-size:.76rem;color:var(--text-muted)">heapq es min-heap. Para max-heap: negar valores</div>
      </div>
      <div class="pattern-row row">
        <div><b>"intervalos"</b> / <b>"overlapping"</b> / <b>"merge sessions"</b> / tiempo total cubierto</div>
        <div><span class="pattern-badge" style="background:#FEF2F2;color:#B91C1C">📐 Intervals</span></div>
        <div style="color:#D97706;font-weight:700">O(n log n)</div>
        <div style="font-size:.76rem;color:var(--text-muted)">Sort por start. Si start ≤ prev_end → overlap → max(ends)</div>
      </div>
      <div class="pattern-row row">
        <div><b>"orden de tareas"</b> / <b>"prerequisitos"</b> / <b>"dependencias"</b> / ¿hay ciclo?</div>
        <div><span class="pattern-badge" style="background:#EFF6FF;color:#1D4ED8">📊 Topo Sort</span></div>
        <div style="color:#D97706;font-weight:700">O(V+E)</div>
        <div style="font-size:.76rem;color:var(--text-muted)">Kahn's: in-degree map + deque con in-degree=0</div>
      </div>
      <div class="pattern-row row">
        <div><b>"máximo/mínimo subarray SUM"</b> / <b>"secuencia más larga válida"</b></div>
        <div><span class="pattern-badge" style="background:#F5F3FF;color:#6D28D9">📈 DP / Kadane</span></div>
        <div style="color:#16A34A;font-weight:700">O(n)</div>
        <div style="font-size:.76rem;color:var(--text-muted)">cur = max(num, cur+num). Reinicia si cur+num &lt; num</div>
      </div>
      <div class="pattern-row row">
        <div><b>"paréntesis balanceados"</b> / <b>"deshacer"</b> / <b>"siguiente elemento mayor/menor"</b></div>
        <div><span class="pattern-badge" style="background:#ECFDF5;color:#047857">📚 Stack</span></div>
        <div style="color:#16A34A;font-weight:700">O(n)</div>
        <div style="font-size:.76rem;color:var(--text-muted)">LIFO con list. Monotonic stack para next greater/smaller</div>
      </div>
      <div class="pattern-row row">
        <div><b>"parsear texto"</b> / <b>"extraer patrón"</b> / <b>"logs de CI"</b> / clasificar líneas</div>
        <div><span class="pattern-badge" style="background:#FEF3C7;color:#B45309">🔤 Regex + String</span></div>
        <div style="color:#16A34A;font-weight:700">O(n·m)</div>
        <div style="font-size:.76rem;color:var(--text-muted)">Compilar fuera del loop. Named groups. re.search &gt; re.match</div>
      </div>
    </div>

    <!-- DECISIÓN RÁPIDA -->
    <div class="two-col">
      <div class="alert-card" style="margin:0">
        💡 <b>Two Pointers vs Sliding Window:</b><br>
        Two Pointers → comparas elementos en <em>posiciones distintas</em>.<br>
        Sliding Window → <em>acumulas</em> algo dentro de la ventana (suma, conteo).
      </div>
      <div class="alert-card" style="margin:0">
        💡 <b>BFS vs DFS:</b><br>
        BFS → camino <em>mínimo</em>, explorar por niveles.<br>
        DFS → <em>todos</em> los caminos, ciclos, backtracking, topo.
      </div>
    </div>
  </div>

  <!-- ════ TAB 3: BIG O VISUAL ════ -->
  <div id="ap-3" class="tab-panel">
    <div class="plan-card">
      <div class="plan-card-title">⏱️ Jerarquía de complejidades — visual</div>
      <div class="plan-block">
        <div class="plan-time">Velocidad relativa<br><span style="font-size:.65rem;color:var(--text-muted)">n = 1,000,000</span></div>
        <div class="plan-content">
          <div style="margin:10px 0">
            <div class="bigo-bar-row">
              <div class="bigo-label">O(1)</div>
              <div class="bigo-bar-wrap"><div class="bigo-bar bigo-n1">1 op</div></div>
              <div class="bigo-example">dict lookup, array[i], hash set</div>
            </div>
            <div class="bigo-bar-row">
              <div class="bigo-label">O(log n)</div>
              <div class="bigo-bar-wrap"><div class="bigo-bar bigo-logn">~20 ops</div></div>
              <div class="bigo-example">binary search, bisect, balanced BST</div>
            </div>
            <div class="bigo-bar-row">
              <div class="bigo-label">O(n)</div>
              <div class="bigo-bar-wrap"><div class="bigo-bar bigo-n">1M ops</div></div>
              <div class="bigo-example">1 loop, sliding window, two pointers</div>
            </div>
            <div class="bigo-bar-row">
              <div class="bigo-label">O(n log n)</div>
              <div class="bigo-bar-wrap"><div class="bigo-bar bigo-nlogn">20M ops</div></div>
              <div class="bigo-example">sort, merge sort, heap operations × n</div>
            </div>
            <div class="bigo-bar-row">
              <div class="bigo-label">O(n²)</div>
              <div class="bigo-bar-wrap"><div class="bigo-bar bigo-n2">1T ops ❌</div></div>
              <div class="bigo-example">loops anidados — EVITAR si n &gt; 10K</div>
            </div>
            <div class="bigo-bar-row">
              <div class="bigo-label">O(2ⁿ)</div>
              <div class="bigo-bar-wrap"><div class="bigo-bar bigo-2n">∞ ❌❌</div></div>
              <div class="bigo-example">backtracking sin poda — sin optimización = imposible</div>
            </div>
          </div>
          <div class="alert-card" style="margin-top:8px">⚠️ <b>Regla de oro:</b> Si n &gt; 10,000 y tienes O(n²) → el entrevistador lo notará. Siempre pregunta la escala del input.</div>
        </div>
      </div>
    </div>

    <div class="plan-card" style="margin-top:12px">
      <div class="plan-card-title">📋 Operaciones de Python — complejidad exacta</div>
      <div class="plan-block">
        <div class="plan-time">Estructuras</div>
        <div class="plan-content">
          <table class="op-table">
            <thead><tr><th>Operación</th><th>Estructura</th><th>Time</th><th>Notas</th></tr></thead>
            <tbody>
              <tr><td>x in / x[k] / del x[k]</td><td>dict / set</td><td class="fast">O(1) amort.</td><td>Peor caso O(n) por hash collision — raro</td></tr>
              <tr><td>append / pop()</td><td>list (final)</td><td class="fast">O(1)</td><td>pop(-1). NO pop(0)</td></tr>
              <tr><td>insert(i, x) / pop(0)</td><td>list (medio)</td><td class="slow">O(n)</td><td>Desplaza todos los elementos</td></tr>
              <tr><td>append / popleft</td><td>deque</td><td class="fast">O(1)</td><td>Usar para queues — nunca list.pop(0)</td></tr>
              <tr><td>heappush / heappop</td><td>heapq</td><td class="warn">O(log n)</td><td>n = tamaño actual del heap</td></tr>
              <tr><td>heapify(list)</td><td>heapq</td><td class="warn">O(n)</td><td>Más eficiente que n × heappush</td></tr>
              <tr><td>list.sort() / sorted()</td><td>list</td><td class="warn">O(n log n)</td><td>TimSort — estable, in-place para .sort()</td></tr>
              <tr><td>min() / max()</td><td>iterable</td><td class="slow">O(n)</td><td>Scan lineal — si lo haces en un loop → O(n²)</td></tr>
              <tr><td>bisect_left / bisect_right</td><td>sorted list</td><td class="fast">O(log n)</td><td>Requiere que la lista esté ordenada</td></tr>
              <tr><td>Counter(iterable)</td><td>Counter</td><td class="slow">O(n)</td><td>Una pasada sobre todos los elementos</td></tr>
              <tr><td>most_common(k)</td><td>Counter</td><td class="warn">O(n log k)</td><td>Usa heap internamente</td></tr>
              <tr><td>x in list</td><td>list</td><td class="slow">O(n)</td><td>Scan lineal — convierte a set para O(1)</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="plan-card" style="margin-top:12px">
      <div class="plan-card-title">🧮 Reglas para calcular Big O en voz alta</div>
      <div class="two-col">
        <div class="info-card">
          <h5>Reglas de tiempo</h5>
          <ul>
            <li><b>Un loop de n:</b> O(n)</li>
            <li><b>Dos loops anidados de n:</b> O(n²)</li>
            <li><b>Dos loops SECUENCIALES:</b> O(n) — sumas, no multiplicas</li>
            <li><b>Dividir a la mitad en cada step:</b> O(log n)</li>
            <li><b>Sort dentro de la función:</b> +O(n log n)</li>
            <li><b>dict/set lookup en loop:</b> O(1) → total O(n)</li>
            <li><b>Recursión depth d, branching b:</b> O(b^d)</li>
            <li class="warn"><b>list.pop(0) en loop:</b> O(n²) — usar deque</li>
          </ul>
        </div>
        <div class="info-card">
          <h5>Reglas de espacio</h5>
          <ul>
            <li><b>Variables extras:</b> O(1)</li>
            <li><b>Lista/dict de n elementos:</b> O(n)</li>
            <li><b>Sliding Window de tamaño k:</b> O(k)</li>
            <li><b>Heap de tamaño k:</b> O(k)</li>
            <li><b>BFS/DFS visitados:</b> O(V) vértices</li>
            <li><b>Recursión depth d:</b> O(d) call stack</li>
            <li><b>Output de tamaño m:</b> O(m) — cuenta si m es grande</li>
            <li><b>Memoización de n estados:</b> O(n)</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- ════ TAB 4: PYTHON TOOLS ════ -->
  <div id="ap-4" class="tab-panel">
    <div class="plan-card">
      <div class="plan-card-title">🐍 Python tools — lo que necesitas saber de memoria</div>
    </div>
<div class="code-block"><div class="code-lang">Python — Estructuras de datos esenciales</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> defaultdict, Counter, deque
<span class="c-kw">import</span> heapq, bisect

<span class="c-cm"># ── 1. defaultdict — nunca KeyError ────────────────────────────</span>
groups = defaultdict(<span class="c-bi">list</span>)
groups[<span class="c-st">"sensor_a"</span>].append(<span class="c-nb">100</span>)  <span class="c-cm"># no necesita inicializar</span>

counts = defaultdict(<span class="c-bi">int</span>)
counts[<span class="c-st">"ERROR"</span>] += <span class="c-nb">1</span>             <span class="c-cm"># no KeyError aunque no exista</span>

<span class="c-cm"># ── 2. Counter — contar frecuencias en 1 línea ─────────────────</span>
errors = [<span class="c-st">"TIMEOUT"</span>, <span class="c-st">"TIMEOUT"</span>, <span class="c-st">"ASSERT"</span>, <span class="c-st">"TIMEOUT"</span>]
c = Counter(errors)
c.most_common(<span class="c-nb">2</span>)  <span class="c-cm"># → [("TIMEOUT", 3), ("ASSERT", 1)]</span>

<span class="c-cm"># ── 3. deque — O(1) append/popleft (mejor que list para queues) ─</span>
q = deque()
q.append(<span class="c-nb">1</span>)          <span class="c-cm"># enqueue — O(1)</span>
q.popleft()         <span class="c-cm"># dequeue — O(1)  (list.pop(0) es O(n)!)</span>
buf = deque(maxlen=<span class="c-nb">5</span>)  <span class="c-cm"># circular buffer automático</span>

<span class="c-cm"># ── 4. heapq — min-heap ────────────────────────────────────────</span>
h = []
heapq.heappush(h, <span class="c-nb">3</span>)
heapq.heappush(h, <span class="c-nb">1</span>)
heapq.heappop(h)    <span class="c-cm"># → 1 (el mínimo)</span>

<span class="c-cm"># Para MAX-HEAP: negar los valores</span>
heapq.heappush(h, -<span class="c-nb">5</span>)  <span class="c-cm"># -5 se va al tope (es el "mayor")</span>
-heapq.heappop(h)       <span class="c-cm"># → 5</span>

heapq.nlargest(<span class="c-nb">3</span>, [<span class="c-nb">1</span>,<span class="c-nb">5</span>,<span class="c-nb">2</span>,<span class="c-nb">8</span>,<span class="c-nb">3</span>])  <span class="c-cm"># → [8, 5, 3]  O(n log k)</span>

<span class="c-cm"># ── 5. bisect — binary search en lista ordenada ─────────────────</span>
timestamps = [<span class="c-nb">0</span>, <span class="c-nb">33</span>, <span class="c-nb">66</span>, <span class="c-nb">99</span>, <span class="c-nb">600</span>]
bisect.bisect_left(timestamps, <span class="c-nb">70</span>)   <span class="c-cm"># → 3 (índice donde iría 70)</span>
bisect.bisect_right(timestamps, <span class="c-nb">66</span>)  <span class="c-cm"># → 3 (después del 66 existente)</span>

<span class="c-cm"># ── 6. enumerate + zip — loops idiomáticos ──────────────────────</span>
<span class="c-kw">for</span> i, ts <span class="c-kw">in</span> <span class="c-bi">enumerate</span>(timestamps):
    <span class="c-kw">if</span> i &gt; <span class="c-nb">0</span> <span class="c-kw">and</span> ts - timestamps[i-<span class="c-nb">1</span>] &gt; <span class="c-nb">200</span>:
        <span class="c-bi">print</span>(<span class="c-kw">f</span><span class="c-st">"Gap at index {i}"</span>)

<span class="c-kw">for</span> prev, curr <span class="c-kw">in</span> <span class="c-bi">zip</span>(timestamps, timestamps[<span class="c-nb">1</span>:]):
    diff = curr - prev           <span class="c-cm"># más limpio que indices</span>

<span class="c-cm"># ── 7. sorted + key ─────────────────────────────────────────────</span>
intervals = [[<span class="c-nb">3</span>,<span class="c-nb">5</span>],[<span class="c-nb">1</span>,<span class="c-nb">4</span>],[<span class="c-nb">6</span>,<span class="c-nb">9</span>]]
intervals.sort(key=<span class="c-kw">lambda</span> x: x[<span class="c-nb">0</span>])  <span class="c-cm"># sort por start</span>

events.sort(key=<span class="c-kw">lambda</span> e: (e[<span class="c-nb">0</span>], e[<span class="c-nb">1</span>]))  <span class="c-cm"># sort por timestamp, luego tipo</span>

<span class="c-cm"># ── 8. any / all — condiciones en listas ────────────────────────</span>
<span class="c-bi">any</span>(x &lt; <span class="c-nb">0</span> <span class="c-kw">for</span> x <span class="c-kw">in</span> timestamps)   <span class="c-cm"># ¿hay alguno negativo?</span>
<span class="c-bi">all</span>(x &gt; <span class="c-nb">0</span> <span class="c-kw">for</span> x <span class="c-kw">in</span> timestamps)   <span class="c-cm"># ¿todos positivos?</span>

<span class="c-cm"># ── 9. dict comprehension + set ─────────────────────────────────</span>
freq = {k: v <span class="c-kw">for</span> k, v <span class="c-kw">in</span> Counter(errors).items() <span class="c-kw">if</span> v &gt; <span class="c-nb">1</span>}
unique = <span class="c-bi">list</span>(<span class="c-bi">dict</span>.fromkeys(timestamps))  <span class="c-cm"># dedup preservando orden</span></pre></div>

    <div class="plan-card" style="margin-top:12px">
      <div class="plan-card-title">💡 Trucos Python que impresionan en entrevistas</div>
      <div class="plan-block">
        <div class="plan-time">Truco 1</div>
        <div class="plan-content"><h4>Iterar pares consecutivos limpiamente</h4>
<div class="code-block"><div class="code-lang">Python — Pares consecutivos</div><pre>
<span class="c-cm"># En vez de: for i in range(1, len(arr)): arr[i] - arr[i-1]</span>
diffs = [b - a <span class="c-kw">for</span> a, b <span class="c-kw">in</span> <span class="c-bi">zip</span>(arr, arr[<span class="c-nb">1</span>:])]
gaps = [(a, b) <span class="c-kw">for</span> a, b <span class="c-kw">in</span> <span class="c-bi">zip</span>(arr, arr[<span class="c-nb">1</span>:]) <span class="c-kw">if</span> b - a &gt; <span class="c-nb">200</span>]</pre></div></div>
      </div>
      <div class="plan-block">
        <div class="plan-time">Truco 2</div>
        <div class="plan-content"><h4>defaultdict para evitar initialize-or-append</h4>
<div class="code-block"><div class="code-lang">Python — defaultdict vs if/else</div><pre>
<span class="c-cm"># ✗ Feo: inicialización manual</span>
<span class="c-kw">if</span> key <span class="c-kw">not in</span> d: d[key] = []
d[key].append(val)

<span class="c-cm"># ✓ Limpio: defaultdict</span>
d = defaultdict(<span class="c-bi">list</span>)
d[key].append(val)  <span class="c-cm"># sin if</span></pre></div></div>
      </div>
      <div class="plan-block">
        <div class="plan-time">Truco 3</div>
        <div class="plan-content"><h4>Flatten anidado vs groupby</h4>
<div class="code-block"><div class="code-lang">Python — Operaciones de listas útiles</div><pre>
<span class="c-cm"># Flatten una lista de listas</span>
flat = [x <span class="c-kw">for</span> sub <span class="c-kw">in</span> nested <span class="c-kw">for</span> x <span class="c-kw">in</span> sub]

<span class="c-cm"># Max de una lista de tuplas por segundo elemento</span>
best = <span class="c-bi">max</span>(items, key=<span class="c-kw">lambda</span> x: x[<span class="c-nb">1</span>])

<span class="c-cm"># Dedup manteniendo orden (Python 3.7+)</span>
unique = <span class="c-bi">list</span>(<span class="c-bi">dict</span>.fromkeys(lst))</pre></div></div>
      </div>
    </div>
  </div>

  <!-- ════ TAB 5: EDGE CASES ════ -->
  <div id="ap-5" class="tab-panel">
    <div style="background:linear-gradient(135deg,#0F172A,#1E293B);border-radius:12px;padding:14px 18px;margin-bottom:14px;font-size:.82rem;color:#94A3B8;line-height:1.75">
      <b style="color:#F59E0B">Regla de oro:</b> <em>Declara los edge cases ANTES que el entrevistador te los pregunte. Hacerlo sin que te lo pidan es señal de engineer senior.</em><br>
      Usa esta frase: <em style="color:#38BDF8">"Before I finish, let me think about edge cases: [lista]. My current implementation handles [X] correctly because [Y]."</em>
    </div>

    <div class="ec-grid">
      <div class="ec-card red">
        <div class="ec-card-title">🔴 SIEMPRE mencionar</div>
        <ul>
          <li><b>Input vacío</b> — <code>if not data: return {}</code></li>
          <li><b>n = 1</b> — ¿hay pares posibles? → no</li>
          <li><b>Todos iguales</b> — diff=0, sin gaps</li>
          <li><b>n = 2</b> — un solo par, verifica límites</li>
          <li><b>None en el input</b> — ¿validar o asumir limpio?</li>
        </ul>
      </div>
      <div class="ec-card amber">
        <div class="ec-card-title">🟡 Para arrays/listas</div>
        <ul>
          <li><b>No ordenado</b> — sort primero +O(n log n)</li>
          <li><b>Duplicados</b> — ¿contar o ignorar?</li>
          <li><b>Negativos</b> — timestamps siempre ≥ 0</li>
          <li><b>K &gt; n</b> — devuelve todos los que hay</li>
          <li><b>Array muy grande</b> — ¿cabe en memoria?</li>
        </ul>
      </div>
      <div class="ec-card blue">
        <div class="ec-card-title">🔵 Para timestamps</div>
        <ul>
          <li><b>No monotónico</b> — ts[i] &lt; ts[i-1]</li>
          <li><b>Gaps enormes</b> — overflow de int (no Python)</li>
          <li><b>Mismo timestamp</b> — diff=0 → ¿gap?</li>
          <li><b>Solo un ts</b> — sin gaps, return []</li>
          <li><b>Borde: &gt; vs &gt;=</b> — preguntar al entrevistador</li>
        </ul>
      </div>
      <div class="ec-card red">
        <div class="ec-card-title">🔴 Para grafos</div>
        <ul>
          <li><b>Grafo vacío</b> — {}, sin nodos</li>
          <li><b>Nodo aislado</b> — sin vecinos</li>
          <li><b>Ciclos</b> — visited set para no loop infinito</li>
          <li><b>Desconectado</b> — múltiples componentes</li>
          <li><b>Self-loop</b> — arista de un nodo a sí mismo</li>
        </ul>
      </div>
      <div class="ec-card amber">
        <div class="ec-card-title">🟡 Para strings/logs</div>
        <ul>
          <li><b>String vacío</b> — <code>""</code> → return [] o ""</li>
          <li><b>Solo espacios</b> — strip() puede ayudar</li>
          <li><b>Case sensitivity</b> — "ERROR" vs "error"</li>
          <li><b>Encoding</b> — UTF-8 vs Latin-1</li>
          <li><b>Líneas muy largas</b> — regex .* vs .*?</li>
        </ul>
      </div>
      <div class="ec-card blue">
        <div class="ec-card-title">🔵 Para HashMap/Counter</div>
        <ul>
          <li><b>All unique</b> — todos frequency=1</li>
          <li><b>All same</b> — un solo key con freq=n</li>
          <li><b>k=0</b> — top-0 → return [] (o error?)</li>
          <li><b>Empate en frecuencia</b> — ¿orden importa?</li>
          <li><b>Key no hashable</b> — list como key → TypeError</li>
        </ul>
      </div>
    </div>

    <div style="background:#fff;border:1px solid var(--border);border-radius:10px;padding:16px;margin-top:4px">
      <div style="font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:12px">Código de edge case handling — patrón estándar</div>
<div class="code-block"><div class="code-lang">Python — Edge case guards al inicio de cualquier función</div><pre>
<span class="c-kw">def</span> <span class="c-fn">process_events</span>(events: <span class="c-bi">list</span>, threshold_ms: <span class="c-bi">int</span> = <span class="c-nb">200</span>) -&gt; <span class="c-bi">list</span>:
    <span class="c-cm"># Edge case 1: input vacío</span>
    <span class="c-kw">if not</span> events:
        <span class="c-kw">return</span> []

    <span class="c-cm"># Edge case 2: un solo elemento (sin pares)</span>
    <span class="c-kw">if</span> <span class="c-bi">len</span>(events) == <span class="c-nb">1</span>:
        <span class="c-kw">return</span> []

    <span class="c-cm"># Edge case 3: threshold inválido</span>
    <span class="c-kw">if</span> threshold_ms &lt; <span class="c-nb">0</span>:
        <span class="c-kw">raise</span> ValueError(<span class="c-st">f"threshold_ms must be >= 0, got {threshold_ms}"</span>)

    <span class="c-cm"># Asumimos que events está ordenado por timestamp</span>
    <span class="c-cm"># Si no está garantizado: events.sort(key=lambda e: e[0])</span>

    <span class="c-cm"># Main logic...</span>
    result = []
    <span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">1</span>, <span class="c-bi">len</span>(events)):
        gap = events[i][<span class="c-nb">0</span>] - events[i-<span class="c-nb">1</span>][<span class="c-nb">0</span>]
        <span class="c-kw">if</span> gap &gt; threshold_ms:   <span class="c-cm"># > no >= : el borde es exclusivo</span>
            result.append({<span class="c-st">"gap_ms"</span>: gap, <span class="c-st">"from"</span>: events[i-<span class="c-nb">1</span>][<span class="c-nb">0</span>], <span class="c-st">"to"</span>: events[i][<span class="c-nb">0</span>]})
    <span class="c-kw">return</span> result</pre></div>
    </div>
  </div>

  <!-- ════ TAB 6: ERRORES COMUNES ════ -->
  <div id="ap-6" class="tab-panel">

    <div class="err-card">
      <div class="err-head"><div class="err-icon bug">#1</div><div class="err-title">Empezar a codear sin clarificar el problema</div></div>
      <div class="err-body">El error más frecuente y más costoso. Pasas 15 minutos implementando la solución perfecta para el problema equivocado. El entrevistador mira sin interrumpirte porque <em>"demuestra cómo el candidato trabaja bajo presión"</em>.</div>
      <div class="err-fix"><b>Fix:</b> Los pasos 1 y 2 son obligatorios antes de tocar el teclado. 4 minutos de preguntas pueden salvarte 20 de trabajo equivocado.</div>
    </div>

    <div class="err-card">
      <div class="err-head"><div class="err-icon bug">#2</div><div class="err-title">Silencio prolongado mientras codeas</div></div>
      <div class="err-body">Si callás por más de 20 segundos, el entrevistador no sabe si estás pensando profundamente o completamente perdido. El silencio se percibe como falta de confianza. La entrevista técnica es también una evaluación de comunicación.</div>
      <div class="err-fix"><b>Fix:</b> Narra cada línea: <em>"I'm creating a defaultdict to group timestamps by sensor… here I iterate and check the gap condition… now I add to results if it exceeds the threshold."</em> Si no sabes cómo seguir: <em>"I'm thinking through this — let me work it out…"</em></div>
    </div>

    <div class="err-card">
      <div class="err-head"><div class="err-icon warn">#3</div><div class="err-title">Variables de un solo carácter: i, j, x, a, b, t</div></div>
      <div class="err-body">Hace el código opaco para el entrevistador y para ti mismo. <code>if t &gt; x:</code> no comunica nada. El entrevistador tiene que preguntarte qué significa cada variable.</div>
      <div class="err-fix"><b>Fix:</b> <code>sensor_timestamps</code>, <code>gap_threshold_ms</code>, <code>prev_ts</code>, <code>curr_ts</code>, <code>left_ptr</code>, <code>right_ptr</code>. Sí, es más largo. Sí, vale la pena.</div>
    </div>

    <div class="err-card">
      <div class="err-head"><div class="err-icon bug">#4</div><div class="err-title">Declarar la complejidad incorrecta o no declararla</div></div>
      <div class="err-body">El entrevistador SIEMPRE pregunta "What's the time complexity?". Decir "it's O(n)… I think" con duda destruye la confianza. Decir O(n) cuando es O(n²) es peor — demuestra que no entiendes tu propio código.</div>
      <div class="err-fix"><b>Fix:</b> Declárala ANTES de codear: <em>"This will be O(n) time because each element is added and removed from the deque at most once, and O(k) space for the window."</em> Si no la sabes → razona en voz alta: <em>"The outer loop is O(n), the inner while loop amortized O(n) total, so O(n) overall."</em></div>
    </div>

    <div class="err-card">
      <div class="err-head"><div class="err-icon bug">#5</div><div class="err-title">Off-by-one: &lt; vs &lt;=, range(n) vs range(n-1)</div></div>
      <div class="err-body">El error de implementación más común. <code>while left &lt;= right</code> vs <code>while left &lt; right</code> en binary search. <code>range(len(arr))</code> vs <code>range(len(arr)-1)</code> en pares consecutivos. Un elemento de diferencia → resultado totalmente incorrecto.</div>
      <div class="err-fix"><b>Fix:</b> Traza con n=2 y n=3 manualmente. Verifica que el primer y último elemento se procesan correctamente. Binary Search: exact match → <code>&lt;=</code>; lower bound → <code>&lt;</code>.</div>
    </div>

    <div class="err-card">
      <div class="err-head"><div class="err-icon bug">#6</div><div class="err-title">list.pop(0) para una queue — O(n) disfrazado</div></div>
      <div class="err-body"><code>queue.pop(0)</code> en una list desplaza todos los elementos → O(n). En una entrevista con n=1,000,000 y 10 operaciones por elemento, la diferencia es 10M ops (deque) vs 10,000,000,000 ops (list). Es el bug de performance más invisible.</div>
      <div class="err-fix"><b>Fix:</b> <code>from collections import deque; q = deque(); q.popleft()</code> → O(1). Mencionar proactivamente: <em>"I'm using deque here because popleft is O(1) vs O(n) with a list."</em></div>
    </div>

    <div class="err-card">
      <div class="err-head"><div class="err-icon warn">#7</div><div class="err-title">No manejar input vacío → IndexError o KeyError</div></div>
      <div class="err-body"><code>arr[0]</code> en una lista vacía → IndexError. <code>d["key"]</code> en un dict vacío sin esa key → KeyError. Acceder al primer elemento antes de verificar que existe es uno de los crashes más comunes en entrevistas.</div>
      <div class="err-fix"><b>Fix:</b> Primera línea siempre: <code>if not events: return []</code> o <code>if not events: return {}</code>. Usa <code>dict.get(key, default)</code> en vez de <code>dict[key]</code> cuando la key puede no existir.</div>
    </div>

    <div class="err-card">
      <div class="err-head"><div class="err-icon warn">#8</div><div class="err-title">Modificar una lista mientras iteras sobre ella</div></div>
      <div class="err-body"><code>for x in lst: if condition: lst.remove(x)</code> salta elementos porque el índice interno avanza pero la lista se encoge. Resultado: algunos elementos nunca se evalúan.</div>
      <div class="err-fix"><b>Fix:</b> Construye lista nueva: <code>result = [x for x in lst if not condition]</code>. O itera sobre una copia: <code>for x in lst[:]:</code>. Nunca modifiques la lista sobre la que iteras.</div>
    </div>

    <div class="err-card">
      <div class="err-head"><div class="err-icon warn">#9</div><div class="err-title">Optimizar antes de que funcione correctamente</div></div>
      <div class="err-body">Quedarse 10 minutos pensando en la solución O(n) perfecta cuando una solución O(n²) correcta en 3 minutos es mejor estrategia. El entrevistador prefiere ver código que funciona y luego la optimización.</div>
      <div class="err-fix"><b>Fix:</b> <em>"Let me start with the brute force O(n²) to make sure the logic is correct, and then I'll optimize it."</em> Implementa el bruto → hazlo funcionar → optimiza. Siempre en ese orden.</div>
    </div>

  </div>

  <!-- ════ TAB 7: SI TE ATASCAS ════ -->
  <div id="ap-7" class="tab-panel">
    <div style="background:linear-gradient(135deg,#0F172A,#1E293B);border-radius:12px;padding:14px 18px;margin-bottom:14px;color:#E2E8F0;font-size:.82rem;line-height:1.75">
      <b style="color:#F59E0B">Estar atascado es normal.</b> <span style="color:#94A3B8">Lo que distingue a un buen candidato no es que nunca se atase, sino cómo comunica cuando lo está y qué técnicas usa para salir. Nunca te quedes callado más de 30 segundos.</span>
    </div>

    <div class="stuck-card">
      <h4>🔤 Paso 1 — Di en voz alta que estás pensando</h4>
      <p>Lo primero es nunca quedarse callado. Verbaliza tu estado mental incluso si no tienes la respuesta todavía.</p>
      <div class="say-it">"I'm thinking through this — let me work it out step by step."</div>
      <div class="say-it">"My initial instinct is [X], but let me verify that with the example."</div>
      <div class="say-it">"I know the brute force approach, let me start there and see if I can optimize."</div>
    </div>

    <div class="stuck-card">
      <h4>🧩 Paso 2 — Vuelve al ejemplo manual</h4>
      <p>Si no sabes por dónde empezar con el código, olvida el código. Resuelve el ejemplo A MANO, lento, elemento por elemento. La solución casi siempre aparece en el proceso.</p>
      <div class="say-it">"Let me go back to the example and solve it manually, step by step."</div>
      <div class="say-it">"With input [0, 33, 600], what would I do by hand? I'd check 33-0=33 — ok. Then 600-33=567 — that's a gap. So I need to detect consecutive differences. That suggests…"</div>
    </div>

    <div class="stuck-card">
      <h4>💡 Paso 3 — Piensa en qué estructura resuelve el subproblema</h4>
      <p>Casi todos los problemas difíciles se reducen a: "¿cómo busco X eficientemente?" o "¿cómo mantengo Y actualizado sin recalcular todo?". Pregúntate esto en voz alta.</p>
      <div class="say-it">"The bottleneck is that I'm searching linearly for each element. If I use a HashMap, I can reduce each lookup to O(1)."</div>
      <div class="say-it">"I need to maintain a sorted view of the window. A sorted list with bisect would give O(log n) insertions."</div>
      <div class="say-it">"If I precompute [prefix sum / sorted order / frequency count], the main loop becomes simple."</div>
    </div>

    <div class="stuck-card">
      <h4>🔍 Paso 4 — Prueba simplificar el problema</h4>
      <p>Si el problema general te bloquea, resuelve una versión más simple y generaliza.</p>
      <div class="say-it">"Let me solve this for a single sensor first, and then generalize to multiple sensors."</div>
      <div class="say-it">"What if the threshold was 0? What if there's only one timestamp?"</div>
      <div class="say-it">"Let me solve this for n=2 first. If I have [A, B], I check B-A. Now for n=3: I check B-A and C-B. The pattern is clear now."</div>
    </div>

    <div class="stuck-card">
      <h4>🤝 Paso 5 — Pide una pista sin rendirte</h4>
      <p>Pedir una pista es completamente aceptable y profesional. Lo que importa es cómo la pides y lo que haces con ella.</p>
      <div class="say-it">"I'm considering a HashMap approach but I'm not sure how to structure the key. Could you give me a hint on what data structure you had in mind?"</div>
      <div class="say-it">"I know this should be solvable in O(n) but I'm not seeing the insight. Is there a particular property of the data I should be exploiting?"</div>
      <div class="say-it">"I have the brute force working. Could you give me a nudge toward the optimization?"</div>
    </div>

    <div class="plan-card" style="margin-top:8px">
      <div class="plan-card-title">🧠 Patrones de desbloqueo — el mapa mental</div>
      <div class="two-col">
        <div class="info-card">
          <h5>Si el problema pide O(n) y tienes O(n²)</h5>
          <ul>
            <li>¿Puedes precalcular algo? (prefix sum, sorted order)</li>
            <li>¿Puedes usar HashMap para O(1) lookups?</li>
            <li>¿Los dos loops hacen trabajo redundante? → Sliding Window</li>
            <li>¿Puedes eliminar la mitad en cada paso? → Binary Search</li>
          </ul>
        </div>
        <div class="info-card">
          <h5>Si no sabes qué estructura usar</h5>
          <ul>
            <li>¿Necesitas el min/max frecuentemente? → Heap</li>
            <li>¿Buscas "¿existe X?" → set</li>
            <li>¿Cuentas? → Counter</li>
            <li>¿Procesas en orden de llegada? → deque</li>
            <li>¿Matching balanceado? → Stack</li>
            <li>¿Datos con relaciones? → Graph</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- ════ TAB 8: CÓMO OPTIMIZAR ════ -->
  <div id="ap-8" class="tab-panel">
    <div style="background:linear-gradient(135deg,#0F172A,#1E293B);border-radius:12px;padding:14px 18px;margin-bottom:14px;color:#E2E8F0;font-size:.82rem;line-height:1.75">
      <b style="color:#F59E0B">Proceso de optimización:</b> <span style="color:#94A3B8">1) Identifica el cuello de botella. 2) Pregúntate por qué repites trabajo. 3) Usa una estructura de datos que elimine ese trabajo redundante.</span>
    </div>

    <div class="optim-card">
      <div class="optim-head"><div class="optim-from">O(n²) — dos loops anidados</div><div class="optim-arrow">→</div><div class="optim-to">O(n) — HashMap</div></div>
      <div class="optim-body"><b>Patrón:</b> El loop externo itera sobre elementos. El loop interno busca "¿existe el complemento?". La búsqueda lineal es O(n) → total O(n²).<br><br>
      <b>Solución:</b> Guarda lo que ya viste en un dict o set. Cuando procesas el elemento actual, busca el complemento en O(1).<br><br>
      <b>Ejemplo:</b> Two Sum: para cada elemento <code>x</code>, busca <code>target - x</code> en el set de vistos. <code>seen.add(x); if (target-x) in seen</code></div>
    </div>

    <div class="optim-card">
      <div class="optim-head"><div class="optim-from">O(n²) — ventana recalculada</div><div class="optim-arrow">→</div><div class="optim-to">O(n) — Sliding Window</div></div>
      <div class="optim-body"><b>Patrón:</b> Para cada posición, recalculas la suma/conteo de todos los elementos de la ventana desde cero.<br><br>
      <b>Solución:</b> Mantén la suma corriente. Cuando la ventana se mueve, resta el elemento que sale y suma el que entra. O(1) por movimiento.<br><br>
      <b>Ejemplo:</b> Máxima suma de k elementos: <code>window_sum += arr[i] - arr[i-k]</code> en vez de <code>sum(arr[i-k:i])</code></div>
    </div>

    <div class="optim-card">
      <div class="optim-head"><div class="optim-from">O(n log n) — sort + scan</div><div class="optim-arrow">→</div><div class="optim-to">O(n log k) — Heap de K elementos</div></div>
      <div class="optim-body"><b>Patrón:</b> Ordenas todos los n elementos para encontrar los K mejores. Ordenar n cuando solo necesitas K es ineficiente.<br><br>
      <b>Solución:</b> Heap de tamaño K. Procesas todos los n elementos pero solo mantienes K en el heap en todo momento. Si el nuevo elemento supera al mínimo del heap, lo reemplaza.<br><br>
      <b>Ejemplo:</b> Top-3 errores: <code>heapq.nlargest(3, counts.items(), key=lambda x: x[1])</code></div>
    </div>

    <div class="optim-card">
      <div class="optim-head"><div class="optim-from">O(n) — scan lineal</div><div class="optim-arrow">→</div><div class="optim-to">O(log n) — Binary Search</div></div>
      <div class="optim-body"><b>Patrón:</b> Buscas un elemento específico en una lista. Scan lineal es O(n).<br><br>
      <b>Condición:</b> Solo si la lista está ORDENADA (o puedes ordenarla). Cada comparación elimina la mitad.<br><br>
      <b>Ejemplo:</b> "¿Cuándo fue el primer build después del timestamp T?" → <code>bisect.bisect_left(sorted_timestamps, T)</code> en O(log n).</div>
    </div>

    <div class="optim-card">
      <div class="optim-head"><div class="optim-from">Recursión — O(2ⁿ) sin memoización</div><div class="optim-arrow">→</div><div class="optim-to">O(n) — con @lru_cache</div></div>
      <div class="optim-body"><b>Patrón:</b> Función recursiva que calcula el mismo subproblema múltiples veces (ej. Fibonacci, DP sin memo).<br><br>
      <b>Solución:</b> Memoización: cachea el resultado de cada subproblema. Con <code>@lru_cache(maxsize=None)</code> es automático en Python.<br><br>
      <b>Ejemplo:</b> <code>fib(n) = fib(n-1) + fib(n-2)</code> sin memo → O(2ⁿ). Con <code>@lru_cache</code> → O(n).</div>
    </div>

    <div class="optim-card">
      <div class="optim-head"><div class="optim-from">Múltiples pasadas sobre los datos</div><div class="optim-arrow">→</div><div class="optim-to">Una sola pasada con Prefix Sum</div></div>
      <div class="optim-body"><b>Patrón:</b> Necesitas la suma de subarrays múltiples veces. Cada suma requiere O(k) operaciones → total O(n·k).<br><br>
      <b>Solución:</b> Prefix sum: <code>prefix[i] = sum(arr[:i])</code>. Suma de arr[l:r] = <code>prefix[r] - prefix[l]</code> en O(1).<br><br>
      <b>Ejemplo:</b> Range sum queries: preprocesa O(n), luego cada query O(1) en vez de O(k).</div>
    </div>

    <div class="plan-card" style="margin-top:12px">
      <div class="plan-card-title">💬 Frases para comunicar la optimización al entrevistador</div>
      <div class="plan-block">
        <div class="plan-time">Al identificar el bottleneck</div>
        <div class="plan-content"><p><em>"The bottleneck here is this inner loop — for each element, I'm doing a linear search. That makes it O(n²). Let me think about how to reduce the lookup time."</em></p></div>
      </div>
      <div class="plan-block">
        <div class="plan-time">Al proponer la mejora</div>
        <div class="plan-content"><p><em>"If I use a HashMap to store what I've seen so far, I can replace the linear search with an O(1) lookup. That brings the total complexity from O(n²) to O(n), at the cost of O(n) extra space."</em></p></div>
      </div>
      <div class="plan-block">
        <div class="plan-time">Al hacer el trade-off</div>
        <div class="plan-content"><p><em>"This is a classic time-space trade-off. The original O(n²) solution uses O(1) space but is too slow. The HashMap solution uses O(n) space and achieves O(n) time. Given the scale you mentioned, the HashMap version is the right choice."</em></p></div>
      </div>
    </div>
  </div>

</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mi approach personal</div>
  <p class="notes-placeholder">Practica los 6 pasos en voz alta con "find_sensor_gaps". Cronometra 20 minutos. Repite hasta que fluya naturalmente.</p>
</div>`,

'wayve-algoritmos': `
<div class="alert-card">
  🎯 <strong>9 algoritmos</strong> con explicación profunda, template reutilizable, ejemplo de Wayve y problema de práctica. Usa las pestañas para navegar entre ellos.
</div>
<div class="tab-group-algo">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'al-sw','algo')">Sliding Window</button>
    <button class="tab-btn" onclick="switchTab(this,'al-tp','algo')">Two Pointers</button>
    <button class="tab-btn" onclick="switchTab(this,'al-hm','algo')">HashMap</button>
    <button class="tab-btn" onclick="switchTab(this,'al-bfs','algo')">BFS</button>
    <button class="tab-btn" onclick="switchTab(this,'al-dfs','algo')">DFS</button>
    <button class="tab-btn" onclick="switchTab(this,'al-bs','algo')">Binary Search</button>
    <button class="tab-btn" onclick="switchTab(this,'al-hp','algo')">Heap</button>
    <button class="tab-btn" onclick="switchTab(this,'al-st','algo')">Stack / Queue</button>
    <button class="tab-btn" onclick="switchTab(this,'al-re','algo')">Strings & Regex</button>
  </div>

  <!-- ════ SLIDING WINDOW ════ -->
  <div id="al-sw" class="tab-panel active">
  <div class="plan-card">
    <div class="plan-card-title">🪟 Sliding Window — Ventana deslizante</div>
    <div class="plan-block">
      <div class="plan-time">¿Qué es?</div>
      <div class="plan-content">
        <h4>Mantén una "ventana" que se mueve sobre los datos</h4>
        <p>Imagina una linterna que ilumina solo una parte de una lista a la vez. La ventana puede ser de <b>tamaño fijo</b> (siempre K elementos) o <b>variable</b> (se expande/contrae según condiciones). En vez de recalcular todo desde cero al moverla, solo <b>quitas el elemento que sale por la izquierda y agregas el que entra por la derecha</b>. Esto convierte soluciones O(n²) en O(n).</p>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">¿Cuándo usarlo?</div>
      <div class="plan-content">
        <h4>Palabras clave que indican este patrón</h4>
        <div class="p-chips">
          <span class="p-chip">subarray / substring contiguo</span>
          <span class="p-chip">ventana de tiempo</span>
          <span class="p-chip">máximo / mínimo en rango</span>
          <span class="p-chip">suma de K elementos</span>
          <span class="p-chip">al menos / a lo sumo K distintos</span>
          <span class="p-chip">stream de datos</span>
        </div>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">Complejidad</div>
      <div class="plan-content">
        <h4>O(n) tiempo · O(k) espacio</h4>
        <p>Cada elemento se agrega y remueve de la ventana exactamente una vez → O(n). El espacio es O(k) donde k = tamaño de la ventana o número de elementos distintos.</p>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">En Wayve</div>
      <div class="plan-content">
        <h4>Analizar streams de sensores en ventanas de tiempo</h4>
        <p>"¿Cuántos errores de CAN hubo en los últimos 5 minutos?" — "¿La frecuencia del LIDAR bajó de 10Hz en alguna ventana de 1 segundo?" — "¿Cuál fue el período de mayor actividad de errores en el log de CI?"</p>
      </div>
    </div>
  </div>
<div class="code-block">
  <div class="code-lang">Python — Sliding Window FIJA (K elementos)</div>
  <pre><span class="c-cm"># TEMPLATE: ventana de tamaño fijo K</span>
<span class="c-cm"># Problema tipo: "suma/max/promedio de cada ventana de K"</span>

<span class="c-kw">def</span> <span class="c-fn">max_in_fixed_window</span>(nums: <span class="c-bi">list</span>, k: <span class="c-bi">int</span>) -&gt; <span class="c-bi">list</span>:
    <span class="c-kw">if not</span> nums <span class="c-kw">or</span> k == <span class="c-nb">0</span>: <span class="c-kw">return</span> []

    result = []
    window_sum = <span class="c-bi">sum</span>(nums[:<span class="c-nb">k</span>])   <span class="c-cm"># inicializa con la primera ventana</span>
    result.append(window_sum)

    <span class="c-cm"># Desliza: quita el elemento izquierdo, agrega el derecho</span>
    <span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(k, <span class="c-bi">len</span>(nums)):
        window_sum += nums[i] - nums[i - k]  <span class="c-cm"># +nuevo -viejo</span>
        result.append(window_sum)

    <span class="c-kw">return</span> result
    <span class="c-cm"># O(n) tiempo, O(1) espacio extra (sin contar resultado)</span></pre>
</div>
<div class="code-block">
  <div class="code-lang">Python — Sliding Window VARIABLE (expande/contrae según condición)</div>
  <pre><span class="c-cm"># TEMPLATE: ventana variable — más poderoso</span>
<span class="c-cm"># Problema tipo: "ventana más corta/larga que satisface condición"</span>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> deque, Counter

<span class="c-kw">def</span> <span class="c-fn">top_errors_in_time_window</span>(events, window_sec=<span class="c-nb">300</span>, top_n=<span class="c-nb">3</span>):
    <span class="c-cm">"""
    events = [(timestamp_float, error_str), ...]  ordenados por tiempo
    Para cada evento, retorna los top_n errores en los últimos window_sec segundos.
    Wayve: "¿cuáles son los 3 fallos más frecuentes en cada ventana de 5min?"
    """</span>
    window = deque()    <span class="c-cm"># guarda (ts, err) — O(1) popleft</span>
    freq   = Counter()  <span class="c-cm"># cuenta errores activos en la ventana</span>
    result = []

    <span class="c-kw">for</span> ts, err <span class="c-kw">in</span> events:
        <span class="c-cm"># 1. AGREGA el evento actual por la derecha</span>
        window.append((ts, err))
        freq[err] += <span class="c-nb">1</span>

        <span class="c-cm"># 2. EXPULSA eventos que ya salieron de la ventana por la izquierda</span>
        <span class="c-cm">#    La ventana crece a la derecha, se encoge a la izquierda</span>
        <span class="c-kw">while</span> window <span class="c-kw">and</span> ts - window[<span class="c-nb">0</span>][<span class="c-nb">0</span>] &gt; window_sec:
            old_ts, old_err = window.popleft()
            freq[old_err] -= <span class="c-nb">1</span>
            <span class="c-kw">if</span> freq[old_err] == <span class="c-nb">0</span>:
                <span class="c-kw">del</span> freq[old_err]   <span class="c-cm"># limpia Counter para no acumular basura</span>

        <span class="c-cm"># 3. CONSULTA el estado actual de la ventana</span>
        result.append((ts, freq.most_common(top_n)))

    <span class="c-kw">return</span> result
    <span class="c-cm"># O(n) — cada evento entra y sale exactamente una vez</span>
    <span class="c-cm"># O(k) espacio — k tipos distintos de error en ventana activa</span></pre>
</div>
<div class="quiz-section">
  <div class="quiz-title">Problema de práctica — Sliding Window</div>
  <div class="quiz-card">
    <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Practica</span>"Dado un log de timestamps, encuentra todos los intervalos donde la frecuencia bajó de 10Hz (gaps > 100ms)"<span class="q-arr">▶</span></div>
    <div class="quiz-a">
<b>Solución:</b> No necesitas una ventana — es una comparación consecutiva con zip:<br><br>
<code>gaps = [(i, t2-t1) for i,(t1,t2) in enumerate(zip(ts, ts[1:])) if t2-t1 &gt; 0.1]</code><br><br>
<b>Explicación:</b> <code>zip(ts, ts[1:])</code> crea pares (t[i], t[i+1]). <code>enumerate</code> te da el índice. Filtramos los que tienen diferencia &gt; 0.1s (100ms). O(n) tiempo, O(k) espacio donde k = número de gaps encontrados.
<div class="a-tip">Esto es EXACTAMENTE lo que harías en Wayve para detectar drops de frecuencia en sensores.</div>
    </div>
  </div>
</div>
<div class="plan-card" style="margin-top:8px;border-left-color:#F59E0B">
  <div class="plan-card-title" style="color:#D97706;">⚠️ Trampas comunes — Sliding Window</div>
  <div class="plan-block">
    <div class="plan-time">Error #1</div>
    <div class="plan-content">
      <h4>Olvidar encograr la ventana por la izquierda</h4>
      <p>El bug más frecuente: expandes la derecha pero nunca sacas elementos de la izquierda. Resultado: la ventana crece indefinidamente y el algoritmo se vuelve O(n²) o da resultados incorrectos. <b>Regla:</b> siempre hay un bloque <code>while window and condición: window.popleft()</code>.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Error #2</div>
    <div class="plan-content">
      <h4>Ventana fija: usar range(k, n) sin inicializar</h4>
      <p>Para ventana fija, primero calcula la primera ventana con <code>sum(arr[:k])</code>, luego usa el loop <code>for i in range(k, n): window_sum += arr[i] - arr[i-k]</code>. Si empiezas el loop desde 0 y tratas de restar <code>arr[i-k]</code> con i&lt;k → IndexError o resultado incorrecto.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Error #3</div>
    <div class="plan-content">
      <h4>Confundir &gt; con &gt;= en la condición de la ventana</h4>
      <p>Si el problema dice "último segundo" y checkeas <code>ts - window[0] &gt; 1.0</code> en vez de <code>&gt;= 1.0</code>, el elemento que está exactamente en el límite queda dentro o fuera incorrectamente. <b>Siempre pregunta al entrevistador si el borde es inclusivo o exclusivo.</b></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Tips de entrevista</div>
    <div class="plan-content">
      <p><em>"I'll use a deque here instead of a list because popleft is O(1) with deque but O(n) with list — that's critical for performance in large streams."</em><br><br>
      <em>"The key insight is that each element enters and exits the window exactly once, so the total work is O(n) even though there's a while loop inside the for loop."</em></p>
    </div>
  </div>
</div>
  </div><!-- end al-sw -->

  <!-- ════ TWO POINTERS ════ -->
  <div id="al-tp" class="tab-panel">
  <div class="plan-card">
    <div class="plan-card-title">👆👆 Two Pointers — Dos apuntadores</div>
    <div class="plan-block">
      <div class="plan-time">¿Qué es?</div>
      <div class="plan-content">
        <h4>Dos índices que se mueven sobre la misma estructura</h4>
        <p>En vez de usar dos loops anidados O(n²), usas dos punteros que se mueven hacia adentro (o en la misma dirección) y juntos cubren toda la posibilidad. Hay dos variantes principales:</p>
        <ul style="font-size:.82rem;color:var(--text-muted);line-height:2;padding-left:20px;margin-top:8px">
          <li><b>Extremos opuestos:</b> left=0, right=n-1 moviéndose hacia el centro. Para arrays ordenados.</li>
          <li><b>Misma dirección (Fast & Slow):</b> slow y fast avanzan a diferente velocidad. Para detectar ciclos o eliminar duplicados.</li>
        </ul>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">¿Cuándo usarlo?</div>
      <div class="plan-content">
        <div class="p-chips">
          <span class="p-chip">array ordenado</span><span class="p-chip">pares que suman X</span>
          <span class="p-chip">eliminar duplicados</span><span class="p-chip">detección de ciclos</span>
          <span class="p-chip">palíndromo</span><span class="p-chip">mover ceros</span>
          <span class="p-chip">merge de listas</span>
        </div>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">Complejidad</div>
      <div class="plan-content"><h4>O(n) tiempo · O(1) espacio</h4><p>Ambos punteros juntos nunca hacen más de n movimientos. El espacio es constante — no necesitas estructuras auxiliares.</p></div>
    </div>
    <div class="plan-block">
      <div class="plan-time">En Wayve</div>
      <div class="plan-content"><h4>Comparar streams de datos sincronizados</h4><p>"Dado dos streams de timestamps (sensor A y sensor B), encuentra todos los mensajes de A que no tienen un mensaje correspondiente de B dentro de 50ms." → Two pointers sobre ambas listas ordenadas.</p></div>
    </div>
  </div>
<div class="code-block">
  <div class="code-lang">Python — Tipo 1: Extremos opuestos (array ordenado)</div>
  <pre><span class="c-kw">def</span> <span class="c-fn">two_sum_sorted</span>(nums: <span class="c-bi">list</span>, target: <span class="c-bi">int</span>) -&gt; <span class="c-bi">tuple</span>:
    <span class="c-cm">"""
    Encuentra par que suma target en array ORDENADO.
    Wayve: "encuentra dos valores de voltaje que promedien exactamente 3.7V"
    """</span>
    left, right = <span class="c-nb">0</span>, <span class="c-bi">len</span>(nums) - <span class="c-nb">1</span>

    <span class="c-kw">while</span> left &lt; right:
        current = nums[left] + nums[right]

        <span class="c-kw">if</span> current == target:
            <span class="c-kw">return</span> (left, right)   <span class="c-cm"># encontrado</span>
        <span class="c-kw">elif</span> current &lt; target:
            left += <span class="c-nb">1</span>              <span class="c-cm"># suma muy pequeña → mueve izquierda hacia adelante</span>
        <span class="c-kw">else</span>:
            right -= <span class="c-nb">1</span>             <span class="c-cm"># suma muy grande → mueve derecha hacia atrás</span>

    <span class="c-kw">return</span> (-<span class="c-nb">1</span>, -<span class="c-nb">1</span>)   <span class="c-cm"># no encontrado</span>
    <span class="c-cm"># O(n) tiempo — en el peor caso cada puntero recorre n/2</span>
    <span class="c-cm"># O(1) espacio — solo dos variables</span>

<span class="c-cm"># Variante: encontrar TODOS los pares</span>
<span class="c-kw">def</span> <span class="c-fn">all_pairs_with_sum</span>(nums: <span class="c-bi">list</span>, target: <span class="c-bi">int</span>) -&gt; <span class="c-bi">list</span>:
    nums.sort()   <span class="c-cm"># O(n log n) — necesario para usar two pointers</span>
    left, right = <span class="c-nb">0</span>, <span class="c-bi">len</span>(nums) - <span class="c-nb">1</span>
    pairs = []
    <span class="c-kw">while</span> left &lt; right:
        s = nums[left] + nums[right]
        <span class="c-kw">if</span>   s == target: pairs.append((nums[left], nums[right])); left += <span class="c-nb">1</span>; right -= <span class="c-nb">1</span>
        <span class="c-kw">elif</span> s &lt;  target: left += <span class="c-nb">1</span>
        <span class="c-kw">else</span>:             right -= <span class="c-nb">1</span>
    <span class="c-kw">return</span> pairs</pre>
</div>
<div class="code-block">
  <div class="code-lang">Python — Tipo 2: Fast & Slow (misma dirección)</div>
  <pre><span class="c-kw">def</span> <span class="c-fn">sync_sensor_streams</span>(ts_a: <span class="c-bi">list</span>, ts_b: <span class="c-bi">list</span>, tolerance=<span class="c-nb">0.05</span>) -&gt; <span class="c-bi">list</span>:
    <span class="c-cm">"""
    Two pointers para sincronizar dos streams de sensores.
    Encuentra mensajes de A sin contraparte en B dentro de 'tolerance' segundos.
    Wayve: detectar pérdida de sincronización entre cámara y LIDAR.
    Ambas listas deben estar ORDENADAS por timestamp.
    """</span>
    i, j = <span class="c-nb">0</span>, <span class="c-nb">0</span>
    unmatched_a = []

    <span class="c-kw">while</span> i &lt; <span class="c-bi">len</span>(ts_a) <span class="c-kw">and</span> j &lt; <span class="c-bi">len</span>(ts_b):
        diff = <span class="c-bi">abs</span>(ts_a[i] - ts_b[j])

        <span class="c-kw">if</span> diff &lt;= tolerance:
            i += <span class="c-nb">1</span>     <span class="c-cm"># match encontrado, avanza A</span>
            j += <span class="c-nb">1</span>
        <span class="c-kw">elif</span> ts_a[i] &lt; ts_b[j]:
            unmatched_a.append(ts_a[i])  <span class="c-cm"># A está adelantado, no hay match</span>
            i += <span class="c-nb">1</span>
        <span class="c-kw">else</span>:
            j += <span class="c-nb">1</span>     <span class="c-cm"># B está adelantado, descarta B</span>

    <span class="c-cm"># Los restantes de A tampoco tienen match</span>
    unmatched_a.extend(ts_a[i:])
    <span class="c-kw">return</span> unmatched_a
    <span class="c-cm"># O(n+m) donde n, m = longitudes de los streams</span></pre>
</div>
<div class="quiz-section">
  <div class="quiz-title">Problema de práctica</div>
  <div class="quiz-card">
    <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Practica</span>"Elimina duplicados de una lista ordenada in-place, devuelve el nuevo length"<span class="q-arr">▶</span></div>
    <div class="quiz-a">
<b>Two pointers (slow/fast):</b><br>
<code>def remove_dups(nums):<br>&nbsp;&nbsp;&nbsp;&nbsp;if not nums: return 0<br>&nbsp;&nbsp;&nbsp;&nbsp;slow = 0<br>&nbsp;&nbsp;&nbsp;&nbsp;for fast in range(1, len(nums)):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if nums[fast] != nums[slow]:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slow += 1<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nums[slow] = nums[fast]<br>&nbsp;&nbsp;&nbsp;&nbsp;return slow + 1</code><br><br>
<b>Por qué funciona:</b> slow apunta al último elemento único escrito. fast explora. Cuando fast encuentra algo nuevo (≠ slow), lo escribe en slow+1. O(n) tiempo, O(1) espacio.
    </div>
  </div>
</div>
<div class="plan-card" style="margin-top:8px;border-left-color:#F59E0B">
  <div class="plan-card-title" style="color:#D97706;">⚠️ Trampas comunes — Two Pointers</div>
  <div class="plan-block">
    <div class="plan-time">Error #1</div>
    <div class="plan-content">
      <h4>Usar Two Pointers en array NO ordenado</h4>
      <p>Two Pointers desde los extremos SOLO funciona si el array está ordenado. La lógica "si la suma es menor, mueve el puntero izquierdo" asume que los valores crecen de izquierda a derecha. Si no está ordenado → ordena primero (O(n log n)) o usa HashMap en su lugar.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Error #2</div>
    <div class="plan-content">
      <h4>Olvidar la condición <code>left &lt; right</code></h4>
      <p>Si la condición del while es <code>left &lt;= right</code> en vez de <code>left &lt; right</code>, cuando se cruzan seguirás iterando y comparando el elemento consigo mismo, dando falsos positivos. La condición correcta es siempre <code>while left &lt; right</code>.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Error #3</div>
    <div class="plan-content">
      <h4>Fast-slow: avanzar fast cuando encontraste un match</h4>
      <p>En el patrón de sync de dos streams: cuando hay match, debes avanzar AMBOS punteros (i y j). Si solo avanzas uno, el siguiente elemento del stream "consumido" vuelve a ser comparado → doble match falso.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Mental model</div>
    <div class="plan-content">
      <h4>Cómo visualizarlo</h4>
      <p>Imagina dos personas corriendo en una pista circular. La rápida (fast) siempre está delante. Si hay un ciclo, eventualmente la rápida alcanza a la lenta por detrás. Si no hay ciclo, fast llega al final primero.<br><br>
      Para extremos opuestos: imagina apretar una cuerda desde ambos extremos. La decides hacia dónde jalar según si la suma actual es grande o pequeña.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Tips de entrevista</div>
    <div class="plan-content">
      <p><em>"Two Pointers gives us O(n) instead of O(n²) because we eliminate an entire half of the search space with each step. In the worst case both pointers travel at most n positions total."</em><br><br>
      <em>"I need to sort first, which adds O(n log n), so the total complexity is O(n log n) — dominated by the sort, not the two pointer scan."</em></p>
    </div>
  </div>
</div>
  </div><!-- end al-tp -->

  <!-- ════ HASHMAP ════ -->
  <div id="al-hm" class="tab-panel">
  <div class="plan-card">
    <div class="plan-card-title">📖 HashMap / Counter — Tablas de hash</div>
    <div class="plan-block">
      <div class="plan-time">¿Qué es?</div>
      <div class="plan-content">
        <h4>Intercambia espacio por velocidad — O(1) lookup</h4>
        <p>Un HashMap (dict en Python) almacena pares clave-valor. La magia está en que acceder, insertar y buscar un elemento toma O(1) en promedio gracias al hashing. El patrón más común: <b>usa un dict para recordar lo que has visto y evitar búsquedas repetidas</b>. La clave de dominar HashMap es saber QUÉ poner como key y QUÉ como value.</p>
        <table class="kv-table" style="margin-top:10px">
          <tr><th>Estructura</th><th>Uso ideal</th><th>Extra</th></tr>
          <tr><td>dict</td><td>Mapeo general clave→valor</td><td>Key puede ser cualquier hashable</td></tr>
          <tr><td>Counter</td><td>Contar frecuencias</td><td>.most_common(n), operaciones aritméticas</td></tr>
          <tr><td>defaultdict</td><td>Agrupar por clave</td><td>No lanza KeyError, valor default automático</td></tr>
        </table>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">¿Cuándo usarlo?</div>
      <div class="plan-content">
        <div class="p-chips">
          <span class="p-chip">contar frecuencias</span><span class="p-chip">agrupar por categoría</span>
          <span class="p-chip">Two Sum / complemento</span><span class="p-chip">caché / memoización</span>
          <span class="p-chip">anagramas</span><span class="p-chip">primer duplicado</span>
          <span class="p-chip">intersección de conjuntos</span>
        </div>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">Complejidad</div>
      <div class="plan-content"><h4>O(n) tiempo · O(n) espacio</h4><p>Construir el dict: O(n). Cada lookup: O(1) amortizado. El espacio es el costo — guardas hasta n elementos. La mayoría de problemas "de O(n²) a O(n)" se resuelven con un HashMap.</p></div>
    </div>
    <div class="plan-block">
      <div class="plan-time">En Wayve</div>
      <div class="plan-content"><h4>Análisis de logs y triage de patrones</h4><p>"Top 10 errores más frecuentes por módulo en los últimos N builds" — "¿Qué bench falla más?" — "¿Qué tipo de error es más común en Etapa 3 del pipeline?"</p></div>
    </div>
  </div>
<div class="code-block">
  <div class="code-lang">Python — Los 3 patrones más comunes de HashMap</div>
  <pre><span class="c-kw">from</span> collections <span class="c-kw">import</span> Counter, defaultdict

<span class="c-cm"># ── PATRÓN 1: Contar frecuencias ─────────────────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">top_n_errors</span>(log_lines: <span class="c-bi">list</span>, n: <span class="c-bi">int</span> = <span class="c-nb">5</span>) -&gt; <span class="c-bi">list</span>:
    counter = Counter(line.split()[<span class="c-nb">-1</span>] <span class="c-kw">for</span> line <span class="c-kw">in</span> log_lines <span class="c-kw">if</span> <span class="c-st">"ERROR"</span> <span class="c-kw">in</span> line)
    <span class="c-kw">return</span> counter.most_common(n)  <span class="c-cm"># [(error, count), ...]</span>

<span class="c-cm"># ── PATRÓN 2: Agrupar por categoría ──────────────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">group_by_bench</span>(failures: <span class="c-bi">list</span>) -&gt; <span class="c-bi">dict</span>:
    <span class="c-cm">"""failures = [{"bench": "A3", "test": "test_lidar", ...}, ...]"""</span>
    grouped = defaultdict(<span class="c-bi">list</span>)          <span class="c-cm"># si bench no existe, crea lista vacía</span>
    <span class="c-kw">for</span> f <span class="c-kw">in</span> failures:
        grouped[f[<span class="c-st">"bench"</span>]].append(f[<span class="c-st">"test"</span>])
    <span class="c-kw">return</span> <span class="c-bi">dict</span>(grouped)
    <span class="c-cm"># {"A3": ["test_lidar", "test_can"], "B1": ["test_imu"], ...}</span>

<span class="c-cm"># ── PATRÓN 3: Two Sum (complemento en O(1)) ──────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">find_matching_timestamps</span>(ts_list: <span class="c-bi">list</span>, target_diff: <span class="c-bi">float</span>) -&gt; <span class="c-bi">tuple</span>:
    <span class="c-cm">"""
    Encuentra dos timestamps cuya diferencia sea exactamente target_diff.
    Wayve: ¿hay dos eventos separados exactamente por 1.0 segundo?
    """</span>
    seen = {}                     <span class="c-cm"># guardamos {valor: índice}</span>
    <span class="c-kw">for</span> i, ts <span class="c-kw">in</span> <span class="c-bi">enumerate</span>(ts_list):
        complement = ts - target_diff
        <span class="c-kw">if</span> complement <span class="c-kw">in</span> seen:
            <span class="c-kw">return</span> (seen[complement], i)   <span class="c-cm"># indices del par</span>
        seen[ts] = i
    <span class="c-kw">return</span> (-<span class="c-nb">1</span>, -<span class="c-nb">1</span>)

<span class="c-cm"># ── PATRÓN 4: Caché / Memoización ────────────────────────────────</span>
<span class="c-kw">from</span> functools <span class="c-kw">import</span> lru_cache

<span class="c-dc">@lru_cache</span>(maxsize=<span class="c-kw">None</span>)  <span class="c-cm"># dict oculto que recuerda resultados previos</span>
<span class="c-kw">def</span> <span class="c-fn">classify_error</span>(error_msg: str) -&gt; str:
    <span class="c-cm">"""Clasificación costosa — se cachea automáticamente."""</span>
    <span class="c-kw">if</span> <span class="c-st">"timeout"</span> <span class="c-kw">in</span> error_msg: <span class="c-kw">return</span> <span class="c-st">"TOOLING"</span>
    <span class="c-kw">if</span> <span class="c-st">"ASSERT"</span>  <span class="c-kw">in</span> error_msg: <span class="c-kw">return</span> <span class="c-st">"FIRMWARE"</span>
    <span class="c-kw">return</span> <span class="c-st">"UNKNOWN"</span></pre>
</div>
<div class="quiz-section">
  <div class="quiz-title">Problema de práctica</div>
  <div class="quiz-card">
    <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Practica</span>"¿Cuál es el primer error que se repite en una lista de strings?"<span class="q-arr">▶</span></div>
    <div class="quiz-a">
<b>Solución con set (O(n)):</b><br>
<code>def first_repeat(errors):<br>&nbsp;&nbsp;&nbsp;&nbsp;seen = set()<br>&nbsp;&nbsp;&nbsp;&nbsp;for e in errors:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if e in seen: return e<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;seen.add(e)<br>&nbsp;&nbsp;&nbsp;&nbsp;return None</code><br><br>
<b>Por qué set y no list:</b> <code>e in seen</code> es O(1) con set, O(n) con list. Con 10,000 líneas de log, la diferencia es enorme.
    </div>
  </div>
</div>
<div class="plan-card" style="margin-top:8px;border-left-color:#F59E0B">
  <div class="plan-card-title" style="color:#D97706;">⚠️ Trampas comunes — HashMap / Counter</div>
  <div class="plan-block">
    <div class="plan-time">Error #1</div>
    <div class="plan-content">
      <h4>Usar lista para búsquedas en lugar de set/dict</h4>
      <p><code>if x in my_list</code> es O(n). <code>if x in my_set</code> es O(1). Si haces esto dentro de un loop de n elementos, conviertes un O(n) en O(n²). Regla: si buscas repetidamente en una colección, conviértela a set o dict ANTES del loop.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Error #2</div>
    <div class="plan-content">
      <h4>dict vs defaultdict vs Counter — cuándo usar cada uno</h4>
      <table class="kv-table" style="margin-top:6px">
        <tr><th>Estructura</th><th>Usa cuando</th><th>No uses cuando</th></tr>
        <tr><td>dict</td><td>Mapeo general, keys conocidas</td><td>Accedes a keys que no existen (KeyError)</td></tr>
        <tr><td>defaultdict(list)</td><td>Agrupar elementos por key</td><td>Sabes exactamente qué keys habrá</td></tr>
        <tr><td>Counter</td><td>Contar frecuencias, top-N, comparar</td><td>Necesitas lógica distinta a +1 por elemento</td></tr>
        <tr><td>set</td><td>Solo necesitas "¿existe X?"</td><td>Necesitas el conteo o el valor asociado</td></tr>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Error #3</div>
    <div class="plan-content">
      <h4>Mutar el dict mientras iteras sobre él</h4>
      <p><code>for k in my_dict: del my_dict[k]</code> → RuntimeError. Si necesitas eliminar keys durante la iteración, usa <code>for k in list(my_dict.keys())</code> (copia la lista de keys primero) o construye una nueva dict.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Mental model</div>
    <div class="plan-content">
      <h4>La pregunta clave: ¿qué es la KEY?</h4>
      <p>Cuando ves un problema de HashMap, la mitad del trabajo es decidir qué poner como key. Piensa:<br>
      • <b>Contar algo:</b> key = el elemento, value = conteo<br>
      • <b>Buscar el complemento:</b> key = valor visto, value = índice<br>
      • <b>Agrupar:</b> key = categoría, value = lista de elementos<br>
      • <b>Cachear:</b> key = argumentos de la función, value = resultado</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Tips de entrevista</div>
    <div class="plan-content">
      <p><em>"I'm trading space for time here — the HashMap uses O(n) extra space but brings the lookup from O(n) to O(1), making the total algorithm O(n) instead of O(n²)."</em><br><br>
      <em>"I'll use Counter here — it's the most Pythonic way to count frequencies, and most_common(k) gives me the top-k in O(n log k) which is better than sorting the whole dict."</em></p>
    </div>
  </div>
</div>
  </div><!-- end al-hm -->

  <!-- ════ BFS ════ -->
  <div id="al-bfs" class="tab-panel">
  <div class="plan-card">
    <div class="plan-card-title">🌊 BFS — Breadth-First Search (nivel por nivel)</div>
    <div class="plan-block">
      <div class="plan-time">¿Qué es?</div>
      <div class="plan-content">
        <h4>Explora todos los nodos de un nivel antes de bajar al siguiente</h4>
        <p>Imagina una ola de agua expandiéndose desde un punto. Primero cubre todo lo que está a distancia 1, luego a distancia 2, etc. Esto garantiza que cuando encuentras el destino, has tomado el <b>camino más corto</b>. BFS usa una <b>cola (queue)</b> — los nodos se procesan en el orden en que llegan.</p>
        <p style="margin-top:8px"><b>Invariante clave:</b> cuando procesas un nodo de la cola, todos los nodos a menor distancia ya fueron procesados.</p>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">¿Cuándo usarlo?</div>
      <div class="plan-content">
        <div class="p-chips">
          <span class="p-chip">camino más corto</span><span class="p-chip">mínimos pasos</span>
          <span class="p-chip">nivel por nivel</span><span class="p-chip">dependencias transitivas</span>
          <span class="p-chip">propagación (contagio)</span><span class="p-chip">grafo no ponderado</span>
        </div>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">Complejidad</div>
      <div class="plan-content"><h4>O(V + E) tiempo · O(V) espacio</h4><p>V = vértices (nodos), E = aristas (conexiones). Cada nodo y cada arista se visita exactamente una vez. El espacio es O(V) para el conjunto de visitados y la cola.</p></div>
    </div>
    <div class="plan-block">
      <div class="plan-time">En Wayve</div>
      <div class="plan-content"><h4>Dependencias transitivas entre módulos</h4><p>"Si cambio el módulo sensor_driver, ¿qué tests en toda la suite se ven afectados (directa o transitivamente)?" → BFS sobre el grafo de dependencias. También útil para encontrar el camino entre dos estados en un test de sistema.</p></div>
    </div>
  </div>
<div class="code-block">
  <div class="code-lang">Python — Template BFS completo y comentado</div>
  <pre><span class="c-kw">from</span> collections <span class="c-kw">import</span> deque

<span class="c-kw">def</span> <span class="c-fn">bfs</span>(graph: <span class="c-bi">dict</span>, start, target=<span class="c-kw">None</span>):
    <span class="c-cm">"""
    graph = {nodo: [vecinos], ...}  (lista de adyacencia)
    Si target=None, recorre TODO el grafo desde start.
    Si target dado, devuelve la distancia mínima (o -1 si no alcanzable).
    """</span>
    <span class="c-kw">if</span> start <span class="c-kw">not in</span> graph: <span class="c-kw">return</span> -<span class="c-nb">1</span>

    visited = {start}          <span class="c-cm"># set — O(1) lookup, evita ciclos</span>
    queue   = deque([start])   <span class="c-cm"># deque — O(1) popleft</span>
    distance = {start: <span class="c-nb">0</span>}    <span class="c-cm"># opcional: distancia desde start</span>

    <span class="c-kw">while</span> queue:
        node = queue.popleft()   <span class="c-cm"># procesa el más antiguo (FIFO)</span>

        <span class="c-kw">if</span> node == target:
            <span class="c-kw">return</span> distance[node]  <span class="c-cm"># camino mínimo encontrado</span>

        <span class="c-kw">for</span> neighbor <span class="c-kw">in</span> graph.get(node, []):
            <span class="c-kw">if</span> neighbor <span class="c-kw">not in</span> visited:
                visited.add(neighbor)
                queue.append(neighbor)
                distance[neighbor] = distance[node] + <span class="c-nb">1</span>

    <span class="c-kw">return</span> -<span class="c-nb">1</span> <span class="c-kw">if</span> target <span class="c-kw">else</span> visited  <span class="c-cm"># -1 si no alcanzable, o todos visitados</span>

<span class="c-cm"># ── Uso real: dependencias de módulos ────────────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">affected_by_change</span>(changed: str, dep_graph: <span class="c-bi">dict</span>) -&gt; <span class="c-bi">set</span>:
    <span class="c-cm">"""Todos los módulos/tests afectados transitivamente por un cambio."""</span>
    affected = bfs(dep_graph, changed)   <span class="c-cm"># set de todos los alcanzables</span>
    <span class="c-kw">return</span> affected - {changed}          <span class="c-cm"># excluye el módulo cambiado</span>

<span class="c-cm"># Ejemplo:</span>
<span class="c-cm"># dep = {"sensor_driver": ["lidar_proc", "fusion"], "fusion": ["test_adas"]}</span>
<span class="c-cm"># affected_by_change("sensor_driver", dep) → {"lidar_proc", "fusion", "test_adas"}</span></pre>
</div>
<div class="quiz-section">
  <div class="quiz-title">Problema de práctica</div>
  <div class="quiz-card">
    <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Practica</span>"¿Cuántos grupos de módulos independientes hay en el pipeline?" (componentes conectados)<span class="q-arr">▶</span></div>
    <div class="quiz-a">
<b>BFS para contar componentes:</b><br>
<code>def count_components(graph):<br>&nbsp;&nbsp;&nbsp;&nbsp;visited = set()<br>&nbsp;&nbsp;&nbsp;&nbsp;count = 0<br>&nbsp;&nbsp;&nbsp;&nbsp;for node in graph:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if node not in visited:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;visited |= bfs(graph, node)  # marca todos los del grupo<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count += 1<br>&nbsp;&nbsp;&nbsp;&nbsp;return count</code><br><br>
<b>Por qué:</b> BFS desde un nodo visita todo su componente. Si el nodo ya fue visitado, pertenece a un componente anterior. O(V+E).
    </div>
  </div>
</div>
<div class="plan-card" style="margin-top:8px;border-left-color:#F59E0B">
  <div class="plan-card-title" style="color:#D97706;">⚠️ Trampas comunes — BFS</div>
  <div class="plan-block">
    <div class="plan-time">Error #1</div>
    <div class="plan-content">
      <h4>Usar list en vez de deque → O(n²) sin querer</h4>
      <p><code>queue.pop(0)</code> en una lista es O(n) porque desplaza todos los elementos. Con 1000 nodos, la diferencia entre <code>list.pop(0)</code> y <code>deque.popleft()</code> convierte un O(V+E) en O(V² + E). <b>Siempre usa <code>from collections import deque</code>.</b></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Error #2</div>
    <div class="plan-content">
      <h4>Marcar visitado al agregar a la cola, no al procesar</h4>
      <p>Si marcas un nodo como visitado cuando lo sacas de la cola, puedes agregar el mismo nodo múltiples veces. <b>Regla correcta:</b> marca visitado CUANDO LO AGREGAS a la cola, no cuando lo procesas. Esto evita duplicados en la cola y ciclos infinitos.</p>
      <div class="code-block"><div class="code-lang">❌ Incorrecto vs ✓ Correcto</div><pre>
<span class="c-cm"># ❌ Marca al sacar — puede duplicar nodos en la cola</span>
node = queue.popleft()
visited.add(node)          <span class="c-cm"># tarde!</span>
for n in graph[node]: queue.append(n)

<span class="c-cm"># ✓ Marca al agregar — correcto</span>
visited.add(start)
queue = deque([start])
while queue:
    node = queue.popleft()
    for n in graph[node]:
        if n not in visited:
            visited.add(n)   <span class="c-cm"># marca AQUÍ</span>
            queue.append(n)</pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Error #3</div>
    <div class="plan-content">
      <h4>No manejar grafos desconectados</h4>
      <p>BFS desde un nodo solo visita su componente. Si el grafo tiene múltiples componentes, necesitas iterar sobre todos los nodos e iniciar un BFS para cada uno no visitado. Pregunta al entrevistador: <em>"Is the graph guaranteed to be connected?"</em></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Mental model</div>
    <div class="plan-content">
      <h4>La ola de agua</h4>
      <p>BFS = tirar una piedra al agua. Primero se expande a distancia 1 (todos los vecinos directos), luego a distancia 2, etc. La garantía de camino mínimo viene del hecho de que <b>nunca procesas un nodo de distancia d+1 hasta haber procesado TODOS los de distancia d</b>. La cola FIFO mantiene este invariante automáticamente.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Tips de entrevista</div>
    <div class="plan-content">
      <p><em>"I'm using a deque instead of a list for the queue because popleft on a deque is O(1) while pop(0) on a list is O(n)."</em><br><br>
      <em>"I mark nodes as visited when I add them to the queue, not when I pop them, to prevent the same node appearing multiple times in the queue."</em><br><br>
      <em>"BFS guarantees the shortest path in unweighted graphs because we explore all neighbors at distance k before moving to distance k+1."</em></p>
    </div>
  </div>
</div>
  </div><!-- end al-bfs -->

  <!-- ════ DFS ════ -->
  <div id="al-dfs" class="tab-panel">
  <div class="plan-card">
    <div class="plan-card-title">🌳 DFS — Depth-First Search (profundidad primero)</div>
    <div class="plan-block">
      <div class="plan-time">¿Qué es?</div>
      <div class="plan-content">
        <h4>Ve tan profundo como puedas antes de explorar vecinos</h4>
        <p>Imagina un laberinto donde siempre doblas a la derecha hasta que no puedes más, luego retrocedes (backtrack) y pruebas otra dirección. DFS usa una <b>pila (stack)</b> — explícita o la pila de llamadas recursivas. La diferencia con BFS: DFS no garantiza el camino más corto, pero es mejor para explorar todas las posibilidades y detectar ciclos.</p>
        <p style="margin-top:8px"><b>Recursivo vs Iterativo:</b> la recursión implementa DFS naturalmente (la pila de llamadas ES la stack). El iterativo usa una stack explícita y puede evitar stack overflow en grafos muy profundos.</p>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">¿Cuándo usarlo?</div>
      <div class="plan-content">
        <div class="p-chips">
          <span class="p-chip">todos los caminos</span><span class="p-chip">detección de ciclos</span>
          <span class="p-chip">orden topológico</span><span class="p-chip">backtracking</span>
          <span class="p-chip">componentes conectados</span><span class="p-chip">árboles (pre/in/post-order)</span>
        </div>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">BFS vs DFS</div>
      <div class="plan-content">
        <table class="kv-table">
          <tr><th>Criterio</th><th>BFS</th><th>DFS</th></tr>
          <tr><td>Camino más corto</td><td><span class="badge badge-grn">✓ Sí</span></td><td><span class="badge badge-red">✗ No</span></td></tr>
          <tr><td>Memoria</td><td>O(w) anchura</td><td>O(h) profundidad</td></tr>
          <tr><td>Implementación</td><td>Queue</td><td>Stack / Recursión</td></tr>
          <tr><td>Detectar ciclos</td><td>Puede</td><td><span class="badge badge-grn">Natural</span></td></tr>
          <tr><td>Todos los caminos</td><td>Caro</td><td><span class="badge badge-grn">Natural</span></td></tr>
        </table>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">En Wayve</div>
      <div class="plan-content"><h4>Detectar ciclos en dependencias / orden de ejecución</h4><p>"¿Hay dependencias circulares entre módulos del pipeline?" → DFS con 3 colores (blanco/gris/negro). "Genera el orden correcto de ejecución de los tests" → DFS topológico.</p></div>
    </div>
  </div>
<div class="code-block">
  <div class="code-lang">Python — DFS recursivo e iterativo + detección de ciclos</div>
  <pre><span class="c-cm"># ── DFS RECURSIVO (más legible) ───────────────────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">dfs_recursive</span>(graph, node, visited=<span class="c-kw">None</span>):
    <span class="c-kw">if</span> visited <span class="c-kw">is None</span>: visited = <span class="c-bi">set</span>()
    visited.add(node)
    <span class="c-kw">for</span> neighbor <span class="c-kw">in</span> graph.get(node, []):
        <span class="c-kw">if</span> neighbor <span class="c-kw">not in</span> visited:
            dfs_recursive(graph, neighbor, visited)
    <span class="c-kw">return</span> visited

<span class="c-cm"># ── DFS ITERATIVO (sin riesgo de stack overflow) ──────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">dfs_iterative</span>(graph, start):
    visited = <span class="c-bi">set</span>()
    stack   = [start]     <span class="c-cm"># list como stack: .append() y .pop()</span>
    order   = []

    <span class="c-kw">while</span> stack:
        node = stack.pop()   <span class="c-cm"># LIFO — distinto a BFS que usa popleft()</span>
        <span class="c-kw">if</span> node <span class="c-kw">not in</span> visited:
            visited.add(node)
            order.append(node)
            <span class="c-cm"># agrega vecinos en orden inverso para mantener orden natural</span>
            stack.extend(<span class="c-bi">reversed</span>(graph.get(node, [])))

    <span class="c-kw">return</span> order

<span class="c-cm"># ── DETECCIÓN DE CICLOS (grafo dirigido) ──────────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">has_cycle</span>(graph: <span class="c-bi">dict</span>) -&gt; <span class="c-bi">bool</span>:
    <span class="c-cm">"""
    3 colores: WHITE (no visitado), GRAY (en proceso), BLACK (completado).
    Si encuentras un nodo GRAY durante DFS → ciclo.
    Wayve: detectar dependencias circulares entre módulos.
    """</span>
    WHITE, GRAY, BLACK = <span class="c-nb">0</span>, <span class="c-nb">1</span>, <span class="c-nb">2</span>
    color = {node: WHITE <span class="c-kw">for</span> node <span class="c-kw">in</span> graph}

    <span class="c-kw">def</span> <span class="c-fn">dfs</span>(node):
        color[node] = GRAY           <span class="c-cm"># marca: estoy procesando este nodo</span>
        <span class="c-kw">for</span> neighbor <span class="c-kw">in</span> graph.get(node, []):
            <span class="c-kw">if</span> color[neighbor] == GRAY:
                <span class="c-kw">return True</span>          <span class="c-cm"># ciclo encontrado</span>
            <span class="c-kw">if</span> color[neighbor] == WHITE <span class="c-kw">and</span> dfs(neighbor):
                <span class="c-kw">return True</span>
        color[node] = BLACK          <span class="c-cm"># marca: completamente procesado</span>
        <span class="c-kw">return False</span>

    <span class="c-kw">return any</span>(dfs(n) <span class="c-kw">for</span> n <span class="c-kw">in</span> graph <span class="c-kw">if</span> color[n] == WHITE)</pre>
</div>
<div class="quiz-section">
  <div class="quiz-title">Problema de práctica</div>
  <div class="quiz-card">
    <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Practica</span>"Genera el orden topológico de ejecución de tests (primero los que no tienen dependencias)"<span class="q-arr">▶</span></div>
    <div class="quiz-a">
<b>DFS post-order + reverse:</b><br>
<code>def topo_sort(graph):<br>&nbsp;&nbsp;&nbsp;&nbsp;visited, result = set(), []<br>&nbsp;&nbsp;&nbsp;&nbsp;def dfs(node):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;visited.add(node)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for n in graph.get(node,[]):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if n not in visited: dfs(n)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result.append(node)  # POST-order<br>&nbsp;&nbsp;&nbsp;&nbsp;for node in graph:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if node not in visited: dfs(node)<br>&nbsp;&nbsp;&nbsp;&nbsp;return result[::-1]  # reverse</code><br><br>
<b>Por qué post-order:</b> agregas el nodo DESPUÉS de procesar todos sus dependientes. Al invertir, los nodos sin dependencias quedan primero.
    </div>
  </div>
</div>
<div class="plan-card" style="margin-top:8px;border-left-color:#F59E0B">
  <div class="plan-card-title" style="color:#D97706;">⚠️ Trampas comunes — DFS</div>
  <div class="plan-block">
    <div class="plan-time">Error #1</div>
    <div class="plan-content">
      <h4>RecursionError en grafos profundos (Python)</h4>
      <p>Python tiene un límite de recursión de ~1000 por defecto. Un grafo con 10,000 nodos en cadena lineal causará RecursionError. La solución: <b>usar DFS iterativo</b> con una stack explícita, o aumentar el límite con <code>sys.setrecursionlimit(10000)</code> (pero menciona que preferirías el iterativo en producción).</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Error #2</div>
    <div class="plan-content">
      <h4>DFS iterativo no produce el mismo orden que el recursivo</h4>
      <p>En DFS iterativo usas <code>stack.extend(reversed(neighbors))</code> para mantener el mismo orden de exploración que el recursivo. Si haces <code>stack.extend(neighbors)</code> sin reversed, explorarás los vecinos en orden inverso. No es incorrecto pero puede confundir al entrevistador si compara outputs.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Error #3</div>
    <div class="plan-content">
      <h4>Usar el mismo visited para grafos desconectados</h4>
      <p>El set <code>visited</code> debe ser compartido a través de todos los nodos cuando buscas componentes conectados. Si creas un nuevo <code>visited</code> por cada nodo inicial, cada BFS/DFS re-visita nodos ya procesados.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">BFS vs DFS — cuándo usar cuál</div>
    <div class="plan-content">
      <p><b>Usa BFS cuando:</b> necesitas el camino más corto, o el problema pide "mínimos pasos", o exploras por niveles (árbol de decisión nivel a nivel).<br><br>
      <b>Usa DFS cuando:</b> quieres todos los caminos posibles, detectar ciclos, backtracking, orden topológico, o cuando el árbol es muy ancho (BFS ocuparía demasiada memoria).<br><br>
      <b>DFS usa O(h) memoria</b> donde h=profundidad. <b>BFS usa O(w) memoria</b> donde w=anchura máxima. En un árbol perfectamente balanceado, h = log n y w = n/2 → DFS es más eficiente en memoria.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Tips de entrevista</div>
    <div class="plan-content">
      <p><em>"I'm using the 3-color approach for cycle detection: white for unvisited, gray for currently being processed, black for fully processed. A gray neighbor means we've found a back edge — that's a cycle."</em><br><br>
      <em>"I'll use iterative DFS to avoid Python's recursion limit, which defaults to 1000. This is important for large graphs that could cause a stack overflow with recursive DFS."</em></p>
    </div>
  </div>
  </div>
</div>
  </div><!-- end al-dfs -->

  <!-- ════ BINARY SEARCH ════ -->
  <div id="al-bs" class="tab-panel">
  <div class="plan-card">
    <div class="plan-card-title">🔍 Binary Search — Búsqueda binaria</div>
    <div class="plan-block">
      <div class="plan-time">¿Qué es?</div>
      <div class="plan-content">
        <h4>Elimina la mitad del espacio de búsqueda en cada paso</h4>
        <p>Solo funciona en datos <b>ordenados</b>. La idea: compara con el elemento del medio. Si es el que buscas, listo. Si el objetivo es mayor, ignora la mitad izquierda. Si es menor, ignora la derecha. Cada comparación elimina la mitad → O(log n). Con 1,000,000 elementos, solo necesitas ≈20 comparaciones.</p>
        <p style="margin-top:8px"><b>El truco difícil:</b> las condiciones de las variantes (lower bound, upper bound). Memoriza el template y adáptalo.</p>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">¿Cuándo usarlo?</div>
      <div class="plan-content">
        <div class="p-chips">
          <span class="p-chip">array/lista ORDENADA</span><span class="p-chip">find first/last X</span>
          <span class="p-chip">binary search on answer</span><span class="p-chip">monotonic function</span>
          <span class="p-chip">minimizar el máximo</span>
        </div>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">Complejidad</div>
      <div class="plan-content"><h4>O(log n) tiempo · O(1) espacio</h4><p>Cada iteración divide el espacio a la mitad: n → n/2 → n/4 → ... → 1. Eso es log₂(n) pasos. Para n=1,000,000: ~20 pasos. Para n=1,000,000,000: ~30 pasos.</p></div>
    </div>
    <div class="plan-block">
      <div class="plan-time">En Wayve</div>
      <div class="plan-content"><h4>Encontrar el primer fallo en historial de builds</h4><p>"¿Cuál fue el primer commit/build donde este test empezó a fallar?" — Lista de builds ordenada cronológicamente → Binary search para encontrar el punto de quiebre. También: git bisect implementa exactamente este algoritmo.</p></div>
    </div>
  </div>
<div class="code-block">
  <div class="code-lang">Python — 4 variantes de Binary Search</div>
  <pre><span class="c-cm"># ── VARIANTE 1: Exact match (la más simple) ───────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">binary_search</span>(arr: <span class="c-bi">list</span>, target) -&gt; <span class="c-bi">int</span>:
    left, right = <span class="c-nb">0</span>, <span class="c-bi">len</span>(arr) - <span class="c-nb">1</span>
    <span class="c-kw">while</span> left &lt;= right:        <span class="c-cm"># ≤ porque left==right es válido</span>
        mid = left + (right - left) // <span class="c-nb">2</span>  <span class="c-cm"># evita overflow (en Python no importa, pero es buena práctica)</span>
        <span class="c-kw">if</span>   arr[mid] == target: <span class="c-kw">return</span> mid
        <span class="c-kw">elif</span> arr[mid] &lt;  target: left  = mid + <span class="c-nb">1</span>
        <span class="c-kw">else</span>:                    right = mid - <span class="c-nb">1</span>
    <span class="c-kw">return</span> -<span class="c-nb">1</span>

<span class="c-cm"># ── VARIANTE 2: Lower bound (primer índice &gt;= target) ────────────</span>
<span class="c-kw">import</span> bisect
<span class="c-cm"># bisect_left: primer índice donde arr[i] &gt;= target</span>
<span class="c-cm"># bisect_right: primer índice donde arr[i] &gt;  target</span>

<span class="c-kw">def</span> <span class="c-fn">first_failure_after_ts</span>(build_ts: <span class="c-bi">list</span>, build_ok: <span class="c-bi">list</span>, deploy_ts: <span class="c-bi">float</span>):
    <span class="c-cm">"""
    build_ts: timestamps de builds ORDENADOS
    build_ok: True/False para cada build
    Encuentra el primer build después de deploy_ts que FALLÓ.
    O(log n) — exactamente lo que hace git bisect.
    """</span>
    idx = bisect.bisect_left(build_ts, deploy_ts)   <span class="c-cm"># primer build &gt;= deploy</span>
    <span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(idx, <span class="c-bi">len</span>(build_ok)):
        <span class="c-kw">if not</span> build_ok[i]: <span class="c-kw">return</span> i      <span class="c-cm"># primer fallo</span>
    <span class="c-kw">return</span> -<span class="c-nb">1</span>

<span class="c-cm"># ── VARIANTE 3: Binary search on the ANSWER (patrón avanzado) ────</span>
<span class="c-kw">def</span> <span class="c-fn">min_window_for_coverage</span>(tests_per_window: <span class="c-bi">callable</span>, min_coverage: <span class="c-bi">int</span>) -&gt; <span class="c-bi">int</span>:
    <span class="c-cm">"""
    Encuentra la ventana de tiempo mínima que cubre al menos min_coverage tests.
    No buscas en un array — buscas en el ESPACIO DE RESPUESTAS (tamaños de ventana).
    Aplica cuando: "minimizar X" donde existe un umbral monotónico.
    """</span>
    left, right = <span class="c-nb">1</span>, <span class="c-nb">86400</span>  <span class="c-cm"># rango de posibles tamaños (1 seg a 1 día)</span>
    <span class="c-kw">while</span> left &lt; right:
        mid = (left + right) // <span class="c-nb">2</span>
        <span class="c-kw">if</span> tests_per_window(mid) &gt;= min_coverage:
            right = mid        <span class="c-cm"># mid funciona, pero quizás hay algo menor</span>
        <span class="c-kw">else</span>:
            left = mid + <span class="c-nb">1</span>     <span class="c-cm"># mid no alcanza, necesitamos más</span>
    <span class="c-kw">return</span> left</pre>
</div>
<div class="quiz-section">
  <div class="quiz-title">Problema de práctica</div>
  <div class="quiz-card">
    <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Practica</span>"Dado un array ordenado con un número repetido, encuentra el rango [first, last] de ese número"<span class="q-arr">▶</span></div>
    <div class="quiz-a">
<b>Dos binary searches (lower + upper bound):</b><br>
<code>def search_range(nums, target):<br>&nbsp;&nbsp;&nbsp;&nbsp;left = bisect.bisect_left(nums, target)<br>&nbsp;&nbsp;&nbsp;&nbsp;if left == len(nums) or nums[left] != target:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return [-1, -1]<br>&nbsp;&nbsp;&nbsp;&nbsp;right = bisect.bisect_right(nums, target) - 1<br>&nbsp;&nbsp;&nbsp;&nbsp;return [left, right]</code><br><br>
<b>bisect_left</b> da el primer índice. <b>bisect_right - 1</b> da el último. O(log n).
    </div>
  </div>
</div>
<div class="plan-card" style="margin-top:8px;border-left-color:#F59E0B">
  <div class="plan-card-title" style="color:#D97706;">⚠️ Trampas comunes — Binary Search</div>
  <div class="plan-block">
    <div class="plan-time">Error #1 (más común)</div>
    <div class="plan-content">
      <h4>Off-by-one: la diferencia entre &lt; y &lt;=</h4>
      <p>El error más frecuente en Binary Search. La condición del while determina cuándo paras:<br><br>
      <b>Exact match:</b> <code>while left &lt;= right</code> — permite que left==right (un solo elemento)<br>
      <b>Lower bound (bisect_left):</b> <code>while left &lt; right</code> — cuando left==right, lo es la respuesta<br><br>
      Memoriza esto: <b>exact match usa ≤, lower/upper bound usa &lt;</b>. Si usas el incorrecto, tu loop termina un paso antes o después del elemento correcto.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Error #2</div>
    <div class="plan-content">
      <h4>Overflow de mid (en C/Java, no Python)</h4>
      <p><code>mid = (left + right) // 2</code> puede causar overflow en C/Java si left+right excede el máximo de int. La forma correcta es <code>mid = left + (right - left) // 2</code>. <b>En Python los enteros son arbitrariamente grandes, no hay overflow.</b> Pero menciónalo en la entrevista — demuestra que conoces el código a nivel bajo: <em>"In Python this isn't an issue, but in languages with fixed-size integers I'd write it as left + (right - left) // 2 to prevent overflow."</em></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Error #3</div>
    <div class="plan-content">
      <h4>Binary Search on the Answer — el patrón avanzado más confuso</h4>
      <p>Cuando el problema dice "minimizar X tal que Y es posible", no buscas en un array — buscas en el espacio de posibles respuestas. La key insight: si X funciona para algún valor, funciona para todos los valores mayores (monotónico). Esto permite BS sobre la respuesta.<br><br>
      <em>Ejemplo:</em> "¿cuál es el mínimo número de benches que necesitas para cubrir todos los tests en T horas?" → BS sobre el número de benches (1 a n_tests), con una función check(k) que valida si k benches son suficientes.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">bisect module — úsalo siempre</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">bisect cheatsheet — memoriza esto</div><pre>
import bisect

# bisect_left(arr, x)  → primer índice donde arr[i] >= x
# bisect_right(arr, x) → primer índice donde arr[i] >  x  (one past last x)

arr = [1, 3, 3, 3, 7]
bisect.bisect_left(arr,  3)  # → 1  (primer 3)
bisect.bisect_right(arr, 3)  # → 4  (después del último 3)

# ¿Está x en arr?
i = bisect.bisect_left(arr, x)
found = i &lt; len(arr) and arr[i] == x

# insort — inserta manteniendo el orden
bisect.insort(arr, 5)   # → [1, 3, 3, 3, 5, 7]  O(n) por la inserción</pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Tips de entrevista</div>
    <div class="plan-content">
      <p><em>"I'll use Python's bisect module for the binary search — it's part of the standard library, battle-tested, and more readable than reimplementing. If you'd like me to implement it from scratch I can do that too."</em><br><br>
      <em>"Binary search requires the input to be sorted. I need to verify that assumption or sort first, which would change the complexity from O(log n) to O(n log n)."</em></p>
    </div>
  </div>
</div>
  </div><!-- end al-bs -->

  <!-- ════ HEAP ════ -->
  <div id="al-hp" class="tab-panel">
  <div class="plan-card">
    <div class="plan-card-title">⛰️ Heap / Priority Queue — Cola de prioridad</div>
    <div class="plan-block">
      <div class="plan-time">¿Qué es?</div>
      <div class="plan-content">
        <h4>Siempre accede al elemento mínimo (o máximo) en O(log n)</h4>
        <p>Un heap es un árbol binario donde el padre siempre es menor (min-heap) o mayor (max-heap) que sus hijos. Python tiene <code>heapq</code> que implementa min-heap. Para max-heap: <b>niega los valores</b> (-valor). Las operaciones clave son: <code>heappush(h, x)</code> → inserta en O(log n), <code>heappop(h)</code> → extrae el mínimo en O(log n), <code>h[0]</code> → peek al mínimo en O(1).</p>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">¿Cuándo usarlo?</div>
      <div class="plan-content">
        <div class="p-chips">
          <span class="p-chip">Top-K elementos</span><span class="p-chip">K más pequeños/grandes</span>
          <span class="p-chip">Mediana de stream</span><span class="p-chip">Merge de K listas</span>
          <span class="p-chip">Próximo evento (simulación)</span><span class="p-chip">Dijkstra</span>
        </div>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">Complejidad</div>
      <div class="plan-content"><h4>O(log n) push/pop · O(1) peek · O(n) build</h4><p>Mantener un heap de K elementos mientras procesas N elementos: O(n log k). Mucho mejor que sort O(n log n) cuando K &lt;&lt; N.</p></div>
    </div>
    <div class="plan-block">
      <div class="plan-time">En Wayve</div>
      <div class="plan-content"><h4>Top-K fallos más frecuentes en tiempo real</h4><p>"Mantén los 10 tests con más fallos en el pipeline sin re-ordenar toda la lista cada vez que llega un resultado nuevo." → min-heap de tamaño K.</p></div>
    </div>
  </div>
<div class="code-block">
  <div class="code-lang">Python — heapq: todos los patrones importantes</div>
  <pre><span class="c-kw">import</span> heapq
<span class="c-kw">from</span> collections <span class="c-kw">import</span> Counter

<span class="c-cm"># ── PATRÓN 1: Top K más frecuentes ──────────────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">top_k_failures</span>(failures: <span class="c-bi">list</span>, k: <span class="c-bi">int</span>) -&gt; <span class="c-bi">list</span>:
    <span class="c-cm">"""Top K tests que más fallan. O(n log k) — mejor que sort O(n log n)."""</span>
    freq = Counter(failures)
    <span class="c-cm"># nlargest usa heap internamente</span>
    <span class="c-kw">return</span> heapq.nlargest(k, freq.items(), key=<span class="c-kw">lambda</span> x: x[<span class="c-nb">1</span>])

<span class="c-cm"># ── PATRÓN 2: K más pequeños en stream (sin conocer el total) ────</span>
<span class="c-kw">def</span> <span class="c-fn">k_smallest_latencies</span>(stream, k: <span class="c-bi">int</span>) -&gt; <span class="c-bi">list</span>:
    <span class="c-cm">"""
    Mantiene los K menores tiempos de respuesta de un stream infinito.
    Truco: max-heap de tamaño K (negamos para simular max-heap).
    Si el nuevo elemento es menor que el máximo actual, reemplaza.
    """</span>
    heap = []   <span class="c-cm"># min-heap con valores NEGADOS → se comporta como max-heap</span>
    <span class="c-kw">for</span> val <span class="c-kw">in</span> stream:
        <span class="c-kw">if</span> <span class="c-bi">len</span>(heap) &lt; k:
            heapq.heappush(heap, -val)        <span class="c-cm"># llena el heap primero</span>
        <span class="c-kw">elif</span> val &lt; -heap[<span class="c-nb">0</span>]:               <span class="c-cm"># heap[0] es el MAYOR (negado)</span>
            heapq.heapreplace(heap, -val)     <span class="c-cm"># reemplaza el mayor por el nuevo menor</span>
    <span class="c-kw">return</span> [-x <span class="c-kw">for</span> x <span class="c-kw">in</span> heap]

<span class="c-cm"># ── PATRÓN 3: Merge de K streams ordenados (ej: K benches) ──────</span>
<span class="c-kw">def</span> <span class="c-fn">merge_bench_logs</span>(bench_logs: <span class="c-bi">list</span>[<span class="c-bi">list</span>]) -&gt; <span class="c-bi">list</span>:
    <span class="c-cm">"""
    Cada bench_log es una lista de (timestamp, evento) ya ordenada.
    Une todos los logs en orden cronológico. O(n log k) donde k=benches.
    """</span>
    heap = []
    iterators = [<span class="c-bi">iter</span>(log) <span class="c-kw">for</span> log <span class="c-kw">in</span> bench_logs]

    <span class="c-kw">for</span> i, it <span class="c-kw">in</span> <span class="c-bi">enumerate</span>(iterators):
        item = <span class="c-bi">next</span>(it, <span class="c-kw">None</span>)
        <span class="c-kw">if</span> item: heapq.heappush(heap, (item[<span class="c-nb">0</span>], i, item, it))

    result = []
    <span class="c-kw">while</span> heap:
        ts, i, item, it = heapq.heappop(heap)
        result.append(item)
        nxt = <span class="c-bi">next</span>(it, <span class="c-kw">None</span>)
        <span class="c-kw">if</span> nxt: heapq.heappush(heap, (nxt[<span class="c-nb">0</span>], i, nxt, it))
    <span class="c-kw">return</span> result</pre>
</div>
<div class="quiz-section">
  <div class="quiz-title">Problema de práctica</div>
  <div class="quiz-card">
    <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Practica</span>"Dado un stream de tiempos de respuesta, devuelve la mediana en tiempo real después de cada nuevo valor"<span class="q-arr">▶</span></div>
    <div class="quiz-a">
<b>Dos heaps (max-heap izquierdo + min-heap derecho):</b><br>
<code>class MedianFinder:<br>&nbsp;&nbsp;&nbsp;&nbsp;def __init__(self): self.lo, self.hi = [], []  # max-heap, min-heap<br>&nbsp;&nbsp;&nbsp;&nbsp;def add(self, num):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;heapq.heappush(self.lo, -num)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;heapq.heappush(self.hi, -heapq.heappop(self.lo))<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if len(self.lo) &lt; len(self.hi):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;heapq.heappush(self.lo, -heapq.heappop(self.hi))<br>&nbsp;&nbsp;&nbsp;&nbsp;def median(self):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if len(self.lo) &gt; len(self.hi): return -self.lo[0]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return (-self.lo[0] + self.hi[0]) / 2</code><br><br>
<b>Concepto:</b> lo (max-heap) guarda la mitad menor, hi (min-heap) la mitad mayor. La mediana está en la cima de uno o promedio de ambas cimas.
    </div>
  </div>
</div>
<div class="plan-card" style="margin-top:8px;border-left-color:#F59E0B">
  <div class="plan-card-title" style="color:#D97706;">⚠️ Trampas comunes — Heap</div>
  <div class="plan-block">
    <div class="plan-time">Error #1 (el más frecuente)</div>
    <div class="plan-content">
      <h4>Python heapq es MIN-HEAP. Siempre.</h4>
      <p><code>heapq</code> implementa solo min-heap. Para max-heap hay que <b>negar los valores: push(-x), el elemento más "grande" tiene el valor más negativo y queda en la cima</b>. Cuando haces pop, niega el resultado para recuperar el valor original.<br><br>
      <div class="code-block"><div class="code-lang">Min-heap vs Max-heap en Python</div><pre>
import heapq

# MIN-HEAP (default)
h = []
heapq.heappush(h, 5); heapq.heappush(h, 2); heapq.heappush(h, 8)
heapq.heappop(h)  # → 2  (el mínimo)

# MAX-HEAP (negando valores)
h = []
heapq.heappush(h, -5); heapq.heappush(h, -2); heapq.heappush(h, -8)
-heapq.heappop(h)  # → 8  (el máximo, negamos para recuperar)</pre></div>
      </p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Error #2</div>
    <div class="plan-content">
      <h4>Heap con objetos compuestos — el orden de los elementos importa</h4>
      <p>Cuando haces <code>heappush(h, (priority, data))</code>, Python compara el primer elemento. Si hay empate en priority, compara el segundo. Si data no es comparable → TypeError. <b>Solución: incluir un contador único como segundo elemento:</b><br><br>
      <code>heappush(h, (priority, count, data))</code> — el counter rompe empates y data nunca se compara.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Error #3</div>
    <div class="plan-content">
      <h4>heapq.nlargest vs sort — cuándo es más eficiente el heap</h4>
      <p><code>heapq.nlargest(k, iterable)</code> es O(n log k). <code>sorted(iterable, reverse=True)[:k]</code> es O(n log n). <b>El heap es mejor cuando k &lt;&lt; n.</b> Si k ≈ n, sort es comparable o mejor (mejor caché locality). La regla práctica: si k &lt; n/4, usa heap; si k ≥ n/4, considera sort.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Mental model</div>
    <div class="plan-content">
      <h4>El heap como "lista top-K viviente"</h4>
      <p>Imagina que tienes una agenda de las 10 citas más próximas. Cada vez que llega una nueva cita, la comparas con la más lejana del top-10. Si es más próxima, la reemplaza. El heap mantiene esta "lista viva" actualizada en O(log k) por nuevo elemento, sin reordenar todo.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Tips de entrevista</div>
    <div class="plan-content">
      <p><em>"Python's heapq only implements min-heap. For a max-heap I negate the values on push and negate again on pop."</em><br><br>
      <em>"Using a min-heap of size K for top-K gives us O(n log k) which is better than sorting everything O(n log n) when k is much smaller than n — which is the typical case for top-5 or top-10 results."</em><br><br>
      <em>"I'll use heapq.nlargest(k, items, key=...) here — it's internally optimized and more readable than maintaining the heap manually."</em></p>
    </div>
  </div>
</div>
  </div><!-- end al-hp -->

  <!-- ════ STACK / QUEUE ════ -->
  <div id="al-st" class="tab-panel">
  <div class="plan-card">
    <div class="plan-card-title">📚 Stack & Queue — Pila y Cola</div>
    <div class="plan-block">
      <div class="plan-time">Stack — LIFO</div>
      <div class="plan-content">
        <h4>Last In, First Out — El último que entra es el primero en salir</h4>
        <p>Como una pila de platos: solo puedes agregar y quitar del tope. En Python se implementa con una <b>list</b> (append = push, pop = pop). Perfecto para problemas de "matching", deshacer operaciones, y el patrón de <b>monotonic stack</b> (siguiente elemento mayor/menor).</p>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">Queue — FIFO</div>
      <div class="plan-content">
        <h4>First In, First Out — El primero que entra es el primero en salir</h4>
        <p>Como una fila de espera. En Python se implementa con <b>collections.deque</b> (append = enqueue, popleft = dequeue). Es la estructura base de BFS. También útil para rate limiting y procesamiento de eventos en orden.</p>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">¿Cuándo usar Stack?</div>
      <div class="plan-content">
        <div class="p-chips">
          <span class="p-chip">paréntesis balanceados</span><span class="p-chip">DFS iterativo</span>
          <span class="p-chip">deshacer (undo)</span><span class="p-chip">expresiones matemáticas</span>
          <span class="p-chip">siguiente elemento mayor</span><span class="p-chip">historial de navegación</span>
        </div>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">En Wayve</div>
      <div class="plan-content"><h4>Validar estructura de logs / eventos anidados</h4><p>"Verifica que cada BEGIN en el log tiene su END correspondiente y están bien anidados." → Stack para matching. También: "procesa los eventos de CI en el orden exacto en que llegaron." → Queue.</p></div>
    </div>
  </div>
<div class="code-block">
  <div class="code-lang">Python — Stack: paréntesis + Monotonic Stack</div>
  <pre><span class="c-cm"># ── PATRÓN 1: Matching/Balanceo ──────────────────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">validate_log_nesting</span>(log_lines: <span class="c-bi">list</span>) -&gt; <span class="c-bi">bool</span>:
    <span class="c-cm">"""
    Verifica que cada BEGIN tiene su END en el log de CI.
    Ej: ["BEGIN:setup", "BEGIN:flash", "END:flash", "END:setup"]  → True
        ["BEGIN:setup", "END:flash"]  → False (mismatch)
    Wayve: validar que los stages del pipeline abren y cierran correctamente.
    """</span>
    stack = []
    matching = {<span class="c-st">"END:flash"</span>: <span class="c-st">"BEGIN:flash"</span>, <span class="c-st">"END:setup"</span>: <span class="c-st">"BEGIN:setup"</span>,
                <span class="c-st">"END:test"</span>: <span class="c-st">"BEGIN:test"</span>}

    <span class="c-kw">for</span> line <span class="c-kw">in</span> log_lines:
        tag = line.strip()
        <span class="c-kw">if</span> tag.startswith(<span class="c-st">"BEGIN"</span>):
            stack.append(tag)             <span class="c-cm"># push</span>
        <span class="c-kw">elif</span> tag <span class="c-kw">in</span> matching:
            <span class="c-kw">if not</span> stack <span class="c-kw">or</span> stack[-<span class="c-nb">1</span>] != matching[tag]:
                <span class="c-kw">return False</span>            <span class="c-cm"># mismatch</span>
            stack.pop()                   <span class="c-cm"># pop</span>

    <span class="c-kw">return</span> <span class="c-bi">len</span>(stack) == <span class="c-nb">0</span>            <span class="c-cm"># True si todo balanceado</span>

<span class="c-cm"># ── PATRÓN 2: Monotonic Stack (siguiente mayor a la derecha) ─────</span>
<span class="c-kw">def</span> <span class="c-fn">next_higher_frequency</span>(frequencies: <span class="c-bi">list</span>) -&gt; <span class="c-bi">list</span>:
    <span class="c-cm">"""
    Para cada posición, encuentra la siguiente frecuencia mayor.
    Wayve: "Para cada frame, ¿cuándo vuelve a haber un pico de errores mayor?"
    """</span>
    n = <span class="c-bi">len</span>(frequencies)
    result = [-<span class="c-nb">1</span>] * n     <span class="c-cm"># -1 si no hay mayor a la derecha</span>
    stack = []            <span class="c-cm"># guarda índices (no valores)</span>

    <span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(n):
        <span class="c-cm"># Mientras el elemento actual es MAYOR que el tope del stack</span>
        <span class="c-kw">while</span> stack <span class="c-kw">and</span> frequencies[i] &gt; frequencies[stack[-<span class="c-nb">1</span>]]:
            idx = stack.pop()
            result[idx] = i    <span class="c-cm"># i es el "siguiente mayor" para idx</span>
        stack.append(i)
    <span class="c-kw">return</span> result  <span class="c-cm"># O(n) — cada elemento entra y sale del stack una vez</span></pre>
</div>
<div class="code-block">
  <div class="code-lang">Python — Queue / deque: procesamiento de eventos</div>
  <pre><span class="c-kw">from</span> collections <span class="c-kw">import</span> deque
<span class="c-kw">from</span> dataclasses <span class="c-kw">import</span> dataclass
<span class="c-kw">import</span> time

<span class="c-dc">@dataclass</span>
<span class="c-kw">class</span> <span class="c-fn">CIEvent</span>:
    timestamp: <span class="c-bi">float</span>
    event_type: str
    payload: <span class="c-bi">dict</span>

<span class="c-kw">class</span> <span class="c-fn">EventProcessor</span>:
    <span class="c-cm">"""
    Procesa eventos de CI en orden FIFO.
    Rate limiter integrado: máximo max_rate eventos por segundo.
    Wayve: procesar resultados de tests que llegan de múltiples benches.
    """</span>
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(self, max_rate: <span class="c-bi">int</span> = <span class="c-nb">100</span>):
        self.queue    = deque()     <span class="c-cm"># O(1) append y popleft</span>
        self.max_rate = max_rate
        self.window   = deque()     <span class="c-cm"># timestamps del último segundo</span>

    <span class="c-kw">def</span> <span class="c-fn">enqueue</span>(self, event: CIEvent) -&gt; <span class="c-kw">None</span>:
        self.queue.append(event)

    <span class="c-kw">def</span> <span class="c-fn">process_next</span>(self) -&gt; CIEvent | <span class="c-kw">None</span>:
        <span class="c-kw">if not</span> self.queue: <span class="c-kw">return None</span>
        now = time.time()
        <span class="c-cm"># limpia eventos fuera del último segundo</span>
        <span class="c-kw">while</span> self.window <span class="c-kw">and</span> now - self.window[<span class="c-nb">0</span>] &gt; <span class="c-nb">1.0</span>:
            self.window.popleft()
        <span class="c-kw">if</span> <span class="c-bi">len</span>(self.window) &gt;= self.max_rate:
            <span class="c-kw">return None</span>  <span class="c-cm"># rate limit alcanzado</span>
        self.window.append(now)
        <span class="c-kw">return</span> self.queue.popleft()</pre>
</div>
<div class="quiz-section">
  <div class="quiz-title">Problema de práctica</div>
  <div class="quiz-card">
    <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Practica</span>"Dado un log con OPEN y CLOSE de stages, reporta los stages que nunca se cerraron"<span class="q-arr">▶</span></div>
    <div class="quiz-a">
<b>Stack + tracking:</b><br>
<code>def unclosed_stages(lines):<br>&nbsp;&nbsp;&nbsp;&nbsp;stack = []<br>&nbsp;&nbsp;&nbsp;&nbsp;for line in lines:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if line.startswith("OPEN:"):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stack.append(line[5:])<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elif line.startswith("CLOSE:") and stack:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stack.pop()<br>&nbsp;&nbsp;&nbsp;&nbsp;return stack  # lo que queda = nunca se cerró</code>
    </div>
  </div>
</div>
<div class="plan-card" style="margin-top:8px;border-left-color:#F59E0B">
  <div class="plan-card-title" style="color:#D97706;">⚠️ Trampas comunes — Stack / Queue</div>
  <div class="plan-block">
    <div class="plan-time">Error #1</div>
    <div class="plan-content">
      <h4>list.pop(0) para queue — O(n) en vez de O(1)</h4>
      <p>Este es el error de performance más invisible. <code>my_list.pop(0)</code> desplaza todos los elementos → O(n). En 10,000 operaciones son 100,000,000 movimientos. <b>Regla de oro:</b><br>
      • <b>Stack (LIFO):</b> usa <code>list</code> con <code>.append()</code> y <code>.pop()</code><br>
      • <b>Queue (FIFO):</b> usa <code>deque</code> con <code>.append()</code> y <code>.popleft()</code><br><br>
      Nunca uses <code>list.pop(0)</code> en una queue. Si lo ves en código de producción, es un bug de performance.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Error #2</div>
    <div class="plan-content">
      <h4>Monotonic Stack — confundir "siguiente mayor" con "siguiente menor"</h4>
      <p>Hay 4 variantes de Monotonic Stack:<br>
      <code>freq[i] &gt; freq[stack[-1]]</code> → next greater (stack decreasing)<br>
      <code>freq[i] &lt; freq[stack[-1]]</code> → next smaller (stack increasing)<br>
      <code>freq[i] &gt;= freq[stack[-1]]</code> → next greater or equal<br>
      <code>freq[i] &lt;= freq[stack[-1]]</code> → next smaller or equal<br><br>
      La intuición: el stack siempre mantiene candidatos potenciales. Cuando encuentras el "siguiente mayor", sacas todos los que son menores (ya tienen su respuesta) y agregas el actual como próximo candidato.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Error #3</div>
    <div class="plan-content">
      <h4>Stack vacío al hacer pop — siempre verificar</h4>
      <p>Antes de <code>stack.pop()</code> o <code>stack[-1]</code> siempre verifica <code>if stack:</code>. Un stack vacío lanza IndexError. En matching de paréntesis, un CLOSE sin un OPEN correspondiente → pila vacía → error. La guard es: <code>if stack and matches[char] == stack[-1]: stack.pop()</code></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Stack vs Queue — cuándo usar cuál</div>
    <div class="plan-content">
      <table class="kv-table">
        <tr><th>Necesitas</th><th>Estructura</th><th>Por qué</th></tr>
        <tr><td>DFS iterativo</td><td>Stack (list)</td><td>LIFO = profundidad primero</td></tr>
        <tr><td>BFS</td><td>Queue (deque)</td><td>FIFO = nivel por nivel</td></tr>
        <tr><td>Deshacer/Redo</td><td>Stack</td><td>Última acción = primera en deshacer</td></tr>
        <tr><td>Procesar eventos en orden</td><td>Queue</td><td>Primero en llegar, primero en salir</td></tr>
        <tr><td>Siguiente mayor/menor elemento</td><td>Monotonic Stack</td><td>Mantiene candidatos pendientes</td></tr>
        <tr><td>Rate limiting</td><td>Queue (deque)</td><td>Evicta eventos fuera de la ventana por izquierda</td></tr>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Tips de entrevista</div>
    <div class="plan-content">
      <p><em>"I'll use a deque instead of a list here because I need O(1) popleft — list.pop(0) would be O(n) and that matters when processing millions of events."</em><br><br>
      <em>"This is the classic stack matching problem — I push opening tags and pop when I see a closing tag, verifying the types match. If the stack is non-empty at the end, there are unclosed tags."</em></p>
    </div>
  </div>
</div>
  </div><!-- end al-st -->

  <!-- ════ STRINGS & REGEX ════ -->
  <div id="al-re" class="tab-panel">
  <div class="plan-card">
    <div class="plan-card-title">🔤 Strings & Regex — Análisis de logs</div>
    <div class="plan-block">
      <div class="plan-time">¿Qué es?</div>
      <div class="plan-content">
        <h4>Procesamiento de texto y patrones — crítico para analizar logs de CI</h4>
        <p>En Wayve trabajas con logs de CI/CD, logs de benches HIL, y datos de sensores en texto. Saber parsear y extraer información de strings de manera eficiente es una skill práctica del día a día. El módulo <code>re</code> de Python implementa expresiones regulares: patrones que describen texto.</p>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">Regex esencial</div>
      <div class="plan-content">
        <table class="kv-table">
          <tr><th>Patrón</th><th>Significa</th><th>Ejemplo</th></tr>
          <tr><td>\d+</td><td>Uno o más dígitos</td><td>\d+ → "123" en "error 123"</td></tr>
          <tr><td>\w+</td><td>Palabra (letras+dígitos+_)</td><td>\w+ → "test_lidar"</td></tr>
          <tr><td>\s+</td><td>Espacios/tabs/newlines</td><td>split por whitespace</td></tr>
          <tr><td>.</td><td>Cualquier carácter (excepto \n)</td><td>.</td></tr>
          <tr><td>^</td><td>Inicio de línea</td><td>^ERROR → líneas que empiezan con ERROR</td></tr>
          <tr><td>$</td><td>Fin de línea</td><td>\.log$ → archivos .log</td></tr>
          <tr><td>(...)</td><td>Grupo de captura</td><td>(\d+:\d+) → "12:30"</td></tr>
          <tr><td>(?:...)</td><td>Grupo sin captura</td><td>más eficiente si no necesitas el valor</td></tr>
          <tr><td>a|b</td><td>a o b</td><td>ERROR|FAILED</td></tr>
          <tr><td>?</td><td>0 o 1 (opcional)</td><td>colou?r → color o colour</td></tr>
        </table>
      </div>
    </div>
    <div class="plan-block">
      <div class="plan-time">En Wayve</div>
      <div class="plan-content"><h4>Parsear logs de CI, extraer métricas, clasificar errores</h4><p>"Del log de Jenkins, extrae: timestamp + test name + resultado + duración para cada test." — "Clasifica cada línea de error en una categoría automáticamente." — "Extrae todos los IDs de bench que aparecen en el log."</p></div>
    </div>
  </div>
<div class="code-block">
  <div class="code-lang">Python — re module: todos los métodos importantes</div>
  <pre><span class="c-kw">import</span> re

<span class="c-cm"># ── Los 4 métodos principales ────────────────────────────────────</span>
text = <span class="c-st">"2024-07-08 14:32:01 ERROR bench-a3 test_lidar FAILED in 2.34s"</span>

<span class="c-cm"># re.search() — encuentra PRIMERA coincidencia en cualquier posición</span>
m = re.search(<span class="c-st">r'(\d{4}-\d{2}-\d{2})'</span>, text)
<span class="c-bi">print</span>(m.group(<span class="c-nb">1</span>))  <span class="c-cm"># "2024-07-08"</span>

<span class="c-cm"># re.match() — solo busca al INICIO de la string (menos útil para logs)</span>

<span class="c-cm"># re.findall() — devuelve TODAS las coincidencias como lista de strings</span>
durations = re.findall(<span class="c-st">r'(\d+\.\d+)s'</span>, text)   <span class="c-cm"># ["2.34"]</span>

<span class="c-cm"># re.finditer() — devuelve iterator de Match objects (más eficiente)</span>
<span class="c-kw">for</span> m <span class="c-kw">in</span> re.finditer(<span class="c-st">r'bench-(\w+)'</span>, text):
    <span class="c-bi">print</span>(m.group(<span class="c-nb">1</span>))   <span class="c-cm"># "a3"</span>

<span class="c-cm"># re.sub() — reemplaza coincidencias</span>
clean = re.sub(<span class="c-st">r'\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} '</span>, <span class="c-st">''</span>, text)
<span class="c-cm"># "ERROR bench-a3 test_lidar FAILED in 2.34s"</span></pre>
</div>
<div class="code-block">
  <div class="code-lang">Python — Parser completo de logs de CI</div>
  <pre><span class="c-kw">import</span> re
<span class="c-kw">from</span> dataclasses <span class="c-kw">import</span> dataclass
<span class="c-kw">from</span> typing <span class="c-kw">import</span> Optional

<span class="c-dc">@dataclass</span>
<span class="c-kw">class</span> <span class="c-fn">TestResult</span>:
    timestamp: str
    bench: str
    test_name: str
    status: str          <span class="c-cm"># PASSED | FAILED | ERROR</span>
    duration_s: <span class="c-bi">float</span>
    error_msg: Optional[str] = <span class="c-kw">None</span>

<span class="c-cm"># Compila el patrón una vez (más eficiente si procesas muchas líneas)</span>
LOG_PATTERN = re.compile(
    <span class="c-st">r'(?P&lt;ts&gt;\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\s+'</span>
    <span class="c-st">r'(?P&lt;bench&gt;bench-\w+)\s+'</span>
    <span class="c-st">r'(?P&lt;test&gt;\w+)\s+'</span>
    <span class="c-st">r'(?P&lt;status&gt;PASSED|FAILED|ERROR)\s+'</span>
    <span class="c-st">r'in\s+(?P&lt;dur&gt;\d+\.\d+)s'</span>
    <span class="c-st">r'(?:\s+\[(?P&lt;err&gt;[^\]]+)\])?'</span>  <span class="c-cm"># mensaje de error opcional</span>
)

<span class="c-kw">def</span> <span class="c-fn">parse_ci_log</span>(log_path: str) -&gt; <span class="c-bi">list</span>[TestResult]:
    results = []
    <span class="c-kw">with</span> <span class="c-bi">open</span>(log_path) <span class="c-kw">as</span> f:
        <span class="c-kw">for</span> line <span class="c-kw">in</span> f:
            m = LOG_PATTERN.search(line)
            <span class="c-kw">if</span> m:
                results.append(TestResult(
                    timestamp  = m.group(<span class="c-st">'ts'</span>),
                    bench      = m.group(<span class="c-st">'bench'</span>),
                    test_name  = m.group(<span class="c-st">'test'</span>),
                    status     = m.group(<span class="c-st">'status'</span>),
                    duration_s = <span class="c-bi">float</span>(m.group(<span class="c-st">'dur'</span>)),
                    error_msg  = m.group(<span class="c-st">'err'</span>),
                ))
    <span class="c-kw">return</span> results

<span class="c-cm"># ── Named groups (?P&lt;name&gt;...) hacen el código más legible ───────</span>
<span class="c-cm"># Accedes con m.group('name') en vez de m.group(1), m.group(2)...</span></pre>
</div>
<div class="quiz-section">
  <div class="quiz-title">Problema de práctica</div>
  <div class="quiz-card">
    <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Practica</span>"Extrae todos los IPs únicos que aparecen en un log de acceso"<span class="q-arr">▶</span></div>
    <div class="quiz-a">
<b>re.findall + set:</b><br>
<code>import re<br>def unique_ips(log_text):<br>&nbsp;&nbsp;&nbsp;&nbsp;ip_pattern = r'\b(?:\d{1,3}\.){3}\d{1,3}\b'<br>&nbsp;&nbsp;&nbsp;&nbsp;return set(re.findall(ip_pattern, log_text))</code><br><br>
<b>El patrón:</b> <code>\b</code> = word boundary. <code>(?:\d{1,3}\.){3}</code> = tres grupos de 1-3 dígitos + punto. <code>\d{1,3}</code> = último octeto. El <code>set()</code> deduplicación automática O(n).
    </div>
  </div>
</div>
<div class="plan-card" style="margin-top:8px;border-left-color:#F59E0B">
  <div class="plan-card-title" style="color:#D97706;">⚠️ Trampas comunes — Strings & Regex</div>
  <div class="plan-block">
    <div class="plan-time">Error #1</div>
    <div class="plan-content">
      <h4>Compilar el pattern dentro del loop → lento</h4>
      <p><code>re.compile(pattern)</code> convierte el string en un automáta finito. Si lo llamas dentro de un loop de N líneas, lo compilas N veces. <b>Compila FUERA del loop, una sola vez.</b> Python tiene un cache de compilación, pero si el pattern varía o el cache se llena, pagas el costo repetidamente.</p>
      <div class="code-block"><div class="code-lang">❌ Lento vs ✓ Correcto</div><pre>
# ❌ Compila en cada iteración
for line in log_lines:
    m = re.search(r'\d{4}-\d{2}-\d{2}', line)

# ✓ Compila una vez
DATE_PATTERN = re.compile(r'\d{4}-\d{2}-\d{2}')
for line in log_lines:
    m = DATE_PATTERN.search(line)</pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Error #2</div>
    <div class="plan-content">
      <h4>re.match vs re.search — diferencia crítica</h4>
      <p><code>re.match()</code> solo busca al INICIO de la string. <code>re.search()</code> busca en cualquier posición. Para logs, casi siempre quieres <code>re.search()</code> porque el patrón puede aparecer en cualquier parte de la línea. <code>re.match()</code> es útil cuando el formato garantiza que el patrón está al principio (como timestamps).</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Error #3</div>
    <div class="plan-content">
      <h4>Greedy vs Non-greedy (.* vs .*?)</h4>
      <p><code>.*</code> es greedy — captura lo más posible. <code>.*?</code> es non-greedy — captura lo mínimo posible. Ejemplo: en <code>"[stage1] ... [stage2]"</code>, el patrón <code>\[.*\]</code> captura <code>[stage1] ... [stage2]</code> (todo). El patrón <code>\[.*?\]</code> captura <code>[stage1]</code> (hasta el primer cierre).<br><br>
      <b>Regla:</b> entre delimitadores conocidos, usa non-greedy <code>.*?</code>. Fuera de delimitadores, greedy <code>.*</code> suele ser lo esperado.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Regex cheatsheet para logs de CI</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Patrones más usados para logs de Wayve / CI</div><pre>
import re

# Timestamp ISO 8601
ts    = r'\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}'
# Duración (42.3s o 42s)
dur   = r'(\d+(?:\.\d+)?)s'
# Bench ID (bench-a3, bench-B12, dv-042)
bench = r'(?:bench|dv)-(\w+)'
# Error level
level = r'(?:ERROR|WARN|INFO|DEBUG|CRITICAL|FAIL)'
# Test name (snake_case o CamelCase)
test  = r'test_\w+|Test\w+'
# IP address
ip    = r'\b(?:\d{1,3}\.){3}\d{1,3}\b'
# Hex number (memory addresses, CAN IDs)
hexn  = r'0x[0-9a-fA-F]+'
# Python traceback start
trace = r'^Traceback \(most recent call last\):'

# Patrón completo para línea de test result:
LOG_LINE = re.compile(
    rf'(?P&lt;ts&gt;{ts})\s+(?P&lt;level&gt;{level})\s+'
    rf'(?P&lt;bench&gt;{bench})\s+(?P&lt;test&gt;{test})\s+'
    rf'in\s+{dur}'
)</pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Tips de entrevista</div>
    <div class="plan-content">
      <p><em>"I'll compile the regex pattern outside the loop for efficiency — this compiles the finite automaton once and reuses it across all lines."</em><br><br>
      <em>"I'm using named groups (?P&lt;name&gt;...) instead of positional groups. It makes the code self-documenting — m.group('timestamp') is clearer than m.group(1)."</em><br><br>
      <em>"re.search finds the first match anywhere in the string, which is what I want for log parsing. re.match would only check the start of the string."</em></p>
    </div>
  </div>
</div>
  </div><!-- end al-re -->

</div><!-- end tab-group-algo -->
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis soluciones propias</div>
  <p class="notes-placeholder">Practica cada algoritmo escribiendo la solución de memoria antes de la entrevista. Sin mirar el código de arriba.</p>
</div>`,

'wayve-algo-advanced': `
<div class="alert-card">
  🔥 <strong>3 patrones avanzados</strong> — menos frecuentes que los 9 base pero completamente posibles en nivel senior. Cada uno tiene template de memoria + ejemplo Wayve + problema de práctica.
</div>

<div class="tab-group-algoadv">
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this,'adv-1','algoadv')">📐 Intervals</button>
    <button class="tab-btn" onclick="switchTab(this,'adv-2','algoadv')">📈 DP / Kadane</button>
    <button class="tab-btn" onclick="switchTab(this,'adv-3','algoadv')">📊 Topological Sort</button>
  </div>

  <!-- ════ INTERVALS ════ -->
  <div id="adv-1" class="tab-panel active">
    <div class="plan-card">
      <div class="plan-card-title">📐 Intervals — Merge, Insert, Sweep</div>
      <div class="plan-block">
        <div class="plan-time">¿Cuándo?</div>
        <div class="plan-content">
          <h4>Palabras clave en el problema</h4>
          <div class="p-chips">
            <span class="p-chip">intervals / ranges</span><span class="p-chip">overlapping</span>
            <span class="p-chip">merge sessions</span><span class="p-chip">total time covered</span>
            <span class="p-chip">meeting rooms</span><span class="p-chip">insert new interval</span>
          </div>
          <p style="margin-top:8px"><b>Idea central:</b> Ordena por start. Luego una sola pasada: si el nuevo interval solapa con el último merged, extiende el end. Si no, agrega nuevo.</p>
        </div>
      </div>
    </div>
<div class="code-block"><div class="code-lang">Python — Merge Intervals + variantes completas</div><pre>
<span class="c-kw">from</span> typing <span class="c-kw">import</span> List

<span class="c-cm"># ── MERGE INTERVALS — O(n log n) ────────────────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">merge</span>(intervals: List[List[<span class="c-bi">int</span>]]) -&gt; List[List[<span class="c-bi">int</span>]]:
    <span class="c-kw">if not</span> intervals: <span class="c-kw">return</span> []
    intervals.sort(key=<span class="c-kw">lambda</span> x: x[<span class="c-nb">0</span>])   <span class="c-cm"># 1. ordenar por start</span>
    merged = [intervals[<span class="c-nb">0</span>]]
    <span class="c-kw">for</span> start, end <span class="c-kw">in</span> intervals[<span class="c-nb">1</span>:]:
        <span class="c-kw">if</span> start &lt;= merged[-<span class="c-nb">1</span>][<span class="c-nb">1</span>]:           <span class="c-cm"># 2. ¿solapa?</span>
            merged[-<span class="c-nb">1</span>][<span class="c-nb">1</span>] = <span class="c-bi">max</span>(merged[-<span class="c-nb">1</span>][<span class="c-nb">1</span>], end)  <span class="c-cm"># 3. extender</span>
        <span class="c-kw">else</span>:
            merged.append([start, end])   <span class="c-cm"># 4. no solapa → nuevo</span>
    <span class="c-kw">return</span> merged

<span class="c-cm"># ── TOTAL DURATION — tiempo total cubierto ───────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">total_coverage</span>(intervals):
    <span class="c-kw">return</span> <span class="c-bi">sum</span>(e - s <span class="c-kw">for</span> s, e <span class="c-kw">in</span> merge(intervals))

<span class="c-cm"># ── INSERT INTERVAL — O(n) ──────────────────────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">insert</span>(intervals: List[List[<span class="c-bi">int</span>]], new: List[<span class="c-bi">int</span>]) -&gt; List[List[<span class="c-bi">int</span>]]:
    result = []
    i = <span class="c-nb">0</span>
    <span class="c-cm"># 1. Agregar todos los que terminan ANTES del nuevo</span>
    <span class="c-kw">while</span> i &lt; <span class="c-bi">len</span>(intervals) <span class="c-kw">and</span> intervals[i][<span class="c-nb">1</span>] &lt; new[<span class="c-nb">0</span>]:
        result.append(intervals[i]); i += <span class="c-nb">1</span>
    <span class="c-cm"># 2. Merge todos los que solapan con new</span>
    <span class="c-kw">while</span> i &lt; <span class="c-bi">len</span>(intervals) <span class="c-kw">and</span> intervals[i][<span class="c-nb">0</span>] &lt;= new[<span class="c-nb">1</span>]:
        new[<span class="c-nb">0</span>] = <span class="c-bi">min</span>(new[<span class="c-nb">0</span>], intervals[i][<span class="c-nb">0</span>])
        new[<span class="c-nb">1</span>] = <span class="c-bi">max</span>(new[<span class="c-nb">1</span>], intervals[i][<span class="c-nb">1</span>]); i += <span class="c-nb">1</span>
    result.append(new)
    <span class="c-cm"># 3. Agregar el resto sin solapamiento</span>
    result.extend(intervals[i:])
    <span class="c-kw">return</span> result

<span class="c-cm"># ── MEETING ROOMS — mínimo número de salas ──────────────────────</span>
<span class="c-kw">import</span> heapq
<span class="c-kw">def</span> <span class="c-fn">min_meeting_rooms</span>(intervals):
    intervals.sort()
    heap = []           <span class="c-cm"># min-heap de end times</span>
    <span class="c-kw">for</span> start, end <span class="c-kw">in</span> intervals:
        <span class="c-kw">if</span> heap <span class="c-kw">and</span> heap[<span class="c-nb">0</span>] &lt;= start:
            heapq.heapreplace(heap, end)  <span class="c-cm"># reusar sala</span>
        <span class="c-kw">else</span>:
            heapq.heappush(heap, end)     <span class="c-cm"># nueva sala</span>
    <span class="c-kw">return</span> <span class="c-bi">len</span>(heap)

<span class="c-cm"># Wayve: "mínimo de benches HIL simultáneos para cubrir todos los tests"</span></pre></div>

    <div class="quiz-section" style="margin-top:12px">
      <div class="quiz-title">Practica</div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Intervals</span>"Drive sessions: [[0,60],[30,90],[120,180]]. Total unique recording time?"<span class="q-arr">▶</span></div>
        <div class="quiz-a"><b>Respuesta: 120 minutos.</b><br>merge([[0,60],[30,90],[120,180]]) → [[0,90],[120,180]]<br>total = (90-0) + (180-120) = 90 + 60 = 150... espera, recuenta: (90-0)=90, (180-120)=60, total=150.<br>Si [[0,60],[30,90]] → merge → [[0,90]], total 90. Luego [120,180] → no solapa → [[0,90],[120,180]], total 150.</div>
      </div>
    </div>
  </div>

  <!-- ════ DP / KADANE ════ -->
  <div id="adv-2" class="tab-panel">
    <div class="plan-card">
      <div class="plan-card-title">📈 Dynamic Programming — Kadane's + 1D DP</div>
      <div class="plan-block">
        <div class="plan-time">¿Cuándo?</div>
        <div class="plan-content">
          <div class="p-chips">
            <span class="p-chip">máximo / mínimo subarray sum</span>
            <span class="p-chip">secuencia más larga válida</span>
            <span class="p-chip">memoization</span>
            <span class="p-chip">"optimal substructure"</span>
          </div>
          <p style="margin-top:8px"><b>Idea Kadane:</b> Para cada elemento decide: ¿es mejor empezar un nuevo subarray aquí, o extender el anterior? <code>cur = max(num, cur + num)</code></p>
        </div>
      </div>
    </div>
<div class="code-block"><div class="code-lang">Python — Kadane + variantes DP</div><pre>
<span class="c-cm"># ── KADANE — Maximum Subarray Sum ──────────────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">max_subarray</span>(nums: List[<span class="c-bi">int</span>]) -&gt; <span class="c-bi">int</span>:
    cur = best = nums[<span class="c-nb">0</span>]
    <span class="c-kw">for</span> n <span class="c-kw">in</span> nums[<span class="c-nb">1</span>:]:
        cur = <span class="c-bi">max</span>(n, cur + n)     <span class="c-cm"># empezar aquí vs extender</span>
        best = <span class="c-bi">max</span>(best, cur)
    <span class="c-kw">return</span> best
<span class="c-cm"># O(n) time, O(1) space</span>

<span class="c-cm"># ── KADANE con índices — devuelve el rango ──────────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">max_subarray_range</span>(nums):
    cur = best = nums[<span class="c-nb">0</span>]
    start = end = best_start = <span class="c-nb">0</span>
    <span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">1</span>, <span class="c-bi">len</span>(nums)):
        <span class="c-kw">if</span> cur + nums[i] &lt; nums[i]:   <span class="c-cm"># empezar de nuevo</span>
            cur = nums[i]; start = i
        <span class="c-kw">else</span>:
            cur += nums[i]
        <span class="c-kw">if</span> cur &gt; best:
            best = cur; best_start = start; end = i
    <span class="c-kw">return</span> best, best_start, end

<span class="c-cm"># Wayve: "find the hour with highest total sensor quality score"</span>
<span class="c-cm"># scores = [0.9, -0.1, 0.8, -0.9, 0.7, 0.8]</span>
<span class="c-cm"># max_subarray(scores) → encuentra el mejor periodo continuo</span>

<span class="c-cm"># ── LONGEST INCREASING SUBSEQUENCE — O(n log n) ─────────────────</span>
<span class="c-kw">def</span> <span class="c-fn">lis_length</span>(nums: List[<span class="c-bi">int</span>]) -&gt; <span class="c-bi">int</span>:
    tails = []
    <span class="c-kw">for</span> n <span class="c-kw">in</span> nums:
        pos = bisect.bisect_left(tails, n)
        <span class="c-kw">if</span> pos == <span class="c-bi">len</span>(tails): tails.append(n)
        <span class="c-kw">else</span>: tails[pos] = n
    <span class="c-kw">return</span> <span class="c-bi">len</span>(tails)

<span class="c-cm"># ── MEMOIZATION TEMPLATE — top-down DP ─────────────────────────</span>
<span class="c-kw">from</span> functools <span class="c-kw">import</span> lru_cache

<span class="c-cm">@lru_cache</span>(maxsize=<span class="c-kw">None</span>)
<span class="c-kw">def</span> <span class="c-fn">dp</span>(i, state):
    <span class="c-kw">if</span> i == base_case: <span class="c-kw">return</span> base_value
    <span class="c-kw">return</span> <span class="c-bi">max</span>(dp(i-<span class="c-nb">1</span>, ...), dp(i-<span class="c-nb">2</span>, ...))
<span class="c-cm"># @lru_cache convierte recursión en DP automáticamente</span></pre></div>

    <div class="quiz-section" style="margin-top:12px">
      <div class="quiz-title">Practica</div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">DP</span>"health = [1,1,0,1,1,1,0,1]. Longest contiguous healthy window?"<span class="q-arr">▶</span></div>
        <div class="quiz-a"><b>Respuesta: 3 (índices 3-5, los tres 1s consecutivos).</b><br>Aplica Kadane sobre los 1s: cuando ves 0, el streak se reinicia a 0. Cuando ves 1, increment.<br>max_streak = 0, cur = 0<br>i=0: cur=1, max=1. i=1: cur=2, max=2. i=2: cur=0 (reset). i=3: cur=1. i=4: cur=2. i=5: cur=3, max=3. i=6: cur=0. i=7: cur=1.<br>Respuesta: 3</div>
      </div>
    </div>
  </div>

  <!-- ════ TOPOLOGICAL SORT ════ -->
  <div id="adv-3" class="tab-panel">
    <div class="plan-card">
      <div class="plan-card-title">📊 Topological Sort — Kahn's Algorithm</div>
      <div class="plan-block">
        <div class="plan-time">¿Cuándo?</div>
        <div class="plan-content">
          <div class="p-chips">
            <span class="p-chip">orden de dependencias</span><span class="p-chip">prerequisites</span>
            <span class="p-chip">tasks before other tasks</span><span class="p-chip">detect cycle in DAG</span>
            <span class="p-chip">CI execution order</span>
          </div>
          <p style="margin-top:8px"><b>Idea:</b> Los nodos con in-degree 0 pueden ejecutarse primero (no tienen dependencias). Procesarlos reduce el in-degree de sus vecinos. Repetir.</p>
        </div>
      </div>
    </div>
<div class="code-block"><div class="code-lang">Python — Topological Sort (Kahn's) completo</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> defaultdict, deque
<span class="c-kw">from</span> typing <span class="c-kw">import</span> Dict, List, Optional

<span class="c-kw">def</span> <span class="c-fn">topological_sort</span>(
    nodes: List[str],
    deps: Dict[str, List[str]]   <span class="c-cm"># deps[A] = [B] → B debe ir ANTES que A</span>
) -&gt; Optional[List[str]]:
    <span class="c-st">"""
    Returns: valid execution order, or None if cycle detected.
    Time: O(V+E)  Space: O(V+E)
    """</span>
    <span class="c-cm"># 1. Construir grafo y calcular in-degrees</span>
    in_degree = {n: <span class="c-nb">0</span> <span class="c-kw">for</span> n <span class="c-kw">in</span> nodes}
    adj = defaultdict(<span class="c-bi">list</span>)    <span class="c-cm"># adj[A] = [C, D] → A debe ir ANTES que C, D</span>

    <span class="c-kw">for</span> node, prerequisites <span class="c-kw">in</span> deps.items():
        <span class="c-kw">for</span> prereq <span class="c-kw">in</span> prerequisites:
            adj[prereq].append(node)
            in_degree[node] += <span class="c-nb">1</span>

    <span class="c-cm"># 2. Queue con nodos sin dependencias (in_degree == 0)</span>
    queue = deque(n <span class="c-kw">for</span> n <span class="c-kw">in</span> nodes <span class="c-kw">if</span> in_degree[n] == <span class="c-nb">0</span>)
    order = []

    <span class="c-cm"># 3. Procesar</span>
    <span class="c-kw">while</span> queue:
        node = queue.popleft()
        order.append(node)
        <span class="c-kw">for</span> neighbor <span class="c-kw">in</span> adj[node]:
            in_degree[neighbor] -= <span class="c-nb">1</span>
            <span class="c-kw">if</span> in_degree[neighbor] == <span class="c-nb">0</span>:
                queue.append(neighbor)

    <span class="c-cm"># 4. Si no procesamos todos → hay un ciclo</span>
    <span class="c-kw">return</span> order <span class="c-kw">if</span> <span class="c-bi">len</span>(order) == <span class="c-bi">len</span>(nodes) <span class="c-kw">else None</span>

<span class="c-cm"># ── Ejemplo Wayve: orden de ejecución de tests CI ───────────────</span>
nodes = [<span class="c-st">"build"</span>, <span class="c-st">"unit"</span>, <span class="c-st">"integration"</span>, <span class="c-st">"hil"</span>, <span class="c-st">"validate_mcap"</span>]
deps = {
    <span class="c-st">"unit"</span>:         [<span class="c-st">"build"</span>],
    <span class="c-st">"integration"</span>:  [<span class="c-st">"unit"</span>],
    <span class="c-st">"hil"</span>:          [<span class="c-st">"build"</span>],
    <span class="c-st">"validate_mcap"</span>:[<span class="c-st">"hil"</span>, <span class="c-st">"integration"</span>],
}
print(topological_sort(nodes, deps))
<span class="c-cm"># → ["build", "unit", "hil", "integration", "validate_mcap"]</span>
<span class="c-cm"># (unit y hil pueden ir en cualquier orden entre ellos)</span>

<span class="c-cm"># ── Detectar ciclo ───────────────────────────────────────────────</span>
cyclic_deps = {<span class="c-st">"A"</span>: [<span class="c-st">"B"</span>], <span class="c-st">"B"</span>: [<span class="c-st">"A"</span>]}  <span class="c-cm"># A depende de B y B de A</span>
print(topological_sort([<span class="c-st">"A"</span>, <span class="c-st">"B"</span>], cyclic_deps))  <span class="c-cm"># → None</span></pre></div>

    <div class="quiz-section" style="margin-top:12px">
      <div class="quiz-title">Practica</div>
      <div class="quiz-card">
        <div class="quiz-q" onclick="toggleQuiz(this)"><span class="q-tag">Topo Sort</span>"Tests: A→B→C, A→D→C. ¿Cuál es el orden mínimo posible?"<span class="q-arr">▶</span></div>
        <div class="quiz-a"><b>Respuesta: A, B, D, C (o A, D, B, C).</b><br>A tiene in-degree 0 → va primero.<br>Después de A: B y D tienen in-degree 0 → pueden ir en cualquier orden.<br>C tiene in-degree 2 (depende de B y D) → va último.<br>Orden válido 1: [A, B, D, C] ✓<br>Orden válido 2: [A, D, B, C] ✓<br>Ambos son correctos.</div>
      </div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas sobre patrones avanzados</div>
  <p class="notes-placeholder">De estos 3, el más probable en tu entrevista es Intervals (merge sessions). Practica merge() de memoria en 10 minutos...</p>
</div>`,

'wayve-python-challenge': `
<div class="plan-card">
  <div class="plan-card-title">💻 Coding Challenges — Lo que probablemente preguntarán</div>
  <div class="plan-block">
    <div class="plan-time">Challenge 1 (más probable)</div>
    <div class="plan-content">
      <h4>"Detect gaps in sensor data"</h4>
      <p><b>Enunciado típico:</b> "Given a list of (timestamp_ms, sensor_id) events, find all gaps greater than 200ms for each sensor and return a summary."</p>
      <div class="code-block"><div class="code-lang">Python — Solución completa y elegante</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> defaultdict
<span class="c-kw">from</span> typing <span class="c-kw">import</span> List, Tuple, Dict

<span class="c-kw">def</span> <span class="c-fn">find_sensor_gaps</span>(
    events: List[Tuple[<span class="c-bi">int</span>, <span class="c-bi">str</span>]],
    threshold_ms: <span class="c-bi">int</span> = <span class="c-nb">200</span>
) -&gt; Dict[<span class="c-bi">str</span>, List[dict]]:
    <span class="c-st">"""
    Find gaps in sensor data streams.
    Args:
        events: List of (timestamp_ms, sensor_id) sorted by time
        threshold_ms: Gap threshold in milliseconds
    Returns:
        Dict of sensor_id → list of gap info dicts
    """</span>
    <span class="c-cm"># Group timestamps by sensor</span>
    by_sensor = defaultdict(list)
    <span class="c-kw">for</span> ts, sensor_id <span class="c-kw">in</span> events:
        by_sensor[sensor_id].append(ts)

    gaps = {}
    <span class="c-kw">for</span> sensor_id, timestamps <span class="c-kw">in</span> by_sensor.items():
        sensor_gaps = []
        <span class="c-cm"># Assume already sorted; sort if not guaranteed</span>
        sorted_ts = <span class="c-bi">sorted</span>(timestamps)
        <span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">1</span>, <span class="c-bi">len</span>(sorted_ts)):
            diff = sorted_ts[i] - sorted_ts[i-<span class="c-nb">1</span>]
            <span class="c-kw">if</span> diff &gt; threshold_ms:
                sensor_gaps.append({
                    <span class="c-st">"start_ms"</span>: sorted_ts[i-<span class="c-nb">1</span>],
                    <span class="c-st">"end_ms"</span>: sorted_ts[i],
                    <span class="c-st">"gap_ms"</span>: diff,
                })
        <span class="c-kw">if</span> sensor_gaps:
            gaps[sensor_id] = sensor_gaps
    <span class="c-kw">return</span> gaps

<span class="c-cm"># Test</span>
events = [
    (<span class="c-nb">0</span>, <span class="c-st">"camera"</span>), (<span class="c-nb">33</span>, <span class="c-st">"camera"</span>), (<span class="c-nb">66</span>, <span class="c-st">"camera"</span>), (<span class="c-nb">600</span>, <span class="c-st">"camera"</span>),
    (<span class="c-nb">0</span>, <span class="c-st">"lidar"</span>),  (<span class="c-nb">100</span>, <span class="c-st">"lidar"</span>),  (<span class="c-nb">200</span>, <span class="c-st">"lidar"</span>),
]
result = find_sensor_gaps(events, threshold_ms=<span class="c-nb">200</span>)
<span class="c-cm"># → {"camera": [{"start_ms": 66, "end_ms": 600, "gap_ms": 534}]}</span></pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Challenge 2</div>
    <div class="plan-content">
      <h4>"Top N error types from CI logs"</h4>
      <div class="code-block"><div class="code-lang">Python — Log analysis</div><pre>
<span class="c-kw">import</span> re
<span class="c-kw">from</span> collections <span class="c-kw">import</span> Counter
<span class="c-kw">from</span> typing <span class="c-kw">import</span> List, Tuple

<span class="c-kw">def</span> <span class="c-fn">top_errors</span>(log_lines: List[<span class="c-bi">str</span>], n: <span class="c-bi">int</span> = <span class="c-nb">3</span>) -&gt; List[Tuple[<span class="c-bi">str</span>, <span class="c-bi">int</span>]]:
    <span class="c-st">"""Return top N error types from CI log lines."""</span>
    <span class="c-cm"># Extract error codes like ERROR_CODE_123 or [ERROR] ConnectionTimeout</span>
    pattern = re.compile(<span class="c-st">r'(?:ERROR|FAIL|CRITICAL)\s+(\w+)'</span>)
    errors = Counter()
    <span class="c-kw">for</span> line <span class="c-kw">in</span> log_lines:
        match = pattern.search(line)
        <span class="c-kw">if</span> match:
            errors[match.group(<span class="c-nb">1</span>)] += <span class="c-nb">1</span>
    <span class="c-kw">return</span> errors.most_common(n)

<span class="c-cm"># Uso: top_errors(open("ci.log").readlines(), n=5)</span></pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Challenge 3</div>
    <div class="plan-content">
      <h4>"Sliding window — sensor frequency check"</h4>
      <div class="code-block"><div class="code-lang">Python — Sliding window frequency validation</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> deque

<span class="c-kw">def</span> <span class="c-fn">check_sensor_frequency</span>(
    timestamps_ms: List[<span class="c-bi">int</span>],
    expected_hz: <span class="c-bi">float</span>,
    window_ms: <span class="c-bi">int</span> = <span class="c-nb">1000</span>,
    tolerance: <span class="c-bi">float</span> = <span class="c-nb">0.2</span>
) -&gt; List[dict]:
    <span class="c-st">"""Detect windows where sensor frequency deviates by &gt;tolerance."""</span>
    expected_count = expected_hz * (window_ms / <span class="c-nb">1000</span>)
    low = expected_count * (<span class="c-nb">1</span> - tolerance)
    high = expected_count * (<span class="c-nb">1</span> + tolerance)
    issues = []
    window = deque()

    <span class="c-kw">for</span> ts <span class="c-kw">in</span> timestamps_ms:
        window.append(ts)
        <span class="c-cm"># Evict old timestamps outside the window</span>
        <span class="c-kw">while</span> window[<span class="c-nb">0</span>] &lt; ts - window_ms:
            window.popleft()
        count = <span class="c-bi">len</span>(window)
        <span class="c-kw">if</span> count &lt; low <span class="c-kw">or</span> count &gt; high:
            issues.append({
                <span class="c-st">"window_end_ms"</span>: ts,
                <span class="c-st">"actual_count"</span>: count,
                <span class="c-st">"expected"</span>: expected_count
            })
    <span class="c-kw">return</span> issues</pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Cómo explicar en voz alta</div>
    <div class="plan-content">
      <h4>El approach que muestras al entrevistador</h4>
      <p>En inglés, sigue este script:<br>
      1. <em>"Let me make sure I understand the problem — [restate it]."</em><br>
      2. <em>"My first thought is [approach]. The time complexity would be O(n) because…"</em><br>
      3. <em>"Let me start with a naive solution and optimize if needed."</em><br>
      4. Escribe código. Habla mientras lo haces.<br>
      5. <em>"Let me trace through an example to verify… [trace con los datos de ejemplo]"</em><br>
      6. <em>"Edge cases I should consider: empty input, single event, all events in one second…"</em></p>
    </div>
  </div>
</div>

<!-- ══ CH-EXTRA 1: ANOMALY DETECTION ══ -->
<div class="plan-card" style="margin-top:16px">
  <div class="plan-card-title">🚨 Ch-Extra 1: Anomaly Detection en sensor stream (Z-Score)</div>
  <div class="plan-block">
    <div class="plan-time">Enunciado</div>
    <div class="plan-content">
      <h4>"Detect anomalous sensor readings using a rolling Z-score"</h4>
      <p>Variante Wayve: <em>"Our LIDAR returns point-cloud density values per frame. Flag frames where the density deviates more than 2σ from the rolling mean of the last 30 frames. Return a list of (frame_idx, value, z_score) for anomalous frames."</em></p>
      <div class="p-chips">
        <span class="p-chip">Patrón: Sliding Window + estadística</span>
        <span class="p-chip">O(n) tiempo · O(k) espacio</span>
        <span class="p-chip">deque(maxlen=k)</span>
      </div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Solución O(n)</div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Python — Rolling Z-Score Anomaly Detector</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> deque
<span class="c-kw">from</span> typing <span class="c-kw">import</span> List, Tuple
<span class="c-kw">import</span> statistics

<span class="c-kw">def</span> <span class="c-fn">detect_anomalies</span>(
    values: List[<span class="c-bi">float</span>],
    window: <span class="c-bi">int</span> = <span class="c-nb">30</span>,
    threshold: <span class="c-bi">float</span> = <span class="c-nb">2.0</span>
) -&gt; List[Tuple[<span class="c-bi">int</span>, <span class="c-bi">float</span>, <span class="c-bi">float</span>]]:
    <span class="c-st">"""
    Detect anomalous frames using rolling Z-score.
    Returns: [(frame_idx, value, z_score), ...] for anomalies.
    Time: O(n) — deque maintains rolling window efficiently.
    Space: O(window) — only keep the last 'window' values.
    """</span>
    buf = deque(maxlen=window)   <span class="c-cm"># rolling window, auto-evicts oldest</span>
    anomalies = []

    <span class="c-kw">for</span> i, val <span class="c-kw">in</span> <span class="c-bi">enumerate</span>(values):
        buf.append(val)

        <span class="c-cm"># Need at least 2 points to compute stdev</span>
        <span class="c-kw">if</span> <span class="c-bi">len</span>(buf) &lt; <span class="c-nb">2</span>:
            <span class="c-kw">continue</span>

        mean  = statistics.mean(buf)
        stdev = statistics.stdev(buf)

        <span class="c-kw">if</span> stdev == <span class="c-nb">0</span>:
            <span class="c-kw">continue</span>   <span class="c-cm"># all values identical — no variance to detect</span>

        z = <span class="c-bi">abs</span>(val - mean) / stdev
        <span class="c-kw">if</span> z &gt; threshold:
            anomalies.append((i, val, <span class="c-bi">round</span>(z, <span class="c-nb">2</span>)))

    <span class="c-kw">return</span> anomalies

<span class="c-cm"># Test</span>
readings = [<span class="c-nb">50.1</span>, <span class="c-nb">50.3</span>, <span class="c-nb">49.8</span>, <span class="c-nb">50.2</span>, <span class="c-nb">50.0</span>, <span class="c-nb">120.5</span>, <span class="c-nb">50.1</span>, <span class="c-nb">49.9</span>]
print(detect_anomalies(readings, window=<span class="c-nb">5</span>, threshold=<span class="c-nb">2.0</span>))
<span class="c-cm"># → [(5, 120.5, 3.87)]  ← frame 5 es anómalo, z=3.87</span>

<span class="c-cm"># Variante sin statistics module (si el entrevistador dice "no imports"):</span>
<span class="c-kw">def</span> <span class="c-fn">z_score_manual</span>(buf, val):
    n = <span class="c-bi">len</span>(buf)
    <span class="c-kw">if</span> n &lt; <span class="c-nb">2</span>: <span class="c-kw">return</span> <span class="c-nb">0</span>
    mean = <span class="c-bi">sum</span>(buf) / n
    var  = <span class="c-bi">sum</span>((x - mean) ** <span class="c-nb">2</span> <span class="c-kw">for</span> x <span class="c-kw">in</span> buf) / (n - <span class="c-nb">1</span>)  <span class="c-cm"># sample variance</span>
    std  = var ** <span class="c-nb">0.5</span>
    <span class="c-kw">return</span> <span class="c-bi">abs</span>(val - mean) / std <span class="c-kw">if</span> std &gt; <span class="c-nb">0</span> <span class="c-kw">else</span> <span class="c-nb">0</span></pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Lo que dices</div>
    <div class="plan-content">
      <p><em>"I'll use a sliding window with a deque of max length 30. For each new value, I compute the rolling mean and standard deviation, then the Z-score. If Z &gt; 2, it's an anomaly. The deque handles the eviction automatically, so each frame is processed in O(1). Total O(n)."</em></p>
      <div class="p-chips"><span class="p-chip">Edge: stdev=0 → skip (evita división por cero)</span><span class="p-chip">Edge: window > n → funciona igual</span><span class="p-chip">Edge: all anomalies → no problem</span></div>
    </div>
  </div>
</div>

<!-- ══ CH-EXTRA 2: EVENT DEDUPLICATION ══ -->
<div class="plan-card" style="margin-top:16px">
  <div class="plan-card-title">🔄 Ch-Extra 2: Deduplicar eventos con tolerancia temporal</div>
  <div class="plan-block">
    <div class="plan-time">Enunciado</div>
    <div class="plan-content">
      <h4>"Remove near-duplicate events that occur within 100ms of each other"</h4>
      <p>Variante Wayve: <em>"Our offload pipeline sometimes sends the same event twice with a slight timestamp difference. Given a list of (timestamp_ms, event_id) events, remove duplicates where the same event_id appears within 100ms of a previous occurrence."</em></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Solución O(n)</div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Python — Event Deduplication with time tolerance</div><pre>
<span class="c-kw">from</span> typing <span class="c-kw">import</span> List, Tuple

<span class="c-kw">def</span> <span class="c-fn">dedup_events</span>(
    events: List[Tuple[<span class="c-bi">int</span>, str]],   <span class="c-cm"># [(timestamp_ms, event_id), ...]</span>
    tolerance_ms: <span class="c-bi">int</span> = <span class="c-nb">100</span>
) -&gt; List[Tuple[<span class="c-bi">int</span>, str]]:
    <span class="c-st">"""
    Remove near-duplicate events: same event_id within tolerance_ms.
    Keeps the FIRST occurrence, drops subsequent ones within the window.
    Input must be sorted by timestamp.
    Time: O(n)  Space: O(k) where k = unique event types
    """</span>
    last_seen: <span class="c-bi">dict</span>[str, <span class="c-bi">int</span>] = {}   <span class="c-cm"># event_id → last accepted timestamp</span>
    result = []

    <span class="c-kw">for</span> ts, event_id <span class="c-kw">in</span> events:
        <span class="c-kw">if</span> event_id <span class="c-kw">not in</span> last_seen:
            <span class="c-cm"># First occurrence — always keep</span>
            result.append((ts, event_id))
            last_seen[event_id] = ts
        <span class="c-kw">elif</span> ts - last_seen[event_id] &gt; tolerance_ms:
            <span class="c-cm"># More than tolerance ms since last accepted — keep</span>
            result.append((ts, event_id))
            last_seen[event_id] = ts
        <span class="c-cm"># else: within tolerance — duplicate, skip</span>

    <span class="c-kw">return</span> result

<span class="c-cm"># Test</span>
events = [
    (<span class="c-nb">1000</span>, <span class="c-st">"sensor_started"</span>),
    (<span class="c-nb">1050</span>, <span class="c-st">"sensor_started"</span>),  <span class="c-cm"># dup — dentro de 100ms</span>
    (<span class="c-nb">1200</span>, <span class="c-st">"sensor_started"</span>),  <span class="c-cm"># NO dup — 200ms después</span>
    (<span class="c-nb">1000</span>, <span class="c-st">"lidar_ready"</span>),
    (<span class="c-nb">1090</span>, <span class="c-st">"lidar_ready"</span>),    <span class="c-cm"># dup — dentro de 100ms</span>
]
print(dedup_events(events, tolerance_ms=<span class="c-nb">100</span>))
<span class="c-cm"># → [(1000,"sensor_started"), (1200,"sensor_started"), (1000,"lidar_ready")]</span>

<span class="c-cm"># Variante: dedup por contenido (no solo event_id), ignora timestamp</span>
<span class="c-kw">def</span> <span class="c-fn">dedup_by_content</span>(events, key_fn=<span class="c-kw">lambda</span> e: e[<span class="c-nb">1</span>], tolerance_ms=<span class="c-nb">100</span>):
    <span class="c-st">"""key_fn define qué hace a dos eventos 'iguales'."""</span>
    last_seen = {}
    <span class="c-kw">return</span> [
        e <span class="c-kw">for</span> e <span class="c-kw">in</span> events
        <span class="c-kw">if</span> (k := key_fn(e)) <span class="c-kw">not in</span> last_seen
        <span class="c-kw">or</span> e[<span class="c-nb">0</span>] - last_seen.setdefault(k, e[<span class="c-nb">0</span>]) &gt; tolerance_ms
        <span class="c-kw">or</span> last_seen.update({k: e[<span class="c-nb">0</span>]}) <span class="c-kw">is None</span>   <span class="c-cm"># update trick</span>
    ]</pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Lo que dices</div>
    <div class="plan-content">
      <p><em>"I'll keep a HashMap of event_id to the last accepted timestamp. For each event, if we haven't seen this event_id before, or more than tolerance milliseconds have passed since the last accepted occurrence, we keep it. Otherwise it's a duplicate and we skip. O(n) time, O(k) space where k is the number of unique event types."</em></p>
    </div>
  </div>
</div>

<!-- ══ CH-EXTRA 3: RATE LIMITER / THROTTLE CHECKER ══ -->
<div class="plan-card" style="margin-top:16px">
  <div class="plan-card-title">⏱️ Ch-Extra 3: Rate Limiter — Sliding Window Counter</div>
  <div class="plan-block">
    <div class="plan-time">Enunciado</div>
    <div class="plan-content">
      <h4>"Implement a rate limiter: max N requests per minute per source"</h4>
      <p>Variante Wayve: <em>"Our offload pipeline throttles uploads: max 10 uploads per minute per vehicle. Given a stream of (timestamp_sec, vehicle_id) upload events, return the events that should be REJECTED because they exceed the limit."</em></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Solución O(n)</div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Python — Sliding Window Rate Limiter</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> defaultdict, deque
<span class="c-kw">from</span> typing <span class="c-kw">import</span> List, Tuple

<span class="c-kw">def</span> <span class="c-fn">rate_limit_check</span>(
    events: List[Tuple[<span class="c-bi">float</span>, str]],  <span class="c-cm"># [(timestamp_sec, vehicle_id)]</span>
    max_per_window: <span class="c-bi">int</span> = <span class="c-nb">10</span>,
    window_sec: <span class="c-bi">float</span> = <span class="c-nb">60.0</span>
) -&gt; List[Tuple[<span class="c-bi">float</span>, str, str]]:
    <span class="c-st">"""
    Returns list of (timestamp, vehicle_id, "ALLOWED"|"REJECTED").
    Uses sliding window per vehicle — O(n) time, O(v * max_per_window) space.
    Key insight: deque per vehicle tracks timestamps in the window.
    """</span>
    windows: <span class="c-bi">dict</span>[str, deque] = defaultdict(deque)
    results = []

    <span class="c-kw">for</span> ts, vid <span class="c-kw">in</span> events:
        win = windows[vid]

        <span class="c-cm"># Evict events older than the window</span>
        <span class="c-kw">while</span> win <span class="c-kw">and</span> ts - win[<span class="c-nb">0</span>] &gt;= window_sec:
            win.popleft()

        <span class="c-kw">if</span> <span class="c-bi">len</span>(win) &lt; max_per_window:
            win.append(ts)
            results.append((ts, vid, <span class="c-st">"ALLOWED"</span>))
        <span class="c-kw">else</span>:
            results.append((ts, vid, <span class="c-st">"REJECTED"</span>))  <span class="c-cm"># window is full</span>

    <span class="c-kw">return</span> results

<span class="c-cm"># Test</span>
uploads = [
    (<span class="c-nb">0</span>, <span class="c-st">"DV-01"</span>), (<span class="c-nb">5</span>, <span class="c-st">"DV-01"</span>), (<span class="c-nb">10</span>, <span class="c-st">"DV-01"</span>),   <span class="c-cm"># DV-01: 3 in 60s → ok</span>
    (<span class="c-nb">15</span>, <span class="c-st">"DV-02"</span>),                                <span class="c-cm"># DV-02: ok</span>
]
<span class="c-cm"># Con max=2: DV-01 event 3 → REJECTED</span>
print(rate_limit_check(uploads, max_per_window=<span class="c-nb">2</span>, window_sec=<span class="c-nb">60</span>))

<span class="c-cm"># Variante stateful (clase) — más realista:</span>
<span class="c-kw">class</span> <span class="c-fn">RateLimiter</span>:
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(self, max_calls: <span class="c-bi">int</span>, window_sec: <span class="c-bi">float</span>):
        self.max = max_calls
        self.win = window_sec
        self.history: <span class="c-bi">dict</span>[str, deque] = defaultdict(deque)

    <span class="c-kw">def</span> <span class="c-fn">is_allowed</span>(self, key: str, now: <span class="c-bi">float</span>) -&gt; <span class="c-bi">bool</span>:
        buf = self.history[key]
        <span class="c-kw">while</span> buf <span class="c-kw">and</span> now - buf[<span class="c-nb">0</span>] &gt;= self.win:
            buf.popleft()
        <span class="c-kw">if</span> <span class="c-bi">len</span>(buf) &lt; self.max:
            buf.append(now)
            <span class="c-kw">return True</span>
        <span class="c-kw">return False</span></pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Lo que dices</div>
    <div class="plan-content">
      <p><em>"This is a classic sliding window rate limiter. For each vehicle, I maintain a deque of accepted timestamps. When a new event arrives, I evict timestamps outside the window, then check if the count is under the limit. O(n) overall because each timestamp is added and removed from the deque at most once."</em></p>
      <div class="p-chips"><span class="p-chip">REJECTED no va al deque</span><span class="p-chip">window: &gt;= vs &gt;</span><span class="p-chip">Edge: simultaneous events (same ts)</span></div>
    </div>
  </div>
</div>

<!-- ══ CH-EXTRA 4: COMPLEX LOG PARSER ══ -->
<div class="plan-card" style="margin-top:16px">
  <div class="plan-card-title">📋 Ch-Extra 4: Complex Log Parser — CI pipeline analysis</div>
  <div class="plan-block">
    <div class="plan-time">Enunciado</div>
    <div class="plan-content">
      <h4>"Parse CI logs and generate a per-stage timing report"</h4>
      <p>Variante Wayve: <em>"Our Jenkins log has lines like '2024-07-08 14:32:01 [STAGE:flash_firmware] START' and '...END took 42.3s'. Parse the log and return a dict of stage → duration, and flag stages that exceeded a timeout threshold."</em></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Solución O(n)</div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Python — Multi-pattern Log Parser with dataclass output</div><pre>
<span class="c-kw">import</span> re
<span class="c-kw">from</span> dataclasses <span class="c-kw">import</span> dataclass, field
<span class="c-kw">from</span> typing <span class="c-kw">import</span> Dict, List, Optional

<span class="c-dc">@dataclass</span>
<span class="c-kw">class</span> <span class="c-fn">StageReport</span>:
    name:       str
    duration_s: <span class="c-bi">float</span>
    status:     str          <span class="c-cm"># "ok" | "timeout" | "failed"</span>
    start_ts:   Optional[str] = <span class="c-kw">None</span>

<span class="c-cm"># Compile patterns ONCE — not inside the loop</span>
_RE_START = re.compile(
    <span class="c-st">r'(?P&lt;ts&gt;\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\s+'</span>
    <span class="c-st">r'\[STAGE:(?P&lt;stage&gt;\w+)\] START'</span>
)
_RE_END = re.compile(
    <span class="c-st">r'\[STAGE:(?P&lt;stage&gt;\w+)\] END took (?P&lt;dur&gt;\d+\.\d+)s'</span>
    <span class="c-st">r'(?:\s+(?P&lt;result&gt;FAILED))?'</span>   <span class="c-cm"># optional FAILED marker</span>
)

<span class="c-kw">def</span> <span class="c-fn">parse_pipeline_log</span>(
    log_lines: List[str],
    timeout_s: <span class="c-bi">float</span> = <span class="c-nb">300.0</span>
) -&gt; Dict[str, StageReport]:
    <span class="c-st">"""
    Parse CI log lines and return per-stage timing.
    Handles out-of-order lines and missing END markers.
    """</span>
    in_progress: Dict[str, str] = {}   <span class="c-cm"># stage → start_ts</span>
    reports: Dict[str, StageReport] = {}

    <span class="c-kw">for</span> line <span class="c-kw">in</span> log_lines:
        m = _RE_START.search(line)
        <span class="c-kw">if</span> m:
            in_progress[m.group(<span class="c-st">'stage'</span>)] = m.group(<span class="c-st">'ts'</span>)
            <span class="c-kw">continue</span>

        m = _RE_END.search(line)
        <span class="c-kw">if</span> m:
            stage = m.group(<span class="c-st">'stage'</span>)
            dur   = <span class="c-bi">float</span>(m.group(<span class="c-st">'dur'</span>))
            failed = m.group(<span class="c-st">'result'</span>) == <span class="c-st">'FAILED'</span>

            status = <span class="c-st">"failed"</span> <span class="c-kw">if</span> failed <span class="c-kw">else</span> (<span class="c-st">"timeout"</span> <span class="c-kw">if</span> dur &gt; timeout_s <span class="c-kw">else</span> <span class="c-st">"ok"</span>)
            reports[stage] = StageReport(
                name=stage, duration_s=dur, status=status,
                start_ts=in_progress.pop(stage, <span class="c-kw">None</span>)
            )

    <span class="c-cm"># Stages that started but never ended = error in pipeline</span>
    <span class="c-kw">for</span> stage, ts <span class="c-kw">in</span> in_progress.items():
        reports[stage] = StageReport(name=stage, duration_s=-<span class="c-nb">1</span>, status=<span class="c-st">"no_end"</span>, start_ts=ts)

    <span class="c-kw">return</span> reports

<span class="c-cm"># Usage</span>
sample_log = [
    <span class="c-st">"2024-07-08 14:30:00 [STAGE:flash_firmware] START"</span>,
    <span class="c-st">"2024-07-08 14:30:45 [STAGE:flash_firmware] END took 45.1s"</span>,
    <span class="c-st">"2024-07-08 14:30:45 [STAGE:run_hil_tests] START"</span>,
    <span class="c-st">"2024-07-08 14:36:45 [STAGE:run_hil_tests] END took 360.0s FAILED"</span>,
]
result = parse_pipeline_log(sample_log, timeout_s=<span class="c-nb">300</span>)
<span class="c-cm"># flash_firmware → ok (45.1s), run_hil_tests → timeout+failed (360s)</span></pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Lo que dices</div>
    <div class="plan-content">
      <p><em>"I'll compile two regex patterns once outside the loop for efficiency. I track in-progress stages in a dict (stage → start_ts). On each END line, I compute the duration, compare against the timeout, and build a StageReport. After processing all lines, any stage still in in_progress never got an END — that's a crash or kill signal."</em></p>
      <div class="p-chips"><span class="p-chip">named groups → legible</span><span class="p-chip">compile fuera del loop</span><span class="p-chip">Edge: END sin START → pop retorna None</span></div>
    </div>
  </div>
</div>

<!-- ══ CH-EXTRA 5: PIPELINE HEALTH SCORE ══ -->
<div class="plan-card" style="margin-top:16px">
  <div class="plan-card-title">📊 Ch-Extra 5: Pipeline Health Aggregation</div>
  <div class="plan-block">
    <div class="plan-time">Enunciado</div>
    <div class="plan-content">
      <h4>"Compute a health score per bench across N builds"</h4>
      <p>Variante Wayve: <em>"Given a list of test results {'bench': 'A3', 'test': 'test_lidar', 'passed': True, 'duration_ms': 1200}, compute per bench: pass rate, mean duration, and list of top-3 failing tests."</em></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Solución O(n)</div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Python — Per-bench aggregation with dataclasses + defaultdict</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> defaultdict, Counter
<span class="c-kw">from</span> dataclasses <span class="c-kw">import</span> dataclass, field
<span class="c-kw">from</span> typing <span class="c-kw">import</span> List, Dict
<span class="c-kw">import</span> statistics

<span class="c-dc">@dataclass</span>
<span class="c-kw">class</span> <span class="c-fn">BenchHealth</span>:
    bench_id:     str
    total:        <span class="c-bi">int</span>        = <span class="c-nb">0</span>
    passed:       <span class="c-bi">int</span>        = <span class="c-nb">0</span>
    durations_ms: List[<span class="c-bi">float</span>] = field(default_factory=<span class="c-bi">list</span>)
    fail_counter: Counter     = field(default_factory=Counter)

    <span class="c-dc">@property</span>
    <span class="c-kw">def</span> <span class="c-fn">pass_rate</span>(self) -&gt; <span class="c-bi">float</span>:
        <span class="c-kw">return</span> self.passed / self.total <span class="c-kw">if</span> self.total &gt; <span class="c-nb">0</span> <span class="c-kw">else</span> <span class="c-nb">0.0</span>

    <span class="c-dc">@property</span>
    <span class="c-kw">def</span> <span class="c-fn">mean_duration_ms</span>(self) -&gt; <span class="c-bi">float</span>:
        <span class="c-kw">return</span> statistics.mean(self.durations_ms) <span class="c-kw">if</span> self.durations_ms <span class="c-kw">else</span> <span class="c-nb">0.0</span>

    <span class="c-kw">def</span> <span class="c-fn">top_failures</span>(self, n: <span class="c-bi">int</span> = <span class="c-nb">3</span>) -&gt; List[tuple]:
        <span class="c-kw">return</span> self.fail_counter.most_common(n)

<span class="c-kw">def</span> <span class="c-fn">compute_bench_health</span>(results: List[<span class="c-bi">dict</span>]) -&gt; Dict[str, BenchHealth]:
    <span class="c-st">"""
    O(n) time and space. Groups results by bench, accumulates stats.
    Uses @property for derived metrics — no storage of pre-computed values.
    """</span>
    benches: Dict[str, BenchHealth] = {}

    <span class="c-kw">for</span> r <span class="c-kw">in</span> results:
        bid = r[<span class="c-st">"bench"</span>]
        <span class="c-kw">if</span> bid <span class="c-kw">not in</span> benches:
            benches[bid] = BenchHealth(bench_id=bid)

        bh = benches[bid]
        bh.total += <span class="c-nb">1</span>
        bh.durations_ms.append(r[<span class="c-st">"duration_ms"</span>])

        <span class="c-kw">if</span> r[<span class="c-st">"passed"</span>]:
            bh.passed += <span class="c-nb">1</span>
        <span class="c-kw">else</span>:
            bh.fail_counter[r[<span class="c-st">"test"</span>]] += <span class="c-nb">1</span>

    <span class="c-kw">return</span> benches

<span class="c-cm"># Test</span>
data = [
    {<span class="c-st">"bench"</span>: <span class="c-st">"A3"</span>, <span class="c-st">"test"</span>: <span class="c-st">"test_lidar"</span>, <span class="c-st">"passed"</span>: <span class="c-kw">False</span>, <span class="c-st">"duration_ms"</span>: <span class="c-nb">1200</span>},
    {<span class="c-st">"bench"</span>: <span class="c-st">"A3"</span>, <span class="c-st">"test"</span>: <span class="c-st">"test_can"</span>,   <span class="c-st">"passed"</span>: <span class="c-kw">True</span>,  <span class="c-st">"duration_ms"</span>:  <span class="c-nb">800</span>},
    {<span class="c-st">"bench"</span>: <span class="c-st">"B1"</span>, <span class="c-st">"test"</span>: <span class="c-st">"test_imu"</span>,   <span class="c-st">"passed"</span>: <span class="c-kw">True</span>,  <span class="c-st">"duration_ms"</span>:  <span class="c-nb">500</span>},
]
h = compute_bench_health(data)
print(h[<span class="c-st">"A3"</span>].pass_rate)           <span class="c-cm"># 0.5</span>
print(h[<span class="c-st">"A3"</span>].top_failures())       <span class="c-cm"># [("test_lidar", 1)]</span>
print(h[<span class="c-st">"A3"</span>].mean_duration_ms)    <span class="c-cm"># 1000.0</span></pre></div>
    </div>
  </div>
</div>

<!-- ══ CH-EXTRA 6: SENSOR SYNC MATRIX ══ -->
<div class="plan-card" style="margin-top:16px">
  <div class="plan-card-title">🔗 Ch-Extra 6: Sensor Sync Matrix — ¿Todos los sensores sincronizados?</div>
  <div class="plan-block">
    <div class="plan-time">Enunciado</div>
    <div class="plan-content">
      <h4>"For each timestamp, report which sensors are NOT synced within 50ms"</h4>
      <p>Variante Wayve: <em>"Given N sensor streams (each with their own timestamps), for every 'reference' camera frame, report which other sensors have no reading within 50ms. Return a list of sync issues."</em></p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Solución O(n · S · log m)</div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Python — Multi-sensor sync check usando bisect</div><pre>
<span class="c-kw">import</span> bisect
<span class="c-kw">from</span> typing <span class="c-kw">import</span> Dict, List

<span class="c-kw">def</span> <span class="c-fn">check_sensor_sync</span>(
    reference_ts: List[<span class="c-bi">int</span>],             <span class="c-cm"># camera timestamps (sorted)</span>
    other_sensors: Dict[str, List[<span class="c-bi">int</span>]],  <span class="c-cm"># {"lidar": [...], "radar": [...]}</span>
    tolerance_ms: <span class="c-bi">int</span> = <span class="c-nb">50</span>
) -&gt; List[<span class="c-bi">dict</span>]:
    <span class="c-st">"""
    For each camera frame, check if other sensors have a reading within tolerance.
    Uses binary search (bisect) for O(log m) per lookup instead of linear scan.
    Time: O(n * S * log m)  where n=camera frames, S=sensors, m=readings per sensor
    Space: O(S) for result per frame
    """</span>
    issues = []

    <span class="c-kw">for</span> cam_ts <span class="c-kw">in</span> reference_ts:
        missing = []

        <span class="c-kw">for</span> sensor_name, sensor_timestamps <span class="c-kw">in</span> other_sensors.items():
            <span class="c-cm"># Binary search: first index >= cam_ts - tolerance</span>
            lo = bisect.bisect_left(sensor_timestamps, cam_ts - tolerance_ms)

            <span class="c-cm"># Check if any sensor reading is within [cam_ts - tol, cam_ts + tol]</span>
            found = (
                lo &lt; <span class="c-bi">len</span>(sensor_timestamps) <span class="c-kw">and</span>
                sensor_timestamps[lo] &lt;= cam_ts + tolerance_ms
            )

            <span class="c-kw">if not</span> found:
                missing.append(sensor_name)

        <span class="c-kw">if</span> missing:
            issues.append({
                <span class="c-st">"camera_ts"</span>: cam_ts,
                <span class="c-st">"missing_sensors"</span>: missing,
                <span class="c-st">"severity"</span>: <span class="c-st">"critical"</span> <span class="c-kw">if</span> <span class="c-st">"lidar"</span> <span class="c-kw">in</span> missing <span class="c-kw">else</span> <span class="c-st">"warning"</span>
            })

    <span class="c-kw">return</span> issues

<span class="c-cm"># Test</span>
cam = [<span class="c-nb">1000</span>, <span class="c-nb">1033</span>, <span class="c-nb">1066</span>, <span class="c-nb">1100</span>]
sensors = {
    <span class="c-st">"lidar"</span>: [<span class="c-nb">1000</span>, <span class="c-nb">1100</span>],           <span class="c-cm"># 10Hz — missing 1033 and 1066</span>
    <span class="c-st">"radar"</span>: [<span class="c-nb">1000</span>, <span class="c-nb">1050</span>, <span class="c-nb">1100</span>],    <span class="c-cm"># 20Hz — covers all</span>
}
issues = check_sensor_sync(cam, sensors, tolerance_ms=<span class="c-nb">50</span>)
<span class="c-cm"># → [{camera_ts:1033, missing:["lidar"],...}, {camera_ts:1066, missing:["lidar"],...}]</span></pre></div>
    </div>
  </div>
</div>

<!-- ══ FRASES EN INGLÉS ══ -->
<div class="plan-card" style="margin-top:16px; border-left-color: #22C55E;">
  <div class="plan-card-title" style="color:#16A34A;">🗣️ Frases exactas en inglés — di ESTO en la entrevista</div>
  <div class="plan-block">
    <div class="plan-time" style="color:#16A34A;">Al recibir el problema</div>
    <div class="plan-content">
      <p>
        <em>"Let me make sure I understand the problem correctly. We're given [input] and we need to return [output]. Is that right?"</em><br><br>
        <em>"A few quick clarifying questions: Is the input always sorted by timestamp? Can there be duplicate timestamps? What should I return if the input is empty? Are the values guaranteed to be positive?"</em><br><br>
        <em>"What's the expected size of the input — hundreds of events or millions? That affects whether I optimize for time or readability."</em>
      </p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time" style="color:#16A34A;">Al identificar el patrón</div>
    <div class="plan-content">
      <p>
        <em>"My first approach would be [PATTERN] because the problem asks for [KEY SIGNAL]. This gives us O(n) time and O(k) space, where k is the window size."</em><br><br>
        <em>"I'm going to use a sliding window with a deque because we need O(1) insertion and removal from both ends."</em><br><br>
        <em>"I'll use a HashMap here to get O(1) lookups — that avoids the nested loop and brings this from O(n²) to O(n)."</em>
      </p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time" style="color:#16A34A;">Mientras codeas</div>
    <div class="plan-content">
      <p>
        <em>"I'm grouping the events by sensor ID first using a defaultdict, then for each sensor I sort the timestamps and scan for gaps."</em><br><br>
        <em>"I'm compiling the regex outside the loop — it's more efficient because it's compiled once and reused."</em><br><br>
        <em>"I'll use type hints here — it makes the intent clearer and would catch bugs at the IDE level."</em>
      </p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time" style="color:#16A34A;">Al terminar</div>
    <div class="plan-content">
      <p>
        <em>"Let me trace through the example: with input [0, 33, 66, 600], the loop checks: 33-0=33 &lt; 200 ✓, 66-33=33 &lt; 200 ✓, 600-66=534 &gt; 200 → gap found. Looks correct."</em><br><br>
        <em>"Edge cases I should handle: empty input — I return an empty dict/list. Single element — no pairs, return empty. All gaps are valid — return empty. What if timestamps are not sorted? I'd add a sort at the start, which adds O(n log n)."</em><br><br>
        <em>"The time complexity is O(n) for the scan and O(k) space for the result, where k is the number of gaps found."</em>
      </p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time" style="color:#16A34A;">Si te atascas</div>
    <div class="plan-content">
      <p>
        <em>"I'm thinking through this — let me work through a small example manually first."</em><br><br>
        <em>"I know the brute force is O(n²) with two nested loops. To optimize I need a way to get O(1) lookups, which makes me think HashMap."</em><br><br>
        <em>"Could you give me a small hint on what data structure you had in mind? I want to make sure I'm on the right track."</em>
      </p>
    </div>
  </div>
</div>

<!-- ══ EDGE CASES CHECKLIST ══ -->
<div class="plan-card" style="margin-top:16px">
  <div class="plan-card-title">✅ Edge Cases — Los que SIEMPRE preguntarán</div>
  <div class="two-col" style="margin-top:0">
    <div class="info-card">
      <h5>🔴 Siempre mencionar (day 1)</h5>
      <ul>
        <li><b>Empty input:</b> ¿Qué devuelves? [] o {}</li>
        <li><b>Single element:</b> ¿Hay "pares" posibles? No</li>
        <li><b>All same value:</b> stdev=0, no gaps</li>
        <li><b>Negative values:</b> ¿Son válidos? Preguntar</li>
        <li><b>Unsorted input:</b> Sort first O(n log n) o asumir ordenado</li>
        <li><b>Duplicates:</b> ¿Se permiten? ¿Cómo se cuentan?</li>
      </ul>
    </div>
    <div class="info-card">
      <h5>🟡 Para problemas de timestamps</h5>
      <ul>
        <li><b>Overflow:</b> Python int no tiene overflow, mencionar que en C sería un issue</li>
        <li><b>Negative timestamps:</b> ¿Posible? (relojes no sincronizados)</li>
        <li><b>Future timestamps:</b> evento con ts > now</li>
        <li><b>Tolerance boundary:</b> ¿&gt; o &gt;= ? Preguntar al entrevistador</li>
        <li><b>Single sensor:</b> no hay "otros" para comparar</li>
        <li><b>Very large gaps:</b> manejo correcto del primer elemento</li>
      </ul>
    </div>
  </div>
  <div class="two-col">
    <div class="info-card">
      <h5>🟡 Para counter/frequency problems</h5>
      <ul>
        <li><b>k &gt; unique_count:</b> ¿qué devuelves? todos los que hay</li>
        <li><b>Tie-breaking:</b> ¿qué pasa cuando dos tienen el mismo count?</li>
        <li><b>Case sensitivity:</b> ¿"ERROR" == "error"? Preguntar</li>
        <li><b>All zeros:</b> counter vacío</li>
      </ul>
    </div>
    <div class="info-card">
      <h5>🟡 Para sliding window</h5>
      <ul>
        <li><b>window &gt; array size:</b> retorna lo que hay</li>
        <li><b>window = 0:</b> undefined — preguntar o retornar []</li>
        <li><b>Shrinking window:</b> left nunca debe pasar a right</li>
        <li><b>Empty window:</b> al arrancar, ¿cuántos datos necesitas mínimo?</li>
      </ul>
    </div>
  </div>
</div>

<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas sobre coding challenges</div>
  <p class="notes-placeholder">Practica escribir estos ejercicios a mano sin IDE. 30 min por ejercicio...</p>
</div>`,

'wayve-challenges-2': `
<div class="alert-card">
  🔥 <strong>6 ejercicios de nivel medio-alto</strong> — los más frecuentes en entrevistas de infra/plataforma. Todos con solución completa, complejidad y variantes.
</div>

<!-- ══ CH-4: MERGE INTERVALS ══ -->
<div class="plan-card">
  <div class="plan-card-title">📐 Ch-4: Merge Drive Sessions (Merge Intervals)</div>
  <div class="plan-block">
    <div class="plan-time">Enunciado</div>
    <div class="plan-content">
      <h4>"Given a list of drive session time intervals, merge overlapping sessions"</h4>
      <p>Variante Wayve: "Our offload pipeline sometimes duplicates the same time window. Given a list of [start_ms, end_ms] recording intervals, return the merged non-overlapping sessions."</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Solución O(n log n)</div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Python — Merge Intervals clásico</div><pre>
<span class="c-kw">from</span> typing <span class="c-kw">import</span> List

<span class="c-kw">def</span> <span class="c-fn">merge_sessions</span>(intervals: List[List[<span class="c-bi">int</span>]]) -&gt; List[List[<span class="c-bi">int</span>]]:
    <span class="c-st">"""
    intervals: [[start_ms, end_ms], ...]
    Returns merged non-overlapping intervals, sorted.
    Time: O(n log n) for sort, O(n) for merge
    Space: O(n) for result
    """</span>
    <span class="c-kw">if not</span> intervals:
        <span class="c-kw">return</span> []

    <span class="c-cm"># Sort by start time — key insight</span>
    intervals.sort(key=<span class="c-kw">lambda</span> x: x[<span class="c-nb">0</span>])
    merged = [intervals[<span class="c-nb">0</span>]]

    <span class="c-kw">for</span> start, end <span class="c-kw">in</span> intervals[<span class="c-nb">1</span>:]:
        <span class="c-cm"># Does current interval overlap with the last merged?</span>
        <span class="c-kw">if</span> start &lt;= merged[-<span class="c-nb">1</span>][<span class="c-nb">1</span>]:
            <span class="c-cm"># Overlap: extend the end if needed</span>
            merged[-<span class="c-nb">1</span>][<span class="c-nb">1</span>] = <span class="c-bi">max</span>(merged[-<span class="c-nb">1</span>][<span class="c-nb">1</span>], end)
        <span class="c-kw">else</span>:
            <span class="c-cm"># No overlap: add as new interval</span>
            merged.append([start, end])
    <span class="c-kw">return</span> merged

<span class="c-cm"># Test</span>
sessions = [[<span class="c-nb">1000</span>, <span class="c-nb">5000</span>], [<span class="c-nb">3000</span>, <span class="c-nb">8000</span>], [<span class="c-nb">9000</span>, <span class="c-nb">12000</span>], [<span class="c-nb">9500</span>, <span class="c-nb">11000</span>]]
print(merge_sessions(sessions))
<span class="c-cm"># → [[1000, 8000], [9000, 12000]]</span>

<span class="c-cm"># Variante: total recording time after merging</span>
<span class="c-kw">def</span> <span class="c-fn">total_duration</span>(intervals):
    <span class="c-kw">return</span> <span class="c-bi">sum</span>(e - s <span class="c-kw">for</span> s, e <span class="c-kw">in</span> merge_sessions(intervals))

<span class="c-cm"># Variante: insert a new session and re-merge</span>
<span class="c-kw">def</span> <span class="c-fn">insert_session</span>(intervals, new_interval):
    intervals.append(new_interval)
    <span class="c-kw">return</span> merge_sessions(intervals)  <span class="c-cm"># sort handles placement</span></pre></div>
    </div>
  </div>
</div>

<!-- ══ CH-5: TOP K ERRORS ══ -->
<div class="plan-card" style="margin-top:16px">
  <div class="plan-card-title">🏆 Ch-5: Top-K Frequent Errors (Heap)</div>
  <div class="plan-block">
    <div class="plan-time">Enunciado</div>
    <div class="plan-content">
      <h4>"Find the K most frequent error codes in a CI log"</h4>
      <p>Variante Wayve: "Given thousands of test failures across bench runs, return the top 5 error codes by frequency so we know what to fix first."</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Solución O(n log k)</div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Python — Top-K con heap y Counter</div><pre>
<span class="c-kw">import</span> heapq
<span class="c-kw">from</span> collections <span class="c-kw">import</span> Counter
<span class="c-kw">from</span> typing <span class="c-kw">import</span> List, Tuple

<span class="c-cm"># MÉTODO 1: Counter.most_common — O(n log k), más pythonico</span>
<span class="c-kw">def</span> <span class="c-fn">top_k_errors</span>(errors: List[str], k: <span class="c-bi">int</span>) -&gt; List[Tuple[str, <span class="c-bi">int</span>]]:
    counts = Counter(errors)
    <span class="c-kw">return</span> counts.most_common(k)

<span class="c-cm"># MÉTODO 2: Min-heap — cuando k es pequeño y n es enorme</span>
<span class="c-kw">def</span> <span class="c-fn">top_k_heap</span>(errors: List[str], k: <span class="c-bi">int</span>) -&gt; List[Tuple[str, <span class="c-bi">int</span>]]:
    <span class="c-cm">"""
    Mantiene un min-heap de tamaño k.
    Si el nuevo elemento es mayor que el mínimo del heap, lo reemplaza.
    Time: O(n log k)  Space: O(n) para Counter + O(k) para heap
    """</span>
    counts = Counter(errors)
    <span class="c-cm"># heapq es un min-heap; negamos el count para simular max-heap</span>
    <span class="c-kw">return</span> heapq.nlargest(k, counts.items(), key=<span class="c-kw">lambda</span> x: x[<span class="c-nb">1</span>])

<span class="c-cm"># MÉTODO 3: Bucket sort — O(n), cuando el rango de frecuencias es conocido</span>
<span class="c-kw">def</span> <span class="c-fn">top_k_bucket</span>(errors: List[str], k: <span class="c-bi">int</span>) -&gt; List[str]:
    counts = Counter(errors)
    <span class="c-cm"># Bucket: index = frequency, value = list of errors with that freq</span>
    buckets = [[] <span class="c-kw">for</span> _ <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-bi">len</span>(errors) + <span class="c-nb">1</span>)]
    <span class="c-kw">for</span> error, cnt <span class="c-kw">in</span> counts.items():
        buckets[cnt].append(error)
    result = []
    <span class="c-kw">for</span> freq <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-bi">len</span>(buckets) - <span class="c-nb">1</span>, -<span class="c-nb">1</span>, -<span class="c-nb">1</span>):
        result.extend(buckets[freq])
        <span class="c-kw">if</span> <span class="c-bi">len</span>(result) &gt;= k:
            <span class="c-kw">return</span> result[:k]
    <span class="c-kw">return</span> result

<span class="c-cm"># Cuándo usar cada uno:</span>
<span class="c-cm"># Counter.most_common → siempre, es la opción default</span>
<span class="c-cm"># heap manual → si necesitas k muy pequeño y n enorme (streaming)</span>
<span class="c-cm"># bucket sort → si el entrevistador pide O(n) time</span></pre></div>
    </div>
  </div>
</div>

<!-- ══ CH-6: CIRCULAR BUFFER ══ -->
<div class="plan-card" style="margin-top:16px">
  <div class="plan-card-title">🔄 Ch-6: Circular Buffer para sensor stream</div>
  <div class="plan-block">
    <div class="plan-time">Enunciado</div>
    <div class="plan-content">
      <h4>"Implement a circular buffer to store the last N sensor readings"</h4>
      <p>Variante Wayve: "Our monitoring system needs to keep the last 100 LIDAR readings in memory for anomaly detection without growing unboundedly."</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Solución O(1) por operación</div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Python — Circular Buffer completo</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> deque
<span class="c-kw">from</span> typing <span class="c-kw">import</span> Optional, List
<span class="c-kw">import</span> statistics

<span class="c-cm"># OPCIÓN 1: deque(maxlen=N) — la más simple y pytónica</span>
<span class="c-kw">class</span> <span class="c-fn">SensorBuffer</span>:
    <span class="c-st">"""Circular buffer for last N sensor readings. O(1) push, O(n) stats."""</span>

    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(<span class="c-bi">self</span>, capacity: <span class="c-bi">int</span>):
        <span class="c-bi">self</span>.buf = deque(maxlen=capacity)
        <span class="c-bi">self</span>.capacity = capacity

    <span class="c-kw">def</span> <span class="c-fn">push</span>(<span class="c-bi">self</span>, value: <span class="c-bi">float</span>) -&gt; <span class="c-kw">None</span>:
        <span class="c-bi">self</span>.buf.append(value)         <span class="c-cm"># O(1), evicts oldest if full</span>

    <span class="c-kw">def</span> <span class="c-fn">get_latest</span>(<span class="c-bi">self</span>, n: <span class="c-bi">int</span> = <span class="c-nb">1</span>) -&gt; List[<span class="c-bi">float</span>]:
        <span class="c-kw">return</span> <span class="c-bi">list</span>(<span class="c-bi">self</span>.buf)[-n:]     <span class="c-cm"># last n readings</span>

    <span class="c-kw">def</span> <span class="c-fn">mean</span>(<span class="c-bi">self</span>) -&gt; Optional[<span class="c-bi">float</span>]:
        <span class="c-kw">return</span> statistics.mean(<span class="c-bi">self</span>.buf) <span class="c-kw">if</span> <span class="c-bi">self</span>.buf <span class="c-kw">else None</span>

    <span class="c-kw">def</span> <span class="c-fn">is_anomalous</span>(<span class="c-bi">self</span>, threshold_stddev: <span class="c-bi">float</span> = <span class="c-nb">3.0</span>) -&gt; <span class="c-bi">bool</span>:
        <span class="c-st">"""Last reading is an outlier (Z-score > threshold)?"""</span>
        <span class="c-kw">if</span> <span class="c-bi">len</span>(<span class="c-bi">self</span>.buf) &lt; <span class="c-nb">2</span>: <span class="c-kw">return False</span>
        mean = statistics.mean(<span class="c-bi">self</span>.buf)
        stdev = statistics.stdev(<span class="c-bi">self</span>.buf)
        <span class="c-kw">if</span> stdev == <span class="c-nb">0</span>: <span class="c-kw">return False</span>
        z = <span class="c-bi">abs</span>(<span class="c-bi">self</span>.buf[-<span class="c-nb">1</span>] - mean) / stdev
        <span class="c-kw">return</span> z &gt; threshold_stddev

<span class="c-cm"># OPCIÓN 2: Array manual — cuando el entrevistador pide la implementación raw</span>
<span class="c-kw">class</span> <span class="c-fn">CircularBufferRaw</span>:
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(<span class="c-bi">self</span>, cap: <span class="c-bi">int</span>):
        <span class="c-bi">self</span>.buf = [<span class="c-kw">None</span>] * cap
        <span class="c-bi">self</span>.cap = cap
        <span class="c-bi">self</span>.head = <span class="c-nb">0</span>   <span class="c-cm"># oldest element</span>
        <span class="c-bi">self</span>.size = <span class="c-nb">0</span>

    <span class="c-kw">def</span> <span class="c-fn">push</span>(<span class="c-bi">self</span>, val):
        write_idx = (<span class="c-bi">self</span>.head + <span class="c-bi">self</span>.size) % <span class="c-bi">self</span>.cap
        <span class="c-bi">self</span>.buf[write_idx] = val
        <span class="c-kw">if</span> <span class="c-bi">self</span>.size &lt; <span class="c-bi">self</span>.cap:
            <span class="c-bi">self</span>.size += <span class="c-nb">1</span>
        <span class="c-kw">else</span>:
            <span class="c-bi">self</span>.head = (<span class="c-bi">self</span>.head + <span class="c-nb">1</span>) % <span class="c-bi">self</span>.cap  <span class="c-cm"># overwrite oldest</span>

    <span class="c-kw">def</span> <span class="c-fn">to_list</span>(<span class="c-bi">self</span>):
        <span class="c-kw">return</span> [<span class="c-bi">self</span>.buf[(<span class="c-bi">self</span>.head + i) % <span class="c-bi">self</span>.cap]
                <span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-bi">self</span>.size)]</pre></div>
    </div>
  </div>
</div>

<!-- ══ CH-7: BINARY SEARCH TIMESTAMPS ══ -->
<div class="plan-card" style="margin-top:16px">
  <div class="plan-card-title">🔍 Ch-7: Binary Search en timestamps</div>
  <div class="plan-block">
    <div class="plan-time">Enunciado</div>
    <div class="plan-content">
      <h4>"Find all messages in an MCAP within a time range [t_start, t_end]"</h4>
      <p>Variante: "Our replay tool needs to jump to a specific second in a recording. Given sorted timestamps, find the index of the first message at or after t_start." — Esto es bisect_left.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Solución O(log n)</div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Python — Binary search en datos de sensores</div><pre>
<span class="c-kw">import</span> bisect
<span class="c-kw">from</span> typing <span class="c-kw">import</span> List, Tuple

<span class="c-cm"># CASO 1: bisect_left — primer índice donde ts >= target</span>
<span class="c-kw">def</span> <span class="c-fn">first_message_at_or_after</span>(timestamps: List[<span class="c-bi">int</span>], t: <span class="c-bi">int</span>) -&gt; <span class="c-bi">int</span>:
    <span class="c-st">"""Returns index of first message with timestamp >= t. O(log n)"""</span>
    <span class="c-kw">return</span> bisect.bisect_left(timestamps, t)

<span class="c-cm"># CASO 2: rango [t_start, t_end]</span>
<span class="c-kw">def</span> <span class="c-fn">messages_in_range</span>(timestamps: List[<span class="c-bi">int</span>],
                        t_start: <span class="c-bi">int</span>, t_end: <span class="c-bi">int</span>) -&gt; Tuple[<span class="c-bi">int</span>, <span class="c-bi">int</span>]:
    <span class="c-st">"""Returns (start_idx, end_idx) slice of messages in [t_start, t_end]."""</span>
    lo = bisect.bisect_left(timestamps, t_start)   <span class="c-cm"># first >= t_start</span>
    hi = bisect.bisect_right(timestamps, t_end)    <span class="c-cm"># first > t_end</span>
    <span class="c-kw">return</span> lo, hi  <span class="c-cm"># messages[lo:hi]</span>

<span class="c-cm"># CASO 3: Implementación manual (si el entrevistador pide no usar bisect)</span>
<span class="c-kw">def</span> <span class="c-fn">binary_search_left</span>(arr: List[<span class="c-bi">int</span>], target: <span class="c-bi">int</span>) -&gt; <span class="c-bi">int</span>:
    lo, hi = <span class="c-nb">0</span>, <span class="c-bi">len</span>(arr)
    <span class="c-kw">while</span> lo &lt; hi:
        mid = (lo + hi) // <span class="c-nb">2</span>
        <span class="c-kw">if</span> arr[mid] &lt; target:
            lo = mid + <span class="c-nb">1</span>
        <span class="c-kw">else</span>:
            hi = mid          <span class="c-cm"># mid podría ser el answer</span>
    <span class="c-kw">return</span> lo               <span class="c-cm"># insertion point = first >= target</span>

<span class="c-cm"># CASO 4: Encontrar primer gap > threshold en timestamps ordenados</span>
<span class="c-kw">def</span> <span class="c-fn">first_large_gap</span>(timestamps: List[<span class="c-bi">int</span>], threshold_ms: <span class="c-bi">int</span>) -&gt; <span class="c-bi">int</span>:
    <span class="c-st">"""Returns index i where timestamps[i+1] - timestamps[i] > threshold.
    Uses linear scan — binary search no aplica porque los gaps no son monotónicos."""</span>
    <span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-bi">len</span>(timestamps) - <span class="c-nb">1</span>):
        <span class="c-kw">if</span> timestamps[i + <span class="c-nb">1</span>] - timestamps[i] &gt; threshold_ms:
            <span class="c-kw">return</span> i
    <span class="c-kw">return</span> -<span class="c-nb">1</span>

<span class="c-cm"># TRUCO: ¿Cuándo se puede usar binary search para buscar el primer gap?</span>
<span class="c-cm"># Solo si los gaps son monotónicamente crecientes (caso inusual).</span>
<span class="c-cm"># En sensor data: siempre scan lineal para buscar gaps.</span>
<span class="c-cm"># Binary search aplica para: buscar en timestamps (O(log n)).</span></pre></div>
    </div>
  </div>
</div>

<!-- ══ CH-8: MULTI-SENSOR SYNC ══ -->
<div class="plan-card" style="margin-top:16px">
  <div class="plan-card-title">🔗 Ch-8: Multi-sensor Synchronization Check</div>
  <div class="plan-block">
    <div class="plan-time">Enunciado</div>
    <div class="plan-content">
      <h4>"Check if camera and LIDAR are synchronized within 50ms of each other"</h4>
      <p>Variante: "For sensor fusion to work, each camera frame must have a LIDAR scan within 50ms. Given two lists of sorted timestamps, find all camera frames that have no matching LIDAR scan."</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Solución Two-pointer O(n+m)</div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Python — Sensor synchronization check</div><pre>
<span class="c-kw">import</span> bisect
<span class="c-kw">from</span> typing <span class="c-kw">import</span> List

<span class="c-kw">def</span> <span class="c-fn">find_unsynced_frames</span>(
    camera_ts: List[<span class="c-bi">int</span>],
    lidar_ts:  List[<span class="c-bi">int</span>],
    tolerance_ms: <span class="c-bi">int</span> = <span class="c-nb">50</span>
) -&gt; List[<span class="c-bi">int</span>]:
    <span class="c-st">"""
    Returns camera timestamps with no LIDAR reading within tolerance.
    Both lists must be sorted.
    Time: O((n+m) log m) with binary search, O(n+m) with two pointers.
    """</span>
    unsynced = []
    j = <span class="c-nb">0</span>

    <span class="c-kw">for</span> cam_t <span class="c-kw">in</span> camera_ts:
        <span class="c-cm"># Advance j to first LIDAR ts that could match (start of window)</span>
        <span class="c-kw">while</span> j &lt; <span class="c-bi">len</span>(lidar_ts) <span class="c-kw">and</span> lidar_ts[j] &lt; cam_t - tolerance_ms:
            j += <span class="c-nb">1</span>

        <span class="c-cm"># Check if any LIDAR ts falls within [cam_t - tol, cam_t + tol]</span>
        found = (<span class="c-bi">j</span> &lt; <span class="c-bi">len</span>(lidar_ts) <span class="c-kw">and</span>
                 lidar_ts[j] &lt;= cam_t + tolerance_ms)
        <span class="c-kw">if not</span> found:
            unsynced.append(cam_t)

    <span class="c-kw">return</span> unsynced

<span class="c-cm"># Example:</span>
cam  = [<span class="c-nb">0</span>, <span class="c-nb">33</span>, <span class="c-nb">66</span>, <span class="c-nb">99</span>, <span class="c-nb">132</span>]
lidar= [<span class="c-nb">5</span>, <span class="c-nb">105</span>, <span class="c-nb">205</span>]
print(find_unsynced_frames(cam, lidar, tolerance_ms=<span class="c-nb">50</span>))
<span class="c-cm"># At t=66: nearest LIDAR is 5 (diff=61) or 105 (diff=39) → 105 is within 50ms → synced</span>
<span class="c-cm"># At t=132: nearest is 105 (diff=27) → synced</span>
<span class="c-cm"># At t=33: nearest is 5 (diff=28) → synced</span>
<span class="c-cm"># → [] (all synced in this case)</span></pre></div>
    </div>
  </div>
</div>

<!-- ══ CH-9: DEDUPLICAR EVENTOS ══ -->
<div class="plan-card" style="margin-top:16px">
  <div class="plan-card-title">🔑 Ch-9: Deduplication & Group-by</div>
  <div class="plan-block">
    <div class="plan-time">Enunciado</div>
    <div class="plan-content">
      <h4>"Given CI failure events, deduplicate and group by (bench, error_type)"</h4>
      <p>Variante: "Our CI emits duplicate events when a retry occurs. Deduplicate by (test_id, timestamp_minute) and then group failures by bench to find the flakiest bench."</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Solución con HashMap O(n)</div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Python — Deduplication + groupby</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> defaultdict
<span class="c-kw">from</span> dataclasses <span class="c-kw">import</span> dataclass
<span class="c-kw">from</span> typing <span class="c-kw">import</span> List, Dict

<span class="c-dc">@dataclass</span>
<span class="c-kw">class</span> <span class="c-fn">FailureEvent</span>:
    test_id: str
    bench: str
    error_type: str
    timestamp_ms: <span class="c-bi">int</span>

<span class="c-kw">def</span> <span class="c-fn">deduplicate</span>(events: List[FailureEvent],
                  window_ms: <span class="c-bi">int</span> = <span class="c-nb">60000</span>) -&gt; List[FailureEvent]:
    <span class="c-st">"""Remove duplicate events for the same test within the same minute."""</span>
    seen = <span class="c-bi">set</span>()
    result = []
    <span class="c-kw">for</span> e <span class="c-kw">in</span> events:
        <span class="c-cm"># Bucket timestamp to the nearest window (e.g. 1 minute)</span>
        key = (e.test_id, e.timestamp_ms // window_ms)
        <span class="c-kw">if</span> key <span class="c-kw">not in</span> seen:
            seen.add(key)
            result.append(e)
    <span class="c-kw">return</span> result

<span class="c-kw">def</span> <span class="c-fn">failures_by_bench</span>(events: List[FailureEvent]) -&gt; Dict[str, <span class="c-bi">int</span>]:
    <span class="c-st">"""Count unique failures per bench after deduplication."""</span>
    unique = deduplicate(events)
    counts = defaultdict(<span class="c-bi">int</span>)
    <span class="c-kw">for</span> e <span class="c-kw">in</span> unique:
        counts[e.bench] += <span class="c-nb">1</span>
    <span class="c-kw">return</span> <span class="c-bi">dict</span>(counts)

<span class="c-cm"># Variante: group by multiple keys</span>
<span class="c-kw">def</span> <span class="c-fn">group_by</span>(events: List[FailureEvent],
              key_fn) -&gt; Dict:
    result = defaultdict(<span class="c-bi">list</span>)
    <span class="c-kw">for</span> e <span class="c-kw">in</span> events:
        result[key_fn(e)].append(e)
    <span class="c-kw">return</span> <span class="c-bi">dict</span>(result)

<span class="c-cm"># Uso: group_by(events, lambda e: (e.bench, e.error_type))</span>
<span class="c-cm"># → {("bench-01", "TIMEOUT"): [ev1, ev3], ("bench-02", "ASSERT"): [ev2]}</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas sobre challenges parte 2</div>
  <p class="notes-placeholder">Practica cada ejercicio sin ver la solución. Timer: 20 min cada uno...</p>
</div>`,

'wayve-challenges-3': `
<div class="alert-card">
  🧩 <strong>Algoritmos avanzados</strong> — DP, topological sort, grafos y matrix traversal. Nivel senior. Si preguntan algo de aquí, es la ronda técnica de mayor nivel.
</div>

<!-- ══ CH-10: LONGEST VALID SEQUENCE (DP) ══ -->
<div class="plan-card">
  <div class="plan-card-title">📈 Ch-10: Longest Valid Recording Sequence (DP)</div>
  <div class="plan-block">
    <div class="plan-time">Enunciado</div>
    <div class="plan-content">
      <h4>"Find the longest continuous valid recording period"</h4>
      <p>Variante: "Given a list of per-second sensor health flags (1=healthy, 0=degraded), find the longest contiguous sequence of healthy seconds. Also: find the subarray of seconds with the maximum total sensor score."</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Solución — Kadane's Algorithm O(n)</div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Python — Longest subarray variants (Kadane)</div><pre>
<span class="c-kw">from</span> typing <span class="c-kw">import</span> List, Tuple

<span class="c-cm"># VARIANTE 1: Longest contiguous sequence of 1s</span>
<span class="c-kw">def</span> <span class="c-fn">longest_healthy_window</span>(health: List[<span class="c-bi">int</span>]) -&gt; Tuple[<span class="c-bi">int</span>, <span class="c-bi">int</span>, <span class="c-bi">int</span>]:
    <span class="c-st">"""Returns (start_idx, end_idx, length) of longest healthy sequence.
    Time: O(n), Space: O(1)"""</span>
    best_start = best_end = best_len = <span class="c-nb">0</span>
    cur_start = cur_len = <span class="c-nb">0</span>

    <span class="c-kw">for</span> i, h <span class="c-kw">in</span> <span class="c-bi">enumerate</span>(health):
        <span class="c-kw">if</span> h == <span class="c-nb">1</span>:
            cur_len += <span class="c-nb">1</span>
            <span class="c-kw">if</span> cur_len &gt; best_len:
                best_len = cur_len
                best_start = cur_start
                best_end = i
        <span class="c-kw">else</span>:
            cur_len = <span class="c-nb">0</span>
            cur_start = i + <span class="c-nb">1</span>

    <span class="c-kw">return</span> best_start, best_end, best_len

<span class="c-cm"># VARIANTE 2: Maximum subarray sum (Kadane's) — para scores de calidad</span>
<span class="c-kw">def</span> <span class="c-fn">max_quality_window</span>(scores: List[<span class="c-bi">float</span>]) -&gt; Tuple[<span class="c-bi">float</span>, <span class="c-bi">int</span>, <span class="c-bi">int</span>]:
    <span class="c-st">"""Find the subarray with maximum sum (Kadane's algorithm).
    scores: per-second quality score (can be negative for degraded).
    Returns (max_sum, start_idx, end_idx)"""</span>
    max_sum = cur_sum = scores[<span class="c-nb">0</span>]
    start = end = best_start = <span class="c-nb">0</span>

    <span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-nb">1</span>, <span class="c-bi">len</span>(scores)):
        <span class="c-kw">if</span> cur_sum + scores[i] &lt; scores[i]:
            cur_sum = scores[i]   <span class="c-cm"># restart subarray here</span>
            start = i
        <span class="c-kw">else</span>:
            cur_sum += scores[i]

        <span class="c-kw">if</span> cur_sum &gt; max_sum:
            max_sum = cur_sum
            best_start = start
            end = i

    <span class="c-kw">return</span> max_sum, best_start, end

<span class="c-cm"># Test</span>
health = [<span class="c-nb">1</span>,<span class="c-nb">1</span>,<span class="c-nb">0</span>,<span class="c-nb">1</span>,<span class="c-nb">1</span>,<span class="c-nb">1</span>,<span class="c-nb">0</span>,<span class="c-nb">1</span>]
print(longest_healthy_window(health))   <span class="c-cm"># (3, 5, 3)</span>

scores = [-<span class="c-nb">2</span>, <span class="c-nb">5</span>, -<span class="c-nb">1</span>, <span class="c-nb">3</span>, -<span class="c-nb">4</span>, <span class="c-nb">2</span>, <span class="c-nb">1</span>]
print(max_quality_window(scores))       <span class="c-cm"># (7.0, 1, 3)  → [5,-1,3]=7</span></pre></div>
    </div>
  </div>
</div>

<!-- ══ CH-11: TOPOLOGICAL SORT (CI DEPS) ══ -->
<div class="plan-card" style="margin-top:16px">
  <div class="plan-card-title">📊 Ch-11: Topological Sort — Orden de tests en CI</div>
  <div class="plan-block">
    <div class="plan-time">Enunciado</div>
    <div class="plan-content">
      <h4>"Given CI test dependencies, find a valid execution order"</h4>
      <p>Variante Wayve: "Our CI has tests with dependencies — test B can only run after test A passes. Given a dependency graph, return a valid execution order. Detect if there are circular dependencies that would deadlock the pipeline."</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Solución — Kahn's Algorithm O(V+E)</div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Python — Topological Sort (Kahn's) + cycle detection</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> defaultdict, deque
<span class="c-kw">from</span> typing <span class="c-kw">import</span> Dict, List, Optional

<span class="c-kw">def</span> <span class="c-fn">ci_execution_order</span>(
    dependencies: Dict[str, List[str]]
) -&gt; Optional[List[str]]:
    <span class="c-st">"""
    dependencies: {"test_b": ["test_a"], "test_c": ["test_a", "test_b"]}
    Returns valid execution order, or None if cycle detected.
    Uses Kahn's algorithm (BFS-based topological sort).
    Time: O(V+E)  Space: O(V+E)
    """</span>
    <span class="c-cm"># Build in-degree map (how many deps does each node have?)</span>
    all_nodes = <span class="c-bi">set</span>(dependencies.keys())
    <span class="c-kw">for</span> deps <span class="c-kw">in</span> dependencies.values():
        all_nodes.update(deps)

    in_degree = {node: <span class="c-nb">0</span> <span class="c-kw">for</span> node <span class="c-kw">in</span> all_nodes}
    adj = defaultdict(<span class="c-bi">list</span>)  <span class="c-cm"># adj[a] = [b, c] means a must run before b, c</span>

    <span class="c-kw">for</span> node, deps <span class="c-kw">in</span> dependencies.items():
        <span class="c-kw">for</span> dep <span class="c-kw">in</span> deps:
            adj[dep].append(node)   <span class="c-cm"># dep → node (dep must run first)</span>
            in_degree[node] += <span class="c-nb">1</span>

    <span class="c-cm"># Start with nodes that have no dependencies</span>
    queue = deque(n <span class="c-kw">for</span> n, deg <span class="c-kw">in</span> in_degree.items() <span class="c-kw">if</span> deg == <span class="c-nb">0</span>)
    order = []

    <span class="c-kw">while</span> queue:
        node = queue.popleft()
        order.append(node)
        <span class="c-kw">for</span> neighbor <span class="c-kw">in</span> adj[node]:
            in_degree[neighbor] -= <span class="c-nb">1</span>
            <span class="c-kw">if</span> in_degree[neighbor] == <span class="c-nb">0</span>:
                queue.append(neighbor)

    <span class="c-cm"># If not all nodes processed → cycle exists</span>
    <span class="c-kw">return</span> order <span class="c-kw">if</span> <span class="c-bi">len</span>(order) == <span class="c-bi">len</span>(all_nodes) <span class="c-kw">else None</span>

<span class="c-cm"># Test</span>
deps = {
    <span class="c-st">"test_can_parse"</span>: [],
    <span class="c-st">"test_can_timing"</span>: [<span class="c-st">"test_can_parse"</span>],
    <span class="c-st">"test_integration"</span>: [<span class="c-st">"test_can_parse"</span>, <span class="c-st">"test_can_timing"</span>],
    <span class="c-st">"test_e2e"</span>: [<span class="c-st">"test_integration"</span>]
}
print(ci_execution_order(deps))
<span class="c-cm"># → ["test_can_parse", "test_can_timing", "test_integration", "test_e2e"]</span>

<span class="c-cm"># Detectar ciclo:</span>
cyclic = {<span class="c-st">"A"</span>: [<span class="c-st">"B"</span>], <span class="c-st">"B"</span>: [<span class="c-st">"A"</span>]}  <span class="c-cm"># A depends on B, B depends on A</span>
print(ci_execution_order(cyclic))   <span class="c-cm"># → None (ciclo detectado)</span></pre></div>
    </div>
  </div>
</div>

<!-- ══ CH-12: LRU CACHE ══ -->
<div class="plan-card" style="margin-top:16px">
  <div class="plan-card-title">💾 Ch-12: LRU Cache — Caché de configuraciones de bench</div>
  <div class="plan-block">
    <div class="plan-time">Enunciado</div>
    <div class="plan-content">
      <h4>"Implement an LRU Cache for bench configuration lookups"</h4>
      <p>Variante: "Our bench setup system fetches configuration from a DB. Implement an LRU cache that holds the last K configurations. Get O(1), Put O(1)."</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Solución O(1) — OrderedDict</div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Python — LRU Cache con OrderedDict</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> OrderedDict
<span class="c-kw">from</span> typing <span class="c-kw">import</span> Optional

<span class="c-kw">class</span> <span class="c-fn">LRUCache</span>:
    <span class="c-st">"""LRU Cache with O(1) get and put.
    OrderedDict preserves insertion order AND allows moving to end.
    The 'least recently used' item is always at the front (leftmost).
    """</span>
    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(<span class="c-bi">self</span>, capacity: <span class="c-bi">int</span>):
        <span class="c-bi">self</span>.cache = OrderedDict()
        <span class="c-bi">self</span>.cap = capacity

    <span class="c-kw">def</span> <span class="c-fn">get</span>(<span class="c-bi">self</span>, key: str) -&gt; Optional[<span class="c-bi">int</span>]:
        <span class="c-kw">if</span> key <span class="c-kw">not in</span> <span class="c-bi">self</span>.cache:
            <span class="c-kw">return None</span>
        <span class="c-bi">self</span>.cache.move_to_end(key)   <span class="c-cm"># mark as recently used</span>
        <span class="c-kw">return</span> <span class="c-bi">self</span>.cache[key]

    <span class="c-kw">def</span> <span class="c-fn">put</span>(<span class="c-bi">self</span>, key: str, value: <span class="c-bi">int</span>) -&gt; <span class="c-kw">None</span>:
        <span class="c-bi">self</span>.cache[key] = value
        <span class="c-bi">self</span>.cache.move_to_end(key)   <span class="c-cm"># mark as recently used</span>
        <span class="c-kw">if</span> <span class="c-bi">len</span>(<span class="c-bi">self</span>.cache) &gt; <span class="c-bi">self</span>.cap:
            <span class="c-bi">self</span>.cache.popitem(last=<span class="c-kw">False</span>)  <span class="c-cm"># evict LRU (leftmost)</span>

<span class="c-cm"># También existe @functools.lru_cache para funciones puras</span>
<span class="c-kw">from</span> functools <span class="c-kw">import</span> lru_cache

<span class="c-dc">@lru_cache</span>(maxsize=<span class="c-nb">128</span>)
<span class="c-kw">def</span> <span class="c-fn">get_bench_config</span>(bench_id: str) -&gt; <span class="c-bi">dict</span>:
    <span class="c-kw">return</span> fetch_from_db(bench_id)  <span class="c-cm"># cached after first call</span></pre></div>
    </div>
  </div>
</div>

<!-- ══ CH-13: TWO SUM + VARIANTES ══ -->
<div class="plan-card" style="margin-top:16px">
  <div class="plan-card-title">🎯 Ch-13: Two Sum y sus variantes — el clásico</div>
  <div class="plan-block">
    <div class="plan-time">Variantes más pedidas</div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Python — Two Sum + 3 Sum + variante de timestamps</div><pre>
<span class="c-kw">from</span> typing <span class="c-kw">import</span> List, Tuple, Optional

<span class="c-cm"># TWO SUM — HashMap O(n)</span>
<span class="c-kw">def</span> <span class="c-fn">two_sum</span>(nums: List[<span class="c-bi">int</span>], target: <span class="c-bi">int</span>) -&gt; Optional[Tuple[<span class="c-bi">int</span>,<span class="c-bi">int</span>]]:
    seen = {}   <span class="c-cm"># value → index</span>
    <span class="c-kw">for</span> i, n <span class="c-kw">in</span> <span class="c-bi">enumerate</span>(nums):
        complement = target - n
        <span class="c-kw">if</span> complement <span class="c-kw">in</span> seen:
            <span class="c-kw">return</span> (seen[complement], i)
        seen[n] = i
    <span class="c-kw">return None</span>

<span class="c-cm"># Variante WAYVE: "Find two sensor readings that sum to exactly X volts"</span>
<span class="c-cm"># (misma solución, distintas palabras)</span>

<span class="c-cm"># TWO SUM en array ORDENADO — Two Pointers O(n)</span>
<span class="c-kw">def</span> <span class="c-fn">two_sum_sorted</span>(arr: List[<span class="c-bi">int</span>], target: <span class="c-bi">int</span>) -&gt; Optional[Tuple[<span class="c-bi">int</span>,<span class="c-bi">int</span>]]:
    lo, hi = <span class="c-nb">0</span>, <span class="c-bi">len</span>(arr) - <span class="c-nb">1</span>
    <span class="c-kw">while</span> lo &lt; hi:
        s = arr[lo] + arr[hi]
        <span class="c-kw">if</span>   s == target: <span class="c-kw">return</span> (lo, hi)
        <span class="c-kw">elif</span> s &lt;  target: lo += <span class="c-nb">1</span>
        <span class="c-kw">else</span>:             hi -= <span class="c-nb">1</span>
    <span class="c-kw">return None</span>

<span class="c-cm"># 3 SUM — "find 3 readings that sum to 0" — O(n²)</span>
<span class="c-kw">def</span> <span class="c-fn">three_sum</span>(nums: List[<span class="c-bi">int</span>]) -&gt; List[List[<span class="c-bi">int</span>]]:
    nums.sort()
    result = []
    <span class="c-kw">for</span> i <span class="c-kw">in</span> <span class="c-bi">range</span>(<span class="c-bi">len</span>(nums) - <span class="c-nb">2</span>):
        <span class="c-kw">if</span> i &gt; <span class="c-nb">0</span> <span class="c-kw">and</span> nums[i] == nums[i-<span class="c-nb">1</span>]: <span class="c-kw">continue</span>  <span class="c-cm"># skip duplicates</span>
        lo, hi = i + <span class="c-nb">1</span>, <span class="c-bi">len</span>(nums) - <span class="c-nb">1</span>
        <span class="c-kw">while</span> lo &lt; hi:
            s = nums[i] + nums[lo] + nums[hi]
            <span class="c-kw">if</span>   s == <span class="c-nb">0</span>: result.append([nums[i], nums[lo], nums[hi]]); lo += <span class="c-nb">1</span>; hi -= <span class="c-nb">1</span>
            <span class="c-kw">elif</span> s &lt;  <span class="c-nb">0</span>: lo += <span class="c-nb">1</span>
            <span class="c-kw">else</span>:        hi -= <span class="c-nb">1</span>
    <span class="c-kw">return</span> result</pre></div>
    </div>
  </div>
</div>

<!-- ══ CH-14: MATRIX / GRID ══ -->
<div class="plan-card" style="margin-top:16px">
  <div class="plan-card-title">🗺️ Ch-14: Grid Problems — Sensor coverage map</div>
  <div class="plan-block">
    <div class="plan-time">Enunciado</div>
    <div class="plan-content">
      <h4>"Count regions of failing sensors in a 2D grid"</h4>
      <p>Variante: "We have a 2D map where each cell is 1 (sensor OK) or 0 (sensor failed). Find the number of distinct failure regions (connected components of 0s)."</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Solución — BFS / DFS en grid O(m×n)</div>
    <div class="plan-content">
<div class="code-block"><div class="code-lang">Python — Island counting (BFS en grid)</div><pre>
<span class="c-kw">from</span> collections <span class="c-kw">import</span> deque

<span class="c-kw">def</span> <span class="c-fn">count_failure_regions</span>(grid: List[List[<span class="c-bi">int</span>]]) -&gt; <span class="c-bi">int</span>:
    <span class="c-st">"""
    Count connected components of 0s (failing sensors) in 2D grid.
    grid[i][j] = 1 (healthy) or 0 (failing)
    Time: O(m*n)  Space: O(m*n) for visited set
    """</span>
    <span class="c-kw">if not</span> grid: <span class="c-kw">return</span> <span class="c-nb">0</span>
    rows, cols = <span class="c-bi">len</span>(grid), <span class="c-bi">len</span>(grid[<span class="c-nb">0</span>])
    visited = <span class="c-bi">set</span>()
    regions = <span class="c-nb">0</span>

    <span class="c-kw">def</span> <span class="c-fn">bfs</span>(r, c):
        queue = deque([(r, c)])
        visited.add((r, c))
        <span class="c-kw">while</span> queue:
            row, col = queue.popleft()
            <span class="c-kw">for</span> dr, dc <span class="c-kw">in</span> [(-<span class="c-nb">1</span>,<span class="c-nb">0</span>),(+<span class="c-nb">1</span>,<span class="c-nb">0</span>),(<span class="c-nb">0</span>,-<span class="c-nb">1</span>),(<span class="c-nb">0</span>,+<span class="c-nb">1</span>)]:
                nr, nc = row + dr, col + dc
                <span class="c-kw">if</span> (<span class="c-nb">0</span> &lt;= nr &lt; rows <span class="c-kw">and</span> <span class="c-nb">0</span> &lt;= nc &lt; cols
                        <span class="c-kw">and</span> (nr, nc) <span class="c-kw">not in</span> visited
                        <span class="c-kw">and</span> grid[nr][nc] == <span class="c-nb">0</span>):
                    visited.add((nr, nc))
                    queue.append((nr, nc))

    <span class="c-kw">for</span> r <span class="c-kw">in</span> <span class="c-bi">range</span>(rows):
        <span class="c-kw">for</span> c <span class="c-kw">in</span> <span class="c-bi">range</span>(cols):
            <span class="c-kw">if</span> grid[r][c] == <span class="c-nb">0</span> <span class="c-kw">and</span> (r, c) <span class="c-kw">not in</span> visited:
                bfs(r, c)
                regions += <span class="c-nb">1</span>
    <span class="c-kw">return</span> regions

<span class="c-cm"># Test</span>
grid = [[<span class="c-nb">1</span>,<span class="c-nb">1</span>,<span class="c-nb">0</span>],[<span class="c-nb">1</span>,<span class="c-nb">0</span>,<span class="c-nb">0</span>],[<span class="c-nb">0</span>,<span class="c-nb">1</span>,<span class="c-nb">1</span>]]
print(count_failure_regions(grid))  <span class="c-cm"># → 2 (top-right cluster + bottom-left)</span></pre></div>
    </div>
  </div>
</div>

<!-- ══ COMPLEJIDAD RESUMEN ══ -->
<div class="plan-card" style="margin-top:16px">
  <div class="plan-card-title">📊 Resumen de complejidades — referencia rápida</div>
  <div class="plan-block">
    <div class="plan-time">Tabla completa</div>
    <div class="plan-content">
      <table class="ref-table">
        <thead><tr><th>Algoritmo</th><th>Time</th><th>Space</th><th>Cuándo</th></tr></thead>
        <tbody>
          <tr><td>Sliding Window fija</td><td>O(n)</td><td>O(k)</td><td>Subarray de tamaño fijo</td></tr>
          <tr><td>Sliding Window variable</td><td>O(n)</td><td>O(n)</td><td>Subarray con condición</td></tr>
          <tr><td>Two Pointers</td><td>O(n)</td><td>O(1)</td><td>Array ordenado, dos índices</td></tr>
          <tr><td>HashMap/Set</td><td>O(n)</td><td>O(n)</td><td>Frecuencia, dedup, two-sum</td></tr>
          <tr><td>Binary Search</td><td>O(log n)</td><td>O(1)</td><td>Array ordenado, buscar elemento</td></tr>
          <tr><td>BFS</td><td>O(V+E)</td><td>O(V)</td><td>Shortest path, nivel a nivel</td></tr>
          <tr><td>DFS</td><td>O(V+E)</td><td>O(V)</td><td>Componentes, ciclos, exploración</td></tr>
          <tr><td>Topological Sort</td><td>O(V+E)</td><td>O(V)</td><td>Dependencias, orden de tareas</td></tr>
          <tr><td>Merge Intervals</td><td>O(n log n)</td><td>O(n)</td><td>Solapamiento de rangos</td></tr>
          <tr><td>Top-K Heap</td><td>O(n log k)</td><td>O(k)</td><td>K elementos más frecuentes/grandes</td></tr>
          <tr><td>Kadane (max subarray)</td><td>O(n)</td><td>O(1)</td><td>Subarray con suma máxima</td></tr>
          <tr><td>LRU Cache</td><td>O(1) get/put</td><td>O(k)</td><td>Cache con eviction policy</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas — challenges avanzados</div>
  <p class="notes-placeholder">Practica Topological Sort y Kadane en papel. Son los que más sorprenden en entrevistas senior...</p>
</div>`,

};  // fin CODING_RICH
