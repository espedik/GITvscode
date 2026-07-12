"""
16. AUDITORÍA DE ERRORES ÚNICOS
Objetivo: Filtrar IDs de error repetidos en una prueba masiva.

- Tienes: logs = ["E-01", "E-05", "E-01", "E-03", "E-05", "E-01", "E-02"].
- Convierte la lista en un 'set' para eliminar duplicados y luego 
  regrésala a formato lista.
- Ordena el resultado e imprímelo.
"""

# ==============================================================================
# 📔 NOTAS TÉCNICAS: ELIMINACIÓN DE DUPLICADOS CON 'SET'
# ==============================================================================
# Un 'Set' (conjunto) es una estructura de datos que, por definición, NO permite 
# elementos duplicados. 
#
# El flujo estándar en Python para limpiar una lista es:
# 1. lista -> set (Se borran los duplicados automáticamente).
# 2. set -> lista (Recuperas las propiedades de la lista, como el ordenamiento).
#
# Nota de rendimiento: Buscar en un set tiene una complejidad de $O(1)$, 
# lo que lo hace instantáneo sin importar el tamaño.
# ==============================================================================

# A. Lista de logs con IDs de error repetidos
logs = ["E-01", "E-05", "E-01", "E-03", "E-05", "E-01", "E-02"]

# 

# B. Convertir la lista en un 'set' y luego de vuelta a 'lista'
# Esto se puede hacer en una sola línea.
errores_unicos = list(set(logs))

# C. Ordenar el resultado
# Como los sets no tienen orden, al volver a lista los datos quedan desordenados.
# Usamos .sort() para que el reporte sea legible (E-01, E-02...).
errores_unicos.sort()

# D. Resultados
print("--- AUDITORÍA DE LOGS ---")
print(f"Total de eventos registrados: {len(logs)}")
print(f"IDs de error detectados (Únicos): {errores_unicos}")
print(f"Cantidad de tipos de error: {len(errores_unicos)}")