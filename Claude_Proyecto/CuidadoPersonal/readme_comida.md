# comida.html — Mi Comida: Recetario, Registro Diario, Plan Semanal & Plan Masa Muscular

Aplicación de una sola página (HTML+CSS+JS, sin backend) creada el 2026-07-30 a petición explícita de Adán ("agrega otro html con lo de comida... una interfaz de alimentos saludables que puedo cocinar sencillos"). **Ampliada por completo el 2026-08-02**: ya no es solo un recetario de referencia — ahora es el **centro de nutrición completo** del ecosistema. Adán pidió explícitamente sacar de `salud.html` todo lo de alimentación ("quita alimentacion plan semanal, registro diario... rutina muscular... enriqueser la seccion de comida") y traerlo aquí, con una interfaz más visual. Ver [`readme_salud.md`](readme_salud.md) → "Reestructuración — nutrición se mudó a Comida" para el detalle de qué se quitó de allá.

**Ubicación**: vive en `CuidadoPersonal/comida.html`. Se abre normalmente **incrustada** dentro de `CuidadoPersonal/cuidadopersonal.html` → pestaña **🍳 Comida**, vía `<iframe src="comida.html">`, igual que Salud y Ejercicio. También puede abrirse directo sin pasar por el shell.

## Por qué solo desayuno y cena (recetario)

Petición explícita de Adán — la comida de mediodía no vive aquí (la resuelve aparte, probablemente en ALTEN). El banner superior de la app dice esto mismo para que quede claro apenas se abre. Esto **no** aplica al Registro Diario (ahí sí se puede registrar cualquier comida, incluido almuerzo/snack) ni al Plan Masa Muscular (que sí incluye la comida de mediodía como parte del plan nutricional completo).

## Navegación (sidebar propio de este archivo)

- **🌅 Desayunos** — 10 recetas (14 hasta el 2026-08-09, ver "Segunda ronda de curación" más abajo).
- **🌙 Cenas** — 8 recetas (14 hasta el 2026-08-09, ídem).
- **🥩 Plan Masa Muscular** (nuevo 2026-08-02, movido desde `salud.html` → "Rutina Muscular") — plan alimentario detallado para ganar masa muscular: tarjeta de perfil (peso/estatura/edad/objetivo), 4 KPIs de macros objetivo (calorías/proteína/carbs/grasa), desglose de desayuno/comida/cena con tabla de alimentos y valores nutricionales por comida, alimentos recomendados de bajo presupuesto por categoría, y 6 tips de entrenamiento/descanso/consistencia. Cada comida se puede registrar en el Registro Diario con un botón — igual que las recetas normales.
- **📔 Registro Diario** (nuevo 2026-08-02, movido desde `salud.html` → "Registro Diario") — bitácora de alimentos consumidos (comida del día: desayuno/almuerzo/cena/snack, nombre, cantidad, calorías y macros), filtrable por fecha y tipo de comida. Header con resumen del día: calorías totales vs. meta + barras de progreso de proteína/carbohidratos/grasa vs. las metas configuradas en `salud.html` → Perfil & Metas. **Lee y escribe directamente `misalud_v1.alimentos`** (la clave de Salud, no `comida_v1`) — ver "Modelo de datos" abajo.
- **📅 Plan Semanal** (nuevo 2026-08-02, **rediseñado, no portado**) — a diferencia del viejo Plan Semanal de `salud.html` (que era retrospectivo: mostraba lo que ya habías comido), este es **hacia adelante**: eliges qué receta piensas cocinar cada día de la semana (desayuno y cena, grid de 7 días tipo calendario). Cuando llega el día, abres la receta en Desayunos/Cenas y la registras con un clic — el plan es solo de planeación, no se autorregistra.
- **🛒 Lista del Súper** — lista consolidada y deduplicada de los 30 ingredientes únicos que se necesitan para poder cocinar las 24 recetas (38 en 28 recetas hasta el 2026-08-09), agrupada en 6 categorías, con checklist persistente. (El Plan Masa Muscular usa sus propios alimentos, no incluidos en esta lista — son ingredientes básicos genéricos, no una receta con cantidades exactas.)

