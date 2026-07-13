"""
18. ANÁLISIS DE EFICIENCIA (TEÓRICO)
Objetivo: Evaluar el costo de construir strings grandes, para Honeywell/Google.

- Tienes que construir un reporte de texto a partir de 1,000,000 de líneas.
- En un comentario, responde cuál de estas dos formas es más eficiente y por qué:
  A) reporte = ""; for linea in datos: reporte += linea  (concatenar con +=)
  B) reporte = "".join(datos)  (usar .join() sobre una lista)

Pista: Investiga por qué los strings son inmutables en Python.
"""

# ==============================================================================
# 📔 NOTAS TÉCNICAS: INMUTABILIDAD Y CONCATENACIÓN
# ==============================================================================
# Un string en Python es INMUTABLE: no se puede modificar en memoria una vez
# creado. Cada vez que haces reporte += linea, Python en realidad crea un
# string COMPLETAMENTE NUEVO copiando todo el contenido anterior más el
# fragmento agregado, y descarta el string viejo.
# ==============================================================================

"""
RESPUESTA AL DESAFÍO:
---------------------
Escenario: 1,000,000 de líneas de texto.

A) reporte += linea dentro de un bucle: Es O(n²) en el peor caso.
   En cada vuelta se copia TODO el contenido acumulado hasta ese momento.
   Con 1 línea copia 1, con 2 líneas copia 2, ... con 1,000,000 copia
   1,000,000. La suma de todas esas copias crece cuadráticamente.

B) "".join(datos): Es O(n) - Lineal.
   .join() primero calcula el tamaño total necesario y reserva la memoria
   UNA sola vez, luego copia cada fragmento exactamente una vez. No hay
   copias repetidas del contenido acumulado.

CONCLUSIÓN:
Para construir strings grandes a partir de muchas partes, siempre es
preferible juntar los fragmentos en una lista y usar "".join(lista) al
final, en lugar de concatenar con += dentro de un bucle.
"""

# 🛠️ DEMOSTRACIÓN PRÁCTICA CON MEDICIÓN DE TIEMPO
import time

datos = [f"linea_{i};" for i in range(100_000)]

# A. Método lento: concatenación con += dentro de un bucle
inicio = time.perf_counter()
reporte_lento = ""
for linea in datos:
    reporte_lento += linea
tiempo_lento = time.perf_counter() - inicio

# B. Método rápido: join() sobre la lista completa
inicio = time.perf_counter()
reporte_rapido = "".join(datos)
tiempo_rapido = time.perf_counter() - inicio

print(f"Tiempo con += en bucle: {tiempo_lento:.5f} segundos")
print(f"Tiempo con ''.join(): {tiempo_rapido:.5f} segundos")
print(f"¿Ambos resultados son iguales?: {reporte_lento == reporte_rapido}")
