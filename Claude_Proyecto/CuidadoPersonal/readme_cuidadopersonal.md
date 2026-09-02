# cuidadopersonal.html — Cuidado Personal (shell)

Página "hub" de una sola pieza (HTML+CSS+JS, sin backend, sin dependencias externas — ni Chart.js) creada el 2026-07-29 que agrupa 7 subtabs principales en una sola navegación: **🧴 Skincare**, **💇 Cuidado del Cabello**, **🦷 Dentista** (**nuevo 2026-07-31**) (las tres nativas, construidas en este mismo archivo), **🥗 Cuidado de la Salud**, **🏋️ Ejercicio**, **🍳 Comida** y **👔 Vestimenta** (**nuevo 2026-08-03**) (apps completas preexistentes, incrustadas vía `<iframe>`). Sustituyó a las antiguas apps independientes `Salud/salud.html`, `Ejercicio/ejercicio.html` y a la app de `Animo/animo.html` (retirada, no fusionada).

Ver también: [`readme_salud.md`](readme_salud.md), [`readme_ejercicio.md`](readme_ejercicio.md), [`readme_comida.md`](readme_comida.md) y [`../Vestimenta/readme_vestimenta.md`](../Vestimenta/readme_vestimenta.md) — documentación de las cuatro apps incrustadas. Este archivo (`readme_cuidadopersonal.md`) solo documenta el shell y los tres módulos nativos (Skincare, Cabello, Dentista).

## Por qué Salud, Ejercicio y Comida están incrustados con `<iframe>` en vez de fusionados línea por línea

Las tres apps son grandes por sí solas y comparten (o podrían llegar a compartir) nombres de variables y funciones globales (`KEY`, `RENDERS`, `SECS`, `STITLE`, `load`, `save`, `today`, `fmtD`, `uid`, `check`, `killChart`, etc.). Concatenarlas en un mismo `<script>` provocaría errores de "Identifier ya declarado" y rompería las apps. Incrustarlas cada una en su propio `<iframe>` dentro del subtab correspondiente conserva el 100% de su funcionalidad original sin ese riesgo.

**Origen compartido de `localStorage`**: como los cuatro archivos (`cuidadopersonal.html`, `salud.html`, `ejercicio.html`, `comida.html`) se abren vía `file://`, comparten el mismo origen/almacenamiento que el resto del proyecto (así lo hace también `Dashboard/dashboard.html` al leer las claves de todas las apps hermanas desde una carpeta distinta). Por eso los datos guardados en `misalud_v1`, `mirutina_v1` y `comida_v1` siguen disponibles igual que antes de mover los archivos a esta carpeta, y por eso Skincare/Cabello pueden compartir sesión de `localStorage` con el resto del proyecto sin ninguna configuración especial. **`comida.html` además usa este origen compartido para *escribir* directamente en `misalud_v1`** (no solo en su propia clave) — ver [`readme_comida.md`](readme_comida.md) → "Referencias cruzadas".

## Navegación del shell

`mainTab(tab)` alterna la clase `.active` entre los 7 botones `.tab-btn` (`data-tab="skincare|cabello|dentista|salud|ejercicio|comida|vestimenta"`) y los 7 contenedores `.view` (`#view-skincare|#view-cabello|#view-dentista|#view-salud|#view-ejercicio|#view-comida|#view-vestimenta`). Los cuatro tabs de iframe (`salud`, `ejercicio`, `comida`, `vestimenta`) cargan su `src` de forma perezosa la primera vez que se activan (`if(!f.getAttribute('src')) f.src='salud.html'`), y ya no se recarga después — cambiar de tab y volver conserva el estado interno de esa app. Dentista, como Skincare/Cabello, es nativo — no usa iframe ni carga perezosa.

**Deep-link**: acepta `?tab=` en la URL (`skincare|cabello|dentista|salud|ejercicio|comida|vestimenta`) para abrir directo ese subtab — así es como el Dashboard enlaza a cada área específica (`cuidadopersonal.html?tab=ejercicio`, etc.).

## 👔 Vestimenta — incrustada por `<iframe>` (nuevo 2026-08-03)

Pedido explícito: *"en cuidado personal, crea una seccion para la vestimenta... con fotos, accesorios... separadas por secciones dependiendo la ocasion... lo mas completo posible, links de compra y todo tipo de ropa"*. Antes de construir nada nuevo se verificó si ya existía algo así — **sí existía**: `Vestimenta/vestimenta.html`, creada el 2026-08-01 con exactamente ese contenido (básicos, chaquetas, zapatos, combos por ocasión de trabajo/casual/ejercicio/bodas/fiestas, links de compra con precios reales). Adán confirmó explícitamente integrar esa app existente como pestaña aquí, **no** reconstruir el contenido desde cero ni duplicar fotos/datos.

**Adán probó la integración y pidió mejorar la calidad real de las fotos** ("pero lo hiciste completo, con imagenes profesionales?"), lo que llevó a una reconstrucción de imágenes + una nueva categoría ⌚ Accesorios + links de compra reales verificados, el mismo 2026-08-03 — ver [`../Vestimenta/readme_vestimenta.md`](../Vestimenta/readme_vestimenta.md) → "Reconstrucción de fotos + Accesorios + links de compra reales" para el detalle completo. Nada de eso tocó la integración con este shell (mismo `<iframe>`, mismo `src`, mismo comportamiento) — solo cambió el contenido interno de la app incrustada.

- **Mismo patrón que Salud/Ejercicio/Comida**: `<main class="view view-frame" id="view-vestimenta"><iframe id="frame-vestimenta" title="Vestimenta"></iframe></main>`, con `src="../Vestimenta/vestimenta.html"` (única app incrustada que vive **fuera** de `CuidadoPersonal/`, de ahí el `../`) cargado perezosamente igual que las otras tres. Se usa `<iframe>` en vez de fusionar el código por el mismo motivo de siempre: `vestimenta_app.js` tiene sus propias `RENDERS`/`nav()`/`load()`/`save()` que colisionarían con las del shell y con las de Skincare/Cabello/Dentista si se concatenaran.
- **Color propio en la nav**: nuevas variables `--ve`/`--ve-l` (cognac `#c17f4a` en oscuro, `#8a5a2e` en claro) — mismo tono "premium minimalista" que ya usa `vestimenta.html` como identidad visual propia (ver `readme_vestimenta.md` → "Sistema de diseño"), en vez de reciclar uno de los colores ya asignados a otro tab.
- **Tema visual sincronizado gratis**: `vestimenta.html` ya usaba la clave compartida `coach-theme` desde que se creó (ver su propio readme), así que el toggle del shell (`toggleTheme()`) solo necesitó agregar `'frame-vestimenta'` al arreglo de iframes a los que empuja `data-theme` en vivo — no hizo falta ninguna lógica nueva.
- **No comparte `localStorage['vestimenta_v1']` con ninguna otra app** — el checklist de compra de Vestimenta sigue siendo autocontenido, igual que antes de incrustarla aquí. Lo único que cambió es la *forma de llegar* a la app (antes solo abriéndola directo desde `Vestimenta/`, ahora también desde esta pestaña), no sus datos.

Verificado con Playwright: las 7 pestañas activan su vista correcta en desktop; dentro del iframe, la navegación interna de Vestimenta (`nav('basicos')`, etc.) funciona y las fotos cargan (las que parecían "rotas" en una primera pasada eran `loading="lazy"` esperando a que esa parte de la página entrara en vista — al hacer scroll dentro del iframe cargaron las 8/8 sin problema, no era un bug real); cero overflow horizontal y cero errores de consola en las 7 pestañas × iPad (820×1180) × iPhone 15 Pro (393×852). El acceso a `iframe.contentDocument` desde el shell (usado para sincronizar el tema) devuelve `null` en el entorno de prueba de Playwright para **los cuatro** iframes por igual (Salud/Ejercicio/Comida/Vestimenta) — no es algo nuevo de Vestimenta, ya estaba así antes con las otras tres, y por eso ese bloque de código ya vivía envuelto en `try{...}catch(e){}` desde que se escribió.

## Módulo nativo: 🧴 Skincare — `localStorage['skincare_v1']`

**"Tu día de piel, de un vistazo".** Una sola pantalla, sin menú lateral y sin subtabs — al
revés que Cabello y Dentista. Adán, 2026-09-01: *"no es nada bonito, no me da informacion que
necesito, no es nada intuitivo y debe ser una interfaz futurista y visualmente atractiva y con
informacion valiosa"*. Medido antes de tocar nada: la vista anterior partía 6 pasos de rutina en
**9 secciones de una en una**, lo que dejaba el 85% de una pantalla de 1600px vacía y obligaba a
9 clics para leer algo que cabe entero.

