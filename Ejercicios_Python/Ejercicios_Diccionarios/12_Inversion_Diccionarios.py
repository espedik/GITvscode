"""
12. INVERSIÓN CLAVE-VALOR
Objetivo: Transformar un diccionario intercambiando claves por valores.

- Crea un diccionario 'codigos' donde la clave es un ID y el valor es
  una descripción (ej. {"E01": "Fallo_Sensor", "E02": "Fallo_Comunicacion"}).
- Crea un diccionario 'codigos_inv' donde los valores originales pasen
  a ser las claves, y las claves originales pasen a ser los valores.
- Hazlo usando Dict Comprehension.
- Explica en un comentario qué pasaría si hubiera valores duplicados.
"""

# A. Diccionario original de códigos de error
codigos = {"E01": "Fallo_Sensor", "E02": "Fallo_Comunicacion", "E03": "Fallo_Alimentacion"}

# B. Invierte el diccionario usando Dict Comprehension
# Recorremos los pares (clave, valor) y los reescribimos como (valor, clave).
codigos_inv = {valor: clave for clave, valor in codigos.items()}

# C. Resultados
print("--- INVERSIÓN DE DICCIONARIO ---")
print(f"Original: {codigos}")
print(f"Invertido: {codigos_inv}")
# Salida: {'Fallo_Sensor': 'E01', 'Fallo_Comunicacion': 'E02', 'Fallo_Alimentacion': 'E03'}

# D. EXPLICACIÓN TÉCNICA (Comentario crítico para entrevista):
"""
RIESGO DE VALORES DUPLICADOS:
Las claves de un diccionario deben ser ÚNICAS. Si dos claves originales
tuvieran el mismo valor (ej. "E01": "Fallo" y "E04": "Fallo"), al invertir
la última en procesarse SOBRESCRIBIRÍA a la anterior, y perderías uno
de los códigos de error en la inversión.
"""
