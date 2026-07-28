# aprendizaje.html — Mi Aprendizaje: Conocimiento & Skills

Aplicación web de una sola página (HTML+CSS+JS, sin backend) para llevar seguimiento de lectura, sesiones de estudio y desarrollo de habilidades (skills). Los datos se guardan en `localStorage` (clave `aprendizaje_v1`), así que persisten entre sesiones pero solo en el navegador/equipo donde se usan.

## Navegación

Barra lateral con 5 secciones controladas por `nav()`:

- **🏠 Dashboard** — KPIs del año: libros completados vs. meta anual, horas de estudio de la semana vs. meta semanal, libros actualmente en lectura, cantidad de skills registrados. Incluye listas de "libros en progreso" y "sesiones recientes", más una gráfica de barras (Chart.js) de horas de estudio por semana (últimas 8 semanas).
- **📖 Libros** — catálogo de libros en formato de tarjetas (grid), con buscador por título y filtro por estado (leyendo, completado, pausado, pendiente). Cada tarjeta muestra progreso de páginas leídas y calificación en estrellas. Al hacer clic se abre un detalle con sesiones de estudio vinculadas y tiempo total invertido.
- **⏱️ Sesiones** — registro de sesiones de estudio (fecha, duración en minutos, tema, tipo: lectura/video/práctica/clase/otro, libro relacionado opcional, notas). Incluye un KPI de horas acumuladas en la semana actual y filtros por fecha, tipo y tema.
- **⚡ Skills** — tarjetas de habilidades con categoría, nivel actual y nivel objetivo (escala 1-5, mostrada en estrellas y barra de progreso), más un gráfico de radar (Chart.js) que compara nivel actual vs. objetivo de hasta 8 skills (requiere al menos 3 para mostrarse).
- **🎯 Metas** — configuración de metas anuales (libros al año) y semanales (horas de estudio), con anillo de progreso SVG para la meta de lectura, barra de progreso para horas semanales, gráfica de libros completados por mes, y un panel de estadísticas totales (sesiones, horas, páginas leídas, libros totales).

## Funcionalidad clave

- **CRUD completo** para libros, sesiones y skills, cada uno con su modal de alta/edición (`openLibroModal`, `openSesionModal`, `openSkillModal`) y confirmación antes de eliminar (`confirm2`).
- **Persistencia local**: `save()`/`load()` serializan el estado (`S = {libros, sesiones, skills, metas}`) a `localStorage`.
- **Vinculación libro–sesión**: una sesión de estudio puede asociarse a un libro en lectura o pausado; al eliminar un libro, sus sesiones se desvinculan (no se borran).
- **Exportar datos**: botón en la barra lateral descarga un JSON de respaldo (`aprendizaje_backup_YYYY-MM-DD.json`).
- **Responsive**: en pantallas ≤640px la barra lateral se colapsa detrás de un botón de menú (☰).

## Cómo usarlo

Se abre directamente `aprendizaje.html` en cualquier navegador, sin instalación ni servidor. No hay sincronización entre dispositivos salvo mediante exportación manual del JSON.
