"""
6. LA CLÁUSULA for...else
Objetivo: Ejecutar código solo si el bucle terminó SIN usar 'break'.

- Crea una lista 'componentes' y busca uno que probablemente no exista.
- Usa un 'for' con 'break' para buscarlo; agrega un bloque 'else' que se
  ejecute únicamente si el bucle no encontró nada (no hubo break).
- Repite el ejercicio buscando un componente que SÍ existe, para comparar
  el comportamiento.
"""

# A. 'else' en un for se ejecuta SOLO si el bucle terminó normalmente,
# es decir, si NUNCA se ejecutó un 'break' dentro de él.
componentes = ["CPU", "RAM", "Disco", "Ventilador"]

objetivo = "GPU"
print(f"--- Buscando '{objetivo}' ---")
for componente in componentes:
    if componente == objetivo:
        print(f"'{objetivo}' encontrado en el inventario.")
        break
else:
    # B. Como el bucle nunca hizo 'break', esto SÍ se ejecuta
    print(f"'{objetivo}' NO está en el inventario. Se debe registrar como nuevo.")

# C. Ahora buscamos un componente que sí existe, para comparar
objetivo = "RAM"
print(f"--- Buscando '{objetivo}' ---")
for componente in componentes:
    if componente == objetivo:
        print(f"'{objetivo}' encontrado en el inventario.")
        break
else:
    # D. Aquí NO se ejecuta, porque el bucle sí hizo 'break'
    print(f"'{objetivo}' NO está en el inventario.")
