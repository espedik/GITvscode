# cuidadopersonal.html — Cuidado Personal (shell)

Página "hub" (HTML+CSS+JS, sin backend ni dependencias) con **8 áreas** en una barra: cuatro
**nativas**, construidas en este archivo —🧴 Skincare, 💇 Cabello, 🦷 Dentista, 👁️ Ojos y Vista—
y cuatro **apps completas incrustadas** en `<iframe>` —🥗 Salud, 🏋️ Ejercicio, 🍳 Comida,
👔 Vestimenta (la única fuera de esta carpeta, `../Vestimenta/vestimenta.html`)—.

> Referencia, no diario. Historial en `git log -p -- Claude_Proyecto/CuidadoPersonal/`.

Este archivo documenta el shell, sus tres piezas compartidas (`embed.js`, `cabecera.js`,
`vidrio.css`) y las cuatro áreas nativas. Las incrustadas tienen su readme:
[`readme_salud.md`](readme_salud.md), [`readme_ejercicio.md`](readme_ejercicio.md),
[`readme_comida.md`](readme_comida.md), [`../Vestimenta/readme_vestimenta.md`](../Vestimenta/readme_vestimenta.md).

## Por qué `<iframe>` y no fusionar

Las apps incrustadas comparten nombres globales (`KEY`, `RENDERS`, `SECS`, `STITLE`, `load`,
`save`, `today`, `nav`…). Concatenarlas rompería con "Identifier ya declarado"; cada una en su
iframe conserva el 100 % de su código. **Todas comparten `localStorage`** porque se abren con
`file://` (mismo origen que el Dashboard); `comida.html` incluso escribe en `misalud_v1`.

**Con `file://` Chrome trata cada archivo como origen distinto: `iframe.contentDocument` es
`null`.** El shell no puede leer ni escribir dentro de un iframe; el único canal es
`postMessage` (abajo).

## Navegación

`mainTab(tab)` alterna `.active` entre los 8 `.tab-btn` (`data-tab`) y las 8 `.view`
(`#view-<tab>`). Los cuatro iframes cargan su `src` **perezosamente** la primera vez y no se
recargan al cambiar de pestaña. `__vApp(ruta)` arma el `src` con `?embed=1&v=<hora de la
sesión>`: con `file://` Chrome sirve el documento del iframe desde caché sin revalidar, y sin la
versión un cambio en la app embebida no se veía hasta Ctrl+Shift+R (los `.js` ya se piden con
`?v=Date.now()` desde dentro, pero el HTML que los contiene no puede versionarse a sí mismo).

**Deep-link `?tab=`** con las 8 pestañas válidas (`skincare|cabello|salud|ejercicio|comida|dentista|ojos|vestimenta`);
así enlaza el Dashboard. Fuera de la lista cae en Skincare.

Tema claro/oscuro con `.theme-toggle-btn` en la barra (clave compartida `coach-theme`); el enlace
al Dashboard (`#btnVolverDash`, 🚀) es otro botón de esa clase, junto al de tema, **fuera** de la
fila de pestañas: es la única vía de regreso. `toggleTheme()` empuja el tema a los iframes **por
postMessage** (`{tipo:'tema'}`), no por `contentDocument`.

## La barra y el carril

Diseño elegido en [`diseno-carril/`](diseno-carril/) (C, el carril mínimo de iconos, frente a
A con nombres y B todo lateral); la barra de vidrio, en `diseno-shell/`.

- **La barra**: las 8 áreas con icono SVG y el color que cada una ya tenía, 56 px de vidrio al
  10 %. **Las auroras de color cruzan justo detrás** (`body::before`, 280 px de alto): un velo
  blanco sobre negro plano sigue siendo negro; eso es lo que se lee como cristal.
- **El carril** (`#carril`): las secciones del área activa a la izquierda, 80 px, velo al 2.8 %,
  el nombre del área arriba en su color y cada sección como icono de trazo de 18 px con el
  nombre debajo a 9 px (hasta tres líneas, 60 px de ancho). Un filete separa los grupos del menú
  de la app. Sin secciones —Skincare y Cabello caben enteras en una pantalla— el carril no
  aparece y el contenido gana los 80 px.
- El `body` es una rejilla `auto minmax(0,1fr)` × `56px minmax(0,1fr)`: la barra cruza arriba, el
  carril va en la columna 1 y **las ocho `.view` comparten la celda de la columna 2** (solo una
  visible), así que no se movió el HTML de ninguna área.
- **Bajo 900 px** el carril pasa a una tira con scroll bajo la barra (47 px) con el nombre del
  área como ancla y las secciones en línea con su icono.
- Los iconos de sección viven en `CARRIL_ICONO`, clave `area/id`. Una sección sin icono (las
  guías de Dentista y Ojos se generan solas) lleva su número en un círculo. Los nombres de
  Salud se acortaron en su propio menú para caber bajo el icono.

