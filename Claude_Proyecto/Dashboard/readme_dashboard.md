# dashboard.html — referencia

Panel central del proyecto: agrega en vivo los datos de las demás apps y presenta el día, el plan
y el estudio en **8 pantallas** a pantalla completa.

> **Esto es referencia, no diario.** Describe cómo funciona **hoy**; el historial de cada cambio
> vive en `git log -p -- Claude_Proyecto/Dashboard/dashboard.html`. Ver `../../CLAUDE.md` → Regla 3.

**Antes de tocar datos, leer [`DATOS-MAESTROS.md`](DATOS-MAESTROS.md)** — el índice del proyecto
en una página.

---

## Archivos de esta carpeta

| Archivo | Qué es |
|---|---|
| `dashboard.html` | La app: HTML, CSS y JS en un archivo (**1.25 MB**, ~12 100 líneas). Nunca se abre entero: este readme es el mapa |
| `datos-maestros.js` | **Fuente única** de las variables del proyecto. Lo cargan también Coach y Finanzas |
| `DATOS-MAESTROS.md` | Índice del proyecto: catálogo de variables, mapa de apps, cómo se corrige un saldo |
| `verificar-sincronia.js` | Comprueba que nada se haya vuelto a duplicar. Lo corre un hook al final de cada turno; sale con código 1 si algo falla |
| `habitos.js` | La pantalla de Hábitos entera: semilla, motor de rachas, migraciones, pintado y estilos |
| `inversion-hoy.js` · `inversion-prompt.txt` · `inversion-esquema.json` · `inversion-actualizar.ps1` (+ `.bat`) · `inversion-instalar.bat` | *Qué invertir hoy*: los datos que escribe Claude, el prompt, el esquema de la respuesta y el puente que los une (ver su sección) |
| `ficha.js` · `ficha.css` | El panel de ficha de producto (`pfAbrirId`, `pfPorNombre`, `.lc-info`) que usan la Lista de Compras y la rutina |
| `examen-genai.js` · `examen-genai-data.js` (A, 79 preguntas) · `examen-genai-data-b.js` (B, 77) | El simulacro ISTQB CT-GenAI: motor y los dos bancos |
| `entrevistas-data.js` | Los 41 temas de Python (`ENTREVISTA_TEMAS`, `PY_MOD_LABEL`) que nombra la tarjeta *Hoy aprendes* de Mi Día. Trae también el HTML y el CSS de cada tema (`ENTREVISTA_CONTENT`, `ENTREVISTA_CSS`), que ya no pinta ninguna pantalla. Lo genera `Entrevistas/_generar-datos-dashboard.js`; **no se edita a mano** |
| `sin-zoom.js` | Bloqueo del zoom en táctil. Lo cargan las seis apps |
| `aleman-data.js` | Las 40 lecciones de alemán (327 KB). **En reposo**: ninguna pantalla lo carga; volver a las lecciones es cargarlo otra vez |
| `diseno-*/` | Los canvas de cada rediseño: `Main.dc.html` (lo elegido) y las direcciones descartadas al lado |
| `readme_dashboard.md` | Este archivo |

El vocabulario de alemán **no vive aquí**: `Aleman/vocab-datos.js`, `vocab.css` y `vocab.js` se
cargan con `../`. Se abre con `file://`, sin servidor ni build; los `<script src="…">` clásicos
cargan con normalidad (los módulos ES no), y es lo que permite compartir archivos entre carpetas.

Orden de carga: `sin-zoom.js` → `datos-maestros.js` → `ficha.js` → `habitos.js` → los tres del
examen → `../Aleman/vocab-datos.js` → `../Aleman/vocab.js` → `entrevistas-data.js`.

---

## De dónde salen los datos

No hay backend. `loadAll()` lee al arrancar el `localStorage` que escriben las demás apps y lo
deja en el objeto `D`:

| Clave | La escribe | `D.` | Qué saca el Dashboard |
|---|---|---|---|
| `finanzasmx_v2` | `Finanzas.html` | `fin` | Transacciones, deudas, inversiones, fondo de emergencia |
| `misalud_v1` | `salud.html` | `sal` | Peso, medidas, alimentos |
| `skincare_v1` · `cabello_v1` | `CuidadoPersonal` | `sk` · `ca` | Perfil de piel y de cabello |
| `coach_rutina_v1` | `Coach.html` | `rut` | Bloques hechos hoy |
| `mirutina_v1` | `ejercicio.html` | `gym` | Rutina y sesiones del gimnasio |
| `radarp_<id>` | `Coach.html` | `SK[].val` | Nivel de cada una de las 12 habilidades |
| `coach_checks_v1` | `Coach.html` | *(con `rawGet`)* | Checklist de la fase |

Todas comparten origen porque se abren con `file://`.

**Escribe en claves ajenas en dos sitios** — la excepción a que sea de solo lectura:
`coach_rutina_v1.completado[hoy]` (*Marcar el bloque actual* de Mi Día) y `coach_checks_v1[id]`
(checklist de fase). Usa `rawGet`/`rawSet`, que preservan el resto del objeto. Si Coach cambia la
forma de `completado` o los ids `sN-M`, hay que revisar esas dos funciones.

**Claves propias** del Dashboard: `dash-eventos-mes-v1` (pendientes del mes), `dash-lista-compras`
y `dash-lista-tengo`, `dash-logros-v1` (libreta de logros), `dash-habitos-v1`, `dash-rail-abierto`,
`habilidades_checklist_v1`, `examen_genai_v1`, `dash-inversion-v1` (pestaña, perfil elegido y monto de *Qué
invertir hoy*), y las `al_*_v1` de Alemán.

---

## Las 8 pantallas

Cada una es un `<section class="slide theme-…">` con `data-i`. Rotan solas cada 3 minutos; se
navega con las flechas, el rail, el menú ☰ o deslizando en táctil. `irASlide(cls)` salta a una
**por su clase** y lee su `data-i`: si se reordenan, los saltos siguen llegando.

| Tema | Pantalla | Qué muestra |
|---|---|---|
| `theme-dia` | **Mi Día** | La principal. Agenda del día, el AHORA y seis módulos |
| `theme-coach` | **Plan Maestro** | Fase activa, ruta de deuda y el tablero mes / día / semana |
| `theme-metas` | **Mis Metas** | 8 KPIs financieros, franja de instrumentos y 17 metas con estado |
| `theme-basicas` | **Habilidades Base** | 27 fichas de vida práctica con sus videos. **Única fuente**: la sección equivalente de Coach se eliminó |
| `theme-skills` | **En qué invertir tu tiempo** | Radar de 12 habilidades, la ruta y el paso de la semana |
| `theme-lista` | **Lista de Compras** | 7 categorías; Comida con precios, ticket, costo al mes y proporciones |
| `theme-aleman` | **Alemán** | Vocabulario por secciones y Partizip I/II, desde `Aleman/vocab-datos.js`. Pantalla de consulta: no avanza sola |
| `theme-habitos` | **Hábitos** | La cuadrícula del mes con rachas y la ficha de cada hábito |

Cada pantalla se pinta con su entrada en `RENDERS[i]`, que `showSlide(i)` llama al entrar.
**Ninguna tiene tope de ancho**: `.slide-inner` no lleva `max-width`, así que usan lo que deja el
padding del slide (1440 px a 1600 de ancho, 1728 a 1920) y lo que es lectura pone su propio tope
en caracteres.

---

## Mi Día

La pantalla que más se usa. La agenda es el diseño **"tres franjas plegables"** (dirección C de
`diseno-midia/`). `showSlide` limpia `diaSemanaSel` y `cintaSel` **al salir** de ella.

### La agenda del día — tres franjas plegables

La columna izquierda (420 px, toda la altura) es el día repartido en **Mañana, Tarde y Noche**,
con cortes fijos a **13:00 y 19:00** que no se mueven con el reloj: si dependieran de la hora, la
mañana cambiaría de tamaño a lo largo del día.

**Solo una franja está abierta.** Se abre sola la del bloque en curso —o la primera con bloques si
el día no es hoy— y las otras dos se resumen en **una fila de 61 px**: nombre, rango de horas,
cuántos bloques son y **un punto por bloque, verde si está hecho**. Los bloques `fijo` (ALTEN)
salen como cuadrito y no entran en el `N de M hechos`.

`toggleFranja(k)` abre y cierra. Lo que abras se queda abierto el resto de la sesión: `agFrAbiertas`
es un `Set` en memoria y `agFrAuto` recuerda si ya decidiste tú. **No va a `localStorage`**: es
estado de sesión, no un dato. Si abres las tres, cada una se reparte el alto y desplaza por
dentro, así que la agenda **nunca crece más allá del panel**.

Dentro, una fila por bloque de `RUTINA_TASKS`: hora al margen, color de categoría en el punto,
duración, **el bloque en curso en verde con los minutos que le quedan**, los hechos apagados y
tachados; el título ocupa dos líneas (tres en el actual). La pinta `pintarAgendaDia()` desde
`renderDia()` con `finDeBloque`, `rtDur`, `leafItems` y `tituloBloque`.

Arriba: la fecha, el reloj en grande (abre el calendario del año) y el resumen
`0 de 21 bloques hechos · quedan 4h 50m`; abajo, **Marcar el bloque actual** (`quickMarkDone()`) y
*Coach →*. **Tocar una fila** abre ese bloque en el AHORA (`tocarBloque(id)` → `cintaSel`); **tocar
un día de la tira de 7** (`verDiaSemana`) cambia la agenda a ese día. La fila activa se trae a la
vista con `scrollIntoView`.

