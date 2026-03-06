"""
17. FORMATEO DE REPORTE FINAL
Objetivo: Generar una línea de log profesional a partir de una lista.

- Tienes: pasos = ["Conectado", "Autenticado", "Lectura_OK", "Desconectado"].
- Usa el método .join() para crear un solo string donde cada paso 
  esté separado por una flecha " -> ".
- Imprime el resultado.
"""

# ==============================================================================
# 📔 NOTAS TÉCNICAS: EL MÉTODO .join()
# ==============================================================================
# A diferencia de los métodos anteriores, .join() es un método de STRING, 
# no de lista. Toma todos los elementos de una lista y los pega usando el 
# string que tú definas como "pegamento".
#
# REGLA DE ORO: Todos los elementos dentro de la lista DEBEN ser strings. 
# Si hay números, primero hay que convertirlos.
# ==============================================================================

# A. Lista de pasos ejecutados en una prueba de software
pasos = ["Conectado", "Autenticado", "Lectura_OK", "Desconectado"]

# 

# B. Usa .join() para crear una cadena separada por flechas " -> "
# El string inicial " -> " es el separador que se pondrá ENTRE los elementos.
reporte_flujo = " -> ".join(pasos)

# C. Ejemplo adicional: Formato CSV (valores separados por comas)
# Muy útil para exportar datos a Excel después de un test.
reporte_csv = ",".join(pasos)

# D. Resultados
print("--- GENERACIÓN DE LOG PROFESIONAL ---")
print(f"Flujo de ejecución: {reporte_flujo}")
print(f"Formato de exportación: {reporte_csv}")

# ==============================================================================