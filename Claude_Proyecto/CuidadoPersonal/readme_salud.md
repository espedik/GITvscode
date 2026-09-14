# salud.html — Mi Salud: Cuerpo & Bienestar

**Reestructurada el 2026-08-02** (ver sección dedicada más abajo) — pedido explícito de Adán: *"quita alimentacion plan semanal, registro diario, actividad ejercicio, seguimiento progreso, lo de rutina muscular... enriqueser la seccion de comida"*. Ya **no** es la app de nutrición/nutrición — todo lo de alimentación (registro diario, plan semanal, plan de masa muscular) vive ahora en [`comida.html`](comida.html) / [`readme_comida.md`](readme_comida.md). Salud se quedó enfocada en **cuerpo y bienestar**: peso/medidas corporales, un registro de historial médico (exámenes de laboratorio, chequeos y perfil médico), postura, salud mental y suplementos, más una guía de referencia de salud digestiva. Es de una sola página (HTML+CSS+JS, sin backend); los datos se guardan en `localStorage` (clave `misalud_v1`, **compartida y escrita también por `comida.html`** desde la reestructuración — ver abajo).

**Ubicación actual**: vive en `CuidadoPersonal/salud.html` (movida aquí el 2026-07-29 desde `Salud/salud.html`, sin cambios de código — solo de carpeta). Se abre normalmente **incrustada** dentro de `CuidadoPersonal/cuidadopersonal.html` → subtab **🥗 Cuidado de la Salud**, vía `<iframe src="salud.html">`. También puede abrirse directo (`CuidadoPersonal/salud.html`) sin pasar por el shell — funciona igual, es 100% autocontenida.

## Dashboard — "Tu salud, hoy y este año"

**El eje es doble: HOY y ESTE AÑO.** Adán, 2026-09-01: *"ahora mejorame la de cuidado de la
salud, hazme un diseño con mismas especificaciones"* — las de Skincare y Cabello.

Antes eran cuatro tarjetas de cifra y dos paneles medio vacíos: el 40% de una pantalla de
1600px, con "sin registrar" en casi todo. Y sobre todo, **la app pedía datos que el proyecto ya
tenía**: Suplementos arrancaba con *"Mi lista: 0"* mientras `RUTINA_TASKS` le hace tomar seis
todos los días con sus dosis.

### Qué hay en la pantalla

1. **La cabecera común** (`cpCabecera`, ver `cabecera.js`) con cuatro cifras: suplementos de
   hoy, racha con todos tomados, exámenes pendientes y último peso con su IMC. Hasta el
   2026-09-14 debajo iba otro título "Tu salud, hoy y este año" con tres KPI que repetían
   estos: se quitó.
2. **Hoy** (`.sd-hero`), lo primero: los suplementos partidos en **con el desayuno** / **antes de
   dormir**, con la dosis y la condición al lado, marcables con un clic. Y el bloque de **agua y
   pausas**, con los vasos clicables. El pie de la noche lee el registro de Mi Comida
   (`misalud_v1.alimentos`) y dice si la whey toca hoy: *"llevas 142 g de 186, faltan 44"*. Sin
   registro no se inventa nada.
3. **Tu chequeo del año** (`sdChequeoHtml`, compartido con la pestaña de Exámenes): los 9
   análisis con su estado — nunca / vence / al día / no aplica —, en qué condiciones se toman
   (ayuno, antes de las 10 am) y **por qué le tocan a él**. Tocar el estado marca que se lo hizo
   hoy; se guarda en `S.chequeo`, aparte de `S.examenes` (que guarda VALORES).
4. **Peso y composición**: con menos de 3 registros no dibuja curva — una línea con un punto es
   peor que ninguna — sino una barra entre el peso inicial y la meta. La misma barra sustituye a
   las dos gráficas en la pestaña de Peso mientras haya menos de 3 pesajes. Desde el 2026-09-02
   los pesajes y la meta vienen de `CIFRAS.PESO` — ver "El peso vive en los datos maestros".
5. **Tu botiquín** (`sdBotiquinHtml`, compartido con Suplementos): lo que dura cada envase y
   **cuántos días quedan** — en rojo bajo 14 —, más el **costo mensual: $1,130**.
6. **Las 5 reglas que sí mueven la aguja**. (Hasta el 2026-09-02 también estaba aquí la tarjeta
   **Bienestar de la semana** — ver "Fuera la tarjeta de Bienestar de la semana" al final.)

