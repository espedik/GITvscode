# salud.html — Mi Salud: Nutrición & Bienestar

La aplicación más completa del proyecto en cuanto a secciones: seguimiento de alimentación, ejercicio ligero, peso/medidas corporales, un registro de historial médico (exámenes de laboratorio, chequeos y perfil médico), más dos módulos de contenido especializado (rutina alimentaria para masa muscular y guía de salud digestiva). Es de una sola página (HTML+CSS+JS, sin backend); los datos se guardan en `localStorage` (clave `misalud_v1`).

**Ubicación actual**: vive en `CuidadoPersonal/salud.html` (movida aquí el 2026-07-29 desde `Salud/salud.html`, sin cambios de código — solo de carpeta). Se abre normalmente **incrustada** dentro de `CuidadoPersonal/cuidadopersonal.html` → subtab **🥗 Cuidado de la Salud**, vía `<iframe src="salud.html">`. También puede abrirse directo (`CuidadoPersonal/salud.html`) sin pasar por el shell — funciona igual, es 100% autocontenida.

## Navegación (sidebar propio de este archivo)

- **📊 Dashboard** — resumen del día: calorías y macros (proteína/carbohidratos/grasa) consumidos vs. meta, contador de vasos de agua, comidas registradas hoy y ejercicio de hoy.
- **🍽️ Plan Semanal** — vista de un plan de comidas planeado.
- **🥗 Registro Diario** — bitácora de alimentos consumidos (comida del día: desayuno/almuerzo/cena/snack, nombre, cantidad, calorías y macros), filtrable por fecha y tipo de comida, con resumen de totales.
- **💪 Ejercicio** (dentro de Salud, distinto del subtab "Ejercicio" del shell) — registro ligero de entrenamientos (tipo: cardio/fuerza/flexibilidad/HIIT/deporte/otro, nombre, duración, calorías quemadas estimadas), con gráfica de calorías quemadas de las últimas 2 semanas. **No** es la app completa de rutina de gimnasio — esa es `ejercicio.html` (ver [`readme_ejercicio.md`](readme_ejercicio.md)); esta sección solo sirve para que el gasto calórico entre en el cálculo de calorías netas del día.
- **⚖️ Peso & Medidas** — registro de peso corporal, % de grasa corporal y medidas (cintura, cadera, pecho, brazo, muslo) con cálculo automático de IMC y de masa magra estimada, gráfica de evolución del peso y una segunda gráfica de composición corporal (cintura/brazo/muslo/% grasa). Ampliada el 2026-07-30 — ver detalle abajo.
- **📈 Progreso** — vista consolidada de la evolución hacia las metas.
- **🥩 Rutina Muscular** — contenido de referencia (no editable desde la UI): un plan alimentario detallado para ganar masa muscular con datos personales precargados (peso, estatura, edad, objetivo), calorías/macros objetivo, desglose de desayuno/comida/cena con tablas de alimentos y valores nutricionales, alternativas económicas de proteína/carbohidratos/grasas/verduras, y tips de entrenamiento y descanso. Cada comida del plan se puede registrar directamente en el Registro Diario con un botón.
- **🫁 Salud Digestiva** — contenido de referencia sobre reflujo/agruras: síntomas, alimentos a evitar y recomendados (con la razón fisiológica de cada uno), remedios caseros paso a paso, un plan diario hora por hora, hábitos recomendados, y señales de alerta que ameritan ver a un médico.
- **🩺 Exámenes Médicos** — registro de exámenes de laboratorio y signos vitales con rangos de referencia, chequeos/consultas por especialidad, y un perfil médico general. Responde a "necesito saber todo de mí y cómo estoy" en un solo lugar.
- **🧍 Postura** (nuevo, 2026-07-30 — ver detalle abajo) — ejercicios correctivos, registro de dolor/molestias, contador de pausas activas y tips de ergonomía de escritorio.
- **🧠 Salud Mental** (nuevo, 2026-07-30 — ver detalle abajo) — registro diario de ánimo/estrés con gráfica de tendencia, guía de técnicas para manejar el estrés, y señales de alerta para buscar ayuda profesional.
- **💊 Suplementos** (nuevo, 2026-07-30 — ver detalle abajo) — catálogo de referencia de suplementos relevantes a la meta de masa muscular, lista personal con check-off diario de "tomado hoy".
- **🎯 Perfil & Metas** — configuración del perfil (peso, altura, edad, sexo, nivel de actividad) y metas nutricionales (calorías diarias, proteína, carbohidratos, grasa, vasos de agua, peso objetivo y fecha).

