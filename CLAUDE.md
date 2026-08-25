# Reglas de este proyecto

## Regla 1 — Un dato se escribe UNA sola vez

**Todo dato que aparezca en más de un sitio vive en `Claude_Proyecto/Dashboard/datos-maestros.js`.**
Nunca se copia un número, una fecha o un nombre a mano en un HTML.

Antes de escribir cualquier dato en una app, **leer primero
`Claude_Proyecto/Dashboard/DATOS-MAESTROS.md`**: es el índice del proyecto en una página —
catálogo de variables con su valor de hoy, quién carga qué, y el mapa de apps. Está hecho para
abrirse entero en vez de rastrear 900 KB de HTML, y es lo que hace baratos los cambios.

- En la prosa se escribe `{{autoSaldo}}`, `{{sueldo}}`, `{{empleador}}`… y el módulo lo sustituye.
- Una variable nueva es **una línea** en `PROYECTO` o `CLAVES`, más su fila en el `.md`.
- Las apps lo cargan con `<script src="../Dashboard/datos-maestros.js">` (el propio Dashboard, sin
  prefijo). **`<script src>` funciona desde `file://`** — los scripts clásicos sí, los módulos ES no.
- Las correcciones de saldo van a `MIGRACIONES`, en ese mismo archivo. **Nunca** duplicadas en cada app.

Origen (2026-08-24): *"no quiero que vuelva a pasar, quiero que si cambies uno, se cambien todos…
esto para que no hagas como retrabajo"*. Se detectó que Coach_v2.html llevaba 6 días mostrando
saldos viejos porque los números estaban copiados en doce sitios.

## Regla 2 — Verificar la sincronía antes de dar nada por terminado

```bash
node Dashboard/verificar-sincronia.js      # desde Claude_Proyecto/
```

Compara **evaluando los literales** de cada HTML, no leyéndolos a ojo. Sale con código 1 si algo
está roto. Hay un hook `Stop` que lo corre solo al final de cada turno y avisa únicamente cuando
encuentra un problema (`--hook`).

Si el verificador marca algo, se arregla antes de cerrar la tarea. Si aparece una estructura
duplicada nueva que él no cubre, **se añade el control al script** en la misma tarea.

## Regla 4 — Una variable nunca cambia sola

**Antes de dar por terminado un cambio de dato, mirar qué arrastró.** Bajar el gym de $1,500 a
$650 movió también `suscripciones`, `fijosTotal` y `margen`. Los cálculos se ajustan solos —son
getters— pero **las tablas de los `.md` llevan el número escrito** y se quedan atrás.

```bash
node -e "require('./Dashboard/datos-maestros.js'); console.log(window.CIFRAS.impacto('gym'))"
```

- Cada derivada declara su `dep: [...]` en `CLAVES`. **Añadir una fórmula sin declarar sus
  dependencias es un error**, y el control 6 lo detecta: mide el grafo real perturbando cada base
  y lo compara con lo declarado.
- `CIFRAS.impacto(clave)` da lo que se mueve; `CIFRAS.grafo()` el mapa completo.
- El **control 7** compara los valores citados en los `.md` contra el maestro y da archivo y línea.
- El **hook** informa del impacto al terminar el turno: separa lo que editaste de lo que se movió
  contigo.

Adán, 2026-08-25: *"si se actualiza esa variable, va influir en otras variables, entonces debes
mapear muy muy bien las variables que se relacionan unas con otras"*.

## Regla 3 — Los `.md` documentan el ESTADO ACTUAL, no la historia

Los readmes de este proyecto son **referencia**, no diario. El historial ya vive en git
(`git log -p`), y duplicarlo en el `.md` solo lo hace más caro de leer y más fácil de
desincronizar. En 2026-08-25 se reescribieron por esto: 92% de las 184 secciones de
`readme_dashboard.md` eran entradas fechadas de cambios ya reemplazados.

- Organizar **por tema**, no por fecha. Nada de secciones "Ajuste del 2026-08-07".
- Cada afirmación describe **cómo funciona hoy**. Si algo se reemplazó, se reescribe la sección; no
  se añade otra abajo contando el cambio.
- Se conserva el **por qué** de una decisión vigente y los **números medidos**. Se borra el relato
  de cómo se llegó ahí.
