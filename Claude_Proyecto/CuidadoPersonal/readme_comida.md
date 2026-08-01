# comida.html — Mi Comida: Desayunos, Cenas & Súper

Aplicación de una sola página (HTML+CSS+JS, sin backend) creada el 2026-07-30 a petición explícita de Adán ("agrega otro html con lo de comida... una interfaz de alimentos saludables que puedo cocinar sencillos, solo sería para desayuno y cena... y la lista completa de cosas que comprar en el súper"). Es contenido de referencia (recetario + lista de compras), **no** un tracker de comidas — para registrar lo que realmente comiste día a día existe `salud.html` (Registro Diario), con la que esta app se conecta directamente (ver "Integración" abajo).

**Ubicación**: vive en `CuidadoPersonal/comida.html`. Se abre normalmente **incrustada** dentro de `CuidadoPersonal/cuidadopersonal.html` → pestaña **🍳 Comida**, vía `<iframe src="comida.html">`, igual que Salud y Ejercicio. También puede abrirse directo sin pasar por el shell.

## Por qué solo desayuno y cena

Petición explícita de Adán — la comida de mediodía no vive aquí (la resuelve aparte, probablemente en ALTEN). El banner superior de la app dice esto mismo para que quede claro apenas se abre.

## Navegación (sidebar propio de este archivo)

- **🌅 Desayunos** — 10 recetas.
- **🌙 Cenas** — 10 recetas.
- **🛒 Lista del Súper** — lista consolidada y deduplicada de los 37 ingredientes únicos que se necesitan para poder cocinar las 20 recetas, agrupada en 6 categorías, con checklist persistente.

## Por qué estas recetas y no otras — a la medida real de Adán, no genéricas

Las 20 recetas (`const RECETAS`, dentro del `<script>`) no son un recetario genérico de internet — se eligieron cruzando dos fuentes de datos reales que ya existen en el proyecto:

1. **Salud Digestiva** (`salud.html` → sección "🫁 Salud Digestiva"): Adán tiene reflujo/agruras documentado. Ninguna receta usa disparadores conocidos (café, picante, cítricos, chocolate, frituras, refresco, cebolla/ajo crudos, menta) y se favorecen los alimentos que esa misma sección marca como seguros (avena, plátano, manzana, pera, pollo, pescado blanco, papa, camote, verduras cocidas, nopales, jengibre/canela, miel). El banner superior de la app y el campo `tip` de cada receta lo explican.
2. **Rutina Muscular** (`salud.html` → sección "🥩 Rutina Muscular"): la meta nutricional real de Adán (77 kg desde 2026-07-31 — antes 75 kg, ver [`readme_salud.md`](readme_salud.md) → "Actualización de peso y metas nutricionales" —, 1.78 m, 31 años, objetivo ganar masa muscular) es ~3,115 kcal y ~186 g de proteína al día. Los macros de cada receta (`r.macros`) apuntan a que desayuno + cena cubran una parte sustancial de esa meta, dejando el resto a la comida de mediodía (fuera del alcance de esta app). Las 20 recetas y sus macros individuales **no se recalcularon** — el ajuste de +280 kcal/día se absorbe en la Rutina Muscular (desayuno/comida) y en la comida de mediodía, no en este recetario.

**Sencillez real**: nada de técnicas complicadas (solo plancha, vapor, horno, sartén, licuadora) ni ingredientes difíciles de conseguir — todo se compra en cualquier súper mexicano.

## Modelo de datos — `localStorage['comida_v1']`

```js
{
  comprado: { 'Nombre del ingrediente': true }   // qué ya se marcó en la lista del súper
}
```

Las 20 recetas y sus ingredientes/pasos/macros **no** se guardan en `localStorage` — son contenido de referencia hardcodeado en `const RECETAS`, igual que la Rutina Muscular o Salud Digestiva de `salud.html`. Lo único persistido es qué ingredientes de la lista del súper ya se marcaron como comprados.

## Funcionalidad clave