Medido a 1600 px con 23 bloques: 11 filas visibles, 3 títulos cortados, sin desplazamiento
(731 de 731 px); en iPad 0 títulos cortados.

`pintarCintaDia()`, `centrarFichaActiva()` y `cintaScroll()` son **código muerto** de la cinta
anterior, con guardas `if(!el) return`; se conservan por si vuelve.

### El AHORA

La tarjeta de la derecha, bajo la frase del día y `Semana 37 · día 256`. La pinta
`pintarBloqueDetalle()`: el bloque de la hora actual o el tocado en la agenda, con sus subtareas
o la rutina de gym; **Después, 21:00 · Cena ligera** (el que sigue) y, si el bloque es de Didi,
**Mientras manejas** con el primer audiolibro del grupo de la habilidad que más rinde
(`DIDI_AUDIO`) y el enlace al overlay *Qué escuchar*. Tope de 34 vh con desplazamiento interno.

### Los seis módulos

Rejilla 3×2 que toma lo que queda de alto (325×308 px cada uno a 1600×1000); cada módulo desplaza
por dentro.

| Módulo | Qué muestra | Fuente |
|---|---|---|
| **Hábitos de hoy** | Los que tocan hoy con ancla, racha (🔥 desde 3) y `2 de 5`; se marcan aquí mismo | `HB.hoy()` / `HB.toggleHoy()`, la API que expone `habitos.js` — el mismo toggle de la cuadrícula |
| **Entrenas** | Hoy en grande, los tres días que siguen y la tira de 7 días como chips de foto (`#heroWeekStrip`, 52 px; tocar uno cambia la agenda a ese día) | `renderDiaEntrena()` sobre `D.gym.rutina` o `GYM_RUTINA_DEFAULT`; el ✅ sale de `gymSesiones()`, que normaliza `mirutina_v1.sesiones` (objeto por fecha desde el 1-sep-2026, lista antes) |
| **Hoy aprendes** | La palabra de alemán (salta a su pantalla con `irASlide`) y el tema de Python del día, que abre en la app de Entrevistas por su hash (`entrevistas.html#<id>`) porque el Dashboard ya no tiene pantalla de entrevista; **el paso de la semana** con la portada de su libro y **la ficha de Habilidades Base en curso** con el paso al que se retoma | `alemanPalabraHoy()` / `entrevistaTemaHoy()` (uno de los 41 de `ENTREVISTA_TEMAS`, por `diaDelAnio()`), con la etiqueta de módulo de `pyModLabel()` —`PY_MOD_LABEL` lo emite el generador leyendo el menú de `entrevistas.html`, y cae al id en mayúsculas si el archivo es anterior—; `pasoSemanaHtml()` con `habFocoActual()`/`habLibro()`, `fichaEnCursoHtml()` con `hbAvance()` |
| **Tu dinero** | Fondo de emergencia, deudas, **los cobros y abonos de los próximos 7 días** y *Invertir hoy · Primero tu fondo →* | `renderHeroDinero()` + `cobrosHtml()` sobre `ctAgenda()` → `CIFRAS.agendaDia`, la misma fuente que el tablero |
| **Fase** | La fase activa, su barra con la marca de hoy, la prioridad del mes y **Después · Fase 1 desde …** | `renderHeroFase()` + `faseDespuesHtml()` sobre `PHASES` |
| **Importante este mes** | Los pendientes del mes con pestañas, «+ Nuevo», editar y borrar | `dash-eventos-mes-v1` |

**Tamaños.** Bajo 940 px de alto el AHORA baja a 30 vh; bajo 1280 px de ancho la agenda mide
360 px y los módulos van 2×3; en el celular todo va a una columna (módulos en dos columnas, una
bajo 600 px). **Al medir Mi Día, la hora importa**: el alto cambia con el bloque actual y los que
quedan, así que dos medidas a horas distintas no son comparables.

### La rutina

`RUTINA_TASKS` **no se declara aquí**: `CIFRAS.rutina('../Coach/Coach.html')` la pide a
`datos-maestros.js`; el argumento es el prefijo de los `href`, que en el maestro son anclas de
Coach. Los bloques `fijo:true` cuentan para "ahora/siguiente" pero no llevan checkbox ni suman al
progreso. `RUTINA_TASKS` pasa por `cifrarLiterales()` como `PHASES` y `META_DETALLE`, así que sus
`{{marcadores}}` (la meta de proteína, por ejemplo) salen resueltos.

**Cada paso de la rutina de piel, pelo y suplementos es solo el nombre del producto y un botón
ⓘ Qué es** —el mismo `.lc-info` de la lista de la compra, abriendo con `pfAbrirId`—; el cómo se
aplica y para qué sirve están en la ficha. No hay enlace de compra: comprar tiene su pantalla.

`rtProducto(txt)` sabe qué producto es porque los **controles 11, 12 y 13** del verificador
garantizan que el `n` de cada producto de `RUTINA_PIEL`, `RUTINA_PELO` y `SUPLEMENTOS` aparece
literal en la subtarea que lo ejecuta: busca cuál de esos nombres está contenido en el texto y
gana el más largo. Segundo intento por aproximación con `pfPorNombre()` (normaliza y acepta
prefijo: "Omega 3" contra "Omega 3 (aceite de pescado)") sobre lo de antes del guion largo, lo de
después de los dos puntos y el primer `<b>`. Se muestra el nombre del maestro. Las subtareas que
no nombran un producto se quedan como están.

### Añadir un pendiente desde el código

Como Adán crea y borra pendientes, **manda `localStorage`** (`dash-eventos-mes-v1`) y `EVENTOS_MES`
solo siembra la primera vez: una línea nueva en `EVENTOS_MES` no llega a un navegador que ya tiene
la clave, y bumpear la bandera le borraría lo suyo.

`EVENTOS_NUEVOS` + `eventosSembrarNuevos()`: **cada lote lleva su bandera y corre una sola vez**,
comparando además **por texto** para no duplicar. Un pendiente sembrado así y borrado por Adán no
vuelve. Los items nuevos van en los DOS sitios (`EVENTOS_MES` para el navegador que arranca de
cero, `EVENTOS_NUEVOS` para el que ya tiene datos). Para otro lote: una entrada más con bandera
nueva. Último lote: `_sep20260907`.

---

## El rail de control

**Un rail a la izquierda**, cuatro bloques separados por filete: reloj y sync, las **ocho
pantallas** con icono de trazo y su nombre, los controles de reproducción con barra de avance, y
la fila de sistema (menú, pantalla completa, ajustes, ayuda). El activo se marca con fondo y color,
sin taparse.

**Vive plegado**: una tira de **56 px** con el tirador, las ocho pantallas sin nombre y el play.
El tirador lo abre a 198 px con nombres, reloj y ajustes. **Solo el tirador lo cierra**: elegir
una pantalla no lo pliega (`showSlide` no toca el rail), para poder saltar entre varias seguidas.
El estado se guarda en `dash-rail-abierto` (`RAIL_KEY`) y sobrevive a la recarga. Los ocho
iconos de 38 px caben a 720 px de alto.

**El hueco sigue al rail**: `--pad-rail` cambia con la clase `rail-on` del `body` (88 px plegado,
230 abierto), así que el contenido pasa de 1306 a 1440 px a 1600 de ancho al cerrarlo. El otro
lado se queda en 42 px.

El menú ☰ (`navMenuList`) es un overlay modal aparte: sus ítems llaman `goTo(i);toggleMenu()` y
cerrarse al elegir es lo esperado de un modal.

**Por debajo de ~1100 px** el rail es una barra horizontal centro-abajo con los cinco controles a
40 px; la lista de pantallas vive ahí en el ☰ y en la barra de apps, y no hay tirador.

Al medir solapes con Playwright, `getBoundingClientRect()` incluye el `scale` de la animación de
entrada y da falsos solapes de ~20 px: mirar el borde de layout o esperar a que termine.

---

## La barra de apps

Cada app lleva un **SVG de trazo** de 24×24 (`QA_ICO`), mismo grosor y terminaciones; los emojis
no servían (la bandera de Alemán sale como `DE` en Windows). Colores medidos contra los dos
fondos: peor contraste 5.43 en oscuro y 1.92 en claro.

**Cuatro grupos** separados por filete fino, 15 píldoras: lo que administras (Coach, Finanzas);
el cuerpo —las ocho pestañas de Cuidado Personal en su orden: Skincare, Cabello, Ojos, Dentista,
Salud, Ejercicio, Comida, Vestimenta—; lo que estudias (Alemán y Entrevistas: Alemán entra por su
hub `index.html`, que ya lleva a lecciones, vocabulario y gramática, así que esas tres no tienen
píldora propia); y **el negocio de su papá** (Aeroresinas, Heliescala y **Posts**, las plantillas
de LinkedIn de las dos — ver `../Posts/readme_posts.md`), que no son apps suyas y no van con las
otras. Todo HTML que se abre solo tiene su píldora. Las tres del negocio son la misma familia de
icono: el helicóptero de perfil (`heli`), sobre el pedestal de vitrina (`heliesc`) y con un
bocadillo (`posts`); Adán, sobre la de Posts: *"debe ser uno parecido pero al lado de estos y
similar descripción a estos"* — de ahí el subtítulo `linkedin`, como `reparación` y `maquetas`.