### Los datos vienen del maestro

`salud.html` carga `../Dashboard/datos-maestros.js` y usa `CIFRAS.SUPLEMENTOS` y `CIFRAS.CHEQUEO`.

- **La lista se siembra sola** en `init()`, con bandera `S.seedSupl` de una sola vez: si Adán
  borra un suplemento, no vuelve. Mismo patrón que el pesaje inicial.
- **El catálogo dejó de estar escrito a mano**: `suppCatalog()` lo arma desde el maestro, y el
  texto de la whey resuelve `{{proteinaMeta}}` con `CIFRAS.texto()` en vez de llevar "186g/día"
  escrito.
- El **control 13** del verificador comprueba nombre **y momento** contra `RUTINA_TASKS`.

### Dos detalles que costó encontrar

**`activa` no era global.** Era una `const` local dentro de otra función, así que
`RENDERS[activa]?.()` lanzaba `ReferenceError` desde cualquier `onclick`: los clics guardaban en
`localStorage` pero la pantalla no se repintaba. Ahora todo pasa por `sdRepintar()`, que busca la
sección con clase `.active`. De paso `init()` arranca con `nav('dashboard')` en vez de llamar al
render directo, para que la sección quede marcada.

**El terciario no se leía.** `--text3` daba **2.35:1 en oscuro** y 3.64:1 en claro, medido
componiendo toda la pila de capas translúcidas. Con texto de 9-10px eso no se lee. Subido a
`#7a8699` y `#6f7286`: **4.74:1 en los dos temas** en el peor caso. Afecta a las 8 secciones,
para bien.

## Navegación (sidebar propio de este archivo)

