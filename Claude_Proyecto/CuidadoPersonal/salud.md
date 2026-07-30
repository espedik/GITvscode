# salud.html — Mi Salud: Nutrición & Bienestar

La aplicación más completa del proyecto en cuanto a secciones: seguimiento de alimentación, ejercicio ligero, peso/medidas corporales, más dos módulos de contenido especializado (rutina alimentaria para masa muscular y guía de salud digestiva). Es de una sola página (HTML+CSS+JS, sin backend); los datos se guardan en `localStorage` (clave `misalud_v1`).

**Ubicación actual**: vive en `CuidadoPersonal/salud.html` (movida aquí el 2026-07-29 desde `Salud/salud.html`, sin cambios de código — solo de carpeta). Se abre normalmente **incrustada** dentro de `CuidadoPersonal/cuidadopersonal.html` → subtab **🥗 Cuidado de la Salud**, vía `<iframe src="salud.html">`. También puede abrirse directo (`CuidadoPersonal/salud.html`) sin pasar por el shell — funciona igual, es 100% autocontenida.

## Navegación (sidebar propio de este archivo)

- **📊 Dashboard** — resumen del día: calorías y macros (proteína/carbohidratos/grasa) consumidos vs. meta, contador de vasos de agua, comidas registradas hoy y ejercicio de hoy.
- **🍽️ Plan Semanal** — vista de un plan de comidas planeado.
- **🥗 Registro Diario** — bitácora de alimentos consumidos (comida del día: desayuno/almuerzo/cena/snack, nombre, cantidad, calorías y macros), filtrable por fecha y tipo de comida, con resumen de totales.
- **💪 Ejercicio** (dentro de Salud, distinto del subtab "Ejercicio" del shell) — registro ligero de entrenamientos (tipo: cardio/fuerza/flexibilidad/HIIT/deporte/otro, nombre, duración, calorías quemadas estimadas), con gráfica de calorías quemadas de las últimas 2 semanas. **No** es la app completa de rutina de gimnasio — esa es `ejercicio.html` (ver [`ejercicio.md`](ejercicio.md)); esta sección solo sirve para que el gasto calórico entre en el cálculo de calorías netas del día.
- **⚖️ Peso & Medidas** — registro de peso corporal y medidas (cintura, cadera, pecho, brazo, muslo) con cálculo automático de IMC, y gráfica de evolución del peso.
- **📈 Progreso** — vista consolidada de la evolución hacia las metas.
- **🥩 Rutina Muscular** — contenido de referencia (no editable desde la UI): un plan alimentario detallado para ganar masa muscular con datos personales precargados (peso, estatura, edad, objetivo), calorías/macros objetivo, desglose de desayuno/comida/cena con tablas de alimentos y valores nutricionales, alternativas económicas de proteína/carbohidratos/grasas/verduras, y tips de entrenamiento y descanso. Cada comida del plan se puede registrar directamente en el Registro Diario con un botón.
- **🫁 Salud Digestiva** — contenido de referencia sobre reflujo/agruras: síntomas, alimentos a evitar y recomendados (con la razón fisiológica de cada uno), remedios caseros paso a paso, un plan diario hora por hora, hábitos recomendados, y señales de alerta que ameritan ver a un médico.
- **🎯 Perfil & Metas** — configuración del perfil (peso, altura, edad, sexo, nivel de actividad) y metas nutricionales (calorías diarias, proteína, carbohidratos, grasa, vasos de agua, peso objetivo y fecha).

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
  perfil:     { peso, altura, edad, sexo, nivelActividad }
}
```

## Funcionalidad clave

- **CRUD** de alimentos, ejercicios y medidas con modales y confirmación antes de eliminar.
- **Cálculo de IMC**: `calcIMC()` y `imcLabel()` calculan el índice de masa corporal a partir de peso/altura y lo clasifican.
- **Contador de agua**: `toggleVaso()`/`resetAgua()` llevan el conteo de vasos de agua del día.
- **Contenido nutricional personalizado**: las secciones "Rutina Muscular" y "Salud Digestiva" contienen información específica (peso 75kg, estatura 1.78m, edad 31 años, objetivo ganar masa muscular) — es contenido de referencia escrito directamente en el código, no datos que se editen desde la interfaz.
- **`today()`** usa `new Date().toISOString().slice(0,10)` (UTC) — misma convención que el resto del proyecto, importante si algún día se cruza esta clave con otro archivo.
- **Exportar datos**: botón en la barra lateral descarga un JSON de respaldo.

## Referencias cruzadas

- Incrustada vía `<iframe>` en [`cuidadopersonal.md`](cuidadopersonal.md) (subtab "Cuidado de la Salud"). El shell no puede tocar el DOM/JS de este archivo (iframe cross-document), pero **sí comparte `localStorage`** porque ambos se sirven desde `file://` (ver la nota de origen compartido en `cuidadopersonal.md`).
- El **Dashboard** (`../Dashboard/dashboard.html`) lee `misalud_v1` directamente (`D.sal`): usa `alimentos` (calorías de hoy, score de nutrición de 7 días) y `ejercicios` (conteo de "sesión(es) hoy" en la tarjeta de acceso rápido de Ejercicio). Si cambias la forma de `S.alimentos`/`S.ejercicios`/`S.metas` aquí, revisa `calcScores()` y `renderApps()` en `Dashboard/dashboard.html`.
- Mapa completo del proyecto: [`../README.md`](../README.md).

## Cómo usarlo

Se abre `CuidadoPersonal/cuidadopersonal.html` (subtab Cuidado de la Salud) o directamente `salud.html` en cualquier navegador, sin instalación ni servidor. No hay sincronización entre dispositivos salvo mediante exportación manual del JSON.