Van en un contenedor con `max-width:1430px`; **por debajo de 1590 px** se quedan solo los iconos
con el nombre en `title`: la fila con nombres se partiría en dos y taparía el slide (que empieza
fijo a 58 px), o se metería debajo de los botones de tema y privacidad, que van absolutos a la
derecha (91 px). Los dos números salen de medir la fila con nombres (`.qa-grupos` con
`flex-wrap:nowrap` y `max-width:none`, 1 401 px hoy) y de sumarle 2×91 para el umbral, porque la
fila va centrada y reparte el sobrante a los dos lados: **si entra o sale una app, volver a
medir**. A 1600 px se ven los nombres (queda un hueco de 8 px con los botones); a 1366, solo
iconos.

**Privacidad y tema van juntos a la derecha**, en el carril `.qa-acciones`, como dos píldoras
`qa-pill` iguales de 35 px: el ojo (`priv-btn`; tachado y en rojo con las cifras ocultas, con
`title` que dice lo que hace) y el tema, cuyo icono **enseña a dónde vas** (sol en oscuro, luna en
claro; `luna` y `sol` en `QA_ICO`). `toggleTheme()` repinta la barra entera — el botón contiene un
`<svg>`, no texto. **Ninguno de los dos se pliega** con `.qa-collapsed`: son controles que se usan
sin entrar a ninguna pantalla, y en móvil la regla `position:static;order:-1` se aplica al par.
Bajo la barra corre una línea de acento en degradado que la separa del slide oscuro.

---

## Sin zoom en táctil — `sin-zoom.js`

**El `<meta viewport>` no basta**: Safari ignora `user-scalable=no` y `maximum-scale` desde iOS 10.
El bloqueo va por eventos, en un archivo que cargan las seis apps:

| Qué apaga | Cómo |
|---|---|
| Pellizco en Safari | cancela `gesturestart/change/end` |
| Pellizco en el resto | cancela `touchmove` **solo con 2+ dedos** |
| Doble toque | CSS `touch-action:manipulation` |
| Ctrl+rueda | cancela `wheel` con `ctrlKey` |

El doble toque va por CSS y no cancelando `touchend`, porque eso **rompería los clicks**. Todo lo
de un dedo sigue vivo: scroll, swipe entre pantallas, taps. El meta se cerró igual en las seis
apps: manda en Android y escritorio.

## Qué invertir hoy — plantilla fija, datos de Claude

Se abre desde el botón *📈 Qué invertir hoy* del módulo **Tu dinero** (`#diaInvertirBtn` →
`abrirGBM()`), cualquier día de la semana, y ocupa `min(1560px, 96vw)` × `min(960px, 94vh)`
(`.gbm-card.inv-card`; el modificador existe porque las clases `.gbm-*` las comparte el panel de
KPIs de Mis Metas, que sigue en 760 px). Adán, 21-sep-2026: *"hazla lo más grande posible… una
especie de plantilla… claude solo se encargará de la información y la plantilla no se modificará
visualmente, entonces solo se gastan tokens en información"*.

**Dos archivos, dos responsabilidades.** La plantilla es `renderGBMPanel()` más el CSS `.inv-*`:
nunca cambia al actualizar. Los datos son `inversion-hoy.js` (`window.INVERSION_HOY`, cargado
justo después del maestro): veredicto, mercado, los tres perfiles y las fuentes, más `_meta`
(cuándo, qué modelo, tokens, segundos). Si el archivo falta, el panel lo dice y todo lo demás
sigue funcionando con lo local.

| Zona | Qué pinta | De dónde |
|---|---|---|
| Veredicto | El paso que toca (`pasoInversionHoy()`: fondo → deuda con interés → invertir, mismo color que el botón de Mi Día), el título y el texto de Claude, *desde cuándo* y el **monto al mes** editable | regla local + `veredicto` |
| Tres pestañas | 🛡️ Inversión segura (`--g`), ⚖️ Riesgo medio (`--w`), 🔥 Riesgo alto (`--o`), con lema y riesgo 1-5 en puntos; `invTab()` recuerda la abierta | `perfiles.seguro/medio/alto` |
| El perfil | Lema, para quién, resumen; horizonte, rendimiento esperado, riesgo y la caída que hay que aguantar; la barra de reparto y una tarjeta por activo (%, pesos al mes, dónde, por qué, vigilar, riesgo); *Por qué / En contra / Reglas*; *Este mes* y la proyección a 12 meses (anualidad con el rendimiento mín-máx: `invEn12()`) | el perfil + el monto |
| ☆ Usar este perfil | Guarda la asignación objetivo (`invElegirPerfil()`); la barra lateral la muestra y deja de avisar que falta | `dash-inversion-v1` |
| Barra lateral | BTC y USD/MXN en vivo (`cargarPreciosGBM()`), la tasa de CETES y el resumen del mercado que trajo Claude, tu situación (fondo, deuda con interés, portafolio), la compra rápida y los enlaces (`GBM_LINKS` + `fuentes`) | local + `mercado` |

Los porcentajes de cada activo se normalizan por si Claude no cerró en 100; el monto al mes es el
que Adán escribió, si no el que sugirió Claude (`veredicto.montoMensual`), si no `{{cetesDia15}}`.
Todas las cantidades propias pasan por `money()`, así el modo privado también las tapa.

**El botón 🤖 Actualizar con Claude.** `invPedirClaude()` arma el contexto (`invContexto()`:
ingresos, fijos, fondo y meta, deudas con tasa, inversiones, efectivo, precios, maestría, fase,
perfil elegido — unos 500 tokens) y navega a `claudeinv://actualizar?ctx=<base64url>`. Windows abre
`inversion-actualizar.ps1` (registrado en `HKCU\Software\Classes\claudeinv` por
`inversion-instalar.bat`, sin administrador), que corre `claude -p` con salida estructurada
(`inversion-esquema.json`), solo la herramienta de búsqueda web (el prompt la limita a 3) y un
system prompt corto — 13.7 k tokens de sistema medidos contra 27.6 k con el de Claude Code —,
valida la respuesta y reescribe `inversion-hoy.js` con temporal y renombrado, así un fallo deja el anterior intacto. La página no puede
leer archivos desde `file://`, pero sí recargar un `<script>`: `invEsperar()` lo reinyecta cada 5 s
y, cuando `_meta.generado` cambia, repinta y avisa con un toast. Sin protocolo (iPad, otra máquina)
*copiar el contexto* deja en el portapapeles el encargo para pegarlo en cualquier sesión de Claude
Code; `inversion-actualizar.bat` repite la última petición con el contexto guardado en
`inversion-contexto.json` (no se sube: es un derivado).

**Qué le pide el prompt** (`inversion-prompt.txt`): respetar el orden fijo del Plan Maestro,
usar los números del contexto, 2-4 activos por perfil comprables en GBM+ / Cetesdirecto / un
exchange para BTC, cada uno con dónde, por qué, qué vigilar y su riesgo concreto, y largos máximos
por campo para que la plantilla no se deforme. Una corrida con Opus y 3 búsquedas: 152 s y 92.7 k
tokens procesados (11.4 k de salida), medido; las búsquedas son el grueso, y el script acepta
-SinBusqueda para pedirla de memoria cuando solo cambian los saldos.

---

## El tablero del Plan Maestro

La pantalla 2. Bajo la banda de fase y la ruta de deuda, tres columnas: **el mes, el día que
toques y la semana a la que pertenece**.

**La banda de fase es un botón**: abre la ventana de las 4 fases (`abrirKpi('fases')`, en
`kpiDetalle`) con fechas, estado, meta, explicación y el checklist de cada mes leído de
`coach_checks_v1`. El título del módulo Fase de Mi Día abre la misma ventana.

### De dónde sale cada cosa

Ningún importe está escrito en el código del tablero:

| Dato | Fuente |
|---|---|
| Gasto e ingreso de cada día | `finanzasmx_v2.transactions`, agrupadas por fecha en `ctMovs(ym)` |
| Color de cada categoría | `CT_COLOR`, los mismos hex que `CCOLORS` de Finanzas |
| Pagos programados de un día | `CIFRAS.CALENDARIO.cobros` + el `day` de cada deuda viva (`ctAgenda`) |
| Tareas y fase | `PHASES`, con su estado en `coach_checks_v1` |
| Costo de comer, por día | `LISTA_COMPRAS_PRECIOS` × `CIFRAS.LISTA_COMPRAS.comida` (`ctComida`) |

`ctAgenda()` es la misma fuente que el globo del calendario anual y que *Tu dinero* de Mi Día: dos
pantallas que dicen qué se paga un día no pueden discrepar. **Si `D.fin.debts` viene vacío**
(Finanzas nunca abierto en ese navegador) lee `CIFRAS.DEUDAS_SEED`: los 8 pagos del mes salen
idénticos con y sin Finanzas.

Los cobros aceptan `cada` y `desde` (el gas es bimestral: aparece en agosto y octubre, no en
septiembre; en el presupuesto mensual entra por la mitad, `gasMensual`). El verificador comprueba
que **todo gasto fijo de `PROYECTO` con importe caiga algún día de `CALENDARIO.cobros`**: un
servicio nuevo sin día ya no sale de la cuenta sin que ninguna pantalla lo vea.