### Los productos no viven aquí

Vienen de **`CIFRAS.RUTINA_PIEL`** (`Dashboard/datos-maestros.js`), la misma fuente que la rutina
diaria del Dashboard, y la hora de cada rutina sale de `CIFRAS.rutina()` — que cambia entre
semana, sábado y domingo. Antes había aquí una base propia, `SKIN_DB`, que filtraba por tipo de
piel y presupuesto, y **lo que recomendaba no era lo que Adán hace**: Isdin donde su rutina usa
La Roche-Posay, un hidratante de día que no se pone, y el retinoide repartido en 3 noches
alternado con un BHA que no usa. Se eliminó entera. El **control 11** del verificador impide que
las dos listas vuelvan a separarse.

El **perfil sigue existiendo**, pero ahora ajusta los consejos, los avisos y lo que puede esperar
y cuándo — no la marca del bote.

```js
{
  perfil: { tipo, preocupaciones:[], rasurado, presupuesto, notas },
  retinoideDesde: '2026-06-01' | null,          // de aqui salen la semana y el peldano
  hechos: { '2026-09-01': { am:['limpiador','niacinamida','spf'], pm:[...] } },
  abierto: { spf:'2026-08-01', ... }            // cuando abrio cada bote
}
```

### Qué hay en la pantalla

1. **Cabecera** con la fecha y 3 cifras: **racha de SPF** (días seguidos marcando el protector),
   **semana del retinoide** y **costo al mes**. La del retinoide abre el perfil si aún no hay
   fecha.
2. **La línea del día** (`#pl-track`): los 6 pasos como nodos con su hora, y una barra de
   **AHORA**. Los nodos se reparten a intervalos iguales, no por reloj — los 3 pasos de la
   mañana caen en 3 minutos y por reloj se amontonarían en un pixel; la barra de AHORA sí va por
   reloj, interpolada dentro del tramo que le toca. Se oculta bajo 920px: con 6 nodos en 390px
   estorba más que informa.
3. **Las dos rutinas, completas y lado a lado**, con su insignia de estado (`COMPLETA`, `2 DE 3`,
   `A LAS 22:30`). Cada paso se marca con un clic y eso alimenta la racha y la semana. Entre la
   doble limpieza y el adapaleno va el separador de **espera de 20 minutos**, que es el dato que
   la guía vieja escondía dentro de un párrafo.
4. **Tu botiquín**: cada producto con lo que dura, lo que cuesta al mes y **cuántos días le
   quedan** — en rojo bajo 14. Un clic en los días marca que abrió uno hoy; otro clic lo quita.
5. **La escalera del retinoide**: 2 noches → 3 → alternas → diario, con el peldaño actual
   marcado. Sin fecha de inicio no se inventa ninguno: lo dice y ofrece ponerla.
6. **Dónde vas**: los hitos con "ESTÁS AQUÍ" en el que toca por semana. Los hitos dependen de sus
   preocupaciones — sin manchas no tiene sentido prometerle que se le van en la semana 12.
7. **Tu semana**, **qué puede ir con qué** (matriz, no lista de viñetas) y **las reglas que sí
   mueven la aguja**, numeradas.

### El tema es oscuro-primero

Al revés que Cabello y Dentista: los tokens `--pl-*` base son los del modo oscuro y el claro los
redefine bajo `[data-theme="light"]`. Antes era pastel-claro con un parche oscuro encima y el
parche iba siempre un paso por detrás. Prefijo `pl-` (piel); las `.sk-*` se fueron con la vista
antigua.

Contraste medido en los dos temas componiendo **toda** la pila de capas translúcidas (no solo la
primera, que daba un fondo más oscuro que el real y falsos negativos): el peor caso queda en
**4.93:1 en oscuro y 5.45:1 en claro**, sobre texto de 7.5-10px.

**El seguimiento de "ya hice mi skincare hoy" ahora vive aquí también**, porque de él salen la
racha y la escalera. `Coach/Coach.html → #rutina` sigue teniendo sus tareas de skincare AM/PM
como parte del horario del día; son dos vistas del mismo hábito, con estado propio cada una.

## Módulo nativo: 💇 Cuidado del Cabello — `localStorage['cabello_v1']`

**"Tu cabello, semana a semana".** Mismo lenguaje que Skincare y sin menú lateral, pero **el eje
cambia**: la piel se organiza por día y el pelo por semana. *¿Qué champú toca hoy?* era la
pregunta que la vista anterior escondía dentro de un párrafo de la ducha, así que la semana va
primero y de ella cuelga todo lo demás. Adán, 2026-09-01: *"quiero un diseño futurista,
visualmente entendible y facil de comprender"*.

### Los productos y la semana no viven aquí

Vienen de **`CIFRAS.RUTINA_PELO`** (`Dashboard/datos-maestros.js`), y las horas de cada momento
de `CIFRAS.rutina()`. Antes había un `HAIR_DB` propio que filtraba por grosor y presupuesto:

- **Seguía ofreciendo alternativas** (Pantene, Kérastase, Elvive Aceite Extraordinario) pese a la
  petición del 2026-08-18 — *"no me des alternativas, por que si no al final no comprare nada"*.
  No salían porque Elvive ganaba el orden, pero bastaba tocar el perfil para que la lista de la
  compra nombrara una marca y la rutina otra.
- **Su lista de compras alcanzaba a 4 de los 9 productos.** Faltaban los tres champús, la crema
  sin enjuague y la funda: los champús se pintaban por una rama (`caChampusHtml`) que nunca los
  registraba en el array `usados` del que salía la lista.

Ahora la lista de la compra es un getter sobre `RUTINA_PELO` y el **control 12** del verificador
comprueba nombre **y día** contra `RUTINA_TASKS`.

```js
{
  perfil: { tipo, grosor, cuero, preocupaciones:[], caidaPatron, presupuesto, notas },
  minoxidilDesde: '2026-05-01' | null,          // de aqui salen el mes y la fase
  hechos: { '2026-09-01': { pasos:['agua','champu'], minox:[0,1] } },
  abierto: { minoxidil:'2026-08-13', ... }
}
```

### Qué hay en la pantalla

1. **Cabecera** con 3 cifras: **racha de minoxidil** (días seguidos con **las dos** dosis — una
   sola no cuenta, que es justo el error que hace concluir "no me funcionó"), **mes de
   minoxidil** y **costo al mes**.
2. **Tu semana de lavado** (`#pe-semana`), lo primero de la pantalla: 7 tarjetas con el champú de
   cada día, hoy marcado, y debajo de cada una los puntos de minoxidil de ese día — los de hoy
   se marcan con un clic. El miércoles sale como "solo agua **+ CeraVe al nadar**", que es lo que
   de verdad pasa. Bajo 920px las 7 columnas pasan a 7 tiras de una línea.
3. **Hoy, en orden**: los 4 momentos (ducha → pelo húmedo → cuero seco → antes de dormir) con
   sus horas reales y los pasos del día concreto — el sábado dice mascarilla y ningún otro día
   la menciona. Cada paso se marca con un clic.
4. **El minoxidil**, la tarjeta que manda: las 2 dosis con su hora, la **ventana de 4 horas** (a
   qué hora puede volver a mojarse la cabeza; antes lo decía un párrafo enterrado) y la escalera
   de fases con el mes actual marcado.
5. **Tu botiquín** con lo que dura cada bote y **cuántos días quedan** — en rojo bajo 14. Un
   clic en los días marca que abrió uno hoy; otro lo quita.
6. **Lo que arruina el resultado**, **qué esperar y cuándo** con "ESTÁS AQUÍ", y **antes que
   nada** con lo que sale de su perfil — incluido el aviso de ir al dermólogo si la caída es
   notoria y reciente.

### El tema es oscuro-primero

Igual que Skincare: tokens `--pe-*` base en oscuro y el claro redefinido bajo
`[data-theme="light"]`. Prefijo `pe-` (pelo); las `.ca-*` se fueron con la vista antigua y solo
sobrevive el formulario de perfil, que reusa `.card` del shell. Paleta propia: **ámbar** de
identidad, **azul agua** para la ducha y el CeraVe, **violeta** para la noche.

Contraste medido en los dos temas componiendo toda la pila de capas translúcidas: el peor caso
queda en **4.95:1 en oscuro y 4.90:1 en claro**, sobre texto de 8.5-10px.

## Módulo nativo: 🦷 Dentista — `localStorage['dentista_v1']` (nuevo 2026-07-31)

