"""
13. CONSTRUCCIÓN DE REPORTE DESDE DOS LISTAS
Objetivo: Combinar dos listas paralelas en un solo diccionario de forma eficiente.

- Tienes dos listas: 'nombres_sensores' y 'lecturas_actuales'.
- Usa 'zip()' junto con dict() para construir un diccionario 'reporte'
  que una cada nombre con su lectura correspondiente.
- Recorre el diccionario resultante con .items() e imprime un mensaje
  por cada sensor.
"""

nombres_sensores = ["Temp_Motor", "Presion_Aceite", "Nivel_Bateria"]
lecturas_actuales = [85.5, 40.2, 12.6]

# --- PARTE A: Uso de zip() + dict() ---
# Objetivo: Emparejar cada nombre con su lectura en un solo diccionario.
# zip() une las dos listas posición a posición; dict() convierte esos pares en claves y valores.
reporte = dict(zip(nombres_sensores, lecturas_actuales))
print(f"Diccionario construido: {reporte}")
# Salida: {'Temp_Motor': 85.5, 'Presion_Aceite': 40.2, 'Nivel_Bateria': 12.6}

# --- PARTE B: Recorrido con .items() ---
print("\n--- TELEMETRÍA EN TIEMPO REAL ---")
for nombre, valor in reporte.items():
    print(f"El {nombre} tiene una lectura de {valor} unidades.")
