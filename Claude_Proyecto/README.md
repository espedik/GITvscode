# Claude_Proyecto — Mapa maestro

El índice de todo lo que vive en `Claude_Proyecto/`: qué apps hay, dónde están sus datos y cómo
se conectan. Se lee **antes** de tocar cualquier archivo. El detalle de cada app está en su
propio `readme_<app>.md`; **las reglas de trabajo están en [`../CLAUDE.md`](../CLAUDE.md)** y no se
repiten aquí.

## Propósito

Adán, 2026-08-07: *"Tú existes para hacer la mejor versión de mí, para eso es el dashboard. Mi
meta es ser millonario."* Todo lo que se construye aquí sirve a esa meta —salud, disciplina,
habilidades, negocio y dinero— con el objetivo codificado de **$1,000,000 de patrimonio líquido
para el 01/01/2030** (Plan Maestro de Coach, Mis Metas del Dashboard).

En la práctica: cuando pide algo, se usa **todo lo que el proyecto ya sabe de él** (fases del
plan, cifras, rutina, salud) para que el resultado lo haga avanzar, y se distingue siempre el dato
documentado de lo que haría falta que él diga. **Nunca se inventan cifras, fechas ni hechos.**

**Trazabilidad**: cada `.html` tiene su `readme_<nombre>.md` (excepción: este `README.md`), que es
el mapa de esa app —estructura, modelo de datos, funciones clave, referencias cruzadas— y se
actualiza en el mismo cambio que el `.html`.

## Qué es esto

Apps web de una sola página (HTML + CSS + JS, **sin backend ni build**) que se abren con doble
clic (`file://`). En ese esquema el navegador trata todo `file://` como **un solo origen**, así que
**`localStorage` se comparte entre carpetas**: el Dashboard lee lo que guardó cualquier otra app sin
sincronización. Eso hace que **los nombres de las claves sean un contrato entre archivos**: cambiar
uno sin avisar rompe la integración en silencio. `<script src="../otra/archivo.js">` también
funciona desde `file://` (scripts clásicos sí, módulos ES no), y en eso se apoya el maestro.

## Mapa de carpetas

| Carpeta | Archivo | Readme | Qué es |
|---|---|---|---|
| `Dashboard/` | `dashboard.html` | [`readme_dashboard.md`](Dashboard/readme_dashboard.md) | Panel central: 9 pantallas que agregan todo (Mi Día, Plan Maestro, Mis Metas, Habilidades Base, En qué invertir tu tiempo, Lista de Compras, Alemán, Entrevista, Hábitos) |
| `Dashboard/` | `datos-maestros.js` | [`DATOS-MAESTROS.md`](Dashboard/DATOS-MAESTROS.md) | **No es una app: es la fuente única de variables del proyecto** (constantes, seed de deudas, migraciones, rutina, fases, recetario, rutinas de piel y pelo, suplementos, peso…). Lo cargan Dashboard, Coach, Finanzas y las de CuidadoPersonal. **Su `.md` es el índice del proyecto** |
| `Dashboard/` | `verificar-sincronia.js` | — | Comprueba que nada esté duplicado ni desincronizado. Sale 1 si falla; un hook lo corre al final de cada turno |
| `Coach/` | `Coach.html` | [`readme_coach.md`](Coach/readme_coach.md) | Coach de vida y negocio: diagnóstico, Plan Maestro por fases, rutina diaria, aprendizaje, legal, ideas de negocio con cifras |
| `Finanzas/` | `Finanzas.html` | [`readme_finanzas.md`](Finanzas/readme_finanzas.md) | Finanzas reales: transacciones, deudas, metas, GBM, BTC, indicadores. **Fuente de los saldos** |
| `CuidadoPersonal/` | `cuidadopersonal.html` | [`readme_cuidadopersonal.md`](CuidadoPersonal/readme_cuidadopersonal.md) | Shell de 8 áreas: Skincare, Cabello, Dentista, Ojos (nativas) y Salud, Ejercicio, Comida, Vestimenta (iframes). Con `embed.js`, `cabecera.js`, `vidrio.css` |
| `CuidadoPersonal/` | `salud.html` | [`readme_salud.md`](CuidadoPersonal/readme_salud.md) | Cuerpo y bienestar: peso e IMC por edad, chequeo del año, exámenes, postura, mente, suplementos |
| `CuidadoPersonal/` | `ejercicio.html` | [`readme_ejercicio.md`](CuidadoPersonal/readme_ejercicio.md) | La sesión de hoy con series marcables, cronómetro y progresión; biblioteca de 62 ejercicios; deportes |
| `CuidadoPersonal/` | `comida.html` | [`readme_comida.md`](CuidadoPersonal/readme_comida.md) | Recetario (12 + 12) con fichas y filtros, y Plan Masa Muscular |
| `Aleman/` | 41 lecciones, `vocabulario.html`, `vocab-*.js` | [`readme_aleman.md`](Aleman/readme_aleman.md) | Lecciones A1/A2/Kapitel 10 y el vocabulario (1 516 palabras) que el Dashboard carga de aquí |
| `Entrevistas/` | `entrevistas.html`, `js/` | [`readme_entrevistas.md`](Entrevistas/readme_entrevistas.md) + `CLAUDE.md` | 229 temas de preparación técnica; los 41 de Python viajan al Dashboard por un generador |
| `Vestimenta/` | `vestimenta.html`, `vestimenta_*.js` | [`readme_vestimenta.md`](Vestimenta/readme_vestimenta.md) | Guía de guardarropa: qué ponerse, colorimetría, qué comprar. Incrustada en el shell |
| `Aeroresinas/` | `aeroresinas.html`, `dossier.html`, `datos.js` | [`readme_aeroresinas.md`](Aeroresinas/readme_aeroresinas.md) | Web pública del taller de reparación de helicópteros del papá de Adán, con su PDF |
| `Heliescala/` | `heliescala.html`, `dossier.html`, `datos.js` | [`readme_heliescala.md`](Heliescala/readme_heliescala.md) | Web pública de réplicas en resina, el otro negocio; independiente de Aeroresinas |
| `Posts/` | `posts.html`, `plantillas.js` | [`readme_posts.md`](Posts/readme_posts.md) | Plantillas de publicación (LinkedIn, Facebook, WhatsApp) para las dos empresas: siete pilares por semana, armados con los `datos.js` de Aeroresinas y Heliescala |
| `Negocio/` | `plantilla-vs-saas.md` | — | Documento de decisión (ago-2026) sobre convertir el ecosistema en producto |

