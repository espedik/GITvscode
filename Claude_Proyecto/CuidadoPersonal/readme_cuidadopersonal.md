# cuidadopersonal.html — Cuidado Personal (shell)

Página "hub" de una sola pieza (HTML+CSS+JS, sin backend, sin dependencias externas — ni Chart.js) creada el 2026-07-29 que agrupa 5 subtabs principales en una sola navegación: **🧴 Skincare**, **💇 Cuidado del Cabello** (nativas, construidas en este mismo archivo), **🥗 Cuidado de la Salud**, **🏋️ Ejercicio** y **🍳 Comida** (**nuevo 2026-07-30**) (apps completas preexistentes, incrustadas vía `<iframe>`). Sustituyó a las antiguas apps independientes `Salud/salud.html`, `Ejercicio/ejercicio.html` y a la app de `Animo/animo.html` (retirada, no fusionada).

Ver también: [`readme_salud.md`](readme_salud.md), [`readme_ejercicio.md`](readme_ejercicio.md) y [`readme_comida.md`](readme_comida.md) — documentación de las tres apps incrustadas. Este archivo (`readme_cuidadopersonal.md`) solo documenta el shell y los dos módulos nativos.

## Por qué Salud, Ejercicio y Comida están incrustados con `<iframe>` en vez de fusionados línea por línea

Las tres apps son grandes por sí solas y comparten (o podrían llegar a compartir) nombres de variables y funciones globales (`KEY`, `RENDERS`, `SECS`, `STITLE`, `load`, `save`, `today`, `fmtD`, `uid`, `check`, `killChart`, etc.). Concatenarlas en un mismo `<script>` provocaría errores de "Identifier ya declarado" y rompería las apps. Incrustarlas cada una en su propio `<iframe>` dentro del subtab correspondiente conserva el 100% de su funcionalidad original sin ese riesgo.

**Origen compartido de `localStorage`**: como los cuatro archivos (`cuidadopersonal.html`, `salud.html`, `ejercicio.html`, `comida.html`) se abren vía `file://`, comparten el mismo origen/almacenamiento que el resto del proyecto (así lo hace también `Dashboard/dashboard.html` al leer las claves de todas las apps hermanas desde una carpeta distinta). Por eso los datos guardados en `misalud_v1`, `mirutina_v1` y `comida_v1` siguen disponibles igual que antes de mover los archivos a esta carpeta, y por eso Skincare/Cabello pueden compartir sesión de `localStorage` con el resto del proyecto sin ninguna configuración especial. **`comida.html` además usa este origen compartido para *escribir* directamente en `misalud_v1`** (no solo en su propia clave) — ver [`readme_comida.md`](readme_comida.md) → "Referencias cruzadas".

## Navegación del shell

`mainTab(tab)` alterna la clase `.active` entre los 5 botones `.tab-btn` (`data-tab="skincare|cabello|salud|ejercicio|comida"`) y los 5 contenedores `.view` (`#view-skincare|#view-cabello|#view-salud|#view-ejercicio|#view-comida`). Los tres tabs de iframe (`salud`, `ejercicio`, `comida`) cargan su `src` de forma perezosa la primera vez que se activan (`if(!f.getAttribute('src')) f.src='salud.html'`), y ya no se recarga después — cambiar de tab y volver conserva el estado interno de esa app.

**Deep-link**: acepta `?tab=` en la URL (`skincare|cabello|salud|ejercicio|comida`) para abrir directo ese subtab — así es como el Dashboard enlaza a cada área específica (`cuidadopersonal.html?tab=ejercicio`, etc.).

## Módulo nativo: 🧴 Skincare — `localStorage['skincare_v1']`

Reconstruido a fondo el 2026-07-29, y **simplificado a una sola pantalla ese mismo día** a petición explícita de Adán ("en skincare lo que acabas de hacer debe ser lo único, borra productos, bitácora, dashboard y rutina"). Ya no tiene subnav ni subtabs internas — Skincare es **una sola vista**: perfil de piel + guía generada. Se eliminaron por completo el Dashboard interno, el checklist de Rutina AM/PM, el inventario de Productos y la Bitácora de piel que existían en la primera versión (esa iteración duró unas horas).