## Por qué estas recetas y no otras — a la medida real de Adán, no genéricas

Las 28 recetas (`const RECETAS`, dentro del `<script>`) no son un recetario genérico de internet — se eligieron cruzando fuentes de datos reales que ya existen en el proyecto:

1. **Salud Digestiva** (`salud.html` → sección "🫁 Salud Digestiva"): Adán tiene reflujo/agruras documentado. Ninguna receta usa disparadores conocidos (café, picante, cítricos en exceso, chocolate, frituras, refresco, cebolla/ajo crudos, menta) y se favorecen cocciones suaves y alimentos bien tolerados (huevo, pollo, pescado blanco, papa, verduras cocidas, nopales, canela, miel). El banner superior de la app y el campo `tip` de cada receta lo explican.
2. **Plan Masa Muscular** (ahora dentro de este mismo archivo, antes vivía en `salud.html` → "Rutina Muscular"): la meta nutricional real de Adán (77 kg desde 2026-07-31 — antes 75 kg, ver [`readme_salud.md`](readme_salud.md) → "Actualización de peso y metas nutricionales") es ~3,115 kcal y ~186 g de proteína al día. Los macros de cada receta (`r.macros`) apuntan a que desayuno + cena cubran una parte sustancial de esa meta, dejando el resto a la comida de mediodía (fuera del alcance del recetario, aunque sí cubierta en el Plan Masa Muscular). Las recetas y sus macros individuales **no se recalcularon** — el ajuste de +280 kcal/día se absorbe en el Plan Masa Muscular (desayuno/comida) y en la comida de mediodía, no en este recetario.
3. **Ingredientes que no le gustan a Adán** (2026-08-07, ver sección propia más abajo): 12 ingredientes específicos quedaron excluidos de las 28 recetas — no por reflujo, sino porque simplemente no le gustan.

**Sencillez real**: nada de técnicas complicadas (solo plancha, vapor, horno, sartén, licuadora) ni ingredientes difíciles de conseguir — todo se compra en cualquier súper mexicano.

## Recetario reescrito por completo — 12 ingredientes que no le gustan, quitados; 8 recetas nuevas (2026-08-07)

Pedido explícito de Adán, con la lista completa de lo que no le gusta: *"en compras, ni me gusta la calabaza, ejotes, hierbas de olor, brocoli, camote, espinaca zanahoria, pavo molido, leche de avena, crema de cacahuate, caldo de pollo, avena en hojuelas, entonces dame mas recetas y pon otros ingredientes"*.

