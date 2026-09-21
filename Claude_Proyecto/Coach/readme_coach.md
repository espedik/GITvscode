# Coach.html — referencia

Coach de vida y negocio: diagnóstico financiero, Plan Maestro hacia $1,000,000 líquido, rutina
diaria, roadmap de aprendizaje y guía legal/fiscal personal y de empresa.

Una sola página, sin backend ni dependencias de gráficas — las barras de habilidades son HTML, no
Chart.js. Único import externo: Google Fonts (Inter + Playfair Display).

> **Esto es referencia, no diario.** Describe cómo funciona **hoy**. El historial vive en
> `git log -p -- Claude_Proyecto/Coach/Coach.html`. Ver `../../CLAUDE.md` → Regla 3.

**Antes de tocar datos, leer [`../Dashboard/DATOS-MAESTROS.md`](../Dashboard/DATOS-MAESTROS.md).**

---

## Dos modos separados

Un botón (`cambiarModo('personal'|'empresa')`) alterna dos `<div class="vista-panel">`
independientes, cada uno con su sidebar y su `<main>`. Solo la sección elegida se muestra
(`irASeccion(sec, tab, el)`).

- **🪙 Personal**: `#perfil` · `#rutina` · `#aprendizaje` · `#perfil-rico` · `#marca-personal` ·
  `#legal-personal`
- **🏢 Empresa**: `#posibles-negocios` · `#mas-ideas` · `#crear-empresa` · `#legal`

Tema claro/oscuro con toggle 🌙/☀️, persistido en `coach-theme` y aplicado como `data-theme` en
`<html>` al cargar. Ambos temas están completos.

---

## El sistema visual: "consola"

Adán: *"lo quiero futurista, que me aporte valor, que sea entendible y con las secciones bien
distribuidas"*. Es el mismo lenguaje que estrenaron Habilidades Base y Mis Metas
en el Dashboard: esquinas rectas de 3 px con brackets de mira, etiquetas en monoespaciada con
mucho tracking, cifras tabulares y un filete de acento que enciende lo activo.

**Va como un bloque al final del `<style>`**, después de las reglas que redefine, en vez de
editarlas una por una. Son 477 KB de archivo: así el rediseño entero se lee —y se revierte— de
una pieza. Y como toca las piezas **compartidas** (`.card`, `.section-title`, `.check-item`,
`.sb-link`, `.stat-badge`, `.modo-btn`), las once secciones cambiaron sin tocar una línea de su
contenido.

### La paleta: cian + verde ácido

Adán: *"quiero algo que me motive a verlo o leer"*. Eligió esta entre tres paletas.

| | Claro | Oscuro | Para qué |
|---|---|---|---|
| `--accent` | `#0284a8` | `#00d4ff` | cian: la **estructura** (títulos, chrome, navegación) |
| `--accent-bright` | `#0aa5cc` | `#7df9ff` | el acento encendido |
| `--acc2` | `#4d7c0f` | `#adff2f` | lima: las **cifras** |
| `--green` | `#1a7a4c` | `#34d399` | logro — sin cambios |

**La segunda voz tiene un trabajo, no es decoración**: el filete de un `.stat-badge` va en lima y
el de una `.card` en cian. Es la regla que separa *"esto es un dato"* de *"esto es un bloque"*. El
porcentaje de la franja y el hover del índice también son lima.

Sobre blanco el cian de pantalla (`#00d4ff`) se lava, así que el tema claro usa su versión
legible — el mismo criterio que ya se aplicó al verde de la gráfica de BTC en Finanzas.

**El fondo se enfrió una gota**: `#121212` → `#0b0f13` en oscuro y `#f5f4f0` → `#f2f6f8` en claro.
Sobre un gris neutro el cian se apaga, y el crema tiraba a cálido y peleaba con él.

**No hay ningún acento escrito a mano en el CSS**: todo va por `rgba(var(--acc-rgb),…)`, así que
cambiar de paleta es tocar cuatro variables.

Dos trampas que costaron una pasada cada una, por si vuelve a cambiar la paleta:

- **`.btn-gold`** (el nombre se queda, lo usan varias secciones) llevaba texto blanco sobre oro.
  Sobre el cian brillante el blanco desaparece: ahora es texto oscuro en tema oscuro.