- **📊 Dashboard** — **rediseñado el 2026-08-02** (ver abajo): ya no muestra calorías/macros/comidas de hoy (eso vive en Comida). Ahora resume lo que Salud sí administra: peso actual (con tendencia vs. el registro anterior), vasos de agua, pausas activas de hoy, suplementos tomados hoy, próxima cita médica, y un mini-resumen de bienestar (ánimo de hoy + dolor/molestia reciente). Incluye un banner fijo arriba con link directo a `comida.html` para lo de nutrición.
- **⚖️ Peso & Medidas** — cuatro KPI (peso actual, IMC, % grasa, meta), la gráfica **IMC por edad** con tu punto y tu meta (ver sección propia), la franja "De los 25 a los 35", y el registro de peso corporal, % de grasa y medidas (cintura, cadera, pecho, brazo, muslo) con IMC y masa magra estimada, gráfica de evolución del peso y una segunda de composición corporal (cintura/brazo/muslo/% grasa). Los pesajes vienen del maestro (`CIFRAS.PESO`).
- **🫁 Salud Digestiva** — contenido de referencia sobre reflujo/agruras: síntomas, alimentos a evitar y recomendados (con la razón fisiológica de cada uno), remedios caseros paso a paso, un plan diario hora por hora, hábitos recomendados, y señales de alerta que ameritan ver a un médico. Se quedó aquí (y no se movió a Comida) porque es guía médica de referencia, no un tracker de alimentos — aunque sí informa qué recetas se eligieron en `comida.html`.
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
  },

  // Campos que este archivo YA NO declara por defecto ni edita desde su UI, pero que
  // pueden seguir presentes en la clave real si comida.html ya los escribió — load()
  // los preserva igual vía spread, aunque salud.html no los toque. Ver "Reestructuración
  // 2026-08-02" más abajo.
  alimentos:  [{ id, fecha, comida:'desayuno|almuerzo|cena|snack', nombre, cantidad, unidad, cal, prot, carbs, gra, notas }]
}
```

## Funcionalidad clave

- **CRUD** de medidas, exámenes médicos, chequeos, dolor/molestias de postura, registros de ánimo/estrés y suplementos — todos con modales y confirmación antes de eliminar (`askDel()`/`doConf()`/`closeConf()`, compartido).
- **Cálculo de IMC y composición corporal**: `calcIMC()`/`imcLabel()` calculan y clasifican el IMC; `renderIMCEdad()` pinta la gráfica de IMC por edad (abajo); `renderMedidas()` también estima la masa magra (`peso*(1-grasa/100)`) cuando hay dato de % de grasa corporal.
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

## Reestructuración — nutrición se mudó a Comida (2026-08-02)

Pedido explícito de Adán: *"en cuidado de la salud, quita alimentacion plan semanal, registro diario, actividad ejercicio, seguimiento progreso, lo de rutina muscular... deberias poner o enriqueser la seccion de comida... quiero la interfaz mas visual y agrega cosas que falten"*. Se quitaron **5 secciones completas** de este archivo:

| Sección quitada | Qué pasó con su contenido |
|---|---|
| 🍽️ Plan Semanal (`renderPlan()`) | Reemplazada por un **Plan Semanal nuevo y distinto** en `comida.html` — el viejo era retrospectivo (mostraba lo ya comido); el nuevo es hacia adelante (eliges qué vas a cocinar cada día). No se portó código, se rediseñó el concepto. |
| 🥗 Registro Diario (`renderAlimentos()` + CRUD) | **Se movió tal cual** a `comida.html` → "📔 Registro Diario" — mismo CRUD, mismos campos, sigue escribiendo `misalud_v1.alimentos` (ver abajo). |
| 💪 Ejercicio ligero (`renderEjercicio()`/`renderEjChart()` + CRUD) | **Eliminado sin reemplazo** — era redundante con `ejercicio.html` (Mi Rutina), que ya cubre cardio/fuerza de verdad. No se movió a ningún lado. |
| 📈 Progreso (`renderProgreso()`, gráfica de calorías 14 días) | **Eliminado sin reemplazo** — dependía de `S.alimentos`/`S.ejercicios`, ya no administrados aquí. |
| 🥩 Rutina Muscular (`renderRutina()` + `PLAN_ITEMS` + `registrarRutinaMeal()`) | **Se movió tal cual** a `comida.html` → "🥩 Plan Masa Muscular" — es contenido de nutrición (qué comer para ganar músculo), no de ejercicio, así que su lugar real siempre fue el recetario. |

**Por qué Salud Digestiva y Suplementos se quedaron** (no los mencionó Adán explícitamente, y son distintos de lo que sí pidió quitar): Salud Digestiva es guía médica de referencia (síntomas/alertas), no un tracker de comida — aunque informa las recetas de Comida, no se solapa con ellas. Suplementos es una lista de pastillas/polvos con check-off diario — más cercano a un hábito de salud que a "comida".

**Dashboard interno rediseñado** (`renderDashboard()`): antes mostraba calorías/macros/comidas/ejercicio de hoy (4 paneles de nutrición); ahora muestra 4 KPIs propios de Salud (peso actual con tendencia, agua hoy, pausas activas hoy, suplementos tomados hoy) + 2 paneles (próxima cita médica, bienestar del día: ánimo + dolor reciente) + un banner fijo arriba señalando que la nutrición vive en `comida.html`. Las funciones `getTodayAl()`/`getTodayEj()`/`sumCal()`/`sumProt()`/`sumCarbs()`/`sumGra()`/`macroBar()` se eliminaron por quedar sin uso.

**`S.alimentos`/`S.ejercicios`/`S.plan` se quitaron del objeto `S` por defecto** de este archivo (ya no los declara ni los edita) — pero si `misalud_v1` real ya tenía `alimentos` (porque `comida.html` los escribió), `load()` los sigue trayendo a `S` vía spread y `save()` los sigue conservando intactos sin tocarlos. No hay pérdida de datos, solo Salud dejó de ser quien los administra.

**Menú lateral simplificado**: de 13 secciones a 8, con nombres cortos desde el 2026-09-14 porque el carril del shell los pinta bajo un icono de 18 px en 60 px de ancho (`Hoy, Peso y medidas, Digestión, Exámenes, Postura, Mente, Suplementos, Perfil y metas`; los ids no cambiaron: `dashboard, medidas, digestiva, examenes, postura, mental, suplementos, metas`). `STITLE` usa los mismos nombres. El botón rápido del topbar cambió de "+ Registrar comida" a "+ Pesarme hoy" (`openMedidaModal()`).

Probado con Playwright (Chromium headless): las 8 secciones cargan sin errores de consola, el nuevo Dashboard muestra datos reales, y no quedó ninguna referencia colgante a IDs/funciones eliminadas (verificado con grep sistemático antes de dar por terminado).

## Fix: Dashboard no mostraba el peso actual (2026-08-01)

Adán reportó "en el dashboard no pones mi peso actual". Causa real: el Hero del Dashboard (`renderHero()` → fila de estadísticas rápidas) lee `D.sal.medidas` — el **historial de pesajes** registrado en "⚖️ Peso & Medidas" — no `D.sal.perfil.peso` (que solo alimenta el cálculo de calorías de las Metas). La actualización de peso del 2026-07-31 solo tocó `S.perfil.peso`; `S.medidas` seguía vacío (`[]`) porque nunca se había registrado un pesaje real ahí, así que el Dashboard mostraba "—" / "Sin registros en Salud" con toda razón — no era un bug del Dashboard, era que faltaba el dato de origen.

**Fix en `init()`**: si `S.medidas` está vacío, se siembra un primer registro (`{peso, fecha:today(), notas:'Peso inicial (seed)'}`) usando `S.perfil.peso` si ya existe (o 77 si tampoco hay perfil todavía) — igual que ya se hacía con el perfil, pero como chequeo **independiente** (no anidado dentro del `if` de perfil), para que también aplique si Adán ya tenía un perfil guardado de antes pero nunca un pesaje. Si ya existe al menos un registro real en `S.medidas`, el seed no hace nada — nunca sobreescribe datos reales.

**Importante para que se vea en el Dashboard**: este seed corre dentro de `salud.html`, que es quien escribe `misalud_v1` — hay que abrir Cuidado de la Salud (directo o vía `cuidadopersonal.html?tab=salud`) **al menos una vez en el mismo navegador** después de esta actualización para que el registro se guarde; recién entonces el Dashboard lo va a leer. Abrir el Dashboard solo, sin haber abierto Salud primero, no dispara el seed (el Dashboard nunca escribe `misalud_v1`, solo lee).

## Rediseño de interfaz (2026-07-31)

Mismo tratamiento visual que `ejercicio.html` (ver el detalle completo en [`readme_ejercicio.md`](readme_ejercicio.md) → "Rediseño de interfaz") — se quitaron manchas radiales de fondo, `backdrop-filter: blur`, texto con gradiente (`.sb-logo h1`, `.sh h2`) y glow de neón en botones, sin tocar HTML/JS ni los valores de las variables de color (`--g`, `--o`, `--b`, `--p`, `--w`, `--r`), que el JS sigue usando inline en decenas de lugares. Los dos banners de contenido con degradado de dos colores ("Rutina Muscular" y "Salud Digestiva") se aplanaron a un solo tono. Verificado con jsdom navegando las 13 secciones sin errores de consola.

## Modo oscuro/claro (2026-07-31)

Botón `.theme-toggle-btn` en el topbar. Mismo mecanismo que `ejercicio.html` (`--surface`/`--surface-2`/`--surface-3` reemplazando los hex sólidos del rediseño de arriba, truco `--ov` para bordes/hovers — ver `../README.md`). Este archivo tiene **7 gráficas Chart.js** (`ch-ej`, `ch-peso`, `ch-comp`, `ch-cal14`, `ch-exam`, `ch-mental`, y la legend de `ch-comp`) — todas tenían el mismo patrón roto: `borderColor:'var(--g)'`/`'var(--o)'`/etc., `pointBorderColor:'#060614'` y grid/ticks con `rgba(255,255,255,.06)`/`'#4a5568'`/`'#8892b0'` hardcoded (colores del tema oscuro copiados igual en las 7, sin ser theme-aware). Se agregó `cssVar(n)` (lee `getComputedStyle` al crear cada gráfica) y se reemplazaron todos esos valores: `cssVar('--g')`, `cssVar('--surface-2')` (en vez del `#060614` fijo, para que el borde del punto combine con la tarjeta en cualquier tema), `cssVar('--text3')`/`cssVar('--text2')` para ticks/leyenda. `toggleTheme()` vuelve a llamar al render de la sección activa para redibujar la gráfica visible de inmediato. Verificado con jsdom: las 13 secciones cargan sin error en ambos temas (con `Chart` simulado).

