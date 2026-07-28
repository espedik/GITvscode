# tiempo.html — Mi Tiempo: Productividad & Focus

Aplicación web de una sola página (HTML+CSS+JS, sin backend) que combina un temporizador Pomodoro funcional con un registro manual de bloques de tiempo, para llevar seguimiento de en qué se invierte el día. Los datos se guardan en `localStorage` (clave `tiempo_v1`).

## Navegación

- **📊 Dashboard** — KPIs del día (horas de focus, pomodoros completados, categoría dominante, % de productividad = tiempo enfocado / tiempo total), gráfica de dona con la distribución de hoy por categoría, gráfica de barras de horas por categoría de la semana, y tabla de las últimas 10 entradas.
- **⏲️ Temporizador** — temporizador Pomodoro real con tres modos (🍅 Trabajo, ☕ Descanso corto, 🌙 Descanso largo), representado con un anillo circular animado (SVG) que se vacía conforme pasa el tiempo. Al completar una sesión de trabajo se registra automáticamente como bloque de tipo "pomodoro" (con categoría, proyecto y descripción configurables) y cambia automáticamente al modo de descanso correspondiente (corto o largo, según el número de pomodoros configurado). Incluye puntos visuales (`pomDots`) que muestran el progreso del ciclo Pomodoro.
- **📝 Registros** — tabla de bloques de tiempo filtrable por fecha, con edición y borrado.
- **📅 Semana** — vista semanal: gráfica de horas diarias de las últimas 2 semanas, gráfica de barras apiladas por categoría por día, tabla resumen por categoría (tiempo total, número de sesiones, porcentaje), y detalle día por día de todos los bloques.
- **⚙️ Configuración** — duración configurable de trabajo/descanso corto/descanso largo y número de pomodoros antes del descanso largo; también permite exportar todos los datos o borrarlos por completo.

## Categorías

Cada bloque de tiempo se clasifica en una de 7 categorías con color propio: Trabajo (verde), Estudio (azul), Ejercicio (naranja), Ocio (morado), Hogar (amarillo), Social (cian), Personal (rosa).

## Funcionalidad clave

- **Temporizador Pomodoro real** con `setInterval`, que corre mientras la pestaña esté abierta; al terminar dispara un flash visual y un toast, y registra automáticamente el bloque de tiempo trabajado.
- **Registro manual de bloques**: alternativa al temporizador — se puede anotar directamente un rango de horas con categoría, descripción y proyecto; la duración se calcula automáticamente (soporta cruce de medianoche).
- **Cálculo de productividad**: porcentaje de minutos "enfocados" (categoría trabajo/estudio o tipo pomodoro) sobre el total de minutos registrados en el día.
- **Exportar / borrar datos**: en Configuración se puede descargar un JSON de respaldo (`tiempo_YYYY-MM-DD.json`) o eliminar todos los bloques con confirmación previa.

## Cómo usarlo

Se abre directamente `tiempo.html` en cualquier navegador, sin instalación ni servidor. El temporizador solo avanza mientras la pestaña permanece abierta (no funciona en segundo plano como una app nativa). No hay sincronización entre dispositivos salvo mediante exportación manual del JSON.
