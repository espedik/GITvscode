"""
8. COMPARACIONES ENCADENADAS Y VALIDACIÓN DE RANGOS
Objetivo: Verificar si un valor está dentro de un rango, de forma legible.

- Crea una variable 'porcentaje' y valida que esté entre 0 y 100 usando
  una comparación encadenada: "0 <= porcentaje <= 100".
- Compara esa forma con la alternativa equivalente usando 'and'.
- Clasifica un valor en rangos (bajo, medio, alto) usando comparaciones
  encadenadas dentro de un if/elif/else.
"""

porcentaje = 87

# A. Comparación encadenada: Python evalúa esto como "0 <= porcentaje" AND
# "porcentaje <= 100", pero en una sola expresión legible
if 0 <= porcentaje <= 100:
    print(f"{porcentaje}% es un valor válido.")
else:
    print(f"{porcentaje}% está fuera de rango.")

# B. La forma equivalente usando 'and' explícito (más larga, mismo resultado)
if porcentaje >= 0 and porcentaje <= 100:
    print("Validación equivalente con 'and': también es válido.")

# C. Clasificación de un valor en varios rangos usando comparaciones encadenadas
temperatura = 55

if temperatura < 0:
    categoria = "Congelamiento"
elif 0 <= temperatura <= 30:
    categoria = "Normal"
elif 30 < temperatura <= 60:
    categoria = "Elevada"
else:
    categoria = "Peligrosa"

print(f"Temperatura {temperatura}°C clasificada como: {categoria}")

# D. Validación de una fecha simple: día entre 1 y 31, mes entre 1 y 12
dia, mes = 15, 13
fecha_valida = 1 <= dia <= 31 and 1 <= mes <= 12
print(f"¿Fecha (día={dia}, mes={mes}) válida?: {fecha_valida}")
