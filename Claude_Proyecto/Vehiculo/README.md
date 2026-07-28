# vehiculo.html — Mi Vehículo: Auto & Movilidad

Aplicación web de una sola página (HTML+CSS+JS, sin backend) para llevar el control de gastos, gasolina y mantenimiento de un vehículo. Los datos se guardan en `localStorage` (clave `vehiculo_v1`).

## Navegación

- **🏠 Dashboard** — KPIs: km/litro promedio (últimas 3 cargas llenas), costo por km de vida del auto, gasto del mes actual, y próximo mantenimiento estimado (por km o por fecha, el que esté más cerca). Incluye una tarjeta con los datos del vehículo (marca, modelo, placa, color, km actual y km recorridos), gráfica de eficiencia (km/L) de las últimas 10 cargas, y gráfica de gastos mensuales por categoría de los últimos 6 meses.
- **⛽ Gasolina** — registro de cargas de combustible (litros, precio por litro, costo total auto-calculado, km del odómetro, si fue tanque lleno o parcial). Solo las cargas de "tanque lleno" se usan para calcular el rendimiento km/L entre una carga y la siguiente. Incluye gráfica de tendencia de eficiencia y tabla completa con km recorridos y rendimiento por carga.
- **🔧 Mantenimiento** — registro de servicios (aceite y filtro, llantas, frenos, batería, revisión general, lavado, afinación, transmisión, suspensión, otro) con costo, kilometraje, y el próximo km/fecha en que toca repetirlo. Genera alertas automáticas (🔴 vencido / 🟠 próximo) cuando el kilometraje actual se acerca o supera el límite programado, o cuando la fecha programada está cerca o ya pasó.
- **💸 Gastos** — registro de gastos generales del vehículo (seguro, tenencia, verificación, estacionamiento, multas, accesorios, otro). El dashboard de esta sección combina estos gastos manuales con los de gasolina y mantenimiento para mostrar el top 3 de categorías del mes, una gráfica de dona de distribución histórica, y una gráfica de barras del gasto mensual total de los últimos 6 meses.
- **🚗 Mi Vehículo** — perfil del auto (marca, modelo, año, color, placa, kilometraje inicial) y un panel de estadísticas acumuladas: km actuales, km totales recorridos, costo total de propiedad, costo por km de por vida, número de cargas y mantenimientos, gasto mensual estimado (promedio de los últimos 6 meses con datos), y desglose de gasto en gasolina vs. mantenimiento.

## Cálculo de kilometraje actual y rendimiento

`kmActual()` determina el kilometraje más reciente del auto tomando el mayor valor de odómetro registrado entre cargas de gasolina y mantenimientos (o el km inicial configurado si no hay registros). `calcKmL()` calcula el rendimiento km/L únicamente entre cargas consecutivas marcadas como "tanque lleno", ya que solo así la distancia entre cargas refleja el consumo real de un tanque completo.

## Funcionalidad clave

- **CRUD** de cargas de gasolina, mantenimientos y gastos, cada uno con su modal y confirmación antes de eliminar.
- **Alertas de mantenimiento**: comparación automática del km/fecha actual contra lo programado en cada registro de mantenimiento, para avisar cuándo toca dar servicio.
- **Costo total de propiedad**: suma de gasolina + mantenimiento + gastos varios, dividido entre los km recorridos, para tener el costo real por kilómetro.
- **Exportar datos**: botón en la barra lateral descarga un JSON de respaldo (`vehiculo_YYYY-MM-DD.json`).

## Cómo usarlo

Se abre directamente `vehiculo.html` en cualquier navegador, sin instalación ni servidor. No hay sincronización entre dispositivos salvo mediante exportación manual del JSON.