Pedido explícito: "en cuidado personal agrega la sección de dentista". Mismo patrón de **perfil + guía en una sola vista** que Skincare/Cabello, con tema pastel propio aislado bajo `#view-dentista` (menta/azul/coral — **sin morado**, mismo criterio de paleta que las otras dos) y soporte de modo oscuro (`:root[data-theme="dark"] #view-dentista{...}`, ver `../README.md`). A diferencia de Skincare/Cabello, no tiene una base de datos de productos con algoritmo de ranking (`skPick`/`haPick`) — el cuidado dental depende mucho menos de qué marca específica y mucho más de la rutina y el calendario, así que la guía es más simple y sí incluye algo que Skincare/Cabello no tienen: **una caja de próxima cita calculada**.

```js
{
  perfil: {
    aparato: 'no'|'brackets'|'alineadores'|'retenedor'|'placa_nocturna',
    frecuencia: 6,                 // meses entre chequeos, elegible: 4|6|12
    ultimoChequeo: 'YYYY-MM-DD',   // vacío = sin datos, no se inventa una fecha
    preocupaciones: ['sensibilidad'|'sangrado'|'bruxismo'|'mal_aliento', ...],
    notas: ''
  }
}
```

**Valores por defecto** (`deDefault()`): sin aparato, frecuencia 6 meses, sin última fecha registrada, sin preocupaciones — a diferencia de Skincare/Cabello, aquí no se precargó un perfil "real" de Adán porque no se tenía ese dato; el perfil arranca vacío hasta que él lo llene.

**Próxima cita** (`deProximaCita()`): si `ultimoChequeo` existe, calcula `próxima = último + frecuencia meses` y los días restantes (negativo = atrasada); si no hay fecha registrada, retorna `{tieneDatos:false}` y la guía lo deja explícito en vez de inventar una fecha. El botón **"✅ Fui al dentista hoy"** (`deRegistrarCita()`) escribe `ultimoChequeo = today()` y recalcula todo — es la única acción de un clic en las tres apps nativas (Skincare/Cabello no tienen equivalente porque no trackean citas, solo rutina).

**Contenido de la vista** (`#view-dentista`, `deRenderGuiaContent()`), en orden:
1. **Hero** (`.de-hero`) con chips-resumen (`deResumenChips()`) — aparato, cada preocupación marcada, y el estado de la próxima cita (verde/menta si en regla, coral si atrasada).
2. **Formulario de perfil** (`#de-form-card`, oculto hasta pulsar "Editar") — aparato, frecuencia deseada, fecha de última visita, preocupaciones (checkboxes), notas.
3. **`.de-cita-box`** — la cifra grande de días restantes o atrasados, con el cálculo explicado en texto pequeño, y el botón de registrar cita. Cambia a estilo de alerta (`.atrasada`, fondo coral) si ya pasó la fecha.
4. **🪥 Rutina diaria** — 3 `.de-step` fijos: cepillado (técnica + frecuencia de cambio de cepillo), hilo dental (técnica en C, nota condicional de enhebrador si hay brackets), enjuague (tipo condicional según sensibilidad/sangrado).
5. **⚡ Cuidado especial para tu caso** (`especiales`, solo aparece si aplica algo) — tarjetas condicionales por aparato (brackets: cepillo interdental + cera; alineadores: quitarlos para comer) y por preocupación (sensibilidad, sangrado — con nota de derivar a profesional si persiste, bruxismo, mal aliento).
6. **⚠️ Señales de alerta** (`.de-warn`, siempre visible) — lista fija de cuándo ir antes de la cita programada (dolor persistente, sangrado abundante, diente flojo, hinchazón facial, sensibilidad repentina, bracket roto).
7. **🛒 Lista de compras** — se arma dinámicamente según perfil (pasta/enjuague según sensibilidad o sangrado, cera si hay brackets, limpiador si hay alineadores, guarda si hay bruxismo).
8. **💡 Consejos generales** y disclaimer final de que no sustituye revisión profesional.

## Utilidades compartidas (top-level del `<script>`)

`uid()`, `today()` (UTC, `toISOString().slice(0,10)` — misma convención que el resto del proyecto), `fmtD(d)`, `addDays(d,n)`, `daysAgo(n)`, `toast(msg)`, `openM(id)`/`closeM(id)` (modales genéricos por id), `askDel(msg,cb)`/`closeConf()`/`doConf()` (diálogo de confirmación genérico compartido por Skincare y Cabello).

## Rediseño de interfaz del shell (2026-07-31)

Mismo tratamiento visual que `ejercicio.html`/`salud.html`/`comida.html` (ver [`readme_ejercicio.md`](readme_ejercicio.md) → "Rediseño de interfaz"), aplicado **solo a las partes oscuras y compartidas del shell** — `.topnav`, `.brand`, `.tab-btn`, `.card`/`.btn`/`.modal`/`.conf`/`.toast` genéricos: se quitaron manchas radiales de fondo, `backdrop-filter: blur`, el texto del logo con gradiente (`.brand`) y el glow de neón de `.btn-g`/`.modal`. **No se tocó nada dentro de `#view-skincare` ni `#view-cabello`** (sus temas pastel `--sk-*`/`--ca-*`, con degradados en `.sk-hero`/`.ca-hero` y línea de sección) — esos dos ya tuvieron su propio rediseño dedicado el 2026-07-29 y a Adán le gustó el resultado, así que se dejaron exactamente igual. Verificado con jsdom cambiando entre los 5 tabs sin errores de consola.

## Modo oscuro/claro (2026-07-31) — el más elaborado de las 7 apps

Botón `.theme-toggle-btn` en el `.topnav`. Tres capas de tema en un solo archivo:

1. **El shell** (`.topnav`/`.tab-btn`/`.card`/etc., ya oscuro por defecto) recibió el mismo tratamiento `--ov` + `:root[data-theme="light"]` que Dashboard/Ejercicio/Salud/Comida.
2. **Skincare y Cabello son pastel-*claro únicamente* por diseño** (ver arriba) — para darles modo oscuro sin rehacer sus ~135 reglas a mano una por una, se redefinen sus variables `--sk-*`/`--ca-*` completas dentro de `:root[data-theme="dark"] #view-skincare{...}` / `:root[data-theme="dark"] #view-cabello{...}` (cascadea sola a casi todas las reglas que ya usaban esas variables) y se reescriben aparte los ~12 colores por app que estaban hardcoded sin variable (fondo de pills, borde de `.sk-hero`/`.ca-hero`, inputs, `.sk-warn`/`.ca-note`). Se mantiene la **misma identidad de tono** en oscuro (rosa/teal/menta/durazno/azul/coral en Skincare; ámbar/azul/verde/terracota/coral en Cabello), solo invertida de claro a oscuro — no es un tema oscuro genérico, sigue pareciendo "la misma app".
3. **`toggleTheme()` empuja el tema a los 3 iframes ya cargados** (`frame-salud`/`frame-ejercicio`/`frame-comida`) escribiendo `data-theme` directo en su `contentDocument.documentElement` — si no se hiciera esto, cambiar el tema en el shell dejaría cualquier iframe ya abierto desincronizado hasta recargarlo. Envuelto en `try/catch` por si el acceso cross-frame fallara.

**Bug encontrado y corregido**: el comentario CSS que introducía el bloque de Skincare/Cabello oscuro originalmente decía `--sk-*/--ca-*` — la secuencia `*/` cierra un comentario CSS aunque esté en medio de una palabra, así que el comentario se cerraba a la mitad y el resto del texto (hasta el `*/` real, mucho más abajo) se colaba como parte del *selector* de la siguiente regla, invalidándola silenciosamente sin ningún error visible. El bloque entero de `--sk-*` quedaba sin aplicarse (Skincare se veía igual de claro en "modo oscuro"), mientras que Cabello sí funcionaba porque su bloque estaba después del `*/` real. Se detectó solo comparando `getComputedStyle` de ambos elementos con jsdom — visualmente hubiera sido fácil no notarlo. Lección: nunca escribir `*/` dentro de un comentario CSS de este proyecto (ver también `../README.md`).

## Responsivo — iPad / iPhone 15 Pro (2026-08-03)

Ajuste de CSS al **chrome propio del shell** (topnav, tabs, altura del contenedor de iframes) — no se tocó nada dentro de `#view-salud`/`#view-comida` (contenido de otro trabajo en paralelo sobre `salud.html`/`comida.html` ese mismo día) ni la lógica de `ejercicio.html`, que se ajustó por separado (ver `readme_ejercicio.md` → "Responsivo"). Verificado con Playwright headless en iPad (820×1180) e iPhone 15 Pro (393×852, `isMobile`/`hasTouch`), los 6 tabs (`skincare`, `cabello`, `salud`, `ejercicio`, `comida`, `dentista`): `scrollWidth - clientWidth === 0` en los 12 casos, cero errores de consola.