### `#s-examenes` — 🩺 Exámenes Médicos (detalle)

Pedido explícito de Adán ("necesito saber todo de mí y como estoy, lo más completa posible"). Tres piezas, todas dentro de la misma sección (sin subtabs propias, sigue el patrón de `renderRutina()`/`renderDigestiva()`: `<section id="s-examenes">` vacía en el HTML, pintada entera por `renderExamenes()`):

1. **Exámenes de laboratorio y signos vitales** (`S.examenes`) — CRUD igual que Alimentos/Ejercicio/Medidas. Cada registro se captura contra `EXAM_CATALOG`, un catálogo hardcodeado de ~24 marcadores agrupados en 8 categorías (Signos vitales, Biometría hemática, Glucosa y metabolismo, Perfil lipídico, Función renal, Función hepática, Tiroides, Hormonal y vitaminas), cada uno con unidad y rango de referencia general de adulto. El modal (`onExamCatChange()`/`onExamNombreChange()`) también permite un examen **"Otro (personalizado)"** con nombre/unidad libres y sin rango automático. **El rango de referencia se copia al registro al guardarlo** (`refMin`/`refMax`), no se recalcula después — así que cambiar `EXAM_CATALOG` a futuro no altera el historial ya capturado.
   - **Resumen "Cómo estás"**: tabla con el **último valor de cada marcador** (`latestByMarker`, agrupado por `examenId` o por `nombre` si es personalizado) y una etiqueta de estado (`examStatusInfo()`: Normal/Alto/Bajo/Sin rango, por color) — de un vistazo, sin tener que leer el historial completo.
   - **Gráfica de evolución** (`renderExamChart(key)`, Chart.js `line`, reusa `killChart()`) — selector para elegir cualquier marcador con historial y ver su tendencia, con líneas punteadas de referencia (mín./máx.) cuando el marcador tiene rango.
   - **Historial completo** (`renderExamBody()`) — tabla de todos los registros, editar/eliminar igual que el resto de la app.
2. **Chequeos y consultas** (`S.chequeos`) — CRUD de citas médicas por tipo (`CHEQ_TIPOS`: general, dental, oftalmológico, dermatológico, cardiológico, otro), con resultado/diagnóstico, notas y una **próxima cita opcional** — el KPI "📅 Próxima cita" del resumen la toma de aquí (la más próxima con fecha ≥ hoy).
3. **Mi perfil médico** (`S.perfilMedico`) — campos de texto libre sin fecha (tipo de sangre, alergias, medicamentos actuales, condiciones/diagnósticos, cirugías previas, antecedentes familiares, contacto de emergencia), autoguardado `onchange` vía `updatePerfilMedico(key,val)` — mismo patrón que `updatePerfil()`/`updateMeta()` de Perfil & Metas, pero sin re-render completo de la sección (evita perder el foco al escribir en un campo mientras otro ya se guardó).

Termina con un disclaimer fijo: es una bitácora personal, no un diagnóstico, y los rangos son generales.

### `#s-postura` — 🧍 Postura (detalle)

Agregada el 2026-07-30 a petición explícita de Adán, que reportó el subtab de Salud "vacío" y pidió agregar contenido — tras intake uno-por-uno se identificó postura como uno de los temas faltantes (relevante porque pasa muchas horas sentado en su trabajo de ingeniería). Sigue el mismo patrón que `renderRutina()`/`renderDigestiva()`: `<section id="s-postura">` vacía en el HTML, pintada entera por `renderPostura()`. Tres piezas, más contenido de referencia:

1. **Ejercicios correctivos** (`POSTURA_EJERCICIOS`, contenido fijo) — 8 estiramientos/ejercicios reales orientados a quien trabaja sentado (couch stretch, cat-cow, estiramiento de pectoral en marco de puerta, wall angels, face pulls, extensión torácica, chin tuck, glute bridge), cada uno con zona afectada, pasos numerados y un tip explicando el porqué.
2. **Registro de dolor/molestias** (`S.postura.dolores`) — CRUD igual que Alimentos/Ejercicio/Medidas: zona (`ZONAS_DOLOR`), intensidad 1-5, fecha, notas. El KPI "🔥 Dolor promedio" toma el promedio de los últimos 10 registros; "📍 Zona más frecuente" cuenta ocurrencias por zona sobre todo el historial.
3. **Control de pausas activas** (`S.postura.pausas`, un contador por fecha) — botones `+1 pausa`/`−` (`addPausa()`/`quitarPausa()`), meta fija `META_PAUSAS=6` por día, con barra de progreso. Se reinicia solo cada día porque la clave es la fecha de hoy (`pausasHoy()`), igual patrón que `agua` en Dashboard/Alimentos.
4. **Ergonomía de escritorio** (`POSTURA_ERGONOMIA`, contenido fijo) — 6 tips (altura de monitor, apoyo lumbar, pies, codos, regla 30-30, "text neck" del celular).

