"""
9. MATRIZ DE SENSORES
Objetivo: Acceder a datos en estructuras de dos dimensiones.

- Crea una lista 'matriz' que represente 2 grupos de sensores:
  Grupo 1: [20, 21, 22] | Grupo 2: [30, 31, 32]
- Accede e imprime el segundo valor del primer grupo.
- Accede e imprime el tercer valor del segundo grupo.
"""

# A. Crea una lista 'matriz' que represente 2 grupos de sensores
# Grupo 1 (Índice 0): [20, 21, 22] | Grupo 2 (Índice 1): [30, 31, 32]
matriz = [
    [20, 21, 22],  # Fila 0
    [30, 31, 32]   # Fila 1
]

# B. Accede e imprime el segundo valor del primer grupo
# Fila 0, Columna 1 (Recuerda que empezamos en 0)
valor_g1 = matriz[0][1]
print(f"Sensor 2 del Grupo 1: {valor_g1}")  # Salida: 21

# C. Accede e imprime el tercer valor del segundo grupo
# Fila 1, Columna 2
valor_g2 = matriz[1][2]
print(f"Sensor 3 del Grupo 2: {valor_g2}")  # Salida: 32

# D. TIP TÉCNICO: Puedes ver la matriz completa de forma visual
print("\nVisualización de la red de sensores:")
for fila in matriz:
    print(f"  Grupo de Sensores: {fila}")