```js
{
  perfil: { tipo:'grasa|seca|mixta|normal', preocupaciones:['acne'|'manchas'|'arrugas'|'sensibilidad', ...],
            rasurado:'rastrillo|electrica|barba|no_aplica', presupuesto:'economico|medio|alto', notas:'' }
}
```

**Valores por defecto de `perfil`** (`skDefault()`): el perfil real de Adán tal como lo dio el 2026-07-29 — piel grasa, preocupaciones acné+manchas+arrugas, tiene barba, presupuesto medio. Así la guía sale útil desde la primera carga sin que tenga que llenar el formulario.

**Rediseño visual del 2026-07-29 (mismo día, iteración posterior)**: Adán pidió una interfaz "visualmente mejor", más detalle de "para qué sirve" cada paso, y **colores pastel** — a diferencia del resto del shell (oscuro), `#view-skincare` tiene su propio tema claro pastel completamente aislado (variables `--sk-*` definidas dentro del selector `#view-skincare`, y todo override de `.card`/`.btn`/inputs escrito como `#view-skincare .card{...}` etc. para no filtrarse a Cabello, que tiene su propio tema aparte). Paleta: rosa, **teal** (`--sk-teal*`), menta, durazno y azul pastel sobre fondo blanco/crema con gradiente radial suave. **Nota: originalmente esta variable era lavanda/morada (`--sk-lav`) — Adán pidió explícitamente quitar el morado ese mismo día, así que se renombró a `--sk-teal` y se recolorearon todos sus usos (rotación semanal "retinoide", timeline, nota de pasos PM). Si en el futuro se agrega otro color a esta paleta, evitar tonos morados/lavanda de nuevo.**

**Contenido de la vista** (`#view-skincare`, sin subnav, se renderiza completo con `skRenderGuia()` al cargar la página):
1. **Hero** (`.sk-hero`): título, descripción de qué es y para qué sirve el módulo, botón "✏️ Editar mi perfil" (`skToggleForm()` muestra/oculta la tarjeta del formulario, oculta por defecto) y una fila de **chips-resumen** (`skResumenChips()`, en `#sk-resumen-chips`) con el tipo de piel, cada preocupación, rasurado y presupuesto en píldoras de color — para ver el perfil de un vistazo sin abrir el formulario.
2. **Formulario de perfil** (`#sk-form-card`, oculto hasta pulsar "Editar"; `skPintarPerfilForm`/`skLeerPerfilForm`/`skSavePerfil`): tipo de piel, preocupaciones (checkboxes múltiples), rasurado, presupuesto, notas libres. Al guardar, actualiza `SK.perfil`, re-pinta los chips-resumen y vuelve a generar toda la guía — no hace falta recargar la página.
3. **Guía generada** (`skRenderGuiaContent`, dentro de `#sk-guia-body`), en este orden:
   - **🌅 Rutina de mañana** / **🌙 Rutina de noche** — cada paso es una tarjeta `.sk-step` con número circular de color (durazno=AM, lavanda=PM), nombre del producto, bloque **"Cómo aplicarlo"** explícito, bloque de **"Nota"** cuando aplica, y píldoras pequeñas de **"ayuda con"** (qué preocupaciones atiende ese producto — `SK_CONCERN_META`). Los productos se eligen con `skPick(categoria, perfil, n)` contra `SKIN_DB` y se registran en un array `usados` para la lista de compras.
   - **🗓️ Rotación semanal de activos** — ya no es tabla, son 7 "day pills" (`skDayPill`) de lunes a domingo coloreadas por actividad (lavanda=retinoide, durazno=BHA, menta=descanso). Solo se muestra si el perfil tiene preocupaciones que ameriten un activo.
   - **⏳ Qué esperar y cuándo** (`skTimeline`, nueva) — línea de tiempo vertical con hitos condicionales según preocupaciones: semana 1-2 (adaptación/purga), 3-4 (control de grasa), 6-8 (acné, si aplica), 8-12 (manchas, si aplica), 12+ (arrugas, si aplica).
   - **🧖 Mascarilla semanal** — 1 tarjeta `.sk-step` igual que los pasos de rutina.
   - **⚠️ Qué no mezclar** (`skWarnHtml`, nueva) — caja de advertencia color coral con la lista de combinaciones a evitar (retinoide+BHA mismo día, doble exfoliante, etc.), con un ítem extra si hay preocupación de manchas.
   - **🛒 Tu lista de compras** (`skListaHtml`, nueva) — todos los productos recomendados en la guía, deduplicados por nombre, con su categoría — pensada para llevar directo a la farmacia o al carrito de Amazon/Sephora.
   - **💡 Consejos** — igual que antes pero como lista de tarjetas con ícono en vez de `<ul>` plano.
   - Aviso final de que no sustituye a un dermatólogo (`.sk-disclaimer`).

