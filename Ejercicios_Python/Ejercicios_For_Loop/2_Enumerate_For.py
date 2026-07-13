"""
2. ÍNDICE Y VALOR CON enumerate()
Objetivo: Obtener posición y valor al mismo tiempo, sin usar range(len(...)).

- Crea una lista 'componentes' con al menos 5 nombres de piezas.
- Recorre la lista con enumerate() e imprime "índice: nombre".
- Usa el parámetro 'start' de enumerate() para que la numeración empiece en 1.
- Usa enumerate() para encontrar en qué posición está un componente específico
  sin usar el método .index().
"""

# A. Lista de componentes a inspeccionar
componentes = ["CPU", "RAM", "Disco", "Ventilador", "Fuente"]

# B. enumerate() devuelve pares (índice, valor) en cada vuelta
print("--- Inventario (índice desde 0) ---")
for indice, nombre in enumerate(componentes):
    print(f"{indice}: {nombre}")

# C. start=1 desplaza la numeración para reportes "amigables" al usuario
print("--- Inventario (numeración desde 1) ---")
for numero, nombre in enumerate(componentes, start=1):
    print(f"Ítem #{numero}: {nombre}")

# D. Buscar la posición de un componente sin usar .index()
objetivo = "Ventilador"
for indice, nombre in enumerate(componentes):
    if nombre == objetivo:
        print(f"'{objetivo}' encontrado en la posición {indice}")
        break