### El mes

Cada celda lleva el importe redondeado a miles (con un decimal: `20.5k`, no `21k`; se oculta bajo
1180 px), una barra verde por lo que entró y otra roja/ámbar por lo que salió, con altura
proporcional al día más caro del mes, y borde ámbar cuando cae un pago fijo. Las flechas ‹ ›
cambian de mes; **al abrir un mes que no es el actual se elige el primer día con movimiento**.

### El riel: una sola cifra manda

Una banda a lo ancho encima de las tres columnas, para que no compitan tres cifras:

```
MARTES 18 · HACE 11 DÍAS · TE QUEDA      CÓMO CAE EL DINERO…        CIERRAS EL 31 CON
$10,336                                   ╲__                        $8,674
● Vas holgado · te sobran $667/día            ╲______                Es lo que te sobra
                                          15 16 17 18 … 31            de esta quincena
```

`ctTramo(nSel, nDias)` es el único cálculo: recorre la quincena desde que entra la nómina,
arrastra el saldo día a día y devuelve la serie; de ahí salen el número grande, la línea, el
cierre y la resta de la columna del día. **El estado en palabras** (`Vas holgado` / `Vas justo` /
`Te vas a pasar`) compara lo que sobra al cerrar el tramo contra lo que cuesta comer una semana;
`$667/día` es ese sobrante entre los días que quedan. **La línea está escalada al rango del
tramo, no al cero**: así se ve el escalón del día 15. Los 17 días son botones.

**El saldo real manda sobre el modelo.** La Cuenta BBVA de Finanzas (activo líquido `ac013`) lleva
la `fecha` de su saldo; si cae dentro del tramo, `ctAnclaReal()` ancla la serie ahí: ese día vale
lo que hay en la cuenta y de ahí en adelante se resta lo previsto (antes de esa fecha sigue el
modelo). El estado lo dice (*desde tu saldo real del 21*) y la resta de la columna del día arranca
en *Saldo real el 21 · Cuenta BBVA*. Adán, 21-sep-2026: *"esa cifra está mal, ya te había dicho
que me quedan 1200"*. Cuando reporta un saldo, va al maestro como migración con su fecha; si lo
edita en Finanzas, `saveActivo` pone la fecha sola.

Alturas de la cabecera a 1600×1000: fase 46 px, ruta de deuda 52, riel 77 — **191 en total**, y
631 para el tablero. El alto del riel lo pone `.cr-hero` (cifra grande en
`clamp(20px,1.95vw,26px)`; `.cr-estado` envuelve a dos líneas con interlineado 1.25). En la ruta,
el padding inferior de cada paso es el hueco de su barrita (`.crb-b`, absoluta).

`ctQuincena` **deja a Didi fuera**: ahí la pregunta es cuánto puedes gastar esta quincena, y un
ingreso variable es un colchón que puede no llegar. En el balance de 6 meses sí entra.

### La pantalla se reinicia al entrar

Entrar al slide pone en `null` todo lo que se pueda haber dejado tocado —`ctYM`, `ctSel`,
`ctBalVer`, `ctBalMes`, `ctHechasAbierto`— y `renderCoachTablero()` los recalcula a hoy. Va en
`showSlide()` **antes** de `RENDERS[i]()`, para que el primer pintado ya salga en el mes actual.

### Elige el día

Cada celda lleva una **barra vertical cuyo alto es lo que sale ese día** y cuyo color es el
concepto que manda: los días de solo comer quedan en una rayita de 4 px y el 1 y el 15 se ven como
los escalones que son. Celda de 38 px. Debajo va la gráfica de balance.

### Balance de los últimos 6 meses

**La misma gráfica que la tarjeta "Balance últimos 6 meses" de Finanzas**, en SVG porque el
Dashboard no carga Chart.js: balance en azul con relleno hasta el cero, ingresos en verde y gastos
en rojo punteados, con la curva de tensión .4 de Chart.js (`ctCurva()` reparte las manijas por
distancia a los vecinos). Montaje como `.cr-svgw`: el SVG se estira con
`preserveAspectRatio="none"` y etiquetas, puntos (`<i>` en %, no `<circle>`) y zonas de hover van
en HTML encima.

**El cálculo es `CIFRAS.balanceMeses`**, en `datos-maestros.js`, compartido con Finanzas; con él
viven `agendaDia`, `palabras`, `norm`, `yaContado` y `esNomina` (aquí quedan alias). El detalle
está en *El balance mensual, compartido* de [`DATOS-MAESTROS.md`](DATOS-MAESTROS.md). El por qué:

- **Cada mes se arma en dos capas**: lo previsto (quincenas, renta, auto, servicios, mínimos —de
  `ctAgenda`— más los tres que van por total mensual sin día: Didi, el vale y comer) y lo
  registrado (transacciones que la agenda no conoce). **Un cero que en realidad es "no lo anoté"
  miente más que una previsión etiquetada.** Punto hueco = previsto, relleno = anotado.
- **Los tres mensuales llevan su propia lista de palabras** (`didi`, `vale`, `comer`/`despensa`…):
  si el mes trae algo anotado que caiga ahí, manda lo anotado. Un dato real gana a una estimación.
- **La nómina va fija a $41,000 al mes.** Un movimiento de nómina anotado en Finanzas es ese mismo
  dinero: `esNomina()` lo reconoce por **categoría** `Salario` (más una lista de palabras como red,
  con `nómina` con y sin tilde porque `palabras` no quita acentos). Didi igual, por
  `Freelance/Honorarios`. El precio: un bono anotado como `Salario` no suma; va en `Bonos` u
  `Otros ingresos`.
- **Agujero conocido en los gastos**, sin cerrar porque taparlo tiene coste: una renta anotada
  como `Depa` no se reconoce contra `Renta` y se contaría dos veces.
- Los mínimos de deuda de un mes viejo se calculan con los saldos de hoy: aproximación.

Lo que se debe hoy a las tarjetas va como cifra en el encabezado, no como cuarta línea: un saldo
no comparte ejes con un flujo. Se lee con `.length ?` y no `||`: un array vacío es truthy.

La ventana sigue al mes visto (las flechas mueven la gráfica; tocar un mes salta con `ctIrMes`);
escala en múltiplos de 10k que siempre incluye el cero; un mes sin movimientos lo dice el pie.

**Las etiquetas de la leyenda son botones** que abren el desglose de su serie debajo (y resuelven
la lectura sin color): **Balance** enseña la resta mes a mes (entró, salió, quedó); **Ingresos** y
**Gastos** dan el importe de cada mes con su barra y peso en el semestre, y debajo **cosa por cosa
de UN mes** — el que se elige tocando su fila (cian); por defecto el último de la ventana. Dentro
del mes se agrupa por `desc` con `2×` al lado (las veces se cuentan por tipo), se enseñan las 12
mayores y el resto en `y 3 cosas más` con los nombres en `title`; el punto conserva el color de
categoría; sin `desc`, el nombre de la categoría. Cada fila de la tabla lleva su propia rejilla
para poder ser botón sin perder la alineación. `ctBalVer` vive fuera de la función para que el
desglose siga abierto al repintar, y al abrirse hace `scrollIntoView({block:'nearest'})`.

### El día: qué pagas y de dónde sale el saldo

1. **Lo que pagas el 18** — comer y los pagos que caen, con el total del día.
2. **De dónde sale ese saldo** — la resta explícita: entró el 15 `+$20,500`, salió del 15 al 18
   `−$10,164`, te queda `$10,336`, falta por salir `$1,662` del 19 al 31.

**Los gastos registrados en Finanzas que la agenda no conoce entran en la resta** (`ctTramo`,
`ctQuincena` y la semana los suman), con **borde punteado**: un cobro programado va a caer, uno
punteado ya cayó.

**Una compra a crédito no es una salida de caja.** Sube el saldo de la tarjeta (que ya vive en la
deuda) y se paga después con el mínimo que la agenda ya cobra; restarla el día de la compra sería
contar dos veces. Salen en su propio bloque bajo el total, en gris, con el pie *"No sale hoy: sube
el saldo de Banamex (mínimo $810 el 8)"*. Se reconocen por la **nota** de la transacción: si nombra
una tarjeta de crédito del maestro, fue a crédito (convención documentada en `readme_finanzas.md`).
⚠️ **Excepción: la categoría `Deudas`** — ahí la nota también nombra la tarjeta, pero es un PAGO a
la tarjeta y sí sale del bolsillo.

### No contar dos veces

La renta está en la agenda **y** suele estar anotada. `ctYaContado()` descarta lo ya contado por
cuatro caminos:

| Regla | Caso real |
|---|---|
| `notes: '[recurrente]'` | los fijos que genera Finanzas |
| mismo nombre, en cualquier orden | "Agua y luz" es "Luz y agua"; el internet se anota el 1 y se cobra el 8 |
| dos palabras en común, aunque cambie el importe | "Plan de datos celular" $600 es "Plan de datos AT&T" $650 |
| una palabra en común **y** el importe clavado | "Gas" $179 |

Lo que no encaja en ninguna ("Tenis Tommy Hilfiger") es gasto real que la agenda no puede conocer.