## Responsivo — iPad / iPhone 15 Pro (2026-08-03)

Trabajo puramente de CSS (sin tocar JS, estructuras de datos ni claves de `localStorage`), verificado con Playwright (Chromium headless) en dos viewports — iPad `820×1180` y iPhone 15 Pro `393×852` (`isMobile`/`hasTouch`) — abriendo el archivo directo por `file://` (no solo dentro del iframe de `cuidadopersonal.html`).

El archivo ya traía dos breakpoints (`@media(max-width:900px)` colapsa `.g4`/`.g3` a 2 columnas; `@media(max-width:640px)` mete el sidebar como overlay y colapsa `.g4`/`.g3`/`.g2`/`.fr` a 1 columna), que en teoría ya cubrían iPad (820px) y iPhone (393px). En la práctica había dos fugas de overflow horizontal real, ambas por la misma causa raíz — cajas que **no** tienen `overflow` propio pero cuyo tamaño mínimo automático (`min-width:auto`, el default del navegador) se calcula a partir del contenido de un descendiente en vez de encogerse al espacio disponible:

1. **`.main` es flex item de `body{display:flex}`.** Con `min-width:auto` (default), el ancho mínimo de `.main` no era 0 sino el ancho mínimo de su contenido — en concreto, las tablas con columnas `white-space:nowrap` (fecha en ⚖️ Peso & Medidas, 🩺 Exámenes Médicos) tienen un ancho mínimo mayor al viewport. Eso empujaba a `.main` (y por lo tanto a todo el documento) a crecer más allá del viewport, en vez de dejar que `.tw{overflow-x:auto}` hiciera scroll horizontal *solo dentro de la tabla* como estaba pensado. Con la tabla de Peso & Medidas esto desbordaba tanto iPad (+159px) como iPhone (+238px). **Fix**: `.main{min-width:0}` — un solo cambio, resuelve el mismo problema en cualquier tabla ancha presente o futura.
2. **Los grids `.g4`/`.g3`/`.g2`/`.fr` tienen hijos con `min-width:auto` implícito** (el equivalente de la trampa anterior pero para CSS Grid en vez de Flexbox: un grid item no se encoge por debajo de su contenido aunque la columna sea `1fr`). Esto seguía desbordando iPad incluso después del fix de `.main`: el `<canvas>` de Chart.js de "📏 Composición corporal" dentro de `.g2` (Peso & Medidas) no se encogía a la mitad de la columna y se salía 118px a la derecha del viewport. **Fix**: `.g4>*,.g3>*,.g2>*,.fr>*{min-width:0}` agregado como bloque nuevo antes de `</style>`, más `canvas{max-width:100%}` como red de seguridad general (cubre cualquier gráfica Chart.js futura dentro de un grid, no solo `ch-comp`).

