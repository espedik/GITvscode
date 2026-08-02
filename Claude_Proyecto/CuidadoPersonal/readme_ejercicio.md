# ejercicio.html — Mi Rutina: Entrenamiento Semanal

Aplicación web de una sola página (HTML+CSS+JS, sin backend) para planear una rutina de gimnasio semanal, ejecutar los entrenamientos en vivo con registro de series/peso/reps, y hacer seguimiento del progreso de fuerza. Los datos se guardan en `localStorage` (clave `mirutina_v1`).

**Ubicación actual**: vive en `CuidadoPersonal/ejercicio.html` (movida aquí el 2026-07-29 desde `Ejercicio/ejercicio.html`, sin cambios de código — solo de carpeta; la carpeta `Ejercicio/` ya no existe). Se abre normalmente **incrustada** dentro de `CuidadoPersonal/cuidadopersonal.html` → subtab **🏋️ Ejercicio**, vía `<iframe src="ejercicio.html">`. También puede abrirse directo sin pasar por el shell.

## Base de datos de ejercicios

Trae precargados 56 ejercicios (`EJ_DB`) organizados por músculo (Pecho, Espalda, Hombros, Bíceps, Tríceps, Piernas, Glúteos, Core, Cardio), cada uno con equipo requerido (Barra, Mancuernas, Máquina, Cuerpo, etc.) y tipo (Compuesto/Aislamiento/Cardio). **Desde el 2026-07-30**, 33 de los 56 ejercicios (los que forman el programa por defecto) tienen además `img` (foto/diagrama real, verificado contra la API de Wikimedia Commons — `upload.wikimedia.org`, licencia libre) y 38 tienen `cue` (técnica correcta en 1 línea). Los ejercicios sin `img`/`cue` simplemente no muestran esa parte de la tarjeta (fallback a un ícono genérico 🏋️) — no hay URLs inventadas. También se pueden agregar ejercicios propios, que se guardan aparte (`S.ejerciciosCustom`) y se combinan con los predefinidos en toda la app (`getAllEj()`).

## Navegación (sidebar propio de este archivo)

