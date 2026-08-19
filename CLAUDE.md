# Reglas de este proyecto

## Al terminar una tarea, se sube a GitHub

**Regla fija (2026-08-19, pedido explícito de Adán): terminar una tarea incluye subirla.** No se espera a que lo pida — una tarea sin commit no está terminada. El orden es siempre:

1. **Verificar que funciona** antes de subir nada. Si el cambio es visual o de comportamiento, se comprueba en el navegador (Playwright está disponible vía `npx`, ver abajo), no solo leyendo el código.
2. **Actualizar el `.md`** de cada `.html` tocado — cada app tiene el suyo (`readme_dashboard.md`, `readme_finanzas.md`, …) y la historia del cambio va ahí, con la frase textual de lo que se pidió.
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

## Verificar en el navegador

Playwright está instalado en la caché de `npx`, no como dependencia del proyecto:

```bash
NODE_PATH="C:/Users/esped/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules" node script.js
```

Los archivos se abren con `file:///` — así es como Adán los usa — y comparten `localStorage` entre carpetas por ese mismo origen. Para probar con datos hay que sembrarlos con `page.addInitScript`.

Se verifica en **1600px y 390px**, y se mide de verdad: geometría de rectángulos, elementos desbordados, errores de consola. Si un cambio puede haber roto algo preexistente, se compara contra `git show HEAD:archivo` en vez de suponer.

## Cómo hablar de los cambios

Los readmes y los mensajes de commit de este proyecto explican **por qué** se hizo algo y **qué se midió**, no solo qué se tocó. Se conserva la frase textual de lo que pidió Adán. Los números que se citan son medidos, nunca estimados.