Verificado sección por sección (`SECS` = dashboard, medidas, digestiva, examenes, postura, mental, suplementos, metas) en ambos viewports: `document.documentElement.scrollWidth - clientWidth === 0` en los 16 casos, cero errores de consola. También se abrieron los 6 modales (`mo-med`, `mo-exam`, `mo-cheq`, `mo-dolor`, `mo-animo`, `mo-supp`) y el sidebar en modo overlay (iPhone) — mismo resultado limpio. Se re-corrió `test_salud.js` (el test funcional preexistente) sin regresiones: las 8 secciones navegan bien y el modal de "+ Pesarme hoy" sigue abriendo desde el botón rápido del topbar.

## Referencias cruzadas

- Incrustada vía `<iframe>` en [`readme_cuidadopersonal.md`](readme_cuidadopersonal.md) (subtab "Cuidado de la Salud"). El shell no puede tocar el DOM/JS de este archivo (iframe cross-document), pero **sí comparte `localStorage`** porque ambos se sirven desde `file://` (ver la nota de origen compartido en `readme_cuidadopersonal.md`).
- El **Dashboard** (`../Dashboard/dashboard.html`) lee `misalud_v1` directamente (`D.sal`): `renderHero()` usa `alimentos` (calorías de hoy en el panel de nutrición) y `medidas`/`agua`/`metas`; `renderQuickApps()` usa `alimentos` para el dato de calorías de hoy en la píldora de acceso rápido. **Desde el 2026-08-02, `alimentos` ya no lo escribe este archivo — lo escribe `comida.html`** (mismo formato exacto, ver [`readme_comida.md`](readme_comida.md)); el Dashboard no tuvo que cambiar nada porque solo le importa la clave `misalud_v1`, no quién la escribe. Si cambias la forma de `S.alimentos`/`S.medidas`/`S.metas`, revisa `renderHero()`/`renderQuickApps()` en `Dashboard/dashboard.html` **y** `renderRegistro()`/`registrarReceta()`/`registrarRutinaMeal()` en `comida.html`. **`S.examenes`/`S.chequeos`/`S.perfilMedico`/`S.postura`/`S.mental`/`S.suplementos` no los lee el Dashboard todavía** — si en el futuro se quiere una alerta ahí, hay que agregarla a mano en `loadAll()` y en la función de slide correspondiente.
- **`comida.html` escribe en la clave de este archivo** (`misalud_v1.alimentos`), no solo en la propia (`comida_v1`) — mismo patrón ya establecido desde el 2026-07-30. El CRUD completo del Registro Diario amplió esa superficie el 2026-08-02 y volvió a reducirla el **2026-09-02**, cuando esa sección se quitó de Comida: hoy escriben solo `registrarReceta()` y `registrarRutinaMeal()`. Ver [`readme_comida.md`](readme_comida.md) → "Fuera el Registro Diario y el Plan Semanal".
- Mapa completo del proyecto: [`../README.md`](../README.md).

