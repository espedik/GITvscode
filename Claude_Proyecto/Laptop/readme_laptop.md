# laptop.html — proyectos para que la laptop pague sola

Adán, 22-oct-2026: *"hazme un HTML dedicado a cosas que puedo hacer con mi laptop, proyectos que
pueden dar valor… ya sea creando videos, renderizando, crear modelos 3D, hacer proyectos para hacer
dinero, esto es lo que más me interesa, entonces llénala completamente de proyectos"*.

Herramienta de Adán, no página pública. Dice qué puede hacer con su Zephyrus —3D, render, video, IA
local y código—, cuánto deja cada proyecto al mes con la cuenta a la vista, por dónde empezar y qué no
le conviene. Se abre desde la píldora **Laptop** de la barra de apps del Dashboard (grupo de Coach y
Finanzas).

**Su prompt**: la clave `laptop` de [`prompts-paginas.js`](../Dashboard/prompts-paginas.js) —el icono de la
brújula, arriba a la izquierda (`data-host="header.top"`)—. Es el especialista que gobierna cada cambio de
esta página (`CLAUDE.md` → Regla 6).

## Los archivos

| | Qué tiene |
|---|---|
| `laptop.html` | El molde, el CSS y el comportamiento. Ni un proyecto escrito aquí |
| `proyectos.js` | **Todo** el contenido en `LAPTOP`: el equipo, las categorías, las tres apuestas, los 19 proyectos, la ruta de 90 días y las listas de aviso |

Carga `../Dashboard/datos-maestros.js` para dos datos del plan: el ingreso nuevo que pide la salida
(`{{extraSalida}}`, con `CIFRAS.n`) y el dólar para planear (`PROYECTO.usdMxn`). Sin el maestro la página
sigue en pie, pero sin pesos ni meta.

## La página, de arriba abajo

| Sección | Id | Qué enseña |
|---|---|---|
| El equipo | `#piezas`, `#poderes` | GPU, CPU, RAM y pantalla con lo que permite cada una, y los tres superpoderes (OptiX, NVENC con AV1, CUDA). Una nota aclara que con RTX 4090 e Intel es la **G16 (2024)**, no la G14 —así aparece en sus activos de Finanzas— |
| La meta | `#meta`, `calcular()` | El ingreso nuevo del plan en grande y una **calculadora**: proyecto y horas a la semana → pesos al mes contra la meta. Las horas tienen tope: pasadas las que el mercado compra al mes (`hMax`), no suman |
| Tus tres apuestas | `#top3` | `LAPTOP.top`, con el porqué de cada una: renders de producto (Heliescala como cliente cero), animaciones técnicas (su nicho de mecatrónica) y QA con IA (la mejor tarifa por hora desde el primer mes) |
| La ruta de 90 días | `#rutaTramos` | `LAPTOP.ruta`: cinco tramos de la primera apuesta, de Blender desde cero a los primeros pagos |
| El catálogo | `#filtros`, `#grid` | Los 19 proyectos con filtro por categoría y orden (más dinero, primer pago más pronto, más fácil). Cada tarjeta abre su detalle |
| Lo que no te conviene · Antes de cobrar · Cuida tu laptop | `#noConviene`, `#antes`, `#cuidado` | Rentar la GPU, minar, canales hechos en masa; el contrato de ALTEN, el SAT, cobrar en dólares, las licencias y el permiso de estudiante en Alemania; Armoury Crate, ventilación, batería, OLED, renders de noche y respaldos |

**El detalle** (`#detOv`, `abrirDet()`): lo que deja al mes con **la cuenta** escrita
(`4–12 imágenes al mes × US$50–150 por imagen × $17.50 por dólar − 20 % de comisión`), primer pago,
inversión, dificultad, horas al mes y pesos por hora; los primeros pasos, el «Ojo», cómo se cruza con su
vida, por qué su laptop, el software, dónde venderlo y la fuente del precio. Escape lo cierra.

## Cómo se calcula lo que deja un proyecto

`cuenta(p)`: `precio × unidades × usdMxn × (1 − comisión)`, en sus dos extremos, redondeado a cientos. Un
proyecto en pesos (`precioMxn`) no pasa por el dólar. Los pesos por hora salen del precio de en medio
entre las horas de cada unidad (`horas`). Los proyectos **pasivos** (`pasivo`) enseñan el rango con *con el
catálogo armado* y sin pesos por hora —casi no llevan horas por venta, y el número saldría absurdo—; los de
**cliente cero** (`cero`) y el canal propio (`sinRango`) no llevan cifra.

Cada precio dice de dónde sale (`fuente`, `url`): guías de precios de 2026 para render de producto,
arquitectura, animación y edición; las licencias de RealityScan, Fab, SDXL y FLUX.1 schnell; y
**«tarifa sugerida para empezar»** donde no hay una cifra publicada. Los rangos son de alguien que
empieza con unas 8 horas a la semana: el pie de la página dice que ninguno es una promesa.

## Al tocarla

- Un proyecto nuevo es una entrada en `LAPTOP.proyectos` con su `cat`, sus rangos, sus `pasos`, dónde
  venderlo, su `ojo` y su `fuente`; la página lo pinta, lo filtra y lo ordena sola.
- El dólar se cambia en el maestro (`PROYECTO.usdMxn`), nunca aquí.
- Comparte el tema con el Dashboard, Coach y Finanzas (`coach-theme` en `localStorage`); no guarda nada más.