**Un seed nuevo nace con todas las migraciones aplicadas**: `seedData()` marca al terminar las
banderas suyas y las del maestro (`CIFRAS.MIGRACIONES_FLAGS`), para que una corrección histórica
no pise un saldo más nuevo que ella.

### La semana: el cierre como una resta

**El cierre sale de la misma serie que el riel** (`ctTramo`, anclada al saldo real de la cuenta si
lo hay; `ctQuincena` solo aporta el reparto de la quincena en semanas). Con el saldo real dentro de
la semana, la resta arranca en *Saldo real el 21* y solo cuenta lo que sale después; si ese día es
el último de la semana, la fila de «se va» se omite.

Tres líneas —*arrancaste con* $20,500, *se fue en la semana* −$10,509, *cierras el domingo con*
$9,991— seguidas de en qué se fue, de mayor a menor, y lo que toca esta semana con su casilla.
**Cada gasto que cae un día concreto es un botón** que abre ese día (y arrastra calendario y
riel), con el día escrito al lado (`Crédito Automotriz · día 15`). Los tres tiempos de comida no
son botones: caen los siete días.

### Lo que cuesta comer

Una sola línea —`Comer · desayuno, comida y cena · −$115`— en el día y en la semana; el desglose
vive en el `title`. Sale de datos que ya existen: `RECETAS_MINI` guarda el `costoAprox` de cada
plato.

| | De dónde sale | Vale |
|---|---|---|
| Desayuno | promedio de las 10 recetas de desayuno | $16.60 |
| Cena | promedio de las 8 recetas de cena | $37.50 |
| Comida | lo que queda de la despensa del día | $60.87 |
| **Día** | **la despensa semanal entre 7** | **$114.97** |

Los tres suman exactamente el gasto diario del tablero. No hay recetas de comida, por eso ese
tiempo es el resto y no un promedio; si se añaden, se afina solo.

### Las tareas de la fase

`ctTareasSemana` reparte **las pendientes** entre las semanas que faltan. Para que una tarea
marcada **no desaparezca**, `toggleFaseCheck` guarda **en qué semana se cerró** (`"2026-08#5"`) y
la lista añade detrás las que llevan su marca: casilla puesta, texto tachado (`span:not(.ct-tar-chip)`,
para que el chip `P1` no se vuelva gris) y en verde. El tope de filas va sobre las pendientes, no
sobre la lista entera. Un `true` de los de antes cuenta como hecha, pero al no tener semana no
reaparece.

**`8 ya hechas` es un botón** que despliega la lista: con casilla lo que se marcó desde aquí
(`checks[id]`, se puede desmarcar); con ✓ y sin casilla lo que trae ✅ escrito en `PHASES` y los
logros de la libreta, que no se desmarcan. `ctHechasAbierto` vive fuera del render. Como una tarea
puede tener dos casillas en pantalla (la de "te toca" y la del desplegable), la casilla manda su
propio estado: `toggleFaseCheck(id, this.checked)`.

### La ruta de deuda y la libreta de logros

La libreta (`dash-logros-v1`) graba un hito con su fecha y no lo borra aunque el dato de origen
desaparezca (*"debes tener los registros siempre porque si no sentiré que no logro nada"*). Pero
**un saldo vivo reabre el paso**: en `renderCoach()`,

```js
const banaDone = (bana.found && bana.balance <= 0) || (!!lgBana && !bana.found);
// si vuelve a deber:  "$5,985 otra vez · la liquidaste el 13 ago 2026"
```

La segunda mitad conserva el caso en que la deuda no se encuentra (borrada, renombrada o sin
`finanzasmx_v2`): ahí manda el logro. La regla general —ninguna app afirma en presente lo que el
saldo vivo desmiente— vive en `DATOS-MAESTROS.md`; el control 22 la comprueba en la prosa, la
lógica hay que mirarla a mano.

### Medidas

A 1600×1000 el tablero ocupa los 631 px que dejan las tres bandas, con las tres columnas parejas
(`flex:1` sobre `.slide-inner`, que ya es flex column) y cada una con su `overflow-y:auto`. El
slide de Coach scrollea **por dentro** (`.theme-coach .slide-inner`), no la página.

---

## El calendario del Plan Maestro

`abrirCalendario()` pinta el año por meses. El panel del mes elegido lleva hasta **tres
medidores**, en el orden que fija el propio Plan Maestro:

| Medidor | Qué mide | Color |
|---|---|---|
| Cierre de la fase | Días que quedan del tramo | según urgencia |
| Ritmo requerido | Lo que falta al día para cerrar el fondo de emergencia | cyan |
| Ritmo de la tarjeta | Lo que falta al día para liquidar la TC BBVA | rojo, o naranja si el mínimo cubre el interés |

### `calRitmo(fase)` — el fondo de emergencia

Devuelve `porDia` (lo que falta entre los días que restan), `pct` (avance real) y `esperado`
(avance por calendario). La barra dibuja el avance y una marca en el esperado. Solo se pinta para
la fase que corre **ahora**: proyectar una cuota diaria sobre una fase cerrada sería falso.

### `calRitmoTC()` — la tarjeta

Lee la deuda `d001` de `finanzasmx_v2`; ningún importe está en el código:

- `interes` = saldo × tasa ÷ 12.
- `crece` = interés − mínimo. Si sale positivo, **pagando el mínimo el saldo sube**.
- `pmt` = cuota fija que la liquida en 12 meses, amortización francesa `P·i / (1 − (1+i)^⁻¹²)`.
  Dividir el saldo entre 12 daría un número optimista: se come el interés.
- `mesesMin` = lo que tardaría pagando solo el mínimo. Si el mínimo no cubre el interés el
  logaritmo no existe: **no se liquida nunca**, y eso dice el bloque.

La barra enfrenta el mínimo (relleno) contra el interés mensual (ancho total). Desaparece si la
tarjeta queda en $0, no hay deudas o no hay `finanzasmx_v2`. Todo pasa por `money()` (el modo
privado lo tapa); la **tasa no**, porque es una condición del producto.

### En un teléfono

La rejilla de meses es `repeat(auto-fill, minmax(290px, 1fr))` —290 px es lo que necesita un mes
para que sus siete columnas sean legibles—: 3 columnas en monitor, 2 en tablet, 1 en teléfono sin
un breakpoint por caso. Medido: celdas de 45×40 a 390 px, 37×23 de 1024 en adelante. A ≤560 px la
cabecera pegajosa pasa a fondo `--bg` opaco (`--card` es blanco al 6 % y dejaba ver lo que
scrolleaba debajo). Los meses cerrados se aplanan a una fila (`.mini`), y `abrirCalendario()`
desplaza al mes de hoy solo cuando hay una columna.

---

## Mis Metas — "panel de trayectoria"

**Los ocho medidores** (`#metasProgreso`, `tiles` en `renderMetasSlide()`) llevan el porcentaje en
su línea de detalle, todos. En **Deuda cara** y **Deuda total** la barra es verde sobre rojo: lo
verde es lo pagado y lo rojo lo que falta (`fill`/`track` del tile; la pista es `--r` al 60 %), y
el avance de Deuda total se mide sobre lo que nació cada deuda, liquidadas incluidas. Los desgloses
de esos dos (`kpiDetalle`, `kpiBarra` con `pista`) usan el mismo par y ponen el % junto al saldo.

**Patrimonio hacia $1M** es todo lo suyo menos las deudas (`patrimonioNeto()`: inversiones, fondo,
Bitcoin a precio de hoy, efectivo y cuenta, y los bienes), la misma cifra que el Patrimonio Neto de
Finanzas; la barra es el % del millón. El desglose separa lo que tiene, lo que debe y los bienes, y
dice aparte el líquido sin bienes (`patrimonioLiquido()`), que es el número que se mueve con cada
abono. El punto de partida con bienes (18-jul-2026, $231,770) solo sirve para decir cuánto ha
sumado desde entonces.

Clases `.mg-*`; de la familia anterior `.img-goal-*` solo sobreviven `.img-goal-pbar` y `-fill`,
que usa el overlay de detalle.

**El indicador es una marca por paso real** del checklist (`META_DETALLE`) y el conteo
(`4 / 9 PASOS`), no un porcentaje: un 33 % no dice si faltan dos pasos o diez. **Tres estados**
con su color en una sola variable por ficha (`--mgc`), que tiñe chip, marcas, conteo y borde:

| Estado | Clase | Color | Cuándo |
|---|---|---|---|
| LOGRADA | `.mg-card.ok` | `--g` verde | todos los pasos marcados |
| EN MARCHA | `.mg-card.on` | `--ac1` ámbar | al menos uno |
| SIN EMPEZAR | *(ninguna)* | `--text3` | ninguno |

**La franja de instrumentos** (`#metasBay`) trae el avance del conjunto **en pasos**, no
promediando porcentajes (promediar daba el mismo peso a una meta de 1 paso que al Hyrox de 15),
el ecualizador de las 17 metas con piso del 20 % y los tres conteos; la regla de edad va dentro,
separada por filete. **Tres columnas en corto/mediano (11 fichas, cuatro filas), dos en largo
plazo.** 0 px de desborde a 1600×950 y 1920×1080; a 1366×768 scroll interno.

**El dinero real** de BYD y Maestría es una barra continua en `--ac2`, distinta de las marcas de
paso, con la cifra (`$22,800 pagado`): `METAS_MONEYBAR[x].short`; `.lbl` va en el `title`.