### `#s-mental` — 🧠 Salud Mental (detalle)

Agregada el 2026-07-30 junto con Postura, por la misma petición. `renderMental()` pinta `<section id="s-mental">`:

1. **Registro diario de ánimo/estrés** (`S.mental.registros`) — modal (`mo-animo`) con ánimo 1-5 (`ANIMO_LABELS`), estrés 1-5 (`ESTRES_LABELS`), causa y notas. `openAnimoModal()` sin `id` busca primero si ya existe un registro con `fecha===today()` y lo edita en vez de duplicarlo — como máximo un registro por día. Gráfica de tendencia (`ch-mental`, Chart.js) de los últimos 20 registros, dos líneas (ánimo/estrés).
2. **Técnicas para manejar el estrés** (`MENTAL_TECNICAS`, contenido fijo) — 8 técnicas con pasos numerados (respiración 4-7-8, box breathing, grounding 5-4-3-2-1, journaling de descarga, caminata sin celular, desconexión digital nocturna, gratitud antes de dormir, ejercicio como regulador — esta última conecta explícitamente con la Rutina Muscular que Adán ya sigue).
3. **Alerta de ayuda profesional** (`MENTAL_ALERTAS`, contenido fijo) — tarjeta roja con 5 señales que ameritan ver a un psicólogo, mismo estilo visual que la alerta médica de Salud Digestiva/Exámenes.

### `#s-suplementos` — 💊 Suplementos (detalle)

Agregada el 2026-07-30 junto con Postura y Salud Mental. `renderSuplementos()` pinta `<section id="s-suplementos">`:

1. **Catálogo de referencia** (`SUPP_CATALOG`, contenido fijo) — 6 suplementos elegidos específicamente por su meta de masa muscular ya definida en Rutina Muscular (proteína whey, creatina monohidratada, vitamina D3, omega 3, multivitamínico, magnesio), cada uno con dosis, momento del día y una nota de precaución. Botón "➕ Agregar a mi lista" (`addFromCatalog(i)`) copia esos valores a `S.suplementos.lista` con un clic.
2. **Mi lista** (`S.suplementos.lista`) — CRUD manual también disponible (`openSuppModal()`/`saveSupp()`/`delSupp()`) para suplementos fuera del catálogo. Cada fila tiene un checkbox de **"tomado hoy"** (`S.suplementos.tomado['YYYY-MM-DD'][id]`, `toggleTomado()`) — se reinicia solo cada día por la misma razón que las pausas activas de Postura.

Los tres cierran con la misma convención visual que Salud Digestiva/Exámenes: `.g3` de tarjetas para contenido de referencia, tabla + modal para lo que sí es un registro del usuario, y un disclaimer de que no sustituye atención profesional donde aplica.

## Modelo de datos — `localStorage['misalud_v1']`

```js
{
  alimentos:  [{ id, fecha:'YYYY-MM-DD', comida:'desayuno|almuerzo|cena|snack',
                 nombre, cantidad, unidad, cal, prot, carbs, gra, notas }],
  ejercicios: [{ id, fecha, tipo:'cardio|fuerza|flexibilidad|hiit|deporte|otro',
                 nombre, duracion_min, cal }],
  medidas:    [{ id, fecha, peso, cintura, cadera, pecho, brazo, muslo, grasa:pct, notas }],
  agua:       { 'YYYY-MM-DD': vasosContados },
  metas:      { caloriasD:2000, proteina:150, carbs:.., grasa:.., vasos:.., pesoObjetivo:.., fechaObjetivo:.. },
  perfil:     { peso, altura, edad, sexo, nivelActividad },
  examenes:   [{ id, fecha, categoria, examenId:'idDeEXAM_CATALOG|""(si es personalizado)',
                 nombre, unidad, valor, refMin:num|null, refMax:num|null, notas }],
  chequeos:   [{ id, fecha, tipo:'general|dental|oftalmologico|dermatologico|cardiologico|otro',
                 resultado, proxima:'YYYY-MM-DD'|'', notas }],
  perfilMedico: { tipoSangre, alergias, medicamentos, condiciones, cirugias, antecedentesFamiliares, contactoEmergencia },
  postura: {
    dolores: [{ id, fecha, zona:'cuello|hombros|espalda_alta|espalda_baja|cadera|rodillas|otro', intensidad:1-5, notas }],
    pausas:  { 'YYYY-MM-DD': contadorDePausas }
  },
  mental: {
    registros: [{ id, fecha, animo:1-5, estres:1-5, causa, notas }]   // máx. 1 por fecha, ver openAnimoModal()
  },
  suplementos: {
    lista:   [{ id, nombre, dosis, momento:'am|pre|post|pm|cualquiera', notas }],
    tomado:  { 'YYYY-MM-DD': { idDeSuplemento: true } }
  }
}
```

