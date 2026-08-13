# GITvscode — el ecosistema personal de Adán

Repositorio personal de Adán Arturo Martínez. Ingeniero en Mecatrónica (IPN), 6 años en testing automotriz (Ford, Continental, Bosch, Google), hoy en ALTEN. **Meta central: $1,000,000 MXN de patrimonio líquido para 2030.**

Todo lo que hay aquí existe para eso: un conjunto de apps HTML que llevan su plan, su dinero, su cuerpo y su formación, más su práctica real de código.

Creado el 2026-08-12 — la regla del proyecto pedía un README maestro en la raíz desde hace tiempo y nunca se había escrito. Quien abría el repo veía 3 carpetas sueltas sin nada que explicara qué eran.

## Las 3 carpetas de la raíz

| Carpeta | Qué es |
|---|---|
| **`Claude_Proyecto/`** | El ecosistema de apps. Es el grueso del repo y lo que se trabaja a diario. |
| **`Ejercicios_Python/`** | Su práctica real de Python: 94 archivos entre diccionarios, listas, strings, bucles, condicionales, una guía con exámenes tipo Amazon, y `test_Honeywell/` (APU, tren de aterrizaje, control de oxígeno — práctica de entrevista de tema aeroespacial). **Hoy está desconectado del ecosistema**: ninguna app sabe que existe, aunque Coach mida "Código" como habilidad y haya una app de Entrevistas. |
| **`Claude/`** | Configuración de Claude Code (`CLAUDE.md` + skills). No es contenido del proyecto. |

## Las apps (`Claude_Proyecto/`)

Todas son **HTML de un solo archivo, sin build ni servidor**: se abren con doble clic. Guardan en `localStorage`. Sin dependencias externas salvo las que se indican.

| App | Qué hace | Peso |
|---|---|---|
| **`Dashboard/dashboard.html`** | La pantalla central, tipo JARVIS: 8 slides en carrusel (Mi Día, Plan Maestro, Mis Metas, Habilidades Base, Habilidades de Coach, Lista de Compras, Alemán del día, Python del día). Es la única que **lee datos de todas las demás**. | 2.1 MB |
| **`Coach/Coach_v2.html`** | Plan Maestro por fases hacia el millón, radar de 12 habilidades, rutina semanal, plantillas y aprendizaje. | 584 KB |
| **`Finanzas/Finanzas.html`** | Dinero real: transacciones, deudas, inversiones, metas, fondo de emergencia, proyecciones. Es la fuente de todas las cifras de dinero del ecosistema. | 364 KB |
| **`CuidadoPersonal/`** | 4 apps: `cuidadopersonal.html` (contenedor), `salud.html`, `ejercicio.html` (rutina de gym y deportes) y `comida.html` (recetario, registro diario, plan semanal). | 552 KB |
| **`Entrevistas/entrevistas.html`** | Preparación técnica: 229 temas en 21 módulos (testing, ISTQB, Python, IA, DevOps, sistemas, Git…). | 2.6 MB |
| **`Aleman/`** | 35 lecciones A1 y A2 + gramática y vocabulario. Ver `Aleman/readme_aleman.md`. | 897 KB |
| **`Vestimenta/vestimenta.html`** | Guía de guardarropa por prenda y por ocasión, con imágenes locales. | 12 MB |

**Cada app tiene su `readme_*.md` al lado**, con el historial completo de por qué está como está — esos son la documentación de verdad; este archivo solo es el índice.

## Lo que hay que saber antes de tocar algo

**1. Hay datos duplicados a mano, a propósito.** Como las apps son archivos sueltos que no se importan entre sí, varias estructuras están copiadas: `RUTINA_TASKS` (Coach ↔ Dashboard), la rutina de gym (`ejercicio.html` ↔ Dashboard), las recetas, la lista del súper, los libros. **Si cambias una, hay que replicar la otra a mano.** Cada copia lo dice en un comentario junto a la constante.

**2. El dato guardado le gana al código.** Las apps leen su estado de `localStorage`, así que cambiar un valor por defecto en el código **no** actualiza un navegador que ya lo tenía guardado. Para eso existen las funciones `fix*IfNeeded()`: migraciones de una sola vez, con bandera propia, que respetan lo que el usuario ya haya personalizado. **Si cambias un default, casi siempre necesitas una migración — y si ya existe una, hay que subirle la versión a la bandera** (`..._v2`, `_v3`) o no volverá a correr.

**3. Dos generadores producen archivos que no se editan a mano:**
- `Aleman/_generar-datos-dashboard.js` → `Dashboard/aleman-data.js` (necesita Playwright)
- `Entrevistas/_generar-datos-dashboard.js` → `Dashboard/entrevistas-data.js`

Si cambias una lección o un tema, hay que volver a correr el generador o el Dashboard se queda con la versión vieja.

**4. Nada de contenido inventado.** El criterio de todo el proyecto: los números vienen de sus datos reales (Finanzas, su ticket del súper, sus recetas), y lo que es estimación se marca como tal. Si un dato no existe, la app dice "sin medir" en vez de mostrar un cero que parezca real.

## Estado de la documentación

Al 2026-08-12, tras la auditoría: **0 enlaces internos rotos**, las 10 apps con CSS y HTML balanceados, todas las imágenes locales presentes, las estructuras duplicadas verificadas en sincronía, y **todas las apps con su `readme_*.md`**.