- **`.sidebar-logo`** usa `background-clip:text`. Redefinirlo con el atajo `background` resetea el
  clip a su valor inicial y el degradado deja de recortarse contra el texto — el logo se pintaba
  como una barra sólida de lado a lado. Va con `background-image`.

### Los instrumentos — lo que no existía

Había **171 casillas repartidas en once secciones y ninguna señal de avance**: marcar una no
cambiaba nada fuera de su propia línea, así que no había forma de saber si una sección estaba a
medias o intacta sin recorrerla entera. Los datos ya estaban en `coach_checks_v1`; faltaba leerlos.

| Pieza | Dónde | Qué dice |
|---|---|---|
| `.cc-bay` | bajo el título de cada sección con casillas | `6 / 53`, una marca por casilla real y el % |
| `.cc-cnt` | en el sidebar, junto a cada enlace | el mismo conteo, para comparar secciones sin entrar |
| `.cc-idx` | en las secciones con 6+ bloques | sus propios `<h3>` como anclas pegajosas |

Las tres se **generan en JS**, no se escriben en el HTML, así que siguen funcionando cuando se
añada una casilla o un bloque nuevo. Se recalculan al marcar cualquier casilla y al cambiar de
sección, de pestaña o de modo.

**Se envuelven `irASeccion`, `showSubtab` y `cambiarModo`** en vez de escuchar el clic:
`irANegocios()` y varios enlaces internos saltan de sección sin pasar por el sidebar, y con un
listener de clic esas rutas se quedaban sin índice.

El riel de marcas se sustituye por **una sola barra continua a partir de 60 casillas**: por debajo
de 2 px por marca el riel se lee como una barra lisa y fingiría una precisión que no tiene.

Solo cuenta lo **visible**: en `#perfil` las cuatro pestañas viven en el DOM a la vez, y contarlas
todas daría un avance que no corresponde a lo que hay delante.

### La distribución

`main` pasó de **1080 a 1280 px** — en un monitor de 1600 se desperdiciaban 400. Y el índice es lo
que arregla el problema real: `#perfil` mide **10,700 px** y hasta ahora solo se podía recorrer a
ciegas hacia abajo.

Medido: 0 px de desbordamiento horizontal a 390 px, sin errores de consola, y el recorrido por las
once secciones da franja e índice donde toca. Marcar una casilla mueve la franja y el contador del
sidebar en el mismo gesto.

---

## Datos

| Clave `localStorage` | Forma | Qué guarda |
|---|---|---|
| `coach-theme` | `'dark'` \| `'light'` | Tema activo |
| `coach_rutina_v1` | `{completado: {'YYYY-MM-DD': [id, …]}}` (ids de `RUTINA_TASKS`) | Progreso diario de la rutina |
| `coach_checks_v1` | `{[id]: true}` (ids de los `.check-item`) | **Todos** los demás checklists del archivo |
| `radarp_{skillId}` | entero 0-100, 12 claves | Overrides del radar. Sin override se usa el valor base de `SK` |

Ids del radar: `ventas, copy, marketing, network, liderazgo, codigo, ia, datos, inversion,
finanzas, ingles, mente`.

**Los saldos y cifras NO se guardan aquí**: se leen de `finanzasmx_v2` a través de
`../Dashboard/datos-maestros.js`. Ver la sección de cifras más abajo.

### Persistencia genérica de checklists

Todo checkbox `.check-item` presente en el HTML al cargar se guarda y restaura solo en
`coach_checks_v1`. No hay que tocar cada sección: el mismo bucle cubre Metas, Networking, Marca
Personal, Legal, Posibles Negocios, Perfil del Rico y cualquier checklist nuevo que se añada con
esa clase y un `id` único.

Los checkboxes de `#rutina-timeline` quedan **fuera** a propósito: se generan dinámicamente y usan
`coach_rutina_v1`, que va con fecha.

**Exportar respaldo** (botón ⬇️, `exportCoachData()`): descarga `coach_YYYY-MM-DD.json` con
`coach_rutina_v1`, `coach_checks_v1` y los 12 `radarp_*` agrupados bajo `radar`. No incluye el
tema, que es preferencia visual y no dato de seguimiento.

