# Convertir el ecosistema en un producto vendible — comparación y hoja de ruta

*Documento de decisión, no un plan de implementación. Escrito el 2026-08-15 a petición de Adán: "si quisiera replicar todos mis proyectos para que otras personas puedan usarlo, o crear una super aplicación, ¿debería usar otro stack o qué debería hacer?"*

## Contexto

Adán preguntó qué stack necesitaría para replicar su ecosistema de apps personales (Dashboard, Coach, Finanzas, CuidadoPersonal) y venderlo a otras personas, o convertirlo en una "super app". No sabía si su stack actual (HTML/CSS/JS vanilla, sin backend, `localStorage`) le alcanza o necesita algo distinto. Pidió ayuda para decidir entre rutas antes de comprometerse, con tiempo/costo/riesgo de cada una.

Verificado en el código antes de escribir esto:
- **`Finanzas.html` tiene sus datos reales repetidos en al menos 3 puntos**: `seedData()` (línea 3828, puebla deudas/transacciones/metas reales), y `BASE_SALARY=41000` aparece suelto en la línea 1248 *y* de nuevo en la línea 3020. "Limpiar" el archivo no es un solo find-and-replace — hay que tocar los 3 lugares o se filtra el sueldo real de Adán en la copia que se comparte.
- **El plan de vender esto ya existe y está en curso**, no es una idea nueva: `Coach/Coach_v2.html` línea 1978, checklist `s0-3` de Fase 0 (1 ago–30 sep 2026): *"Plantilla Finanzas.html, de principio a fin: versión limpia sin tus datos + post de venta + publicarla en 2-3 comunidades de GBM (Opción 1)"*. Tiene checkpoint el 30 sep 2026 y meta de Fase 1 de "20+ ventas de la plantilla cobradas", con precio sugerido $99–299 MXN.
- **Cero autenticación, cero multiusuario, cero backend en todo el proyecto** (confirmado por grep exhaustivo de login/auth/sesión en las 6 apps).
- El modelo de datos ya está bien estructurado (`S.debts[]`, `S.transactions[]`, `RUTINA_TASKS[]`, `EVENTOS_MES{}`), lo cual es una ventaja real si algún día se migra a una base de datos.

## Las 3 rutas, comparadas

| | **A) Plantilla descargable** | **B) SaaS ligero (cuentas propias)** | **C) SaaS completo (negocio real)** |
|---|---|---|---|
| **Tiempo hasta primer resultado** | 1–3 semanas | 4–8 semanas solo para 1 app con login funcionando | Semanas adicionales sobre B, y solo tiene sentido después de que B ya tenga usuarios pagando |
| **Costo de tiempo** | ~15–30 horas totales | ~80–150 horas aprendiendo un stack nuevo desde cero | 150+ horas sobre B, más carga recurrente de soporte que compite con su trabajo en ALTEN |
| **Costo en dinero** | $0 (quizás comisión de la plataforma de pago) | $0–25 USD/mes en capas gratuitas | $25–100+ USD/mes, más pasarela de cobro recurrente |
| **Riesgo principal** | Que nadie compre (riesgo bajo en dinero); y el riesgo operativo de compartir por error la copia con datos reales | Construir infraestructura **antes** de confirmar que alguien pagaría; manejar datos financieros reales de un tercero sin experiencia previa en seguridad de backend | Todo lo de B, más obligación legal real: datos financieros de terceros de forma recurrente entra en el radar de la LFPDPPP mexicana (aviso de privacidad, medidas de seguridad demostrables) |
| **Cuánto se reutiliza de lo que ya existe** | ~95% del código tal cual — cambia solo `seedData()`, las 2 apariciones de `BASE_SALARY`, y textos de ejemplo | ~80–90% de la lógica de cálculo y el 100% del diseño visual; se reescribe por completo la capa de persistencia (`save()`/`load()`) y se construye login desde cero | Igual que B, más módulos que hoy no existen en absoluto (cobros recurrentes, panel de soporte, aviso de privacidad) |

## Recomendación: A primero, siempre — B solo si A cruza un umbral concreto

Por 4 razones concretas:

1. **Cero evidencia de demanda hoy.** No hay ninguna señal, ni informal, de que alguien fuera de Adán pagaría por esto. Construir login + base de datos antes de confirmar eso es construir sobre una suposición no probada.
2. **Asimetría de costo para probar.** A cuesta ~$0 y ~20 horas. B cuesta 5–10x eso, en tiempo y en dinero recurrente. Si A no vende ni 5 copias en 2–3 comunidades ya receptivas, es una señal barata de que hay que ajustar mensaje o precio — mucho más barata que descubrirlo después de construir un SaaS.
3. **Restricción financiera real de Adán ahora mismo.** Su fondo de emergencia está en $0 y BBVA ($32,343) es su prioridad #1 y #2 de Fase 0. Cualquier gasto mensual recurrente de hosting compite directamente con esa regla que él mismo puso como no negociable. A no tiene ese conflicto.
4. **Matiz honesto**: A no prueba exactamente lo mismo que B. A prueba "¿alguien paga una vez $99–150 por un archivo que edita a mano?". B pide más confianza (subir datos financieros reales a un servidor ajeno) y normalmente un precio más alto. Pero es una señal *direccional* válida — sirve para descartar rápido, no para confirmar al 100%. Si ni 20 personas en una comunidad interesada en finanzas pagan $100 por la versión más simple, es poco probable que paguen una suscripción por la versión con más fricción de confianza.

