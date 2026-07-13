"""
11. FILTRO VELOZ (DICT COMPREHENSION)
Objetivo: Reducir un bucle for de varias líneas a solo 1 con Dict Comprehension.

- Tienes un diccionario: valores = {"S1": 10, "S2": 120, "S3": 80, "S4": 200}.
- Crea un nuevo diccionario 'criticos' que solo contenga los pares
  cuyo valor sea mayor a 100.
- Hazlo en UNA SOLA LÍNEA de código usando Dict Comprehension.
- Imprime el diccionario 'criticos'.
"""

# A. Diccionario de valores de sensores
valores = {"S1": 10, "S2": 120, "S3": 80, "S4": 200}

# B. Crea 'criticos' con valores > 100 en UNA SOLA LÍNEA
# Esto sustituye a un bucle 'for' de varias líneas.
criticos = {clave: valor for clave, valor in valores.items() if valor > 100}

# C. Imprime el diccionario resultante
print("--- ANÁLISIS DE UMBRAL CRÍTICO ---")
print(f"Valores originales: {valores}")
print(f"Lecturas críticas (>100): {criticos}")  # Salida: {'S2': 120, 'S4': 200}