## Funcionalidad clave

- **CRUD** de alimentos, ejercicios, medidas, exámenes médicos, chequeos, dolor/molestias de postura, registros de ánimo/estrés y suplementos — todos con modales y confirmación antes de eliminar (`askDel()`/`doConf()`/`closeConf()`, compartido).
- **Cálculo de IMC y composición corporal**: `calcIMC()`/`imcLabel()` calculan y clasifican el IMC; `renderMedidas()` también estima la masa magra (`peso*(1-grasa/100)`) cuando hay dato de % de grasa corporal.
- **Contador de agua**: `toggleVaso()`/`resetAgua()` llevan el conteo de vasos de agua del día.
- **Contadores diarios reseteables por fecha**: mismo patrón usado tres veces en el archivo — `agua` (por vaso), `postura.pausas` (por pausa activa) y `suplementos.tomado` (por suplemento) — todos son objetos `{ 'YYYY-MM-DD': ... }`, se "reinician" solos cada día porque la clave es la fecha de hoy, no requieren limpieza manual.
- **Catálogo de exámenes** (`EXAM_CATALOG`, `CHEQ_TIPOS`, `CAT_OTRO`): ~24 marcadores de laboratorio con rango de referencia general por adulto, más la opción de examen personalizado. `examStatusInfo(e)` clasifica cualquier registro en Normal/Alto/Bajo/Sin rango.
- **Contenido nutricional/físico personalizado**: "Rutina Muscular", "Salud Digestiva", "Postura" (ejercicios/ergonomía) y "Salud Mental" (técnicas) contienen información específica y curada (peso 75kg, estatura 1.78m, edad 31 años, objetivo ganar masa muscular, reflujo digestivo, trabajo sentado) — es contenido de referencia escrito directamente en el código, no datos que se editen desde la interfaz.
- **`today()`** usa `new Date().toISOString().slice(0,10)` (UTC) — misma convención que el resto del proyecto, importante si algún día se cruza esta clave con otro archivo.
- **Exportar datos**: botón en la barra lateral descarga un JSON de respaldo (incluye todas las claves de `S`, incluidas las nuevas — `exportData()` serializa el objeto completo, no requiere mantenimiento al agregar secciones).

## Actualización de peso y metas nutricionales (2026-07-31)

Adán reportó peso actual de 77 kg (antes 75 kg, el valor con el que se había construido originalmente la "Rutina Muscular"). Se actualizó todo el contenido de referencia que dependía de ese número, recalculando con la misma fórmula que ya usa la calculadora de TDEE en vivo de `#s-metas` (Harris-Benedict + factor de actividad "moderado" 1.55) y la misma proporción de proteína (2.4 g/kg):
- `S.perfil.peso` por defecto: 75→77. `S.metas` por defecto: calorías 2,835→3,115 kcal, proteína 183→186 g, carbohidratos 357→404 g, grasa 77→86 g (`renderMetas()`, seed inicial en `init()`).
- **`#s-rutina` "Rutina Muscular"** (`renderRutina()`): tarjeta de perfil actualizada a 77 kg; `tCal/tProt/tCarb/tGra` recalculados; el desglose por comida y `PLAN_ITEMS` (los alimentos reales de cada comida) se ajustaron para que la suma siga cuadrando exacto con los nuevos totales — se agregó 1 plátano más al desayuno (2→3) y se subió el arroz de la comida (1.5→2 tazas) más 2 cdtas de aceite de oliva extra, en vez de escalar cada alimento proporcionalmente (más realista para una dieta real). El tip "Superávit controlado" ahora dice mantenimiento ≈2,790 kcal/día y superávit +325 kcal (antes ≈2,520 / +315 — la cifra de mantenimiento nueva sí sale de aplicar la fórmula de Harris-Benedict real, a diferencia de la original que era una aproximación manual).
- La nota del suplemento de proteína whey en `SUPP_CATALOG` también se actualizó (183g→186g/día).
- **Importante**: estos son solo los valores *por defecto* (contenido de referencia y el seed que se usa si `localStorage` está vacío). Si Adán ya tiene su propio peso/metas guardados en `misalud_v1` de una sesión anterior, este cambio **no los sobreescribe** — tiene que actualizar su peso a mano en `#s-metas` → "Mi Perfil" → "Peso actual (kg)" (o agregar un registro nuevo en "⚖️ Peso & Medidas") para que su app en el navegador reales refleje 77 kg.
- `comida.html` también actualizó su banner de contexto con las mismas cifras (~3,115 kcal / ~186 g proteína) — ver [`readme_comida.md`](readme_comida.md).

