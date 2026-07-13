"""
9. RECORRIENDO DICCIONARIOS CON FOR
Objetivo: Dominar las tres formas de iterar un diccionario con 'for'.

- Crea un diccionario 'inventario' con al menos 4 componentes y su cantidad.
- Recorre solo las claves con 'for clave in inventario'.
- Recorre solo los valores con 'for valor in inventario.values()'.
- Recorre pares clave-valor con 'for clave, valor in inventario.items()'.
- Modifica los valores de un diccionario MIENTRAS lo recorres con .items()
  (sumando una unidad a cada cantidad).
"""

inventario = {
    "CPU": 12,
    "RAM": 34,
    "Disco": 8,
    "Ventilador": 20,
}

# A. Recorrer un diccionario directamente itera solo sobre sus CLAVES
print("--- Solo claves ---")
for clave in inventario:
    print(clave)

# B. .values() itera solo sobre los valores, sin las claves
print("--- Solo valores ---")
for valor in inventario.values():
    print(valor)

# C. .items() es la forma más común: entrega clave y valor juntos
print("--- Clave y valor ---")
for clave, valor in inventario.items():
    print(f"{clave}: {valor} unidades")

# D. Para MODIFICAR valores mientras iteras, usa la clave para reescribir
# el diccionario original (nunca agregues/elimines claves durante el for).
for clave, cantidad in inventario.items():
    inventario[clave] = cantidad + 1

print(f"Inventario actualizado (+1 unidad cada uno): {inventario}")