### Las adicciones — celular y alcohol

`celular` y `alcohol` en `META_DETALLE`, **14 pasos cada una**, en su propia fila de corto/mediano
plazo. **Van juntas a propósito**: son la misma mecánica —una conducta que se repite para regular
emociones— y se disparan entre sí; cada ficha remite a la otra y las dos cierran con la misma
puerta (Línea de la Vida 800 911 2000, UNAM, CIJ).

Lo citado se verificó con curl el 14-sep-2026: alcoholímetro CDMX (0.4 mg/L, **cero** para
transporte de pasajeros —Didi—), trago estándar FISAC (13 g; máximo 4 por ocasión y 12 por
semana), Parr et al. 2014 (síntesis de proteína −24 % con proteína y −37 % con carbohidratos), OMS
2023 (ningún nivel seguro), AUDIT (8 / 16 / 20).

**Las fechas están ancladas**: los 30 días de `alcohol` terminan el **14 de octubre de 2026**. Si
se reescriben las fichas, esas cuentas se rehacen. Fotos de Unsplash `photo-1423784346385` y
`photo-1676629922083`. **Coach** las repite como marcadores `mtc7` y `mtc9` en `coach_checks_v1`;
el detalle vive solo aquí.

### El simulacro del ISTQB CT-GenAI

La meta `istqbgenai` trae en su paso 6 un **examen de verdad**: 40 preguntas, 46 puntos, reloj y
entrega automática. Vive en `examen-genai.js` + los dos bancos.

**Nada inventado**: las preguntas se responden desde el *Programa de estudio ES V01.01* (CT-GenAI
V1.0, 25-jul-2025) y cada una guarda en `ref` la sección del syllabus. El reparto sigue las *Exam
Structure Tables v1.0*:

| Capítulo | Preguntas | Puntos |
|---|---|---|
| 1 · Introducción a la IA generativa | 7 | 7 |
| 2 · Ingeniería de instrucciones | 11 | 16 |
| 3 · Gestión de riesgos | 10 | 11 |
| 4 · Infraestructura impulsada por MLG | 5 | 5 |
| 5 · Despliegue e integración | 7 | 7 |

Las 6 K3 valen 2 puntos, las 34 K1/K2 valen 1; corte oficial 30 (65 %). Reloj de 75 minutos (los
60 oficiales + 25 % por idioma) o 60.

**Tres juegos**: **A** (79), **B** (77) —mismo temario por caras distintas, como los exámenes de
muestra A y B de ISTQB— y **Mezcla** (156). 0 enunciados y 0 respuestas correctas idénticas entre
bancos, ids sin solape. Cada intento recorre el blueprint objetivo por objetivo, elige variantes
al azar y baraja preguntas y opciones (300 exámenes simulados: 300 combinaciones distintas).
**Durante el examen solo se ve número y valor**; capítulo, objetivo y nivel K se guardan para la
revisión.

**Es una capa propia** (`#xg-overlay`, clases `.xg-*`) porque `mdPintar()` repinta el cuerpo del
panel entero al cambiar de paso y un examen incrustado perdería el DOM y el temporizador. Usa las
variables de tema del dashboard. Se guarda en `localStorage['examen_genai_v1']`: `curso` (el
examen a medias con el **instante** de finalización, para reanudar con el tiempo real que quedaba)
e `intentos` (puntos, %, minutos, desglose por capítulo y **qué juego**). Los bloques de arranque
—juego y reloj— van arriba, bajo los cuatro datos del examen. Para que un paso dispare algo de la
app, `mdPintar()` pinta `paso.boton` (HTML nuestro, detrás de `linkHtml`) con `.md-paso-btn`.

---

## Habilidades Base

**27 fichas, 383 pasos, 60 videos + la serie de vino**, en `HABILIDAD_DETALLE`. Avance en
`habilidades_checklist_v1`. Orden: `citas`, las cuatro sociales (`networking`, `persuadir`,
`relacionarte`, `sacarmejor`), las tres de leer y sostenerte (`leerpersonas`, `leermujeres`,
`caracter`) y las prácticas (`nadar`, `cocinar`, `armas`, `pelear`, `decirno`, `dinero`, `manejar`,
`recuperar`, `modales`, `fogata`, `vino`, `coctel`, `nudos`, `mecanica`, `auxilios`, `brujula`,
`asado`, `reparaciones`, `meditar`).

Cada ficha lleva `✅ Ya lo dominas cuando…` con criterios comprobables, `⚠️ Error más común`, cajas
`Tu caso`/`Ejemplo`/`Plantilla` y `📚 Qué leer`. Las fotos son de Unsplash, verificadas con curl
**y vistas** antes de elegirlas.

- **Citas en CDMX** (`citas`): la única atada a una ciudad, a propósito. Diez pasos, siete son
  listas de lugares (30 en total). **Cada lugar enlaza a una BÚSQUEDA de Google Maps por nombre**
  (`<a class="mapa">`), no a coordenadas ni `place_id`: no hay que inventar un identificador y el
  enlace sigue sirviendo si el local se muda. **Sin precios ni horarios**: cambian solos. Sí lleva
  el aviso de reservar con semanas (Pujol, Quintonil, Rosetta, Máximo, Contramar, Casa Barragán)
  y el de las terrazas (pedir baranda; de junio a septiembre llueve).
- **Leer a las personas** (`leerpersonas`, 16 pasos): de fuera hacia dentro —Navarro, Ekman,
  Pennebaker, los Cinco Grandes, Greene, Voss, Van Edwards—. Dos pasos para **bajar la soberbia**:
  el 54 % de acierto en mentiras (Bond y DePaulo) y el *truth-default* de Gladwell.
- **Leer la actitud de una mujer** (`leermujeres`, 16): **situaciones que se repiten**, y en cada
  una cómo se lee y qué hacer (Moore, Ury, Tannen, Gottman, Levine). Abre con Hyde 2005 y Manson;
  **sin técnicas de seducción**, consentimiento como sí claro en el paso 1.
- **Forjar carácter** (`caracter`, 17): timidez (Cain, Epicteto, exposición gradual), decisiones
  (Bezos, *Decídete*, Duke, Willink, Brown), la forma de hablar (Voss; el no remite a `decirno`),
  no dejarse intimidar (suspiro fisiológico, MAAN, Bandura, Grant). Sin «poses de poder».

### Un video por habilidad

Viven en `HABILIDAD_DETALLE[id].videos` como `{u, t, d}` y se pintan en la columna de Recursos del
panel de detalle. Todas menos vino llevan **dos o más**, y el segundo aporta el ángulo que al
primero le falta. La `d` dice **por qué está ahí**, no de qué trata.

**Van FUERA de `pasos`** para no cambiar el denominador de los checklists ni el avance guardado.
Cada enlace se comprobó con la API oEmbed de YouTube (responde y el título es el que dice la
ficha); duración y vistas no se pudieron comprobar y no se prometen. Criterio: formato largo sobre
clip, fuente identificable, coincidencia exacta con la ficha. Un enlace que no se puede verificar
no se publica.

**Vino lleva la serie entera**: `videos[0].serie` trae `{canal, nota, eps:[{n, u, t}]}` con 42
episodios verificados, pintados como **rejilla de números plegable** con el título en `title`.
Los huecos (26, 28, 29, 42-49) se declaran en la nota y se manda al canal. Es el patrón para
cualquier recurso que sea una serie.

---

## El panel de detalle — "tres apartados"

El overlay que abre una ficha de Habilidades Base, una meta de Mis Metas o Tu año
(`#metaDetailOverlay`; `pintarDetailOverlay()` → `mdPintar()`, **los tres comparten los mismos
ids**: al tocarlo se verifican los tres). Diseño de `diseno-ficha/`.

**La tarjeta ocupa el 96 % del ancho y el 94 % del alto** (tope 1920 px): 1536×940 a 1600×1000,
1311×722 a 1366×768.

| Apartado | Ancho | Qué lleva |
|---|---|---|
| **Temario** | 300 px | Un paso por fila, número o ✓ verde, el activo en cian. Un filete separa los de cierre (Practicarlo, Qué leer, Ya lo dominas) |
| **El paso** | el resto | `Paso N de M` · título en Fraunces 34 px · la idea (`d`) 16.5 px · **En detalle**: los puntos como libro mayor numerado (`01`, `02`…) · los apartados |
| **Recursos** | 300 px | Videos (`Para escucharlo`), la barra de dinero de BYD y Maestría, el bloque de Tu año, y **Tu avance** con el siguiente pendiente como botón |

Cabecera: frase de la ficha en cursiva y el avance en grande (`7 / 16 · Dominados · 44 %`). Pie a
lo ancho: **Marcar como dominado**, un punto por paso (tocable) y Anterior / Siguiente.

**Los puntos de un paso se reparten solos** en `mdPintar()` según cómo empiezan: `Tu caso`,
`Ejemplo`, `Plantilla` → cajas cian; `⚠️ …` → caja ámbar con su rótulo (*Ojo* si no trae); los
`<a class="mapa">` → rejilla de lugares; el resto es la teoría. Un `(1)` al frente se quita
(el libro mayor ya numera) y los emojis del título (📚, ✅) se quitan en temario y título grande.
Nada de esto toca `HABILIDAD_DETALLE` ni `META_DETALLE`.