- **16 de las 20 recetas originales usaban al menos uno de esos 12 ingredientes** — verificado programáticamente cruzando cada `ingredientes[]` contra la lista de 12, no revisado a simple vista. Solo 4 sobrevivieron intactas: `d8` (Pan tostado con aguacate y huevo cocido), `d10` (Quesadillas de claras con queso panela y nopales), `c4` (Atún con arroz y ensalada de pepino), `c6` (Tacos de pollo deshebrado con nopales). Las otras 16 se reescribieron por completo, no se les quitó solo el ingrediente problemático manteniendo el resto — varias (ej. la sopa `c3`/`c8` con calabaza+zanahoria+caldo) tenían 2-3 ingredientes de la lista negra a la vez y no tenía sentido remendarlas.
- **La avena en hojuelas era la base de 6 de las 10 recetas de desayuno** (`d1`, `d3`, `d4`, `d5`, `d6`, `d9`) — el ingrediente disliked con más impacto en el recetario, ya que también invalidaba `leche de avena` (usada junto con avena en `d9`) y `crema de cacahuate` (junto con avena en `d5`).
- **8 recetas nuevas** (de 10+10 a 14+14) para cumplir "dame mas recetas" — usando ingredientes que no aparecían antes en el recetario: champiñones, pimiento morrón, camarón, filete de salmón, filete de res magro, jamón de pavo, requesón, papaya, granola de amaranto (reemplaza a la avena como base de cereal — mismo índice glucémico bajo, más proteína), fideo, ajo.
- **Mismo criterio de reflujo que ya tenían las recetas originales** — se mantuvo sal moderada, nada picante, jitomate sin semillas en las recetas donde aplica, cocciones suaves (vapor/horno/plancha, nunca frito). La sopa de pollo con caldo concentrado (`c3`/`c8` viejas) se reemplazó por una sopa que hace su propio caldo cociendo la pechuga en agua (`c8` nueva) — mismo resultado real, sin el ingrediente de bolsa que no le gustaba.
- **38 ingredientes únicos** en las 28 recetas (antes 37 en 20) — la lista completa vive en `Dashboard/dashboard.html → LISTA_COMPRAS.comida`, sincronizada byte a byte con este archivo (ver `readme_dashboard.md` para el detalle de esa sincronización). `CATEGORIA_ING` (el mapa propio de este archivo para su tab "🛒 Lista del Súper", una **3ª estructura duplicada** que no se había identificado como tal hasta esta ronda) también se reescribió completo con las 6 categorías reales de los 38 ingredientes nuevos — de paso, `Frijoles negros` ganó categoría propia (🥚 Proteínas): antes no estaba en el mapa y caía silenciosamente al fallback "Condimentos y otros" de `renderSuper()`.
- **2 textos estáticos desactualizados, encontrados al revisar visualmente la app tras el cambio (no solo el código)**: el banner "🩺 Elegidas a tu medida, no genéricas" seguía diciendo *"favorecen lo que sí toleras bien (avena, plátano...)"* — literalmente el ingrediente que más recetas tuvo que reemplazar. Se corrigió para mencionar los 12 ingredientes excluidos explícitamente y quitar la mención de avena como "tolerada". El texto de "🛒 Lista del Súper → Cómo usar esta lista" seguía diciendo *"las 20 recetas de arriba (10 desayunos + 10 cenas)"* — actualizado a 28 (14+14). Ninguno de los dos se regenera solo desde `RECETAS`, son texto plano en el HTML.
- Verificado con Node: 0 ingredientes de la lista negra de 12 presentes en ninguna de las 28 recetas; 28 ids únicos sin colisión; sintaxis limpia. Verificado con Playwright: `#cnt-desayunos`/`#cnt-cenas` muestran 14/14; la pestaña "🛒 Lista del Súper" pinta las 6 categorías con conteos `13/1/7/4/9/4` (suman 38), ningún ingrediente cae en el fallback "Condimentos y otros" por no tener categoría propia; cero errores de consola.

## Segunda ronda de curación — 6 recetas quitadas, cambio de vegetal en el omelette (2026-08-09)

Pedido explícito, esta vez sobre el resultado del Dashboard (`Dashboard/dashboard.html → RECETAS_MINI`, ver [`../Dashboard/readme_dashboard.md`](../Dashboard/readme_dashboard.md) para el detalle de esa réplica): *"quitame el pan frances, el omellette dejalo pero otra cosa en vez de champiñones, quita lo de pan tostado, tostadas de requeson quitalas, quita hotcakes / en cena quita salmon, quita camarones, quita sopa de pollo, quita ensalada, quita pescado a la veracruzana, quita tinga de pollo"*. De **14+14 (28) bajó a 10+8 (24) recetas**.

