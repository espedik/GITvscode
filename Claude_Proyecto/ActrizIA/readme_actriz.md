# actriz.html — una actriz digital creada con IA, en paralelo al plan

Adán, 1-nov-2026: *"crea otro icono al lado de proyectos para laptop, este nuevo html es un nuevo proyecto que
quiero empezar en paralelo a todo lo demás, este será la apertura de una cuenta de una actriz de IA súper
profesional y quiero obtener ganancias de eso… quiero que analices todo, pongas los pasos que debo hacer y cómo,
piénsalo a profundidad para que quede bien y sí me genere dinero"*.

Herramienta de Adán, no página pública. Dice cómo gana dinero de verdad una cuenta así —primero vendiendo
comerciales a negocios, después con la audiencia—, cómo encaja con su plan sin quitarle horas, la ficha del
personaje, las herramientas, la ruta de 90 días, la semana con tope, la venta, una calculadora contra el ingreso
que pide el plan y su bitácora con los cortes del día 30, 60 y 90. Se abre desde la píldora **Actriz IA** de la
barra de apps del Dashboard, al lado de Laptop.

**Su prompt**: la clave `actriz` de [`prompts-paginas.js`](../Dashboard/prompts-paginas.js) —el icono de la
brújula, arriba a la izquierda (`data-host="header.top"`)—: un director creativo de talento virtual y estratega de
ingresos de creadores. Gobierna cada cambio de esta página (`CLAUDE.md` → Regla 6).

## Los archivos

| | Qué tiene |
|---|---|
| `actriz.html` | El molde, el CSS y el comportamiento. Ni una cifra ni un paso escritos aquí |
| `plan.js` | **Todo** el contenido en `ACTRIZ`: la tesis, los límites, las seis vías, el encaje con el plan, la ficha, las herramientas, la ruta (24 pasos en seis tramos), la semana, la fórmula, la venta, los cortes, las reglas y las fuentes |

Carga `../Dashboard/datos-maestros.js` para lo que viene del plan: el ingreso nuevo que pide la salida
(`{{extraSalida}}`, con `CIFRAS.n`), el dólar (`PROYECTO.usdMxn`) y el empleador (`{{empleador}}`); los textos de
`plan.js` pasan por `CIFRAS.texto`. Sin el maestro la página sigue en pie, sin meta ni dólares.

## La página, de arriba abajo

| Sección | Id | Qué enseña |
|---|---|---|
| Portada | `#tesis`, `#metaN`, `#lims`, `#avBarra` | La tesis, lo que pide el plan al mes, los tres límites (6 h a la semana, $700 al mes, corte el día 90) y cuántos pasos de la ruta van |
| Cómo encaja con tu plan | `#encaje` | El choque dicho: la Fase 1 no abre frentes de negocio nuevos y este lo es; entra como experimento de la palanca de ingreso, con sus reglas (no toca CT-GenAI, alemán, gym, Plan Maestro ni sueño; el domingo es de Didi; nada de alcohol ni apuestas) y la sinergia con Laptop, el negocio de su papá, su oficio y el CT-GenAI |
| Las seis formas de cobrar | `#vias` | Comerciales para marcas, colaboraciones, pagos de TikTok, YouTube, fan club y licencias: cuándo llega cada una, qué pide, cuánto y cómo, con su fuente |
| Tu actriz, por escrito | `#ficha` | Ocho decisiones con su recomendación; lo que Adán escribe se guarda al teclear |
| Las herramientas | `#herramientas` | Por etapa: en la nube (Higgsfield, Kling, Veo, ElevenLabs, Claude, DaVinci) y lo que alcanza su RTX 4090 en local |
| La ruta de 90 días | `#ruta` | Seis tramos de dos semanas, 24 pasos con su cómo y su casilla |
| Tu semana | `#semana`, `#formula` | La semana tipo con tope de 6 h y la fórmula de cada episodio (61 a 90 s, para entrar a los pagos de TikTok) |
| Vender comerciales | `#vender` | Tres paquetes en pesos con su equivalente en dólares, el mensaje para negocios con el nombre de la actriz (botón de copiar) y cómo se entrega |
| La calculadora | `#calc`, `calcular()` | Comerciales al mes × paquete + colaboraciones − herramientas, contra la meta del plan, con la cuenta escrita |
| Tus números | `#numeros`, `anotarSemana()`, `pintarCortes()` | La bitácora semanal (seguidores, publicadas, vistas, negocios contactados, clientes, cobrado, gastado, horas), su línea de seguidores y los tres cortes con lo que falta |
| Las reglas | `#reglas` | Etiqueta de IA, no parecerse a nadie real, nada sexual, publicidad marcada, licencias, SAT, Alemania, IMPI, nada comprado |

## Lo que guarda

`localStorage['actriz_v1']`: `inicio` (el día que empezó: el primer paso palomeado o la primera semana anotada, y
se puede cambiar), `ficha` (los ocho campos), `pasos` (`{id: fecha}` de cada paso hecho) y `bitacora` (una fila por
semana, por fecha). Comparte `coach-theme` con el Dashboard, Coach, Finanzas y Laptop. Ninguna otra app lee
`actriz_v1`.

## Al tocarla

- Un paso, una vía o una regla nueva es una entrada en `plan.js`; la página la pinta sola. Los `id` de los pasos
  (`r1`…`r24`) son contrato con lo guardado y con los cortes: no se renumeran.
- Cada cifra lleva su fuente (`f`, índice de `fuentes`) o dice «tarifa sugerida». Las reglas de las plataformas
  —etiquetas de IA, umbrales de TikTok y YouTube— se vuelven a revisar cada tres meses: cambian.
- La meta, el dólar y el empleador se cambian en el maestro, nunca aquí.
- Nada que vuelva a la actriz contenido para adultos, que imite a una persona real o que promocione alcohol o
  apuestas: lo dice su prompt y lo dicen sus reglas.
