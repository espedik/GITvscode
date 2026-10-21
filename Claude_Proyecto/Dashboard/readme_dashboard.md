# dashboard.html — referencia

Panel central del proyecto: agrega en vivo los datos de las demás apps y presenta el día, el plan
y el estudio en **7 pantallas** a pantalla completa.

**Su prompt**: la clave `dashboard` de [`prompts-paginas.js`](prompts-paginas.js) —el icono de la brújula, arriba a la izquierda—. Es el especialista que gobierna cada cambio de esta página (`CLAUDE.md` → Regla 6).

> **Esto es referencia, no diario.** Describe cómo funciona **hoy**; el historial de cada cambio
> vive en `git log -p -- Claude_Proyecto/Dashboard/dashboard.html`. Ver `../../CLAUDE.md` → Regla 3.

**Antes de tocar datos, leer [`DATOS-MAESTROS.md`](DATOS-MAESTROS.md)** — el índice del proyecto
en una página.

---

## Archivos de esta carpeta

| Archivo | Qué es |
|---|---|
| `dashboard.html` | La app: HTML, CSS y JS en un archivo (**1.4 MB**, ~13 500 líneas). Nunca se abre entero: este readme es el mapa |
| `datos-maestros.js` | **Fuente única** de las variables del proyecto. Lo cargan también Coach y Finanzas |
| `DATOS-MAESTROS.md` | Índice del proyecto: catálogo de variables, mapa de apps, cómo se corrige un saldo |
| `verificar-sincronia.js` | Comprueba que nada se haya vuelto a duplicar. Lo corre un hook al final de cada turno; sale con código 1 si algo falla |
| `habitos.js` | La pantalla de Hábitos entera: semilla, motor de rachas, migraciones, pintado y estilos |
| `inversion-hoy.js` · `inversion-alto.js` · `inversion-superalto.js` · `inversion-prompt.js` · `inversion-alto-prompt.js` · `inversion-superalto-prompt.js` · `inversion-esquema.json` · `inversion-apuesta-esquema.json` · `inversion-actualizar.ps1` (+ `.bat`) · `inversion-instalar.bat` | *Qué invertir hoy*: los datos que escribe Claude (perfiles, riesgo alto y súper alto), los tres prompts, los dos esquemas de respuesta (perfiles; apuestas) y el puente que los une (ver su sección) |
| `ficha.js` · `ficha.css` | El panel de ficha de producto (`pfAbrirId`, `pfPorNombre`, `.lc-info`) que usan la Lista de Compras y la rutina |
| `examen-genai.js` · `examen-genai-data.js` (A, 79 preguntas) · `examen-genai-data-b.js` (B, 77) | El simulacro ISTQB CT-GenAI: motor y los dos bancos |
| `syllabus/` (**fuera de git**) | La copia local del syllabus CT-GenAI LATAM: el PDF y `ct-genai-syllabus.js`, el texto de cada sección con su página. Su aviso de derechos solo permite reproducirlo en parte y para uso privado, así que no va al repositorio público (`.gitignore`) |
| `sin-zoom.js` | Bloqueo del zoom en táctil. Lo cargan las seis apps |
| `prompt-pagina.js` · `prompts-paginas.js` | El icono de la brújula que llevan **todas** las páginas del proyecto y los prompts que abre: el especialista que gobierna cada una (ver `DATOS-MAESTROS.md` → *El prompt de cada página*). En el Dashboard va fijo arriba a la izquierda, donde la barra de apps deja la esquina libre |
| `fotos-aprende/` | Las 41 fotos de *Hoy aprendes* y, las `fase-*` (13), de *Por qué esta fase* (480 px, de Openverse: StockSnap, Flickr y Rawpixel); su crédito va en `AP_FOTOS` y sale en el `title` de cada una |
| `diseno-*/` | Los canvas de cada rediseño: `Main.dc.html` (lo elegido) y las direcciones descartadas al lado |
| `readme_dashboard.md` | Este archivo |

