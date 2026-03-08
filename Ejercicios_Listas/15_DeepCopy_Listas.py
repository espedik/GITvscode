"""
15. CLONACIÓN SEGURA DE MATRICES
Objetivo: Aprender la diferencia entre copia superficial y profunda.

- Importa el módulo 'copy'.
- Crea una matriz: configuracion = [[1, 0], [0, 1]] (una matriz identidad).
- Crea 'config_test' usando copy.deepcopy(configuracion).
- Cambia un valor dentro de 'config_test' y demuestra con un print que 
  la matriz 'configuracion' original NO cambió.
"""
# ==============================================================================
# 📔 NOTAS TÉCNICAS: SHALLOW COPY (SUPERFICIAL) VS DEEP COPY (PROFUNDA)
# ==============================================================================
# 1. .copy(): Es una copia superficial. Copia la lista exterior, pero los 
#    objetos internos (las sub-listas) siguen siendo los mismos en la memoria.
# 2. copy.deepcopy(): Crea una réplica total. Clona la lista exterior y todas
#    las sub-listas de forma independiente.
# ==============================================================================

import copy

# A. Crea una matriz: configuracion (Matriz Identidad 2x2)
configuracion = [[1, 0], [0, 1]]

# B. Crear 'config_test' usando deepcopy()
# Esto garantiza que si modificamos config_test, la original no sufra cambios.
config_test = copy.deepcopy(configuracion)

# C. Modificamos un valor dentro de 'config_test' (Fila 0, Columna 1)
# Vamos a cambiar el 0 por un 5.
config_test[0][1] = 5

# D. Demostración con prints
print("--- PRUEBA DE CLONACIÓN SEGURA ---")
print(f"Original (configuracion): {configuracion}") # Salida: [[1, 0], [0, 1]]
print(f"Copia de Test (config_test): {config_test}")  # Salida: [[1, 5], [0, 1]]