Se verifica a 1600, 1366 y 390 px en las 8 áreas y los 2 temas: carril de 80 × (alto − 56) donde
hay secciones, vista activa desde x = 80, ningún nombre cortado, el clic en el carril cambia la
sección dentro del iframe, cero errores de consola.

## El canal: `embed.js`

Lo cargan las cuatro apps externas. **Sin `?embed=1` no hace nada** (siguen abriéndose solas
con su carril y cabecera). Con él:

- Oculta `.sidebar` y `.topbar` de la app y quita el `margin-left` de `.main`.
- Publica sus secciones **leídas de su propio menú** (`.nav-item`; `g` es el `.nav-label` del
  grupo que las precede, y es lo que el carril convierte en filetes): añadir una sección en la
  app la hace aparecer en el carril sin tocar nada más.
- Protocolo: app → shell `{tipo:'listo', secciones:[{id,n,g}], activa}` y `{tipo:'seccion', activa}`
  (navegó por su cuenta); shell → app `{tipo:'ir', seccion}` y `{tipo:'tema', tema}`.

Dentista y Ojos, que construyen su menú con `guiaEnSecciones()`, lo publican al carril con
`guiaAlCarril()`: pulsar en el carril **pulsa el botón original**, así que la lógica de
navegación sigue siendo una; su menú queda en el DOM con `display:none`. Los nombres se cortan
en el guion (*"Ojo seco — el problema…"* → *"Ojo seco"*).

## El material: `vidrio.css`

No reescribe componentes: **redefine las variables de superficie que las ocho apps ya usaban**
(`--surface`, `--surface-2`, `--surface-3`, `--border`) y añade el desenfoque; va después del
`<style>` de cada app para ganar por orden. Un solo negro `#06080c` y tres pesos de velo (5 %,
4.5 %, 2.8 %); `backdrop-filter` en `.card` y los `*-card` con una línea de luz de 1 px
arriba; auroras en `body::before` **apagadas con `html.embebida`** (dentro del shell las pinta
él); en claro el velo se vuelve casi sólido (90 %) y separa la sombra de 1 px. Cada área conserva
su acento: rosa Skincare, ámbar Cabello, verde Salud, naranja Ejercicio, amarillo Comida, menta
Dentista, azul Ojos, tierra Vestimenta. También aplica **Space Grotesk** a las clases de cifra
que cada área ya tenía. **La aurora va detrás con `z-index:-1` y no toca el `position` de
nadie** (un `body > * {position:relative}` pisaba el `position:fixed` de los modales).

## La cabecera común: `cabecera.js`

`cpCabecera('#cp-cab', { area, ojo, titulo, sub, kpis:[{v,k},…] })`: el `area` decide el acento,
el resto lo pone quien llama; **la hoja no inventa datos ni los guarda**. Las ocho abren con
título y 3-4 KPIs reales:

| Área | KPIs |
|---|---|
| Skincare | racha de SPF, semana del retinoide, costo al mes |
| Cabello | racha de minoxidil (las dos dosis), mes de minoxidil, costo al mes |
| Salud | suplementos de hoy, racha, exámenes pendientes, último peso con IMC |
| Comida | meta de proteína (del maestro), meta de kcal, recetas |
| Dentista | meses desde la limpieza, cepillados al día, cada cuánto revisar |
| Ojos | horas de pantalla, horas al volante, la regla 20-20-20 |
| Vestimenta | prendas marcadas, fases de compra, ocasiones cubiertas |

En Vestimenta la cabecera va **fuera de `#content-root`** (la app vacía ese nodo en cada
navegación) y `save()` la repinta; su estado es `{marcados:[…]}`, un array.

## Skincare y Cabello — la misma pantalla

Las dos vistas nativas comparten esqueleto: **cabecera → la semana → las dos rutinas → botiquín ·
reglas · matriz → aviso legal**, mismos tamaños y ritmo; lo único que las distingue es la paleta
(rosa en piel `--pl-*`, ámbar en pelo `--pe-*`). Sin menú lateral: caben enteras en una pantalla.
El cuerpo es **un solo grid de dos columnas** (`.pl-rutinas`/`.pe-rutinas` con `.pl-col`/`.pe-col`):
rutina de día + botiquín a la izquierda, rutina de noche + reglas + matriz a la derecha — en dos
filas, la noche del pelo (2 pasos) frente al día (9) dejaba media pantalla en blanco.