- **Desayuno, se quitaron 4**: `d5` Pan francés integral con canela, `d8` Pan tostado con aguacate y huevo cocido, `d11` Tostadas de requesón con miel y plátano, `d13` Hot cakes de plátano y huevo.
- **Cena, se quitaron 6**: `c1` Salmón al horno, `c3` Camarones al ajillo, `c8` Sopa de pollo casera con chayote y fideo, `c10` Ensalada tibia de pollo/quinoa/champiñones/pepino, `c13` Pescado a la veracruzana, `c14` Tinga de pollo.
- **Los `id` que quedaron NO se renumeraron** (desayuno: `d1,d2,d3,d4,d6,d7,d9,d10,d12,d14`; cena: `c2,c4,c5,c6,c7,c9,c11,c12`) — los huecos son intencionales, evita romper cualquier referencia externa a un id específico (p. ej. `planSemana` de un usuario que ya tenía guardado ese id).
- **`d6` (Omelette) se conservó, pero cambió su vegetal**: tenía champiñones, que Adán ya no quiere ahí. **Se sustituyó por pimiento morrón, no por espinaca** — la espinaca está en la lista de 12 ingredientes que a Adán no le gustan (ver sección de arriba, 2026-08-07); haberla usado hubiera reintroducido a ciegas un ingrediente que él mismo ya había rechazado. Pimiento morrón ya era un ingrediente probado en el recetario y, de hecho, ya se combinaba con champiñones en el omelette de cena (`c7`) — mismo perfil de sabor, sin el ingrediente que sobraba. Nombre nuevo: "Omelette de claras con pimiento morrón y queso panela".
- **`CATEGORIA_ING` bajó de 38 a 30 ingredientes** — Ajo, Camarón, Filete de salmón, Requesón, Canela en polvo, Fideo, Quinoa cocida y Sal quedaron sin ninguna receta que los use (verificado con grep que cada uno solo aparecía en las recetas recién quitadas) y se sacaron del mapa para no dejar entradas muertas. `ORDEN_CAT` (las 6 categorías) no cambió — solo bajó el conteo dentro de cada una.
- **Texto estático corregido** (igual patrón que el 2026-08-07 — estos textos no se regeneran solos desde `RECETAS`): "🛒 Lista del Súper → Cómo usar esta lista" decía *"las 28 recetas de arriba (14 desayunos + 14 cenas)"*, ahora dice *"las 24 recetas de arriba (10 desayunos + 8 cenas)"*. El banner "🩺 Elegidas a tu medida" no necesitó cambios — no menciona conteos, solo la lista de disgustos/reflujo, que sigue vigente.
- **`Dashboard/dashboard.html` replicado en el mismo movimiento** — `RECETAS_MINI` (mismos 10+8, mismo cambio de omelette) y `LISTA_COMPRAS.comida` (los mismos 8 ingredientes huérfanos quitados de sus 5 categorías por pasillo: Frutas y Verduras 14→13, Carnes y Pescados 6→4, Lácteos y Huevo 6→5, Abarrotes y Despensa 10→6, Panadería sin cambio). Ver `readme_dashboard.md` para el detalle de esa mitad.
- Verificado con Playwright en ambos archivos: `RECETAS.desayuno.length`/`.cena.length` = 10/8 en `comida.html`, `RECETAS_MINI.desayuno.length`/`.cena.length` = 10/8 en `dashboard.html`, mismos 18 nombres de receta en ambos (incluido el omelette con pimiento morrón), `CATEGORIA_ING` con 30 entradas, `LISTA_COMPRAS.comida` con conteos 13/4/5/6/2 (suman 30), cero errores de consola en los 2 archivos.

## Modelo de datos

### `localStorage['comida_v1']` — propio de este archivo

```js
{
  comprado:   { 'Nombre del ingrediente': true },              // lista del súper marcada
  planSemana: { 'YYYY-MM-DD': { desayuno: recetaId, cena: recetaId } }  // nuevo 2026-08-02
}
```

Las 20 recetas + Plan Masa Muscular (`RECETAS`, `PLAN_ITEMS`) **no** se guardan en `localStorage` — son contenido de referencia hardcodeado, igual que Salud Digestiva en `salud.html`. `planSemana` solo guarda **IDs de receta por día/slot**, no una copia de la receta — si el catálogo de recetas cambia, el plan sigue apuntando al mismo id.

### `localStorage['misalud_v1']` — clave de `salud.html`, este archivo lee y escribe directo

**Cambio de arquitectura del 2026-08-02**: antes esta app solo *escribía* un registro puntual vía `registrarReceta()`. Ahora el **Registro Diario completo vive aquí** — CRUD completo (crear/editar/eliminar) de `misalud_v1.alimentos`, usando los helpers `readSalud()`/`writeSalud()` (leen/escriben el objeto completo con un default seguro, igual patrón que `rawGet`/`rawSet` del Dashboard — ver `Dashboard/readme_dashboard.md`). También lee `misalud_v1.metas` (solo lectura) para las barras de progreso del resumen del día — esas metas se configuran en `salud.html` → Perfil & Metas, no aquí.