- Fecha solo cuando el dato la necesita para entenderse (un saldo, una entrevista, un plazo).
- Al tocar un `.html`, actualizar la sección del `.md` que le corresponde — **editándola**, no
  apilando una nueva.

Adán, 2026-08-25: *"tampoco quiero que en los .md haya información innecesaria / duplicada /
desincronizada. No me sirve historial acumulado sin sentido, quiero información valiosa"*.

## Al terminar una tarea, se sube a GitHub

**Regla fija (2026-08-19, pedido explícito de Adán): terminar una tarea incluye subirla.** No se espera a que lo pida — una tarea sin commit no está terminada. El orden es siempre:

1. **Verificar que funciona** antes de subir nada. Si el cambio es visual o de comportamiento, se comprueba en el navegador (Playwright está disponible vía `npx`, ver abajo), no solo leyendo el código.
2. **Actualizar el `.md`** de cada `.html` tocado, siguiendo la Regla 3: se **edita la sección** que describe esa pieza para que refleje cómo funciona ahora. No se añade una entrada nueva contando el cambio — para eso está el mensaje del commit.
3. **`git add` solo de lo que se tocó.** Nunca `git add -A` a ciegas: en el árbol pueden quedar respaldos, `.PREV.html` o archivos de prueba que no deben subirse.
4. **Commit con mensaje descriptivo en español**, en el estilo que ya tiene el historial: una línea que diga qué cambió y por qué, no "cambios varios". Cuerpo con el detalle si hace falta.
5. **`git push origin main`** y confirmar que el push salió bien.

**Si hay trabajo pendiente de días previos sin commitear**, se pregunta el alcance antes de subir, pero recomendando subir todo lo pendiente.

**Lo que no se sube nunca**: archivos temporales, respaldos (`*.bak`, `*.PREV.html`, `*.tmp`) y scripts de un solo uso — esos viven en el scratchpad de la sesión, no en el repo.

## Editar los HTML con scripts

Los `.html` de `Claude_Proyecto/` son archivos grandes (`dashboard.html` pasa de 600 KB) con **finales de línea mixtos** — `dashboard.html` tiene 6,097 líneas CRLF y 238 LF sueltas.

- Leer y escribir **siempre** con `newline=''` y usar `\r\n` en el texto insertado. Sin eso, Python normaliza el archivo entero y un cambio de 100 líneas produce un diff de 12,000.
- **Escribir a un temporal y `os.replace` al final.** `open(p,'w')` trunca el archivo *antes* de escribir: si el `write` falla a mitad (un emoji escrito como par subrogado, por ejemplo), el archivo se queda en 0 bytes. Ya pasó una vez con `dashboard.html`.
- Copiar el archivo al scratchpad antes de tocarlo, y comparar con `diff` al final: solo deben aparecer las líneas que se quisieron cambiar.
- `String.prototype.replace` de JavaScript interpreta `$&`, `` $` ``, `$'` y `$1` en el string de reemplazo. Si el texto insertado lleva `$` (y aquí casi siempre lleva, son cifras), pasar una **función** de reemplazo.
- **Nunca meter texto largo en `python -c "…"` desde bash.** Bash expande lo que hay entre backticks como sustitución de comandos y también toca `$` y los paréntesis: un párrafo de documentación que mencione `` `.lc-grid` `` llega a Python ya mutilado, con las frases cortadas. Pasó el 2026-08-19 con `readme_dashboard.md` y costó rehacer el commit. El script va en un archivo `.py` en el scratchpad y se ejecuta con `python archivo.py`.

## Verificar en el navegador

Playwright está instalado en la caché de `npx`, no como dependencia del proyecto:

```bash
NODE_PATH="C:/Users/esped/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules" node script.js
```

Los archivos se abren con `file:///` — así es como Adán los usa — y comparten `localStorage` entre carpetas por ese mismo origen. Para probar con datos hay que sembrarlos con `page.addInitScript`.

Se verifica en **1600px y 390px**, y se mide de verdad: geometría de rectángulos, elementos desbordados, errores de consola. Si un cambio puede haber roto algo preexistente, se compara contra `git show HEAD:archivo` en vez de suponer.

## Cómo hablar de los cambios

Los readmes y los mensajes de commit de este proyecto explican **por qué** se hizo algo y **qué se midió**, no solo qué se tocó. Se conserva la frase textual de lo que pidió Adán. Los números que se citan son medidos, nunca estimados.
