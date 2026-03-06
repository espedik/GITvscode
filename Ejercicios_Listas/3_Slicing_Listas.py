"""

3. EL CORTADOR DE SEÑALES
Objetivo: Extraer subconjuntos de datos de una lista de telemetría.

- Crea una lista de lecturas de voltaje del 1 al 10.
- Extrae e imprime los primeros 3 valores.
- Extrae e imprime los últimos 3 valores.
- Crea una sub-lista que contenga solo los valores de los índices 2 al 6.
- Imprime la lista saltando de 2 en 2 (paso del slicing).

"""

voltajes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

primeros_tres = voltajes[:3]
print(f"Primeros 3 voltajes: {primeros_tres}") # Salida: [1, 2, 3]

ultimos_tres = voltajes[-3:]
print(f"Últimos 3 voltajes: {ultimos_tres}")   # Salida: [8, 9, 10]

rango_medio = voltajes[2:7]
print(f"Rango del índice 2 al 6: {rango_medio}") # Salida: [3, 4, 5, 6, 7]

posiciones_pares = voltajes[::2]
print(f"Lecturas con paso de 2: {posiciones_pares}") # Salida: [1, 3, 5, 7, 9]