```js
// Forma de cada alimento — idéntica a la que usaba salud.html, sin cambios
{ id, fecha:'YYYY-MM-DD', comida:'desayuno|almuerzo|cena|snack', nombre, cantidad, unidad, cal, prot, carbs, gra, notas }
```

Tres funciones escriben aquí: `registrarReceta(id,tipo)` (botón en cada tarjeta de receta), `registrarRutinaMeal(idx)` (botón en cada comida del Plan Masa Muscular), y `saveAlimento()`/`delAlimento()` (CRUD manual del Registro Diario).

## Funcionalidad clave

- **`CATEGORIA_ING`**: mapa de cada uno de los 38 ingredientes únicos a una de 6 categorías (🥚 Proteínas, 🥛 Lácteos, 🌾 Granos y carbohidratos, 🍎 Frutas, 🥦 Verduras, 🧂 Condimentos y otros). `listaSuperUnica()` recorre las 28 recetas, deduplica por nombre de ingrediente (`Set`) y `renderSuper()` los agrupa por categoría usando este mapa.
- **Checklist de compras persistente**: `toggleShop(nombre)` marca/desmarca un ingrediente en `S.comprado` y guarda; `resetShop()` limpia toda la lista (botón en la barra lateral, para reiniciar cada semana).
- **Tarjetas de receta con acento de color por tipo** (nuevo 2026-08-02): `.receta-card.t-desayuno` (borde izquierdo dorado) / `.t-cena` (borde izquierdo azul) — distinción visual rápida al hacer scroll, además del ícono de sección.
- **`registrarReceta(id,tipo)`** — botón "➕ Registrar en mi diario de hoy" en cada tarjeta de receta y en cada comida del Plan Masa Muscular (`registrarRutinaMeal`). Escribe directo en `misalud_v1.alimentos` vía `readSalud()`/`writeSalud()`. Es un registro de referencia (asume que comiste la receta tal cual); si comiste algo distinto, se edita o se borra desde el propio Registro Diario de esta misma app.
- **Registro Diario** (`renderRegistro()`): header de resumen (`reg-resumen`) con calorías del día vs. meta + 3 barras de macros; filtro por fecha (default hoy) y tipo de comida; tabla con editar/eliminar. `clearFiltrosAl()` resetea los filtros.
- **Plan Semanal** (`renderPlanSemana()`, `diasSemana()`): grid de 7 tarjetas (domingo→sábado de la semana calendario actual, mismo patrón que `semanaActual()` de Ejercicio/Dashboard), cada una con 2 "slots" (desayuno/cena). Clic en un slot abre `openPickReceta(fecha,slot)` → modal con `<select>` de las 10 recetas de ese tipo → `savePickReceta()` guarda el id elegido (o lo borra si se deja "— Sin elegir —") en `S.planSemana` y vuelve a pintar el grid. El día de hoy se resalta con borde dorado.
- **Modales/confirmación genéricos** (`mo-al` alimento, `mo-pick` elegir receta, `conf` confirmar eliminar): mismo patrón `closeMo()`/`askDel()`/`doConf()`/`closeConf()` que el resto del ecosistema — **se agregaron a este archivo el 2026-08-02**, antes no existían aquí (la app era solo lectura de recetas + checklist, no tenía ningún formulario).

## Deep-link `?s=` (2026-07-31)

`init()` lee `?s=desayunos|cenas|super` de la URL y llama a `nav(s)` si es un valor válido de `SECS` — mismo patrón que el `?tab=` de `cuidadopersonal.html`. Se agregó para que `Coach/Coach_v2.html → #rutina` y `Dashboard/dashboard.html` puedan enlazar directo a la pestaña de Desayunos o Cenas desde una tarea de la rutina (p.ej. "🍽️ Cena" enlaza a `comida.html?s=cenas`) — ver [`../Coach/readme_coach_v2.md`](../Coach/readme_coach_v2.md) → "Tareas agrupadas". `SECS` ahora incluye también `rutina`/`registro`/`planSemana`, así que `?s=registro` o `?s=planSemana` también funcionan si se quiere enlazar directo a esas secciones en el futuro.

