"""
3. RECORRIDO PARALELO CON zip()
Objetivo: Iterar dos o más listas relacionadas al mismo tiempo.

- Crea dos listas paralelas: 'sensores' (nombres) y 'temperaturas' (valores).
- Usa zip() para recorrer ambas listas a la vez e imprimir "sensor: temperatura".
- Agrega una tercera lista 'unidades' y recorre las tres listas juntas con zip().
- Usa zip() junto con dict() para construir un diccionario a partir de las
  dos primeras listas en una sola línea.
"""

# A. Listas paralelas: la posición 'i' de cada lista describe al mismo sensor
sensores = ["SNS-01", "SNS-02", "SNS-03"]
temperaturas = [25.4, 30.1, 18.7]
unidades = ["C", "C", "C"]

# B. zip() empareja los elementos de ambas listas posición a posición
print("--- Lecturas por sensor ---")
for nombre, temperatura in zip(sensores, temperaturas):
    print(f"{nombre}: {temperatura}")

# C. zip() acepta más de dos listas a la vez
print("--- Lecturas con unidad ---")
for nombre, temperatura, unidad in zip(sensores, temperaturas, unidades):
    print(f"{nombre}: {temperatura}{unidad}")

# D. zip() + dict(): construir un diccionario clave-valor en una sola línea
mapa_temperaturas = dict(zip(sensores, temperaturas))
print(f"Diccionario generado: {mapa_temperaturas}")

# NOTA: si las listas tienen distinta longitud, zip() se detiene en la más corta.