`SKIN_DB`: objeto con 8 categorías (`limpiador`, `exfoliante`, `serumAM`, `hidratanteAM`, `spf`, `tratamientoPM`, `hidratantePM`, `semanal`), cada una con 2-4 productos reales (CeraVe, La Roche-Posay, The Ordinary, Isdin, Cetaphil, Neutrogena, Differin, Aztec Secret) etiquetados por `tipos` (a qué tipo de piel aplican), `presu` (a qué presupuesto) y `ayuda` (qué preocupaciones atienden). `skPick()` filtra por tipo+presupuesto y ordena por cuántas preocupaciones del perfil cubre cada producto — es texto plano dentro del `<script>`, no viene de ninguna API; si un producto deja de venderse o Adán quiere agregar uno que ya probó y le funciona, se edita directamente el array de la categoría correspondiente.

**Seguimiento diario de "ya hice mi skincare hoy" vive en Coach, no aquí**: `Coach/Coach_v2.html → #rutina` (`RUTINA_TASKS`) ya incluye "🧴 Skincare AM" y "🧴 Skincare PM" como tareas del horario diario (ids `wd04`/`wd17` entre semana, `sa02`/`sa13` sábado, `do02`/`do10` domingo) — tenerlo también aquí era duplicado. Este módulo es puramente de **referencia** (qué producto usar y por qué), no de tracking de cumplimiento.

## Módulo nativo: 💇 Cuidado del Cabello — `localStorage['cabello_v1']`

**Reconstruido por completo el 2026-07-29** (misma sesión que el rediseño de Skincare) para seguir el **mismo patrón de perfil + guía**, a petición explícita de Adán ("en cuidado del cabello quiero una interfaz similar"). Ya no existen las secciones viejas de Dashboard/Lavados & Tratamientos/Productos/Cortes & Notas (CRUD de registros) ni sus modales — **Cabello es ahora una sola vista**, igual que Skincare, con su propio tema pastel aislado bajo `#view-cabello` (ámbar, azul, verde y terracota — sin morado desde el diseño original).

```js
{
  perfil: { tipo:'lacio|ondulado|rizado|afro', grosor:'fino|medio|grueso', cuero:'graso|seco|normal',
            preocupaciones:['caida'|'resequedad'|'caspa'|'frizz', ...],
            caidaPatron:'reciente|genetica|leve|no_seguro', presupuesto:'economico|medio|alto', notas:'' }
}
```

**Valores por defecto de `perfil`** (`caDefault()`): el perfil real de Adán tal como lo dio el 2026-07-29 — cabello lacio, fino, cuero cabelludo graso, preocupaciones caída+resequedad, caída notoria y reciente, presupuesto medio.

