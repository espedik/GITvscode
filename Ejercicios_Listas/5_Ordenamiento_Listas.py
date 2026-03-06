"""
5. REORDENAMIENTO DE LOGS
Objetivo: Manipular el orden de los errores encontrados en un test.

- Crea una lista de IDs de error desordenados (ej. ["ERR-05", "ERR-01", "ERR-03"]).
- Ordena la lista alfabéticamente de forma permanente usando .sort().
- Invierte el orden de la lista usando .reverse().
- Compara el resultado usando la función sorted() en lugar de .sort().
"""

# A. Crea una lista de IDs de error desordenados
errores = ["ERR-05", "ERR-01", "ERR-08", "ERR-03", "ERR-02"]

# B. Ordena la lista alfabéticamente de forma permanente usando .sort()
# Por defecto, .sort() ordena de menor a mayor (A-Z o 0-9).
errores.sort()
print(f"Errores ordenados (Permanente): {errores}") 
# Salida: ['ERR-01', 'ERR-02', 'ERR-03', 'ERR-05', 'ERR-08']


# C. Invierte el orden de la lista usando .reverse()
# Ahora el error más alto quedará al principio.
errores.reverse()
print(f"Errores en orden descendente: {errores}")
# Salida: ['ERR-08', 'ERR-05', 'ERR-03', 'ERR-02', 'ERR-01']


# D. Ejemplo con sorted() para no perder el orden original
# Supongamos que tenemos una lista nueva de prioridad
prioridad = ["Alta", "Baja", "Media"]

# sorted() nos devuelve una lista nueva que guardamos en otra variable
prioridad_ordenada = sorted(prioridad)

print(f"Original: {prioridad}")          # Sigue siendo ["Alta", "Baja", "Media"]
print(f"Ordenada: {prioridad_ordenada}") # Es ["Alta", "Baja", "Media"] -> ["Alta", "Baja", "Media"] (alfabético)