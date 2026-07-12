
// ══════════════════════════════════════════════════════════════════
//  STANDARDS_RICH — Estándares de la industria
// ══════════════════════════════════════════════════════════════════
const STANDARDS_RICH = {

'iso26262': `
<div class="plan-card">
  <div class="plan-card-title">📋 ISO 26262 — Functional Safety en Vehículos</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es?</div>
    <div class="plan-content">
      <h4>El estándar de seguridad funcional automotriz</h4>
      <p>ISO 26262 es el estándar internacional de seguridad funcional para sistemas eléctricos/electrónicos en vehículos de pasajeros (&lt;3500 kg). Derivado del IEC 61508 (seguridad funcional general) y adaptado al dominio automotriz.<br>
      <b>¿Qué define?</b> Los procesos, métodos y técnicas que se deben seguir durante el desarrollo (SW, HW, sistema) para asegurar que los fallos eléctricos/electrónicos no resulten en peligros para personas.<br>
      <b>Aplica a:</b> Todo sistema E/E en vehículos de pasajeros: desde el freno ABS hasta el sistema de asistencia de carril. Extensiones para camiones (ISO 26262 parte 12) y motocicletas (parte 12).</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Las 12 partes</div>
    <div class="plan-content">
      <h4>Estructura del estándar</h4>
      <table class="ref-table">
        <thead><tr><th>Parte</th><th>Contenido</th></tr></thead>
        <tbody>
          <tr><td>Parte 1</td><td>Vocabulario y definiciones</td></tr>
          <tr><td>Parte 2</td><td>Gestión de la seguridad funcional (proceso)</td></tr>
          <tr><td>Parte 3</td><td>Phase de concepto (HARA, Safety Goals, FSC)</td></tr>
          <tr><td>Parte 4</td><td>Product development — nivel sistema (arquitectura técnica)</td></tr>
          <tr><td>Parte 5</td><td>Product development — nivel hardware (HW design, testing)</td></tr>
          <tr><td>Parte 6</td><td>Product development — nivel software (SW design, coding, testing)</td></tr>
          <tr><td>Parte 7</td><td>Production, operation and decommission</td></tr>
          <tr><td>Parte 8</td><td>Procesos de soporte (gestión de configuración, FMEA, etc.)</td></tr>
          <tr><td>Parte 9</td><td>ASIL-oriented and safety-oriented analyses</td></tr>
          <tr><td>Parte 10</td><td>Guía (informativa)</td></tr>
          <tr><td>Parte 11</td><td>Guía de aplicación en semiconductores</td></tr>
          <tr><td>Parte 12</td><td>Adaptación para motocicletas</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre ISO 26262...</p>
</div>`,

'asil': `
<div class="plan-card">
  <div class="plan-card-title">🛡️ ASIL — Automotive Safety Integrity Level</div>
  <div class="plan-block">
    <div class="plan-time">Los niveles ASIL</div>
    <div class="plan-content">
      <h4>De QM (sin requisitos) a ASIL-D (máxima criticidad)</h4>
      <p>ASIL (Automotive Safety Integrity Level) es la medida de rigor de seguridad requerida para una función. Se determina en el HARA multiplicando tres factores:<br>
      <b>S (Severity):</b> Consecuencias del peligro (S0-S3): S3 = accidentes con muertes.<br>
      <b>E (Exposure):</b> Probabilidad de exposición a la situación peligrosa (E0-E4): E4 = ocurre constantemente.<br>
      <b>C (Controllability):</b> Dificultad de que el conductor evite el peligro (C0-C3): C3 = imposible de controlar.<br>
      Combinando S, E y C se obtiene el ASIL (ver tabla ISO 26262-3).</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Ejemplos por sistema</div>
    <div class="plan-content">
      <h4>¿Qué ASIL tiene cada sistema?</h4>
      <table class="ref-table">
        <thead><tr><th>Sistema</th><th>ASIL</th><th>Razón</th></tr></thead>
        <tbody>
          <tr><td>Iluminación interior</td><td>QM</td><td>Sin riesgo de seguridad</td></tr>
          <tr><td>Climatización</td><td>ASIL-A</td><td>Fallo distractor, no peligroso</td></tr>
          <tr><td>Air Bag control</td><td>ASIL-D</td><td>Despliegue accidental = muerte</td></tr>
          <tr><td>ABS (frenos)</td><td>ASIL-C/D</td><td>Pérdida de control = accidente</td></tr>
          <tr><td>EPS (dirección)</td><td>ASIL-D</td><td>Pérdida de dirección = muerte</td></tr>
          <tr><td>ACC (velocidad)</td><td>ASIL-B</td><td>Pérdida parcialmente controlable</td></tr>
          <tr><td>BMS (corte carga)</td><td>ASIL-C</td><td>Incendio por sobrecarga = grave</td></tr>
        </tbody>
      </table>
      <p>El ASIL determina: rigor del proceso de desarrollo, técnicas de análisis obligatorias, cobertura de pruebas, revisiones.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre ASIL...</p>
</div>`,

'hara': `
<div class="plan-card">
  <div class="plan-card-title">⚠️ HARA — Hazard Analysis and Risk Assessment</div>
  <div class="plan-block">
    <div class="plan-time">Proceso HARA</div>
    <div class="plan-content">
      <h4>De peligros a Safety Goals</h4>
      <p>El HARA es el análisis central de la fase de concepto (ISO 26262-3). Su proceso:<br>
      <b>1. Identificar situaciones operacionales:</b> ¿En qué situaciones opera el vehículo? (ciudad, autopista, lluvia, noche, estacionamiento).<br>
      <b>2. Identificar hazardous events:</b> Para cada función, ¿qué pasa si falla? Ej: EPS falla en autopista a 120 km/h → pérdida de dirección.<br>
      <b>3. Evaluar S, E, C:</b> Para cada hazardous event, asignar Severity (S), Exposure (E), Controllability (C).<br>
      <b>4. Determinar ASIL:</b> Usando la tabla HARA de ISO 26262-3.<br>
      <b>5. Definir Safety Goals:</b> Objetivo de seguridad para eliminar o mitigar el hazard. Ej: "El EPS no debe causar ángulo de dirección inadvertido &gt; 10° durante más de 2s".<br>
      <b>6. Asignar ASIL al Safety Goal:</b> El Safety Goal hereda el ASIL calculado.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Ejemplo completo</div>
    <div class="plan-content">
      <h4>HARA de un sistema de frenado de emergencia (AEB)</h4>
      <div class="code-block"><div class="code-lang">HARA — Ejemplo AEB</div><pre>
Función: Automatic Emergency Braking (AEB)
Situación operacional: Autopista, 120 km/h, tráfico denso

Hazardous Event 1: AEB activa freno completo sin obstáculo real
  S = S3 (severidad muy alta — vehículo de atrás podría colisionar)
  E = E3 (exposición: autopistas son frecuentes)
  C = C3 (incontrolable para el conductor en 0.3s)
  ASIL = D

  Safety Goal 1: "El AEB no debe realizar una frenada de emergencia
  completa con deceleración &gt;0.4g sin obstáculo confirmado"
  ASIL del SG-1: ASIL-D

Hazardous Event 2: AEB no activa cuando hay obstáculo real
  S = S3 (colisión frontal a alta velocidad = fatal)
  E = E3 (autopistas con frenazo brusco delantero)
  C = C1 (conductor puede frenar manualmente)
  ASIL = B

  Safety Goal 2: "El AEB debe activarse en &lt;250ms al detectar
  obstáculo confirmado con riesgo de colisión &gt;80%"
  ASIL del SG-2: ASIL-B</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre HARA...</p>
</div>`,

'aspice': `
<div class="plan-card">
  <div class="plan-card-title">📐 ASPICE — Automotive SPICE</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es ASPICE?</div>
    <div class="plan-content">
      <h4>Modelo de capacidad de procesos para automotive</h4>
      <p>Automotive SPICE (Software Process Improvement and Capability dEtermination) es el framework de evaluación de procesos de desarrollo de software específico de la industria automotriz. Derivado de ISO/IEC 15504 (SPICE).<br>
      Los OEMs alemanes (BMW, VW, Daimler, Audi) lo exigen a sus proveedores (Tier 1 como Bosch, Continental, Aptiv). Si un proveedor quiere venderle software a BMW, necesita ASPICE mínimo nivel 2-3.<br>
      <b>No es una certificación de producto</b> sino una evaluación de <b>madurez del proceso</b> de la organización que lo desarrolla.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Capability Levels</div>
    <div class="plan-content">
      <h4>Los 6 niveles de ASPICE (0-5)</h4>
      <table class="ref-table">
        <thead><tr><th>Nivel</th><th>Nombre</th><th>Descripción</th></tr></thead>
        <tbody>
          <tr><td>0</td><td>Incomplete</td><td>El proceso no existe o no alcanza su propósito</td></tr>
          <tr><td>1</td><td>Performed</td><td>El proceso se realiza y logra su propósito</td></tr>
          <tr><td>2</td><td>Managed</td><td>El proceso está planificado, monitoreado y controlado</td></tr>
          <tr><td>3</td><td>Established</td><td>Proceso estándar definido y usado consistentemente</td></tr>
          <tr><td>4</td><td>Predictable</td><td>Proceso medido cuantitativamente y predecible</td></tr>
          <tr><td>5</td><td>Innovating</td><td>Mejora continua basada en medición y análisis</td></tr>
        </tbody>
      </table>
      <p>Los OEMs típicamente piden nivel 2 mínimo y buscan nivel 3 para proyectos safety-critical.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Procesos SWE</div>
    <div class="plan-content">
      <h4>Los procesos clave de Software Engineering</h4>
      <p><b>SWE.1</b> Software Requirements Analysis — Requisitos SW detallados.<br>
      <b>SWE.2</b> Software Architectural Design — Diseño de la arquitectura SW.<br>
      <b>SWE.3</b> Software Detailed Design — Diseño detallado de módulos.<br>
      <b>SWE.4</b> Software Unit Verification — Pruebas unitarias del código.<br>
      <b>SWE.5</b> Software Integration and Integration Test — Integración y prueba.<br>
      <b>SWE.6</b> Software Qualification Test — Prueba de calificación del SW completo.<br>
      Cada proceso SWE tiene actividades, work products (entregables) e indicadores de desempeño que el evaluador ASPICE verifica.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre ASPICE...</p>
</div>`,

'misra': `
<div class="plan-card">
  <div class="plan-card-title">📏 MISRA C / C++ — Codificación segura</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es MISRA?</div>
    <div class="plan-content">
      <h4>Guías de codificación segura para sistemas embebidos críticos</h4>
      <p>MISRA (Motor Industry Software Reliability Association) publica guías de codificación para C y C++ que restringen las características más peligrosas del lenguaje, mejorando la <b>seguridad, portabilidad y mantenibilidad</b> del código embebido.<br>
      • <b>MISRA C:2012:</b> La versión más usada hoy. 143 reglas (Mandatory + Required + Advisory). Obligatorio para código ASIL.<br>
      • <b>MISRA C++:2008:</b> Para C++. 228 reglas.<br>
      • <b>MISRA C:2023:</b> La versión más reciente con mejoras para C++11/14/17.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Reglas clave</div>
    <div class="plan-content">
      <h4>Lo que MISRA prohíbe y por qué</h4>
      <table class="ref-table">
        <thead><tr><th>Construcción prohibida</th><th>Regla</th><th>Razón</th></tr></thead>
        <tbody>
          <tr><td><code>goto</code></td><td>Rule 15.1 (Required)</td><td>Flujo de control no estructurado, difícil de analizar</td></tr>
          <tr><td>Memoria dinámica (<code>malloc</code>)</td><td>Rule 21.3 (Required)</td><td>No determinista, puede fallar, fragmentación</td></tr>
          <tr><td>Recursión sin límite</td><td>Rule 17.2 (Required)</td><td>Stack overflow no predecible</td></tr>
          <tr><td>Punteros a funciones complejos</td><td>Rule 18.x</td><td>Difícil análisis estático</td></tr>
          <tr><td>Conversiones implícitas peligrosas</td><td>Rule 10.x</td><td>Pérdida de datos silenciosa</td></tr>
          <tr><td>Código no alcanzable</td><td>Rule 2.1 (Required)</td><td>Indica error lógico</td></tr>
        </tbody>
      </table>
      <p><b>Herramientas de verificación MISRA:</b> PC-lint Plus (Gimpel), Polyspace Code Prover (MathWorks), QA-C (Perforce), Parasoft C/C++test, LDRA Testbed.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre MISRA C...</p>
</div>`,

'iso21434': `
<div class="plan-card">
  <div class="plan-card-title">🔒 ISO 21434 — Automotive Cybersecurity Engineering</div>
  <div class="plan-block">
    <div class="plan-time">¿Qué es ISO 21434?</div>
    <div class="plan-content">
      <h4>Seguridad cibernética en vehículos</h4>
      <p>ISO 21434:2021 es el equivalente de ISO 26262 pero para <b>ciberseguridad</b>. Define los procesos para gestionar los riesgos de ciberseguridad durante todo el ciclo de vida del vehículo (diseño, producción, operación, decommission).<br>
      <b>Contexto:</b> Los vehículos modernos están conectados (V2X, WiFi, Bluetooth, OTA, OBD-II). Son potenciales objetivos de ataques. ISO 21434 asegura que los fabricantes y proveedores gestionen estos riesgos sistemáticamente.<br>
      <b>Regulación UNECE WP.29:</b> ISO 21434 es la base técnica para los reglamentos UNECE R155 (cybersecurity) y R156 (OTA updates), obligatorios en la EU desde 2022.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">CAL — Cybersecurity Assurance Level</div>
    <div class="plan-content">
      <h4>El equivalente de ASIL en cybersecurity</h4>
      <p>CAL (Cybersecurity Assurance Level) mide el rigor requerido del proceso de ciberseguridad, determinado por el TARA:<br>
      • <b>CAL 1:</b> Impacto mínimo si se compromete el activo.<br>
      • <b>CAL 2:</b> Impacto moderado (datos personales, funciones menores).<br>
      • <b>CAL 3:</b> Impacto significativo (funciones de seguridad no críticas).<br>
      • <b>CAL 4:</b> Impacto crítico (control del vehículo, sistemas de seguridad).<br>
      Un ataque al sistema de frenado (ASIL-D en safety) requeriría CAL 4.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre ISO 21434...</p>
</div>`,

'tara': `
<div class="plan-card">
  <div class="plan-card-title">🔍 TARA — Threat Analysis and Risk Assessment</div>
  <div class="plan-block">
    <div class="plan-time">Proceso TARA</div>
    <div class="plan-content">
      <h4>El HARA de la ciberseguridad</h4>
      <p>TARA es al ISO 21434 lo que HARA es al ISO 26262. Proceso:<br>
      <b>1. Identificar Assets (activos):</b> ¿Qué debe protegerse? Datos (VIN, datos personales, claves criptográficas), funciones (control de frenos, acceso al vehículo), propiedades (disponibilidad, integridad, confidencialidad, autenticidad — DICA).<br>
      <b>2. Identificar amenazas y caminos de ataque:</b> Para cada activo, ¿cuál es la amenaza? ¿Cómo podría llegar un atacante? Ejemplo: atacante vía Bluetooth → sistema de infoentretenimiento → CAN bus → BCM → abrir puertas remotamente.<br>
      <b>3. Evaluar Attack Feasibility:</b> ¿Qué tan difícil es el ataque? (conocimiento requerido, tiempo, equipo, ventana de oportunidad).<br>
      <b>4. Evaluar Impact:</b> ¿Cuáles son las consecuencias? (safety, financial, operacional, privacidad).<br>
      <b>5. Determinar CAL:</b> Basado en feasibility + impact.<br>
      <b>6. Definir cybersecurity goals y controles.</b></p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre TARA...</p>
</div>`,

'security-concepts': `
<div class="plan-card">
  <div class="plan-card-title">🔐 SecOC, Secure Boot y más</div>
  <div class="plan-block">
    <div class="plan-time">SecOC</div>
    <div class="plan-content">
      <h4>Secure Onboard Communication — AUTOSAR</h4>
      <p>SecOC (AUTOSAR) autentica los mensajes CAN/ETH dentro del vehículo para prevenir que un nodo comprometido o un ataque de replay inyecte mensajes falsos en el bus.<br>
      • Agrega un <b>MAC (Message Authentication Code)</b> de 24-32 bits al final del mensaje CAN.<br>
      • El MAC se calcula con una clave secreta compartida y un <b>Freshness Value</b> (contador o timestamp) para prevenir ataques de replay.<br>
      • El receptor verifica el MAC antes de aceptar el mensaje. Si el MAC no coincide → mensaje ignorado + DTC.<br>
      Ejemplo: El mensaje de freno (0x200) incluye los 4 bytes de datos de freno + 3 bytes de MAC. Solo ECUs con la clave pueden verificar que el mensaje es legítimo.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Secure Boot</div>
    <div class="plan-content">
      <h4>Verificación de integridad del firmware al arranque</h4>
      <p>Secure Boot garantiza que la ECU solo ejecute firmware firmado criptográficamente por el OEM. Proceso:<br>
      1. El <b>Hardware Security Module (HSM)</b> en el chip tiene una clave pública del OEM guardada en memoria protegida (no modificable).<br>
      2. Al arrancar, el HSM calcula el hash del bootloader y verifica la firma digital con la clave pública.<br>
      3. Si la verificación pasa, el bootloader arranca y verifica el application software de la misma manera (<b>Chain of Trust</b>).<br>
      4. Si cualquier verificación falla, la ECU entra en modo seguro o no arranca.<br>
      Esto previene que firmware malicioso (ej: instalado por un ataque al taller o a la cadena de suministro) corra en la ECU.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre SecOC y Secure Boot...</p>
</div>`,

};  // fin STANDARDS_RICH
