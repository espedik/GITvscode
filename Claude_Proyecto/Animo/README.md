# animo.html — Mi Ánimo: Bienestar Mental

Aplicación web de una sola página (HTML+CSS+JS, sin backend) para registrar y analizar el estado de ánimo diario. Los datos se guardan en el `localStorage` del navegador (clave `animo_v1`), por lo que persisten entre sesiones pero solo en el navegador/equipo donde se usan.

## Navegación

Barra lateral con 4 secciones que se muestran/ocultan mediante `nav()`, sin recargar la página:

- **🌅 Hoy** — muestra si ya se registró el estado del día. Si no, invita a registrar (mood, energía, estrés); si ya existe un registro, muestra tarjetas con el ánimo, energía y estrés del día, las emociones seleccionadas, notas, y una gráfica sparkline de los últimos 7 días.
- **📋 Historial** — tabla con todos los registros, filtrable por rango de fechas ("Desde"/"Hasta"), con opción de editar o eliminar cada uno.
- **📈 Tendencias** — dos gráficas (Chart.js) de los últimos 30 días: evolución de ánimo/energía/estrés, y frecuencia de emociones reportadas.
- **🔍 Patrones** — análisis automático: mejor y peor día de la semana según ánimo promedio, comparación del mes actual vs. el anterior, top 3 emociones más frecuentes, correlación entre estrés alto/bajo y ánimo, promedios de los últimos 30 días, y una lista de "insights" en texto generados según los datos (ej. "tu mejor día es el jueves").

## Registro de estado de ánimo

El botón "+ Registrar" abre un modal con:
- **Sliders (1–10)** para ánimo, energía y estrés, cada uno con emoji dinámico que cambia según el valor.
- **Selector de emociones** (pills clicables: feliz, motivado, tranquilo, ansioso, triste, etc.).
- **Notas** de texto libre.
- Fecha y hora del registro (editable, por defecto "ahora").

Cada registro se guarda como un objeto en el arreglo `S.registros` con un id único (`uid()`), y se puede editar o borrar posteriormente desde Hoy o Historial.

## Funcionalidad clave

- **Persistencia local**: `save()`/`load()` serializan el estado completo a `localStorage`.
- **Exportar datos**: botón "⬇ Exportar" descarga un JSON (`animo_YYYY-MM-DD.json`) con todos los registros como respaldo manual.
- **Confirmación de borrado**: diálogo de confirmación (`showConf`) antes de eliminar un registro, para evitar borrados accidentales.
- **Cálculo de colores/insights**: funciones auxiliares (`moodColor`, `stresColor`, `energiaColor`) colorean valores según rangos (verde=bueno, rojo=malo), y `renderPatrones()` calcula estadísticas (promedios, mejor/peor día, correlaciones) directamente en el navegador a partir del historial guardado.

## Cómo usarlo

Se abre directamente `animo.html` en cualquier navegador, sin instalación ni servidor. Al no depender de un backend, los datos no se sincronizan entre dispositivos salvo que se use la función de exportar/importar manualmente.
