"""
10. match / case: LA ALTERNATIVA MODERNA A if/elif (Python 3.10+)
Objetivo: Reescribir una cadena de if/elif como un match/case equivalente.

- Reescribe una clasificación de códigos de estado usando if/elif/else
  con la misma lógica usando match/case.
- Usa el patrón '|' dentro de un 'case' para agrupar varios valores que
  comparten la misma respuesta.
- Usa 'case _' como el equivalente al 'else' final (caso por defecto).
- Usa match/case con desempaquetado de tuplas para distinguir estructuras.
"""

codigo = "WARNING"

# A. Con if/elif/else (forma tradicional)
if codigo == "OK":
    mensaje = "Todo funciona correctamente."
elif codigo == "WARNING":
    mensaje = "Advertencia: revisar el sistema."
elif codigo in ("FAIL", "ERROR"):
    mensaje = "Error detectado: intervención requerida."
else:
    mensaje = "Código desconocido."

print(f"[if/elif] {codigo}: {mensaje}")

# B. La misma lógica con match/case: compara 'codigo' contra cada patrón
# en orden, hasta encontrar el primero que coincida.
match codigo:
    case "OK":
        mensaje = "Todo funciona correctamente."
    case "WARNING":
        mensaje = "Advertencia: revisar el sistema."
    case "FAIL" | "ERROR":
        # C. El '|' agrupa varios valores que producen la misma respuesta,
        # evitando repetir el mismo bloque para "FAIL" y para "ERROR"
        mensaje = "Error detectado: intervención requerida."
    case _:
        # D. 'case _' es un comodín: coincide con CUALQUIER valor no
        # capturado antes, igual que el 'else' final
        mensaje = "Código desconocido."

print(f"[match/case] {codigo}: {mensaje}")

# E. match/case también puede desempaquetar tuplas, algo que if/elif no
# hace de forma tan directa
punto = (0, 5)
match punto:
    case (0, 0):
        print("El punto está en el origen.")
    case (0, y):
        print(f"El punto está sobre el eje Y, en y={y}.")
    case (x, 0):
        print(f"El punto está sobre el eje X, en x={x}.")
    case (x, y):
        print(f"El punto está en una posición genérica: ({x}, {y}).")