El archivo ya traía breakpoints (`@media(max-width:900px)` para `.g4`/`.g3` a 2 columnas, `@media(max-width:640px)` para `.g4`/`.g3`/`.g2`/`.fr` a 1 columna y `.sk-step`/`.ca-step`/`.de-step` + `*-hero-top` a columna) que no necesitaron ningún cambio — cero overflow horizontal encontrado en ningún tab/viewport ya desde el baseline, antes de tocar nada. El único problema real no era de overflow sino de **altura aprovechable en iPhone**, justo el punto que se pidió revisar explícitamente para el contenedor de iframes:

**Trampa — topnav que envuelve en 5-6 filas propias en iPhone**: la regla original del breakpoint `max-width:640px` traía `.brand{width:100%}`, que forzaba el logo a su propia fila; como `.tabs` no tenía ningún tratamiento especial para pantallas angostas, sus 7 botones (6 tabs + enlace a Dashboard) se envolvían internamente en ~4 filas de 2 botones cada una. Resultado medido en iPhone 15 Pro antes del fix: `.topnav` ocupaba **276px de alto** (32% del viewport de 852px), dejando solo 576px para el `<iframe>` de Salud/Ejercicio/Comida. Fix, en el mismo breakpoint `max-width:640px`: se quitó `.brand{width:100%}` y se convirtió `.tabs` en una tira horizontal de una sola fila con scroll propio (`flex-wrap:nowrap;overflow-x:auto` + `.tab-btn{flex-shrink:0;white-space:nowrap}`, scrollbar oculto vía `scrollbar-width:none` / `::-webkit-scrollbar{display:none}`) — el mismo patrón de tab-bar nativo que un selector de pestañas de iOS. Como `.tabs` pasa a ser un ítem flex de `.topnav{flex-wrap:nowrap}` que necesita poder encogerse por debajo de la suma de sus botones, se le agregó `min-width:0` (misma trampa de tamaño mínimo automático en Flexbox descrita en `readme_ejercicio.md` → "Responsivo", aplicada aquí al contenedor de tabs en vez de al layout principal). Resultado: `.topnav` bajó a **58px de alto**, el `<iframe>` pasó a **794px** (93% del viewport, contra 68% antes). Verificado además con clics reales de Playwright (`page.click`, no solo `evaluate()`) sobre los 6 `.tab-btn` — el auto-scroll-into-view del navegador encuentra y activa cada pestaña sin problema aunque esté fuera de la porción visible de la tira en ese momento. iPad (820px, por encima del breakpoint) no se vio afectado — sigue mostrando las 7 pestañas en una sola fila sin scroll, igual que antes.

Las tres vistas nativas (Skincare/Cabello/Dentista) ya se comportaban bien en ambos viewports sin necesidad de ningún cambio: sus grids `.g2`/`.fr` ya colapsan a 1 columna en `≤640px`, y sus filas de "day pills" (`.sk-week`/`.ca-week`, 7 elementos con `flex:1;min-width:74px`) ya tenían `flex-wrap:wrap`, así que se acomodan solas (varias por fila en vez de desbordar) sin necesitar breakpoint propio. No se encontró ningún `grid-template-columns` puesto inline por HTML o generado por JS en este archivo que hiciera falta mover a una clase con media query dedicada.

Screenshots de referencia (iPad y iPhone — topnav antes/después, Skincare, Ejercicio, Dentista) quedaron en `scratchpad/shots_responsive/cuidadopersonal_*.png` de la sesión de verificación, solo para revisión visual puntual — no se versionan con el proyecto.

## Referencias cruzadas

- El **Dashboard** (`../Dashboard/dashboard.html`) ya no tiene una pantalla dedicada de "Todas mis apps" (se retiró el 2026-07-30) — el acceso directo ahora vive en su barra superior fija (`renderQuickApps()`), que **no** muestra estadística para Skincare/Ejercicio/Comida/Dentista (solo íconos), y sí para Salud (kcal de hoy). **Desde el 2026-07-31 el Dashboard ya no muestra píldora de Cabello** (pedido explícito de Adán) y sí agregó las de Comida y Dentista, que antes faltaban. Si cambias la forma de `perfil` en Skincare/Cabello/Dentista, revisa `renderQuickApps()` en `Dashboard/dashboard.html` de todos modos, por si en el futuro se le agrega estadística.
- Las píldoras de la barra superior del Dashboard enlazan aquí con `?tab=skincare`, `?tab=salud`, `?tab=ejercicio`, `?tab=comida`, `?tab=dentista` (`?tab=cabello` sigue funcionando si se visita a mano — el deep-link no se quitó del shell, solo su píldora en el Dashboard). **`?tab=vestimenta` también funciona** desde el 2026-08-03, pero el Dashboard todavía no tiene una píldora propia para ella — no se agregó porque no se pidió explícitamente, solo la integración a este shell.
- **`Vestimenta/vestimenta.html`** ahora se alcanza desde dos lugares: directo (`file://.../Vestimenta/vestimenta.html`, como siempre) y desde aquí (pestaña 👔). Sigue **fuera del ecosistema de datos** (ver `../README.md` → "Fuera de este ecosistema") — no comparte ninguna clave de `localStorage` con Skincare/Cabello/Dentista/Salud/Ejercicio/Comida, solo `coach-theme` para el tema visual, igual que antes de esta integración.
- Mapa completo del proyecto: [`../README.md`](../README.md).

## Cómo usarlo

Se abre `cuidadopersonal.html` directamente en cualquier navegador, sin instalación ni servidor. No hay sincronización entre dispositivos. Skincare y Cabello no tienen botón de exportar JSON todavía (a diferencia de Salud y Ejercicio, que sí lo tienen dentro de su propio iframe).

## Skincare, Cabello y Dentista pasan a la distribución de Coach — cada una por dentro (2026-08-12)

Pedido: *"la interfaz de cabello, comida, skincare y dentista, la quiero con la misma distribucion que coach, es decir los botones a la izquierda que solo aparezcan cosas cuando de click y que se vea muy bien"*.

**Primero se hizo mal.** Se interpretó como "poner un menú lateral en el contenedor Cuidado Personal que agrupe las 7 secciones", y Adán lo corrigió: *"eso no fue lo que te pedi, te dije que en especifico esas que te mencione deberian tener la distribucion de coach, en especifico, no que las englobaras en cuidado personal"*. Tenía razón — pedía que **cada una de esas interfaces** tuviera el layout por dentro, no una capa más por encima. Ese cambio se revirtió con `git revert` antes de hacer lo correcto, así que la barra de pestañas del contenedor quedó tal como estaba.

**Qué eran antes**: cada una era **una sola página larguísima** — el perfil arriba y debajo sus 5-9 secciones apiladas en scroll infinito. Para llegar a "Tu lista de compras" o "Qué no mezclar" había que bajar mucho. (Comida ya tenía menú lateral en su propio archivo, por eso no se tocó.)

**Ahora**: menú a la izquierda con sus secciones y una sola a la vez a la derecha, igual que Coach.

| Guía | Secciones en el menú |
|---|---|
| Skincare | 8 — rutina de mañana, de noche, rotación semanal, qué esperar, mascarilla, qué no mezclar, lista de compras, consejos |
| Cabello | 9 — lavado, anticaída, después de lavar, calendario, qué esperar, mascarilla, qué evitar, lista de compras, consejos |
| Dentista | 5 — rutina diaria, cuidado especial, señales de alerta, lista de compras, consejos |

### La decisión clave: el menú no está escrito a mano

`guiaEnSecciones()` **lee los encabezados de la guía ya generada** y arma el menú con ellos, agrupando cada encabezado con todo el contenido que le sigue hasta el siguiente.

Se hizo así, y no reescribiendo las 3 plantillas, porque **las guías cambian de secciones según el perfil de Adán**: si no tiene acné, la sección de acné no se genera; si no eligió mascarilla, esa sección no existe. Una lista de secciones escrita a mano se desincronizaría en cuanto él editara su perfil. Leyendo lo que de verdad se pintó, el menú siempre coincide. Y como se llama al final de cada render, también corre al guardar un perfil nuevo.

### El conflicto que había que resolver

Cada guía conserva su botón "✏️ Editar mi perfil" en el hero, que abre y cierra el formulario por su cuenta. Con el menú nuevo eso chocaba: el ítem "Mi perfil" oculta todas las secciones, así que **cerrar el formulario desde el botón dejaba el área de contenido en blanco** — nadie volvía a mostrar ninguna sección.

Se resolvió con `guiaMostrarPrimera()` / `guiaSoloPerfil()`, enganchadas a las 3 funciones `*ToggleForm`: se toque el botón o el menú, ambos quedan de acuerdo.

### Responsive