## Rediseño de interfaz (2026-07-31, ampliado 2026-08-02)

Mismo tratamiento visual que `ejercicio.html`/`salud.html` (ver [`readme_ejercicio.md`](readme_ejercicio.md) → "Rediseño de interfaz"): sin manchas radiales de fondo, sin `backdrop-filter: blur`, sin texto con gradiente, botones sólidos sin glow. Se dejó igual el degradado de `.shop-progress .pfill` (barra de progreso de la lista del súper) — patrón funcional, no decoración genérica.

**2026-08-02**: esta app no tenía CSS de modal/formulario/tabla/confirmación/KPI (`g4`/`g3`/`g2`, `card-val`, `.mo`/`.modal`, `.fg`/`.fr`/`label`/`input,select`, `.tw`/`table`, `.conf`/`.conf-box`, `.pbar`/`.pfill` genérico, `.empty`) porque nunca los había necesitado — se agregaron todos, tomados literalmente del mismo sistema de diseño que `salud.html`/`ejercicio.html`, para que el Registro Diario y el Plan Semanal se vean consistentes con el resto del ecosistema. También se agregaron `.psem-*` (grid del Plan Semanal) y `.pm-hero` (tarjeta de perfil del Plan Masa Muscular), y el acento de color por tipo de receta (`.t-desayuno`/`.t-cena`).

## Modo oscuro/claro (2026-07-31)

Botón `.theme-toggle-btn` en el topbar (junto al aviso de "solo desayuno y cena"). Mismo mecanismo que `ejercicio.html`/`salud.html`: `--surface`/`--surface-2`/`--surface-3` reemplazan los hex sólidos del rediseño de arriba, y el resto de bordes/hovers usa el truco `--ov` (variable con el triplete RGB sin envolver, ver `../README.md`). Sin gráficas Chart.js en este archivo, así que no hizo falta ningún `cssVar()`.

## Responsivo — iPad / iPhone 15 Pro (2026-08-03)

Trabajo puramente de CSS (sin tocar JS, estructuras de datos ni claves de `localStorage`), verificado con Playwright (Chromium headless) en iPad `820×1180` y iPhone 15 Pro `393×852` (`isMobile`/`hasTouch`), abriendo el archivo directo por `file://` (no solo dentro del iframe de `cuidadopersonal.html`). Mismo criterio y misma causa raíz que en [`salud.html`](readme_salud.md) → "Responsivo — iPad / iPhone 15 Pro" (ambos archivos comparten el mismo layout de sidebar+tabs y el mismo autor, así que aplicaron las mismas trampas):

1. **`.main{min-width:0}`** — `.main` es flex item de `body{display:flex}`; sin este fix, el `min-width:auto` (default) del navegador lo dejaba crecer hasta el ancho mínimo de su contenido (tablas con `white-space:nowrap`, p.ej. la columna de fecha en 📔 Registro Diario y en las tablas de alimentos del 🥩 Plan Masa Muscular), desbordando iPhone en vez de dejar que `.tw{overflow-x:auto}` scrolleara solo la tabla.
2. **`.g4>*,.g3>*,.g2>*,.fr>*,.recetas-grid>*,.shop-grid>*,.psem-grid>*,.pm-hero>*{min-width:0}`** + `canvas{max-width:100%}` — red de seguridad para que ningún hijo de grid (tarjeta, canvas, etc.) fuerce el ancho de su columna por encima del espacio disponible, agregada como bloque nuevo antes de `</style>` junto al breakpoint de 640px existente.
3. **`.pm-hero` no tenía ningún breakpoint** — la tarjeta de perfil del Plan Masa Muscular (4 columnas fijas: peso/estatura/edad/objetivo) se mostraba en 4 columnas apretadas incluso en iPhone (393px), sin llegar a desbordar pero sí muy comprimida (el valor "Ganar masa muscular" quedaba casi ilegible). Se agregó `.pm-hero{grid-template-columns:repeat(2,1fr)}` al `@media(max-width:900px)` ya existente (mismo breakpoint que usa `.g4`/`.g3`), quedando en 2×2 tanto en iPad como en iPhone — confirmado con Playwright que las 4 celdas quedan en dos filas de 151px cada una en 393px de ancho, sin overflow.

