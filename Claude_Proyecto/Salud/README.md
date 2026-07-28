# salud.html — Mi Salud: Nutrición & Bienestar

La aplicación más completa del proyecto en cuanto a secciones: seguimiento de alimentación, ejercicio, peso/medidas corporales, más dos módulos de contenido especializado (rutina alimentaria para masa muscular y guía de salud digestiva). Es de una sola página (HTML+CSS+JS, sin backend); los datos se guardan en `localStorage` (clave `misalud_v1`).

## Navegación

- **📊 Dashboard** — resumen del día: calorías y macros (proteína/carbohidratos/grasa) consumidos vs. meta, contador de vasos de agua, comidas registradas hoy y ejercicio de hoy.
- **🍽️ Plan Semanal** — vista de un plan de comidas planeado.
- **🥗 Registro Diario** — bitácora de alimentos consumidos (comida del día: desayuno/almuerzo/cena/snack, nombre, cantidad, calorías y macros), filtrable por fecha y tipo de comida, con resumen de totales.
- **💪 Ejercicio** — registro de entrenamientos (tipo: cardio/fuerza/flexibilidad/HIIT/deporte/otro, nombre, duración, calorías quemadas estimadas), con gráfica de calorías quemadas de las últimas 2 semanas.
- **⚖️ Peso & Medidas** — registro de peso corporal y medidas (cintura, cadera, pecho, brazo, muslo) con cálculo automático de IMC, y gráfica de evolución del peso.
- **📈 Progreso** — vista consolidada de la evolución hacia las metas.
- **🥩 Rutina Muscular** — contenido de referencia (no editable desde la UI): un plan alimentario detallado para ganar masa muscular con datos personales precargados (peso, estatura, edad, objetivo), calorías/macros objetivo, desglose de desayuno/comida/cena con tablas de alimentos y valores nutricionales, alternativas económicas de proteína/carbohidratos/grasas/verduras, y tips de entrenamiento y descanso. Cada comida del plan se puede registrar directamente en el Registro Diario con un botón.
- **🫁 Salud Digestiva** — contenido de referencia sobre reflujo/agruras: síntomas, alimentos a evitar y recomendados (con la razón fisiológica de cada uno), remedios caseros paso a paso (té de jengibre, miel en ayunas, posición al dormir, etc.), un plan diario hora por hora, hábitos recomendados, y señales de alerta que ameritan ver a un médico.
- **🎯 Perfil & Metas** — configuración del perfil (peso, altura, edad, sexo, nivel de actividad) y metas nutricionales (calorías diarias, proteína, carbohidratos, grasa, vasos de agua, peso objetivo y fecha).

## Funcionalidad clave

- **CRUD** de alimentos, ejercicios y medidas con modales y confirmación antes de eliminar.
- **Cálculo de IMC**: `calcIMC()` y `imcLabel()` calculan el índice de masa corporal a partir de peso/altura y lo clasifican.
- **Contador de agua**: `toggleVaso()`/`resetAgua()` llevan el conteo de vasos de agua del día.
- **Contenido nutricional personalizado**: las secciones "Rutina Muscular" y "Salud Digestiva" contienen información específica (peso 75kg, estatura 1.78m, edad 31 años, objetivo ganar masa muscular) — es contenido de referencia escrito directamente en el código, no datos que se editen desde la interfaz.
- **Exportar datos**: botón en la barra lateral descarga un JSON de respaldo.

## Cómo usarlo

Se abre directamente `salud.html` en cualquier navegador, sin instalación ni servidor. No hay sincronización entre dispositivos salvo mediante exportación manual del JSON.