Abajo de 900px el menú pasa arriba como tira horizontal con scroll propio y los ítems se vuelven píldoras. En una columna de 200px los nombres de sección no caben, y apilarlos verticalmente empujaría todo el contenido fuera de la pantalla.

- Verificado con Node: sintaxis OK en los 2 bloques `<script>` reales; CSS 356/356 llaves; `<div>` 184/184, `<nav>` 4/4, `<main>` 7/7; la barra de pestañas del contenedor sigue intacta; las 3 guías tienen su `nav`, su llamada a `guiaEnSecciones` y su sincronización con el botón del hero; las 3 funciones nuevas existen; y simulando el agrupado, los menús salen con 8, 9 y 5 secciones con sus íconos correctos.

## Tratamientos de caída con prescripción (2026-08-15)

Pedido: *"agrega tratamientos para cabello, usar minoxidil con dutasteride... minoxidil oral tambien"*.

`HAIR_DB.tratamientoCaida` pasa de 1 a 3 opciones. Las 2 nuevas van después del minoxidil tópico porque no son alternativas equivalentes, son otro escalón de tratamiento:

- **Minoxidil tópico + Dutasteride** (fórmula magistral) — el minoxidil hace crecer, el dutasteride ataca la causa bloqueando la DHT. Inhibe los 2 tipos de 5-alfa-reductasa, no solo uno como el finasteride. Aplicado en piel la absorción sistémica es menor que en pastilla, pero no es cero.
- **Minoxidil oral 2.5-5 mg** — se receta fuera de indicación (su registro original es antihipertensivo). Ventaja real: tomar una pastilla es más sostenible que aplicarse la solución 2 veces al día.

**La condición médica va dentro del campo `uso` de cada uno, no en una nota al pie**: dutasteride requiere prescripción en México, no tiene aprobación FDA para alopecia y altera el PSA; el minoxidil oral es sistémico (presión, retención de líquidos, taquicardia, hipertricosis) y exige control de presión antes y durante. La dosis y la condición viajan juntas o el dato es peligroso.

Replicado en `Dashboard/dashboard.html` → `LISTA_COMPRAS.cabello`, ahí marcados con 🩺 en el propio nombre del producto porque esa lista se lee en el pasillo del súper, sin contexto alrededor.

## Pestaña nueva: Ojos y Vista (2026-08-15)

*"en cuidado personal añade el cuidado de los ojos/vista, con todos los productos en compras y esa pestaña que añadas debe estar muy completa"*.

Sexta pestaña nativa (`#view-ojos`), con **9 secciones, 23 pasos numerados, 7 señales de alarma y 12 productos**. Reusa el esqueleto y las clases `.de-*` del tab de Dentista en vez de crear un sistema visual nuevo, y el menú lateral sale del mismo `guiaEnSecciones()` que las otras 3 — pero con `formCardId` nulo, porque esta guía **no tiene formulario de perfil**: el contenido no cambia según respuestas, así que va estática.

### Lo que la hace distinta de una lista genérica de consejos

Todo está anclado a **su exposición real**, y esa es la primera sección:

- **~28h/semana al volante** → UV de día (la ventanilla lateral casi no filtra, y en CDMX a 2,240 m hay ~10% más radiación por cada 1,000 m) y deslumbramiento de noche por faros LED.
- **10-12h de pantalla al día** entre ALTEN y los 2 bloques de la app → frente a una pantalla se parpadea hasta 66% menos, de ~15 veces por minuto a 5. Ese dato explica casi todo el ojo seco.
- **5h40-6h40 de sueño** → ojos rojos y ojeras; es la única de las tres que se arregla sin comprar nada.

Secciones: exposición real · fatiga visual digital · ojo seco · al volante · exámenes · nutrición · ojeras · señales de alarma · qué comprar.

Detalles que conectan con lo que ya existe: el **Omega 3 de las 07:25** ya cubre parte del ojo seco (se dice explícitamente que no lo duplique), la **compresa térmica** se hace durante su meditación de las 23:00 sin costar tiempo extra, y el **fondo de ojo dilatado** se agenda un día que no maneje Didi después, porque deja la vista borrosa 4-6 horas.

Correcciones de creencias comunes que la guía desmonta: las gotas "para quitar el rojo" son vasoconstrictores y con uso diario dejan el ojo **más** rojo; un lente oscuro **sin** UV400 es peor que no traer nada porque la pupila se dilata y entra más radiación; y los lentes amarillos "de noche" no mejoran la visión nocturna, reducen la luz que llega.

### Un incidente que vale documentar

La primera versión del script de inserción abrió el archivo destino con `io.open(F,'w')` **antes** de tener el contenido listo. Ese modo trunca al instante, y el script falló después por un problema de encoding — resultado: `cuidadopersonal.html` quedó en **0 bytes**. Se recuperó con `git checkout` sin pérdida (los tratamientos de cabello ya estaban commiteados) y se rehízo escribiendo a un `.tmp` que solo reemplaza el original tras validar tamaño y sintaxis. **Los scripts que editan archivos del proyecto escriben a temporal, nunca al destino directo.**

## Cabello seco y dañado: el problema era la acumulación de tratamientos (2026-08-18)

*"mi cabello luce muy seco y dañado actualmente y pienso cortarmelo... los productos que uso son minoxidil folcress y tambien darrow doctar y pilexil shampoo anticaida... debes decirme si debo agregar mas cosas o cambiar esto que uso"*.

### El hallazgo

Estaba usando **dos champús de tratamiento a la vez**:

- **Darrow Doctar** es coal tar (alquitrán), un detergente potente indicado para dermatitis seborreica. **Resecar es su efecto adverso conocido**, no un accidente.
- **Pilexil anticaída** es otro champú de tratamiento, no de mantenimiento.
- **Minoxidil 2×/día**: en presentación de SOLUCIÓN, el vehículo lleva propilenglicol, que reseca el tallo.

Tres fuentes de resequedad simultáneas sobre un perfil que el propio proyecto ya registraba como *fino*, *cuero graso* y con *resequedad* entre sus preocupaciones. No era mala suerte, era la combinación.

**Y `HAIR_DB` solo tenía 1 champú, el medicado.** Faltaba por completo un champú suave para los días sin tratamiento — el hueco que hacía inevitable usar un medicado siempre.

### Lo que cambia

**Champús: de 1 a 3, con rol y frecuencia.** El paso 1 de la rutina de lavado mostraba **un solo producto** (`haPick` con `n=1`), lo que escondía justo la recomendación central. Ahora `caChampusHtml()` muestra los tres:

| Cuándo | Cuál |
|---|---|
| Los días normales | **Champú suave sin sulfatos** — la base que faltaba |
| 2-3 veces por semana | **Pilexil anticaída** — al cuero cabelludo, no al largo |
| Solo si hay caspa activa | **Darrow Doctar** — máx. 2×/semana, **nunca el mismo día que el Pilexil** |

**Minoxidil en espuma en vez de solución.** Es el cambio más directo contra la resequedad sin perder el tratamiento: la espuma no lleva propilenglicol. Va anotado en la guía y en la lista de compras.

**3 productos nuevos en `HAIR_DB.reparacion`**: funda de almohada de satín (lo más barato con más efecto — el algodón tiene fricción y absorbe humedad durante 6-7 horas cada noche), protector térmico (solo si usa secadora), y sérum leave-in, distinguiendo que **el leave-in va sobre pelo húmedo y el aceite sobre pelo seco** — son dos productos en dos momentos, no intercambiables.

### La rutina de lavado, reescrita en las 2 copias

`wd02lav` (Lun/Jue) y `sa0506` (Sáb) dejan de decir "champú: Darrow Doctar" siempre:

- **Lun y Jue** → Pilexil (tratamiento de caída) + acondicionador + leave-in en húmedo, con la regla explícita de cambiar a Darrow **solo** si ese día hay descamación activa.
- **Sábado** → champú suave + **mascarilla**, marcada como *"el paso que más repara de toda tu semana; si te saltas uno, que no sea este"*. Cierra revisando puntas abiertas.

Replicado en `Coach.html` copiando las subtareas desde el Dashboard en vez de reescribirlas, para que no puedan divergir por un typo. Comprobado que las 71 tareas quedan equivalentes salvo los `href` de `k2`/`k5`, que deben diferir por diseño.

### Sobre cortarse las puntas

Su intuición es correcta, pero conviene precisar el motivo: **cortar no acelera el crecimiento** — eso ocurre en el folículo, no en la punta. Lo que sí hace es eliminar las puntas abiertas, que se siguen partiendo hacia arriba si se dejan. Va en la rutina del sábado como criterio verificable: si se ven pelos abiertos en forma de Y, toca corte; cada 8-12 semanas, 1-2 cm.

