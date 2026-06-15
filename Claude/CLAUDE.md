# Proyecto Claude — VSCode

## Skill activa: python-app-developer

Este proyecto usa la skill **python-app-developer** para desarrollo de aplicaciones Python con interfaces modernas.

Cuando el usuario pida crear apps, páginas web, dashboards, herramientas o cualquier aplicación con Python, usa la skill `python-app-developer` que guía la selección del framework correcto y los patrones de código.

## Stack preferido

### Apps de escritorio
- **CustomTkinter** — apps de escritorio modernas (tema oscuro por defecto)
- **PyQt6 / PySide6** — herramientas profesionales con tablas, gráficas, paneles
- **Dear PyGui** — dashboards en tiempo real con gráficas a 60fps

### Páginas web y web apps (100% Python, código libre)
- **Streamlit** — dashboards y páginas web interactivas rápidas (`streamlit run app.py`)
- **NiceGUI** — interfaz web bonita desde Python puro, se abre en el navegador
- **FastAPI + Jinja2** — web apps con backend real, formularios y CRUD
- **Gradio** — demos interactivos y formularios con UI automática
- **Dash** — dashboards analíticos con gráficas interactivas (Plotly)
- **Django** — web apps completas con ORM, admin, autenticación
- **Flask** — páginas web ligeras y APIs REST
- **Reflex** — web apps full-stack sin JavaScript
- **Panel / Solara** — apps reactivas con datos

## Reglas del proyecto

- Siempre generar código completo y ejecutable (sin placeholders)
- Incluir instrucciones de instalación (`pip install ...`) al inicio del código
- Usar tema oscuro por defecto en todas las interfaces
- Agregar threading para operaciones lentas (nunca congelar la UI)
- Incluir validación de formularios y feedback al usuario
- Agregar al menos 2-3 mejoras UX proactivas no pedidas explícitamente
- Usar Tailwind CSS (CDN) para estilos en apps web
