"""
13. SINCRONIZACIÓN DE SENSORES
Objetivo: Operar con múltiples listas al mismo tiempo de forma eficiente.

- Tienes dos listas: 'nombres_sensores' y 'lecturas_actuales'.
- Usa 'enumerate()' para imprimir cada sensor con su número de orden (empezando en 1).
- Usa 'zip()' para crear un reporte que diga: "El [nombre] reportó [valor] unidades".
"""

nombres_sensores = ["Temp_Motor", "Presion_Aceite", "Nivel_Bateria"]
lecturas_actuales = [85.5, 40.2, 12.6]

# --- PARTE A: Uso de enumerate() ---
# Objetivo: Obtener el índice y el valor al mismo tiempo.
# Usamos 'start=1' para que el conteo sea humano (1, 2, 3...) y no de sistema (0, 1, 2...).

print("--- REPORTE DE ESTADO DE SENSORES ---")
for i, nombre in enumerate(nombres_sensores, start=1):
    print(f"Sensor #{i}: {nombre} detectado.")

# --- PARTE B: Uso de zip() ---
# Objetivo: Recorrer dos listas en paralelo como si fueran una sola tabla.

print("\n--- TELEMETRÍA EN TIEMPO REAL ---")
for nombre, valor in zip(nombres_sensores, lecturas_actuales):
    print(f"El {nombre} tiene una lectura de {valor} unidades.")