Verificado sección por sección (`SECS` = desayunos, cenas, rutina, registro, planSemana, super) en ambos viewports: `document.documentElement.scrollWidth - clientWidth === 0` en los 12 casos, cero errores de consola. También se abrieron los 2 modales (`mo-al` alimento, `mo-pick` elegir receta) y el sidebar en modo overlay (iPhone) — mismo resultado limpio. Se re-corrió `test_comida.js` (el test funcional preexistente) sin regresiones: sigue registrando un alimento manual, una receta de Desayunos, una comida del Plan Masa Muscular, y una asignación en Plan Semanal, todo escribiendo correctamente en `misalud_v1`/`comida_v1`.

## Referencias cruzadas

- Incrustada vía `<iframe>` en [`readme_cuidadopersonal.md`](readme_cuidadopersonal.md) (subtab "Comida"). Comparte `localStorage` con el shell y con `salud.html` por el mismo origen `file://` compartido (ver `readme_cuidadopersonal.md`).
- **Escribe en `misalud_v1`** (la clave de `salud.html`) — desde el 2026-08-02 con mucha más superficie que antes (CRUD completo del Registro Diario, no solo `registrarReceta()`). Si se cambia la forma de `S.alimentos` en `salud.html` (campos `fecha`/`comida`/`nombre`/`cal`/`prot`/`carbs`/`gra`/`notas`), hay que revisar `readSalud()`/`writeSalud()` y las 3 funciones que escriben (`registrarReceta`, `registrarRutinaMeal`, `saveAlimento`) aquí también.
- El **Dashboard** (`../Dashboard/dashboard.html`) sigue sin leer `comida_v1` directamente, pero indirectamente sí le importa lo que pasa aquí: cualquier alimento registrado desde esta app (receta, Plan Masa Muscular, o manual) aparece en `misalud_v1.alimentos`, que el Dashboard sí lee (calorías de hoy, panel de Nutrición del Hero) — ver [`readme_dashboard.md`](../Dashboard/readme_dashboard.md).
- Mapa completo del proyecto: [`../README.md`](../README.md).

## Cómo usarlo

Se abre `cuidadopersonal.html` (pestaña Comida) o directamente `comida.html` en cualquier navegador, sin instalación ni servidor. No hay sincronización entre dispositivos ni botón de exportar JSON propio — el Registro Diario se respalda junto con el resto de `misalud_v1` desde el botón "⬇️ Exportar datos" de `salud.html`.

## Fix: registrar una comida dos veces duplicaba calorías sin avisar (2026-08-05)

Encontrado en una auditoría general del ecosistema pedida por Adán ("mejora todos los html, ve funciones o cosas que les falten"). `registrarReceta(id,tipo)` y `registrarRutinaMeal(idx)` hacían `push()` directo a `misalud_v1.alimentos` sin comprobar si esa receta/plan ya se había registrado hoy — un doble tap accidental (fácil en iPad/iPhone, donde esta app ya está optimizada para touch) duplicaba silenciosamente las calorías/macros, inflando tanto el Registro Diario como el panel "🥗 Nutrición de hoy" del Hero del Dashboard. Fix: ambas funciones ahora comprueban si ya existe un registro con el mismo `nombre`+`fecha`+`comida` (o, en el caso del Plan Masa Muscular, la misma `notas:'Plan Masa Muscular'` para ese bloque) antes de agregar, y si ya existe piden confirmación (`confirm()`) en vez de duplicar sin preguntar — cancelar no agrega nada, aceptar sí permite registrar la misma comida dos veces si de verdad se repitió. Verificado con Playwright: primer registro no pide nada; segundo registro de la misma receta dispara el diálogo, y cancelarlo deja el conteo en 1; cero errores de consola.
