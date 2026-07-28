# sueno.html — Mi Sueño: Descanso & Recuperación

Aplicación web de una sola página (HTML+CSS+JS, sin backend) para registrar y analizar la calidad y duración del sueño nocturno. Los datos se guardan en `localStorage` (clave `sueno_v1`).

## Navegación

- **📊 Dashboard** — KPIs de los últimos 7 días: promedio de horas dormidas, calidad promedio (1-10), "deuda de sueño" acumulada (horas por debajo del objetivo) y porcentaje de días que alcanzaron la meta. Incluye gráfica de barras de horas dormidas de los últimos 14 días (con línea de referencia del objetivo) y gráfica de línea de calidad, además de una tabla de las últimas 5 noches.
- **🌙 Registros** — tabla completa de todas las noches registradas, con edición y borrado.
- **📈 Análisis** — tabla de promedios semanales (últimas 8 semanas: horas promedio, calidad promedio, días que cumplieron la meta, deuda de sueño), y gráficas de tendencia de horas y calidad de los últimos 30 días.
- **⚙️ Configuración** — objetivo de horas de sueño, hora ideal para dormir y despertar; calcula automáticamente la "ventana óptima de sueño" (duración entre esas horas).

## Registro de una noche

El modal "+ Registrar noche" pide fecha, hora de dormir y hora de despertar (las horas dormidas se calculan automáticamente, incluso cruzando la medianoche), un slider de calidad de sueño 1-10 con emoji y descripción dinámica (😴 Muy malo → 🌟 Perfecto), y notas opcionales sobre factores que afectaron el sueño.

## Funcionalidad clave

- **Cálculo automático de horas**: `calcHorasVal()` calcula la diferencia entre hora de dormir y despertar, manejando el cruce de medianoche.
- **Deuda de sueño**: suma, para cada día por debajo del objetivo, cuántas horas faltaron — una métrica acumulada de déficit de descanso.
- **Consistencia**: porcentaje de días de los últimos 7 en que se alcanzó o superó el objetivo de horas.
- **Exportar datos**: botón en la barra lateral descarga un JSON de respaldo (`sueno_YYYY-MM-DD.json`).

## Cómo usarlo

Se abre directamente `sueno.html` en cualquier navegador, sin instalación ni servidor. No hay sincronización entre dispositivos salvo mediante exportación manual del JSON.
