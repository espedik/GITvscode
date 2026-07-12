"""
12. INVERSIÓN DE DATOS ESTRICTA
Objetivo: Manipular el flujo cronológico de la información.

- Crea una lista 'pasos' del 1 al 5.
- Invierte la lista usando el truco de slicing [::-1] y guárdala en 'pasos_inv'.
- Toma la lista original 'pasos' y usa .sort(reverse=True).
- Explica en un comentario cuál es la diferencia entre ambos resultados.
"""

# A. Crea una lista 'pasos' del 1 al 5
pasos = [1, 2, 3, 4, 5]

# B. Invierte usando slicing [::-1] y guarda en 'pasos_inv'
# Esto crea una COPIA nueva en la memoria. La original 'pasos' sigue igual.
pasos_inv = pasos[::-1]

#  memory operation]

# C. Usa .sort(reverse=True) en la lista original
# Esto NO crea una copia; modifica 'pasos' de forma PERMANENTE en la memoria.
pasos.sort(reverse=True)

# D. Resultados y Diferencias
print("--- RESULTADOS DE INVERSIÓN ---")
print(f"Original modificada (.sort): {pasos}")     # Salida: [5, 4, 3, 2, 1]
print(f"Copia creada ([::-1]):      {pasos_inv}") # Salida: [5, 4, 3, 2, 1]

# E. EXPLICACIÓN TÉCNICA (Comentario crítico para entrevista):
"""
DIFERENCIA CLAVE:
Si la lista fuera [1, 5, 2]:
- [::-1] devolvería [2, 5, 1] (Simplemente el orden inverso de aparición).
- .sort(reverse=True) devolvería [5, 2, 1] (Orden numérico de mayor a menor).

En Testing, usamos [::-1] para ver los logs más recientes primero sin 
alterar la lógica de los datos.
"""