"""
9. FICHERO DE SENSORES ANIDADOS
Objetivo: Acceder a datos en diccionarios dentro de diccionarios.

- Crea un diccionario 'red_sensores' donde cada clave es el ID de un sensor
  y el valor es OTRO diccionario con sus propiedades ("tipo", "valor").
- Accede e imprime el "valor" del sensor "S1".
- Accede e imprime el "tipo" del sensor "S2".
- Recorre todos los sensores e imprime un resumen de cada uno.
"""

# A. Diccionario anidado: cada sensor tiene su propio sub-diccionario de datos
red_sensores = {
    "S1": {"tipo": "Temperatura", "valor": 21.5},
    "S2": {"tipo": "Presion", "valor": 101.3},
}

# B. Accede al "valor" del sensor "S1"
# Primero entramos a la clave "S1", y de ahí extraemos su clave "valor".
valor_s1 = red_sensores["S1"]["valor"]
print(f"Valor del sensor S1: {valor_s1}")  # Salida: 21.5

# C. Accede al "tipo" del sensor "S2"
tipo_s2 = red_sensores["S2"]["tipo"]
print(f"Tipo del sensor S2: {tipo_s2}")  # Salida: Presion

# D. TIP TÉCNICO: Puedes recorrer la estructura completa de forma visual
print("\nResumen de la red de sensores:")
for id_sensor, propiedades in red_sensores.items():
    print(f"  {id_sensor} -> Tipo: {propiedades['tipo']}, Valor: {propiedades['valor']}")