**Contenido de la vista** (`#view-cabello`, sin subnav, se renderiza completo con `caRenderGuia()` al cargar la página) — mismo patrón que Skincare:
1. **Hero** (`.ca-hero`) con **chips-resumen** (`caResumenChips()`, en `#ca-resumen-chips`) y botón "✏️ Editar mi perfil" (`caToggleForm()`).
2. **Formulario de perfil** (`#ca-form-card`, oculto hasta pulsar "Editar"; `caPintarPerfilForm`/`caLeerPerfilForm`/`caSavePerfil`): tipo de cabello, grosor, cuero cabelludo, patrón de caída (solo relevante si "caída" está marcada), preocupaciones (checkboxes múltiples: caída, resequedad, caspa, frizz), presupuesto, notas.
3. **Guía generada** (`caRenderGuiaContent`, dentro de `#ca-guia-body`), en este orden:
   - **🩺 Nota médica condicional** (`.ca-note`, azul) — solo aparece si `preocupaciones` incluye `caida` **y** `caidaPatron==='reciente'`: recomienda ver a un dermatólogo/tricólogo para descartar causas puntuales (estrés, deficiencias, tiroides, telógeno efluvio) antes de asumir que el tratamiento cosmético basta.
   - **🚿 Rutina de lavado** — champú (en cuero cabelludo) + acondicionador (solo puntas), tarjetas `.ca-step` igual que `.sk-step` de Skincare.
   - **💊 Tratamiento anticaída diario** (solo si `caida` marcada) — Minoxidil 5%, aplicado 2x/día **todos los días**, independiente de si es día de lavado.
   - **✨ Después de lavar** (solo si `resequedad` marcada) — aceite/sérum ligero en puntas.
   - **🗓️ Calendario semanal** — 7 "day pills" (`caDayPill`) de lavado/mascarilla/descanso, calculadas por `caWashDays(cuero, tieneResequedad)`: cuero seco → 2x/semana, graso sin resequedad → 4x/semana, graso+resequedad (o normal) → 3x/semana. El último día de lavado de la semana se marca como día de mascarilla.
   - **⏳ Qué esperar y cuándo** (`caTimeline`) — semana 1-2 (adaptación, posible shedding inicial si hay tratamiento anticaída), 3-4 (control de grasa/hidratación), 8-12 y mes 4-6 (resultados de caída, condicionales).
   - **🧖 Mascarilla hidratante** — 1 tarjeta `.ca-step`, sustituye al acondicionador el día de mascarilla.
   - **⚠️ Qué evitar** (`caWarnHtml`) — agua muy caliente, acondicionador/mascarilla en la raíz si el cuero es graso, cepillar en mojado, cambiar de producto cada semana, y (si hay caída) abandonar el tratamiento antes de 3 meses.
   - **🛒 Tu lista de compras** (`caListaHtml`) — productos recomendados deduplicados.
   - **💡 Consejos** — tarjetas con ícono.
   - Aviso final de que no sustituye a un dermatólogo/tricólogo (`.ca-disclaimer`).

`HAIR_DB`: objeto con 5 categorías (`champu`, `acondicionador`, `mascarilla`, `tratamientoCaida`, `aceitePuntas`), productos reales (Vichy Dercos, Alpecin, Pantene Pro-V, Head & Shoulders, TRESemmé, L'Oréal Elvive, Kérastase, Moroccanoil, **Minoxidil 5% — Kirkland Signature o genérico**) etiquetados por `grosor`, `presu` y `ayuda`. `haPick(cat, perfil, n)` es el equivalente de `skPick()` para cabello — mismo algoritmo de filtro+orden, filtrando por `grosor` en vez de `tipo` de piel.

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

## Referencias cruzadas

- El **Dashboard** (`../Dashboard/dashboard.html`) ya no tiene una pantalla dedicada de "Todas mis apps" (se retiró el 2026-07-30) — el acceso directo ahora vive en su barra superior fija (`renderQuickApps()`), que **no** muestra estadística para Skincare/Cabello/Ejercicio/Comida (solo íconos), y sí para Salud (kcal de hoy). Si cambias la forma de `perfil` en Skincare/Cabello, revisa `renderQuickApps()` en `Dashboard/dashboard.html` de todos modos, por si en el futuro se le agrega estadística.
- Las píldoras de la barra superior del Dashboard enlazan aquí con `?tab=skincare`, `?tab=cabello`, `?tab=salud`, `?tab=ejercicio` (`?tab=comida` todavía no tiene píldora propia en el Dashboard — ver [`readme_comida.md`](readme_comida.md)).
- Mapa completo del proyecto: [`../README.md`](../README.md).

## Cómo usarlo

Se abre `cuidadopersonal.html` directamente en cualquier navegador, sin instalación ni servidor. No hay sincronización entre dispositivos. Skincare y Cabello no tienen botón de exportar JSON todavía (a diferencia de Salud y Ejercicio, que sí lo tienen dentro de su propio iframe).
