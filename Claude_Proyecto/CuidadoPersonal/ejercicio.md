# ejercicio.html — Mi Rutina: Entrenamiento Semanal

Aplicación web de una sola página (HTML+CSS+JS, sin backend) para planear una rutina de gimnasio semanal, ejecutar los entrenamientos en vivo con registro de series/peso/reps, y hacer seguimiento del progreso de fuerza. Los datos se guardan en `localStorage` (clave `mirutina_v1`).

**Ubicación actual**: vive en `CuidadoPersonal/ejercicio.html` (movida aquí el 2026-07-29 desde `Ejercicio/ejercicio.html`, sin cambios de código — solo de carpeta; la carpeta `Ejercicio/` ya no existe). Se abre normalmente **incrustada** dentro de `CuidadoPersonal/cuidadopersonal.html` → subtab **🏋️ Ejercicio**, vía `<iframe src="ejercicio.html">`. También puede abrirse directo sin pasar por el shell.

## Base de datos de ejercicios

Trae precargados 56 ejercicios (`EJ_DB`) organizados por músculo (Pecho, Espalda, Hombros, Bíceps, Tríceps, Piernas, Glúteos, Core, Cardio), cada uno con equipo requerido (Barra, Mancuernas, Máquina, Cuerpo, etc.) y tipo (Compuesto/Aislamiento/Cardio). También se pueden agregar ejercicios propios, que se guardan aparte (`S.ejerciciosCustom`) y se combinan con los predefinidos en toda la app (`getAllEj()`).

## Navegación (sidebar propio de este archivo)

- **📊 Dashboard** — racha de días consecutivos entrenando, sesiones completadas esta semana vs. meta, total histórico de sesiones, vista de la semana (qué día toca qué rutina y si ya se hizo), mapa de músculos trabajados en la semana, y preview del entrenamiento de hoy.
- **💪 Entrenar Hoy** — flujo principal: si hay rutina asignada al día, muestra los ejercicios planeados junto con el mejor resultado de la última vez que se entrenó ese día. Al pulsar "Iniciar entrenamiento" entra en **modo activo**: por cada ejercicio se registran series con peso y repeticiones, marcando cada serie como hecha (✅). Incluye un cronómetro de descanso configurable (1, 1:30, 2, 3 min) entre series. Al terminar, la sesión se guarda con duración total y el detalle de todas las series.
- **🗓️ Mi Rutina** — vista semanal (Lunes a Domingo) en tarjetas, donde se configura qué entrenamiento corresponde a cada día (nombre, tipo, y lista de ejercicios con series/reps) mediante un modal que permite buscar y seleccionar de la biblioteca.
- **📚 Biblioteca** — catálogo completo de ejercicios agrupado por músculo, con filtros por texto, músculo y equipo; permite agregar ejercicios propios y eliminarlos.
- **📈 Progreso** — selecciona un ejercicio con historial y muestra una gráfica (Chart.js) de la evolución del peso máximo levantado por sesión, además del récord personal (PR) y la progresión total en kg.
- **📋 Historial** — lista de todas las sesiones completadas, con series hechas, volumen total (toneladas movidas) y detalle de los mejores pesos por ejercicio.

## Modelo de datos — `localStorage['mirutina_v1']`

```js
{
  rutina: {                 // indexado por día: 0=Domingo … 6=Sábado
    1: { nombre, tipo:'empuje|halar|piernas|core|fullbody|cardio|descanso',
         ejercicios:[{ ejercicioId, series, reps }] },
    // ... 0-6
  },
  ejerciciosCustom: [{ id, nombre, musculo, equipo, tipo }],
  sesiones: [{ id, fecha, dia, duracion_min,
               ejercicios:[{ ejercicioId, series:[{ peso, reps, hecha:true }] }] }]
}
```
El horario semanal (`S.rutina`) viene precargado con una rutina de ejemplo de 5-6 días al primer uso.

## Funcionalidad clave

- **Rutina por día de la semana**: `S.rutina` es un objeto indexado por día (0=Domingo … 6=Sábado) con nombre, tipo de entrenamiento y su lista de ejercicios.
- **Modo de entrenamiento en vivo** (`workoutActivo`): trackea cada serie de cada ejercicio en tiempo real mientras se entrena, con inputs editables de peso y reps.
- **Timer de descanso**: cuenta regresiva visual que cambia de color cuando quedan ≤10 segundos.
- **Cálculo de progreso**: a partir del historial de sesiones se identifica el peso máximo levantado por ejercicio en cada sesión, para graficar la progresión y calcular el récord personal.
- **`today()`** usa `new Date().toISOString().slice(0,10)` (UTC) — misma convención que el resto del proyecto.
- **Exportar datos**: botón en la barra lateral descarga un JSON de respaldo (`rutina_YYYY-MM-DD.json`).

## Referencias cruzadas

- Incrustada vía `<iframe>` en [`cuidadopersonal.md`](cuidadopersonal.md) (subtab "Ejercicio"). Comparte `localStorage` con el shell por origen `file://` compartido (ver `cuidadopersonal.md`).
- El **Dashboard** (`../Dashboard/dashboard.html`) **no** lee `mirutina_v1` todavía — no hay ninguna tarjeta ni score derivado de esta app en el Dashboard más allá del enlace de acceso directo en "Todas mis apps" (que en realidad muestra estadísticas de `misalud_v1.ejercicios`, no de esta app). Si se quiere integrar racha/sesiones de esta app al Dashboard, es trabajo pendiente — habría que replicar la lógica de `S.rutina`/`S.sesiones` en `Dashboard/dashboard.html` siguiendo el mismo patrón que ya existe para `RUTINA_TASKS`/`SK`/`PHASES` (ver [`../README.md`](../README.md) sección "Datos duplicados").
- Distinto de `CuidadoPersonal/salud.md` → sección "💪 Ejercicio" interna de Salud, que es un registro **ligero** de cardio/fuerza que sí alimenta el cálculo de calorías netas del día — no confundir ambos trackers de ejercicio.
- Mapa completo del proyecto: [`../README.md`](../README.md).

## Cómo usarlo

Se abre `CuidadoPersonal/cuidadopersonal.html` (subtab Ejercicio) o directamente `ejercicio.html` en cualquier navegador, sin instalación ni servidor. No hay sincronización entre dispositivos salvo mediante exportación manual del JSON.
