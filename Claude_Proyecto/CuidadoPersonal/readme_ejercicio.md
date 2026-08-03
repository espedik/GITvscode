# ejercicio.html — Mi Rutina: Entrenamiento Semanal

Aplicación web de una sola página (HTML+CSS+JS, sin backend) para planear y consultar una rutina de gimnasio semanal completa, con la biblioteca de ejercicios que la respalda y la ficha real del gimnasio al que va Adán (Fitsi Buenavista). Los datos se guardan en `localStorage` (clave `mirutina_v1`). **Ya no registra entrenamientos en vivo** — ver "Reestructuración 2026-08-02" más abajo.

**Ubicación actual**: vive en `CuidadoPersonal/ejercicio.html` (movida aquí el 2026-07-29 desde `Ejercicio/ejercicio.html`, sin cambios de código — solo de carpeta; la carpeta `Ejercicio/` ya no existe). Se abre normalmente **incrustada** dentro de `CuidadoPersonal/cuidadopersonal.html` → subtab **🏋️ Ejercicio**, vía `<iframe src="ejercicio.html">`. También puede abrirse directo sin pasar por el shell.

## Base de datos de ejercicios

Trae precargados 56 ejercicios (`EJ_DB`) organizados por músculo (Pecho, Espalda, Hombros, Bíceps, Tríceps, Piernas, Glúteos, Core, Cardio), cada uno con equipo requerido (Barra, Mancuernas, Máquina, Cuerpo, etc.) y tipo (Compuesto/Aislamiento/Cardio). **Desde el 2026-07-30**, 33 de los 56 ejercicios (los que forman el programa por defecto) tienen además `img` (foto/diagrama real, verificado contra la API de Wikimedia Commons — `upload.wikimedia.org`, licencia libre) y 38 tienen `cue` (técnica correcta en 1 línea). Los ejercicios sin `img`/`cue` simplemente no muestran esa parte de la tarjeta (fallback a un ícono genérico 🏋️) — no hay URLs inventadas. También se pueden agregar ejercicios propios, que se guardan aparte (`S.ejerciciosCustom`) y se combinan con los predefinidos en toda la app (`getAllEj()`).

## Navegación (sidebar propio de este archivo)

**Reestructurada por completo el 2026-08-02** — ver la sección dedicada más abajo para el detalle de qué cambió y por qué. Estructura actual, 4 secciones:

