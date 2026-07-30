# salud.html — Mi Salud: Nutrición & Bienestar

La aplicación más completa del proyecto en cuanto a secciones: seguimiento de alimentación, ejercicio ligero, peso/medidas corporales, un registro de historial médico (exámenes de laboratorio, chequeos y perfil médico), más dos módulos de contenido especializado (rutina alimentaria para masa muscular y guía de salud digestiva). Es de una sola página (HTML+CSS+JS, sin backend); los datos se guardan en `localStorage` (clave `misalud_v1`).

**Ubicación actual**: vive en `CuidadoPersonal/salud.html` (movida aquí el 2026-07-29 desde `Salud/salud.html`, sin cambios de código — solo de carpeta). Se abre normalmente **incrustada** dentro de `CuidadoPersonal/cuidadopersonal.html` → subtab **🥗 Cuidado de la Salud**, vía `<iframe src="salud.html">`. También puede abrirse directo (`CuidadoPersonal/salud.html`) sin pasar por el shell — funciona igual, es 100% autocontenida.

## Navegación (sidebar propio de este archivo)

- **📊 Dashboard** — resumen del día: calorías y macros (proteína/carbohidratos/grasa) consumidos vs. meta, contador de vasos de agua, comidas registradas hoy y ejercicio de hoy.
- **🍽️ Plan Semanal** — vista de un plan de comidas planeado.
- **🥗 Registro Diario** — bitácora de alimentos consumidos (comida del día: desayuno/almuerzo/cena/snack, nombre, cantidad, calorías y macros), filtrable por fecha y tipo de comida, con resumen de totales.
- **💪 Ejercicio** (dentro de Salud, distinto del subtab "Ejercicio" del shell) — registro ligero de entrenamientos (tipo: cardio/fuerza/flexibilidad/HIIT/deporte/otro, nombre, duración, calorías quemadas estimadas), con gráfica de calorías quemadas de las últimas 2 semanas. **No** es la app completa de rutina de gimnasio — esa es `ejercicio.html` (ver [`readme_ejercicio.md`](readme_ejercicio.md)); esta sección solo sirve para que el gasto calórico entre en el cálculo de calorías netas del día.
- **⚖️ Peso & Medidas** — registro de peso corporal y medidas (cintura, cadera, pecho, brazo, muslo) con cálculo automático de IMC, y gráfica de evolución del peso.
- **📈 Progreso** — vista consolidada de la evolución hacia las metas.
- **🥩 Rutina Muscular** — contenido de referencia (no editable desde la UI): un plan alimentario detallado para ganar masa muscular con datos personales precargados (peso, estatura, edad, objetivo), calorías/macros objetivo, desglose de desayuno/comida/cena con tablas de alimentos y valores nutricionales, alternativas económicas de proteína/carbohidratos/grasas/verduras, y tips de entrenamiento y descanso. Cada comida del plan se puede registrar directamente en el Registro Diario con un botón.
- **🫁 Salud Digestiva** — contenido de referencia sobre reflujo/agruras: síntomas, alimentos a evitar y recomendados (con la razón fisiológica de cada uno), remedios caseros paso a paso, un plan diario hora por hora, hábitos recomendados, y señales de alerta que ameritan ver a un médico.
- **🩺 Exámenes Médicos** (nuevo, 2026-07-30 — ver detalle abajo) — registro de exámenes de laboratorio y signos vitales con rangos de referencia, chequeos/consultas por especialidad, y un perfil médico general. Responde a "necesito saber todo de mí y cómo estoy" en un solo lugar.
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

## Modelo de datos — `localStorage['misalud_v1']`

