# Coach_v2.html — referencia

Coach de vida y negocio: diagnóstico financiero, Plan Maestro hacia $1,000,000 líquido, rutina
diaria, roadmap de aprendizaje y guía legal/fiscal personal y de empresa.

Una sola página, sin backend ni dependencias de gráficas — las barras de habilidades son HTML, no
Chart.js. Único import externo: Google Fonts (Inter + Playfair Display).

> **Esto es referencia, no diario.** Describe cómo funciona **hoy**. El historial vive en
> `git log -p -- Claude_Proyecto/Coach/Coach_v2.html`. Ver `../../CLAUDE.md` → Regla 3.

**Antes de tocar datos, leer [`../Dashboard/DATOS-MAESTROS.md`](../Dashboard/DATOS-MAESTROS.md).**

---

## Dos modos separados

Un botón (`cambiarModo('personal'|'empresa')`) alterna dos `<div class="vista-panel">`
independientes, cada uno con su sidebar y su `<main>`. Solo la sección elegida se muestra
(`irASeccion(sec, tab, el)`).

- **🪙 Personal**: `#perfil` · `#rutina` · `#aprendizaje` · `#perfil-rico` · `#networking` ·
  `#marca-personal` · `#legal-personal` · `#habilidades-valor`
- **🏢 Empresa**: `#posibles-negocios` · `#mas-ideas` · `#crear-empresa` · `#legal`

Tema claro/oscuro con toggle 🌙/☀️, persistido en `coach-theme` y aplicado como `data-theme` en
`<html>` al cargar. Ambos temas están completos.

---

## Datos

| Clave `localStorage` | Forma | Qué guarda |
|---|---|---|
| `coach-theme` | `'dark'` \| `'light'` | Tema activo |
| `coach_rutina_v1` | `{completado: {'YYYY-MM-DD': ['taskId',…]}}` | Progreso diario de la rutina |
| `coach_checks_v1` | `{[checkboxId]: true}` | **Todos** los demás checklists del archivo |
| `radarp_{skillId}` | entero 0-100, 12 claves | Overrides del radar. Sin override se usa el valor base de `SK` |

Ids del radar: `ventas, copy, marketing, network, liderazgo, codigo, ia, datos, inversion,
finanzas, ingles, mente`.

**Los saldos y cifras NO se guardan aquí**: se leen de `finanzasmx_v2` a través de
`../Dashboard/datos-maestros.js`. Ver la sección de cifras más abajo.

### Persistencia genérica de checklists

Todo checkbox `.check-item` presente en el HTML al cargar se guarda y restaura solo en
`coach_checks_v1`. No hay que tocar cada sección: el mismo bucle cubre Metas, Networking, Marca
Personal, Legal, Posibles Negocios, Perfil del Rico y cualquier checklist nuevo que se añada con
esa clase y un `id` único.

Los checkboxes de `#rutina-timeline` quedan **fuera** a propósito: se generan dinámicamente y usan
`coach_rutina_v1`, que va con fecha.

**Exportar respaldo** (botón ⬇️, `exportCoachData()`): descarga `coach_YYYY-MM-DD.json` con
`coach_rutina_v1`, `coach_checks_v1` y los 12 `radarp_*` agrupados bajo `radar`. No incluye el
tema, que es preferencia visual y no dato de seguimiento.

---

## `#rutina` — la pieza más compleja

Un tracker real, distinto cada día de la semana, que cubre ejercicio, cuidado personal, ALTEN,
Didi, el Plan Maestro y finanzas.

### De dónde sale el horario

**`RUTINA_TASKS` no se declara aquí.** Vive en `../Dashboard/datos-maestros.js` y se pide con:

```js
const RUTINA_TASKS = window.CIFRAS ? CIFRAS.rutina('') : [];
```

El argumento es el prefijo de los `href`: vacío porque en el maestro se guardan como anclas
internas (`#aprendizaje`), que son de **este** archivo. El Dashboard pasa
`'../Coach/Coach_v2.html'` para salir del suyo.

Estaba copiado en los dos HTML (17.5 KB cada uno) y llegó a divergir 6 días sin que nadie lo
notara. Para consultar o cambiar el horario, ir al maestro.

**Forma de cada bloque**: `{id, dias:[0-6], hora:'HH:MM', cat, txt, fijo?, subtareas?, link?}`,
con `dias` 0=domingo…6=sábado. `rutinaTareasDia(dow)` filtra y ordena por hora.

- `fijo:true` (solo el bloque de ALTEN) — sale en la línea de tiempo y cuenta para
  "ahora/siguiente", pero **no lleva checkbox ni suma al progreso**.
- `subtareas` — tarjeta agrupada para lo que se hace de corrido (skincare + minoxidil, cena +
  preparar la comida del día siguiente, la sublista de ejercicios del día).
- `link` — enlace inline `→` que abre en pestaña nueva, en la tarea o en cualquier subtarea.

### La forma del día

Estructura vigente, sin las horas exactas (esas están en el maestro, que es donde se editan):

