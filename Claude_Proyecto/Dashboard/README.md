# dashboard.html — Dashboard Maestro: Mi Vida

Panel central que agrega los datos de **todas las demás apps** del proyecto (Finanzas, Salud, Sueño, Hábitos, Productividad, Ánimo, Aprendizaje, Proyectos, Social, Vehículo) leyendo directamente las claves que cada una guarda en `localStorage`, sin necesidad de un backend. Es la "página de inicio" pensada para ver de un vistazo cómo va la vida en conjunto.

## Cómo obtiene los datos

`loadAll()` lee del `localStorage` del navegador las claves usadas por cada app individual:

| App | Clave localStorage |
|---|---|
| Finanzas | `finanzasmx_v2` |
| Salud & Nutrición | `misalud_v1` |
| Sueño | `sueno_v1` |
| Hábitos | `habitos_v1` |
| Productividad | `tiempo_v1` |
| Ánimo | `animo_v1` |
| Aprendizaje | `aprendizaje_v1` |
| Proyectos | `proyectos_v1` |
| Social | `social_v1` |
| Vehículo | `vehiculo_v1` |

Esto significa que el dashboard **solo muestra datos reales si se abrió desde el mismo navegador** donde se usaron las otras apps (comparten el mismo origen/almacenamiento). Si se abre en un navegador limpio, todo aparecerá vacío.

## Navegación

- **🌟 Resumen General** — "Vida Score" del momento, barras de progreso por área, tarjetas de "Hoy en números" (sueño de anoche, calorías, hábitos completados, ánimo, focus/productividad, libros activos, tareas del día, interacciones sociales) y las 5 alertas más prioritarias.
- **📅 Esta Semana** — compara el Vida Score de esta semana contra la anterior, identifica la mejor y peor área, y muestra un gráfico de radar (Chart.js) comparando ambas semanas.
- **🔔 Alertas** — centro de notificaciones generado automáticamente: tareas vencidas o próximas a vencer, cumpleaños en los próximos 14 días, contactos sin interacción en 30+ días, mantenimientos de vehículo vencidos o próximos, hábitos pendientes del día, y déficit de sueño reciente.
- **🎯 Vida Score** — desglose detallado de las 8 áreas que componen el score, con su peso relativo, un consejo (`tip`) para mejorar cada una, y enlace directo a la app correspondiente.
- **🚀 Todas mis apps** — grid con tarjetas de acceso rápido a cada aplicación, mostrando una estadística resumen de cada una (ej. "$X gastados este mes", "Y kcal hoy").

## Cálculo del "Vida Score"

`calcScores()` calcula un puntaje 0-100 por área a partir de los datos de los últimos 7 días (sueño, hábitos, ánimo, productividad, aprendizaje, salud/nutrición, social, finanzas). Luego `vidaScore()` combina las 8 áreas con una ponderación fija (sueño 15%, hábitos 15%, ánimo 15%, productividad 15%, salud 15%, aprendizaje 10%, social 10%, finanzas 5%) para obtener el score global.

## Nota sobre los enlaces

La barra lateral y las tarjetas de "Todas mis apps" usan **rutas relativas** (`href="../Salud/salud.html"`, `href="../Sueno/sueno.html"`, etc.) apuntando a la carpeta de cada app dentro de `Claude_Proyecto`. Estos enlaces se actualizaron cuando cada HTML se movió a su propia carpeta; si en el futuro se vuelve a mover o renombrar alguna carpeta de app, hay que actualizar también los `href` correspondientes en la barra lateral (línea ~84) y en `renderApps()`/`AREAS` (JS) de este archivo.

## Cómo usarlo

Se abre `dashboard.html` en el mismo navegador donde ya se usaron las demás apps, para que pueda leer sus datos guardados. El botón "↻ Actualizar" (`reloadAll()`) vuelve a leer `localStorage` por si se actualizaron datos en otra pestaña.
