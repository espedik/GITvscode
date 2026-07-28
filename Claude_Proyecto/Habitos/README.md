# habitos.html — Mis Hábitos: Disciplina & Consistencia

Aplicación web de una sola página (HTML+CSS+JS, sin backend) tipo "habit tracker" al estilo de un heatmap de contribuciones de GitHub. Los datos se guardan en `localStorage` (clave `habitos_v1`).

## Navegación

- **☀️ Hoy** — checklist del día con los hábitos diarios activos. Al hacer clic en una fila se marca como completado, se muestra un mensaje motivacional cuando se completan todos, y una barra de progreso con el porcentaje del día. Cada hábito muestra su racha actual (🔥 días consecutivos) si aplica.
- **📋 Mis Hábitos** — CRUD de hábitos: nombre, emoji, categoría (salud, productividad, social, personal, aprendizaje, hogar) y frecuencia (diario o semanal). Cada tarjeta muestra racha, porcentaje histórico de cumplimiento, y permite pausar/activar, editar o eliminar el hábito (al eliminar también se borran sus registros).
- **📅 Calendario** — heatmap de contribuciones de las últimas 12 semanas (similar al de GitHub), donde cada celda representa un día y su intensidad de color según cuántos hábitos se completaron ese día relativo al total de hábitos activos. Al pasar el mouse sobre una celda se muestra qué hábitos se completaron.
- **📈 Estadísticas** — top 3 hábitos con mejor cumplimiento (medallas 🥇🥈🥉), gráfica de tasa de completación de las últimas 8 semanas, gráfica del mejor día de la semana para cumplir hábitos, y una tabla detallada por hábito (racha, total completado, % de completación).

## Cálculo de rachas

`calcStreak()` calcula la racha vigente de un hábito: para hábitos diarios cuenta días consecutivos completados hacia atrás desde hoy (o ayer, si hoy aún no se marcó); para hábitos semanales cuenta semanas consecutivas con al menos un registro.

## Funcionalidad clave

- **Alta/edición/borrado** de hábitos con modal (`openModal`, `saveHabito`), y confirmación antes de eliminar (`askDel`/`confirmDel`).
- **Registro diario**: `toggleHoy()` agrega o quita el registro de "completado" del día actual para un hábito.
- **Heatmap tipo GitHub**: `renderCalendario()` construye una cuadrícula de 12 semanas x 7 días coloreada según el ratio de hábitos completados por día.
- **Exportar datos**: botón en la barra lateral descarga un JSON de respaldo (`habitos_YYYY-MM-DD.json`).

## Cómo usarlo

Se abre directamente `habitos.html` en cualquier navegador, sin instalación ni servidor. No hay sincronización entre dispositivos salvo mediante exportación manual del JSON.
