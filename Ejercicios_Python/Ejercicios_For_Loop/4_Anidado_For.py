"""
4. BUCLES ANIDADOS (FOR DENTRO DE FOR)
Objetivo: Recorrer estructuras de dos dimensiones, como una matriz de datos.

- Crea una matriz 'lecturas' (lista de listas) con 3 filas y 3 columnas.
- Usa un 'for' externo para recorrer cada fila y un 'for' interno para
  recorrer cada valor dentro de esa fila.
- Suma todos los valores de la matriz usando los dos bucles anidados.
- Encuentra la posición (fila, columna) del valor más alto de la matriz.
"""

# A. Matriz de temperaturas: 3 salas, 3 lecturas por sala
lecturas = [
    [21.5, 22.0, 20.8],
    [30.1, 29.5, 31.2],
    [18.0, 17.5, 19.1],
]

# B. Bucle externo recorre cada fila (cada sala); el interno recorre cada
# valor dentro de esa fila. Por cada vuelta del externo, el interno da
# la vuelta completa.
print("--- Recorrido completo de la matriz ---")
for fila_index, fila in enumerate(lecturas):
    for columna_index, valor in enumerate(fila):
        print(f"Sala {fila_index}, lectura {columna_index}: {valor}")

# C. Suma total acumulando en cada vuelta del bucle interno
suma_total = 0
for fila in lecturas:
    for valor in fila:
        suma_total += valor
print(f"Suma total de todas las lecturas: {suma_total:.1f}")

# D. Localizar el valor máximo junto con su posición exacta (fila, columna)
maximo = lecturas[0][0]
posicion_maxima = (0, 0)
for fila_index, fila in enumerate(lecturas):
    for columna_index, valor in enumerate(fila):
        if valor > maximo:
            maximo = valor
            posicion_maxima = (fila_index, columna_index)

print(f"Valor máximo: {maximo} en la posición {posicion_maxima}")