---

## `#rutina` — la pieza más compleja

Un tracker real, distinto cada día de la semana, que cubre ejercicio, cuidado personal, ALTEN,
Didi, el Plan Maestro y finanzas.

### De dónde sale el horario

**`RUTINA_TASKS` no se declara aquí.** Vive en `../Dashboard/datos-maestros.js` y se pide con:

```js
const RUTINA_TASKS = window.CIFRAS ? CIFRAS.rutina('') : [];
```

El argumento es el prefijo de los `href`: vacío porque en el maestro se guardan como anclas
internas (`#aprendizaje`), que son de **este** archivo. El Dashboard pasa
`'../Coach/Coach.html'` para salir del suyo.

Estaba copiado en los dos HTML (17.5 KB cada uno) y llegó a divergir 6 días sin que nadie lo
notara. Para consultar o cambiar el horario, ir al maestro.

**Forma de cada bloque**: `{id, dias:[0-6], hora:'HH:MM', cat, txt, fijo?, subtareas?, link?}`,
con `dias` 0=domingo…6=sábado. `rutinaTareasDia(dow)` filtra y ordena por hora.

- `fijo:true` (solo el bloque de ALTEN) — sale en la línea de tiempo y cuenta para
  "ahora/siguiente", pero **no lleva checkbox ni suma al progreso**.
- `subtareas` — tarjeta agrupada para lo que se hace de corrido (skincare + minoxidil, cena +
  preparar la comida del día siguiente, la sublista de ejercicios del día).
- `link` — enlace inline `→` que abre en pestaña nueva, en la tarea o en cualquier subtarea.

### La forma del día

Estructura vigente, sin las horas exactas (esas están en el maestro, que es donde se editan):

- **Lun–Vie**: despertar → construir esta aplicación → ducha (con o sin lavado de cabello según el
  día) → skincare y minoxidil AM → **Didi con direccionamiento camino a ALTEN** → jornada en ALTEN
  (con la compra de comida en el descanso) → Didi corta de la tarde → gimnasio → bloque de
  habilidad (Mar/Jue/Vie) → Didi de la noche → prioridad activa de Fase 0 → cena y preparar la
  comida de mañana → lectura → diario → skincare y minoxidil PM → planear mañana → meditación →
  segundo bloque de la aplicación → dormir.
- **Lunes**, además: revisión de la Bolsa GBM por la mañana. Solo invierte al inicio de semana.
- **Sábado y domingo**: días de ingreso, con dos turnos largos de Didi (mañana y tarde-noche). El
  domingo cierra la semana con finanzas, checkpoint del Plan Maestro y diario, comprimidos al final.

**Duerme entre 5h40 y 6h40.**

**El bloque de freelance no existe hoy.** Era condicional, ocupaba las franjas que ahora son turnos
de Didi, y en la práctica estaba vacío. **Hay que volver a crearlo cuando entre el primer peso** de
las Opciones 1-3: ese es el momento que marca `s1-4` del Plan Maestro para mover horas de Didi al
negocio.

---

## Cifras: nada escrito a mano

Los saldos y datos personales que salen en la prosa vienen de `../Dashboard/datos-maestros.js`, que
esta app carga en el `<head>`. En el HTML se escribe un marcador y el módulo lo sustituye:

```html
<p>un crédito de {{autoSaldo}}</p>     →     un crédito de $283,000
```

Se resuelven con `CIFRAS.aplicarDOM()`, que recorre los nodos de texto. Hay **una segunda llamada
al final del `<script>`**: los inits de arriba (`updateFaseMonthBadges()` y compañía) repintan
trozos del DOM, y un marcador que reapareciera ahí se quedaría a la vista. Es idempotente, así que
repetirla no cuesta nada.

Diez cifras usan marcadores hoy, en cuatro sitios: el hallazgo del costo del auto, la tabla de
"cuándo se libera cada deuda", la simulación mes a mes y los checklists de fase. Incluyen
derivadas que antes se calculaban a mano y se quedaban congeladas: `{{autoInteres}}`,
`{{autoAPagar}}`.