- **📊 Dashboard** — banner fijo con la meta activa (ver abajo), racha de días consecutivos entrenando, sesiones completadas esta semana vs. meta, total histórico de sesiones, vista de la semana (qué día toca qué rutina y si ya se hizo), mapa de músculos trabajados en la semana, y preview del entrenamiento de hoy (con imagen y técnica por ejercicio).
- **💪 Entrenar Hoy** — flujo principal: si hay rutina asignada al día, muestra los ejercicios planeados (con imagen, técnica, series/reps/descanso) junto con el mejor resultado de la última vez que se entrenó ese día. Al pulsar "Iniciar entrenamiento" entra en **modo activo**: por cada ejercicio (con miniatura de imagen y técnica visibles) se registran series con peso y repeticiones, marcando cada serie como hecha (✅). Incluye un cronómetro de descanso configurable (1, 1:30, 2, 3 min) entre series. Al terminar, la sesión se guarda con duración total y el detalle de todas las series.
- **🗓️ Mi Rutina** — **rediseñada por completo el 2026-07-30** ("pon subtabs de la semana y detállame cada rutina", "agrega imágenes de internet"). Ya no es una grilla de 7 mini-tarjetas: ahora es un banner de meta + **subtabs de día** (`#rutina-day-tabs`, un botón `.day-tab` por día con puntito de color según `tipo`) que abren un **panel de detalle** (`#rutina-detalle`, `renderRutinaDetalle()`) con una tarjeta grande `.exd-card` por ejercicio — imagen real, número, músculo/equipo, series×reps×descanso, y la técnica (`cue`) en una línea. Ver "Programa por defecto" abajo.
- **📚 Biblioteca** — catálogo completo de ejercicios agrupado por músculo, con filtros por texto, músculo y equipo; las tarjetas ahora muestran imagen y técnica cuando el ejercicio las tiene. Permite agregar ejercicios propios y eliminarlos.
- **📈 Progreso** — selecciona un ejercicio con historial y muestra una gráfica (Chart.js) de la evolución del peso máximo levantado por sesión, además del récord personal (PR) y la progresión total en kg.
- **📋 Historial** — lista de todas las sesiones completadas, con series hechas, volumen total (toneladas movidas) y detalle de los mejores pesos por ejercicio.
- **🧭 Deportes para Explorar** (**nuevo el 2026-08-01**, contenido 100% estático, sin `localStorage` ni JS de render — no está en `RENDERS`, solo en `SECS`/`STITLE` para navegación) — pedido explícito de Adán: *"ponme una sección de todos los deportes asequibles que puedo hacer, estaría interesante explorar, pero detállalos y dame toda la info con fotos y por que me gustaría"*. 8 tarjetas `.sport-card` (grid `.sport-grid`, 2 columnas) + 1 tarjeta bonus a ancho completo, cada una con foto real (Wikimedia Commons, mismo criterio de licencia libre que `EJ_DB.img`), descripción, un bloque `.sport-why` con **razón personalizada** (no genérica) ligada a su perfil real, y `.sport-meta` con costo aproximado en CDMX, dónde practicarlo y equipo necesario:
  1. 🏋️ **Hyrox** — conecta directo con su meta de bucket list ("Hyrox" e "Hyrox internacional", ver `Dashboard/readme_dashboard.md` → slide Mis Metas).
  2. 🥊 **Boxeo** — cardio para la meta de "bajar panza".
  3. 🧗 **Escalada deportiva (bouldering)** — paralelismo con su formación en mecatrónica (control/cinemática).
  4. 🚴 **Ciclismo urbano/de ruta** — afinidad con su perfil de ingeniero automotriz.
  5. 🏊 **Natación** — bajo impacto articular, complementa el volumen de sentadilla/peso muerto ya en `S.rutina`.
  6. 🥾 **Senderismo** — económico, compatible con su prioridad actual de liquidar deuda (ver `[[project-millonario-finanzas]]` en memoria).
  7. 🏓 **Pádel** — networking informal fuera del ámbito automotriz, relevante para sus opciones de negocio paralelo.
  8. 🤸 **Calistenia en parques** — gratis, extensión directa de las dominadas/fondos que ya hace en su split de brazos/espalda.
  9. ♟️🥊 **Bonus — Chessboxing** (`.sport-card.bonus`, ancho completo) — intersección literal de dos metas ya en su lista (torneo de ajedrez + boxeo).

  Todas las referencias de ubicación (Santa María la Ribera, Parque España/México, Alberca Olímpica Francisco Márquez, Desierto de los Leones, Monkey Bloc, Reforma/Muévete en Bici) y de costo son aproximaciones razonables para CDMX, no verificadas contra una fuente en vivo — si cambian precios/ubicaciones reales, actualizar aquí a mano. Las 9 URLs de imagen se verificaron una por una con `curl` (HTTP 200) antes de insertarlas, mismo estándar que `EJ_DB.img`.

## Programa por defecto — a la medida de la meta de Adán (2026-07-30)

Pedido explícito: *"mi meta es ganar masa muscular de brazos y piernas, bajar panza por que subí de peso ahí"*. El `S.rutina` precargado (antes tenía un **bug real**: la clave `5` estaba duplicada en el objeto — Viernes se sobreescribía y se perdía — corregido en esta reescritura) ahora es un split de 6 días + descanso:

| Día | Rutina | Por qué |
|---|---|---|
| Lunes | 💪 Brazos A — Bíceps + Tríceps (pesado) | Prioridad #1: brazos 2x/semana |
| Martes | 🦵 Piernas A — Cuádriceps | Prioridad #1: piernas 2x/semana |
| Miércoles | 🔙 Espalda + Hombros + Cardio HIIT (Battle Ropes) | Mantenimiento + cardio para bajar grasa |
| Jueves | 💪 Brazos B — Bíceps + Tríceps (volumen, ejercicios distintos al lunes) | Prioridad #1: brazos 2x/semana |
| Viernes | 🦵 Piernas B — Glúteo + Femoral | Prioridad #1: piernas 2x/semana |
| Sábado | 🔥 Pecho + Cardio (elíptica 25 min) + Core (rueda abdominal) | Mantenimiento + cardio + core |
| Domingo | 😴 Descanso activo (caminata opcional) | Recuperación |

Cada día trae un campo `foco` (texto, se muestra en el banner del detalle) explicando la prioridad de ese día. **Sobre "bajar panza"**: el banner de `#s-rutina` es honesto — no existe la reducción localizada de grasa; el core de esta rutina define músculo debajo, pero lo que baja grasa de la zona media es déficit calórico sostenido (enlaza a `CuidadoPersonal/salud.html`) + el cardio de miércoles/sábado.

