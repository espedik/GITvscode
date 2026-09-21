# ejercicio.html — Mi Rutina: Entrenamiento Semanal

App de una sola página (HTML+CSS+JS, sin backend) para **entrenar con la rutina semanal**: la
sesión de hoy con técnica paso a paso, series marcables con kilos, cronómetro de descanso y
progresión; la biblioteca de 62 ejercicios que la respalda; y una sección de deportes para
explorar. Datos en `localStorage['mirutina_v1']`.

> Referencia, no diario. Historial en `git log -p -- Claude_Proyecto/CuidadoPersonal/ejercicio.html`.

Vive en `CuidadoPersonal/ejercicio.html`. Se abre incrustada en `cuidadopersonal.html` (pestaña
**Ejercicio**, `<iframe src="ejercicio.html?embed=1">`; `embed.js` calla su carril y cabecera y
habla con el shell por `postMessage` — ver `readme_cuidadopersonal.md`) o directa. Comparte
`localStorage` con el resto por origen `file://`.

## Secciones

`SECS = ['rutina','biblioteca','deportes']`, títulos en `STITLE`, render en `RENDERS` (Deportes es
estático, sin render ni `localStorage`). `nav(s)` cambia de sección.

| Sección | Qué es |
|---|---|
| 🏋️ **Mi Rutina** | La sesión de hoy, los KPIs, el cronómetro y la progresión — abajo |
| 📚 **Biblioteca** | Los 62 ejercicios de `EJ_DB` + los propios, agrupados por músculo, con filtros por texto, músculo y equipo; agregar y eliminar propios; tocar uno abre su ficha |
| 🧭 **Deportes para Explorar** | 8 tarjetas `.sport-card` + un bonus a ancho completo (Chessboxing), cada una con foto de Wikimedia, por qué le conviene a Adán, costo aproximado en CDMX, dónde y equipo |

En Deportes, ubicaciones y costos son aproximaciones no verificadas en vivo, **salvo Natación**:
Adán nada en la alberca semiolímpica de su gimnasio, Fitsi Buenavista, incluida en su membresía.

## La biblioteca — `EJ_DB`

**62 ejercicios** en 9 músculos (`MUSCULOS_ALL`: Pecho 7, Espalda 7, Hombros 6, Bíceps 6, Tríceps 5,
Piernas 9, Glúteos 4, Core 6, Cardio 12 — incluidos los 5 bloques de natación `e058`-`e062`), cada
uno con `musculo`, `equipo`, `tipo` (Compuesto/Aislamiento/Cardio) y:

- **`cue`** — una línea de técnica en español simple, **sin jerga de gym** ("aprieta los hombros
  hacia atrás y abajo", no "escápulas retraídas"). Es el texto de la tarjeta de la biblioteca y el
  respaldo si un ejercicio no trajera `pasos` (`ejPasos()` lo parte en frases).
- **`pasos`** — la técnica en orden, **285 pasos en total, 4 a 5 por ejercicio**, siempre en el
  mismo orden: cómo te montas → qué aprietas antes de moverte → la fase de trabajo con su punto
  de parada → la vuelta, con tempo si importa → el detalle que casi todos se saltan.
- **`error`** — el fallo que se ve siempre en ese movimiento y cómo se nota.
- **`img`** en **45 de los 62**: ilustraciones de línea de la familia **Everkinetic** de Wikimedia
  Commons (`Category:Weight training diagrams`), un solo estilo a propósito. Los SVG de Commons a
  veces se sirven como `text/plain` y Chromium no los pinta en `<img>`: se enlaza la miniatura PNG
  (`.../thumb/…/960px-Archivo.svg.png`). Los 17 sin imagen **se quedan así a propósito**: no hay
  diagrama de esa familia (todo el cardio y la natación, Face Pull, Oblicuos, Dead Bug) o el único
  candidato contradecía la técnica del `cue` (Búlgara con el pie en el piso) o era de otro estilo
  (Plancha). Ningún diagrama antes que uno inconsistente o incorrecto; no hay URLs inventadas.

Los propios van en `S.ejerciciosCustom` y `getAllEj()` los combina con `EJ_DB` en toda la app.

## La rutina por defecto

A la medida de la meta de Adán: masa en brazos y definir la zona media. `S.rutina` indexado por
día (0 = domingo):

| Día | Rutina | `tipo` | Ejercicios |
|---|---|---|---|
| Lunes | Brazos A — Bíceps + Tríceps | `brazos` | 5: Fondos (compuesto, primero) + Curl con barra, Patada de tríceps, Curl martillo, Pushdown |
| Martes | Piernas — completa | `piernas` | 6, **todo en máquina o con apoyo**: Hack Squat (el pesado, primero), Prensa, Extensión, Curl femoral, Abducción, Pantorrilla |
| Miércoles | Natación — aprender a nadar | `cardio` | 4 bloques que suman 45 min, **en el orden en que se aprende**: flotación y respiración 7 · patada con tabla + respirar de lado 4×4 · brazada de crol 3×4 · nado continuo 10 |
| Jueves | Brazos B — Bíceps + Tríceps | `brazos` | 5, volumen con ejercicios distintos al lunes; Fondos en banco de compuesto |
| Viernes | Abdomen — Core + Cardio | `core` | Plancha 45 s, Elevación de piernas, Crunch, Dead Bug + 25 min de elíptica |
| Sábado | Pecho + Cardio + Core | `empuje` | Press banca, Press inclinado, Aperturas + 25 min de elíptica + Plancha (se repite del viernes a propósito) |
| Domingo | Descanso activo | `descanso` | Caminata 30 min opcional |

Cada día lleva **`foco`**: texto de usuario que explica qué ejercicios de ese día sirven a cuál
meta. El del viernes dice explícitamente que **la reducción localizada no existe**: los
abdominales fortalecen el músculo, la grasa baja con déficit calórico + cardio. Ese aviso vive
una sola vez en `EJ_AVISO` y se pinta en el carril derecho. Los ejercicios retirados por Adán
(Press francés, Búlgara, Rueda abdominal, Oblicuos con cable, Sentadilla con barra, Zancadas,
Peso muerto rumano, Hip thrust) siguen en la biblioteca por si los quiere de vuelta.

**Los 7 `foco` y las 7 listas son idénticos carácter por carácter a `GYM_RUTINA_DEFAULT` de
`Dashboard/dashboard.html`** (el verificador compara los 7 días): las dos apps comparten
migraciones y clave, y la primera que Adán abra es la que escribe.

## Modelo de datos — `localStorage['mirutina_v1']`

```js
{
  rutina: { 0..6: { nombre, tipo:'brazos|empuje|halar|piernas|core|fullbody|cardio|descanso', foco,
                    ejercicios:[{ id, series, reps, unidad:'reps|seg|min', descanso:seg, peso }] } },
  sesiones: { 'YYYY-MM-DD': { e040: [{ok:true, kg:85}, {ok:false, kg:null}, …] } },  // una posición por serie
  ejerciciosCustom: [{ id, nombre, musculo, equipo, tipo }]
}
```

`sesiones` es **lo que de verdad levantó**: de ahí salen racha, volumen, historial y progresión;
nada se calcula que no esté escrito ahí. Una fecha con al menos una serie `ok:true` cuenta como
día entrenado.

**`load()` hace un merge superficial** (`S={...S,...guardado}`) y por eso normaliza `sesiones` y
`ejerciciosCustom` después de leer: contra un guardado viejo, una clave nueva del código
desaparecería. **`init()` llama `save()` después de `load()`**: así el Dashboard ve la rutina
desde la primera apertura, aunque Adán no haya guardado nada a mano.

`today()` usa `toISOString()` (**UTC**): en México adelanta el día a partir de las 18:00. El
Dashboard (`habitos.js`) usa fecha local; si se cambia aquí, revisar `gymSesiones()` allá.

**El modal ✏️ Editar** (`saveRutina()`) hace `S.rutina[dia]={...S.rutina[dia], nombre, tipo,
ejercicios}`: el spread conserva `foco` y cualquier campo que el modal no edite. Solo edita
`series`/`reps` por ejercicio; `unidad`/`descanso` curados se pierden al editar un día
(limitación conocida).

### Migraciones — por qué existen y cómo se bumpean

Como el guardado gana sobre el código, un cambio en `S.rutina` **nunca llega solo** a un
navegador ya usado. Dos funciones entre `load()` y `save()`, con el patrón de Finanzas —bandera
propia, una sola pasada, **solo tocan un día si sigue siendo exactamente el default anterior**
(comparado por nombre), nunca uno que Adán personalizó—:

- `fixMiercolesNatacionIfNeeded()` — bandera `mirutina_v1_miercoles_natacion`.
- `fixRutina20260812IfNeeded()` — bandera `mirutina_v1_pierna_abs_natacion_v3`, aplica los días
  de `RUTINA_DEFAULT_20260812` (copia profunda del default **antes** de que `load()` lo pise).
  Cada tanda de cambios a la rutina **bumpea la bandera** y acepta como "todavía default" los
  nombres intermedios que la versión anterior pudo dejar guardados (`Piernas — completa`,
  `Abdomen — bajar panza`…); si solo comparara contra los de julio, un navegador ya migrado se
  quedaría congelado.

**Las dos están replicadas en `dashboard.html`** con las mismas banderas, para el caso en que
Adán abra el Dashboard sin haber abierto esta app.

## Mi Rutina — la sesión del día

`renderMiRutina()` pinta el día de hoy (`ejDiaVisto = null`) o el que se abrió desde la tira
(`ejVerDia(d)`). Deep-link **`?dia=N`** (0 = domingo) desde el Dashboard → `ejVerDia(N)`.

1. **Cabecera con 3 KPIs** — racha (`ejRacha`), sesiones de esta semana (`ejSesionesSemana`) y
   volumen levantado (kg × reps × series de lo marcado) — y la tira de 7 días (`.week-strip` /
   `.ws-day`, 4 columnas bajo 640 px) con hoy resaltado.
2. **La sesión** — cada ejercicio (`ejEjercicioHtml`) con su imagen, los pasos numerados, el
   error en rojo y **una fila por serie con casilla y campo de kg** (`ejToggleSet`, `ejSetKg` →
   `S.sesiones`). Marcar una serie arranca el cronómetro de descanso con los segundos de ese
   ejercicio (`ejArrancaCrono`, `ejCrono = {id, fin, total}`). "llevas ~21 min" es una
   estimación —series marcadas × (descanso + 40 s)—, no un cronómetro de sesión: no hay `t0`
   guardado, y meterlo en `S.sesiones` rompería los cuatro recorridos por id.
3. **Carril derecho** — cronómetro, progresión contra la última vez que hizo ese ejercicio
   (`ejProgresionHtml`, `ejUltimo`), la regla de cuándo subir de peso (`EJ_SUBIR`) y `EJ_AVISO`.
4. **El resto de la semana**, plegado: una línea por día.

**Mientras `ejVirgen()`** (ni una serie marcada ni un kg en ninguna fecha) sale una banda de
arranque sobre el primer ejercicio que dice qué hacer, y los KPIs en cero llevan `.vacio`
(opacidad 45 %): un cero apagado se lee como "todavía nada", uno a plena intensidad como un dato
roto. El campo de kg mide 112 px (104 en móvil) con "anota los kg" / "antes 45 kg" — un
placeholder truncado no ensancha `scrollWidth`, solo se ve en la captura.

**`verEjercicio(id)`** abre la ficha completa desde la sesión o la biblioteca: pasos, error, en
qué día aparece, historial de pesos (`ejHistorial`) y **tres alternativas del mismo músculo** por
si la máquina está ocupada.

## Diseño

Referencia en `diseno-ejercicio/Main.dc.html`; se acordó midiendo **propiedades calculadas** de
35 pares de elementos mockup → app, no leyendo CSS. Lo que define el look:

- **Superficies translúcidas, no opacas**: `--panel` / `--panel2` / `--linea` son velos blancos al
  4.5 % sobre un fondo casi negro, y por eso se ven las **tres auroras radiales y la rejilla de
  60 px** del `::before` de `#s-rutina` (`inset:-20px 0`; a `-24px` desbordaba). En claro el velo
  no se ve, así que ahí son blanco sólido con sombra de 1 px y las auroras a media opacidad.
- **El ámbar `--am`** (`#ffb15c`; `#c47a12` en claro para 4.5:1) es todo lo que es descanso:
  cronómetro, su barra, los segundos de cada ejercicio, el KPI de volumen. El naranja `--p` es
  el acento de la app; el modal usa `.open`.
- **Space Grotesk** para los números (KPIs, título, series, progresión, cronómetro).
- Grises neutros (`--text #eef2f7`, `--text2 #9aa6b4`, `--text3 #93a0ae`), `--g-txt:#046e3e`
  para el verde en claro. Los contrastes se miden componiendo **toda** la pila de capas
  translúcidas; el estimador de una capa da falsos negativos, y hay combinaciones (número de
  serie sobre serie marcada) que solo existen con la sesión llena.
- `.exd-img` lleva fondo `#f2f2f2` fijo: los diagramas son PNG transparentes de línea negra y
  sobre el gris oscuro del tema se perdían.
- `TIPO_COL` / `MUSCULO_COL` van con hex literal: categorización visual, no chrome.

Tema claro/oscuro con `.theme-toggle-btn`; el enlace al Dashboard (`#btnVolverDash`, 🚀) es otro
botón de esa misma clase, junto al de tema.

## Responsivo

Breakpoints 1100 (`.ej-mid` a una columna), 900, 860, 820, 760 y 640 (sidebar como drawer con
☰, grids a una columna, `.exd-card` en columna). **`.main` lleva `min-width:0`**: es el único hijo
flex de `body` y sin eso su mínimo automático es `min-content`, que en iPad desbordaba 7 px. Se
verifica a 1600 y 390 px con geometría real y cero errores de consola.

## Referencias cruzadas

- **Dashboard** lee `mirutina_v1` como `D.gym`: `rutina` para "qué toca" (con `GYM_RUTINA_DEFAULT`
  como respaldo si nunca se abrió esta app) y `sesiones` con `gymSesiones()`, que acepta esta
  forma y la lista vieja. `EJ_LOOKUP` allá es el subconjunto de nombres/cues que su panel necesita.
  Si cambia la forma de `S.rutina` o `S.sesiones`, revisar `renderDiaEntrena()` y `gymSesiones()`.
- El shell `cuidadopersonal.html` la incrusta; `salud.html` ya no tiene tracker de ejercicio.
- Mapa completo: [`../README.md`](../README.md).

## Cómo usarlo

`cuidadopersonal.html` → Ejercicio, o `ejercicio.html` directo. Sin instalación ni servidor. El
botón de exportar descarga `rutina_YYYY-MM-DD.json`; no hay sincronización entre dispositivos.