**Esta app no tenía migraciones** y por eso podía mostrar saldos viejos si era la primera pantalla
del día. Ahora las hereda del módulo, que corre antes que su JS.

### Pendiente: la simulación mes a mes

La cascada de "cuándo te quedas sin deuda cara" (`$0 en mar 2027`, `~$22,500 restantes en oct`) se
calculó con el saldo viejo **y con una tasa del 10% anual que se sabe equivocada** — la real ronda
el 55.7%. Los saldos citados ya se actualizaron, pero **las fechas no**: cambiarles la entrada y
dejarles la salida las volvería falsamente precisas.

Rehacerla necesita fijar antes por qué la TC BBVA está subiendo. Ver
`../Finanzas/readme_finanzas.md`.

---

## Las demás secciones

| Sección | Qué es |
|---|---|
| `#perfil` | Diagnóstico real: patrimonio, deudas, hallazgos medidos, Plan Maestro por fases y barras de habilidades con el panel de cada una (`showSkillTab`, incluido Networking) |
| `#aprendizaje` | 5 prioridades (Datos, Ventas, Marketing, Finanzas, IA) con primer paso, hábito y recursos |
| `#perfil-rico` | Mentalidad y hábitos financieros |
| `#marca-personal` | Redes sociales y posicionamiento |
| `#legal-personal` | Trámites, régimen fiscal, impuestos |
| `#posibles-negocios` | Las 11 opciones rankeadas contra su perfil real, **con cifras** — ver abajo |
| `#mas-ideas` | El banco amplio: 20 modelos **con cifras de arranque** — ver abajo |
| `#crear-empresa`, `#legal` | Constituir y operar la empresa |

Las **barras de habilidades** reemplazaron al radar tipo FIFA: mismo componente que el Dashboard,
a todo lo ancho, con el nombre y la descripción visibles y la ponderación explícita. Un radar de 12
ejes hacía ilegibles las etiquetas y escondía el peso de cada una.

**Las guías de habilidades de vida no viven aquí**: están en el Dashboard → *Habilidades Base*, que
es la única fuente (27 fichas con checklist y avance). Los enlaces internos apuntan a
`../Dashboard/dashboard.html#habilidades` y el Dashboard aterriza por hash en esa pantalla.

---

## `#posibles-negocios` — números sobre las 11 opciones

Mismo tratamiento que `#mas-ideas`, **con una diferencia deliberada: aquí no se reescribió
nada**. Cada opción ya traía "qué es", "por qué encaja", "primer paso esta semana" y
"riesgo principal" escritos contra su perfil real, y eso vale más que cualquier rediseño. Lo que
faltaba eran las cifras, y se **inyectan** sobre las 11 tarjetas existentes desde `NEGOCIO_NUMS`.

Tres cosas se respetaron a propósito:

- **Los ids `negocio1..11`**, porque otras secciones enlazan a ellos con `irANegocios()`.
- **Los 12 checkboxes** (`pr1`…`pr4`, `oc1`…`oc5`, `og1`…`og3`): guardan progreso real en `coach_checks_v1`.
- **Los tres `.stat-badge` cualitativos** de cada tarjeta ("Bajo · Requiere ventas"). Dicen algo
  distinto de las cifras — son el ranking — y quitarlos habría sido perder información.

### Los precios no se inventaron donde él ya los decidió

$350–450/h de freelance, $8,000–15,000 por proyecto cerrado, $99–149 la plantilla y $300–400/h de
mentoría **salen del bloque "¿Cuánto cobrar?" de esta misma sección**. Repetirlos con otro número
habría creado dos verdades en la misma pantalla.

### Las dos cifras calculadas

- **"Cierra tu Fase 0 en N meses"** — contra lo que de verdad debe (hueco del fondo + deuda cara,
  del maestro) al ingreso medio de esa opción. Convierte la lista en una decisión: no "cuánto
  deja", sino "cuándo me saca de la deuda cara".
- **La Opción 6 (dejar DiDi) no genera ingreso: convierte horas.** Su ficha calcula lo que valen
  esas mismas 60 horas al mes a su propia tarifa de freelance en vez de repetir el argumento
  cualitativo que ya estaba en la prosa.

