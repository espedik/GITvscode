"""
1. EL RECORRIDO BÁSICO
Objetivo: Aprender las dos formas fundamentales de recorrer datos con 'for'.

- Crea una lista 'lecturas' con al menos 5 valores numéricos.
- Recorre la lista directamente con 'for valor in lecturas' e imprime cada uno.
- Recorre la misma lista usando 'for i in range(len(lecturas))' para acceder
  por índice, e imprime "posición -> valor".
- Recorre la lista con la forma EXPLÍCITA 'range(0, len(lecturas), 1)',
  indicando inicio, fin y paso aunque sean los valores por defecto.
- Usa range(inicio, fin, paso) con paso distinto de 1 para imprimir solo
  los índices pares.
"""

# A. Lista de lecturas de un sensor
lecturas = [12.5, 13.1, 11.8, 14.4, 10.9]

# B. Recorrido directo: 'valor' toma cada elemento de la lista en orden
print("--- Recorrido directo ---")
for valor in lecturas:
    print(valor)

# C. Recorrido por índice: útil cuando necesitas la POSICIÓN, no solo el dato
# range(len(lecturas)) es la forma corta; internamente equivale a
# range(0, len(lecturas), 1), es decir: empezar en 0, terminar antes de
# len(lecturas), avanzando de a 1 en 1.
print("--- Recorrido por índice ---")
for i in range(len(lecturas)):
    print(f"posición {i} -> {lecturas[i]}")

# D. La misma idea pero con los 3 parámetros ESCRITOS explícitamente:
# range(inicio, fin, paso) -> range(0, len(lecturas), 1)
# Es exactamente el mismo recorrido que en C, solo que sin depender de
# los valores por defecto de range(). Útil cuando el paso puede cambiar.
print("--- Recorrido por índice (forma explícita) ---")
for i in range(0, len(lecturas), 1):
    print(f"posición {i} -> {lecturas[i]}")

# E. range(inicio, fin, paso): controla exactamente qué índices visitar
# Aquí recorremos solo las posiciones pares (0, 2, 4...)
print("--- Solo posiciones pares ---")
for i in range(0, len(lecturas), 2):
    print(f"posición {i} -> {lecturas[i]}")