## Modelo de datos — `localStorage['mirutina_v1']`

```js
{
  rutina: {                 // indexado por día: 0=Domingo … 6=Sábado
    1: { nombre, tipo:'brazos|empuje|halar|piernas|core|fullbody|cardio|descanso', foco:'texto opcional',
         ejercicios:[{ ejercicioId, series, reps, unidad:'reps|seg|min' (opcional, default reps), descanso:segundosOpcional }] },
    // ... 0-6
  },
  ejerciciosCustom: [{ id, nombre, musculo, equipo, tipo }],
  sesiones: [{ id, fecha, dia, duracion_min,
               ejercicios:[{ ejercicioId, series:[{ peso, reps, hecha:true }] }] }]
}
```
`unidad` y `descanso` son nuevos (2026-07-30) — solo se usan para mostrar el dato correcto en el detalle (p.ej. Plancha son 45 **segundos**, no 45 reps; Elíptica son 25 **minutos**). El modal "Configurar día" (`saveRutina()`) todavía solo edita `series`/`reps` por ejercicio — si se edita un día desde ahí, se pierde el `foco`/`unidad`/`descanso` curados (limitación conocida, no bloqueante).

El horario semanal (`S.rutina`) viene precargado con el programa de 6 días de arriba al primer uso. **`init()` llama a `save()` justo después de `load()` (fix 2026-07-30)** — antes el programa por defecto solo vivía en memoria hasta que el usuario guardaba algo a mano (configurar un día, terminar un entrenamiento o exportar), así que el Dashboard veía `mirutina_v1` vacío (`rutina:{}`) si Adán nunca había interactuado con la app, aunque el programa completo ya estuviera cargado en pantalla. Mismo patrón que ya usaba `salud.html` (guarda perfil/metas por defecto si no hay datos).

## Funcionalidad clave

- **Rutina por día de la semana**: `S.rutina` es un objeto indexado por día (0=Domingo … 6=Sábado) con nombre, tipo de entrenamiento, `foco` y su lista de ejercicios.
- **Subtabs de día + detalle** (`verRutinaDia(d)`, `renderRutinaDetalle()`): estado `rutinaDiaSel` (por defecto, hoy) controla qué día se muestra; cambiar de tab no recarga nada, solo repinta `#rutina-detalle`.
- **Modo de entrenamiento en vivo** (`workoutActivo`): trackea cada serie de cada ejercicio en tiempo real mientras se entrena, con inputs editables de peso y reps.
- **Timer de descanso**: cuenta regresiva visual que cambia de color cuando quedan ≤10 segundos.
- **Cálculo de progreso**: a partir del historial de sesiones se identifica el peso máximo levantado por ejercicio en cada sesión, para graficar la progresión y calcular el récord personal.
- **`today()`** usa `new Date().toISOString().slice(0,10)` (UTC) — misma convención que el resto del proyecto.
- **Exportar datos**: botón en la barra lateral descarga un JSON de respaldo (`rutina_YYYY-MM-DD.json`).

## Rediseño de interfaz (2026-07-31)

Adán pidió explícitamente "el contenido me gusta pero la interfaz no" — rediseño puramente visual, **sin tocar HTML ni JS**, solo los valores del `<style>`. El mismo tratamiento (quitar gradiente/glow) se aplicó también a `salud.html`, `comida.html` y a las partes oscuras/genéricas del shell `cuidadopersonal.html` (ver sus `.md` respectivos — `readme_salud.md`, `readme_comida.md`, `readme_cuidadopersonal.md` → "Rediseño de interfaz del shell"), alineando el look de las 4 apps al lenguaje visual "premium minimalista" que ya se validó en `Coach/Coach_v2.html` (rediseño del 2026-07-18: sin gradientes decorativos, sin glow de neón, tarjetas planas). **Los temas pastel de Skincare/Cabello (`#view-skincare`/`#view-cabello`) no se tocaron** — tuvieron su propio rediseño dedicado el 2026-07-29, ya aprobado, y sus gradientes (`.sk-hero`/`.ca-hero`, botones) son parte intencional de ese tema, no la decoración genérica que se pidió quitar aquí.