**C no se piensa hasta que B tenga usuarios reales pagando.**

## Si B se vuelve relevante más adelante: stack y migración

- **Stack recomendado: Next.js + Supabase.** Supabase resuelve base de datos (Postgres) + autenticación + aislamiento de datos por usuario (Row Level Security) sin construir login desde cero — evita el error más caro para alguien sin experiencia previa en seguridad de backend: un login mal hecho que expone datos de otro usuario. Capa gratuita suficiente para las primeras decenas de usuarios.
- **Alternativa que reduce drásticamente el trabajo**: no reescribir todo en un framework nuevo. El HTML/CSS/lógica de cálculo actual se queda intacto; solo se reemplazan las ~2 líneas de `save()`/`load()` que hoy leen/escriben `localStorage` por llamadas a Supabase desde el mismo `<script>` inline.
- **Migración del modelo de datos**: en vez de normalizar cada estructura en tablas relacionales separadas desde el día uno, lo más directo es una tabla de usuarios con una columna `JSONB` por cada clave de `localStorage` que ya existe (Postgres las soporta nativamente). La fila de un usuario tendría una columna `finanzas_data` que guarda el mismo objeto que hoy vive en `localStorage['finanzasmx_v2']`. Esto es casi una copia 1:1 del esquema ya documentado en la tabla de `README.md`, y permite seguir usando la misma técnica de migraciones idempotentes con banderas que ya se usa (`fixBanamexIfNeeded()`, etc.), corriendo contra el JSON del servidor en vez de contra `localStorage` del navegador. Normalizar de verdad en tablas separadas queda como fase 2 opcional, solo si algún día hacen falta reportes cruzados entre usuarios.

## Primeros pasos concretos para arrancar con la Ruta A

No hay que crear nada nuevo — el punto de entrada ya existe: `Coach/Coach_v2.html` → Fase 0 → checklist `id="s0-3"` (línea 1978), con checkpoint el 30 sep 2026.

1. Copiar `Finanzas/Finanzas.html` a un archivo aparte (ej. `Finanzas_plantilla.html`), **fuera** de `Claude_Proyecto/`, para nunca confundirla con la app real.
2. Vaciar `seedData()` (línea 3828) reemplazando los arrays reales de deudas/transacciones/metas por 2–3 filas de ejemplo claramente etiquetadas, o arrays vacíos.
3. Neutralizar las 2 apariciones sueltas de `BASE_SALARY=41000` (líneas 1248 y 3020) — `seedData()` por sí sola no las cubre.
4. Grep final de verificación sobre la copia antes de compartirla: "41000", "32343", "BBVA", "Banamex" y cualquier nombre propio — la misma disciplina de grep que ya se usa para las migraciones de cifras, aplicada aquí como control de fuga de datos.
5. Precio de lanzamiento bajo para validar volumen: $99–150 MXN, no los $299 del techo.
6. Escribir el post de venta y publicarlo en 2–3 comunidades de GBM esta semana o la próxima.
7. Marcar `s0-3` como hecho en `Coach_v2.html` en cuanto esté publicado.
8. No tocar la Ruta B todavía. Revisarla solo si ocurre uno de dos disparadores concretos: (a) se alcanza o se acerca la meta de Fase 1 de "20+ ventas cobradas", o (b) varios compradores piden espontáneamente sincronización entre dispositivos sin editar código — esa fricción específica justificaría el costo de B, no una intuición de que "sería mejor producto".

## Archivos involucrados

- `Coach/Coach_v2.html` — checklist `s0-3`/`s0-4`, tarjeta "Opción 1" de negocio, checkpoint de Fase 0 y meta de Fase 1
- `Finanzas/Finanzas.html` — archivo a clonar y limpiar; `seedData()` línea 3828, `BASE_SALARY` líneas 1248 y 3020
- `Finanzas/readme_finanzas.md` — documentación gemela a actualizar en cuanto exista la copia-plantilla
- `README.md` — mapa maestro de claves `localStorage`, referencia obligatoria si algún día se diseña el esquema de base de datos para la Ruta B

## Verificación cuando se ejecute

- Antes de compartir la plantilla: abrir `Finanzas_plantilla.html` en el navegador y confirmar visualmente que no aparece ningún dato real de Adán en ninguna pantalla (Dashboard interno de la app, no solo la carga inicial).
- Grep de las cifras/nombres reales sobre el archivo final antes de publicarlo (paso 4 arriba) — debe devolver cero coincidencias.
- Si más adelante se construye la Ruta B: probar con 2 cuentas de prueba distintas que los datos de una no se puedan leer ni por accidente desde la otra (verificación manual de aislamiento antes de aceptar el primer usuario real).
