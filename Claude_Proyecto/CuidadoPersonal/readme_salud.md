# salud.html — Mi Salud: Cuerpo & Bienestar

App de una sola página (HTML+CSS+JS, sin backend) enfocada en **cuerpo y bienestar**: peso y
medidas con la gráfica de IMC por edad, chequeo médico del año, exámenes de laboratorio,
postura, salud mental, suplementos y una guía de salud digestiva. **No es la app de nutrición**:
el registro de comida y el plan de masa muscular viven en [`comida.html`](comida.html).

> Referencia, no diario. Historial en `git log -p -- Claude_Proyecto/CuidadoPersonal/salud.html`.

Vive en `CuidadoPersonal/salud.html`. Se abre incrustada en `cuidadopersonal.html` (pestaña
**Salud**, `?embed=1` con `embed.js` y la cabecera común de `cabecera.js`) o directa; es
autocontenida. Datos en `localStorage['misalud_v1']`, clave **compartida con `comida.html`**, que
escribe `alimentos` en ella. Carga `../Dashboard/datos-maestros.js`.

## Secciones

`SECS` y `STITLE` (nombres cortos porque el carril del shell los pinta bajo un icono de 18 px en
60 px de ancho); ids estables. Deep-link **`?tab=<id>`** → `nav(id)` (lo usan las tareas de
suplementos de `RUTINA_TASKS`: `salud.html?tab=suplementos`).

| id | Pestaña | Qué hay |
|---|---|---|
| `dashboard` | 📊 **Hoy** | La pantalla principal — abajo |
| `medidas` | ⚖️ **Peso y medidas** | 4 KPI, la gráfica **IMC por edad** (`#med-imc`) y la franja "De los 25 a los 35" (`#med-edad`), registro de peso/grasa/cintura/cadera/pecho/brazo/muslo con IMC y masa magra, gráficas de evolución (`ch-peso`) y composición (`ch-comp`) |
| `digestiva` | 🫁 **Digestión** | Guía de referencia sobre reflujo: síntomas, alimentos a evitar y recomendados con su razón, remedios, plan hora por hora, señales de alerta. Contenido fijo (`renderDigestiva`) |
| `examenes` | 🩺 **Exámenes** | Laboratorio y signos vitales contra `EXAM_CATALOG`, chequeos y consultas (`CHEQ_TIPOS`), perfil médico |
| `postura` | 🧍 **Postura** | 8 ejercicios correctivos (`POSTURA_EJERCICIOS`), registro de dolor por zona, contador de pausas activas (`META_PAUSAS = 6`/día), ergonomía |
| `mental` | 🧠 **Mente** | Registro diario de ánimo/estrés 1-5 (máximo uno por fecha: `openAnimoModal()` edita el de hoy si existe), gráfica `ch-mental`, 8 técnicas (`MENTAL_TECNICAS`), señales de alerta |
| `suplementos` | 💊 **Suplementos** | El catálogo del maestro y la lista con "tomado hoy" |
| `metas` | 🎯 **Perfil y metas** | Perfil (peso, altura, edad, sexo, actividad) y metas nutricionales; el peso objetivo y la altura los manda el maestro |

Botón rápido del topbar: **+ Pesarme hoy** (`openMedidaModal()`). Tema con `.theme-toggle-btn`;
el enlace al Dashboard (`#btnVolverDash`, 🚀) es otro botón de esa clase. Exportar descarga el
`S` completo como JSON.

## Hoy — "Tu salud, hoy y este año"

`renderDashboard()`; todo repinta con `sdRepintar()`, que busca la sección `.active` (una
`activa` local dentro de otra función hacía que los clics guardaran sin repintar).

1. **La cabecera común** (`cpCabecera`, de `cabecera.js`): suplementos de hoy, racha con todos
   tomados, exámenes pendientes y último peso con IMC.
2. **Hoy** (`.sd-hero`): los suplementos partidos en **con el desayuno** / **antes de dormir**, con
   dosis y condición, marcables; el bloque de **agua y pausas** con vasos clicables. El pie de la
   noche lee `misalud_v1.alimentos` (lo escribe Mi Comida) y dice si la whey toca hoy — *"llevas
   142 g de 186, faltan 44"*; sin registro no inventa nada.
3. **Tu chequeo del año** (`sdChequeoHtml`, compartido con Exámenes): los 9 análisis de
   `CIFRAS.CHEQUEO` con estado nunca / vence / al día / no aplica, condiciones (ayuno, antes de
   las 10) y por qué le tocan a él. Tocar el estado marca que se lo hizo hoy → `S.chequeo`,
   aparte de `S.examenes` (que guarda valores).
