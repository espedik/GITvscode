"""
11. FILTRO VELOZ (LIST COMPREHENSION)
Objetivo: Reducir 4 líneas de código (bucle for) a solo 1.

- Tienes una lista: valores = [10, 50, 120, 80, 200, 30].
- Crea una nueva lista 'criticos' que solo contenga los valores mayores a 100.
- Hazlo en UNA SOLA LÍNEA de código usando List Comprehension.
- Imprime la lista 'criticos'.
"""

# A. Lista de valores de sensores
valores = [10, 50, 120, 80, 200, 30]

# B. Crea 'criticos' con valores > 100 en UNA SOLA LÍNEA
# Esto sustituye a un bucle 'for' de 4 líneas.
criticos = [v for v in valores if v > 100]

# C. Imprime la lista resultante
print("--- ANÁLISIS DE UMBRAL CRÍTICO ---")
print(f"Valores originales: {valores}")
print(f"Lecturas críticas (>100): {criticos}") # Salida: [120, 200]