- **🏋️ Mi Rutina** — sección fusionada (antes Dashboard + Mi Rutina eran dos secciones separadas): banner de meta activa, 4 KPIs calculados directo del plan semanal (días de entreno, días de descanso, grupos musculares cubiertos, qué toca hoy), vista de la semana completa (clic en cualquier día salta a su detalle), mapa de músculos que cubre toda la rutina semanal, y — en la misma pantalla, debajo — el detalle día por día con **subtabs de día** (`#rutina-day-tabs`, un botón `.day-tab` por día con puntito de color según `tipo`) que abren un **panel de detalle** (`#rutina-detalle`, `renderRutinaDetalle()`) con una tarjeta grande `.exd-card` por ejercicio — imagen real, número, músculo/equipo, series×reps×descanso, y la técnica (`cue`) en una línea. Ver "Programa por defecto" abajo.
- **📚 Biblioteca** — catálogo completo de ejercicios agrupado por músculo, con filtros por texto, músculo y equipo; las tarjetas ahora muestran imagen y técnica cuando el ejercicio las tiene. Permite agregar ejercicios propios y eliminarlos.
- **🏢 Fitsi** (**nuevo el 2026-08-02**) — ficha real del gimnasio de Adán, Fitsi Buenavista. Ver sección dedicada más abajo.
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
  fitsiCalendario: { 1:'texto libre', 2:'', ..., 0:'' }  // nuevo 2026-08-02, ver sección Fitsi
}
```
`unidad` y `descanso` son nuevos (2026-07-30) — solo se usan para mostrar el dato correcto en el detalle (p.ej. Plancha son 45 **segundos**, no 45 reps; Elíptica son 25 **minutos**). El modal "Configurar día" (`saveRutina()`) todavía solo edita `series`/`reps` por ejercicio — si se edita un día desde ahí, se pierde el `foco`/`unidad`/`descanso` curados (limitación conocida, no bloqueante).

**`sesiones` se quitó del modelo el 2026-08-02** (ver "Reestructuración" abajo) — ya no hay forma de registrar un entrenamiento en vivo, así que ese arreglo dejó de tener sentido. Si un navegador todavía tiene sesiones guardadas de antes de este cambio, `load()` las conserva en memoria (el `{...S,...JSON.parse(d)}` del merge no las descarta), pero ninguna pantalla las lee ni las muestra — quedan inertes.

El horario semanal (`S.rutina`) viene precargado con el programa de 6 días de arriba al primer uso. **`init()` llama a `save()` justo después de `load()` (fix 2026-07-30)** — antes el programa por defecto solo vivía en memoria hasta que el usuario guardaba algo a mano (configurar un día, terminar un entrenamiento o exportar), así que el Dashboard veía `mirutina_v1` vacío (`rutina:{}`) si Adán nunca había interactuado con la app, aunque el programa completo ya estuviera cargado en pantalla. Mismo patrón que ya usaba `salud.html` (guarda perfil/metas por defecto si no hay datos).

## Funcionalidad clave

- **Rutina por día de la semana**: `S.rutina` es un objeto indexado por día (0=Domingo … 6=Sábado) con nombre, tipo de entrenamiento, `foco` y su lista de ejercicios.
- **Resumen de la semana calculado del plan, no de sesiones** (`renderResumenSemana()`): días de entreno/descanso, grupos musculares cubiertos y "hoy toca" salen de recorrer `S.rutina` directo — siempre disponibles, sin depender de haber registrado nada.
- **Subtabs de día + detalle** (`verRutinaDia(d)`, `renderRutinaDetalle()`): estado `rutinaDiaSel` (por defecto, hoy) controla qué día se muestra; cambiar de tab no recarga nada, solo repinta `#rutina-detalle`.
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

**Se conservaron sin tocar**: todas las variables de color (`--p`, `--g`, `--b`, `--pu`, `--w`, `--r`) y sus valores — el JS genera decenas de estilos inline con `var(--p)` etc. y con `rgba(255,107,53,...)` literal (color del muscle map, chips, badges), así que cambiar los valores de esas variables sin auditar cada uso hubiera desincronizado el color de las tarjetas generadas por JS del resto de la interfaz. El anillo de foco de inputs (`box-shadow: 0 0 0 3px ...`) se dejó igual — es un patrón funcional/de acento, no la decoración genérica que se pidió quitar. (`.pr-badge`, el degradado de récord personal, se eliminó el 2026-08-02 junto con Progreso — ver "Reestructuración" abajo.)

Verificado con un smoke test en jsdom (`nav()` a las 6 secciones) sin errores de consola tras el cambio.

## Modo oscuro/claro (2026-07-31)

Botón `.theme-toggle-btn` en el topbar. `--surface`/`--surface-2`/`--surface-3` (nuevas) reemplazan los hex sólidos que dejó el rediseño de interfaz de arriba (`#161619`/`#18181c`/`#1b1b20`) para que puedan invertirse por tema; el resto de bordes/hovers usa el truco `--ov` (ver `../README.md`). `TIPO_COL`/`MUSCULO_COL` (colores por tipo de rutina/músculo) se dejaron con hex literal a propósito, igual que `CAT_META` en Dashboard — son categorización visual, no chrome de la interfaz, y ya son colores saturados que funcionan razonablemente en ambos temas. (Chart.js y el helper `cssVar()` que necesitaba para temizar su gráfica se eliminaron el 2026-08-02 junto con Progreso — ya no hay ninguna gráfica en el archivo.)

## Fitsi Buenavista — ficha del gimnasio real (nuevo, 2026-08-02)