### Lista de compras

`LISTA_COMPRAS.cabello` pasa de 7 a **12 productos, y el orden ES la recomendación**: primero el champú suave que le faltaba, luego los 2 medicados con su frecuencia escrita en el propio nombre, después lo que repara, y al final los 2 con receta. Las 12 generan búsquedas limpias (24 links, Amazon + Mercado Libre) tras el arreglo de `lcAmazonQuery()`.

## La rutina completa sigue el plan, y sin alternativas (2026-08-18)

*"debes modificar mi rutina de todos los dias para que sigas el plan que me estas creando, pero solo debes darme productos en especificos, no me des alternativas, por que si no al final no comprare nada"*.

Dos reglas aplicadas en los 3 archivos a la vez:

### 1. Un producto por necesidad, el mismo en todos lados

Antes había `X o Y`, `Solución/Espuma`, `Kirkland Signature o genérico`, y varios `(opcional)`. **Lo opcional no se hace**, y una alternativa en la lista del súper es una decisión más que tomar de pie en el pasillo.

| Necesidad | El producto, sin más opciones |
|---|---|
| Champú base | **CeraVe Champú Hidratante sin sulfatos** |
| Champú anticaída | **Pilexil Anticaída 300 ml** |
| Champú caspa (rescate) | **Darrow Doctar alcatrão** |
| Acondicionador | **TRESemmé Keratin Smooth** |
| Mascarilla | **L'Oréal Elvive Total Repair 5** |
| Sin enjuague | **L'Oréal Elvive Total Repair 5 crema** |
| Aceite de puntas | **Moroccanoil Treatment Light** |
| Minoxidil | **5% en ESPUMA, Kirkland** |
| Almohada | **Funda de satín** |

Los nombres son **idénticos** en `RUTINA_TASKS`, `HAIR_DB` y `LISTA_COMPRAS`. Si la rutina dijera una marca y la lista otra, volvería justo la duda que se quería quitar. `LISTA_COMPRAS.cabello` queda en 11 productos con 22 links y **0 queries defectuosas**.

También se quitó el protector térmico de la lista: dependía de un "si usas secadora" que nadie ha confirmado, y una compra condicional es otra alternativa disfrazada. Se queda en la guía como nota.

### 2. La semana entera, coherente

| Día | Qué toca |
|---|---|
| **Lun · Jue** | Pilexil (tratamiento de caída) |
| **Mar · Vie · Dom** | Sin champú — solo acondicionador de medios a puntas |
| **Mié** | Sin champú en la mañana, pero **lavado obligatorio después de nadar** |
| **Sáb** | CeraVe + mascarilla — el día de reparación |

Y **todos los días**, sin excepción: crema sin enjuague sobre el pelo húmedo. Antes ese paso decía "(opcional)" y aparecía solo algunos días.

### El hallazgo del miércoles

Al mapear la semana salió que **nada 45 min en alberca y la ducha posterior no mencionaba el cabello**. El cloro se queda en el pelo y lo sigue resecando durante horas — sobre un cabello ya dañado es de lo más agresivo que hay.

`wd09` (la ducha post-ejercicio) ahora incluye el lavado obligatorio de los miércoles, y el truco que más rinde: **mojar el pelo con agua limpia ANTES de meterse a la alberca**. El pelo mojado absorbe mucho menos cloro, igual que una esponja que ya viene llena.

### Minoxidil

Los 6 bloques donde aparecía (AM y PM de lunes a domingo) decían "Minoxidil 5%" a secas. Ahora dicen **espuma Kirkland**, con el motivo escrito en la propia tarea: la solución líquida lleva propilenglicol y es la causa de buena parte de la resequedad.

Replicado en las 2 copias de `RUTINA_TASKS`; verificado que las 71 tareas quedan equivalentes salvo los `href` de `k2`/`k5`, que deben diferir por diseño.

## "¿A qué te refieres con mascarilla?" — la guía decía cuándo, no qué (2026-08-18)

Adán preguntó qué es una mascarilla capilar. Al revisarlo, la descripción decía *"1 vez por semana, en puntas y medios, deja actuar 5-10 min, enjuaga bien"* — es decir, **cuándo** y **cómo**, pero en ninguna parte **qué es**. Daba por sabido el concepto.

Es el mismo fallo que ya se corrigió en Habilidades Base y que él mismo había señalado: *"esta es una guía para personas que no saben nada"*. Aquí volvió a colarse.

### Cómo se explica ahora

La analogía usa **su propia rutina de cara**, que ya domina — así no aprende un concepto nuevo, reconoce uno que ya tiene:

| En la cara | En el pelo |
|---|---|
| Hidratante, todos los días | **Acondicionador**, cada baño |
| Retinoide (Differin), el tratamiento | **Mascarilla**, 1 vez por semana |

Y se añade **cómo distinguirla en la tienda**, que era el dato práctico que faltaba: el acondicionador viene en **botella** con tapa de chorro, la mascarilla en **tarro o pote**, porque es espesa y se saca con los dedos. Sin eso, "mascarilla" en un pasillo de súper no significa nada.

También se aclara lo que nadie le había dicho: **no se usan las dos el mismo día**. La mascarilla ya hace el trabajo del acondicionador, y en cabello fino ponerle ambas lo apelmaza.

### El otro término sin explicar

Al auditar la rutina apareció que **"sin enjuague" se usaba 5 veces sin definirse ni una**. Ahora dice explícitamente: *"se pone y NO se enjuaga — de ahí el nombre. Se queda en el pelo todo el día, igual que tu hidratante de cara se queda en la piel"*, y se distingue de las otras dos cosas con las que se confunde: del acondicionador (ese sí se enjuaga) y del aceite (ese va sobre pelo **seco**, no húmedo).

### La explicación viaja con la tarea

No basta con arreglarlo en la guía: **7 pasos de `RUTINA_TASKS`** llevan ahora la explicación embebida, en las 2 copias. El sábado por la mañana, leyendo la tarea, ya se sabe qué es una mascarilla sin abrir otra pantalla — que es cuando de verdad hace falta saberlo.

`HAIR_DB.mascarilla` pasa además de 2 opciones a **1**: la segunda (Moroccanoil) era una alternativa, y las alternativas ya se habían eliminado del resto del sistema.

## La pestaña de Dashboard salió de la fila (2026-08-18)

*"en algunos html el boton de dashboard se repite y esto no debe ser, solo debe estar el de la esquina superior derecha"*.

La fila de `.tab-btn` terminaba con un `<a>` "🚀 Dashboard" separado por un borde izquierdo — el que se cuenta como séptimo botón en la nota de responsivo de arriba, donde se midió el alto de `.topnav` en iPhone. Se eliminó: `#btnVolverDash` (fijo arriba a la derecha desde esta misma mañana, en los 47 HTML del proyecto) hace exactamente lo mismo.

La fila queda con **8 pestañas, todas secciones reales** de esta app: Skincare, Cabello, Salud, Ejercicio, Comida, Dentista, Ojos y Vista, Vestimenta. El tratamiento de tira con scroll horizontal del breakpoint `max-width:640px` no se tocó — sigue aplicando igual, ahora con un botón menos que empujar. Detalle completo en `../Dashboard/readme_dashboard.md` → "Una sola vía de regreso".

## El enlace al Dashboard vive en el `header.topnav` (2026-08-18)

*"hay botones dashboard que ni si quiera van acorde a la interfaz del html, osea sobre ponen a otros botones y eso esta mal, debe ser parte de la interfaz de todos"*.

El bloque flotante `#btnVolverDash` (`position:fixed`, fondo oscuro propio, z-index 9999) que se había insertado esta mañana **se encimaba sobre el botón de tema en pantallas angostas** y no seguía el tema de este archivo. Se retiró junto con su `<style>`: ahora el enlace es un botón redondo con el 🚀 junto al de tema, fuera de la fila de pestañas, con la clase `.theme-toggle-btn` que ya usan sus vecinos, así que hereda tema y estilos sin CSS nuevo.

Detalle completo y medición en `../Dashboard/readme_dashboard.md` → "El botón de Dashboard deja de flotar".

## El acondicionador pasa a Elvive, de la misma línea que la mascarilla (2026-08-19)

*"este cambiamelo, por que no lo encuentro facil, dame opciones — Acondicionador TRESemmé Keratin Smooth"*.

El problema no era el producto, era encontrarlo. Se le dieron 4 opciones y eligió el **acondicionador L'Oréal Elvive Reparación Total 5**, que resuelve el problema de raíz por una razón que no tiene que ver con la fórmula:

> **es el acondicionador de la misma línea que la mascarilla y la crema sin enjuague que ya usa a diario.**