1. **La semana** (`#pl-semana` / `#pe-semana`): 7 tarjetas, hoy marcado; debajo, los puntos de
   las rutinas de ese día, que en hoy se marcan de un clic. Tocar un día muestra su rutina
   (`plVerDia`/`peVerDia`, `peDiaVisto` = null es hoy): los pasos de otro día van en gris,
   `.solo-lectura` y no se marcan —marcar el sábado el martes guardaría el hecho en la fecha de
   hoy—, con *← volver a hoy*. En el pelo la tira **cambia** (Pilexil unos días, CeraVe y
   mascarilla el sábado, solo agua otros, "+ CeraVe al nadar" el miércoles); en la piel **no
   cambia ni un día**, y esa es la información: por eso cada columna muestra su conteo (`2 DE 2`).
   Bajo 920 px las 7 columnas pasan a 7 tiras de una línea.
2. **Las dos rutinas lado a lado**, con insignia de estado (`COMPLETA`, `2 DE 3`, `A LAS 22:30`)
   y las horas de `CIFRAS.rutina()` (cambian entre semana, sábado y domingo). Cada paso se
   marca con un clic y alimenta racha y semana. Los tiempos de espera van como **banda debajo
   del paso**: 20 minutos entre la doble limpieza y el adapaleno; **4 horas** tras el minoxidil
   (mojarse antes arrastra la dosis). En el pelo, la de día agrupa ducha → pelo húmedo → cuero
   seco → **la pastilla** (`PE_MOMENTOS`; el Avodart es lo único que no se aplica en el pelo y
   tiene momento propio, con un `aviso` que no cuenta como paso: receta, fuera de indicación,
   **parte el PSA a la mitad** — por eso `CHEQUEO.psa` es `prioritario`).
3. **Tu botiquín**: lo que dura cada bote, el costo al mes y **cuántos días quedan** (rojo bajo
   14); un clic en los días marca que abrió uno hoy, otro lo quita.
4. **Las reglas** numeradas (*las que sí mueven la aguja* / *lo que arruina el resultado*, donde
   el shedding del mes 2-4 es el error nº 5 y la caída notoria reciente abre la lista con marca
   de aviso) y **qué puede ir con qué** como matriz: en la piel, ingredientes; en el pelo,
   horarios (mojarse dentro de las 4 h) y sustituciones (Darrow en lugar de Pilexil, mascarilla
   en lugar de acondicionador, nunca los dos champús medicados el mismo día).

**Los productos no viven aquí**: `CIFRAS.RUTINA_PIEL` y `CIFRAS.RUTINA_PELO` de
`datos-maestros.js`, la misma fuente que la rutina del Dashboard. La lista de la compra, el
botiquín y el costo mensual son getters sobre ellos; los **controles 11 y 12** del verificador
comprueban nombre y momento/día contra `RUTINA_TASKS`. **Un producto por necesidad, sin
alternativas** (*"si no al final no compraré nada"*), con el mismo nombre en rutina, guía y
compra. El minoxidil tópico conserva `id:'minoxidil'` aunque cambie de marca: `RUTINA_PELO.dia()`,
`dosisMinoxidil` y la banda de las 4 horas lo buscan por ese id. El perfil ajusta consejos y
avisos, no la marca del bote.

```js
// localStorage['skincare_v1']
{ perfil:{ tipo, preocupaciones:[], rasurado, presupuesto, notas },
  retinoideDesde:'2026-06-01'|null,                                  // semana y peldaño
  hechos:{ '2026-09-01':{ am:['limpiador','niacinamida','spf'], pm:[…] } },
  abierto:{ spf:'2026-08-01', … } }                                  // cuándo abrió cada bote
// localStorage['cabello_v1']
{ perfil:{ tipo, grosor, cuero, preocupaciones:[], caidaPatron, presupuesto, notas },
  minoxidilDesde:'2026-05-01'|null,                                  // mes y fase
  hechos:{ '2026-09-01':{ pasos:['agua','champu'], minox:[0,1] } },   // las 2 dosis en UN sitio
  abierto:{ minoxidil:'2026-08-13', … } }
```

Las dos dosis de minoxidil se guardan solo en `hechos[iso].minox`: el paso de la rutina, el punto
de la tira y la racha son la misma cosa. La racha exige **las dos** dosis — una sola es justo el
error que hace concluir "no me funcionó".

**Tema oscuro-primero**: los tokens `--pl-*`/`--pe-*` base son los del oscuro y el claro los
redefine bajo `[data-theme="light"]`. Contraste medido componiendo **toda** la pila de capas
translúcidas (una sola capa da falsos negativos): peor caso 4.93:1 / 5.45:1 en piel y 4.95:1 /
4.90:1 en pelo, sobre texto de 7.5-10 px. Las variables del azul del pelo se llaman
`--pe-ag-bg` / `--pe-ag-br`: mal escritas no fallan, simplemente no pintan.

## Dentista — `localStorage['dentista_v1']`

Perfil + guía en una sola vista, tema menta/azul/coral bajo `#view-dentista`, menú lateral de
`guiaEnSecciones()` publicado al carril.

