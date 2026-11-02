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
| `plan.js` | **Todo** el contenido en `ACTRIZ`: la tesis, los límites, las seis vías, el encaje con el plan, la ficha, las herramientas (con su costo en dólares), la ruta (24 pasos en seis tramos), la semana, la fórmula, la venta, el modelo de 12 meses (`modelo`), el episodio, las horas, el embudo, los cortes, las reglas, las fotos y las fuentes |
| `fotos/` | Las fotos de cine a 900 px, de Wikimedia Commons con su crédito; las de hardware y video se leen de `../Laptop/fotos/` y la del taller de `../Heliescala/fotos/` |
| `../Dashboard/graficas-svg.js` | Las gráficas (`GSVG`), compartidas con Laptop |

Carga `../Dashboard/datos-maestros.js` para lo que viene del plan: el ingreso nuevo que pide la salida
(`{{extraSalida}}`, con `CIFRAS.n`), el dólar (`PROYECTO.usdMxn`) y el empleador (`{{empleador}}`); los textos de
`plan.js` pasan por `CIFRAS.texto`. Sin el maestro la página sigue en pie, sin meta ni dólares.

## La página, de arriba abajo

| Sección | Id | Qué enseña |
|---|---|---|
| Portada | `#tesis`, `#collage`, `#stats`, `#avBarra` | La tesis con tres fotos, lo que pide el plan al mes, los tres límites (6 h a la semana, $700 al mes, corte el día 90) y cuántos pasos de la ruta van |
| Tu modelo de 12 meses | `#modelo`, `calcularModelo()`, `pintarModelo()` | Siete supuestos que se mueven (mes del primer cliente, comerciales al mes, precio, crecimiento semanal, colaboración, pago por mil vistas, herramientas), guardados en `actriz_v1.modelo`; tres cifras (mes en que llega a la meta, lo que deja el mes 12, el año), lo cobrado por fuente en columnas contra la meta del plan con su cuenta escrita, y los seguidores por semana contra los umbrales de 5,000 y 10,000. Con los supuestos de inicio no llega a la meta en 12 meses: es un escenario, no una promesa |
| Cómo encaja con tu plan | `#encaje` | El choque dicho: la Fase 1 no abre frentes de negocio nuevos y este lo es; entra como experimento de la palanca de ingreso, con sus reglas (no toca CT-GenAI, alemán, gym, Plan Maestro ni sueño; el domingo es de Didi; nada de alcohol ni apuestas) y la sinergia con Laptop, el negocio de su papá, su oficio y el CT-GenAI |
| Las seis formas de cobrar | `#vias` | Comerciales para marcas, colaboraciones, pagos de TikTok, YouTube, fan club y licencias: cuándo llega cada una, qué pide, cuánto y cómo, con su fuente |
| Tu actriz, por escrito | `#ficha`, `pintarBiblia()` | Ocho decisiones con su recomendación; lo que Adán escribe se guarda al teclear y arma, a la derecha, el encargo para que Claude escriba su biblia (con botón de copiar) |
| Las herramientas | `#herramientas`, `#gCostos` | Por etapa: en la nube (Higgsfield, Kling, Veo, ElevenLabs, Claude, DaVinci) y lo que alcanza su RTX 4090 en local; lo que cuesta cada una al mes en pesos, contra el tope |
| La ruta de 90 días | `#lineaT`, `#tramoDet` | Una línea de tiempo de seis tramos con su avance; el tramo elegido abre sus pasos con su cómo y su casilla, junto a una foto |
| Tu semana y tu episodio | `#gHoras`, `#gEpisodio`, `#formula` | Las horas repartidas antes y después de empezar a vender, un episodio de 70 s segundo a segundo, la semana tipo y la fórmula de cada episodio |
| Vender comerciales | `#vender`, `#gEmbudo` | Tres paquetes en pesos con su equivalente en dólares, el embudo de cada mes (mensajes, respuestas, cotizaciones, clientes), el mensaje para negocios con el nombre de la actriz y cómo se entrega |
| Tus números | `#numeros`, `anotarSemana()`, `pintarCortes()`, `pintarHisto()` | La bitácora semanal (seguidores, publicadas, vistas, negocios contactados, clientes, cobrado, gastado, horas), los tres cortes con lo que falta, y dos gráficas: los seguidores reales y lo cobrado contra lo gastado, acumulados |
| Las reglas | `#reglas` | Etiqueta de IA, no parecerse a nadie real, nada sexual, publicidad marcada, licencias, SAT, Alemania, IMPI, nada comprado |

## Lo que guarda

`localStorage['actriz_v1']`: `inicio` (el día que empezó: el primer paso palomeado o la primera semana anotada, y
se puede cambiar; también fija el primer mes del modelo), `ficha` (los ocho campos), `pasos` (`{id: fecha}` de cada paso
hecho), `bitacora` (una fila por semana, por fecha) y `modelo` (los supuestos que movió). Comparte `coach-theme` con el Dashboard, Coach, Finanzas y Laptop. Ninguna otra app lee
`actriz_v1`.

## Al tocarla

- Un paso, una vía o una regla nueva es una entrada en `plan.js`; la página la pinta sola. Los `id` de los pasos
  (`r1`…`r24`) son contrato con lo guardado y con los cortes: no se renumeran.
- Cada cifra lleva su fuente (`f`, índice de `fuentes`) o dice «tarifa sugerida». Las reglas de las plataformas
  —etiquetas de IA, umbrales de TikTok y YouTube— se vuelven a revisar cada tres meses: cambian.
- La meta, el dólar y el empleador se cambian en el maestro, nunca aquí.
- Nada que vuelva a la actriz contenido para adultos, que imite a una persona real o que promocione alcohol o
  apuestas: lo dice su prompt y lo dicen sus reglas.