**Tamaños.** Hasta 1180 px Recursos baja bajo el temario (260 px). En el celular los tres se
apilan y la ficha desplaza como una sola página: temario en tira de chips, frase a dos líneas,
puntos del pie ocultos, Marcar y Siguiente a 44 px. Se verifica en 1600, 1366, 1024 y 390, en los
dos temas, con una ficha de mapas (Citas), una de serie (Vino), una con barra de dinero (BYD) y
Tu año.

---

## En qué invertir tu tiempo — "mesa de estudio"

`renderSkills()` pinta en `#habOvr`, `#habRuta`, `#habFoco`, `#habRank` y la franja de Didi
(`#didiStrip`). Diseño de `diseno-tiempo/`.

**La cabecera es una fila** (91 px): eyebrow y título a 36 px; a la derecha el nivel general
(`46 /100`, su barra y *"llevar Inversión de 25 a 40 lo sube a 48"*, calculado con `calcOVRcon()`).
El cuerpo ocupa los 741 px restantes a 1600×1000 (`flex:1` sobre `.slide-inner`, que aquí no se
centra); la lectura se detiene en 80 caracteres en monitores anchos.

**Tres tarjetas a toda la altura**, columnas 250 · fluida · 330 px (la del paso, 828 px a 1600):

| Tarjeta | Qué lleva |
|---|---|
| **La ruta** | La habilidad abierta con icono, nivel y peso; chips *Esta semana* / nivel / *la que más rinde*; los pasos como **línea de tiempo**. Abajo, *Cambiar a …* y *Ajustar en Coach* |
| **El paso** | `Paso 01 de 9` · título en Fraunces 44 px · **Por qué este paso** · **Qué hacer** · **Con qué**: el libro con su portada de la biblioteca, autor, páginas, nota y *Qué es* (abre la ficha) · el **estante** con los libros de la ruta · pie con *Al cerrarlo sigue…* y **Siguiente paso** |
| **Lo que sabes** | Las 12 ordenadas por retorno y medidas por nivel (Ventas y Marketing apagadas por `PRIORIDAD_EXCLUIDAS`), leyenda, nota y el rato al volante |

**La lectura desplaza por dentro** (`.hf-lectura`) y estante y pie se quedan a la vista. Un
recurso que no es libro sale con `pfRecursoHtml()`; el estante solo aparece con dos libros o más,
y las rutas de formato viejo (IA, Datos…) no lo tienen porque no traen `r` por paso.

**Tamaños.** Bajo 940 px de alto bajan un escalón y el estante se pliega; bajo 1180 px de ancho
las columnas son 236 · fluida · 300; en el celular la ruta es una tira de números de 46 px y las
tarjetas van una bajo otra (la de la ruta con `min-width:0`, sin eso los chips la estiraban).

---

## La Lista de Compras

Siete categorías (`LISTA_CAT_META`), una activa a la vez. **Comida** es la única con precios,
contador y proporciones; el resto son checklists con dos precios de plataforma. Links de tienda en
todas: Comida con Walmart Súper + Amazon, el resto Amazon + Mercado Libre.

**El contador cuenta piezas.** Cada producto de `LISTA_COMPRAS_PRECIOS` declara un `paso` —lo que
suma un `+`— con `monto` y `g`; `base` dice cuántos `paso` son una semana y es lo que mete el
checkbox de un clic (marcar Plátano pone 6).

| Cifra | Cómo se calcula |
|---|---|
| **Ticket de hoy** | `Σ monto × cantidad` |
| **Costo al mes** | `Σ importe × 4.33 / dura`, con `dura = max(1, cantidad / base)` |

`dura` se deriva de lo que llevas: 6 plátanos duran una semana y 12 duran dos, así que los dos
carritos cuestan lo mismo al mes.

**Las proporciones.** Los 13 productos frescos viven en tres pasillos y se clasifican en cuatro
clases con `lcClase()` (`LC_ITEM_CLASE` es la excepción del aguacate, que cuenta como grasa). La
barra compara el peso del canasto contra `LC_CLASE_META` (**55 / 30 / 10 / 5**), en gramos **por
semana** (`g × cantidad / dura`). Cuando una clase queda corta, la frase dice cuántos gramos
faltan y ofrece los productos que cierran el hueco. Esa meta es un criterio del slide, **no sale
de `salud.html`**, y la pantalla lo dice.

**El renglón cabe en una línea** —checkbox · nombre · píldora · precio unitario · contador ·
tiendas · subtotal— y por eso `.lc-grid` pide columnas de 430 px. La píldora lleva punto lleno si
el precio salió del ticket de Walmart y hueco si es estimado. En celular (`≤760px`) el renglón va
a dos líneas de 46 px y las cifras de proporción se quedan con nombre y porcentaje.

**Dónde se guarda.** `dash-lista-compras` (producto → número de `paso`) y `dash-lista-tengo` (solo
fuera de Comida). Los `true` de listas anteriores al contador se leen como 1.

---

## Alemán

**1 516 palabras en 37 secciones y 188 subsecciones**, agrupadas en **siete familias**, y
**Partizip I y II en 10 bloques**. Todo viene de `Aleman/vocab-datos.js` (`ALEMAN_VOCAB`), se
dibuja con `Aleman/vocab.css` y lo mueve `Aleman/vocab.js`: **la pantalla principal es
`Aleman/vocabulario.html`** y esta la refleja (*"quiero un solo diseño, no lo quiero duplicado"*).
Lo que hay y cómo funciona lo cuenta `Aleman/readme_aleman.md`; aquí solo lo propio del Dashboard.
Los controles 19 y 20 del verificador vigilan que ni datos ni diseño se dupliquen, y el 21 que las
siete familias cubran las 37 secciones.

**Lo propio de esta pantalla**:

- Los **tokens `--v-*`** en `.al-fondo`: el slide lleva `v-vocab al-fondo` —la primera trae los
  valores por defecto del motor, la segunda los cambia— porque aquí el fondo es translúcido sobre
  las manchas animadas y tiene modo oscuro. `--v-txt-inv` («lo que se lee encima de `--v-txt`»)
  vale `var(--bg)`: sin él, los botones rellenos (nivel activo, subsección elegida) daban 1.01:1.
- El interruptor **Modo estudio** (`alSetVista`, guardado en `al_vista_v1`) y el marcador
  «3 de 9 vistas», que **se cuenta del DOM**: cualquier repintado vuelve a tapar todas y un
  contador aparte mentiría. En la gramática no hay marcador.
- El **índice lateral** (238 px) se pliega a un **carril de 52 px** con la gramática y las siete
  familias; la rejilla da cinco columnas en los dos casos. Las subsecciones pasan a una tira
  encima (`vocSubsHtml`). Estado en `al_plg_v1`. El árbol, el carril y la tira **se pintan
  siempre** y el CSS decide cuál se ve (`.al-cuerpo:not(.plegado) .al-subs{display:none}` y
  gemelas): plegar es cambiar una clase, no repintar 1 516 palabras. Bajo 900 px el índice va
  arriba (tope `26vh`) y el carril es una tira horizontal.
- **La pantalla no puede quedarse muda.** `alPinta` sanea `al_sec_v1` / `al_sub_v1` antes de
  filtrar (sección desconocida → «Saludos», subsección ajena → `null`): una subsección renombrada
  en `vocab-datos.js` dejaba la pantalla en cero en cada apertura. El filtro de nivel (`al_niv_v1`)
  sí puede dar cero legítimo: el mensaje nombra sección y nivel y trae **Ver todos los niveles**.

Claves: `al_sec_v1`, `al_sub_v1`, `al_fam_v1`, `al_niv_v1`, `al_plg_v1`, `al_vista_v1`.

---


## Hábitos — la cadena que no se rompe

Vive entero en `habitos.js` — semilla, motor, gráficas, pintado y estilos —; `dashboard.html`
solo aporta el `<section>`, las seis capas del fondo, el tema y la entrada en las listas de
pantallas. Diseño de `diseno-habitos/`.

### Noche y día, con el mismo HUD

La pantalla fija sus propias variables de superficie. El **modo de noche** es el de por defecto
(`--bg:#04040c`, neón cian/violeta, glows). El **modo de día** entra con `data-theme="light"`: el
mismo HUD en tinta sobre `#eef2f7`, acentos en los pasos oscuros del tema claro del Dashboard,
paneles más claros que el fondo, glows a halo corto. Casi todo sale del juego de variables (`--ov`
pasa de blanco a tinta); lo que no cubren va en un bloque propio (manchas, panel, velo, tarjeta
de la ficha, `color-scheme` del input de hora). Los colores de cada hábito son neón y en día se
oscurecen al pintar con `filter:brightness(.68) saturate(1.35)`, sin tocar el dato.

El fondo son **seis capas CSS**: retícula fina, dos manchas, malla en fuga con horizonte y un
barrido. Van en el `<section>`, no en `#habitosSlide`, para llegar a los bordes.

### Cuatro estados, no dos

| Estado | Qué significa | Cuenta |
|---|---|---|
| `ok` | Cumplido | Suma |
| `no` | Tocaba y no se hizo | Resta y rompe la racha |
| `off` | Ese día no tocaba | Neutro |
| `pre` | Aún no llevabas el hábito | Neutro |
| `hoy` / `hoyok` | Hoy, sin marcar / marcado | Hoy sin marcar **todavía no es un fallo** |
| `fut` | No ha llegado | No se puede marcar |