```js
{ perfil:{ aparato:'no'|'brackets'|'alineadores'|'retenedor'|'placa_nocturna',
           frecuencia:6,                 // meses entre chequeos: 4|6|12
           ultimoChequeo:'YYYY-MM-DD',   // vacío = sin datos, no se inventa
           preocupaciones:['sensibilidad'|'sangrado'|'bruxismo'|'mal_aliento'], notas:'' } }
```

`deDefault()` arranca vacío (no se precargó perfil). **`deProximaCita()`**: si hay
`ultimoChequeo`, próxima = último + frecuencia meses y días restantes (negativo = atrasada); si
no, `{tieneDatos:false}` y la guía lo dice. **"✅ Fui al dentista hoy"** (`deRegistrarCita()`)
escribe `ultimoChequeo = today()`.

`deRenderGuiaContent()` pinta, en orden: hero con chips (`deResumenChips()`; cita en menta si en
regla, coral si atrasada) · formulario (`#de-form-card`, oculto hasta Editar) · `.de-cita-box`
con la cifra grande (`.atrasada` en coral) · 🪥 rutina diaria (3 `.de-step`: cepillado, hilo
con nota de enhebrador si hay brackets, enjuague según sensibilidad/sangrado) · ⚡ cuidado
especial condicional por aparato y preocupación · ⚠️ señales de alerta fijas · 🛒 lista de
compras armada según perfil · 💡 consejos y disclaimer.

## Ojos y Vista — `#view-ojos`

Guía **estática, sin perfil ni `localStorage`**: 9 secciones, 23 pasos numerados, 7 señales de
alarma y 12 productos, con el esqueleto y las clases `.de-*` de Dentista y el menú de
`guiaEnSecciones()` con `formCardId` nulo. Todo anclado a **su exposición real**, que es la
primera sección: ~28 h/semana al volante (UV lateral, deslumbramiento LED), 10-12 h de pantalla
(se parpadea hasta 66 % menos), 5h40-6h40 de sueño. Secciones: exposición · fatiga visual digital
· ojo seco · al volante · exámenes · nutrición · ojeras · señales de alarma · qué comprar. Conecta
con lo que ya existe (el Omega 3 de la mañana cubre parte del ojo seco; la compresa térmica va en
la meditación de las 23:00; el fondo de ojo dilatado, un día sin Didi después) y desmonta
creencias: las gotas "para el rojo" son vasoconstrictores, un lente oscuro sin UV400 es peor que
nada, los lentes amarillos no mejoran la visión nocturna.

## Utilidades compartidas

`uid()`, `today()` (`toISOString()`, **UTC**), `fmtD(d)`, `addDays`, `daysAgo`, `toast`,
`openM(id)`/`closeM(id)`, `askDel(msg,cb)`/`closeConf()`/`doConf()`.

## Responsivo

Breakpoints 1180 (min), 920, 900, 640 y 620. **Bajo 640 la fila de pestañas es una tira
horizontal de una sola fila con scroll** (`flex-wrap:nowrap; overflow-x:auto`, scrollbar oculto,
`.tab-btn{flex-shrink:0}`) y `.tabs` lleva `min-width:0` para poder encogerse como ítem flex; sin
eso el `topnav` envolvía en 5-6 filas y se comía el 32 % del iPhone. Las tiras de 7 días bajan a
tiras de una línea bajo 920. Se verifica en las 8 áreas a 1600, 1366 y 390 px.

## Trampas

- **Nunca escribir `*/` dentro de un comentario CSS**: la secuencia cierra el comentario aunque
  esté en medio de una palabra (`--sk-*/--ca-*`), y el resto se cuela en el siguiente selector
  invalidándolo en silencio. Solo se vio comparando `getComputedStyle`.
- **Los scripts que editan este archivo escriben a temporal y reemplazan al final**: un
  `open(F,'w')` que falló a mitad lo dejó en 0 bytes una vez.
- `iframe.contentDocument` es `null` con `file://`; un `try/catch` alrededor se traga el fallo.

## Referencias cruzadas

- El **Dashboard** enlaza cada área con `cuidadopersonal.html?tab=…` desde su barra de apps (las
  ocho pestañas tienen píldora). No lee `skincare_v1`/`cabello_v1`/`dentista_v1` más allá del
  perfil (`D.sk`, `D.ca`).
- **Vestimenta** sigue fuera del ecosistema de datos: solo comparte `coach-theme`.
- Mapa completo: [`../README.md`](../README.md).

## Cómo usarlo

`cuidadopersonal.html` directo en cualquier navegador, sin instalación ni servidor. Sin
sincronización entre dispositivos; Skincare y Cabello no exportan JSON (Salud y Ejercicio sí,
dentro de su iframe).