El alemán **no vive aquí**: el Dashboard no tiene pantalla de alemán (Adán: *"elimina la sección de
alemán todo todo, porque está repetida la info de alemán"*); se estudia en la app de Alemán. Mi Día
solo lee dos de sus archivos de datos: `../Aleman/vocab-datos.js` —el de su pantalla de vocabulario— para la
palabra del día y `../Aleman/lecciones-datos.js` —el catálogo de sus 41 lecciones— para la lección que toca,
que se ve en su propia página dentro de la ventana del alemán. Se abre con `file://`, sin servidor ni build; los `<script src="…">` clásicos
cargan con normalidad (los módulos ES no), y es lo que permite compartir archivos entre carpetas.

Orden de carga: `sin-zoom.js` → `datos-maestros.js` → `ficha.js` → `habitos.js` → los tres del
examen → `../Aleman/vocab-datos.js` → `../Aleman/lecciones-datos.js`.

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
(checklist de fase: el tablero y el módulo Fase de Mi Día, los dos por `toggleFaseCheck`). Usa
`rawGet`/`rawSet`, que preservan el resto del objeto. Si Coach cambia la
forma de `completado` o los ids `sN-M`, hay que revisar esas dos funciones.

**Claves propias** del Dashboard: `dash-aprende-v1` (lo fijado cada día en Hoy aprendes, lo que ya salió y las respuestas del ISTQB), `dash-lista-compras`
y `dash-lista-tengo`, `dash-logros-v1` (libreta de logros), `dash-habitos-v1`, `plan_auditoria_v1` (la auditoría de cada mes de las fases), `dash-rail-abierto`, `dash-agenda-oculta` (la agenda de Mi Día plegada), `dash-avance-v1` (la ficha y el paso que eligió con «Siguiente» en *Hoy aprendes*), `dash_habfoco_v1` (la habilidad que eligió con «Siguiente» en *Hoy aprendes* y el paso de la semana de cada una), `dash_habpasos_v1` (los pasos dominados de cada ruta),
`habilidades_checklist_v1`, `metas_plan_v1` (los pasos palomeados del plan de cada meta), `examen_genai_v1`, `dash-inversion-v1` (pestaña, perfil elegido y monto de *Qué
invertir hoy*).

---

## Las 7 pantallas

Cada una es un `<section class="slide theme-…">` con `data-i`. Rotan solas cada 3 minutos; se
navega con las flechas, el rail, el menú ☰ o deslizando en táctil. `irASlide(cls)` salta a una
**por su clase** y lee su `data-i`: si se reordenan, los saltos siguen llegando.

| Tema | Pantalla | Qué muestra | Prompt |
|---|---|---|---|
| `theme-dia` | **Mi Día** | La principal. Agenda del día, el AHORA y cuatro módulos | `midia` |
| `theme-coach` | **Plan Maestro** | Fase activa, ruta de deuda y el tablero mes / día / semana | `planmaestro` |
| `theme-metas` | **Mis Metas** | 8 KPIs financieros, la línea del tiempo de las metas y 12 metas con su plan | `metas` |
| `theme-basicas` | **Habilidades Base** | 27 fichas de vida práctica con sus videos. **Única fuente**: la sección equivalente de Coach se eliminó | `basicas` |
| `theme-skills` | **En qué invertir tu tiempo** | La interfaz de Habilidades Base: sus indicadores, las 12 habilidades como fichas y el plan de foco; cada una abre su ruta en la ventana de detalle | `skills` |
| `theme-lista` | **Lista de Compras** | 7 categorías; Comida con precios, ticket y costo al mes | `lista` |
| `theme-habitos` | **Hábitos** | La cuadrícula del mes con rachas y la ficha de cada hábito | `habitos` |

**Cada pantalla tiene su prompt** (columna de la derecha, en `prompts-paginas.js`): el icono de la
brújula enseña el de la pantalla activa (`section.slide.theme-….active`), y el de los paneles
*Qué invertir hoy* (`invertir`) y *Qué escuchar* (`didi`) mientras están abiertos. El prompt
`dashboard` rige lo común: rail, barra de apps, rotación y diseño. Una pantalla nueva entra con
su prompt y su línea en `vistas`, o el control 24 lo marca.

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

Dentro, una fila por bloque de `RUTINA_TASKS`: **la hora de inicio y la de fin** al margen
(`06:40 – 06:43`), color de categoría en el punto, **el título corto** y la duración (Adán:
*"simplifica todos los títulos de mañana, tarde y noche y pon claramente la hora de inicio y fin de
cada actividad"*). El título es el `corto` del maestro (`tituloCorto`; los de ejercicio, el nombre
de la rutina real hasta el guion); el completo va en el `title` de la fila y en el AHORA. El fin
sale de `finDeBloque` con el bloque que sigue **en el día**, no en la franja —el gym de las 18:15
termina a las 19:00, que ya es de la noche—, y el último (dormir) termina cuando arranca el día
siguiente. **El bloque en curso va en verde con los minutos que le quedan**, los hechos apagados y
tachados. La pinta `pintarAgendaDia()` desde `renderDia()` con `finDeBloque`, `rtDur`,
`leafItems`, `tituloBloque` y `tituloCorto`.

Arriba: la fecha, el reloj en grande (abre el calendario del año) y el resumen
`0 de 21 bloques hechos · quedan 4h 50m`; abajo, **Marcar el bloque actual** (`quickMarkDone()`) y
*Coach →*. **Tocar una fila** abre ese bloque en el AHORA (`tocarBloque(id)` → `cintaSel`); **tocar
un día de la tira de 7** (`verDiaSemana`) cambia la agenda y la tarjeta Entrenas a ese día; tocarlo otra vez vuelve a hoy. La fila activa se trae a la
vista con `scrollIntoView`.

Medido a 1600 px y a 390 px con las tres franjas abiertas: ningún título cortado ni fila desbordada
en martes (23 bloques), sábado (13) y domingo (14).

**Se oculta a la izquierda**, como el rail (Adán: *"la sección donde viene mi horario día a día igual hazla
que se oculte a la izquierda"*): el tirador de arriba a la derecha (`toggleAgenda()`) la pliega a una tira de
64 px con la hora, un punto por bloque en sus tres franjas —verde si está hecho, con anillo el de ahora; tocarlo
abre ese bloque en el AHORA— y el ✓ del bloque actual (`pintarAgendaMini()`). Lo que se gana es para Hoy
aprendes: con la agenda plegada, `#miDiaSecundarios` pasa de 1:2 a 1:3 (Adán: *"que hábitos de hoy, entrenas, qué
invertir hoy se hagan más pequeños a lo ancho, para que hoy aprendes sea más largo"*). A 2048×1040 con el rail y la
agenda plegados, Entrenas/Hábitos/Qué invertir miden 464 px y Hoy aprendes 1391; con
la tarjeta de Entrenas bajo 400 px, el icono de cada día de la tira baja bajo su nombre. Se queda como la dejaste (`dash-agenda-oculta`) y, al
cambiar de ancho, el AHORA, los hábitos y Hoy aprendes se vuelven a medir. En el teléfono no se pliega.

### La frase del día

`fraseDelDia(i)` elige una de `FRASES_MOTIVACION` por día del año. **Ninguna escribe un saldo, una
fecha ni una deuda a mano**: lo que cambia va con marcadores (`{{tcBbva}}`, `{{bbvaCero}}`, `{{fondo}}`),
y la que depende de una deuda viva lleva `si` (`FRASE_SI`: `bbva`, `deudaCara`) y solo entra al sorteo
mientras sea verdad. Todas sirven al plan vigente: la BBVA quincena a quincena, el BYD con su
mensualidad, el negocio de su papá en piloto automático, la palanca de ingreso de la Fase 1. El
**control 32** del verificador rechaza una frase que nombre una deuda en $0, una deuda viva sin `si`
o un monto escrito.

### El AHORA

La tarjeta de la derecha, bajo la frase del día y `Semana 37 · día 256`. La pinta
`pintarBloqueDetalle()`: el bloque de la hora actual o el tocado en la agenda, con sus subtareas
o la rutina de gym; **Después, 21:00 · Cena ligera** (el que sigue, con su título corto) y, si el
bloque es de Didi —`esDidi()`: el que empieza por «Didi»; el descanso que solo lo nombra no cuenta—,
**Mientras manejas** con lo mismo que *Audiolibro y podcast* de Hoy aprendes (`didiHoy()`): el audiolibro de la
semana en el primer bloque y el podcast del día en los demás; el fin de semana, el audiolibro. Y el
enlace a *Qué escuchar*.

**Cabe sin desplazar** (Adán: *"aquí no quiero hacer scroll down, ponlo como en 2 columnas y que se
vea muy bien"*). El título es el corto (`tituloCorto`) y lo que el completo dice después del guion
va al lado en gris (`.blq-det`: *Rutina de la mañana · ducha, cabello, piel y suplementos*). **Los
pasos** (`pasosHtml()`; Adán: *"en rutina de la mañana aquí no se ve bien, quiero que mejores el diseño
de esta tarjeta, también la rutina de noche"*) van en **tres columnas**: una por sección —Ducha y
cabello, Piel y minoxidil, Suplementos—, con su cuenta (*2/5*) y su línea divisora; una sección con
muchos pasos toma dos columnas, y así la rutina de la noche va en dos filas. Sin secciones, una lista
en dos columnas. Cada paso es un renglón que **se palomea al tocarlo** (`marcarPaso()`, con clic,
espacio o Enter) y arriba a la derecha va el avance del bloque (`pasosAvanceHtml()`: *3 de 12 pasos*,
con su barra); con el último, el bloque queda hecho. Sin tarjetitas ni borde de color: en el tema claro
su fondo desaparecía y solo quedaba el borde cian, como un paréntesis. La rutina de gym, en una rejilla
de dos. El AHORA mide 34 vh como mucho —desde 1000 px de alto, hasta 372 px, para que la rutina de la
mañana quepa con su línea de dosis— y, si ni así cabe, `pintarBloqueDetalle()` le pone
**`.apretado`**: cada paso en una línea, con la imagen más chica, sin la línea de abajo y el *Qué es*
en su icono, y la indicación de cada ejercicio en una línea; en pantallas de 940 px de alto o menos,
además, recupera el tope de 34 vh. Se vuelve a decidir al cambiar el tamaño de la ventana. Es
contenedor (`ahora`): angosto en escritorio (menos de 1000 px), cada paso enseña solo su nombre. En el
celular va en una columna y sin tope, con el nombre en dos líneas. Medido con las rutinas de la mañana
(de 9 a 13 pasos) y de la noche: a 2048×1040, 2560×1440, 1920×1080 y 1600×1000 caben enteras, con su
línea de dosis; a 1440×900, 1366×768 y 1280×800, apretadas y sin desplazar.

### Los módulos

Rejilla de dos columnas que toma lo que queda de alto. **A la izquierda**, un tercio: *Entrenas* arriba y
*Hábitos de hoy* abajo, mitad y mitad. **A la derecha**, los dos tercios que quedan, a todo lo alto:
*Hoy aprendes*, que lleva *Qué invertir hoy* —la tarjeta *Tu dinero hoy*— como una de sus seis (Adán: *"quita esta sección
[Python] y pon ahí el recuadro que tenemos de qué invertir hoy y acomódalo como los demás recuadros"*).
**Ningún módulo deja hueco al pie**: el alto que sobra lo reparten sus renglones.

Tu dinero y la fase no están en Mi Día (Adán: *"todo eso ya está en la otra página de Coach y se
repite info, solo déjame lo de invertir hoy"*): sus cifras viven en Coach y en el Plan Maestro.
`renderHeroDinero()` y `renderHeroFase()` siguen en el archivo con su guarda, sin llamarse.

| Módulo | Qué muestra | Fuente |
|---|---|---|
| **Entrenas** | El día que se mira —hoy, o el que tocaste en la tira— en grande (si no es hoy, su nombre en verde arriba), **sus ejercicios** con series×reps y peso, en una línea los tres días que siguen y la tira de 7 días como chips de foto (`#heroWeekStrip`). El peso es el último que registró Ejercicio (naranja; mismo criterio que su `ejUltimo()`) o el inicial de `EJ_PESO_INI` (gris), solo en kg; un ejercicio con todas sus series hechas ese día va en verde, y tocar su nombre abre **su ficha** (ver *La ficha de un ejercicio*, abajo). *Ejercicio →* (`#diaEntrenaLink`) abre el día elegido con `?dia=N`. `.dia-entrena` es `display:contents`: **la lista y la tira se reparten el alto que sobra** —cada renglón crece con lo suyo al centro y la tira va de 52 a 92 px—, y bajo cada ejercicio va su indicación (`.de-ex-cue`, la misma de su `title`) donde cabe: `deAjustar()` la prueba en dos líneas, luego en una y, si ni así cabe la lista entera, la quita (al pintar y al cambiar el tamaño; en el teléfono no va). Medido: a 2048×1040 la tarjeta mide 427×346, sin indicaciones y con la tira en 85 px; a 2560×1440, 555×539, con las indicaciones en dos líneas; a 1366×768 y 1280×800 la lista ya no cabe entera y desplaza por dentro | `renderDiaEntrena()` sobre `D.gym.rutina` o `GYM_RUTINA_DEFAULT`; el ✅ sale de `gymSesiones()`, que normaliza `mirutina_v1.sesiones` (objeto por fecha desde el 1-sep-2026, lista antes) |
| **Hábitos de hoy** | Los que tocan hoy con ancla, racha (🔥 desde 3) y `2 de 5`; se marcan aquí mismo. **Caben todos sin desplazar**: letra chica (11.5 px el nombre, 9.5 px el ancla) con el ancla debajo y, si la lista no cabe así, `.compacto` pone el ancla en la misma línea, cortada con `…` y completa en el `title`. `renderDiaHabitos()` lo decide midiendo la lista, también al cambiar el tamaño de la ventana. **Los renglones se reparten el alto que sobra**, hasta 52 px cada uno (`.dh-list .dh-row`): sin hueco al pie. Medido con 10 hábitos: a 2048×1040, 1920×1080, 1600×1000 y 1440×900 en una línea, repartidos a todo lo alto; a 2560×1440, en dos líneas; a 1366×768 y 1280×800 todavía quedan dos abajo. Con 440 px de alto o más la letra y el aire de cada renglón suben (`@container`) | `HB.hoy()` / `HB.toggleHoy()`, la API que expone `habitos.js` — el mismo toggle de la cuadrícula |
| **Hoy aprendes** | Seis tarjetas iguales (Adán: *"estos 6 quiero que los dividas en partes iguales en el diseño de esta sección y que se vea bien, con info resumida pero importante"*): *Alemán*, *Audiolibro y podcast*, *Tu dinero hoy*, *Examen de certificación*, el *Ejercicio* de la habilidad del plan y *Habilidades para la vida*. **Cada una se entiende sin conocer la app** (abajo, *Las seis tarjetas de Hoy aprendes*) y lo que estudias **lo decide Coach** (abajo, *Lo decide Coach*) | `renderHeroAprender()` con `alemanHoyHtml()`, `escucharHoyHtml()`, `invertirHoyHtml()`, `istqbHtml()`, `pasoSemanaHtml()` y `fichaEnCursoHtml()`, todas por `apTarjeta()` —las del alemán y el ISTQB, por `apFila()`, que le pone ↻— |

**Tamaños.** Bajo 940 px de alto el AHORA baja a 30 vh (34 si va `.apretado`) y desde 1000 px puede llegar a 372 px; bajo 1280 px de ancho la agenda mide 360 px y los módulos siguen en sus dos columnas;
bajo 900 px, Entrenas y Hábitos van lado a lado y, debajo, a todo lo ancho, Hoy aprendes; bajo 600 px, uno por fila, en una columna `minmax(0,1fr)` —con `1fr`, el ancla más larga de un hábito ensanchaba la columna y los módulos se salían de la pantalla—. Medido a 390 px: sin desbordes.
**Al medir Mi Día, la hora importa**: el alto cambia con el bloque actual y los que
quedan, así que dos medidas a horas distintas no son comparables.

### Las seis tarjetas de Hoy aprendes

Adán, 19-oct-2026: *"si una persona que no sabe de mi app no va a saber ni de qué se trata, debe ser muy claro"*,
*"quería algo preciso y conciso"* y, sobre una versión llena de texto: *"no hay nada ordenado… nada visualmente
atractivo, con contenido simple, está muy saturado y no me aporta nada"*. Por eso **las seis tienen el mismo cuerpo
y en el mismo orden** (`apCuerpo()`), con poco texto:

1. **El título** (`.ap-mat`: 12.5 px en negritas y en el color de su materia), en palabras de todos los días.
2. **Para qué es**, en una línea gris (`.ap-sub`).
3. **Lo de hoy, en su ficha** (`.ap-hoy`): un recuadro bajo, con fondo suave del color de su materia —el de la acción
   en *Tu dinero hoy*— y a su altura natural (Adán: *"hazlo muchísimo más pequeño"*), con lo de hoy en 16 px y la
   letra de los títulos (`.ap-big`; 14.5 px bajo 280 de ancho) y, debajo, **un solo detalle** en 11.5 px (`.ap-det`).
   Lo de hoy siempre es un nombre corto —el tema del alemán, el libro, la acción, el tema del examen, el paso o la
   guía—, nunca una instrucción, y **el detalle dice de qué se trata** (Adán: *"dime de qué se va a tratar… debe ser
   más descriptivo"*): una palabra suelta o *vale 2 puntos* no lo decían. A 2048×1040 la ficha mide 66 px de alto.
4. **El pie** (`.ap-pie`), pegado abajo —a la misma altura en las seis—: el avance con sus tramos o lo que sigue.

La foto ocupa el 40 % del alto de la tarjeta (el 44 % desde 440 px). Ningún renglón se corta con «…»: si uno no cabe
entero, `apAjustar()` lo quita: primero el pie y, si la ficha no cabe, su detalle y luego el *para qué es*; lo de hoy es
lo último que se va (medido de 1280×800 a 2560×1440, con la agenda abierta y plegada, y a 390 px: las seis fichas se
ven). Los textos están escritos para la tarjeta, nunca son un pedazo del catálogo: la
instrucción corta de cada paso de ejercicio (`corto` en `APRENDIZAJE`, en el maestro), de qué trata cada audio con su
título en español (`trata` en `DIDI_AUDIO`), la idea de cada paso de las guías que tocan primero —networking,
persuadir y dinero— (`HB_IDEA`; las demás dicen el nombre del paso), el tema de cada capítulo del examen, corto
(`IQ_CAP_LLANO`) y de qué trata (`IQ_CAP_TRATA`), de qué trata cada sección del vocabulario (`trata` en
`Aleman/vocab-datos.js`) y el nombre llano de tres habilidades (`SK_LLANO`: *escritura persuasiva*, *programación*,
*análisis de datos*). Nada de siglas sueltas: *K10 · 03* se lee *Lección 3 del capítulo 10* (`alNumTxt()`) y las
cuentas dicen de qué son. El control 34 del verificador exige que las seis usen `apCuerpo()`, el `corto` de cada
paso, el `trata` de cada audio, una idea por paso en `HB_IDEA` y que lo de hoy quepa en su ficha: temas del examen
de hasta 32 letras y nombres de paso de hasta 50. Y que cada sección del vocabulario y cada capítulo del examen
traigan su frase de qué trata.

| Título | Para qué es | Lo de hoy, en su ficha | El detalle | El pie | Tocarla abre |
|---|---|---|---|---|---|
| **Alemán** | *Para mudarte a Alemania · hoy, 10 palabras y una lección* | El tema de las diez palabras: *Trámites* | De qué trata: *Los papeles al llegar: empadronarte, extranjería, llenar formularios y conseguir cita* | Los tramos de la lección y *Lección: Practicar el pasado · 0 de 10* | Su ventana (`abrirAleman()`); arriba, *Practicar* o *✓ practicaste* y ↻ |
| **Audiolibro y podcast** | *Para escuchar mientras manejas · de Thomas Stanley* | El libro, con su título en español (busca en Spotify) | De qué trata | *El libro, a las 07:40; hoy también, un video de IA* | La foto y *Qué escuchar*: su panel (`abrirDidi()`); ↻, el siguiente libro |
| **Tu dinero hoy** | *Según tu plan para juntar el dinero de Alemania* | La acción en su color: *Paga … a tu tarjeta BBVA* (rojo), *Hoy no toca pagar la tarjeta* o *Hoy sí inviertes en GBM* (verde) | De qué se trata el plan y tus cifras: *Primero liquidas la tarjeta y después inviertes: debes $8,900 y queda en cero el 15 nov* | *Mientras tengas deuda, no compres inversiones* o el siguiente pago | El panel *Qué invertir hoy* (`abrirGBM()`). Sale de `pasoInversionHoy()` (`corto`, `det`, `pie`), la regla del panel; todo por `money()` |
| **Examen de certificación** | *ISTQB de pruebas con IA · lo presentas en ene 2027 · una pregunta de 2 puntos* | El tema de la pregunta, corto: *Cómo pedirle cosas a la IA* | De qué trata el capítulo (`IQ_CAP_TRATA`); contestada, el resultado va arriba (*✓ correcta*) | Tu marcador de la semana | Su ventana, con la pregunta completa (`abrirIstqb()`) |
| **Ejercicio de mentalidad** —la habilidad del plan (`aprendeFoco()`)— | *Para subir tu nivel · con el libro Atomic Habits* | El nombre del paso: *Lo alto no se mantiene solo* | Su instrucción corta (`corto`) | Los tramos y *Paso 1 de 6*; arriba, «‹» / «Siguiente ›» | Su ruta (`abrirSkillDetalle()`) |
| **Habilidades para la vida** | *Guías prácticas, paso a paso* | El nombre de la guía | La idea del paso que toca | Los tramos y *Paso 1 de 20*; arriba, «‹» / «Siguiente ›» | La guía completa (`abrirHabilidadDetalle()`) |

**Arriba**, *🎓 Hoy aprendes*, «Cómo lo decide Coach» (`abrirComoDecide()`), la fecha y *N de 6 hechas*, con
una barra de seis tramos, uno por tarjeta, que se llena con lo hecho hoy: el alemán al abrir su ventana, al
practicar sus palabras o al hacer un ejercicio de una lección (`alemanPracticoHoy()`), el audiolibro al tocar
lo que vas a escuchar, *Tu dinero hoy* al abrir su plan (`aprendeVisto('invertir')`), el examen al contestarlo, y
el ejercicio y la guía al abrirlos (`aprendeVisto('paso')`, `aprendeVisto('hb')`). En el ejercicio y la guía,
«‹» / «Siguiente ›» (`apSiguiente()`; Adán: *"si no me gusta alguna de las que me recomiendas, pon un botón como
que siguiente"*) pasan a otra opción y la elección se queda; mientras no sea la recomendada, el título dice
*elegido por ti* (o *elegida*) y «↺» vuelve a ella. El ejercicio recorre las habilidades que tienen ruta —primero las del plan, después por
retorno (`habConRuta()`)— sin tocar la ruta abierta en *En qué invertir tu tiempo*; lo que escuchas sigue ese
foco. Las dos elecciones se guardan en `dash-avance-v1`, que también decide «SIGUIENTE» en Habilidades Base.

**Todo lleva foto** (Adán: *"todo quiero que tenga imágenes, no dejes nada vacío y menos con solo iconos"*): el
alemán, la del tema de su vocabulario o de su familia (`apFotoAleman()`; en su ventana, la lección lleva la suya,
`apFotoLeccion()`, de `Aleman/fotos/`); el examen, la de su capítulo; el audiolibro y el ejercicio, la portada
del libro (`apFotoLibro()`) o, sin libro, la de su habilidad (`apFotoSk()`; Networking, Ventas, Liderazgo,
Finanzas y Mentalidad usan la de su ficha de Habilidades Base); la guía, la suya, y *Tu dinero hoy*, la de su
paso. La bandera es CSS (`.flag-de`): el emoji 🇩🇪 sale como «DE» en Windows.

**La rejilla se acomoda a su propio ancho** (es el contenedor `aprende`): desde 760 px, 3×2, con la foto arriba a
todo lo ancho —un libro, en su 2:3 sobre su propia portada desenfocada— y los controles encima de ella; desde
440 px, 2×3, con la foto a la izquierda (en una tarjeta de menos de 360 px, «Siguiente» se queda en su flecha para
que el título quepa a su lado; el título usa hasta dos líneas);
más angosto, una columna. **En escritorio las seis miden lo mismo** y toman el alto que le queda a la columna
(104 px como mínimo en 2×3 y 200 en 3×2; con menos, desplaza); en 3×2 la foto es el 34 % del alto de la tarjeta
(el 40 % en una tarjeta de 440 px de alto o más) y lo de apoyo (`.ap-opc`) solo sale en escritorio. `apAjustar()`
quita lo que no cabe entero y recorta el primer bloque que no cabe a las líneas que le quedan, con «…» —nunca a
media línea—, al pintar, al cambiar el tamaño de la ventana y al terminar de cargar cada fuente; en una tarjeta de
menos de 130 px de alto la frase de qué se trata se va, para que quepa el título. En el teléfono el texto va en el
flujo, con su tope de líneas. Medido: a 2048×1040 —la pantalla de Adán, 2560 al 125 %— cada tarjeta mide 401×307
y enseña lo esencial de cada una; a 1920×1080, 369×327; a 2560×1440, 529×500, con lo de apoyo; a 1600×1000,
289×288, y a 1440×900, 249×245, en 3×2; a 1366×768, 358×119, y a 1280×800, 326×130, en 2×3, con el título, la
foto y lo principal. En ninguno desplaza la columna; a 390 px va en una columna sin desbordes.

### Lo decide Coach

Adán: *"toda esa sección de hoy aprendes debe regirse por coach… pon de prioridad eso que deseo lograr y
lo que está planeando coach y subir mis habilidades, pero no quiero que quede al aire"*. Cada tarjeta
tiene un **orden con su porqué**, sacado del plan de Coach —las metas con fecha de la fase en curso
(`PHASES`), el foco de habilidades (`CIFRAS.HAB_FOCO`) y el nivel de cada una (`SK`)—, y cada día toca
**el primero de ese orden que todavía no haya salido**. ↻ (`aprendeOtra()`) y «Siguiente» pasan al que
sigue: nada sale al azar.

| Tarjeta | El orden de Coach | Dónde |
|---|---|---|
| **Alemán** | **La lección**: la del Kapitel que ve en clase (`ALEMAN_LECCIONES.kapitel()`, con `kapitelAleman` del maestro), con la regla del inicio de Alemán —la que dejó a medias y practicó por última vez; si no, la primera sin terminar en el orden en que conviene estudiar el Kapitel; con todo hecho, el minitest de K10·03—. No cambia cada día: sigue a lo que practicas, y «Siguiente», en su ventana, recorre el Kapitel, luego el A2 y el A1. **El vocabulario**: diez palabras al día (`AL_VOC_DIA`), en este orden: el nivel de la etapa —A2, el que pide Esslingen, hasta que empieza la Fase 2; desde ahí, B1— y, dentro, lo que vas a necesitar primero al llegar (`AL_COACH_TEMAS`: trámites, piso, dinero, salud, teléfono, ciudad, súper), luego la casa, la escuela y el trabajo; lo demás, al final. **Cada día, un solo tema** (`alemanTanda()`; Adán: *"quiero que las tarjetas de vocabulario sean de un tema en específico y no diferentes"*): el de la primera palabra de ese orden que no ha salido; salen las suyas, primero las del nivel y, si no llegan a diez, las de los otros niveles del mismo tema —si después de las diez le quedarían menos de cinco, salen todas, hasta 14—. Simulado en 14 días seguidos desde cero: Trámites, Buscar piso, Dinero y banco, Salud (dos días), Teléfono y correos, Ciudad (tres), En el súper (dos) y Casa, siempre uno por día. Y su repaso espaciado: vuelven al día siguiente y, si te las sabes, a los 3, 7, 14 y 30 días | `ALEMAN_LECCIONES.queToca()`, `alemanVocabHoy()`, `alemanTanda()`, `aprendeOrdenAleman()`, `aprendeEtapaAleman()`, `alemanRepasoHoy()` |
| **Audiolibro y podcast** | El foco de Hoy aprendes (`aprendeFoco()`: el del plan o el que eligió con «Siguiente» en el paso de la semana), luego el siguiente foco del plan y las demás por retorno; lo que está en pausa no entra. Si el foco tiene menos de dos opciones, se completa con lo que sigue. El audiolibro es de la semana: se decide el primer día que lo ves y se queda hasta el lunes aunque el orden cambie a media semana —el del paso de la semana si su libro está en el catálogo o, si no, el primero del orden que todavía no te haya tocado—; ↻ pasa al siguiente y también vale la semana. El podcast, el siguiente cada día | `didiHoy()`, `didiGruposOrden()`, `didiLibroSemana()` |
| **Tu dinero hoy** | No es un orden de estudio: es el paso del Plan Maestro para tu dinero de hoy, la misma regla que su panel (`pasoInversionHoy()`): la BBVA quincena a quincena hasta dejarla sin saldo —hoy no compras nada más— y después todo a GBM, con los primeros pesos al fondo de emergencia. El BYD se paga con su mensualidad. Lo que abonas hoy y los abonos que siguen salen de la misma ruta que el Plan Maestro (`CIFRAS.planBbva`) | `pasoInversionHoy()`, `invertirHoyHtml()` |
| **Examen de certificación** (ISTQB) | El capítulo con más puntos en juego —lo que vale en el examen (`EXAMEN_GENAI.blueprint`: el 2 vale 16 de 46) por lo que falta de acierto ahí; con menos de tres respuestas cuenta la mitad— y, dentro, las de 2 puntos. Las contestadas no vuelven | `aprendeOrdenIstqb()`, `istqbEnJuego()` |
| **Ejercicio de habilidad** (el paso de la semana) | El foco del plan para hoy (`habRecomendada()`), paso a paso | `aprendeFoco()` |
| **Habilidades para la vida** (Habilidades Base) | `HB_PLAN`: lo que pide la Fase 1 (Networking por las cartas de recomendación, Persuadir por la palanca de ingreso, Dinero), lo de antes de irte, lo de Alemania y lo demás; vino, coctelería y citas esperan mientras dure la meta de alcohol. El grupo se mueve con la fase (`hbRango()`) y, a igual grupo, va primero la ya empezada | `hbEnCurso()` |

- **Sin repetir**: lo que salió vive en `dash-aprende-v1` → `salio`. Las palabras no vuelven hasta recorrer
  su orden entero, salvo en su repaso; una pregunta del ISTQB sin contestar vuelve a la semana
  (`APRENDE_MEMORIA`), porque su capítulo sigue siendo el que más puntos tiene en juego.
- **Fijo en el día**: lo de hoy se fija al primer vistazo (`hoy.fijo`); si lo estudias o lo contestas, se
  queda con su ✓. Con otra fecha se empieza en limpio.
- **Lo que sigue**: *Audiolibro y podcast* enseña, donde cabe, los audiolibros de las próximas semanas
  (`didiLibrosLuego()`) y el alemán, en su ventana, el tema que sigue mañana (`alemanTemaLuego()`), sin apuntarlo como salido.
- **El audiolibro, por semana** (`didiLibroSemana()`): se fija en `dash-aprende-v1` → `semana` con el número de
  semana, y lo que ya salió vive en `salio`. Medido con la fecha simulada del 10 de octubre al 2 de noviembre
  de 2026: el libro no cambia en la semana; ↻ un martes se queda hasta el domingo aunque el miércoles cambies
  de foco, y el lunes entra el siguiente del orden.
- **A medianoche** `tickClock()` repinta Mi Día (`renderDiaHero()`) aunque el Dashboard siga abierto.

**«Cómo lo decide Coach»** (`#comoDecideOverlay`, `comoDecideHtml()`), ancho —hasta 1680 px, el 96 % de la ventana—: arriba, en tres columnas y con una foto en cada renglón, lo que manda y en qué
orden —tus metas con fecha (`CD_METAS`: ids de tareas de la Fase 1, con su mes y tachadas si ya están en
`coach_checks_v1`), el plan (la fase y el foco con su entregable) y las cinco habilidades con más
retorno—; abajo, en dos columnas, tarjeta por tarjeta con su foto, lo de hoy con su regla, la tabla de capítulos del ISTQB
y lo que sigue en Habilidades Base. Bajo 1180 px, todo a una columna. Sale de las mismas funciones que eligen. Mientras está abierto Mi Día no rota y
la brújula del prompt se oculta; se cierra con ✕, clic fuera o Escape.

Medido con la fecha simulada, 40 días seguidos desde el 10 de octubre de 2026 sin estudiar ni contestar
nada: las palabras, diez al día sin repetirse (ver *La ventana del alemán*); el ISTQB, del capítulo 2 y
nunca la pregunta de la víspera; el podcast, nunca el del día anterior, y el audiolibro cambia los
lunes. El 2 de abril de 2027 (Fase 2) el vocabulario pasa al B1 y el foco a Código.

### La pregunta del ISTQB del día

Una de las 156 preguntas de los dos bancos del simulacro (`EXAMEN_GENAI` y `EXAMEN_GENAI_B`, los mismos
de Mis Metas), la primera del orden de Coach que no hayas contestado (*Lo decide Coach*). En la columna va en dos
líneas con *Responder*, o el resultado cuando ya la contestaste, y lo contestado en los últimos 7 días con el último
simulacro (`istqbMarcador()`).

Tocarla abre su ventana, `#istqbOverlay` (`abrirIstqb()`). Adán, 19-oct-2026: *"haz la ventana mucho más grande, así
como las otras… así se ve mejor y puedes meter más info"*. Es tan ancha y alta como la del alemán —hasta
1900 px, el 96 % del ancho y el 92 % del alto—, opaca, y bajo el título dice por qué Coach la eligió (`iqPorQue`: lo
que vale su capítulo, lo que llevas en él y sus puntos en juego). Va en **tres columnas, una por trabajo**, cada una
con su propio desplazamiento (`istqbPintar()`):

- **La pregunta** (`iqPreguntaHtml`): la foto de su capítulo con su nombre, su nivel K y lo que vale; el enunciado y
  las cuatro opciones, que se contestan tocándolas o con las teclas 1 a 4 (o A a D). **Cada pregunta se contesta una
  vez**: la primera respuesta es la que cuenta, como en el examen. Contestada, la buena en verde, la tuya en rojo si
  fallaste y *Siguiente pregunta* (también Enter), que trae la siguiente del orden.
- **Para entenderla** (`iqEntenderHtml`, `iqMapaHtml`): *Qué te pide* —su nivel K del programa (`IQ_K`: recordar,
  comprender o aplicar), cuántas preguntas de ese nivel trae el examen y cuánto valen (`iqKExamen`), el objetivo con
  su enunciado textual (`EXAMEN_GENAI.objetivos`) y su sección como enlace al PDF en su página (`ctGenaiSeccion`)—.
  Antes de contestar no hay nada que la responda: primero se recuerda y después se lee. Al contestar, **el porqué** y
  **lo que dice el syllabus** (`ctGenaiFuente`, el mismo bloque que la revisión del simulacro): la sección con su
  número, título y página; cada frase textual que sostiene la respuesta (`q.cita`) con la página exacta del PDF
  (`q.pag`), que lo abre ahí; *Abrir el syllabus en la página N*, y, con la copia local, la sección completa —ya
  abierta— párrafo por párrafo con lo citado resaltado. Debajo, **el capítulo en el syllabus**: cada sección con su
  página y lo que llevas en ella (*2 de 3 bien*, *sin contestar*), con la de hoy marcada.
- **Cómo vas** (`iqVasHtml`): **la meta** —presentar en el mes de la tarea a1-7 con el simulacro en su meta dos veces
  seguidas, la regla que lee `habSimulacro()`—, tus últimos diez simulacros en barras con su fecha, contra la meta y
  el corte, lo siguiente del plan de la meta con su fecha (`META_PLAN.istqbgenai.pasos`) y *Simulacro completo →*
  (`istqbAlSimulacro()`, que abre el examen entero); **cada capítulo** con lo que vale, lo que llevas en las
  preguntas del día y en el último simulacro, y sus puntos en juego —el orden de Coach—; **los últimos 7 días**, una
  marca por respuesta, con lo contestado del banco y tu acierto, y **lo que fallaste** (`istqbHistorial()`), la más
  reciente primero, con la buena, la tuya, el porqué y su sección: la ruta de IA pide que cada pregunta fallada vaya a
  una lista con su sección del syllabus.

Mientras la ventana está abierta, Mi Día no rota, las teclas no lo mueven por detrás (`istqbTecla`) y la brújula
enseña el prompt de Entrevistas (la vista `#istqbOverlay.open`); se cierra con ✕, clic fuera o Escape. Bajo 1280 px van
la pregunta y el syllabus lado a lado y *Cómo vas* debajo, en un solo desplazamiento; bajo 900 px, una columna, y bajo
640 px, a pantalla completa, sin brújula. Medido: a 2048×1040 la ventana mide 1884×957 y sus columnas 686, 623 y 573 px
de ancho —la pregunta cabe entera sin desplazar—; a 2560×1440, 1900×1325; a 1600×1000, 1472×920; a 1366×768,
1257×707, todavía en tres columnas; a 1024, dos, y a 390, una. Sin desplazamiento horizontal en ninguno, en claro y en
oscuro.

Las respuestas viven en `dash-aprende-v1` → `istqb`, una lista por fecha local (`hoyLocal()`) de
`{id, e, ok}`; una fecha con un objeto suelto es del primer formato y se lee igual. Se quedan los
últimos 120 días.

### La ventana del alemán

Adán, 14-oct-2026: *"cuando haga click aquí, debes mostrarme una ventana… ahí mismo quiero la información…
también agrega lecciones de alemán"*, y el 15: *"no me das suficiente vocabulario, mejora el diseño de la
ventana"*. Tocar la tarjeta abre `#alemanOverlay` (`abrirAleman()`) en el vocabulario, y tocar la lección de la
tarjeta, en la lección. Es ancha y alta —hasta 1900 px, el 96 % del ancho y el 92 % del alto—, opaca (es para
leer: con vidrio se veían las fotos de Mi Día detrás de cada tarjeta) y con **dos pestañas a todo lo ancho** que
dicen lo que hay en cada una: *Vocabulario · 10 nuevas · 5 de repaso* y *Lección · K10 · 06 · Partizip I & II ·
0 de 5* (`alemanTabsTxt()`).

**El vocabulario de hoy** son diez palabras, no una (`AL_VOC_DIA`, `alemanVocabHoy()`), **todas de un mismo tema**:
las siguientes del orden de Coach que no han salido, por tema (`alemanTanda()`, ver *Lo decide Coach*), fijas en el día
(`hoy.fijo.voc` en `dash-aprende-v1`); un día fijado con temas mezclados y sin practicar se vuelve a tomar. ↻ trae las
diez siguientes. Arriba, su encabezado: la foto del tema, *Vocabulario de hoy · Trámites*, *10 palabras nuevas y 5 de
repaso*, cómo estudiarlas, cuánto va del nivel, el tema de mañana y **«Practicar»**. Debajo, una tarjeta por palabra
(`alemanTarjetaHtml()`): el color de su género a la izquierda —los de la app de Alemán: der azul, die rosa, das
verde, plural naranja—, qué es y su nivel, la palabra con su artículo, la traducción, su gramática (el plural, o
las tres formas del verbo con su auxiliar, el régimen, el comparativo, lo raro), el ejemplo traducido y, si lo
tiene, el uso o fallo típico (*Ojo*). Las tarjetas toman el alto que sobra: a 2048×1040 van cinco por fila y
caben las diez sin desplazar. Al pie, **el repaso de hoy**: lo que ya salió y toca, con el español a la vista
—tocar una enseña el alemán—.

**El repaso es espaciado** (`aleman_repaso_v1`; el prompt de Alemán pide repetición espaciada y recuperación
activa). Cada palabra que sale entra en la caja 1 y vuelve al día siguiente; la primera vez entran también las
que habían salido de una en una, antes de que hubiera repaso. Al practicar un repaso, «La sabía» lo sube de caja
—vuelve a los 3, 7, 14 y 30 días— y «Otra vez» lo regresa a la 1; las de hoy vuelven mañana pase lo que pase
(`alRepasoMarca()`). Con diez nuevas al día el repaso llega a unas 40–60 tarjetas diarias: en la práctica van
hasta `AL_REPASO_MAX` (30, unos 4 minutos), primero las más atrasadas (`alemanRepasoHoy()`); lo que quede se dice
en el encabezado y, al terminar, «Repasar N más» sigue con ello. La clave lleva el nombre de la app de Alemán para
que sus Tarjetas puedan usar el mismo repaso.

**«Practicar»** (`alemanPracticar()`): las de hoy y los repasos, una tarjeta a la vez, grande y centrada. Ves el
español —con su pista: *con su artículo y su plural*, *con su Perfekt*—, dices el alemán y la volteas (Espacio):
sale con su artículo, su gramática, el ejemplo y su audio. Te calificas con «Otra vez» (1), que la devuelve al
final de la práctica —dos veces como mucho— y mañana al repaso, o «La sabía» (2); solo cuenta la primera
respuesta. Debajo, el mazo en español: cuál va, cuáles sabías y cuáles no. Al terminar, *Sabías N de M a la
primera* y dos listas, ya con su alemán: las que vuelven mañana y las que sabías. Practicar cuenta como lo hecho
hoy en la barra de Hoy aprendes, y la tarjeta dice *✓ practicaste*.

**La lección**, en su pestaña: la que toca, en su propia página de la app de Alemán dentro de un iframe
(`#alemanFrame`); `leccion.js` la reconoce enmarcada y la pone en modo ventana (`.embebida`: sin barra, pie,
«Anterior/Siguiente» ni brújula). Nada se copia: lo que practicas ahí lo guarda `k10-interactivo.js` en
`aleman_k10_v1`, donde lo leen el inicio de Alemán, la lección y esta ventana, que lo cuenta al momento por el
evento `storage`. Encima va su encabezado (`alemanLecCabHtml()`): por qué toca (*Sigue donde te quedaste*,
*Empieza el Kapitel 10*, *Elegida por ti*…), un tramo por ejercicio, cuántos llevas y tu último ejercicio, en
ámbar pasados dos días. Hasta que carga se ve *Abriendo la lección…*.

**Qué lección toca** lo dice `ALEMAN_LECCIONES.queToca()`, de `../Aleman/lecciones-datos.js`: la misma regla
que el inicio de Alemán (ver *Lo decide Coach*). **«‹» / «Siguiente ›»** recorren el orden de Coach
(`ALEMAN_LECCIONES.orden()`: el Kapitel en curso, luego el A2 y el A1) y la elección se queda en
`aleman_leccion_v1`, que también lee el inicio de Alemán: la enseña como *Elegida por ti*, con *Volver a la
del plan*. «↺» vuelve a la del plan (`alemanLeccionOtra()`). Un enlace a otra lección desde dentro la abre
aquí mismo y queda elegida; uno a otra página (el vocabulario, la gramática) se abre aparte. La lección los
pide con `postMessage`, y Escape dentro de ella cierra la ventana.

Con voz alemana instalada, la palabra y el ejemplo llevan su botón para oírlos y, al voltear una tarjeta de la
práctica, suena sola (`alemanOir()`, SpeechSynthesis); sin ella no se pone ningún botón. Mientras la ventana
está abierta, Mi Día no rota y las teclas no lo mueven por detrás —en la práctica, Espacio, 1 y 2 son suyas—, y
la brújula del Dashboard enseña el prompt de Alemán (la vista `#alemanOverlay.open`). Al cerrarla se repinta la
tarjeta. Bajo 1100 px el encabezado baja sus botones a una fila, y bajo 640 px va a pantalla completa, sin
brújula, con las tarjetas una debajo de otra. Medido: a 2048×1040 la ventana mide 1884×957, las tarjetas 356×273
en cinco columnas y la lección 1836×730, en sus dos columnas; a 1600, cuatro columnas; a 1024, dos; a 390, una,
sin desplazamiento horizontal. Con la fecha simulada, 30 días seguidos: 300 palabras nuevas, ninguna repetida, y,
practicando a diario, 10 repasos al día la primera semana, 20 la segunda y 30 desde el día 12.

### La ficha de un ejercicio

Tocar un ejercicio —su nombre en **Entrenas**, o su nombre o su foto en la rutina de gym del **AHORA** (`gymBloqueHtml`)— abre
`verFichaEjercicio(id)`: **la misma ficha que Ejercicio** (`verEjercicio`). Imagen, tipo y equipo, músculo y secundarios, en qué
días de tu rutina va (y *En tu rutina del jueves va a 4 × 12 reps, con 60 s de descanso*, prefiriendo el día que se mira en la
tira), **cómo se hace** paso a paso, **el error que se ve siempre**, **tu historial** de pesos (las 6 sesiones más recientes, de
`gymSesiones()`) y **si está ocupada**: tres alternativas del mismo músculo, que abren su propia ficha. Sin historial, sugiere
el peso de arranque. *Abrir en Ejercicio →* lleva al día con `?dia=N`. Se cierra con click fuera, Escape o ✕.

**El contenido no vive aquí**: sale de `EJ_DB`, la biblioteca de `CuidadoPersonal/ejercicios-datos.js`, el mismo archivo que
carga Ejercicio. `ejInfo(id)` la combina con `EJ_PESO_INI` —lo único que es del Dashboard: el peso inicial sugerido— y con los
ejercicios propios de `mirutina_v1`. El control *biblioteca de ejercicios* del verificador impide que `EJ_DB` vuelva a
copiarse en un HTML o que `EJ_PESO_INI` vuelva a llevar nombre, imagen o técnica.

### La rutina

`RUTINA_TASKS` **no se declara aquí**: `CIFRAS.rutina('../Coach/Coach.html')` la pide a
`datos-maestros.js`; el argumento es el prefijo de los `href`, que en el maestro son anclas de
Coach. Los bloques `fijo:true` cuentan para "ahora/siguiente" pero no llevan checkbox ni suman al
progreso. `RUTINA_TASKS` pasa por `cifrarLiterales()` como `PHASES` y `META_DETALLE`, así que sus
`{{marcadores}}` (la meta de proteína, por ejemplo) salen resueltos.

**Cada paso de la rutina de piel, pelo y suplementos es el nombre simple del producto** —el del
maestro—, **con su foto** o, si no la tiene o no carga, **su envase dibujado** (`pfEnvaseSvg()`, el de
su ficha; las fotos van en chico, de 200 o 120 px), y el botón **ⓘ Qué es** —el mismo `.lc-info` de la
lista de la compra, abriendo con `pfAbrirId`—. Debajo, en gris, solo lo que hay que saber en ese
momento (`rpMeta()`): lo que la frase dice antes del nombre, hasta los dos puntos (*Hoy no lleva
champú*, *Ya seco*, *Protector solar*) o, si empieza por el nombre, la dosis o el cómo (*1 ml con el
gotero en cuero cabelludo seco*, *2000-4000 UI, con algo de grasa en la comida*); la frase entera, al
pasar el ratón. El cómo se aplica y para qué sirve están en la ficha. No hay enlace de compra: comprar
tiene su pantalla. Lo que no es un producto va como **nota**, con su icono en gris, o como **aviso**, en
ámbar, si empieza con ⚠️ o manda un NO: *Hoy NO uses acondicionador…* y *Si hoy hay caspa, Darrow en
lugar del Pilexil*, que es una condición y no un paso (su *Qué es* abre la ficha de Darrow). *Skincare
AM* y *Skincare PM* juntan los productos de piel de ese momento (`am` / `pm` de `RUTINA_PIEL`).

`rtProducto(txt)` sabe qué producto es porque los **controles 11, 12 y 13** del verificador
garantizan que el `n` de cada producto de `RUTINA_PIEL`, `RUTINA_PELO` y `SUPLEMENTOS` aparece
literal en la subtarea que lo ejecuta: busca cuál de esos nombres está contenido en el texto y
gana el más largo. Segundo intento por aproximación con `pfPorNombre()` (normaliza y acepta
prefijo: "Omega 3" contra "Omega 3 (aceite de pescado)") sobre lo de antes del guion largo, lo de
después de los dos puntos y el primer `<b>`. Se muestra el nombre del maestro. Las subtareas que
no nombran un producto van como nota o como aviso.

---

## El rail de control

**Un rail a la izquierda**, cuatro bloques separados por filete: reloj y sync, las **siete
pantallas** con icono de trazo y su nombre, los controles de reproducción con barra de avance, y
la fila de sistema (menú, pantalla completa, ajustes, ayuda). El activo se marca con fondo y color,
sin taparse.

**Vive plegado**: una tira de **56 px** con el tirador, las siete pantallas sin nombre y el play.
El tirador lo abre a 198 px con nombres, reloj y ajustes. **Solo el tirador lo cierra**: elegir
una pantalla no lo pliega (`showSlide` no toca el rail), para poder saltar entre varias seguidas.
El estado se guarda en `dash-rail-abierto` (`RAIL_KEY`) y sobrevive a la recarga. Los siete
iconos de 38 px caben a 720 px de alto.

**El hueco sigue al rail**: `--pad-rail` cambia con la clase `rail-on` del `body` (84 px plegado,
230 abierto), así que el contenido pasa de 1354 a 1500 px a 1600 de ancho al cerrarlo. Plegado, el
contenido —en Mi Día, la tira de la agenda— arranca **a 12 px del rail en cualquier ancho** (Adán,
18-oct-2026: *"estas dos barras las quiero más pegadas"*; con `6vw` quedaban 51 px a 2048). **A la derecha
llega a 16 px del borde** —la distancia que deja el rail a la izquierda—: ahí no hay nada fijo, y con
`max(4vw, 42px)` quedaban 82 px vacíos a 2048 (Adán: *"no estamos aprovechando el lado derecho"*).

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

**Aeroresinas y Heliescala cuelgan además un enlace a su PDF real** (`qa-pill-wrap` > `.qa-pdf`,
icono `pdf` en `QA_ICO`), debajo de su píldora — Posts no, porque no tiene PDF propio: el de cada
negocio ya cuelga de su propia píldora (Adán, 2026-09-21: *"abajo de cada uno ponme un icono del
pdf de cada uno"*). Abre el `.pdf` en pestaña nueva —`Aeroresinas-dossier.pdf`,
`Heliescala-catalogo.pdf`—, no la web: el lector de PDF del navegador ya trae su propio botón de
descarga en la barra de herramientas, así que no hace falta uno aparte para cumplir *"cuando esté
en el pdf debe haber algo para poder descargar ese pdf"*. Por debajo de 1590 px se queda solo el
icono, igual que las píldoras de arriba.

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

Se abre desde la tarjeta *Tu dinero hoy* de Mi Día (`invertirHoyHtml()` → `abrirGBM()`) o con
`dashboard.html#invertir`, cualquier día de la semana, y ocupa casi toda la pantalla, 97 % × 97 % (Adán: *"haz la ventana mucho más grande"*; a 2048×1040, 1987×1009)
(`.gbm-card.inv-card`; las clases `.gbm-*` las comparte el panel de los medidores de Mis Metas, que
lleva su propio modificador `.kpi-card`). Adán, 21-sep-2026: *"hazla lo más grande posible… una
especie de plantilla… claude solo se encargará de la información y la plantilla no se modificará
visualmente, entonces solo se gastan tokens en información"*.

**La plantilla y los datos van separados.** La plantilla es `renderGBMPanel()` más el CSS `.inv-*`:
nunca cambia al actualizar. Los datos son tres archivos cargados justo después del maestro, cada
uno con su botón 🤖 y su `_meta` (cuándo, qué modelo, tokens, vueltas, segundos):
`inversion-hoy.js` (`window.INVERSION_HOY`: mercado, los perfiles segura y medio y las fuentes), `inversion-alto.js` (`window.INVERSION_ALTO`: la compra a la baja de Riesgo alto) e
`inversion-superalto.js` (`window.INVERSION_SUPERALTO`: la apuesta de Riesgo súper alto). Si un
archivo falta, su zona lo dice y todo lo demás sigue con lo local.

**Precisa y con gráficas** (Adán, 20-oct-2026: *"está sobresaturada de información, debe ser muy precisa y
concreta todo, si puedes añadir gráficas mejor"*). Arriba va solo lo que decide la compra —cuánto, a qué, qué
esperar y qué hacer este mes— con tres gráficas en HTML, sin librerías; el análisis largo de Claude no se pierde:
va plegado en *El análisis completo* (`invMas()`). Medido a 2048×1040: la pestaña segura pasó de 5,348 caracteres
a 2,743 y ya no desplaza; la de riesgo alto, de 6,927 a 3,497, y tampoco; la de súper alto desplaza 76 px. La
pestaña llena el alto de la ventana: las cajas de las gráficas crecen con ella y la de 12 meses se estira.

| Zona | Qué pinta | De dónde |
|---|---|---|
| Cuatro pestañas | 🛡️ Inversión segura (`--g`), ⚖️ Riesgo medio (`--w`), 🔥 Riesgo alto (`--o`) y 🎲 Riesgo súper alto (`--r`), con lema y riesgo 1-5 en puntos; `invTab()` recuerda la abierta. Las dos últimas son *apuestas* (`INV_PERFILES[].apuesta`) | `perfiles.seguro/medio` · `INVERSION_ALTO` · `INVERSION_SUPERALTO` |
| Un perfil (segura, medio) | El lema y para quién es; cuatro cifras (`invKpi()`): rendimiento esperado, riesgo, horizonte y la peor caída en su primera frase; **el reparto** de tu monto (`invRepartoHtml()`: la barra apilada y su tabla con %, pesos y dónde se compra) con **Este mes**, la acción, al pie de su caja y **cuánto tendrías en 12 meses** (`invProyHtml()`: una columna por mes, lo que aportas en gris y lo que rinde en verde, el rango de `invEn12()` arriba y cada mes en su tooltip, también con el teclado). Plegado: el resumen, por qué, en contra, reglas y qué vigilar de cada activo | el perfil + el monto |
| Una apuesta (alto, súper alto) | `invApuestaHtml(modo)`, la misma plantilla para las dos: su botón *🤖 Investigar hoy* —solo reescribe esa pestaña— con la fecha de lo investigado; la empresa con su precio, su caída desde el máximo de 52 semanas y el plazo; **la escala** (`invEscalaHtml()`): stop, hoy, objetivo y máximo, con lo que perderías o ganarías en pesos a cada lado de hoy —la frase o la cifra sola según el ancho real de la zona, con una container query— y la franja de entrada si Claude la dio con números; *Por qué puede rebotar*, *Lo que la puede hacer subir* y *Vende si pasa esto*, y el reparto fijo del mes (`invReglaSA()`: `{{especulacionMes}}` al mes → `{{cetesDia15}}` a CETES, `{{especulacionBtcPct}}` % a Bitcoin y el resto a **una sola empresa a la baja**, con ≈ acciones y ≈ ₿ al precio de hoy; lo que va en 0 % no sale en la tabla). Plegado: por qué cayó, riesgos, reglas, señales, las otras dos candidatas y las fuentes. Lo que cambia entre las dos (`INV_APUESTA_TXT`) es el texto, el color y el prompt: **alto** pide una empresa sólida —líder de su sector, rentable, capitalización mayor a 20,000 M USD— a la baja por una razón temporal (Adán, 21-sep-2026: *"igualita que el de riesgo súper alto con las mismas cifras, pero… empresas un poco más confiables, igual comprar a la baja"*); **súper alto**, una de altísimo riesgo | `INVERSION_ALTO` / `INVERSION_SUPERALTO` |
| ☆ Usar este perfil | Guarda la asignación objetivo (`invElegirPerfil()`); la barra lateral la muestra y deja de avisar que falta. Con una apuesta, muestra la regla fija y el ticker del día | `dash-inversion-v1` |
| Barra lateral | BTC y USD/MXN en vivo (`cargarPreciosGBM()`), la tasa de CETES, el mercado en sus señales, tu situación (deuda con interés, portafolio y asignación objetivo) y dónde comprar (`GBM_LINKS`, un renglón cada uno); plegados, el resumen de Claude, la compra rápida y las fuentes | local + `mercado` |

**Los colores de las gráficas** (`--iv1` azul, `--iv2` naranja, `--iv3` morado y `--iv4` ámbar, en `.inv-card`)
pasaron el validador de paleta de la guía de visualización en los dos temas; los acentos del tablero en oscuro son
demasiado claros para una gráfica, por eso el tema oscuro lleva sus propios tonos. Cada activo conserva su color en
todas las pestañas (`invColores()`): CETES azul, Bitcoin ámbar y los demás, los libres en orden.

Los porcentajes de cada activo se normalizan por si Claude no cerró en 100; el monto al mes de
segura y medio se edita en la misma línea del reparto (`invMontoHtml()`, guardado en
`dash-inversion-v1`) y, si Adán no ha escrito uno, es `{{ahorroMesDepa}}`, lo que el plan manda a GBM
en un mes con depa (`{{especulacionMes}}` es solo de las apuestas). Todas las cantidades
propias pasan por `money()`, así el modo privado también las tapa. Con datos de Claude de **más de
7 días**, la cabecera lo dice en naranja (`invDiasViejo()`): una semana es mucho para precios. El
contexto que viaja a Claude lleva el dinero de la maestría de `CIFRAS.fondoMaestria()` y la deuda con
interés de `CIFRAS.deudasConInteres()` (la BBVA no: no le corre interés).

**En esta pantalla no aparece nada del fondo de emergencia** (Adán, 21-sep-2026: *"quita todo lo
que tenga que ver con lo del fondo de emergencia"*): ni la regla fondo → deuda → invertir en
grande, ni la barra del fondo, ni la nota de CETES; el prompt de los perfiles tampoco la lleva y el
contexto no manda el fondo. La regla sigue viva solo en su tarjeta de Mi Día (`invertirHoyHtml()`
sobre `pasoInversionHoy()`).

**Los botones 🤖.** `invPedirClaude(modo)` arma el contexto y navega a
`claudeinv://<ruta>?ctx=<base64url>` (`INV_MODOS`: *actualizar* para segura y medio, *alto* y
*superalto* para cada apuesta). El de los perfiles (`invContexto()`) lleva ingresos, fijos, monto al
mes, aporte fijo a CETES, deudas con tasa, inversiones, efectivo, precios, la maestría (siempre con su
fecha de inicio, del maestro: el prompt no la escribe), fase y perfil elegido — unos 500 tokens; el de una apuesta (`invContextoApuesta(modo)`) lleva la regla del maestro con sus pesos ya
en pesos, los precios y la empresa anterior de esa pestaña, para que Claude diga si sigue vigente.
Windows abre
`inversion-actualizar.ps1` (registrado en `HKCU\Software\Classes\claudeinv` por
`inversion-instalar.bat`, sin administrador), que corre `claude -p` con salida estructurada (el
esquema de ese modo: `inversion-esquema.json` para los perfiles, `inversion-apuesta-esquema.json`
para las dos apuestas), solo herramientas de web (búsqueda para los perfiles, limitada a 3 por el
prompt; búsqueda y lectura de páginas para las apuestas, que el prompt obliga a usar entre 6 y 12
veces con esfuerzo medio: Adán, 21-sep-2026, *"no quiero que se gasten muchos tokens"*) y un system prompt corto — 13.7 k tokens de sistema medidos contra 27.6 k
con el de Claude Code —, valida la respuesta y reescribe el `.js` de ese modo con temporal y
renombrado, así un fallo deja el anterior intacto. La página no puede
leer archivos desde `file://`, pero sí recargar un `<script>`: `invEsperar()` lo reinyecta cada 5 s
y, cuando `_meta.generado` cambia, repinta y avisa con un toast. Sin protocolo (iPad, otra máquina)
*copiar el contexto* deja en el portapapeles el encargo para pegarlo en cualquier sesión de Claude
Code; `inversion-actualizar.bat` repite la última petición de los perfiles con el contexto guardado
en `inversion-contexto.json` (las apuestas guardan el suyo en `inversion-alto-contexto.json` e
`inversion-superalto-contexto.json`; ninguno se sube: son derivados). Si Opus responde con su
límite de sesión, el `.ps1` reintenta una vez con Sonnet y `_meta.modelo` lo deja anotado.

**Ver el prompt.** *ver el prompt* (`invVerPrompt(modo)`) abre `#invPromptOv` con el texto exacto que
sale hacia Claude: el prompt de ese modo más el contexto de este momento, con su tamaño en
caracteres y tokens aproximados, y un botón para copiarlo. Por eso los prompts viven en
`inversion-prompt.js`, `inversion-alto-prompt.js` e `inversion-superalto-prompt.js` (un literal de
plantilla en `window.*`) y
no en un `.txt`: desde `file://` la página solo puede cargarlos con `<script src>`, y el `.ps1` lee
el mismo texto entre los acentos graves — un dato una sola vez. Dentro no puede haber acentos
graves ni `${`.

**Qué piden los prompts.** El de los perfiles (segura y medio): repartir el monto al mes del
contexto sin cuestionarlo, usar sus números, 2-4 activos por perfil comprables en GBM+ / Cetesdirecto /
un exchange para BTC, cada uno con dónde, por qué, qué vigilar y su riesgo concreto, y largos
máximos por campo para que la plantilla no se deforme. El de riesgo alto: una empresa sólida (líder
o top 3 de su sector, rentable los últimos 4 trimestres, deuda neta / EBITDA menor a 3, capitalización
mayor a 20,000 M USD) entre -15 % y -40 % desde su máximo de 52 semanas por una razón temporal, con
catalizadores para recuperar en 1-6 meses, objetivo +15 a +30 % y stop -10 a -15 %. El de súper alto (Adán, 21-sep-2026: *"siempre debe ser una empresa
que esté a la baja y así cuando suba ganar dinero… debe investigarlo muy muy bien para que gane
dinero"*): una sola acción real comprable desde GBM+, caída fuerte desde el máximo de 52 semanas
por una razón identificable y exagerada, catalizadores fechados para rebotar en semanas o pocos
meses, capitalización mayor a 1,000 M USD, nada de penny stocks, SPACs ni apalancados; comparar
tres candidatas, verificar la elegida en dos fuentes, y dar entrada, objetivo, stop, plazo, riesgos,
lo que invalida la tesis y señales con dato. Una corrida con Opus y 3 búsquedas: 152 s y 92.7 k
tokens procesados (11.4 k de salida), medido; las búsquedas son el grueso, y el script acepta
-SinBusqueda para pedirla de memoria cuando solo cambian los saldos.

---

## El tablero del Plan Maestro

La pantalla 2. Arriba la banda de la fase; debajo, más bajas, la ruta de deuda y el riel, y tres
columnas: **el mes, el día que toques y la semana a la que pertenece**.

**La banda de la fase** (`cfbHtml`; Adán, 19-oct-2026: *"haz un mucho mejor diseño de esta barra que
directamente te lleva a las fases, hazla más ancha y las demás de esa página del dashboard hazlas más
pequeñas, aquí ponme info importante… pon algo de las fases"*) va en dos filas:

- **Arriba, la fase en el tiempo**: su chip y su título, sus fechas, *día 19 de 182 · quedan 163 días*
  (`CIFRAS.diasFase()`, la misma cuenta del calendario, la ventana de las fases y Coach) y sus meses
  como una línea partida. Cada mes dice su auditoría y algo de él: ✓ con su calificación si se auditó,
  ⚠ *auditar* si cerró sin auditar, lo que llevas de su checklist el mes en curso —con una barrita en
  su borde de abajo hasta hoy y la marca del día— y sus tareas los que vienen. Tocar un mes abre la
  ventana de las fases en ese mes (`cfbAbrir`).
- **Abajo, lo que importa de la fase hoy**, en tres bloques: **este mes** —cuántas tareas de su
  checklist llevas, la siguiente que te toca (su primera frase) y cuándo se audita, o *falta auditar
  septiembre* si quedó un mes atrás; de `CIFRAS.planMes` y `fzmFicha`—; **las cifras del mes** —sus
  metas (tu dinero, la BBVA, el patrimonio líquido) contra lo de hoy (`ctCifrasHoy`, ver *Las cifras de hoy, una
  sola cuenta*), en verde las que van en meta y, desde la última semana, en rojo las que no—, y **el checkpoint**
  —la fecha que cierra la fase, lo que pide en su primera cláusula —*solicitud enviada y GBM contra*
  `{{marzoParaSalida}}`; el texto completo, en la ventana de las fases— y lo que da tu ritmo ese mes en el plan
  (`PROYECCION`), con lo que falta o sobra contra lo que pide su corte (`cortesSalidaDash`): *$129,532 en GBM con
  tu ritmo · faltan $56,173*, la misma cifra que la meta de la fase (*tu ritmo da…*), Mis Metas y la ventana de
  las fases—.

Medido a 2048×1040: la banda mide 157 px de alto (antes una fila de 46), la ruta 41 (antes 52) y el
riel 66 (antes 77). Bajo 1180 px los meses bajan a su propia fila; bajo 760, los tres bloques van uno
debajo de otro, y a 390 px no hay desborde.

**Toda la banda es un botón**: abre la ventana de las fases (`abrirKpi('fases')`, en
`kpiDetalle`) con fechas, estado, meta, el porqué en tarjetas, el checkpoint y el checklist de cada mes leído de
`coach_checks_v1`. En las fases que pasan en México, **💰 Tu ahorro en esta fase** (`faseAhorroHTML`): un mes de cada etapa —con depa y en casa de tu familia— renglón por renglón, cada uno abrible con su desglose, y GBM al cerrar cada mes en barras contra lo que pide cada corte de la salida que cae en la fase (`cortesSalidaDash`: el cierre de la Fase 1, el día de decidir, la cuenta bloqueada y la salida completa); el mismo desglose que Coach. El título del módulo Fase de Mi Día abre la misma ventana.

### De dónde sale cada cosa

Ningún importe está escrito en el código del tablero:

| Dato | Fuente |
|---|---|
| Gasto e ingreso de cada día | `finanzasmx_v2.transactions`, agrupadas por fecha en `ctMovs(ym)` |
| Color de cada categoría | `CT_COLOR`, los mismos hex que `CCOLORS` de Finanzas |
| Pagos programados de un día | `CIFRAS.CALENDARIO.cobros` + el `day` de cada deuda viva + los abonos de la BBVA de `CIFRAS.planBbva` (`ctAgenda`) |
| Tu estrategia de hoy | `CIFRAS.bbvaEstado()` (el saldo vivo de la BBVA y su plan) + el riel (`ctTramo`) |
| Las cifras de hoy (tu dinero, la BBVA, el patrimonio) | `ctCifrasHoy()` → `CIFRAS.cifrasHoy(f, gastar)`, con lo que el riel dice que hay para gastar |
| El checkpoint de la fase | `CIFRAS.PROYECCION` (lo que da tu ritmo ese mes) contra su corte de `cortesSalidaDash()` |
| Tareas y fase | `PHASES`, con su estado en `coach_checks_v1` |
| Costo de comer, por día | `CIFRAS.PRECIOS_SUPER` (aquí, `LISTA_COMPRAS_PRECIOS`) × `CIFRAS.LISTA_COMPRAS.comida` (`ctComida`) |

`ctAgenda()` es la misma fuente que el globo del calendario anual: dos
pantallas que dicen qué se paga un día no pueden discrepar. **Si `D.fin.debts` viene vacío**
(Finanzas nunca abierto en ese navegador) lee `CIFRAS.DEUDAS_SEED`: los 8 pagos del mes salen
idénticos con y sin Finanzas.

Los cobros aceptan `cada`, `desde` y `hasta` (la renta y los servicios del depa terminan en `rentaHasta`, enero de 2027; el gas es bimestral: aparece en agosto y octubre, no en
septiembre; en el presupuesto mensual entra por la mitad, `gasMensual`). El verificador comprueba
que **todo gasto fijo de `PROYECTO` con importe caiga algún día de `CALENDARIO.cobros`**: un
servicio nuevo sin día ya no sale de la cuenta sin que ninguna pantalla lo vea.

Desde octubre de 2026 el calendario trae también **el plan**: el ahorro de cada quincena a GBM (en verde, `ahorro: true`) y, desde febrero de 2027, el aporte a tu familia del día 1. Salen de la quincena como cualquier cobro, así que lo que el riel dice que te queda ya es tu gasto personal. **Mientras la BBVA tenga saldo**, lo que sobra de la quincena va a ella: el día 1 y el 15 sale *Tarjeta BBVA — lo que sobra de la quincena* y el envío a GBM de ese día baja en lo mismo; el día de pago, *el pago del 11, con lo de Didi* —lo que pide el estado de cuenta para no generar intereses—. Un día con el pago anotado dice lo que se mandó: *lo que mandaste de la quincena*, o *un abono de más*. Ya no se pinta el total de la tarjeta el día 11 (Adán: *"me estás diciendo de pagar mi tarjeta pero ni tengo dinero… eso debe ser cada quincena"*).

### El mes

Sin la gráfica de balance que tenía debajo (Adán, 21-oct-2026: *"quita la gráfica donde está lo del calendario y
redistribuye todo"*), la cuadrícula se queda con todo el alto de la columna (celdas de 100×92 px a 2048×1040).
Cada celda dice **lo que sale ese día con su nombre y su importe** —los dos que más pesan, *Renta 11.3k* y *Datos
650*, y *y 3 más*; el nombre corto sale de `ctCorto` y el completo va en el título— y **lo que entra** en verde
(*+20.5k*, en miles con un decimal), con su **barra vertical** pegada al borde derecho: su alto es lo que sale ese
día —lo programado, lo anotado de contado y comer: la misma suma que la serie del riel— y su color, el del concepto
que manda (`ctColor`; *cena* va como palabra: *quincena* la contiene y la BBVA salía con el color de la cena).
Borde ámbar el día que entra la nómina. La columna es un contenedor (`.ct-cal`, `container-type`): bajo 640 px de
ancho —una pantalla de 1600 o de 1366— la celda deja el punto de color y el importe, y bajo 430 —el teléfono—, el
día y la barra. Las flechas ‹ › cambian de mes; **al abrir un mes que no es el actual se elige el primer día con
movimiento**.

Bajo el nombre del mes, mientras dure el plan en México: **a dónde va el dinero ese mes**. Con la BBVA en su plan, *A la BBVA* —todo lo que le toca ese mes: de las quincenas, de Didi y el mínimo— y, si pasa de $100, *a GBM*; después, *A GBM* —los cobros con `ahorro` del calendario más lo que Didi aparta, de `desgloseMes`— y *Didi*. Es la misma cuenta que la proyección de Coach.

### El riel: una sola cifra manda

Una banda a lo ancho encima de las tres columnas: **la quincena como una sola cuenta, de izquierda a derecha y al
peso** (Adán, 21-oct-2026: *"quítame la gráfica de cómo cae el dinero desde que entró la nómina y rediseña después
todo… revisa bien bien las métricas de los números para que todo cuadre"*):

```
+$20,500     −$15,077       −$1,445               = MIÉRCOLES 21 · HOY · TE QUEDA   −$1,110       = CIERRAS EL 31 CON
tu nómina    salió del 15   se fue sin anotar ·     $3,978                         sale del 22     $2,868
del 15       al 21          tu saldo real del 19    ● Vas holgado · $287/día        al 31          te sobra de la quincena
```

`ctTramo(nSel, nDias, mov, ym)` es el único cálculo: recorre la quincena desde que entra la nómina,
arrastra el saldo día a día y devuelve la serie; de ahí salen la cifra grande, cada término de la cuenta, el
cierre, lo que sale cada día en el mes y la resta de la semana. Lo que entró y salió hasta el día elegido da el
modelo; **si dijiste tu saldo real un día del tramo, la diferencia con el modelo ese día es un término más** —*se
fue sin anotar* o *tenías de más*—, antes de la cifra grande si ese día ya pasó y después si viene. Cada término
lleva en su título lo que suma, concepto por concepto. **El estado en palabras** (`Vas holgado` / `Vas justo` /
`Te vas a pasar`) compara lo que sobra al cerrar el tramo contra lo que cuesta comer una semana; `$287/día` es
ese sobrante entre los días que quedan, y el último día del tramo dice *es con lo que cierras la quincena*. Con los
datos reales del 21-oct-2026 la cuenta cuadra al peso en 17 días de cinco meses.

**El saldo real manda sobre el modelo.** Los activos líquidos de Finanzas —la Cuenta BBVA (`ac013`) y el
Efectivo (`ac014`)— llevan la `fecha` de su saldo; los que caen dentro del tramo se suman y
`ctAnclaReal()` ancla la serie en el más reciente: ese día vale lo que tienes para gastar y de ahí en
adelante se resta lo previsto (antes de esa fecha sigue el modelo). La cuenta lo dice (*se fue sin anotar · tu
saldo real del 19*). Adán,
21-sep-2026: *"esa cifra está mal, ya te había dicho que me quedan 1200"*, y el 19-oct-2026: *"tengo en
mi tarjeta de débito 1,700 y 2500 en efectivo"*. Cuando reporta un saldo, va al maestro como migración
con su fecha; si lo edita en Finanzas, `saveActivo` pone la fecha sola.

**Cuando la quincena no cierra, el estado da el plan** (prompt de Plan Maestro: el hueco previsto
se resuelve antes de que llegue): cuánto falta para llegar al 15 (o al día 1), cuánto trae Didi de
aquí al cierre al ritmo de `didiMes` menos lo que ya aparta, más —si el pago del 11 de la BBVA cae en el tramo— lo que Didi aparta para él, porque la serie ya lo resta; y si lo cubre o cuánto falta aún. Didi sigue fuera de la
serie; solo entra en el plan. Bajo «Cierras el 14 con» la nota dice *te falta* si el cierre es
negativo. La BBVA con plan sale con sus abonos de `planBbva`, no con su mínimo ni su total (ver
`agendaDia` en `DATOS-MAESTROS.md`).

Alto del riel: 66 px a 2048×1040. Cada término es un `.cr-op` del mismo ancho; la cifra grande (`.cr-hero`, vez y
media, con la cifra en `clamp(18px,1.6vw,22px)`) y el cierre (`.cr-fin`) van tras su `=` (`.cr-igual`). Bajo 1180 px
la cifra grande sube a su propia fila y la cuenta sigue debajo, de tres en tres; en el teléfono, de dos en dos. En
la ruta, el padding inferior de cada paso es el hueco de su barrita (`.crb-b`, absoluta).

**El riel deja a Didi fuera**: la pregunta es cuánto puedes gastar esta quincena, y un ingreso variable es un
colchón que puede no llegar; solo entra en el plan cuando la quincena no cierra.

### La pantalla se reinicia al entrar

Entrar al slide pone en `null` todo lo que se pueda haber dejado tocado —`ctYM`, `ctSel` y
`ctHechasAbierto`— y `renderCoachTablero()` los recalcula a hoy. Va en
`showSlide()` **antes** de `RENDERS[i]()`, para que el primer pintado ya salga en el mes actual.

### Elige el día

Tocar una celda elige el día (`ctVerDia`): el riel, la columna del día y la semana se recalculan para él. Cada
concepto de la semana que cae un día concreto también lo elige.

### El día: qué pagas, tu estrategia y tu dinero

Lo que te queda ese día y de dónde sale lo dice el riel —su cifra grande, la cuenta que la da y su cierre—, así que la
columna del día no lo repite (Adán, 20-oct-2026: *"en coach también siento que hay mucha información, deja la
suficiente"*). Con eso, a 2048×1040 la pantalla pasó de 3,183 caracteres a 2,391 y la columna cabe entera.

1. **Lo que pagas el 18** — comer y los pagos que caen, con el total del día.
2. **Tu estrategia de hoy** — solo cuando el día es hoy (ver abajo).
3. **Tu dinero ese día** (`ctDineroDiaHtml`; Adán, 19-oct-2026: *"conforme seleccione otro día, debes
   proyectar todo todo hasta mis inversiones"*) — hoy, lo de Finanzas; un día que viene, la proyección
   siguiendo el plan (`CIFRAS.estadoDia`, ver `DATOS-MAESTROS.md`): para gastar (el riel: la cuenta y el
   efectivo), GBM, los CETES y el depósito del depa —*tu dinero*—, lo que debes (la BBVA con el día en
   que quedará en cero, el auto y el iPhone) y el patrimonio líquido, cada cifra con lo que cambia desde
   hoy en verde o en rojo, y al pie lo que el plan manda de aquí a ese día a la BBVA y a GBM, y lo que la
   salida cuesta en el camino. Hoy, *para gastar* es la cifra del riel y lo demás lo de Finanzas: la misma
   cuenta que la banda (`ctCifrasHoy`). Un día que ya pasó no lleva el bloque, y después del último mes en
   México dice que la proyección sigue mes a mes en Coach. Proyectado el 20 de noviembre desde los saldos
   del 21-oct-2026: para gastar $5,534 y GBM $4,459; la BBVA quedará en cero el 15.

**Los gastos registrados en Finanzas que la agenda no conoce entran en la resta** (`ctTramo` los suma,
y de su serie salen el riel, el mes y la semana), con **borde punteado**: un cobro programado va a caer, uno
punteado ya cayó.

**Una compra a crédito no es una salida de caja.** Sube el saldo de la tarjeta —Finanzas lo mueve
al anotarla— y se paga después; restarla el día de la compra sería contar dos veces. Salen en su
propio bloque bajo el total, en gris, con el pie *"No sale hoy: sube el saldo de BBVA (va en $3,450:
súmalo al próximo abono)"* —o el mínimo y su día, en otra tarjeta—. La regla es la del maestro,
`ctTarjetaDe()` → `CIFRAS.tarjetaDe`: la **nota** nombra una tarjeta de crédito viva (convención en
`readme_finanzas.md`); *débito* es la cuenta. ⚠️ **Excepción: la categoría `Deudas`** — ahí la nota
también nombra la tarjeta, pero es un PAGO a la tarjeta y sí sale del bolsillo.

### Las cifras de hoy, una sola cuenta

La banda decía *Tu dinero $21,513* y la columna del día *$21,291* (Adán, 21-oct-2026: *"revisa bien bien las
métricas de los números para que todo cuadre"*): una tomaba el efectivo de Finanzas del día en que lo dijiste y la
otra el riel, con lo previsto desde entonces. Ahora todo el Dashboard pide lo de hoy a `ctCifrasHoy()`, que le pasa
al maestro (`CIFRAS.cifrasHoy(f, gastar)`) lo que el riel dice que hay para gastar: la banda de la fase, *Tu dinero
hoy* y la ventana de las fases miden igual (*$21,291*; el patrimonio líquido, *−$276,853*). El control 42 vigila
que nadie más llame a `cifrasHoy`.

**El plan y tu dinero un día no son lo mismo, y cada uno va en su sitio.** Lo que pide la fase y lo que da tu ritmo
salen del plan (`PROYECCION`, desde la foto del 1 oct): el checkpoint de la banda, la meta de la fase, Mis Metas y
la ventana de las fases dicen *$129,532 en GBM el 31 de marzo*. *Tu dinero ese día* proyecta desde lo de hoy
(`estadoDia`) y separa GBM y los CETES ($121,504 y $6,000): la diferencia son los $1,990 de la cuenta y el
efectivo que la foto contó como ahorro y $38 de Didi de un lunes que ya pasó. Mes a mes los dos suben igual —lo
que llega a GBM, las ventas, el depósito y lo que cuesta la salida— y lo vigila el control 43: `estadoDia` no
restaba los costos de la salida y el 31 de marzo traía $6,000 de más (las apostillas de diciembre).

### Tu estrategia de hoy

Adán, 15-oct-2026: *"cada día debo tener una estrategia para seguir bien en los números"*. Un bloque
al pie de la columna del día cuando ese día es hoy (`ctEstrategiaHtml`), con lo que hay que hacer;
el saldo y el plan salen de `CIFRAS.bbvaEstado()` y el tope de gasto del riel:

- **Con saldo en la BBVA** (ámbar): el saldo vivo, lo pagado desde los $15,000 con su barra y el día
  en que quedará en cero. **El abono del día ya se restó solo** (`CIFRAS.aplicarPlanBbva`; Adán,
  17-oct-2026: *"no se actualiza conforme a los días"*): *Hoy manda $6,950 a la BBVA: lo que sobra de
  la quincena. Ya va restado*, con el monto editable, **Corregir** (`bbvaCorregir`) y **No lo mandé**
  (`bbvaNoMande`: el saldo vuelve, el día queda en `omitidos` y esa quincena se queda en la cuenta).
  Lo restado los dos días de antes sale igual (*El jueves 15 se restaron $6,950*). Si con el abono
  completo la quincena no cierra, sugiere lo que la deja en cero, no en rojo. Un día sin abono dice el
  siguiente con su monto y de dónde sale, y ofrece **Abonar** (`ceAbonar` → `bbvaAnotar`); si el plan aún
  no restó lo de hoy, *Ya lo mandé*. Lo anotado o corregido hoy desde aquí se puede **Deshacer**
  (`bbvaDeshacer`: un abono corregido vuelve a lo que restó el plan). Al final, solo lo que el riel no
  dice: *nada fuera de lo fijo* si la quincena no cierra, lo cargado hoy a la BBVA (*súmalo al próximo
  abono*) y, si entró dinero que no es nómina, cuánto apartar: el porcentaje que el plan guarda de Didi
  (`didiAlAhorro` entre `didiMes`). El tope de gasto al día ya lo da el riel (*te sobran $1,001/día*).
- **En cero** (verde): *Cancélala* —en la app o en sucursal, con su carta de no adeudo— y **Ya la
  cancelé** (`bbvaCancelar`, pone `cancelada` en `d001`); y lo que desde ya va a GBM.
- **Cancelada**: lo que va a GBM este mes (`desgloseMes`), el envío de hoy —el día 1 y el 15 lo de
  la quincena, el lunes lo de Didi— y *Qué invertir hoy* (`abrirGBM`).

Lo que se anota aquí es lo mismo que deja «Pagar» en Finanzas: una transacción en `Deudas` y el
saldo de `d001` que baja, con `tarjeta`, `origen` y `anotado` (ver *La tarjeta se mueve con lo que se
anota* en `DATOS-MAESTROS.md`); `ceGuardar` la guarda, relee el maestro y repinta. Finanzas abierta en
otra pestaña la relee por el evento `storage`, y el Dashboard igual: su listener también refresca la
caché del maestro. **Con el Dashboard abierto de un día para otro**, el reloj (`tickClock`) nota el
cambio de fecha y `ceNuevoDia` resta los abonos que llegaron, anota las mensualidades fijas que tocaban
(`CIFRAS.aplicarPagosFijos`) y devuelve el Plan Maestro a hoy. Los
abonos que restó el plan no salen en *Lo que anotaste ese día* (`ctMovs` los salta): ya están en la
agenda de su día. Medido a 2048×1040: el bloque mide 512×205 px el día de pago y 512×261 el día
siguiente, y la columna no se desplaza; a 1600, 390×291; a 1366×768 la columna se desplaza 216 px (ya
lo hacía), y a 390 px no hay desborde horizontal.

### No contar dos veces

La renta está en la agenda **y** suele estar anotada. `ctYaContado()` descarta lo ya contado por
cuatro caminos:

| Regla | Caso real |
|---|---|
| `notes: '[recurrente]'` | los fijos que genera Finanzas |
| mismo nombre, en cualquier orden | "Agua y luz" es "Luz y agua"; el internet se anota el 1 y se cobra el 8 |
| dos palabras en común, aunque cambie el importe | "Plan de datos celular" $600 es "Plan de datos AT&T" $650 |
| una palabra en común **y** el importe clavado | "Gas" $179 |
| un pago a la BBVA posterior a su último saldo dicho | lo pone el plan en su día (`pagoBbva`), se llame como se llame |

Lo que no encaja en ninguna ("Tenis Tommy Hilfiger") es gasto real que la agenda no puede conocer.

**Un seed nuevo nace con todas las migraciones aplicadas**: `seedData()` marca al terminar las
banderas suyas y las del maestro (`CIFRAS.MIGRACIONES_FLAGS`), para que una corrección histórica
no pise un saldo más nuevo que ella.

### La semana: el cierre como una resta

**La resta sale de la misma serie que el riel** (`ctTramo`): *traías* —el saldo del día anterior, si la semana no
arranca la quincena—, *entró tu nómina*, *sale en la semana* —exactamente lo que suma la lista de abajo, concepto
por concepto— y, si tu saldo real cae en la semana, *se fue sin anotar* o *tenías de más*; la línea final es el
saldo del último día. Adán, 21-oct-2026: *"revisa bien bien las métricas de los números para que todo cuadre"*
—la resta arrancaba en el saldo real del 19 y la lista era de toda la semana—. **Las semanas son bloques de siete
días desde el 1** (1–7, 8–14, 15–21, 22–28 y el resto), siempre dentro de una quincena, así que el cierre se
nombra con su día real (`ctDiaNombre()`), un tramo de un solo día se dice *el 14* (`ctRango()`), nunca *del 14 al
14*, y la esquina dice *semana 3 de 5*. Una semana que ya pasó dice *Salió* y *Cerraste*; una que viene, *En qué
se va a ir*.

Con los datos del 21-oct-2026: *entró tu nómina, el 15* +$20,500, *sale en la semana* −$15,077, *se fue sin anotar
· tu saldo real del 19* −$1,445 y *cierras el miércoles 21 con* $3,978; la lista —la BBVA $6,950, el auto $6,700,
comer 7 días $777 y el gym $650— *suman $15,077*. **Cada gasto que cae un día concreto es un botón** que abre ese
día (y arrastra calendario y riel), con el día escrito al lado (`Crédito Automotriz · día 15`). Comer no es
botón: cae los siete días.

### Lo que cuesta comer

Una sola línea —`Comer · desayuno, comida y cena · −$111`— en el día y en la semana; el desglose
vive en el `title`. Sale de datos que ya existen, en el maestro: el costo de cada receta del recetario
(`CIFRAS.costoReceta`, sus gramos por la tarifa por gramo de `CIFRAS.PRECIOS_SUPER`) y la despensa
semanal.

| | De dónde sale | Vale |
|---|---|---|
| Desayuno | promedio de las 18 recetas de desayuno (`RECETARIO.costoDesayuno`) | $27 |
| Cena | promedio de las 18 recetas de cena (`RECETARIO.costoCena`) | $61 |
| Comida | lo que queda de la despensa del día | $23.15 |
| **Día** | **la despensa semanal entre 7** | **$111.15** |

Los tres suman exactamente el gasto diario del tablero. No hay recetas de comida, por eso ese
tiempo es el resto y no un promedio; si se añaden, se afina solo.

**En casa de tu familia** (de `PROYECTO.enCasaDesde` al último mes en México) la línea dice `Comer · tu desayuno; comida y cena, en casa` y vale `SUPUESTOS.comidaEnCasa` entre 30.4: `ctComeDe(ym)` se lo pide al maestro (`comerEnMes`), y de ahí lo toman el riel, el mes y la semana.

### Las tareas de la fase

`ctTareasSemana` reparte **las pendientes** entre las semanas que faltan. Para que una tarea
marcada **no desaparezca**, `toggleFaseCheck` guarda **en qué semana se cerró** (`"2026-08#5"`) y
la lista añade detrás las que llevan su marca: casilla puesta, texto tachado (`span:not(.ct-tar-chip)`,
para que el chip `P1` no se vuelva gris) y en verde. El tope de filas va sobre las pendientes, no
sobre la lista entera. Un `true` de los de antes cuenta como hecha, pero al no tener semana no
reaparece. La semana la puede fijar quien llama (`toggleFaseCheck(id, estado, semana)`): el
módulo Fase de Mi Día marca siempre en la semana de hoy, aunque el tablero tenga abierto otro mes.
Lo que la auditoría del mes anterior pasó a este (`planArrastradas`) entra en el reparto como una
tarea más del mes.

**`8 ya hechas` es un botón** que despliega la lista: con casilla lo que se marcó desde aquí
(`checks[id]`, se puede desmarcar); con ✓ y sin casilla lo que trae ✅ escrito en `PHASES` y los
logros de la libreta, que no se desmarcan. `ctHechasAbierto` vive fuera del render. Como una tarea
puede tener dos casillas en pantalla (la de "te toca" y la del desplegable), la casilla manda su
propio estado: `toggleFaseCheck(id, this.checked)`.

### La ruta de deuda y la libreta de logros

Los pasos van en su orden —fondo, Banamex, BBVA— y uno solo está activo: el primero sin terminar,
salvo **mientras corre el plan de la BBVA**, que la vuelve el paso activo y dice *$8,900 · en cero
el 15 nov* —el saldo vivo y la fecha del plan, que se mueven con lo que se anota—; cancelada, *Liquidada
🎉 · 19 oct 2026 · cancelada*. El fondo se queda en lo que tiene: el ahorro de cada quincena ya no va a CETES.

**La cifra de la derecha es lo pagado de la BBVA** desde el saldo con que arrancó su plan
(`CIFRAS.avanceBbva()`: `PROYECTO.bbvaInicio` el día `PROYECTO.bbvaFecha`, hoy 41 % de $15,000), la misma que el medidor de
Deuda cara de Mis Metas. Adán, 13-oct-2026: *"el 74% ya es 0%"* —el promedio de los tres pasos decía
74 % con la tarjeta sin bajar—.

**Un paso liquidado dice la ÚLTIMA vez** que quedó en $0 y cuántas: la Banamex, *Liquidada · 30 sep
2026 · 2 veces*. Las fechas salen de la libreta y de `liquidaciones` en la deuda del maestro
(`vecesLogro()`); el detalle de Deuda cara las cita todas.

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
(avance por calendario); los días los da `CIFRAS.diasFase()`. La barra dibuja el avance y una marca en el esperado. Solo se pinta para
la fase que corre **ahora**: proyectar una cuota diaria sobre una fase cerrada sería falso.

### `calRitmoTC()` — la tarjeta

Lee la deuda `d001` de `finanzasmx_v2`; ningún importe está en el código. **Mientras corre el plan de
pago** (`bbvaPlan()`, que lee `CIFRAS.planBbva` hasta el día que queda en cero) devuelve `plan` y el
bloque sale en naranja, *Quincena a quincena*: el día que queda en cero, lo que cuesta en intereses
y los cuatro abonos que siguen; un ritmo a 12 meses contradiría al calendario. Si la tarjeta trae
`noInterest` (se paga completa cada mes), devuelve `totalero` y el bloque sale en verde "Sin
intereses": el pago, el día límite y el aviso de que la tasa vuelve si paga solo el mínimo. Sin
plan ni `noInterest` hace la cuenta de siempre:

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

**Los intereses al mes pasan por `tasaQueCorre(d)`**: una deuda con `noInterest` (una tarjeta que se
paga completa cada mes) cuenta con tasa 0 en el medidor **Intereses este mes**, en su detalle y en
los desgloses de Deuda cara y Patrimonio, que la marcan "sin intereses". La BBVA ya no lleva
`noInterest`, pero tampoco paga intereses: Adán cubre cada mes lo que pide el estado de cuenta para
no generarlos (`CIFRAS.PROYECTO.bbvaSinIntereses`), así que su tasa tampoco corre y en Deuda cara y
Deuda total dice cuándo quedará en cero (`bbvaPlanTxt()`: *quincena a quincena, en cero el 1 nov, sin intereses*).
Sigue sumando en Deuda cara porque es saldo de tarjeta.
**El panel de cada medidor es XL** (`.gbm-card.kpi-card`: `min(1560px, 96vw)` de ancho y alto
automático hasta el 94 %; Adán, 21-sep-2026: *"todas las ventanas iguales a estas debes hacerlas
lo más grande posible"*). Cada `kpiDetalle` sigue escribiendo su HTML de corrido con `kpiSec`,
`kpiBarra`, `kpiPaso` y `kpiNota`; `kpiAcomodar()` lo reparte al abrir: `.kpi-cifra` y su sub
arriba a lo ancho (`.kpi-hero`, cifra hasta 58 px) y cada sección con lo que le sigue en un
`.kpi-grupo` dentro de `.kpi-cols` (dos columnas CSS que no parten un grupo; una sola sección va a
una columna, y bajo 1024 px todo a una). Medido en 1600×1000: el fondo ocupa 449 px de alto, el
patrimonio 842; sin desbordes en ninguno de los ocho.

**Las fases son la excepción**: en vez de las 2 columnas de `.kpi-cols`, una **ruta** y un panel por
fase (Adán, 3-oct-2026: *"sé muy claro en las fechas… mejora el diseño
de donde me muestras todas las fases"*). `.fases-tabs` es un solo hijo de `#kpiBody`, así que
`kpiAcomodar()` lo mete en un único `.kpi-grupo` a ancho completo. Y es **la más grande**: `abrirKpi`
pone `.kpi-fases` en el overlay solo para ella (Adán: *"haz más grande la ventana de Las 5 fases del
Plan Maestro"*), y desde 641 px la ventana va a 12 px del borde —99 % × 98 % en 1600×1000, 1576×976
px—. La letra va solo un punto arriba del panel XL (Adán: *"la letra hazla más pequeña para que se
vea mejor"*): tareas a 13.5 px, textos a 14, la fase a 27 y la tabla del ahorro a 12.5; en 1600×1000
caben tres meses de tareas sin desplazarse. Mientras está abierta se oculta la brújula del prompt
(`.pp-btn`), que si no cae sobre su esquina. Los otros siete medidores siguen con el panel XL.

- **La ruta** (`.fz-ruta`): una estación por fase (`.fz-est`), con el color de la fase en el
  calendario (`CAL_FASE_COLOR`), el título, el rango de fechas (`1 oct 2026 → 31 mar 2027`), lo que
  dura y cómo va: *✓ cerrada*, *quedan 179 días* (con el chip HOY) o *empieza en 6 meses*. Bajo
  1180 px se desplaza de lado y `kpiFaseVer()` la lleva a la fase elegida. `kpiFaseTab(i)` cambia de
  fase sin volver a pintar.
- **La cabecera de la fase** (`.fz-cab`): el título y tres casillas —Empieza, Termina y Dura— con las
  fechas escritas completas, la barra de días y *vas en el día 3 de 182 · quedan 179 días* (lo hecho se
  cuenta por mes, en sus fichas).
- **Debajo, las subpestañas de la fase** (`.fzm-tabs`): **Información general** y un mes por pestaña, cada
  uno con su ficha (ver *Los meses de cada fase y su auditoría*). Las piezas de abajo son de la
  información general.
- **💡 Por qué esta fase** (`faseRazonesHTML`) pinta los bloques `razones` de la fase en el maestro
  (Adán, sobre el párrafo que había: *"esto no está bien diseñado, hazlo mejor visualmente e
  impactante"*). Arriba, la frase que manda (`.fzr-lema`, en Fraunces con la raya del color de la
  fase); luego la ruta de fotos (`.fzr-ruta`): las tres fechas de la Fase 1 con lo que piden, el orden
  admisión → cuenta bloqueada → visa → vuelo de la Fase 2, los dos supuestos de la Fase 3 sumados con
  +, las metas de la Fase 4; y las tarjetas de dos en dos (`.fzr-card`): foto, qué es (*Paso 1*, *El
  riesgo*, *Lo que lo cierra*, *Plan B*, *La regla*, *Lo logrado*), el título, las cifras grandes con
  su etiqueta y la frase. El riesgo va en rojo, lo que lo cierra en verde, el plan B en ámbar y la
  regla en azul; una cifra «faltan…» sale roja y una «sobran…» verde, así que el color sigue al dato.
- **🚩 Checkpoint** (`faseCheckHTML`): lo de antes de los dos puntos es el cuándo, en su casilla; la
  primera frase, la prueba; las que siguen, sus salidas (*Si llega…* en verde, *Si no…* o *Sin…* en
  rojo). **🚫 Lo que dejas de hacer** (`faseDejaHTML`): una frase por renglón, con lo de antes de los
  dos puntos en negritas.
- **El dinero de la fase** (`faseAhorroHTML`, en las fases que pasan en México): la tabla de un mes de
  cada etapa, con cada renglón abrible (ver *El desglose de un renglón*); **📊 GBM al cerrar cada mes** en
  barras (`.fzg`), con la línea roja de lo que pide cada corte que cae en la fase —los de
  `cortesSalidaDash`, los mismos que Mis Metas y el checkpoint de la banda: el cierre de la Fase 1, el día
  de decidir, la cuenta bloqueada y la salida completa— y debajo lo que falta o lo que sobra (*faltan
  $56,173* en marzo; en la Fase 2, *$78,642* en mayo, *$43,546* en junio y *$112,346* en agosto), y el
  patrimonio que espera la trayectoria (`liquido`).

Abre en la fase en curso (o la siguiente sin empezar, o la última si el plan ya cerró), en la
pestaña del mes de hoy; las otras fases abren en su información general. El subtítulo va del arranque
del plan a la fecha del millón (`finDelPlan()`). La ventana es opaca, como la del alemán.

### Los meses de cada fase y su auditoría

Adán, 18-oct-2026: *"en cada fase debes crear diferentes subtabs de los meses y poner la información,
también debe ir como información general… al terminar cada mes debemos auditar qué cosas se cumplieron
y qué cosas no… en todas las fases cada mes tiene un plan completo"*, y que la auditoría *"deben ser
checklist o cifras"*, con la información bien acomodada y no *"mucho pero nada a la vez"*; y *"la auditoría
es con los checklist, no un text box… ve cómo hacerle para auditar bien bien"*. Por eso **cada mes es una
ficha con lo único que se audita —su checklist y sus cifras—**, todos los meses la llevan desde el
principio, y **se audita como lo haría un auditor**: en cinco pasos, todo con opciones y nada de texto
libre.

**Las pestañas** (`fzmTabsHTML`): *Información general* y los meses agrupados por año, cada uno con el
punto de su auditoría —verde auditado, rojo ya cerró sin auditar, el color de la fase el de hoy—.
`fzmVer(i, vista)` cambia de pestaña; un mes se pinta al abrirlo (`fzmPintar`, que además deja al día su
punto y la información general, oculta mientras se ve un mes).

**La información general** (`fzvGeneralHTML`), en bandas, de lo que se actúa a lo que se explica: la meta,
el checkpoint y **cómo va la fase** (meses auditados, tareas cumplidas hasta hoy, la calificación de los
meses y lo que sigue: *Auditar septiembre* o la próxima auditoría); las **fichas de los meses**
(`.fzv-mes`: tareas cumplidas —o *lo de cada mes*, si el mes no trae tareas— y su estado, con la calificación si ya
se auditó), que abren su mes; GBM al cerrar cada mes en barras, lo que dejas de hacer y lo de toda la fase; y
**plegados** el porqué y un mes de cada etapa renglón por renglón (`faseAhorroHTML` devuelve sus partes por
separado). Las rutinas ya no son una sección aparte: van dentro de su renglón.

### El desglose de un renglón

Adán, 21-oct-2026: *"🧴 Tus rutinas, producto por producto, esto no debe ser otra sección, debe estar en Un mes
de cada etapa, renglón por renglón, pero en la sección que corresponde: al hacer click, que te desglose todo eso
y se expanda"*. En la tabla de la fase y en *Renglón por renglón* de cada mes, un renglón con desglose lleva ▸ y
se abre ahí mismo, en las mismas columnas (`faRenglon` → `faAbrir`, también con Enter; cada grupo es su `<tbody>`).
Lo que trae cada uno sale de `faDetalle(k, ds)` y suma exacto lo que dice su renglón:

| Renglón | Al abrirlo | De dónde |
|---|---|---|
| Luz, agua, internet y gas · Gym, Claude Code e iCloud | cobro por cobro (el gas, a su promedio en el mes tipo y completo en sus meses) | `desgloseMes().items` |
| Comida | desayuno, comida y cena; en casa, tu desayuno y los otros dos *en casa* | `ctComida().tiempos` × 30.4; el último cierra con lo que falta |
| BYD, la mensualidad | a capital (lo que baja el saldo ese mes en la proyección) e intereses | `PROYECCION.meses[].auto` |
| Tus rutinas | piel, cabello y suplementos, producto por producto, y **dónde recortar** en verde | `CIFRAS.rutinasDesglose()`, `faRecorteHTML` |

Con depa: $135 + $200 + $90 = $425; el BYD, $3,756 a capital y $2,944 de intereses; comer, $821 + $704 + $1,854
= $3,379, y las rutinas, $683 + $2,811 + $1,130 = $4,624.

**La ficha del mes** (`faseMesHTML`), con todo de `CIFRAS.planMes(mes)` (ver `DATOS-MAESTROS.md`). Arriba,
el mes y sus tres números: tareas hechas, lo sostenido y las cifras. Si el mes anterior cerró sin auditar,
un aviso lleva a él.

- **✅ El checklist** (izquierda): *Lo que tiene que quedar hecho* —las tareas de la fase y lo que viene de
  antes, con su marca *de octubre*—, *Para la salida a Alemania* y *Lo que sostienes todo el mes* —lo de
  cada semana o cada mes (`mensual`), el foco de aprendizaje y lo de toda la fase—. Cada renglón muestra
  su primera frase con un ›; el detalle se abre al tocarlo y, cerrado, no ocupa lugar ni se corta con puntos
  suspensivos (`fzmPartir`; lo de cada mes también se parte así). Las tareas usan las
  casillas de `coach_checks_v1` (`fzmCheck` → `toggleFaseCheck`); lo sostenido se marca por mes
  (`fzmSostuve`) y no se puede marcar un mes que no ha empezado.
- **🔢 Las cifras** (derecha, `fzmCifrasHTML`): las metas del mes (`metas`) con lo real de hoy
  (`ctCifrasHoy`, la misma cuenta que la banda) o la foto al auditar. A media quincena no se pintan de rojo —todavía falta lo que
  el plan pone después—; desde la última semana del mes, sí.
- **🧾 La auditoría** (`fzmCierreHTML`): por venir, una línea con la fecha; desde siete días antes de que
  acabe el mes (y vencida, en rojo), **Auditar octubre** la abre en el lugar de la ficha. Auditada: la
  calificación con su veredicto, cuántas tareas quedaron cumplidas, pasaron o no van, las causas contadas
  y lo que se corrige el mes siguiente, con **Ver la auditoría** (en solo lectura) y **Reabrir**.
- **💰 El dinero** y **📅 las fechas**, en renglones cortos: el ahorro con lo que entra y sale, qué va a GBM
  el 1 y el 15, los abonos de la BBVA desde el último saldo dicho, lo propio de ese mes y el renglón por
  renglón plegado, con el desglose de ese mes en cada renglón; el cierre y el checkpoint de la fase, los hitos,
  el cambio de foco y lo que se paga.

**La auditoría, paso a paso** (`fzaHTML`, en el lugar de la ficha mientras se audita; `FZA_ABIERTA`):

1. **Verifica tus datos**: antes de calificar, que lo anotado sea verdad. Una casilla por cada control, con
   lo que hoy dice Finanzas al lado (`fzaDatos`): los movimientos anotados del mes, el saldo de la cuenta,
   lo que se debe de la BBVA y lo de CETES, GBM e inversiones. Si algo no cuadra, se corrige en Finanzas.
2. **Cada tarea**: *✅ Cumplida*, *◐ A medias* o *❌ No*; si no, **¿por qué?** (*sin tiempo*, *sin dinero*,
   *dependía de alguien*, *se me olvidó*, *ya no aplica*) y **¿y ahora?** (*pasa al mes siguiente* o *no
   va*). Lo que trae su casilla marcada entra como cumplida; en una fase que ya cerró, lo no cumplido de
   entrada no va —el plan ya lo movió— (`fzmDecDef`).
3. **Lo que sostienes**: *siempre*, *casi siempre*, *a veces* o *nunca* (lo marcado durante el mes entra
   como *siempre*).
4. **Las cifras**: la meta contra lo real; la que no llegó pide **¿qué pasó?** (*gasté de más*, *entró
   menos*, *un gasto fuera del plan*, *el plan no era realista*, *aún no se refleja*).
5. **Lo que corriges**: acciones que salen de las causas marcadas (`FZA_POR`, `FZA_CAUSA`, y una para lo que
   se sostuvo a veces o nunca), cada una con su porqué; se marca a cuáles se compromete y **se vuelven
   tareas del mes siguiente** (*Lo que corriges*, con su casilla).

Cada respuesta se guarda al tocarla (`fzaTarea`, `fzaHabito`, `fzaCifra`, `fzaDato`, `fzaCorr`) y
`fzaEvalua` cuenta lo que falta. **La calificación** sale solo con todo contestado: las tareas pesan la
mitad (cumplida 1, a medias ½), lo sostenido un cuarto (siempre 1, casi siempre ¾, a veces 0.4) y las
cifras otro cuarto; lo que *ya no aplica* no cuenta. 85 o más es *mes cumplido*, de 60 a 84 *a medias* y
menos, *no se cumplió*. **Cerrar la auditoría** (`fzaCerrar`) deja cada tarea cumplida (con su casilla
marcada), pasada o fuera, guarda la foto de las cifras si es hasta diez días después del cierre, la
calificación y las correcciones; **Reabrir** (`fzmReabrir`) vuelve a la auditoría con lo contestado.

**Lo que pasa al mes siguiente y lo que se corrige** (`planArrastradas`) aparecen en el primer mes sin
auditar después del que los dejó —aunque se audite en desorden— y en *Te toca esta semana* del tablero, y
ahí se vuelven a auditar; un mes auditado conserva la lista que se auditó. Por mes, en
`plan_auditoria_v1`: `siempre` (lo sostenido durante el mes), `aud` (las respuestas: `datos`, `t`, `h`, `c`,
`corr`) y, al cerrar, `cerrado`, `tareas` (`ok`, `pasa` o `no`), `cifras` (`real`, `meta`, `medido`),
`califica` y `correcciones` (cada una con su texto y un id que dice el mes y la causa); `reabierto` al reabrir. El **control 38** del
verificador vigila que los 63 meses de las fases 1 a 4 tengan plan completo y sus cifras, y que los `id` de
`mensual` no choquen.

Medido a 2048×1040: la ficha de octubre mide 1124 px de alto, la información general 1092 y la auditoría
1682 (se desplaza dentro de la ventana); sin desborde lateral a 2048, 1600, 1366 ni 390 px, en claro y en
oscuro.

**Patrimonio hacia $1M** es todo lo suyo menos las deudas (`patrimonioNeto()`, que delega en `CIFRAS.patrimonio()` —la misma fórmula de Coach—: inversiones, fondo,
Bitcoin a precio de hoy, efectivo y cuenta, y los bienes), la misma cifra que el Patrimonio Neto de
Finanzas; la barra es el % del millón. El desglose separa lo que tiene, lo que debe y los bienes, y
dice aparte el líquido sin bienes (`patrimonioLiquido()`), que es el número que se mueve con cada
abono. El punto de partida con bienes (18-jul-2026, $231,770) solo sirve para decir cuánto ha
sumado desde entonces.
La meta del millón se fecha con el cierre de la última fase (`finDelPlan()`): el medidor dice
`meta 31 dic 2031` y el de tiempo se llama `Camino a 2031`, los dos leídos de `PHASES`.

Clases `.mg-*`; de la familia anterior `.img-goal-*` solo sobreviven `.img-goal-pbar` y `-fill`,
que usa el overlay de detalle.

**Cada meta tiene un plan que se ejecuta** (`META_PLAN`; Adán: *"las metas, corto, mediano y largo,
no me ayudan a nada, no me das la suficiente información para ejecutar estos planes"*). Lo pide el
prompt de Mis Metas: resultado medible + fecha + sistema, y un siguiente paso con fecha. Por meta:
`meta` (el resultado), `fecha`, `sistema` (cuándo y qué, en bloques que ya tiene la rutina:
gym 18:15, *Negociar tu ingreso* el martes 19:00, el Plan Maestro 20:00, el descanso de ALTEN
de las 13:00, la revisión del sábado 14:40; nunca el domingo, que es de Didi, ni la última hora
de la noche, que es del sueño), `pasos` con fecha, `vas`
(cómo sabes que vas bien) y `si` (qué haces si te atrasas). Las fechas no se copian: `{tarea}` toma
fecha y texto de `PHASES` (y se palomea en la MISMA casilla del Plan Maestro, `coach_checks_v1`,
con la semana de hoy), `{clave}` lee el maestro (`maestriaInicio`, `hyroxFecha`), `{fase}` el
inicio o el cierre de una fase. Los demás pasos se guardan en `metas_plan_v1`. `metaPlan(id)` lo
resuelve todo: el estado de cada paso (`mpFalta`: hoy, esta semana, más adelante o atrasado) y lo
siguiente. Las metas de la Fase 4 (empresa, depa, Tailandia, Hong Kong, SpaceX, Cupra) van
**en pausa** con su fecha de arranque (`pausa`, `desde`): lo que no cabe en la semana se pausa con
fecha, no se abandona. Las dos logradas (11K y Básico 5) no llevan plan.

**La ficha** dice, bajo la foto, la fecha de la meta con el resultado y lo que sigue (`.mg-pl`,
un renglón cada uno; el texto completo en el `title`), y al pie los pasos y el día de lo siguiente,
en cian si es esta semana y en rojo si se pasó; sobre la foto, cuánto falta para la meta (`.mg-cuenta`:
*en 9 semanas*; en pausa, *desde 1 mar 2029*), con el borde rojo si tiene un paso vencido. **El indicador es una
marca por paso del plan** y
el conteo (`4 / 9 PASOS`); en las logradas, los de `META_DETALLE`. Las columnas de la rejilla son
`minmax(0,…)`: con `1fr` el texto de una línea ensanchaba la columna y sacaba de la pantalla la de
largo plazo. **Cuatro estados** con su color en una sola variable por ficha (`--mgc`), que tiñe
chip, marcas, conteo y borde:

| Estado | Clase | Color | Cuándo |
|---|---|---|---|
| LOGRADA | `.mg-card.ok` | `--g` verde | todos los pasos marcados |
| EN MARCHA | `.mg-card.on` | `--ac1` ámbar | avance real: un paso, dinero en Finanzas (la maestría, `METAS_MONEYBAR`) |
| EN PAUSA | *(ninguna)* | `--text3` | su plan arranca después de hoy |
| SIN EMPEZAR | *(ninguna)* | `--text3` | ninguno |

La franja los cuenta en cuatro —logradas, en marcha, en pausa y sin empezar—: las pausadas no se
suman a «sin empezar». **El dinero de la maestría** es `CIFRAS.fondoMaestria()` (el fondo, las
inversiones de Finanzas y el Bitcoin; Adán, 13-oct-2026, sobre los $17,250: *"esta cifra es la
correcta"*), el mismo número que `{{maestria}}`, Finanzas y Coach. **Total invertido** nombra lo que
suma y dice qué parte es del dinero de la maestría; **Deuda cara**, con solo la BBVA viva, lo pagado
de su plan quincena a quincena; y *con interés* es `CIFRAS.deudasConInteres()`. Si una lista no
cabe, desplaza por dentro y su borde de abajo se desvanece mientras haya más (`marcarDesborde()`).

**El panel de una meta abre en «Tu plan»** (`mdPintarPlan()`, `mdEstado.i = -1`): arriba el
resultado, la fecha y lo siguiente; *Tu sistema, cada semana*; *Los pasos, con fecha*, que se
palomean en su renglón (`toggleMetaPlan`), con la etiqueta *Plan Maestro* en los que son tareas
de fase; y *Cómo sabes que vas bien* / *Si te atrasas*. En el temario va primero (`mdIxPlan`) y
debajo *Lo que necesitas saber*, los pasos de `META_DETALLE`, que se siguen marcando como
dominados; *Anterior* desde el paso 1 vuelve al plan. En esa vista no hay *Marcar como dominado*
ni puntos (`.md-plan-on`). Habilidades Base y la barra de edad usan el mismo panel sin plan.
Medido a 2048×1040, 1366×768 y 390: 0 px de desborde; el panel desplaza su columna central.

### El panel de una meta: la ruta, el ritmo y el avance real

Adán, 20-oct-2026: *"falta mucho contenido para las metas, pero debe ser contenido muuuy muy útil si no ni lo
pongas, si puedes hacer cosas más gráficas hazlas"*. Tres piezas en el plan de cada meta, todas con datos que ya
existen —lo que no tiene un dato real no se inventa—, con las marcas de la guía de visualización (delgadas, rejilla
de 1 px, texto en tinta y cada valor también fuera del tooltip):

- **Tu ruta** (`mpRutaHtml`, en el centro, bajo el resultado): los pasos sobre el tiempo, del primero a la meta,
  con hoy y la bandera de la meta. Verde lo hecho, rojo lo atrasado y cian el siguiente; las fechas van arriba y
  abajo por turnos y la que no cabe queda en su `title`. En pausa, rayado hasta que arranca.
- **El ritmo** (`mpRitmoHtml`, arriba de Recursos): cuánto falta —días, meses o años— o, en pausa, cuándo
  arranca; con el plan en marcha, el tiempo recorrido desde el primer paso contra los pasos hechos y el veredicto:
  los pasos atrasados con el primero, *vas al día* o *vas detrás del calendario*.
- **El avance real** (`mpRealHtml`), uno por meta:

| Meta | Qué enseña | De dónde |
|---|---|---|
| ISTQB CT-GenAI | Cada simulacro en columnas contra el corte y tu meta, y las preguntas de Hoy aprendes de 14 días, una celda por día | `examen_genai_v1.intentos`, `habSimulacro()`, `istqbRespuestas()` |
| Hyrox | Las sesiones de gym de las últimas 8 semanas contra los días de tu rutina | `gymSesiones()` y la rutina de Ejercicio |
| Maestría | El GBM que proyecta el plan al cerrar cada mes hasta irte contra lo que pide cada corte —el cierre de la Fase 1, el día de decidir, la cuenta bloqueada y la salida completa—, con lo que falta o sobra en cada uno —los mismos cortes y cifras que el checkpoint del Plan Maestro—; tu dinero hoy contra lo que el plan pide al cerrar el mes, con la definición de la banda, y el alemán (la lección y el vocabulario del nivel) | `CIFRAS.PROYECCION`, `cortesSalidaDash()`, `ctCifrasHoy()` |
| Torneo de ajedrez | Lo que queda de tu sistema antes de la fecha: los sábados de partidas y los días de puzzles | el plan |
| Las de largo plazo | Tu patrimonio líquido contra la trayectoria del millón hasta la fecha de la meta, con hoy y la meta marcados: es lo que las habilita | `CIFRAS.PROYECCION.meses`, `patrimonioLiquido()` |

Sin datos (ni simulacros ni sesiones), su recuadro dice qué va a aparecer ahí. Medido a 2048×1040, en claro y
en oscuro, con el Hyrox, la maestría, el CT-GenAI, el ajedrez y Tailandia: sin errores y sin desborde.

**El Hyrox** es `{{hyroxSede}}` el `{{hyroxFecha}}` (Guadalajara, 19–21 mar 2027, en hyrox.com):
el de CDMX (29 oct–1 nov 2026) quedó a tres semanas de la rutina nueva, y Monterrey (16–18 abr
2027) cae en la Fase 2, que no lleva viajes. La fecha vive en el maestro; la leen el plan, la
lista de salida y Coach.

**La franja de instrumentos** (`#metasBay`) trae el avance del conjunto **en pasos**, no
promediando porcentajes (promediar daba el mismo peso a una meta de 1 paso que al Hyrox de 15),
**la línea del tiempo de las metas** (`mgLineaHtml`) y los cuatro conteos; la regla de edad va dentro,
separada por filete. La línea pone cada meta que falta en su fecha, sobre las fases del Plan Maestro, de hoy al
cierre del plan: los próximos 15 meses ocupan el 58 % del ancho y de ahí al cierre el resto, con el corte
marcado. El punto lleva el estado (ámbar en marcha, gris sin empezar, hueco en pausa) y un anillo rojo si tiene
pasos atrasados; las que caen casi juntas van en un grupo —el cierre del plan junta Hong Kong, la empresa, el depa
y el Cupra— y cada nombre abre su panel. Las etiquetas van en tres carriles para no encimarse; en el teléfono,
solo el icono. **Dos columnas en las dos listas**: seis fichas en tres filas cada una, las logradas al final de
corto plazo. Medido: a 2048×1040 no desplaza ninguna, y las 7 etiquetas no chocan a 2560, 1920, 1600, 1366 ni 390.

**El dinero real** de la Maestría es una barra continua en `--ac2`, distinta de las marcas de
paso, con la cifra (`$2,500 ahorrado`): `METAS_MONEYBAR.maestria.short`; `.lbl` va en el `title`.

**El panel de la Maestría** (`kpiDetalle`, `maestria`) enseña la pausa solo mientras siga vigente (`goal.pausadaHasta`); si no, el ritmo que pide la salida —lo que falta entre los meses que quedan hasta `goal.date`—, lo que el plan junta al mes con depa y en casa, el ingreso nuevo que cierra el hueco (`extraSalida`) y el día de decidir con lo que pide la salida completa (`mayoParaSalida`, `salidaVeredicto`); la proyección y la lista de la salida están en Coach.

### El simulacro del ISTQB CT-GenAI

La meta `istqbgenai` trae en su paso 6 un **examen de verdad**: 40 preguntas, 46 puntos, reloj y
entrega automática. Vive en `examen-genai.js` + los dos bancos.

**Nada inventado**: las preguntas se responden desde el *Programa de Estudios CT-GenAI v1.0* en
español para Latinoamérica (25-jul-2025), con sus mismos términos —prompt, LLM, SLM, tokens, scripts,
testware, y los nombres exactos de cada lista y tabla—. Cada pregunta guarda en `ref` la sección y en
`cita` las frases **textuales** del programa que la sostienen, comprobadas contra el PDF (las de tabla,
celda por celda: *Nombre — descripción*, *Ejemplo: …*); `objetivos` trae el enunciado de los 37
objetivos de aprendizaje; `pag`, la página del PDF de cada frase citada, y `secciones`, el título y la página
donde empieza cada una de las 49 secciones (salen del PDF: las 248 frases se encontraron literales). Las citas son
reproducción parcial con su procedencia, como permite el aviso de copyright del programa (el repositorio es
público): el PDF y el texto completo de cada sección viven solo en la copia local `syllabus/`, que el dashboard
carga si está (`CT_GENAI_SYLLABUS`). Sin ella, las páginas y el botón abren el PDF oficial de gasq.org
(`meta.syllabusUrl`) en la misma página. La traducción LATAM tiene un error en 3.2.2: la
fila de la *manipulación de las solicitudes* repite la de la exfiltración; el porqué de 3.2.2c lo avisa.
El reparto sigue las *Exam Structure Tables v1.0*:

| Capítulo | Preguntas | Puntos |
|---|---|---|
| 1 · Introducción a la IA generativa | 7 | 7 |
| 2 · Ingeniería de prompts | 11 | 16 |
| 3 · Gestión de riesgos | 10 | 11 |
| 4 · Infraestructura impulsada por los LLM | 5 | 5 |
| 5 · Despliegue e integración | 7 | 7 |

Las 6 K3 valen 2 puntos, las 34 K1/K2 valen 1; corte oficial 30 (65 %). Reloj de 75 minutos (los
60 oficiales + 25 % por idioma) o 60.

**Tres juegos**: **A** (79), **B** (77) —mismo temario por caras distintas, como los exámenes de
muestra A y B de ISTQB— y **Mezcla** (156). 0 enunciados y 0 respuestas correctas idénticas entre
bancos, ids sin solape. Cada intento recorre el blueprint objetivo por objetivo, elige variantes
al azar y baraja preguntas y opciones (300 exámenes simulados: 300 combinaciones distintas).
**Durante el examen solo se ve número y valor**; capítulo, objetivo y nivel K se guardan para la
revisión, que pone bajo cada porqué el objetivo y lo que dice el syllabus (`fuenteHtml()`, publicado como
`ctGenaiFuente`; un examen guardado antes de que hubiera citas las toma del banco por su id).

**Es una capa propia** (`#xg-overlay`, clases `.xg-*`) porque `mdPintar()` repinta el cuerpo del
panel entero al cambiar de paso y un examen incrustado perdería el DOM y el temporizador. Usa las
variables de tema del dashboard. Se guarda en `localStorage['examen_genai_v1']`: `curso` (el
examen a medias con el **instante** de finalización, para reanudar con el tiempo real que quedaba)
e `intentos` (puntos, %, minutos, desglose por capítulo y **qué juego**). Los bloques de arranque
—juego y reloj— van arriba, bajo los cuatro datos del examen. Para que un paso dispare algo de la
app, `mdPintar()` pinta `paso.boton` (HTML nuestro, detrás de `linkHtml`) con `.md-paso-btn`.

---

## Habilidades Base

El título de la pantalla es *Valerte por ti mismo, en cualquier parte* (la meta: un adulto capaz y seguro
de sí mismo, aquí y en Alemania); la ficha abierta lleva *Valerte por ti mismo* como antetítulo.

**27 fichas, 383 pasos, 60 videos + la serie de vino**, en `HABILIDAD_DETALLE`. Avance en
`habilidades_checklist_v1`. Orden: `citas`, las cuatro sociales (`networking`, `persuadir`,
`relacionarte`, `sacarmejor`), las tres de leer y sostenerte (`leerpersonas`, `leermujeres`,
`caracter`) y las prácticas (`nadar`, `cocinar`, `armas`, `pelear`, `decirno`, `dinero`, `manejar`,
`recuperar`, `modales`, `fogata`, `vino`, `coctel`, `nudos`, `mecanica`, `auxilios`, `brujula`,
`asado`, `reparaciones`, `meditar`).

**La rejilla son solo las 27 fichas** y llenan el alto: a 2048×1040, tres filas de nueve. La leyenda
(*cada marca es un paso de su checklist*) va en el encabezado, junto a *toca una ficha para abrirla*;
como celda 28 caía sola en una cuarta fila y dejaba ~200 px vacíos.

Cada ficha lleva `✅ Ya lo dominas cuando…` con criterios comprobables, `⚠️ Error más común`, cajas
`Tu caso`/`Ejemplo`/`Plantilla` y `📚 Qué leer`. Las fotos son de Unsplash, verificadas con curl
**y vistas** antes de elegirlas.

**«SIGUIENTE» marca la ficha en curso de `hbEnCurso()`**, la misma que enseña *Hoy aprendes* en Mi Día:
la que Adán eligió ahí con «Siguiente» (`dash-avance-v1`) mientras siga a medias o sin empezar; si
no, la primera del orden de Coach (`HB_PLAN`: lo que pide la fase en curso, lo de antes de irte, lo de
Alemania y lo demás) y, a igual grupo, la ya empezada.

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

El overlay que abre una ficha de Habilidades Base, una habilidad de En qué invertir tu tiempo, una meta de Mis Metas o Tu año
(`#metaDetailOverlay`; `pintarDetailOverlay()` → `mdPintar()`, **los tres comparten los mismos
ids**: al tocarlo se verifican los tres). Diseño de `diseno-ficha/`.

**La tarjeta ocupa el 96 % del ancho y el 94 % del alto** (tope 1920 px): 1536×940 a 1600×1000,
1311×722 a 1366×768.

| Apartado | Ancho | Qué lleva |
|---|---|---|
| **Temario** | 300 px | Un paso por fila, número o ✓ verde, el activo en cian. Un filete separa los de cierre (Practicarlo, Qué leer, Ya lo dominas) |
| **El paso** | el resto | `Paso N de M` · título en Fraunces 34 px · la idea (`d`) 16.5 px · **En detalle**: los puntos como libro mayor numerado (`01`, `02`…) · los apartados |
| **Recursos** | 300 px | Videos (`Para escucharlo`), la barra de dinero de la Maestría, el ritmo y el avance real de una meta, el bloque de Tu año, y **Tu avance** con el siguiente pendiente como botón |

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
dos temas, con una ficha de mapas (Citas), una de serie (Vino), una con barra de dinero (la Maestría) y
Tu año.

---

## En qué invertir tu tiempo — la interfaz de Habilidades Base

Adán: *"la interfaz de habilidades debe ser como la misma interfaz de habilidades base, pero con sus
indicadores… qué tanto tengo de cada sección… al abrir la información debe ser una ventana así como en
habilidades base"*. `renderSkills()` pinta en `#skBay`, `#skGrid` y `#skPlan` con las piezas `.hb-*` de
Habilidades Base (la franja, la ficha con foto y las marcas por paso). Gobierna el prompt `skills`. Todo
lleva foto (`apFotoSk()`, la misma de *Hoy aprendes*).

| Pieza | Qué lleva |
|---|---|
| **La franja** (`#skBay`) | Los indicadores del prompt: el **nivel general** con la jugada que más lo sube (`calcOVRcon()`: *IA de 45 a 55 lo sube a 51*); **el nivel de cada una**, una columna por habilidad en el orden de las fichas, con su nombre (tocarla abre su ruta); **el entregable del foco** con los días que le quedan a su tramo y, si es el CT-GenAI, los simulacros (`habSimTxt()`); **tu semana de estudio** (`habSemana()`: el foco más el mantenimiento de todas, incluida la pausada que conserva horas a propósito —Ventas, la media hora del martes para negociar tu ingreso—) con el rato al volante, que abre *Qué escuchar*; y los **pasos** dominados de todas las rutas y las que están **en pausa** |
| **Las 12 fichas** (`#skGrid`) | Seis por fila, por retorno —peso por lo que falta: dónde una hora sube más tu nivel—. Cada una: su foto; arriba su **nivel** (`45/100`) y, si toca, *FOCO · 4 H* con los ángulos encendidos, *EN PAUSA* o, si conserva horas, *PAUSA · SOLO 0,5 H* (la foto se apaga); abajo el nombre, el escalón (`skLevel()`), la barra del nivel y **lo que toca esta semana** (el tramo del foco o el `mant` de las demás); debajo, una marca por paso de su ruta y `hechos/total` |
| **El plan de foco** (`#skPlan`) | Un tramo de `CIFRAS.HAB_FOCO` por habilidad, ancho según los meses que dura: foto, fechas, horas, el entregable y *Ahora · N días*, *Pasó* o *Desde…*. Tocar uno abre su ruta. *Ajustar en Coach →* |

**La ventana** (`abrirSkillDetalle(id)`) es la de Habilidades Base (`pintarDetailOverlay`, ver *El panel
de detalle*): el temario es la ruta de `APRENDIZAJE` (`habPasos()`); cada paso, **Qué hacer**, la caja **Por
qué este paso** y **Con qué** (el libro con su portada y *Qué es*, o el recurso con `pfRecursoHtml()`), que
`skillDetalle()` arma en el formato de las fichas (`cajas` y `boton`). En Recursos (`lado`): **tu nivel** con
la marca del siguiente escalón y cuánto sube el general, **esta semana**, **se demuestra con** (`prueba`),
**por qué esta habilidad** (`porQue`), **dónde estás** (`desc`), **dónde se practica** y los libros de su
ruta. La frase de la cabecera dice su papel en el plan: el foco de hoy con su entregable y sus días, cuándo
llega su foco, en mantenimiento o en pausa.

**Cada paso se marca como dominado**, igual que una ficha (`toggleSkillPaso()`, en `dash_habpasos_v1`). La
primera vez se siembra con lo que ya habías avanzado con «Siguiente paso»: los pasos anteriores al tuyo
cuentan como hechos. **El paso de la semana es el primero sin dominar** (`habSincronizaPaso()` lo escribe en
`dash_habfoco_v1.paso`): es el que enseña Mi Día, y su tarjeta abre esta misma ventana en ese paso.

**El foco lo pone el plan** (prompt de la página: *una habilidad en foco a la vez; las demás, en
mantenimiento*). `CIFRAS.HAB_FOCO` es una lista de tramos —IA de oct 2026 a ene 2027 (el CT-GenAI, que se presenta en
enero), Inglés de feb a mar 2027 (la solicitud a Esslingen, que cierra el 31 de marzo), Código de abr a may 2027 (el proyecto
para el Werkstudent) y Networking de jun a ago 2027— con horas, el paso de la semana, el
entregable y cuándo cambia. `habPlanHoy()` da el tramo de hoy y el siguiente; `habCandidatas()`
son esos dos (si el plan ya terminó, manda el retorno). Mi Día va con el foco del plan (`aprendeFoco()`) o
con la que eligió ahí con «Siguiente». Los `{{marcadores}}` de las rutas se resuelven al cargar
(`cifrarLiterales(APRENDIZAJE)`).

**Tamaños.** A 2048×1040 —la pantalla de Adán— cabe sin desplazar, igual que Habilidades Base. Bajo 1280 px
las fichas van de cuatro en cuatro; bajo 1024, de tres, y la pantalla desplaza; en el celular, de dos. La
ventana se apila como las fichas.

---

## Qué escuchar mientras manejas

El panel que abren *Tu semana de estudio* en *En qué invertir tu tiempo*, el AHORA en un bloque de Didi y *Audiolibro y
podcast* de Hoy aprendes (`abrirDidi()`). Lo gobierna el prompt `didi`; su diseño es la dirección Main de
`diseno-escuchar/`.

**A lo grande** (Adán: *"hazla en pantalla más grande que abarque más ancho y alto"*): hasta 2200 px
de ancho y el 94 % del alto, como los paneles de los KPI; el cuerpo desplaza por dentro. A 2560×1440
mide 2200×1354 y desplaza 121 px; a 1920×1080, 1843×1015; en el teléfono va a pantalla completa y a
una columna, con el título a todo lo ancho y las dos cifras debajo.

| Zona | Qué lleva |
|---|---|
| **Esta semana**, arriba | `didiSemanaHtml()`: el audiolibro de la semana —fijo de lunes a domingo (`didiLibroSemana()`): el del paso de la semana cuando su libro está en el catálogo (`didiLibroDelPaso()`) o el primero del orden que no te haya tocado; con la portada de la biblioteca (`habLibro()`)—, el episodio de hoy y el alemán de hoy (`didiAlemanHoy()`), con Spotify, Apple y YouTube. Es lo mismo que dice *Al volante* (`didiHoy()`) |
| **Tus trayectos**, a la izquierda | `didiViajes()`: los bloques de la rutina que empiezan por «Didi» (`esDidi()`) con su duración hasta el bloque siguiente, los días iguales juntos, qué cabe en cada trayecto y el total de la semana (27 h 30, el mismo de la franja). Debajo, las reglas al volante, con el nivel de inglés vivo de `SK` |
| **El catálogo**, a la derecha | En el orden de Coach (`didiGruposOrden()`): el foco de Hoy aprendes (`aprendeFoco()`) con su marca, luego el siguiente foco del plan y las demás por retorno (`skRetorno()`), después el alemán (`DIDI_ALEMAN`) y el español (`DIDI_ESPANOL`). Columnas que se reparten la altura; cada audio con su tipo, *largo* o *corto*, su porqué y dónde escucharlo (`didiItemHtml()`, `didiLinks()`). Lo que está en pausa va plegado al final (`.dd-pausa`) |

**Los datos.** `DIDI_AUDIO` agrupa por habilidad y cada audiolibro apunta a su ficha de la biblioteca
(`lib`), de donde sale la portada; `largo:true` marca los podcasts de una hora o más. Los porqués no
llevan la calificación escrita: la tarjeta la lee viva de `SK`. Networking trae los tres
libros de su ruta y el alemán, tres podcasts para quien aprende: nivel y duración comprobados, como
pide el prompt. Los enlaces son búsquedas, no episodios, para que no caduquen.


---

## La Lista de Compras

Siete categorías (`LISTA_CAT_META`), una activa a la vez. **Comida** es la única con precios y
contador; el resto son checklists con dos precios de plataforma. Links de tienda en
todas: Comida con Walmart Súper + Amazon, el resto Amazon + Mercado Libre.

**Con esta lista cocinas** (`lcCocinasHtml()`): bajo los pasillos de Comida, las recetas del recetario
del maestro con su foto de Comida —primero las que ya tienen marcados sus ingredientes, a igualdad
las más baratas—, con tiempo, costo y proteína; cada una abre Comida en desayunos o cenas. Toma el
alto que sobra (`.lc-flex`) y `lcAjustarCocinas()` deja solo las filas que caben enteras; en el
teléfono, seis. Se reordena al marcar.

**El contador cuenta piezas.** Los precios viven en el maestro (`CIFRAS.PRECIOS_SUPER`; aquí se leen como
`LISTA_COMPRAS_PRECIOS`). Cada producto declara un `paso` —lo que
suma un `+`— con `monto` y `g`; `base` dice cuántos `paso` son una semana y es lo que mete el
checkbox de un clic (marcar Plátano pone 6).

| Cifra | Cómo se calcula |
|---|---|
| **Ticket de hoy** | `Σ monto × cantidad` |
| **Costo al mes** | `Σ importe × 4.33 / dura`, con `dura = max(1, cantidad / base)` |

`dura` se deriva de lo que llevas: 6 plátanos duran una semana y 12 duran dos, así que los dos
carritos cuestan lo mismo al mes.

**Los frescos por clase.** Verduras, frutas y almidones son tres pasillos; `lcClase()` les da su
clase (`LC_ITEM_CLASE` es la excepción del aguacate, que cuenta como grasa) y `LC_CLASE_COL` el
color de la regla del pasillo. `lcTotalComida()` prorratea los gramos de cada uno por semana
(`g × cantidad / dura`) y de ahí sale el chip de fruta+verdura por día del HUD, contra el mínimo
de 400 g de la OMS.

**La proteína no se pinta.** Los productos que la traen declaran `prot` —gramos por paso,
aproximados por etiqueta—: es el dato para medir la proteína por peso gastado que pide el prompt.

**Comida va sin leyenda y sin bloque de proporciones** (Adán: *"en compras quítame todo esto"*):
debajo del HUD empiezan los pasillos. Lo que decía la leyenda —ticket o estimado, qué suma un
`+`— está en el `title` de cada píldora. Las demás categorías conservan su `.lc-price-leyenda`.

**Comida y el Kit de Higiene van por columnas** (Adán: *"lo de comida, ordénalo por columnas, se ve
muy mal así"* y *"igual en kit de higiene"*): cada pasillo es un bloque con sus productos uno debajo
de otro, y `.lc-aisles` reparte los pasillos en tantas columnas como quepan, parejas de alto y sin
partir un pasillo (`break-inside:avoid`). `LC_COLUMNAS` dice qué categorías van así: Comida en
columnas de 440 px; el kit, con `ancho`, en columnas de 620 px (`.lc-ancho`), porque sus nombres son
frases y su renglón lleva *Qué es*, dos tiendas y *Ya lo tengo*. En los dos el nombre largo baja de
renglón y se lee entero, nunca con puntos suspensivos. Medido: Comida da 4 columnas a 2048 px, 3 a 1600
y 2 a 1366; el kit, 3 a 2282, 2 a 2048 y 1600 y una a 1366; los dos, una en iPad y celular, sin
desborde. Las demás categorías no llevan `.lc-aisles`: sus pasillos van a todo lo ancho. En todas, los
renglones de un pasillo son una sola columna (`.lc-grid.lc-grid-1col`) de pista `minmax(0,1fr)`: con
`1fr` la pista no bajaba del ancho del nombre sin cortar, y en Comida «Bolsa de verduras (brócoli, col y
zanahoria)» hacía de su pasillo uno de 559 px en una columna de 451 —el contador y el subtotal se metían
en la columna de al lado— (Adán, 21-oct-2026: *"se ve algunas cosas muy descuadradas"*).

**El renglón cabe en una línea** —checkbox · nombre · píldora · precio unitario · contador ·
tiendas · subtotal— en los 440 px de una columna; solo un nombre muy largo baja de renglón.

**Las tiendas, del mismo ancho.** Fuera de Comida cada tienda ocupa el ancho de la más larga de su
categoría, con precio o sin él (`lcAlinearTiendas` la mide al pintar y la deja en `--lc-tienda`; `.lc-tienda`),
y *Ya lo tengo* 80 px: *Qué es*, las dos tiendas y *Ya lo tengo* quedan en columnas parejas renglón a
renglón —antes *Qué es* brincaba según si la tienda traía precio—. La de receta (`.doble`) va sola y ocupa
las dos. Los precios llevan coma de miles (*≈ $1,560 Amazon*). La píldora lleva punto lleno si el precio salió
del ticket de Walmart y hueco si es estimado. En celular (`≤760px`) el renglón va a dos líneas de
46 px.

**Dónde se guarda.** `dash-lista-compras` (producto → número de `paso`) y `dash-lista-tengo` (solo
fuera de Comida). Los `true` de listas anteriores al contador se leen como 1.

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

Los nueve de `SEMILLA` salen de `RUTINA_TASKS`: Construir esta app, Posts del negocio de tu papá
(lun/mié/vie, `flex`, en el hueco del CT-GenAI: Aeroresinas y Heliescala en LinkedIn y Facebook, con la app
Posts; la migración 12 le cambió nombre y pasos, y el plan de cada fase lo pide), Clase de alemán,
Gimnasio, Plan Maestro · 1h15, Leer 10 páginas, Rutina de la noche, Dormir 7 h, Agua 3 litros. Cada
uno lleva `hora` y **la lista se pinta ordenada por ella** (se ordena una copia; el orden guardado
es el de creación). La hora se edita en la ficha (`time`).

**El Gimnasio toca los días con sesión de la rutina del gym** (`GYM_RUTINA_DEFAULT`): de lunes a sábado; el
domingo es descanso. El miércoles era natación y desde el 10-oct-2026 son intervalos en el gym, pero el hábito
siguió sin él y su celda no se podía marcar (Adán, 15-oct-2026: *"los miércoles sí voy al gym, solo que ya no
hago natación"*). La migración 11 se lo devolvió (`DOW_PREVIOS`: solo a quien seguía con los días de la
semilla anterior; unos días puestos a mano no se tocan) y el **control 35** compara los días del hábito con
los de la rutina, para que el próximo cambio de rutina no vuelva a dejar un día sin marcar.

**La noche está ordenada para dormir 7 h** (Adán, 13-oct-2026: *"corrige el tiempo de sueño"*):
Construir esta app de `{{horaApp}}` a `{{horaRutinaNoche}}` —la última pantalla del día—, la rutina de
la noche, la meditación de las `{{horaMeditacion}}` y *Dormir 7 h* con *Luz fuera a las 23:40*. Los
pasos de esos hábitos citan los marcadores del maestro; el nombre, el anclaje y la hora van escritos
porque Adán los puede editar, y el **control 31** comprueba que la semilla diga lo mismo que la rutina.
La migración 10 movió la hora, el anclaje y los pasos de los que seguían como los dejó la semilla
anterior (`HORAS_PREVIAS`, `PASOS_PREVIOS`); los que Adán editó, no. La cuadrícula desplaza por
dentro cuando no caben los diez y su borde de abajo se desvanece mientras haya más (`marcarDesborde()`).

**`flex:true`**: toca ciertos días pero **se puede marcar cualquier día** (Construir esta app y el
Plan Maestro son de lunes a viernes y a veces se hacen en fin de semana). Un día que no toca sin marcar
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
adelanta el día desde las 18:00), `desde`, `mig` y, para la sincronía por el repositorio, `editado` (la
última vez que se tocó algo en este dispositivo, `tocado()`) y `sincAl` (la exportación de la PC que ya
se trajo).

**Coach también la lee**, sin escribir: la pestaña *Tus referentes* cuenta los días del hábito con
"alcohol" en el nombre con la misma regla de racha (`refRacha()` en Coach.html). Un cambio de forma
de `def` o de `marcas` se revisa también allá. Desde Coach se llega a esta pantalla con
`dashboard.html#habitos`.

Las migraciones van por versión (`MIG = 11`), corren una sola vez y en orden, y **lo que Adán
editó a mano manda**: un hábito cuyo nombre o anclaje no son los de la semilla anterior solo
recibe lo nuevo (hora, icono, meta, qué hacer, flex). Los retirados salen de la lista y de su
historial; los nuevos entran con arranque en hoy. Si el guardado trae `marcas` pero no `def`, el
historial se conserva.

### Tu iPad y tu PC, con las mismas marcas

`localStorage` es una caja por navegador: el Safari del iPad y el Chrome de la PC nunca se ven,
aunque abran la misma página. **Sincronizar** (`HB.sync()`, el botón de la cabecera, junto al mes)
abre una ficha con el código de este dispositivo —`HABITOS1:` y el estado en base64 de UTF-8:
`def`, `marcas` y `desde`—, con *Copiar* y, donde el navegador lo tiene (el iPad), *Compartir…*.
Abajo se pega el código del otro y se **funde**, no se reemplaza (`fundir()`):

- Por cada día y hábito queda **lo más avanzado de los dos** (el agua en 3 de 3 gana a 2 de 3): una
  marca nunca se borra al fundir, y desmarcar en un dispositivo no viaja al otro.
- Los hábitos que solo tiene el otro se agregan (menos los retirados); los que están en los dos
  conservan la definición de aquí. El arranque (`desde`) queda en el más antiguo.
- Fundir otra vez lo mismo no cambia nada, y un código cortado lo dice sin tocar los datos.

Hecho en los dos sentidos, los dos quedan iguales.

**Y cada commit los lleva solos a los otros dispositivos** (Adán, 19-oct-2026: *"yo los actualizaré desde
mi pc… pero quiero que se reflejen las actualizaciones en mis otros dispositivos, entonces crea un hook…
que cada día cuando haga algún commit, de cualquier cosa se actualicen los hábitos"*). El hook de
pre-commit (`.githooks/pre-commit`, activo con `git config core.hooksPath Claude_Proyecto/.githooks`)
corre `habitos-exportar.js`: copia el almacenamiento del Chrome de la PC a una carpeta temporal, lo lee
con el mismo Chrome en modo invisible y con un perfil aparte —el navegador abierto no se toca— y, si las
marcas cambiaron, escribe `habitos-sync.js` (`window.HABITOS_SYNC = {exportado, datos}`, una línea por
hábito y una por día) y lo agrega al commit. Tarda menos de un segundo y nunca detiene un commit: si
no encuentra Chrome o los hábitos, lo dice en una línea. La página publicada lo carga antes que
`habitos.js`, y `delRepo()` lo trae una sola vez por exportación y solo si es más nuevo que lo último
que se tocó en ese dispositivo (`exportado` es la última marca de la PC; `editado`, la de aquí): así la
PC no se reimporta ni resucita una marca que acaba de quitar. Un dispositivo sin hábitos, o que no tocó
nada desde la última vez, queda **igual a la PC** —también lo desmarcado—; uno con cambios propios lo
**funde** como el código de Sincronizar, sin perder nada. El **control 39** del verificador vigila las
piezas. El repositorio es público: lo que viaja ahí —los nombres de los hábitos y sus marcas— se puede
leer sin sesión, como `datos-maestros.js`.

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
solo quedan `fixTasaTCIfNeeded()` y las de rutina y gimnasio (`fixMiercolesNatacionIfNeeded()` y
compañía). Las de saldo de agosto que vivían aquí como espejo de Finanzas ya no están: el maestro
sella sus banderas, así que no podían volver a correr, y si corrían en un navegador sin bandera
pisaban un saldo más nuevo. Patrón de todas: bandera propia, una sola pasada, **nunca revierten** un
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