## Cómo usarlo

Se abre `CuidadoPersonal/cuidadopersonal.html` (subtab Cuidado de la Salud) o directamente `salud.html` en cualquier navegador, sin instalación ni servidor. No hay sincronización entre dispositivos salvo mediante exportación manual del JSON.

## Fix: agregar un suplemento del catálogo dos veces lo duplicaba (2026-08-05)

Encontrado en una auditoría general del ecosistema pedida por Adán ("mejora todos los html, ve funciones o cosas que les falten"). `addFromCatalog(i)` (botón "➕ Agregar a mi lista" de Suplementos) hacía `push()` directo sin comprobar si ese suplemento del `SUPP_CATALOG` ya estaba en `S.suplementos.lista` — un doble clic (o volver a pulsar el mismo suplemento) creaba una fila duplicada, cada una con su propio checkbox independiente de "tomado hoy". Fix: `if(S.suplementos.lista.some(x=>x.nombre===s.nombre)) return toast('Ya está en tu lista')` antes del `push()`. Verificado con Playwright: agregar el mismo suplemento del catálogo dos veces deja la lista en 1 solo ítem; cero errores de consola.

## Deep-link `?tab=` para enlazar directo a una pestaña (2026-08-07)

Necesario para que las nuevas tareas de suplementos AM/PM de `RUTINA_TASKS` (Coach y Dashboard, ver `readme_coach.md`/`readme_dashboard.md` misma fecha) pudieran enlazar directo a la pestaña Suplementos en vez de a la pantalla de inicio — mismo patrón que ya usaban `cuidadopersonal.html` (`?tab=cabello`) y `comida.html` (`?s=desayunos`/`?s=cenas`), que `salud.html` no tenía todavía.

- `init()` ahora lee `new URLSearchParams(location.search).get('tab')` y, si el valor está en `SECS` (las 8 secciones válidas: dashboard, medidas, digestiva, examenes, postura, mental, suplementos, metas), llama `nav(tabInicial)` en vez de `renderDashboard()` por defecto.
- Usado ahora mismo por `salud.html?tab=suplementos` desde las tareas de rutina; queda disponible para cualquier otro link futuro hacia una pestaña específica de esta app.
- Verificado con Playwright: `salud.html?tab=suplementos` abre directo con "💊 Suplementos" como título activo y la sección `#s-suplementos` marcada `active` (en vez de caer en el Dashboard por defecto); sin parámetro, el comportamiento no cambió; cero errores de consola.

## El enlace al Dashboard vive en la `.topbar` (2026-08-18)

*"hay botones dashboard que ni si quiera van acorde a la interfaz del html, osea sobre ponen a otros botones y eso esta mal, debe ser parte de la interfaz de todos"*.

El bloque flotante `#btnVolverDash` (`position:fixed`, fondo oscuro propio, z-index 9999) que se había insertado esta mañana **se encimaba sobre el botón "+ Pesarme hoy"** y no seguía el tema de este archivo. Se retiró junto con su `<style>`: ahora el enlace es un botón redondo con el 🚀 antes del de tema, con la clase `.theme-toggle-btn` que ya usan sus vecinos, así que hereda tema y estilos sin CSS nuevo.

Detalle completo y medición en `../Dashboard/readme_dashboard.md` → "El botón de Dashboard deja de flotar".

## Fuera la tarjeta de Bienestar de la semana (2026-09-02)

Petición directa de Adán: *"elimina esta parte de salud, solo esa parte"*, señalando la tarjeta 🧠 **Bienestar de la semana** del Dashboard — la tira de lunes a domingo con la carita del ánimo de cada día, su botón "Ver todo" y los dos avisos de abajo (las 5 h 40 de sueño entre semana y las 28 h al volante).