Se quitó, en todo el `<style>`:
- `background-image` con manchas radiales de color detrás del `body`.
- `backdrop-filter: blur(...)` en sidebar/topbar/card/modal/confirm (dejaban de tener sentido al volver los fondos opacos).
- Texto con gradiente (`background: linear-gradient(...); -webkit-background-clip: text`) en `.sb-logo h1` y `.sh h2` — ahora color plano.
- `box-shadow: 0 0 Npx rgba(...)` (glow de neón) en `.btn-p`/`.btn-g`, `.day-card.today`, `.day-tab.active`, `.modal` — los botones ahora son de color sólido con un `hover` que solo sube 1px y usa la sombra estándar `var(--sh)`.
- El degradado de dos colores en `.meta-banner` se aplanó a un solo tono.

**Se conservaron sin tocar**: todas las variables de color (`--p`, `--g`, `--b`, `--pu`, `--w`, `--r`) y sus valores — el JS genera decenas de estilos inline con `var(--p)` etc. y con `rgba(255,107,53,...)` literal (color del muscle map, chips, badges), así que cambiar los valores de esas variables sin auditar cada uso hubiera desincronizado el color de las tarjetas generadas por JS del resto de la interfaz. El anillo de foco de inputs (`box-shadow: 0 0 0 3px ...`) y el degradado sutil de `.pr-badge` se dejaron igual — son patrones funcionales/de acento, no la decoración genérica que se pidió quitar.

Verificado con un smoke test en jsdom (`nav()` a las 6 secciones) sin errores de consola tras el cambio.

## Modo oscuro/claro (2026-07-31)

Botón `.theme-toggle-btn` junto a "💪 Entrenar ahora" en el topbar. `--surface`/`--surface-2`/`--surface-3` (nuevas) reemplazan los hex sólidos que dejó el rediseño de interfaz de arriba (`#161619`/`#18181c`/`#1b1b20`) para que puedan invertirse por tema; el resto de bordes/hovers usa el truco `--ov` (ver `../README.md`). El gráfico de progreso de fuerza (`ch-prog`, único uso de Chart.js aquí) tenía `borderColor:'var(--p)'` y similares — **Chart.js no resuelve `var()`** porque pinta a `<canvas>`, así que se cambió a un helper `cssVar(n)` que lee `getComputedStyle` en el momento de crear la gráfica; `toggleTheme()` vuelve a llamar al render de la sección activa (`RENDERS[activa]()`) para que la gráfica visible se redibuje con los colores correctos al cambiar de tema. `TIPO_COL`/`MUSCULO_COL` (colores por tipo de rutina/músculo) se dejaron con hex literal a propósito, igual que `CAT_META` en Dashboard — son categorización visual, no chrome de la interfaz, y ya son colores saturados que funcionan razonablemente en ambos temas.

## Referencias cruzadas

- Incrustada vía `<iframe>` en [`readme_cuidadopersonal.md`](readme_cuidadopersonal.md) (subtab "Ejercicio"). Comparte `localStorage` con el shell por origen `file://` compartido (ver `readme_cuidadopersonal.md`).
- El **Dashboard** (`../Dashboard/dashboard.html`) lee `mirutina_v1` desde el 2026-07-30 (`D.gym` en `loadAll()`): `sesiones`, `rutina` (qué toca cada día) y `metas.frecuencia`. Se usa en el slide Hero ("JARVIS · Tu semana completa") en la tira de 7 días (qué rutina se entrenó o toca cada día) y en el panel "🏋️ Gym esta semana" (lista de sesiones reales de la semana + qué toca hoy). **No** lee el detalle de series/pesos ni calcula progreso de fuerza — la píldora de acceso directo en la barra superior fija (`renderQuickApps()`) tampoco muestra estadística de esta app. Si se edita la forma de `S.rutina`/`S.sesiones` aquí (nombres de campos, estructura), revisar `renderHero()` en `Dashboard/dashboard.html`.
- Distinto de `CuidadoPersonal/readme_salud.md` → sección "💪 Ejercicio" interna de Salud, que es un registro **ligero** de cardio/fuerza que sí alimenta el cálculo de calorías netas del día — no confundir ambos trackers de ejercicio.
- Mapa completo del proyecto: [`../README.md`](../README.md).

## Cómo usarlo

Se abre `CuidadoPersonal/cuidadopersonal.html` (subtab Ejercicio) o directamente `ejercicio.html` en cualquier navegador, sin instalación ni servidor. No hay sincronización entre dispositivos salvo mediante exportación manual del JSON.
