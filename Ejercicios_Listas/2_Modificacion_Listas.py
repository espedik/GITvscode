"""
2. GESTIÓN DE INVENTARIO DE HARDWARE
Objetivo: Practicar la inserción y eliminación dinámica de datos.

- Crea una lista vacía llamada 'equipo_test'.
- Agrega 3 herramientas usando el método .append().
- Inserta un nuevo elemento en la segunda posición (índice 1) usando .insert().
- Elimina el último elemento con .pop() y uno específico por nombre con .remove().
"""

equipo_test = []

equipo_test.append("Multimetro")
equipo_test.append("Osciloscopio")
equipo_test.append("Fuente")
print(equipo_test)

equipo_test.insert(1, "Cautin")
print(equipo_test)

herramienta_fuera = equipo_test.pop()
print(f"# Nota: Se eliminó '{herramienta_fuera}' porque era el último en la lista.")
print(equipo_test)