Aeroresinas y Heliescala son páginas para clientes: no guardan estado más allá de tema e idioma y
no dependen del Dashboard; la barra de apps del Dashboard las agrupa aparte.

## Registro de claves `localStorage`

| Clave | La escribe | Quién más la lee |
|---|---|---|
| `finanzasmx_v2` | `Finanzas.html` y las migraciones de `datos-maestros.js` | Dashboard (`D.fin`), Coach (progreso real vs. inicio de fase) |
| `finanzasmx_v2_v` y banderas `finanzasmx_v2_*` | `Finanzas.html`, `datos-maestros.js`, Dashboard | Marcan seed y migraciones ya aplicadas |
| `misalud_v1` | `salud.html` (todo) y `comida.html` (**solo** `alimentos`) | Dashboard (`D.sal`); los dos se leen entre sí |
| `mirutina_v1` (+ banderas `mirutina_v1_*`) | `ejercicio.html`; las migraciones también en Dashboard | Dashboard (`D.gym`: rutina y sesiones) |
| `comida_v1` | `comida.html` (`elegidas`) | nadie |
| `skincare_v1`, `cabello_v1` | `cuidadopersonal.html` | Dashboard (`D.sk`, `D.ca`, solo el perfil) |
| `dentista_v1` | `cuidadopersonal.html` | nadie |
| `coach_rutina_v1` | Coach y Dashboard (`completado[hoy]` desde *Marcar el bloque actual*) | ambos |
| `coach_checks_v1` | Coach (todos los `.check-item`) y Dashboard (solo los ids `sN-M` del checklist de fase y `mtc7`…`mtc9`) | ambos |
| `radarp_<id>` × 12 | Coach | Dashboard (`SK[].val`) |
| `coach-theme` | Dashboard, Coach, Finanzas, CuidadoPersonal y Vestimenta | Clave compartida de tema claro/oscuro (Entrevistas, Heliescala y Aeroresinas tienen la suya) |
| `dash-eventos-mes-v1`, `dash-lista-compras`, `dash-lista-tengo`, `dash-logros-v1`, `dash-habitos-v1`, `dash-rail-abierto`, `dash-settings`, `dash-privado`, `metas_checklist_v1`, `habilidades_checklist_v1`, `edad_checklist_v1`, `examen_genai_v1` | Dashboard | nadie |
| `al_sec_v1`, `al_sub_v1`, `al_fam_v1`, `al_niv_v1`, `al_plg_v1`, `al_vista_v1` | `Aleman/vocab.js` (las dos pantallas de vocabulario) | — |
| `vestimenta_v1` | Vestimenta | nadie |
| `theme`, `sidebar-collapsed`, `study-done-v2`, `wayve-visited-v2` | Entrevistas | nadie (fuera del ecosistema) |
| `heli-tema`, `heli-idioma`, `aero-tema`, `aero-idioma` | Heliescala, Aeroresinas | nadie |
| `posts-empresa`, `posts-ediciones-v1`, `posts-publicados-v1` | Posts (pestaña elegida, textos editados, posts marcados como publicados) | nadie |