**La Opción 5 (aeroespacial) va con `null` a propósito.** No hay datos, y fingir un rango habría
sido peor que decir qué hay que preguntar — su ficha lista las cuatro preguntas.

### El filtro y los saltos

Los filtros **ocultan** tarjetas (`.oculta`) en vez de repintarlas, para no tocar ni la prosa ni
los ids. Y `irANegocios()` va envuelto para **quitar el filtro antes de desplazarse**: no cambia
el hash —hace `scrollIntoView` a mano— así que escuchar `hashchange` no bastaba, y un salto a una
tarjeta oculta no hacía nada visible.

---

## `#mas-ideas` — el banco de ideas con números

Adán: *"complementa más las ideas y dame números de cómo empezar a invertir y hacer las cosas,
diseño futurista, entendible y muy visual"*. Veinte ideas sin cifras no se pueden comparar ni
saber cuál cabe en el dinero que hay, así que se pintan desde **`IDEAS_NEGOCIO`** (literal en el JS, no HTML a mano: la pantalla vive de
comparar, y 20 fichas escritas a mano no se pueden filtrar ni reordenar). Cada idea trae:

| Campo | Qué es |
|---|---|
| `inv` | `[min, max]` de arranque en MXN. `0` = no necesita capital propio |
| `sem` | `[min, max]` semanas al primer peso |
| `hrs` | `[min, max]` horas por semana — el filtro que más importa con ALTEN de por medio |
| `rec` | en cuánto se recupera la inversión |
| `tik` | el ingreso típico (por evento, por mes, por proyecto) |
| `arr` | **en qué se va el capital**, partida por partida |
| `nota` | la advertencia que de verdad cambia la decisión |
| `enc` | encaje contra su perfil: `alto`/`medio`/`bajo`. Tiñe el filete de la ficha |

Los cuatro medidores son los mismos en todas las fichas a propósito: eso es lo que permite
ordenarlas mentalmente sin leerlas enteras.

### Las cifras son rangos, y la pantalla lo dice

Son **órdenes de magnitud del mercado mexicano, no cotizaciones**. Sirven para descartar y
comparar, que es el 90% del trabajo; el número fino sale de pedir precio el día que se elija una.
Está escrito en el aviso de arriba en vez de fingir una precisión que no tienen.

### La franja de capital sí es dato duro

Sale de `finanzasmx_v2` por el maestro y contesta lo que ninguna lista de ideas contesta: **cuánto
se puede invertir HOY sin romper la Fase 0**. Con la TC BBVA viva al 55.7%, abonar ahí es un
rendimiento garantizado y sin riesgo que casi ninguna idea de la lista iguala — así que la
respuesta honesta es `$0`, y las ideas de **arranque en $0** salen marcadas porque son las únicas
que no compiten por ese dinero.

El plazo para liberar capital se calcula con el **margen íntegro** y se dice así ("el doble si le
dedicas la mitad"): es el suelo optimista, no una previsión.

---

## Estructuras compartidas

`SK` —las 12 habilidades del radar— **ya no se declara aquí**: se lee con `CIFRAS.SK`. Esta app
tenía el superconjunto (con `full`, `cat` y `desc` para su panel explicativo), así que esa fue la
versión que se movió al maestro; el Dashboard usa solo los campos que pinta.

Los overrides que Adán ajusta a mano siguen en `radarp_{id}` y ganan sobre el `val` del maestro.

**Lo que sigue a mano** es el *texto* de las fases del Plan Maestro y de las prioridades de
aprendizaje: en esta app están escritos como HTML en `#perfil` y `#aprendizaje`, no generados
desde el literal, y convertirlos exigiría rediseñar esas secciones. Las cifras que contienen ya
usan `{{marcadores}}`, y `verificar-sincronia.js` comprueba que las fases y prioridades del
maestro aparezcan aquí.

---

## Verificar un cambio

```bash
node Dashboard/verificar-sincronia.js      # desde Claude_Proyecto/
```

Y en navegador a 1600px y 390px, abriendo con `file:///`. Ojo: **las secciones arrancan
colapsadas** — que un texto no aparezca en `innerText` no significa que falte; comprobar contra
`innerHTML` o navegar a la sección.
