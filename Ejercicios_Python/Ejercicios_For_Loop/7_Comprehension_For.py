"""
7. COMPREHENSIONS AVANZADAS (LIST, SET Y DICT)
Objetivo: Reemplazar bucles 'for' de varias líneas por una sola expresión.

- Convierte un bucle for tradicional que filtra y transforma una lista en
  una list comprehension equivalente.
- Crea una list comprehension con condición if/else dentro de la expresión.
- Crea una comprehension anidada para "aplanar" una matriz (lista de listas).
- Crea un set comprehension para obtener valores únicos.
"""

lecturas = [12.5, -3.2, 14.8, 0.0, -1.5, 13.2, -0.1, 15.6]

# A. Bucle for tradicional: filtrar valores positivos y duplicarlos
resultado_bucle = []
for valor in lecturas:
    if valor > 0:
        resultado_bucle.append(valor * 2)

# B. La misma lógica en una sola línea con list comprehension
# Sintaxis: [expresion for elemento in iterable if condicion]
resultado_comprehension = [valor * 2 for valor in lecturas if valor > 0]

print(f"Con bucle for: {resultado_bucle}")
print(f"Con comprehension: {resultado_comprehension}")
print(f"¿Son iguales?: {resultado_bucle == resultado_comprehension}")

# C. Comprehension con if/else DENTRO de la expresión (no como filtro)
# Aquí clasificamos cada valor sin descartar ninguno
etiquetas = ["POSITIVO" if valor >= 0 else "NEGATIVO" for valor in lecturas]
print(f"Clasificación: {etiquetas}")

# D. Comprehension anidada para aplanar una matriz en una sola lista
matriz = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
matriz_aplanada = [valor for fila in matriz for valor in fila]
print(f"Matriz aplanada: {matriz_aplanada}")

# E. Set comprehension: igual que list comprehension pero con {} y sin duplicados
codigos = ["OK", "FAIL", "OK", "WARNING", "FAIL", "OK"]
codigos_unicos = {codigo for codigo in codigos}
print(f"Códigos únicos encontrados: {codigos_unicos}")
