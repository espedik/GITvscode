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

`HAIR_DB`: objeto con 5 categorías (`champu`, `acondicionador`, `mascarilla`, `tratamientoCaida`, `aceitePuntas`), productos reales (**Darrow Doctar**, TRESemmé, L'Oréal Elvive, Kérastase, Moroccanoil, **Minoxidil 5% — Kirkland Signature o genérico**) etiquetados por `grosor`, `presu` y `ayuda`. `haPick(cat, perfil, n)` es el equivalente de `skPick()` para cabello — mismo algoritmo de filtro+orden, filtrando por `grosor` en vez de `tipo` de piel.

### Productos ya comprados — 3 categorías reducidas a una sola opción fija (2026-08-07)

Pedido explícito: *"de crema limpiadora me compré el CeraVe verde, ese ponme en mi lista de compras porque es el que me gusta, también para la caspa me compré el Darrow Doctar, igual déjalo en lista de compras y en rutina porque ese me gusta, también EUCERIN Hyaluron Filler Epigenetic lo mismo, ya compré y me gusta usarlo, y ponlo en compras — o sea, para lo que es cada producto solo déjame esos y no me des más opciones"*. A diferencia del resto de `SKIN_DB`/`HAIR_DB` (que siguen ofreciendo 2-4 alternativas de marca por categoría, para cuando Adán todavía no decide qué comprar), estas 3 categorías dejaron de ser una recomendación algorítmica — son la decisión ya tomada, así que se redujeron a **un solo objeto por array**, sin alternativas:

- **`SKIN_DB.limpiador`** → solo `CeraVe Limpiador Espumoso (Foaming Facial Cleanser, verde)` (se quitaron La Roche-Posay Effaclar, Cetaphil Gel y CeraVe Limpiador Hidratante). `tipos`/`ayuda` se ampliaron a "todos" para que `skPick()` lo elija siempre sin importar el perfil de piel guardado.
- **`SKIN_DB.hidratanteAM`** → solo `Eucerin Hyaluron-Filler + Epigenetic Día SPF15` (se quitaron CeraVe AM SPF30 y Neutrogena Hydro Boost). El SPF15 que trae este producto **no reemplaza** el paso de `SKIN_DB.spf` (protector solar SPF50 dedicado) — se dejó la nota explícita en `uso` para que no se confunda como protección solar suficiente por sí sola.
- **`SKIN_DB.hidratantePM`** → solo `Eucerin Hyaluron-Filler + Epigenetic Noche` (se quitaron CeraVe PM y Cetaphil Crema).
- **`HAIR_DB.champu`** → solo `Darrow Doctar (shampoo con alcatrão/coal tar)`, `ayuda:['caspa']` (se quitaron Vichy Dercos, Alpecin, Pantene Pro-V Anti-Caída y Head & Shoulders, que apuntaban a `caida`/`caspa`). **Esto es un cambio de enfoque, no solo de marca**: el champú pasó de tratar caída a tratar caspa — confirmado explícitamente con Adán antes de aplicarlo, ya que Vichy Dercos y Darrow Doctar no son equivalentes (atienden preocupaciones distintas). El tratamiento anticaída real sigue intacto y sin cambios: `HAIR_DB.tratamientoCaida` (Minoxidil 5%, diario, independiente del champú).
- **También se actualizó `Coach/Coach_v2.html → RUTINA_TASKS`** (y su copia en `Dashboard/dashboard.html`, ver [`../Coach/readme_coach_v2.md`](../Coach/readme_coach_v2.md) → "Productos ya comprados"): el paso de champú de los días de lavado (Lun/Jue/Sáb) pasó de "Vichy Dercos" a "Darrow Doctar" — es la única de las 3 categorías que Adán pidió explícitamente reflejar también en la rutina diaria, no solo en la lista de compras/guía.
- **`LISTA_COMPRAS` del Dashboard** (estructura duplicada de este mismo catálogo, ver `../Dashboard/readme_dashboard.md` → "Datos duplicados") se actualizó a mano para las mismas 3 líneas — no hay sincronización automática entre `SKIN_DB`/`HAIR_DB` de este archivo y `LISTA_COMPRAS` de `dashboard.html`.

Verificado con Playwright: la guía de Skincare muestra "CeraVe Limpiador Espumoso (Foaming Facial Cleanser, verde)" como paso 1 de la rutina de mañana y "Eucerin Hyaluron-Filler + Epigenetic Día/Noche SPF15" en los pasos de hidratante AM/PM; la guía de Cabello muestra "Darrow Doctar (shampoo con alcatrão/coal tar)" como único paso de champú con la píldora "Caspa"; cero errores de consola en ambas vistas.

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
