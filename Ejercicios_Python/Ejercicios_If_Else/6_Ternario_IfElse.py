"""
6. EL OPERADOR TERNARIO (if/else EN UNA LÍNEA)
Objetivo: Escribir condicionales cortos como una sola expresión.

- Convierte un if/else de 4 líneas que asigna un estado a una sola línea
  usando el operador ternario: valor_si_true if condicion else valor_si_false.
- Usa un ternario dentro de un f-string para construir un mensaje.
- Usa un ternario dentro de una list comprehension para clasificar varios
  valores a la vez.
- Ten cuidado: para lógica compleja, es mejor usar if/else normal; el
  ternario es solo para casos simples y cortos.
"""

temperatura = 42.0

# A. if/else tradicional (4 líneas)
if temperatura > 40:
    estado = "CRÍTICO"
else:
    estado = "NORMAL"

# B. La misma lógica con operador ternario (1 línea)
estado_ternario = "CRÍTICO" if temperatura > 40 else "NORMAL"

print(f"Con if/else: {estado}")
print(f"Con ternario: {estado_ternario}")
print(f"¿Son iguales?: {estado == estado_ternario}")

# C. Ternario directamente dentro de un f-string
print(f"Estado del sensor: {'🔴 CRÍTICO' if temperatura > 40 else '🟢 NORMAL'}")

# D. Ternario dentro de una list comprehension para clasificar varios valores
lecturas = [38.0, 45.2, 22.1, 41.0, 19.5]
clasificacion = ["CRÍTICO" if t > 40 else "NORMAL" for t in lecturas]
print(f"Clasificación de todas las lecturas: {clasificacion}")
