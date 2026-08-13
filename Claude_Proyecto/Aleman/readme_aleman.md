# Alemán — A1 y A2

App de estudio de alemán de Adán, apoyo directo de dos cosas suyas: la **Maestría en Alemania** (meta de mediano plazo del Plan Maestro) y su red real de contactos en Bosch Stuttgart. Ya tiene el **Básico 5 de CENLEX Santo Tomás** acreditado — esta app cubre el A1 y A2 completos para sostener y ampliar eso por su cuenta.

Creado el 2026-08-12, en la auditoría del ecosistema: era **la única app sin ninguna documentación** (39 archivos, 0 `.md`), lo cual va contra la regla del proyecto de que cada `.html` tenga su `.md` al día.

## Qué hay

| Archivo | Qué es |
|---|---|
| `index.html` | Portada y menú de las 35 lecciones, agrupadas en **Básico (A1)** y **Elemental (A2)** |
| `a1-01` … `a1-15` | **15 lecciones A1**: saludos, números, colores, días, familia, artículos, pronombres, sein/haben, la hora, países, profesiones, comida, vivienda, transporte, pasatiempos |
| `a2-01` … `a2-20` | **20 lecciones A2**: modales, Perfekt (haben y sein), Präteritum, verbos separables y reflexivos, Kasus, comparativo, conjunciones, preposiciones, adjetivos, infinitivo, y los temas de uso (vivienda, trabajo, salud, viajes, ocio, comida, compras, medios) |
| `gramatica.html` | Referencia de gramática, transversal a las lecciones |
| `vocabulario.html` | Vocabulario consolidado |
| `principiantes.html` | Entrada para arrancar de cero |
| `flashcards.js` | Widget de tarjetas interactivas que **usan las 36 páginas** — se inicializa con `initFlashcards(id, [...])` |
| `_generar-datos-dashboard.js` | Herramienta de desarrollo (no corre en el navegador de Adán) |

Peso total: ~893 KB. Sin dependencias externas: se abre con doble clic, sin servidor.

## La pieza no obvia: `_generar-datos-dashboard.js`

El Dashboard tiene una pantalla **"🇩🇪 Alemán del día"** que muestra una lección real, distinta cada día. **No puede leerla en vivo**: Chrome bloquea tanto `iframe.contentDocument` como `fetch()` entre dos documentos `file://` distintos, así que desde `Dashboard/dashboard.html` no hay forma de acceder al contenido de `Aleman/*.html` en el navegador.

La solución es este generador: corre **una vez, offline, con Playwright**, abre cada lección como página propia (nunca como iframe, para no toparse con esa restricción), extrae su contenido real —tablas de vocabulario, diálogos, frases, ejercicios, reglas, conjugaciones y los widgets visuales de cada lección A1— y escribe `Dashboard/aleman-data.js`, que el Dashboard sí puede cargar con `<script src>`.

**El contenido del Dashboard no está escrito a mano: es texto extraído de estas lecciones.** Por eso:

> **Si agregas, quitas o editas una lección, hay que volver a correr el generador** o el Dashboard seguirá mostrando la versión vieja:
> ```
> node Aleman/_generar-datos-dashboard.js
> ```
> Requiere Node + Playwright (`npm install playwright`). Playwright **no** es dependencia del proyecto — es herramienta de desarrollo, nada de esto corre en el navegador de Adán.

El mismo patrón se usa en `Entrevistas/_generar-datos-dashboard.js`, con una diferencia: allá el contenido ya es HTML plano dentro de objetos JS, así que basta ejecutarlos en una sandbox de Node y no hace falta navegador.

## Estado y pendientes

- **Las 35 lecciones que el Dashboard referencia existen todas** (verificado en la auditoría del 2026-08-12: 35 archivos referenciados, 0 inexistentes).
- **No guarda progreso**: no hay ninguna clave de `localStorage` en toda la carpeta. Las lecciones son material de consulta, no un curso con avance registrado. Si algún día se quiere marcar "lección vista" o llevar racha, hay que agregarlo — hoy no existe.
- Por lo mismo, el Dashboard **no puede mostrar cuánto lleva avanzado** de las 35, solo la lección del día. Se propuso agregarlo el 2026-08-12 y Adán lo descartó ("ya están en otras páginas").