Pedido explícito de Adán: *"agrega una nueva sección llamada Fitsi, este es el gym al que voy, entonces debes buscar en internet el calendario de los eventos que hay en Buenavista"*. Se investigó `fitsi.com.mx/clubes/buenavista` y su página principal antes de escribir nada:

- **Datos verificados y usados tal cual** (`renderFitsi()`, constantes `FITSI_CLASES`/`FITSI_INSTALACIONES`): dirección (Eje 1 Nte. 259, Buenavista, Cuauhtémoc, CDMX), teléfono (55 6535 8823), horario de servicio (L-V 5:00am-12:00am, S-D 7:00am-8:00pm, festivos 7:00am-3:00pm), la lista de 11 clases grupales que ofrece (Fit Step, Zumba, Pilates, Cycling, Strong, Barre, Yoga, Aquafit, Body Pump, Salsa en Línea, Power Jump — 45-50 min c/u), las 10 instalaciones (alberca semiolímpica, vapor, salones, áreas de peso, etc.) y una tabla de referencia de precios de membresía (Shape Up $799/mes, Dorada $1,099/mes, Dorada Plus $1,399/mes, Third Age).
- **Lo que NO se inventó**: Fitsi no publica en su sitio web un calendario semanal con día/hora exacta por clase (se buscó explícitamente y no existe como contenido indexable — ni en la página del club ni en la principal). En vez de fabricar horarios falsos, la sección trae **"Tu calendario real de clases — captúralo tú"** (`#fitsi-calendario`, `S.fitsiCalendario` por día `0-6`): 7 campos de texto libre, uno por día, que Adán llena a mano con lo que vea en la app de Fitsi o en el pizarrón del club — se guardan solos en `localStorage` (`oninput` → `save()`) para no tener que volver a escribirlo cada vez.
- Mismo patrón ya usado antes en el proyecto para "no inventar datos que no se pueden verificar en vivo" — ver `Finanzas/readme_finanzas.md` → `WEEKLY_PICKS` (precios de acciones) y `Dashboard/readme_dashboard.md`.

## Reestructuración 2026-08-02 — se quita el registro en vivo, se fusiona Dashboard+Mi Rutina, entra Fitsi

Pedido explícito de Adán: *"en ejercicio borra la sección de entrenar hoy, fusiona lo de dashboard y lo de mi rutina, esta nueva debe ser muy completa, elimina lo de progreso e historial, agrega una nueva sección llamada Fitsi"*.

| Antes (7 secciones) | Después (4 secciones) |
|---|---|
| 📊 Dashboard | fusionada dentro de → |
| 🗓️ Mi Rutina | 🏋️ **Mi Rutina** (resumen + detalle día por día, una sola pantalla) |
| 💪 Entrenar Hoy | **eliminada**, sin reemplazo |
| 📈 Progreso | **eliminada**, sin reemplazo |
| 📋 Historial | **eliminada**, sin reemplazo |
| 📚 Biblioteca | 📚 Biblioteca (sin cambios) |
| — | 🏢 **Fitsi** (nueva) |
| 🧭 Deportes | 🧭 Deportes (sin cambios) |

**Qué se eliminó y por qué queda huérfano sin reemplazo**: "Entrenar Hoy" era el flujo de registrar series/peso/reps en vivo con cronómetro de descanso (`renderHoy()`, `iniciarWorkout()`, `updateSet()`, `toggleSet()`, `terminarWorkout()`, más todo el módulo de timer — `openTimer()`/`setTimer()`/`pauseTimer()`/`updateTimerDisplay()` y el modal `#mo-timer`). Como "Progreso" (gráfica de peso máximo por sesión, Chart.js) e "Historial" (lista de sesiones con volumen total) **dependían al 100% de las sesiones que generaba ese flujo**, quitar "Entrenar Hoy" las dejaba condenadas a estar siempre vacías — se eliminaron las tres juntas, en vez de dejar dos pantallas muertas. `S.sesiones` salió del modelo de datos (ver "Modelo de datos" arriba); `Chart.js` (el único uso en el archivo) se quitó del `<head>`.