4. **Peso y composición**: con menos de 3 pesajes no dibuja curva —una línea con un punto es
   peor que ninguna— sino la barra inicio → meta; con 3 o más, las gráficas.
5. **Tu botiquín** (`sdBotiquinHtml`, compartido con Suplementos): lo que dura cada envase y
   cuántos días quedan (rojo bajo 14), y el costo mensual.
6. **Las 5 reglas que sí mueven la aguja** (`.sd-rule`).

## Los datos vienen del maestro

- **Suplementos**: `suppCatalog()` arma el catálogo desde `CIFRAS.SUPLEMENTOS`; el texto de la
  whey resuelve `{{proteinaMeta}}` con `CIFRAS.texto()`. La lista se siembra una sola vez en
  `init()` con bandera `S.seedSupl`: si Adán borra uno, no vuelve. `addFromCatalog(i)` no
  duplica (`some(x=>x.nombre===s.nombre)`). El **control 13** del verificador comprueba nombre y
  momento contra `RUTINA_TASKS`.
- **Chequeo**: `CIFRAS.CHEQUEO`.
- **Peso**: el histórico es `CIFRAS.PESO` (`alturaCm`, `metaKg`, `objetivo`, `registros[{fecha,
  kg, nota, cintura…}]`, más derivados `actualKg`, `imc`, `cinturaUltima`…), versionado en el
  repo porque *"no quiero que esos registros se pierdan"*: en un navegador vivían y se perdían.
  `init()` siembra `PESO.registros` en `S.medidas` **en cada carga** (dirección siempre
  maestro → app): un pesaje anotado a mano se conserva, pero en la misma fecha gana el del
  maestro; los sembrados llevan `maestro:true`, id `'maestro-FECHA'` y **🔒 en vez del bote** en la
  tabla (borrarlos no serviría, vuelven al recargar). `S.metas.pesoObj` y `S.perfil.altura` se
  reescriben desde el maestro y Perfil y metas lo dice. **Un pesaje nuevo se anota en el
  maestro**, no aquí. La edad sale de `CIFRAS.PROYECTO.nacimiento` (`edadHoy()`).

## IMC por edad — dónde estás y a dónde vas

`renderIMCEdad()` (Chart.js `ch-imc`, 340 px, sin animación), diseño de `diseno-imc/`: edades
15–40 en X, IMC 14–32 en Y, cuatro franjas rellenas entre los cortes de la OMS (bajo peso < 18.5,
sano 18.5–24.9, sobrepeso 25–29.9, obesidad ≥ 30). De 20 en adelante son horizontales porque **la
OMS los lee igual de los 20 a los 65**; de 15 a 19 siguen la referencia por edad (`IMC_15_19`).
Encima, la ventana **25–35** en trazo discontinuo (plugin `ventana2535`), tu punto en tu edad de hoy,
la meta como aro ámbar en la misma columna y los rótulos (plugin `rotulosImc`; bajo 520 px de ancho
van a la izquierda del punto). Tooltip solo sobre los dos puntos.

A la derecha (`.imc-stats`, 340 px; bajo 1100 px pasa debajo): rango sano en kilos a tu altura
(18.5·m² – 24.9·m²), cuánto tienes, tu meta (dentro, por debajo o por encima y por cuántos kilos)
y la cintura que te dice si vas bien (mitad de la altura). La franja "De los 25 a los 35"
(`.imc-edad`) dice la verdad: el rango no cambia con la edad; cambia el músculo que se pierde
desde los 30 sin fuerza (3–8 % por década) y la grasa que se va al abdomen. Con 1.78 m el rango
sano es 58.6–78.9 kg; la meta de 80 kg da IMC 25.2, válido si es músculo, y eso lo dice la
cintura (objetivo < 89 cm), no la báscula.

## Exámenes, postura, mente, suplementos — cómo están construidos

Las cuatro siguen el mismo patrón: `<section id="s-…">` vacía en el HTML, pintada entera por su
`render…()`, con `.g3` de tarjetas para el contenido de referencia, tabla + modal para lo que es
registro, `askDel()`/`doConf()` antes de borrar, y un disclaimer de que no sustituye atención
profesional.

- **Exámenes** (`renderExamenes`): cada registro se captura contra `EXAM_CATALOG` (~24 marcadores
  en 8 categorías con unidad y rango de adulto) o como "Otro (personalizado)". **El rango se copia
  al registro al guardar** (`refMin`/`refMax`): cambiar el catálogo no altera el historial.
  Resumen "Cómo estás" con el último valor de cada marcador (`examStatusInfo()`: Normal / Alto /
  Bajo / Sin rango), gráfica de evolución por marcador (`renderExamChart`, `ch-exam`, con líneas
  de referencia) e historial. Chequeos con próxima cita opcional; perfil médico de texto libre
  con autoguardado `onchange` sin re-render (para no perder el foco).
