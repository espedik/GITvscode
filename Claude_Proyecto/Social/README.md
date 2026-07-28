# social.html — Mi Red Social: Relaciones & Conexiones

Aplicación web de una sola página (HTML+CSS+JS, sin backend) tipo mini-CRM personal para llevar seguimiento de contactos y relaciones, con recordatorios automáticos de a quién contactar. Los datos se guardan en `localStorage` (clave `social_v1`).

## Navegación

- **🏠 Dashboard** — contactos activos, interacciones de la semana, contacto más frecuente del mes, contactos sin interacción en 30+ días, panel de "seguimientos pendientes" (ordenados por días sin contacto), cumpleaños en los próximos 30 días, y gráfica de interacciones por semana (últimas 8 semanas).
- **👤 Contactos** — catálogo de contactos en tarjetas (nombre, emoji/avatar, tipo de relación: familia/pareja/amigo cercano/amigo/trabajo/mentor/conocido/otro, importancia en estrellas 1-5, cumpleaños, notas), ordenable por importancia, nombre o último contacto. Cada tarjeta muestra un badge de "días sin contacto" en verde/naranja/rojo. Al hacer clic se abre el detalle con historial completo de interacciones.
- **💬 Interacciones** — tabla de todas las interacciones registradas (llamada, mensaje, reunión, comida, videollamada, evento, otro), con calidad (1-5 estrellas), duración y notas; filtrable por contacto, tipo y rango de fechas.
- **🔔 Seguimientos** — lista de contactos ordenada por "urgencia de contacto", calculada combinando la importancia del contacto y cuánto tiempo lleva excedido respecto a su frecuencia ideal de contacto (ver más abajo). Cada fila tiene un botón directo para registrar una interacción.
- **📊 Estadísticas** — distribución de interacciones por tipo de relación (dona), tendencia de calidad promedio de las últimas 12 semanas, meses más activos, y un "Health Score" (0-100) que resume qué tan bien mantenida está la red de contactos en su conjunto.

## Lógica de frecuencia ideal y urgencia

Cada tipo de relación tiene una frecuencia de contacto ideal predefinida en días (`REL_FREQ`): pareja cada 1 día, familia cada 7, amigo cercano y trabajo cada 14, amigo cada 30, mentor cada 30, conocido cada 90, otro cada 60. La "urgencia" de un contacto se calcula como `importancia × días_de_retraso_sobre_la_frecuencia_ideal`, usada para ordenar la lista de Seguimientos. El "Health Score" de la red pondera de forma similar qué tan al día está cada contacto según su importancia.

## Funcionalidad clave

- **CRUD** de contactos e interacciones con modales, selector de importancia/calidad con estrellas clicables, y confirmación antes de eliminar (al borrar un contacto también se borran sus interacciones).
- **Detalle de contacto**: vista con estadísticas del contacto (total de interacciones, calidad promedio) e historial completo.
- **Exportar datos**: botón en la barra lateral descarga un JSON de respaldo (`red_social_YYYY-MM-DD.json`).

## Cómo usarlo

Se abre directamente `social.html` en cualquier navegador, sin instalación ni servidor. No hay sincronización entre dispositivos salvo mediante exportación manual del JSON.
