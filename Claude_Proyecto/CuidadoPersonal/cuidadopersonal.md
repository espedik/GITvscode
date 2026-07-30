# cuidadopersonal.html — Cuidado Personal (shell)

Página "hub" de una sola pieza (HTML+CSS+JS, sin backend, sin dependencias externas — ni Chart.js) creada el 2026-07-29 que agrupa 4 subtabs principales en una sola navegación: **🧴 Skincare**, **💇 Cuidado del Cabello** (nativas, construidas en este mismo archivo), **🥗 Cuidado de la Salud** y **🏋️ Ejercicio** (apps completas preexistentes, incrustadas vía `<iframe>`). Sustituyó a las antiguas apps independientes `Salud/salud.html`, `Ejercicio/ejercicio.html` y a la app de `Animo/animo.html` (retirada, no fusionada).

Ver también: [`salud.md`](salud.md) y [`ejercicio.md`](ejercicio.md) — documentación de las dos apps incrustadas. Este archivo (`cuidadopersonal.md`) solo documenta el shell y los dos módulos nativos.

## Por qué Salud y Ejercicio están incrustados con `<iframe>` en vez de fusionados línea por línea

Ambas apps son grandes por sí solas y comparten nombres de variables y funciones globales (`KEY`, `RENDERS`, `SECS`, `STITLE`, `load`, `save`, `today`, `fmtD`, `uid`, `check`, `killChart`, etc.). Concatenarlas en un mismo `<script>` provocaría errores de "Identifier ya declarado" y rompería ambas apps. Incrustarlas cada una en su propio `<iframe>` dentro del subtab correspondiente conserva el 100% de su funcionalidad original sin ese riesgo.

**Origen compartido de `localStorage`**: como los tres archivos (`cuidadopersonal.html`, `salud.html`, `ejercicio.html`) se abren vía `file://`, comparten el mismo origen/almacenamiento que el resto del proyecto (así lo hace también `Dashboard/dashboard.html` al leer las claves de todas las apps hermanas desde una carpeta distinta). Por eso los datos guardados en `misalud_v1` y `mirutina_v1` siguen disponibles igual que antes de mover los archivos a esta carpeta, y por eso Skincare/Cabello pueden compartir sesión de `localStorage` con el resto del proyecto sin ninguna configuración especial.

## Navegación del shell

`mainTab(tab)` alterna la clase `.active` entre los 4 botones `.tab-btn` (`data-tab="skincare|cabello|salud|ejercicio"`) y los 4 contenedores `.view` (`#view-skincare|#view-cabello|#view-salud|#view-ejercicio`). Los dos tabs de iframe (`salud`, `ejercicio`) cargan su `src` de forma perezosa la primera vez que se activan (`if(!f.getAttribute('src')) f.src='salud.html'`), y ya no se recarga después — cambiar de tab y volver conserva el estado interno de esa app.

**Deep-link**: acepta `?tab=` en la URL (`skincare|cabello|salud|ejercicio`) para abrir directo ese subtab — así es como el Dashboard enlaza a cada área específica (`cuidadopersonal.html?tab=ejercicio`, etc.).

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

## Referencias cruzadas

- El **Dashboard** (`../Dashboard/dashboard.html`) lee `skincare_v1` (`D.sk`) y `cabello_v1` (`D.ca`) directamente: usa `sk.perfil.tipo` y `ca.perfil.tipo` únicamente para el subtítulo de las tarjetas de acceso rápido de Skincare y Cabello en `renderApps()` (ninguno de los dos tiene ya tile en "Hoy en números" ni alerta — todo lo relacionado a "hice mi rutina hoy" se retiró el 2026-07-29, tanto el checklist interno de Skincare como el CRUD de Lavados de Cabello). Si cambias la forma de `perfil` en cualquiera de los dos aquí, revisa `renderApps()` en `Dashboard/dashboard.html`.
- Las tarjetas de acceso rápido del Dashboard enlazan aquí con `?tab=skincare`, `?tab=cabello`, `?tab=salud`, `?tab=ejercicio`.
- Mapa completo del proyecto: [`../README.md`](../README.md).

## Cómo usarlo

Se abre `cuidadopersonal.html` directamente en cualquier navegador, sin instalación ni servidor. No hay sincronización entre dispositivos. Skincare y Cabello no tienen botón de exportar JSON todavía (a diferencia de Salud y Ejercicio, que sí lo tienen dentro de su propio iframe).