Se borró `sdBienestarHtml()` con sus constantes `SD_DIAS`/`SD_CARA`, el CSS que solo ella usaba (`.sd-sem`, `.sd-sd`/`.sd-sd-l`/`.sd-sd-c`/`.sd-sd-v` y el modificador naranja `.sd-rule-n.al` del aviso de sueño) y su llamada en `renderDashboard()`, que ahora deja la columna izquierda con solo el chequeo del año: `d-izq.innerHTML = sdChequeoHtml()`. Se conserva `.sd-rule*` — lo sigue usando "💡 Lo que sí mueve la aguja", en la columna derecha.

**El dato no se toca.** `S.mental.registros` es de la pestaña 🧠 **Salud Mental** (`nav('mental')`), que sigue igual: registra el ánimo del día, lo lista y lo grafica. Lo que desapareció es su **resumen** en el Dashboard, no la función de registrarlo. Los dos avisos que iban al pie de esa tarjeta eran texto fijo, no calculado: el de sueño sigue documentado en [`readme_cuidadopersonal.md`](readme_cuidadopersonal.md) y [`../Coach/readme_coach.md`](../Coach/readme_coach.md), y las 6 pausas de postura del día las sigue explicando la propia pestaña de 🧍 Postura.

**Verificado** (Chromium headless, `file://`): `cuidadopersonal.html?tab=salud` pinta el dashboard completo sin la tarjeta, con las dos columnas equilibradas y **cero mensajes de consola**; el `<script>` principal pasa `node --check`.

## El peso vive en los datos maestros (2026-09-02)

Adán, sobre la tarjeta de Peso y composición: *"en esa seccion es subir a 80 kg pero el peso es
para masa muscular y bajar panza, tal vez en esta seccion puedes hacer registros de mi peso, no te
los dare cada mes, te los dare cada que me acuerde y anotamos la fecha, ademas no quiero que esos
registros se pierdan, entonces los anotas en variables maestras"*.

**El problema real**: los pesajes vivían en `misalud_v1.medidas`, o sea **en un navegador**.
Limpiar los datos del sitio, cambiar de equipo o abrir desde el celular y el histórico se perdía
entero — y el único registro que había era un *seed* de arranque, no un pesaje de verdad.

Ahora el histórico es [`PESO`](../Dashboard/datos-maestros.js) en los datos maestros, versionado
en el repositorio:

```js
const PESO = {
  alturaCm: 178,
  metaKg:   80,                                  // "es subir a 80 kg"
  objetivo: 'Ganar masa muscular y bajar panza',
  registros: [ { fecha:'2026-09-02', kg:75, nota:'…' },      // cintura/brazo/muslo/grasa opcionales
               { fecha:'2026-09-13', kg:78, nota:'…' } ],
  // ultimo, actualKg, inicioKg, faltanKg, imc, cinturaUltima — todos derivados
};
```

Ojo con un hueco que hubo: este bloque estuvo documentado aquí desde el 2-sep pero **nunca llegó a
`datos-maestros.js`** — la app caía a su respaldo y enseñaba "configura tu meta". Entró al maestro
el 2026-09-13 junto con el segundo pesaje (78 kg) y `PROYECTO.nacimiento`, de donde salud y el
Dashboard sacan la edad. Si el verificador o la app vuelven a decir que no hay `CIFRAS.PESO`, el
problema es el maestro, no este archivo.

**Cómo se conectan las dos verdades.** `init()` siembra `PESO.registros` en `S.medidas` en **cada
carga**, no una sola vez con bandera como los suplementos: así un navegador nuevo, o uno al que le
limpiaron los datos, recupera la lista completa. La dirección es siempre maestro → app. Un pesaje
anotado a mano desde "+ Pesarme hoy" se conserva, pero si cae en la misma fecha que uno del maestro,
gana el del maestro. Los sembrados llevan `maestro:true` e id determinista `'maestro-FECHA'`, y en
la tabla de Peso & Medidas salen con **🔒 en vez del bote de basura**: borrarlos desde la app no
serviría de nada porque vuelven al recargar. `S.metas.pesoObj` y `S.perfil.altura` también se
reescriben desde el maestro, y el campo "Peso objetivo" de Perfil & Metas ahora lo dice.

**Lo que cambió en pantalla**

- La tarjeta abre con el objetivo real — *ganar masa muscular y bajar panza* — y explica por qué
  la cintura importa tanto como el kilo: **son dos cosas que mueven la báscula en direcciones
  opuestas**, y un +1 kg puede ser músculo o panza. Si hay cintura anotada, muestra la última con
  su fecha; si no, lo dice.