Pasa de buscar 3 productos de 2 marcas a buscar **una sola línea en un solo pasillo**. Si encuentra uno, encuentra los tres.

| | |
|---|---|
| Presentación | 680 ml |
| Mercado Libre | **$150** |
| Soriana | $166.50 |
| DelSol | $111.23 |
| También en | Walmart, Chedraui, H-E-B |

Precios verificados en ago-2026. El nombre quedó como aparece en el estante mexicano — **"Reparación Total 5"**, no "Total Repair 5" — precisamente porque el punto era que lo encontrara.

### Dónde estaba

11 menciones en 3 archivos, todas cambiadas: **6 en `dashboard.html`** (4 subtareas de rutina, el renglón de la lista de compras y su clave de precios), **4 en `Coach.html`** (su copia de `RUTINA_TASKS`) y **1 en `cuidadopersonal.html`** (`HAIR_DB`).

La clave de `LISTA_COMPRAS_PRECIOS_OTROS` se cambió junto con el nombre: si se hubiera renombrado solo el producto, el renglón se habría quedado **sin precio** y habría dejado de sumar en el total de la categoría — el mismo tipo de desincronización silenciosa que ya se documentó con los nombres de cabello.

### Verificación

Las 4 tareas de rutina afectadas (`wd02lav`, `wd02co`, `wd09`, `do045`) son **las mismas en Dashboard y en Coach**, que llevan copias separadas de `RUTINA_TASKS` — comprobado comparando las dos listas, no leyéndolas. Cero menciones de TRESemmé en los 3 archivos, el renglón de la lista muestra sus dos precios y sus dos enlaces de tienda, y la sintaxis JS de los 3 archivos valida. Sin errores de consola.

## La guía de cabello pasa de 9 secciones a una, ordenada por momento del día (2026-08-19)

*"en este de cuidado de cabello hiciste muchas secciones, eso no me gusta, de preferencia de una pero dividela cuando y como debo usar cada producto, osea yo no se si en la mañana debo bañarme con shampoo y despues acondicionador y despues minoxidil o en la noche solo shampo […] yo no se nada, no soy experto, tu debes actuar como experto ayudandome a saber como usarlo y cuando"*.

La guía tenía **9 secciones navegables**: Rutina de lavado · Tratamiento anticaída · Después de lavar · Calendario semanal · Qué esperar · Mascarilla · Qué evitar · Lista de compras · Consejos. Cada una decía algo cierto, y ninguna respondía su pregunta.

El diagnóstico es de estructura, no de contenido: **la información estaba organizada por categoría de producto, y hace falta por orden de uso.** Saber que existe un "tratamiento anticaída" no dice si va antes o después de bañarte.

### Ahora es un solo hilo, en el orden en que ocurre el día

| | Momento | Qué responde |
|---|---|---|
| 📌 | Hoy es *(día)* | si **hoy** toca champú y cuál — calculado con la fecha real |
| ☀️ 1 | En la ducha de la mañana | agua tibia → ¿champú hoy? → 2 min de masaje → acondicionador solo medios a puntas → esperar 1-2 min |
| 💧 2 | Al salir, con el pelo aún húmedo | toalla a toques, crema sin enjuague, peine de dientes anchos |
| 🍂 3 | Con el cuero **ya seco** — minoxidil AM | media tapa de espuma, cuero seco, masaje, manos lavadas |
| ✨ 4 | Con el pelo seco | 2 gotas de aceite en puntas, solo si está áspero |
| 🌙 5 | Antes de dormir | segunda dosis de minoxidil, y después ya no mojarse |
| 🧖 6 | Solo los sábados | mascarilla 5 min, **sustituye** al acondicionador |
| 📅 | Tu semana de un vistazo | los 7 días con el de hoy resaltado |

Son **17 pasos numerados** en total, y sigue habiendo un solo `.ca-section-h`, así que el menú lateral queda en 2 ítems (Mi perfil + la guía) en vez de 10. Los sub-encabezados usan una clase nueva, `.ca-momento`, precisamente para **no** convertirse en ítems de menú.

### Lo que un experto tenía que decirle y no estaba escrito

- **El minoxidil no va sobre pelo mojado ni recién salido de la ducha.** Va sobre cuero cabelludo seco, y una vez puesto **tienen que pasar ~4 h antes de volver a mojarse la cabeza**. Por eso va después de bañarse y nunca antes.
- **El champú solo en el cuero cabelludo, nunca en el largo**: al enjuagar, lo que escurre ya limpia el resto.
- **Los días sin champú no son días sucios**, son descanso para un cuero que ya está seco.
- **El sábado la mascarilla sustituye al acondicionador**, no se usan los dos.
- **Nunca el Pilexil y el Darrow el mismo día**: el de alquitrán sustituye al otro cuando hay caspa activa.
- **Son 2 dosis de minoxidil al día**, y saltarse días es lo que hace que la gente concluya que no funciona.

### Un conflicto real encontrado en su horario

Al cruzar la guía con `RUTINA_TASKS` apareció algo que no cuadraba: **sábado y domingo el minoxidil AM estaba a las 07:05 y 07:35, y la ducha a las 08:35**. Es decir, se aplicaba el producto y **se lo lavaba una hora después**, sin darle nada del tiempo que necesita para absorberse. Entre semana el orden ya era el correcto (ducha 07:03 → minoxidil 07:20).

Corregido: las dos tareas de fin de semana se movieron a las **09:00**, después de la ducha. El cambio se aplicó en las dos copias de `RUTINA_TASKS` (Dashboard y Coach).

### Verificación

Escritorio y celular: **1 sección** (antes 9), menú de 2 ítems, los 10 momentos en orden, 17 pasos numerados, la tabla semanal con el día de hoy resaltado, y el aviso de "hoy" correcto según la fecha real — probado en miércoles, que además avisa de lavar tras nadar. Sin `undefined`, sin desbordes y sin errores de consola.
## Cabello: la tira de la semana pasa a ser navegable (2026-09-01)

Adán: *"en cuidado de cabello, no me deja ver los demas dias, no me deja hacer
click y mostrar la info"*. No era una regresión: **`.pe-d` nunca tuvo `onclick`**.
La tira de "Tu semana de lavado" era un cuadro informativo, y `pePasosDelDia()` y
`peHoyHtml()` leían `new Date().getDay()` fijo, así que la rutina detallada sólo
existía para hoy. Si quería saber qué le toca el sábado, la celda le decía
"CeraVe" y ahí se acababa.

- **`peDiaVisto`** (null = hoy) con `peDow()`, `peEsHoy()` y `peVerDia(d)`. Las
  dos funciones de render leen `peDow()` en vez de la fecha del sistema.
- Cada celda lleva `onclick="peVerDia(dow)"`, `cursor:pointer` y un realce al
  pasar por encima. El día que estás viendo se marca en azul (`.visto`); hoy
  sigue en ámbar.
- La tarjeta cambia de "Hoy, en orden" a "El sábado, en orden", con el enlace
  **← volver a hoy** donde iba el contador de hechos.
- **Los pasos de otro día no se marcan.** Van con `.solo-lectura`, sin `onclick`
  y con el tic al 25 %, más una banda que lo explica: marcar el sábado el martes
  guardaría el hecho en la fecha de hoy, que es justo lo que no quieres.
- El minoxidil, el botiquín y los KPIs siguen siendo de hoy: son estado real, no
  una consulta.

Detalle que costó: las variables del azul se llaman `--pe-ag-bg` / `--pe-ag-br`,
no `--pe-agua-bg`. Escritas mal, las reglas no fallan — simplemente no pintan
nada, y el día seleccionado se veía igual que los demás.

Comprobado haciendo clic en los 7 días: cada uno muestra su champú y sus pasos,
el domingo y el miércoles salen "sin champú", el sábado trae CeraVe + mascarilla,
volver a hoy recupera el marcado, y no hay errores de consola. A 390 px la tira se
apila y sigue respondiendo al clic. Contraste: lo peor queda en 4,70:1.

## Cabello: entran el minoxidil NR-11 y el Avodart (2026-09-01)

Adán: *"me compre el avodart dutasterida que cuesta 1500 y minoxidil NR-11
Polaris Research 5% y costo 900, agregalo a mi rutina de cuidado de cabello y en
carrito de compras"*. Los dos van a `RUTINA_PELO` en `datos-maestros.js`, y de ahí
salen solos la rutina, el botiquín, la lista de compras y el costo mensual.