**Cómo quedó "Mi Rutina" tras la fusión** (`renderMiRutina()` = `renderResumenSemana()` + `renderRutina()`, ambas en la misma sección `#s-rutina`): los 4 KPIs y el mapa de músculos que antes usaban `S.sesiones` (racha de días, sesiones esta semana vs. meta, músculos trabajados esta semana) se recalcularon para salir **directo del plan semanal** (`S.rutina`) en vez de sesiones registradas — días de entreno/semana, días de descanso, grupos musculares que cubre toda la semana, y qué toca hoy. Esto los hace útiles siempre, no solo si Adán registró algo ese día. La vista de la semana ya no tiene botón "Iniciar" (llevaba a la sección eliminada) — ahora hace clic para saltar al detalle de ese día. El botón "💪 Entrenar" del detalle de día también se quitó por la misma razón.

**Limpieza de código muerto**: además de las funciones/modal ya mencionados, se quitaron `killChart`/`cssVar` (solo los usaba el Chart.js de Progreso), `fmtD` (solo lo usaban Entrenar Hoy/Progreso/Historial), y el CSS `.chart-c`/`.set-row`/`.set-num`/`.set-input`/`.timer-display`/`.pr-badge` (sin ningún uso restante). Verificado con un grep de cada nombre de función/id/clase eliminado contra el archivo completo — cero referencias huérfanas.

**El Dashboard no necesitó ningún cambio**: `Dashboard/dashboard.html` lee `mirutina_v1` con sus propios valores por defecto (`tryParse('mirutina_v1',{rutina:{},sesiones:[],metas:{frecuencia:6}})`), así que aunque `ejercicio.html` ya no escriba `sesiones`/`metas`, el Dashboard simplemente los ve vacíos (como ya pasaba si Adán nunca entrenaba en vivo) sin romperse — verificado con Playwright abriendo `ejercicio.html` y después `Dashboard/dashboard.html` en el mismo contexto, el slide Hero sigue mostrando "hoy toca" correctamente desde `S.rutina`.

## Referencias cruzadas

- Incrustada vía `<iframe>` en [`readme_cuidadopersonal.md`](readme_cuidadopersonal.md) (subtab "Ejercicio"). Comparte `localStorage` con el shell por origen `file://` compartido (ver `readme_cuidadopersonal.md`).
- El **Dashboard** (`../Dashboard/dashboard.html`) lee `mirutina_v1` desde el 2026-07-30 (`D.gym` en `loadAll()`): `rutina` (qué toca cada día) es lo único con contenido real desde el 2026-08-02 — `sesiones`/`metas` ya no los escribe este archivo (ver "Reestructuración" arriba), así que el Dashboard siempre los ve como sus propios valores por defecto. Se usa en el slide Hero ("JARVIS · Tu semana completa") en la tira de 7 días (qué rutina toca cada día) y en el panel "🏋️ Gym esta semana" (qué toca hoy). Si se edita la forma de `S.rutina` aquí (nombres de campos, estructura), revisar `renderHero()` en `Dashboard/dashboard.html`.
- **Nota histórica (corregida 2026-08-02)**: `salud.html` solía tener su propia sección "💪 Ejercicio" interna (registro ligero de cardio/fuerza para el cálculo de calorías netas del día) — se eliminó por completo el 2026-08-02 (petición explícita de Adán: era redundante con esta app) sin reemplazo, ver `readme_salud.md` → "Reestructuración — nutrición se mudó a Comida". Ya no hay dos trackers de ejercicio en el ecosistema, y desde este mismo día tampoco este archivo registra entrenamientos — solo planea y consulta.
- Mapa completo del proyecto: [`../README.md`](../README.md).

## Cómo usarlo

Se abre `CuidadoPersonal/cuidadopersonal.html` (subtab Ejercicio) o directamente `ejercicio.html` en cualquier navegador, sin instalación ni servidor. No hay sincronización entre dispositivos salvo mediante exportación manual del JSON.
