# proyectos.html — Mis Proyectos: Metas & Iniciativas

Aplicación web de una sola página (HTML+CSS+JS, sin backend) para gestionar proyectos personales al estilo de un mini Trello/Notion: proyectos con tareas, seguimiento de tiempo invertido y archivo de completados. Los datos se guardan en `localStorage` (clave `proyectos_v1`).

## Navegación

Barra lateral con 5 secciones controladas por `nav()`:

- **🏠 Dashboard** — KPIs (proyectos activos, tareas con vencimiento en los próximos 7 días, tasa de completación de tareas, horas trabajadas esta semana), lista de proyectos activos con barra de progreso, lista de tareas urgentes, y una gráfica de dona (Chart.js) con la distribución de tareas por estado.
- **🗂️ Proyectos** — catálogo de proyectos en tarjetas, filtrable por estado (idea/activo/pausado), prioridad y categoría (personal, profesional, creativo, salud, finanzas, educación, hogar, otro). Cada tarjeta tiene un color distintivo elegible entre 8 colores predefinidos, barra de progreso (0-100% manual con slider) y conteo de tareas. Al hacer clic se abre un detalle con tiempo invertido, lista de tareas y opción de marcar como completado.
- **✅ Tareas** — tabla de todas las tareas, filtrable por proyecto, estado y prioridad, con fecha límite (resaltada en rojo si está vencida, en amarillo si es hoy). El estado (pendiente → en progreso → completada) se puede ciclar con un clic en el badge.
- **⏱️ Tiempo** — registro de sesiones de trabajo por proyecto (fecha, duración en minutos, descripción), con barras horizontales de tiempo total por proyecto, una gráfica de barras apiladas (Chart.js) de horas semanales por proyecto de las últimas 6 semanas, y tabla de sesiones recientes.
- **📦 Archivados** — proyectos marcados como "completado", con resumen de tareas, tiempo invertido y fecha objetivo; se pueden reactivar para volver a la lista de activos.

## Funcionalidad clave

- **CRUD completo** de proyectos y tareas con modales (`openProjModal`, `openTareaModal`), y confirmación antes de eliminar (`confirm2`). Al eliminar un proyecto se eliminan también sus tareas y sesiones de tiempo asociadas.
- **Relación proyecto→tareas→sesiones**: cada tarea pertenece a un proyecto (`proyecto_id`) y cada sesión de tiempo también (`proyecto_id`), lo que permite calcular progreso y tiempo invertido por proyecto.
- **Persistencia local**: `save()`/`load()` serializan el estado (`S = {proyectos, tareas, sesiones}`) a `localStorage`.
- **Exportar datos**: botón en la barra lateral descarga un JSON de respaldo (`proyectos_backup_YYYY-MM-DD.json`).

## Cómo usarlo

Se abre directamente `proyectos.html` en cualquier navegador, sin instalación ni servidor. No hay sincronización entre dispositivos salvo mediante exportación manual del JSON.

## Referencias cruzadas

- La barra lateral tiene un enlace **🚀 Volver al Dashboard** (`../Dashboard/dashboard.html`).
- El **Dashboard** (`../Dashboard/dashboard.html`) lee `proyectos_v1` directamente: usa `tareas` (para las alertas de tareas vencidas/próximas y el conteo de "Tareas hoy") y `proyectos` (conteo de activos en la tarjeta de acceso rápido). Si cambias la forma de `S.tareas`/`S.proyectos` aquí, revisa `getAlerts()` y `renderApps()` en `Dashboard/dashboard.html`.
- Mapa completo del proyecto: [`../README.md`](../README.md).