**El NR-11 sustituye al Kirkland, no se suma.** No se aplican dos minoxidiles
tópicos a la vez. Conserva el `id:'minoxidil'` porque `RUTINA_PELO.dia()`,
`dosisMinoxidil` y toda la tarjeta de las 4 horas lo buscan por ese id. Y hubo que
reescribir su texto: el anterior decía *"la espuma se elige sobre el líquido
porque no lleva propilenglicol"*, y el NR-11 **es loción y sí lo lleva**. Ahora
dice cómo aplicarlo con gotero y qué hacer si pica.

**El Avodart es lo primero de esta rutina que no se aplica en el pelo**, así que
tiene momento propio: `PE_MOMENTOS` gana **"Por dentro — la pastilla"**, entre el
minoxidil y la noche. Mezclarlo con los pasos tópicos confundía las dos cosas.
Lleva además un campo `aviso` que se pinta como banda de advertencia y no cuenta
como paso marcable: es de receta, para la caída se usa fuera de indicación, y
—esto es lo que importa— **parte el PSA a la mitad**.

Por eso `CHEQUEO.psa` deja de ser una hipótesis. Estaba escrito como *"si arrancas
el dutasteride tópico…"*, con `desdeEdad:45`. Ahora es `prioritario:true`, sin
edad mínima, y explica las dos reglas con las que hay que leer ese análisis:
decir siempre que toma dutasterida, y multiplicar el resultado por 2 para
compararlo con los rangos normales. La escalera de compras pierde el *"Dutasteride
tópico (fórmula magistral)"*: ya no es un pendiente.

### El carrito: el precio se buscaba por el texto exacto del ítem

`LISTA_COMPRAS_PRECIOS_OTROS` tiene como clave el ítem completo tal cual aparece
en la lista. El propio comentario del archivo documenta lo que pasa: *"al
renombrar los de cabello el 18-ago sus claves dejaron de coincidir y el precio se
perdió en silencio"*. Con el NR-11 y el Avodart habría vuelto a pasar.

`lcPrecioOtros(cat,txt)` prueba primero esa tabla y, si la clave no está, busca el
producto en `RUTINA_PELO` / `RUTINA_PIEL` / `SUPLEMENTOS` y usa el precio que el
maestro ya guarda. Efecto medido: **los 10 productos del cabello pasan a tener
precio**; antes sólo 4, y con los nombres viejos. La píldora distingue los dos
casos en el tooltip ("Lo que te costó, según tu rutina" vs. precio de lista).

**El costo del cabello pasa de $687 a $2,854 al mes** — más que el gimnasio, la
comida y el plan de datos juntos. $2,400 de esos son los dos productos nuevos.

Comprobado en el navegador: 5 momentos en la rutina con la pastilla en el suyo,
12 pasos (el aviso no cuenta), el minoxidil sigue con sus 2 dosis y su ventana de
4 horas, el botiquín lista los dos, y en el carrito marcarlos suma $2,400.
Verificador en verde: 10 productos, $2854 al mes.

## El shell: barra doble de vidrio (2026-09-01)

Adán: *"no me gusta la distribución ni el reparto que hicimos con las demás apps
… unifícalo, futurista y limpio"*, y sobre la opción elegida: *"me gusta la opcion
b, de un color como blanco pero traslucido"*.

### Lo que estaba mal, medido

Cuatro áreas viven en este archivo (skincare, cabello, dentista, ojos) y cuatro se
cargan en un iframe (salud, ejercicio, comida, vestimenta). Las de fuera traían su
propio carril de 245 px y su propia cabecera de 58 px, que se apilaban sobre las
del shell:

- **120 px de chrome** antes del contenido en la mitad de las pestañas y 62 en la
  otra mitad. La página nunca empezaba en el mismo sitio.
- Dos botones de tema y dos cohetes en pantalla a la vez.
- Un carril de 245 px que aparecía y desaparecía según de dónde viniera el
  archivo — no era una decisión de diseño.

### Cómo queda

**Barra 1** — las 8 áreas, con icono SVG (fuera los emoji) y el color que cada una
ya tenía. **Barra 2** — las secciones de la app activa, que es donde vivía su
carril. **102 px, iguales para las ocho.**

El material son velos de blanco con `backdrop-filter`: 10 % la barra de áreas,
5,5 % la de secciones. Detalle que lo hace funcionar: un velo blanco sobre negro
plano sigue siendo negro, así que **las auroras de color cruzan justo detrás de
las barras** (`body::before`, 280 px de alto) y eso es lo que se lee como cristal.

### El canal: postMessage, no el DOM del iframe

Abiertas con `file://`, Chrome trata cada archivo como un origen distinto. Se
midió: **`iframe.contentDocument` es `null`** — el shell no puede leer ni escribir
dentro. Por eso [`embed.js`](embed.js), cargado por las cuatro apps externas:

- Con `?embed=1` la app oculta su `.sidebar` y su `.topbar`, y quita el
  `margin-left` de `.main` (ahí estaba el hueco de 245 px, no en `.content`).
- Publica sus secciones al shell (`{tipo:'listo', secciones:[{id,n}]}`), **leídas
  de su propio carril**: si mañana se añade una sección aparece sola en la barra,
  sin tocar ni este archivo ni el del shell.
- Escucha `{tipo:'ir'}` para navegar y `{tipo:'tema'}` para el tema.
- Sin `?embed=1` no hace nada: las apps siguen abriéndose solas igual que antes.

### Dos fallos que salieron por el camino

- **`?tab=ojos` no funcionaba.** `'ojos'` faltaba en la lista de pestañas válidas
  del deep-link, así que caía en Skincare. Las 8 comprobadas una a una.
- **El tema nunca llegaba a los iframes.** `toggleTheme()` lo empujaba con
  `f.contentDocument`, que en `file://` es siempre null, y el `try/catch` se
  tragaba el fallo en silencio. Ahora va por postMessage y se verificó que cruza.

Comprobado a 1600 px y 390 px: las 8 áreas con 102 px de chrome, los 4 iframes sin
carril ni cabecera propia, el clic en la barra de secciones navega dentro del
iframe, sin errores de consola y sin desbordes. La barra de secciones lleva
`nowrap`: sin él, en móvil se partía en dos líneas y la segunda quedaba cortada.

### El material, escrito una sola vez: `vidrio.css`

Adán: *"algunos difieren y quiero algo similar, y además te dije el color blanco
transparente y futurista"*. El shell ya era de vidrio; el contenido no. Medido:
Skincare y Cabello usaban velos (`--pl-panel` / `--pe-panel` al 4,5 %) y las otras
seis seguían con superficies opacas `#161619`. Y había **tres negros distintos**:
`#060614`, `#06080c` y `#0a0908`.

[`vidrio.css`](vidrio.css) no reescribe componentes: **redefine las variables de
superficie que las ocho ya usaban** (`--surface`, `--surface-2`, `--surface-3`,
`--border`) y les añade el desenfoque. Una `.card` no cambia de código y cambia de
material. Va después del `<style>` de cada app, para ganar por orden.

- Un solo negro, `#06080c`, y tres pesos de velo: 5 %, 4,5 % y 2,8 %.
- `backdrop-filter` en `.card`, `.tile` y los `*-card` de cada área, con una línea
  de luz de 1 px en el borde superior.
- Auroras de fondo en `body::before`, **apagadas con `html.embebida`**: dentro del
  shell las pinta él, y dos juegos superpuestos se veían sucios.
- En tema claro el velo blanco sobre fondo claro no se ve, así que ahí se vuelve
  casi sólido (90 %) y lo que separa la tarjeta es la sombra de 1 px.
- Cada área conserva su acento: rosa Skincare, ámbar Cabello, verde Salud, naranja
  Ejercicio, amarillo Comida, menta Dentista, azul Ojos, tierra Vestimenta.

### Dentista y Ojos tenían su propio carril

Eran las dos últimas que no encajaban: `guiaEnSecciones()` les construía un menú
lateral de 216 px dentro del shell, así que tenían carril donde las otras seis no.

`guiaAlSubnav()` lee los botones que esa función acaba de construir y los publica
en la barra del shell; pulsar en la barra **pulsa el botón original**, así que la
lógica de navegación sigue siendo una sola, la que ya estaba. El carril se queda
en el DOM (es quien sabe mostrar cada sección) pero con `display:none`. Los
nombres se cortan en el guion: *"Ojo seco — el problema de las 10 h de pantalla"*
no cabe en una píldora, *"Ojo seco"* sí.

Resultado: **las ocho áreas con barra de secciones y sin carril lateral.**
Skincare y Cabello siguen sin secciones a propósito — caben enteras en una
pantalla.

Comprobado en las 8 áreas y los 2 temas: mismo `--bg`, `blur(14px)` en todas, sin
errores de consola, sin desbordes y contraste sin nada bajo el mínimo. Abiertas
sueltas (sin `?embed=1`) las cuatro externas conservan su carril y su cabecera con
el material nuevo.