## Rediseño de interfaz (2026-07-31)

Mismo tratamiento visual que `ejercicio.html` (ver el detalle completo en [`readme_ejercicio.md`](readme_ejercicio.md) → "Rediseño de interfaz") — se quitaron manchas radiales de fondo, `backdrop-filter: blur`, texto con gradiente (`.sb-logo h1`, `.sh h2`) y glow de neón en botones, sin tocar HTML/JS ni los valores de las variables de color (`--g`, `--o`, `--b`, `--p`, `--w`, `--r`), que el JS sigue usando inline en decenas de lugares. Los dos banners de contenido con degradado de dos colores ("Rutina Muscular" y "Salud Digestiva") se aplanaron a un solo tono. Verificado con jsdom navegando las 13 secciones sin errores de consola.

## Modo oscuro/claro (2026-07-31)

Botón `.theme-toggle-btn` en el topbar. Mismo mecanismo que `ejercicio.html` (`--surface`/`--surface-2`/`--surface-3` reemplazando los hex sólidos del rediseño de arriba, truco `--ov` para bordes/hovers — ver `../README.md`). Este archivo tiene **7 gráficas Chart.js** (`ch-ej`, `ch-peso`, `ch-comp`, `ch-cal14`, `ch-exam`, `ch-mental`, y la legend de `ch-comp`) — todas tenían el mismo patrón roto: `borderColor:'var(--g)'`/`'var(--o)'`/etc., `pointBorderColor:'#060614'` y grid/ticks con `rgba(255,255,255,.06)`/`'#4a5568'`/`'#8892b0'` hardcoded (colores del tema oscuro copiados igual en las 7, sin ser theme-aware). Se agregó `cssVar(n)` (lee `getComputedStyle` al crear cada gráfica) y se reemplazaron todos esos valores: `cssVar('--g')`, `cssVar('--surface-2')` (en vez del `#060614` fijo, para que el borde del punto combine con la tarjeta en cualquier tema), `cssVar('--text3')`/`cssVar('--text2')` para ticks/leyenda. `toggleTheme()` vuelve a llamar al render de la sección activa para redibujar la gráfica visible de inmediato. Verificado con jsdom: las 13 secciones cargan sin error en ambos temas (con `Chart` simulado).

## Referencias cruzadas

- Incrustada vía `<iframe>` en [`readme_cuidadopersonal.md`](readme_cuidadopersonal.md) (subtab "Cuidado de la Salud"). El shell no puede tocar el DOM/JS de este archivo (iframe cross-document), pero **sí comparte `localStorage`** porque ambos se sirven desde `file://` (ver la nota de origen compartido en `readme_cuidadopersonal.md`).
- El **Dashboard** (`../Dashboard/dashboard.html`) lee `misalud_v1` directamente (`D.sal`): `renderHero()` usa `alimentos` (calorías de hoy en el panel de nutrición) y `medidas`/`agua`/`metas`; `renderQuickApps()` usa `alimentos` para el dato de calorías de hoy en la píldora de acceso rápido. Si cambias la forma de `S.alimentos`/`S.medidas`/`S.metas` aquí, revisa esas dos funciones en `Dashboard/dashboard.html`. **`S.examenes`/`S.chequeos`/`S.perfilMedico`/`S.postura`/`S.mental`/`S.suplementos` no los lee el Dashboard todavía** — si en el futuro se quiere una alerta ahí, hay que agregarla a mano en `loadAll()` y en la función de slide correspondiente.
- Mapa completo del proyecto: [`../README.md`](../README.md).

## Cómo usarlo

Se abre `CuidadoPersonal/cuidadopersonal.html` (subtab Cuidado de la Salud) o directamente `salud.html` en cualquier navegador, sin instalación ni servidor. No hay sincronización entre dispositivos salvo mediante exportación manual del JSON.