```js
{
  alimentos:  [{ id, fecha:'YYYY-MM-DD', comida:'desayuno|almuerzo|cena|snack',
                 nombre, cantidad, unidad, cal, prot, carbs, gra, notas }],
  ejercicios: [{ id, fecha, tipo:'cardio|fuerza|flexibilidad|hiit|deporte|otro',
                 nombre, duracion_min, cal }],
  medidas:    [{ id, fecha, peso, cintura, cadera, pecho, brazo, muslo, notas }],
  agua:       { 'YYYY-MM-DD': vasosContados },
  metas:      { caloriasD:2000, proteina:150, carbs:.., grasa:.., vasos:.., pesoObjetivo:.., fechaObjetivo:.. },
  perfil:     { peso, altura, edad, sexo, nivelActividad },
  examenes:   [{ id, fecha, categoria, examenId:'idDeEXAM_CATALOG|""(si es personalizado)',
                 nombre, unidad, valor, refMin:num|null, refMax:num|null, notas }],
  chequeos:   [{ id, fecha, tipo:'general|dental|oftalmologico|dermatologico|cardiologico|otro',
                 resultado, proxima:'YYYY-MM-DD'|'', notas }],
  perfilMedico: { tipoSangre, alergias, medicamentos, condiciones, cirugias, antecedentesFamiliares, contactoEmergencia }
}
```

## Funcionalidad clave

- **CRUD** de alimentos, ejercicios, medidas, exámenes médicos y chequeos, todos con modales y confirmación antes de eliminar (`askDel()`/`doConf()`/`closeConf()`, compartido).
- **Cálculo de IMC**: `calcIMC()` y `imcLabel()` calculan el índice de masa corporal a partir de peso/altura y lo clasifican.
- **Contador de agua**: `toggleVaso()`/`resetAgua()` llevan el conteo de vasos de agua del día.
- **Catálogo de exámenes** (`EXAM_CATALOG`, `CHEQ_TIPOS`, `CAT_OTRO`): ~24 marcadores de laboratorio con rango de referencia general por adulto, más la opción de examen personalizado. `examStatusInfo(e)` clasifica cualquier registro en Normal/Alto/Bajo/Sin rango.
- **Contenido nutricional personalizado**: las secciones "Rutina Muscular" y "Salud Digestiva" contienen información específica (peso 75kg, estatura 1.78m, edad 31 años, objetivo ganar masa muscular) — es contenido de referencia escrito directamente en el código, no datos que se editen desde la interfaz.
- **`today()`** usa `new Date().toISOString().slice(0,10)` (UTC) — misma convención que el resto del proyecto, importante si algún día se cruza esta clave con otro archivo.
- **Exportar datos**: botón en la barra lateral descarga un JSON de respaldo.

## Referencias cruzadas

- Incrustada vía `<iframe>` en [`readme_cuidadopersonal.md`](readme_cuidadopersonal.md) (subtab "Cuidado de la Salud"). El shell no puede tocar el DOM/JS de este archivo (iframe cross-document), pero **sí comparte `localStorage`** porque ambos se sirven desde `file://` (ver la nota de origen compartido en `readme_cuidadopersonal.md`).
- El **Dashboard** (`../Dashboard/dashboard.html`) lee `misalud_v1` directamente (`D.sal`): usa `alimentos` (calorías de hoy, score de nutrición de 7 días) y `ejercicios` (conteo de "sesión(es) hoy" en la tarjeta de acceso rápido de Ejercicio). Si cambias la forma de `S.alimentos`/`S.ejercicios`/`S.metas` aquí, revisa `calcScores()` y `renderApps()` en `Dashboard/dashboard.html`. **`S.examenes`/`S.chequeos`/`S.perfilMedico` no los lee el Dashboard todavía** — si en el futuro se quiere una alerta de "próximo chequeo" o similar ahí, hay que agregarla a mano en `loadAll()`/`renderApps()`.
- Mapa completo del proyecto: [`../README.md`](../README.md).

## Cómo usarlo

Se abre `CuidadoPersonal/cuidadopersonal.html` (subtab Cuidado de la Salud) o directamente `salud.html` en cualquier navegador, sin instalación ni servidor. No hay sincronización entre dispositivos salvo mediante exportación manual del JSON.