Si se añade una app o una clave, decidir explícitamente si el Dashboard debe leerla (`loadAll()`)
y actualizar esta tabla.

## Cómo se conectan

1. **El Dashboard lee todo y escribe en dos claves ajenas** (`coach_rutina_v1.completado[hoy]` y
   `coach_checks_v1[id]`, con `rawGet`/`rawSet` que preservan el resto del objeto). Cambiar la
   *forma* de los datos de una app puede romper un cálculo suyo en silencio: revisar
   `readme_dashboard.md` antes.
2. **Toda variable compartida vive en `datos-maestros.js`** —constantes, seed de deudas,
   migraciones, `RUTINA_TASKS`, `PHASES`, `SK`, `APRENDIZAJE`, `RECETARIO` → `LISTA_COMPRAS`,
   `RUTINA_PIEL`/`RUTINA_PELO`/`SUPLEMENTOS`, `PESO`, `CHEQUEO`, `BTC_SEED`— y las apps la piden con
   `CIFRAS.*`. La prosa escribe `{{marcadores}}` que resuelven `CIFRAS.aplicarDOM()` (HTML
   estático) o `cifrarLiterales()` (constantes JS del Dashboard). `GYM_RUTINA_DEFAULT` del
   Dashboard es el único respaldo local, sincronizado por el verificador.
3. **El shell de CuidadoPersonal incrusta cuatro apps por `<iframe>`** (nombres globales que
   colisionarían) y habla con ellas **por `postMessage`** (`embed.js`): con `file://`
   `iframe.contentDocument` es `null`.
4. **`comida.html` escribe en la clave de `salud.html`** (`misalud_v1.alimentos`) con
   `readSalud()`/`writeSalud()`; Salud la preserva pero no la edita.
5. **Toda migración de `finanzasmx_v2` y de `mirutina_v1` existe en las dos apps** que la
   necesitan, con la misma bandera: la primera que Adán abra la aplica. Las de saldo van al
   maestro, no a cada app. Una deuda que no existió se borra, no se pone en $0.
6. **Coach, Finanzas y las de CuidadoPersonal enlazan de vuelta al Dashboard** con un botón
   `.theme-toggle-btn` (🚀) junto al de tema; el Dashboard enlaza a todas desde su barra de apps.
   Una app nueva necesita las dos cosas.
7. **Fechas**: Coach, Finanzas y las apps de CuidadoPersonal usan `today() = toISOString().slice(0,10)`
   (**UTC**: en México el día cambia a las 18:00). El Dashboard usa **fecha local** en lo que
   escribe él (`hoyLocal()`, `hoyISO()` de `habitos.js`). Al cruzar claves entre apps, tener las
   dos convenciones presentes.

## Diseño

Cada app tiene su identidad y todas comparten el tema claro/oscuro por `coach-theme`, Inter para
el cuerpo y Space Grotesk para las cifras, y el truco **`--ov`** (el triplete RGB de las
superposiciones, `255,255,255` u `0,0,0`, usado como `rgba(var(--ov),.NN)`) para que bordes y
hovers se inviertan con el tema. La dirección del override varía: Coach y Finanzas son claras por
defecto (`[data-theme="dark"]` es el override); Dashboard, CuidadoPersonal, Heliescala y las
pantallas de Skincare/Cabello son oscuras por defecto (`[data-theme="light"]`).

- **Dashboard**: screensaver de comando (manchas animadas, vidrio); lenguaje "consola" en
  Habilidades Base, Mis Metas y el panel de detalle.
- **Coach**: consola cian + verde ácido.
- **Finanzas**: `.fx-*` y el instrumento `.btcx-*`.
- **CuidadoPersonal**: barra de vidrio + carril de iconos, `vidrio.css` como material único.
- **Chart.js** solo lo usan Salud y Finanzas, y **no entiende `var(--x)`**: los colores se
  resuelven con `cssVar(n)` y se repinta la gráfica activa al cambiar de tema. Coach, Ejercicio,
  Vestimenta y el Dashboard dibujan lo suyo en HTML/SVG/canvas propio.
- **Nunca `*/` dentro de un comentario CSS**: cierra el comentario y rompe el siguiente selector
  sin error.
- Los rediseños se acuerdan en `diseno-<tema>/` (Main + direcciones descartadas) antes de tocar
  el HTML; Adán elige viendo.
- Se verifica en navegador con Playwright a **1600 y 390 px** (y 1366/1024 si es layout), en los
  dos temas, midiendo geometría, desbordes y consola.