- **`CATEGORIA_ING`**: mapa de cada uno de los 37 ingredientes únicos a una de 6 categorías (🥚 Proteínas, 🥛 Lácteos, 🌾 Granos y carbohidratos, 🍎 Frutas, 🥦 Verduras, 🧂 Condimentos y otros). `listaSuperUnica()` recorre las 20 recetas, deduplica por nombre de ingrediente (`Set`) y `renderSuper()` los agrupa por categoría usando este mapa — si se agrega una receta nueva con un ingrediente que no está en `CATEGORIA_ING`, cae por defecto en "Condimentos y otros" (no truena, pero conviene agregarlo al mapa).
- **Checklist de compras persistente**: `toggleShop(nombre)` marca/desmarca un ingrediente en `S.comprado` y guarda; `resetShop()` limpia toda la lista (botón en la barra lateral, para reiniciar cada semana).
- **`registrarReceta(id, tipo)`** — botón "➕ Registrar en mi diario de hoy" en cada tarjeta de receta. Escribe **directamente en `localStorage['misalud_v1']`** (la clave de `salud.html`) un nuevo alimento con la fecha de hoy, `comida:'desayuno'|'cena'` y los macros de la receta — mismo formato exacto que usa `salud.html` internamente. Es un registro de referencia (asume que comiste la receta tal cual); si comiste algo distinto, se edita o se borra desde `salud.html` → Registro Diario como cualquier otro alimento.

## Deep-link `?s=` (2026-07-31)

`init()` ahora lee `?s=desayunos|cenas|super` de la URL y llama a `nav(s)` si es un valor válido de `SECS` — mismo patrón que el `?tab=` de `cuidadopersonal.html`. Se agregó para que `Coach/Coach_v2.html → #rutina` y `Dashboard/dashboard.html` puedan enlazar directo a la pestaña de Desayunos o Cenas desde una tarea de la rutina (p.ej. "🍽️ Cena" enlaza a `comida.html?s=cenas`) — ver [`../Coach/readme_coach_v2.md`](../Coach/readme_coach_v2.md) → "Tareas agrupadas".

## Rediseño de interfaz (2026-07-31)

Mismo tratamiento visual que `ejercicio.html`/`salud.html` (ver [`readme_ejercicio.md`](readme_ejercicio.md) → "Rediseño de interfaz"): se quitaron la mancha radial de fondo, el `backdrop-filter: blur` de sidebar/topbar/card y el texto con gradiente del logo, y `.btn-w` pasó de degradado+glow a color sólido. Se dejó igual el degradado de `.shop-progress .pfill` (barra de progreso de la lista del súper) — ahí un degradado de dirección es un patrón funcional común en barras de progreso, no la decoración genérica que se pidió quitar.

## Modo oscuro/claro (2026-07-31)

Botón `.theme-toggle-btn` en el topbar (junto al aviso de "solo desayuno y cena"). Mismo mecanismo que `ejercicio.html`/`salud.html`: `--surface`/`--surface-2`/`--surface-3` reemplazan los hex sólidos del rediseño de arriba, y el resto de bordes/hovers usa el truco `--ov` (variable con el triplete RGB sin envolver, ver `../README.md`). Sin gráficas Chart.js en este archivo, así que no hizo falta ningún `cssVar()`.

## Referencias cruzadas

- Incrustada vía `<iframe>` en [`readme_cuidadopersonal.md`](readme_cuidadopersonal.md) (subtab "Comida"). Comparte `localStorage` con el shell y con `salud.html` por el mismo origen `file://` compartido (ver `readme_cuidadopersonal.md`).
- **Escribe en `misalud_v1`** (la clave de `salud.html`) vía `registrarReceta()` — es la única app del proyecto que escribe en la clave de otra app en vez de solo la propia. Si se cambia la forma de `S.alimentos` en `salud.html` (campos `fecha`/`comida`/`nombre`/`cal`/`prot`/`carbs`/`gra`/`notas`), hay que revisar `registrarReceta()` aquí también.
- El **Dashboard** (`../Dashboard/dashboard.html`) no lee `comida_v1` — no hay ninguna tarjeta ni estadística derivada de esta app ahí. Si algún día se registra una receta con `registrarReceta()`, sí impacta indirectamente lo que el Dashboard muestra de `misalud_v1` (calorías de hoy, macros del panel de Nutrición del Hero), porque ese dato vive en la clave de Salud, no en la de Comida.
- Mapa completo del proyecto: [`../README.md`](../README.md).

## Cómo usarlo

Se abre `cuidadopersonal.html` (pestaña Comida) o directamente `comida.html` en cualquier navegador, sin instalación ni servidor. No hay sincronización entre dispositivos ni botón de exportar JSON (a diferencia de Finanzas/Salud/Ejercicio) — lo único persistido es la lista de compras marcada.