- **Postura** (`renderPostura`): dolor por zona e intensidad 1-5 (KPI promedio de los últimos 10
  y zona más frecuente), pausas `+1`/`−` por fecha.
- **Contadores diarios que se reinician solos**: `agua`, `postura.pausas` y `suplementos.tomado`
  son objetos `{ 'YYYY-MM-DD': … }` — la clave es la fecha de hoy, no hace falta limpiar.

## Modelo de datos — `localStorage['misalud_v1']`

```js
{
  medidas:    [{ id, fecha, peso, cintura, cadera, pecho, brazo, muslo, grasa, notas, maestro?:true }],
  agua:       { 'YYYY-MM-DD': vasos },
  chequeo:    { … },                                   // estado del chequeo del año
  metas:      { caloriasD, proteina, carbs, grasa, agua, pesoObj, fechaObj },   // pesoObj lo manda el maestro
  perfil:     { peso, altura, edad, sexo, nivelActividad },                      // altura la manda el maestro
  examenes:   [{ id, fecha, categoria, examenId|'', nombre, unidad, valor, refMin, refMax, notas }],
  chequeos:   [{ id, fecha, tipo:'general|dental|oftalmologico|dermatologico|cardiologico|otro', resultado, proxima, notas }],
  perfilMedico: { tipoSangre, alergias, medicamentos, condiciones, cirugias, antecedentesFamiliares, contactoEmergencia },
  postura:    { dolores:[{ id, fecha, zona, intensidad:1-5, notas }], pausas:{ 'YYYY-MM-DD': n } },
  mental:     { registros:[{ id, fecha, animo:1-5, estres:1-5, causa, notas }] },
  suplementos:{ lista:[{ id, nombre, dosis, momento, notas }], tomado:{ 'YYYY-MM-DD': { id:true } } },
  seedSupl:   true,
  alimentos:  [ … ]   // NO lo declara ni edita este archivo: lo escribe comida.html; load() lo preserva vía spread
}
```

`today()` usa `toISOString()` (**UTC**): en México adelanta el día desde las 18:00. `load()`
hace spread sobre los defaults, así que claves que este archivo no declara sobreviven.

## Diseño y tema

Tokens `--surface`/`--surface-2`/`--surface-3` y el truco `--ov` para bordes y hovers; `--text3`
en `#7a8699` (oscuro) / `#6f7286` (claro) para 4.74:1 en el peor caso, medido componiendo toda
la pila de capas translúcidas. Las **5 gráficas Chart.js** (`ch-peso`, `ch-comp`, `ch-imc`,
`ch-exam`, `ch-mental`) toman sus colores con `cssVar(n)` al crearse y `toggleTheme()` repinta la
sección activa para redibujarlas; `killChart()` antes de recrear.

## Responsivo

`@media(max-width:900px)` (`.g4`/`.g3` a 2 columnas) y `640px` (sidebar overlay, todo a una
columna). Dos reglas que evitan el desborde horizontal: **`.main{min-width:0}`** (es flex item de
`body` y sin eso su mínimo era el de las tablas con `nowrap`) y **`.g4>*,.g3>*,.g2>*,.fr>*{min-width:0}`**
+ `canvas{max-width:100%}` (un grid item no se encoge por debajo de su contenido; el canvas de
composición se salía 118 px). Se verifica en las 8 secciones y los 6 modales (`mo-med`, `mo-exam`,
`mo-cheq`, `mo-dolor`, `mo-animo`, `mo-supp`) a 1600 y 390 px, `scrollWidth === clientWidth`, cero
errores de consola.

## Referencias cruzadas

- **Dashboard** lee `misalud_v1` como `D.sal` (`medidas`, `agua`, `metas`, `alimentos`). Si cambia
  la forma de `S.medidas`/`S.metas`, revisar `loadAll()` allá **y** `registrarReceta()` /
  `registrarRutinaMeal()` en `comida.html`, que escriben `alimentos`. Exámenes, chequeos,
  postura, mente y suplementos **no los lee el Dashboard**.
- El shell `cuidadopersonal.html` la incrusta (`readme_cuidadopersonal.md`); no toca su DOM,
  comparte `localStorage`.
- Mapa completo: [`../README.md`](../README.md).

## Cómo usarlo

`cuidadopersonal.html` → Salud, o `salud.html` directo. Sin instalación ni servidor; sin
sincronización entre dispositivos salvo el JSON exportado — excepto los pesajes, que viajan con
el repo por vivir en el maestro.