Sin `off`, un hábito de días alternos parecería un desastre. `pre` resuelve el arranque en frío:
nada anterior a `desde` cuenta, y esa fecha **se guarda en la primera carga**, no al primer toggle.

### Las dos gráficas

| Gráfica | Qué responde |
|---|---|
| **Anillo** | Qué % del mes llevas cumplido |
| **Perfil por día de la semana** | **Dónde** se cae, que es lo accionable |
| *(fila al pie de la cuadrícula)* | Cuántos de los que tocaban cerraste cada día |

El perfil: siete columnas de lunes a domingo (`DOW_ORDEN`) sobre retícula de 25 en 25, cada una
con su %, barra en color de estado (rojo < 60, amarillo < 80, verde) y `hechos/total`; hoy con
fondo cian; la media punteada en un carril propio a la derecha. Al lado, el **hallazgo**: el peor
día y el hábito que más cae ese día (`acum[w].hab[id]`), y el mejor. Solo entran días con dos
marcas o más, y si hasta el peor pasa del 80 % lo dice en verde. Mira los últimos 90 días.

### Los hábitos siguen el horario

Los nueve de `SEMILLA` salen de `RUTINA_TASKS`: Construir esta app, Post de Aeroresinas en LinkedIn
(lun/mié/vie, `flex`, en el hueco del CT-GenAI), Clase de alemán,
Gimnasio, Fase 0, Leer 10 páginas, Rutina de la noche, Dormir 7 h, Agua 3 litros. Cada
uno lleva `hora` y **la lista se pinta ordenada por ella** (se ordena una copia; el orden guardado
es el de creación). La hora se edita en la ficha (`time`).

**`flex:true`**: toca ciertos días pero **se puede marcar cualquier día** (Construir esta app y
Fase 0 son de lunes a viernes y a veces se hacen en fin de semana). Un día que no toca sin marcar
sigue neutro; marcado es un **extra** que suma a racha, % y lectura vertical. En la cuadrícula la
celda lleva punteado cian; en el pie el hábito sale como chip "extra". **Los días anteriores al
arranque también se pueden marcar** en cualquier hábito (historial que Adán recuerda). `tocable()`
decide qué celdas responden: hechas, falladas, hoy, anteriores al arranque, y "no toca" solo en un
flexible; ni el futuro ni "no toca" en un rígido, porque guardarían marcas que `estado()` nunca
miraría.

**`meta`** parte un hábito en tramos: el agua son tres litros y se marca litro a litro; al tercero
cuenta como cumplida y el siguiente vuelve a cero. La celda se rellena desde abajo con lo que
llevas, el chip lleva `2/3`, y **la barra del día cuenta pasos** mientras el contador de al lado
cuenta hábitos cerrados. Lo guardado sigue siendo un número.

### La cuadrícula

Diez hábitos × los días del mes, con menos padding lateral que el resto. **Celdas fluidas**:
`flex:1` entre 30 y 44 px con `aspect-ratio:1` (36 px a 1600 con el rail abierto, 44 a 1920, 31
con scroll a 1366); cabecera, hábitos y totales comparten contenedor y padding, alineados al
píxel. Nombre 168 px, racha 98, hueco 2. Número del día dentro y palomita en la esquina; franja
gris en fin de semana; columna de hoy iluminada; icono de trazo (nunca emoji) y racha con barra
hacia el récord.

**El pasado va apagado, hoy encendido**: los días anteriores se marcan igual (corregir un olvido)
pero en tenue, y se encienden al pasar el ratón. La celda cumplida es verde translúcido con borde
encendido, para que la palomita se vea. **Los dos ejes de scroll están separados**: el horizontal
envuelve la tabla entera y el vertical solo las filas, así la fila de totales sigue a la vista.

### El resto

- El anclaje vive junto al nombre ("23:10, después de lavarme los dientes").
- **Una frase al día** de dieciséis, elegida por la fecha; solo autores comprobables.
- **Un solo aviso**: "Nunca falles dos veces seguidas" solo cuando algo se cayó ayer y hoy sigue
  sin marcar; si no, "cadena intacta". Con más de tres nombres, tres y "y N más".
- **La ficha** (clic en el nombre, capa propia `#hb2Ficha` porque marcar repinta el slide) abre
  con **Qué hacer**, leído de donde ya vive:

| Campo | De dónde sale | Quién lo usa |
|---|---|---|
| `gym:true` | `GYM_RUTINA_DEFAULT[día]`: nombre y `foco` del día, más la semana | Gimnasio |
| `rutina` (+ `sec`) | Las subtareas de ese bloque de `RUTINA_TASKS`, por sección | Leer, Rutina de la noche, Meditar |
| `pasos` | Lista propia, una línea por paso; los marcadores los resuelve `CIFRAS.texto()` | El resto y cualquier hábito nuevo |

  Mide 1040 px en dos columnas (lo que se lee a la izquierda, calendario y gráfica a la derecha;
  una columna bajo 900 px); el editor conserva 520 px. El consejo del perfil por día solo sale con
  3 días con datos y alguno bajo el 70 %.

### Dónde viven los datos

`localStorage['dash-habitos-v1']` con `rawGet`/`rawSet`: `def` (los hábitos, editables desde la
pantalla), `marcas` (indexado por **fecha ISO local** — nunca `toISOString()`, que en México
adelanta el día desde las 18:00), `desde` y `mig`.

Las migraciones van por versión (`MIG = 7`), corren una sola vez y en orden, y **lo que Adán
editó a mano manda**: un hábito cuyo nombre o anclaje no son los de la semilla anterior solo
recibe lo nuevo (hora, icono, meta, qué hacer, flex). Los retirados salen de la lista y de su
historial; los nuevos entran con arranque en hoy. Si el guardado trae `marcas` pero no `def`, el
historial se conserva.

---

## Los datos no se declaran aquí

```js
const RUTINA_TASKS  = CIFRAS.rutina('../Coach/Coach.html');
const SK            = CIFRAS.SK;
const PHASES        = CIFRAS.PHASES;
const APRENDIZAJE   = CIFRAS.APRENDIZAJE;
const LISTA_COMPRAS = CIFRAS.LISTA_COMPRAS;
```

**`GYM_RUTINA_DEFAULT` es la excepción**: no es una copia, es el *respaldo* para un navegador que
nunca abrió `ejercicio.html`; si esa app se usó, gana `D.gym.rutina`. Por eso un cambio de rutina
en el código no se refleja solo y hay migraciones `fix*IfNeeded()` sobre el dato guardado. El
verificador compara los 7 días.

---

## Migraciones de datos

Las correcciones de saldo van a `MIGRACIONES` en `datos-maestros.js`, **no aquí**. En este archivo
quedan las anteriores a 2026-08-24 (`fixTasaTC`, `fixBanamex`, `fixPagos20260813`,
`fixMsiBBVA20260813`, `fixAhorro20260817`, más las de rutina y gimnasio): ya corrieron y tienen
su bandera, son inertes. Patrón de todas: bandera propia, una sola pasada, **nunca revierten** un
cambio hecho a mano. `CIFRAS.refrescar()` se llama **después** de los `fix*IfNeeded()` locales:
sin el refresco la prosa mostraría el saldo previo.

---

## Prosa con variables

La prosa vive en constantes JS (`PHASES`, `META_DETALLE`, `RUTINA_TASKS`) inyectadas con
`innerHTML`, así que `CIFRAS.aplicarDOM()` no basta: cada repintado traería el `{{marcador}}` del
literal. **`cifrarLiterales(obj)`** sustituye dentro del literal una sola vez al arrancar,
recursiva y **en el sitio**, para no romper las referencias que otras partes guardan.

---

## Trampas conocidas

- **Finales de línea mixtos**: 11 851 líneas CRLF y 250 LF sueltas. Leer y escribir con
  `newline=''` y `\r\n` en lo insertado, anclar por línea y no por bloque; commitear con
  `git -c core.autocrlf=false add`.
- **`String.replace` de JS interpreta `$&` y `$1`** en el reemplazo; como casi todo lleva `$`,
  pasar una **función**.
- **Comillas en literales JS**: un `"` dentro de una cadena con `"` rompe el archivo y no se ve
  hasta abrirlo. `node --check` sobre los `<script>` extraídos, siempre.
- **Un `ReferenceError` dentro de un render no rompe la página**: solo deja ese panel en blanco.
  Se verifica cada slide en navegador.
- **Un array vacío es truthy**: `.length ?`, no `||`.
- **Un `{{marcador}}` dentro de una cadena de JS no se sustituye solo**: `cifrarLiterales()` pasa por
  `PHASES`, `META_DETALLE` y `RUTINA_TASKS`, no por el HTML que arman las funciones. Ahí se escribe
  `money(metaEf)`; un `{{fondoMeta}}` en un `kpiNota` salió crudo en pantalla.

---

## Verificar un cambio

```bash
node Dashboard/verificar-sincronia.js          # nada duplicado ni desincronizado; sale 1 si falla
```

Y en navegador con Playwright desde la caché de npx (ver `../../CLAUDE.md`), a **1600 px y
390 px** (1366 y 1024 cuando el cambio es de layout), en los dos temas: geometría real, elementos
desbordados y errores de consola. Se abre con `file:///` y los datos se siembran con
`page.addInitScript`. Terminar las animaciones antes de medir.