- **Lun–Vie**: despertar → construir esta aplicación → ducha (con o sin lavado de cabello según el
  día) → skincare y minoxidil AM → **Didi con direccionamiento camino a ALTEN** → jornada en ALTEN
  (con la compra de comida en el descanso) → Didi corta de la tarde → gimnasio → bloque de
  habilidad (Mar/Jue/Vie) → Didi de la noche → prioridad activa de Fase 0 → cena y preparar la
  comida de mañana → lectura → diario → skincare y minoxidil PM → planear mañana → meditación →
  segundo bloque de la aplicación → dormir.
- **Lunes**, además: revisión de la Bolsa GBM por la mañana. Solo invierte al inicio de semana.
- **Sábado y domingo**: días de ingreso, con dos turnos largos de Didi (mañana y tarde-noche). El
  domingo cierra la semana con finanzas, checkpoint del Plan Maestro y diario, comprimidos al final.

**Duerme entre 5h40 y 6h40**, no las ~7h que este documento afirmó durante un tiempo.

**El bloque de freelance no existe hoy.** Era condicional, ocupaba las franjas que ahora son turnos
de Didi, y en la práctica estaba vacío. **Hay que volver a crearlo cuando entre el primer peso** de
las Opciones 1-3: ese es el momento que marca `s1-4` del Plan Maestro para mover horas de Didi al
negocio.

---

## Cifras: nada escrito a mano

Los saldos y datos personales que salen en la prosa vienen de `../Dashboard/datos-maestros.js`, que
esta app carga en el `<head>`. En el HTML se escribe un marcador y el módulo lo sustituye:

```html
<p>un crédito de {{autoSaldo}}</p>     →     un crédito de $293,000
```

Se resuelven con `CIFRAS.aplicarDOM()`, que recorre los nodos de texto. Hay **una segunda llamada
al final del `<script>`**: los inits de arriba (`updateFaseMonthBadges()` y compañía) repintan
trozos del DOM, y un marcador que reapareciera ahí se quedaría a la vista. Es idempotente, así que
repetirla no cuesta nada.

Diez cifras usan marcadores hoy, en cuatro sitios: el hallazgo del costo del auto, la tabla de
"cuándo se libera cada deuda", la simulación mes a mes y los checklists de fase. Incluyen
derivadas que antes se calculaban a mano y se quedaban congeladas: `{{autoInteres}}`,
`{{autoAPagar}}`.

**Esta app no tenía migraciones** y por eso podía mostrar saldos viejos si era la primera pantalla
del día. Ahora las hereda del módulo, que corre antes que su JS.

### Pendiente: la simulación mes a mes

La cascada de "cuándo te quedas sin deuda cara" (`$0 en mar 2027`, `~$22,500 restantes en oct`) se
calculó con el saldo viejo **y con una tasa del 10% anual que se sabe equivocada** — la real ronda
el 55.7%. Los saldos citados ya se actualizaron, pero **las fechas no**: cambiarles la entrada y
dejarles la salida las volvería falsamente precisas.

Rehacerla necesita fijar antes por qué la TC BBVA está subiendo. Ver
`../Finanzas/readme_finanzas.md`.

---

## Las demás secciones

| Sección | Qué es |
|---|---|
| `#perfil` | Diagnóstico real: patrimonio, deudas, hallazgos medidos, Plan Maestro por fases y barras de habilidades |
| `#aprendizaje` | 5 prioridades (Datos, Ventas, Marketing, Finanzas, IA) con primer paso, hábito y recursos |
| `#perfil-rico` | Mentalidad y hábitos financieros |
| `#networking` | Inventario de lo que puede ofrecer, la lista de 20, cómo presentarse |
| `#marca-personal` | Redes sociales y posicionamiento |
| `#legal-personal` | Trámites, régimen fiscal, impuestos |
| `#habilidades-valor` | Guías prácticas de vida |
| `#posibles-negocios`, `#mas-ideas` | Opciones de negocio evaluadas |
| `#crear-empresa`, `#legal` | Constituir y operar la empresa |

Las **barras de habilidades** reemplazaron al radar tipo FIFA: mismo componente que el Dashboard,
a todo lo ancho, con el nombre y la descripción visibles y la ponderación explícita. Un radar de 12
ejes hacía ilegibles las etiquetas y escondía el peso de cada una.

---

## Estructuras compartidas

`SK` —las 12 habilidades del radar— **ya no se declara aquí**: se lee con `CIFRAS.SK`. Esta app
tenía el superconjunto (con `full`, `cat` y `desc` para su panel explicativo), así que esa fue la
versión que se movió al maestro; el Dashboard usa solo los campos que pinta.

Los overrides que Adán ajusta a mano siguen en `radarp_{id}` y ganan sobre el `val` del maestro.

**Lo que sigue a mano** es el *texto* de las fases del Plan Maestro y de las prioridades de
aprendizaje: en esta app están escritos como HTML en `#perfil` y `#aprendizaje`, no generados
desde el literal, y convertirlos exigiría rediseñar esas secciones. Las cifras que contienen ya
usan `{{marcadores}}`, y `verificar-sincronia.js` comprueba que las fases y prioridades del
maestro aparezcan aquí.

---

## Verificar un cambio

```bash
node Dashboard/verificar-sincronia.js      # desde Claude_Proyecto/
```

Y en navegador a 1600px y 390px, abriendo con `file:///`. Ojo: **las secciones arrancan
colapsadas** — que un texto no aparezca en `innerText` no significa que falte; comprobar contra
`innerHTML` o navegar a la sección.
