"""
3. EL EXTRACTOR DE VISTAS
Objetivo: Extraer subconjuntos de datos de un diccionario de configuración.

- Crea un diccionario 'sensor' con al menos 4 pares clave-valor.
- Extrae e imprime todas las claves usando .keys().
- Extrae e imprime todos los valores usando .values().
- Extrae e imprime todos los pares clave-valor usando .items().
- Convierte el resultado de .keys() en una lista real con list().
"""

# A. Diccionario de configuración de un sensor
sensor = {
    "id": "SNS-014",
    "tipo": "Presion",
    "unidad": "bar",
    "activo": True
}

# B. Extrae todas las claves con .keys()
claves = sensor.keys()
print(f"Claves: {claves}")  # Salida: dict_keys(['id', 'tipo', 'unidad', 'activo'])

# C. Extrae todos los valores con .values()
valores = sensor.values()
print(f"Valores: {valores}")  # Salida: dict_values(['SNS-014', 'Presion', 'bar', True])

# D. Extrae todos los pares con .items()
pares = sensor.items()
print(f"Pares clave-valor: {pares}")

# E. Convierte .keys() en una lista real con list()
# NOTA: .keys() devuelve una "vista", no una lista. Si necesitas indexar
# o manipularla como lista (ej. lista_claves[0]), debes convertirla.
lista_claves = list(claves)
print(f"Claves como lista: {lista_claves}")  # Salida: ['id', 'tipo', 'unidad', 'activo']
