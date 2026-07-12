# Entrevistas — Automotive SW Interview Prep

App estática de una sola página (sin build, sin servidor — se abre con doble clic en `entrevistas.html`). Vive en `GITvscode/` dentro de un repo git compartido con otras carpetas del usuario.

## Estructura

- `entrevistas.html` — shell: `<head>` + markup del sidebar/header/main + `<script src>` de todos los módulos, en orden de carga.
- `styles.css` — todo el CSS (antes estaba inline en `<style>`).
- `js/core.js` — objeto `T` (metadata de cada tema: title, icon, mod, tags, hint) + `TOTAL` + helpers `toggleQuiz`/`switchTab`. **Cargar primero.**
- `js/data-*.js` — contenido enriquecido por módulo, cada uno un objeto `*_RICH` con HTML embebido como template strings. Deben cargar antes de `js/ui.js`:
  - `data-wayve.js` → `WAYVE_RICH` (plan de estudio específico Wayve)
  - `data-python.js` → `PYTHON_RICH`, `PYTHON_RICH2`, `PYTHON_RICH3`
  - `data-auto.js` → `AUTO_RICH` (arquitectura automotriz)
  - `data-proto.js` → `PROTO_RICH` (CAN/LIN/ETH/etc.)
  - `data-diag.js` → `DIAG_RICH` (UDS/OBD/DTC)
  - `data-tools.js` → `TOOLS_RICH`
  - `data-standards.js` → `STANDARDS_RICH`
  - `data-testing.js` → `TESTING_RICH` (unittest/pytest/coverage)
  - `data-git.js` → `GIT_RICH`
  - `data-devops.js` → `DEVOPS_RICH`
  - `data-metod.js` → `METOD_RICH`
  - `data-istqb.js` → `ISTQB_RICH`
  - `data-interview.js` → `INTERVIEW_RICH`
- `js/ui.js` — `buildPages()`, `go(id)`, `toggleMod`, `toggleDone`, `resetProgress`, `refreshSidebar`, `refreshProgress`, `autoOpenWayve` + código de init al final del archivo. **Cargar último** (depende de todo lo anterior).
- `estructura.md` — outline temático de referencia (documentación, no está conectado al código).

## Convenciones

- Todos los `const NOMBRE_RICH = {...}` son objetos planos en scope global (scripts clásicos, no ES modules), por eso el orden de `<script src>` en `entrevistas.html` importa.
- Cada entrada de contenido dentro de un `*_RICH` tiene su key alineada con un id del objeto `T` en `core.js`.
- Los archivos `data-*.js` cierran con el comentario `};  // fin NOMBRE_RICH` — útil como ancla de búsqueda al editar.

## Al hacer cambios

- Para editar un tema puntual: identifica el módulo (`mod` en `T`) y edita solo el `js/data-*.js` correspondiente — no hace falta tocar `entrevistas.html` ni los demás archivos.
- Para agregar un tema nuevo: añadir entrada en `js/core.js` (objeto `T`) + contenido en el `data-*.js` del módulo correspondiente.
- No hay build ni bundler: los cambios se ven recargando `entrevistas.html` directamente en el navegador.