- Al pie, de dónde salen los pesajes y qué hacer para agregar uno: decírselo a Claude.
- El KPI **"Último peso"** de la cabecera volvió a funcionar. Leía `S.pesos`, una clave que este
  archivo nunca ha tenido (los pesajes son `S.medidas[].peso`), así que mostraba siempre un guion.
- El enlace *"cambiar meta"* — que ponía `pesoObj` en 0 y el maestro revertía a la carga siguiente —
  se sustituyó por la línea que dice dónde se cambia de verdad.

**Verificado** (Chromium headless, `file://`, arrancando con `localStorage` vacío — que es justo el
caso que antes perdía todo): el pesaje aparece solo, la tarjeta muestra 75 kg contra la meta de 80 y
"te faltan 5 kg", el IMC sale 23.7 y la tabla lo lista con candado. Con **3 registros de prueba**
(luego revertidos) aparecen las dos gráficas — evolución del peso y cintura —, la barra
inicio → meta y el "↑ +0.7 kg vs anterior". Cero mensajes de consola en las tres pantallas, y
`dashboard.html` sigue cargando limpio.

## IMC por edad — dónde estás y a dónde vas (2026-09-13)

Adán: *"una gráfica entera de índice de masa [...] de diferentes edades, a partir de 15 [...]
ponme estadísticas desde los 25 hasta los 35, cuánto debería tener, cuánto tengo, cuál es mi meta,
también del peso [...] actualmente mido 1.78 y peso 78 kg"*. Lo que se mide con peso y altura es el
IMC (kg ÷ m²), y eso es lo que pinta la tarjeta `#med-imc` — la primera de Peso & Medidas, bajo los
KPI — seguida de `#med-edad`. Diseño elegido en [`diseno-imc/`](diseno-imc/) (Main; B y C fueron las
otras dos direcciones).

**La gráfica** (`renderIMCEdad()`, Chart.js, 340 px de alto, sin animación): edades 15–40 en el eje X,
IMC 14–32 en el Y, y cuatro franjas rellenas entre los cortes de la OMS — bajo peso (< 18.5, azul),
sano (18.5–24.9, verde), sobrepeso (25–29.9, ámbar), obesidad (≥ 30, rojo). De 20 en adelante los
cortes son horizontales porque **la OMS los lee igual de los 20 a los 65**; de 15 a 19 siguen la
referencia por edad (varones, 2007, redondeada — `IMC_15_19`), por eso suben hasta encontrarse con
los adultos. Encima: la ventana **25–35** en trazo discontinuo verde (plugin `ventana`), tu punto
relleno en tu edad de hoy (`edadHoy()` desde `CIFRAS.PROYECTO.nacimiento`), la meta como aro ámbar
en la misma columna, y los rótulos de franja y de puntos (plugin `rotulos`; en gráficas de menos de
520 px de ancho los rótulos van a la izquierda del punto y la nota "15–19" no se pinta). El tooltip
solo sale sobre los dos puntos.

**Las cuatro cifras** a la derecha (`.imc-stats`, columna de 340 px; bajo 1100 px pasa debajo): rango
sano en kilos a tu altura (18.5·m² – 24.9·m², con el centro IMC 22), cuánto tienes (IMC y kg del
último pesaje, con su clasificación y a cuánto del tope), tu meta (IMC de `metaKg` y si queda
dentro, por debajo o por encima de la tabla y por cuántos kilos) y la cintura que te dice si vas bien
(mitad de la altura; muestra la última anotada o pide que se mida). La franja **"De los 25 a los 35"**
(`.imc-edad`) responde lo que se pidió con la verdad: el rango no cambia con la edad, lo que cambia
es el músculo que se pierde desde los 30 sin fuerza (3–8 % por década) y la grasa que se va al
abdomen — por eso se pesa y se mide.

**Con los datos de hoy**: 1.78 m → sano de **58.6 a 78.9 kg**; 78 kg → **IMC 24.6**, normal a 0.3
del tope; la meta de 80 kg → **IMC 25.2**, 1.1 kg por encima de la tabla (válido si es músculo, y
eso lo dice la cintura, no la báscula); cintura objetivo **< 89 cm**. Medido en Chromium `file://`
a 1600 (claro y oscuro) y 390 px: gráfica de 911 × 340 y 308 × 340, documento sin desbordar
(`scrollWidth` = viewport) y cero errores de consola.
