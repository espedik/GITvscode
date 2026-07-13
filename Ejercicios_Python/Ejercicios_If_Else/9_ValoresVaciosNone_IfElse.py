"""
9. VALIDACIÓN DE None Y VALORES "VACÍOS" (TRUTHY / FALSY)
Objetivo: Aprender qué valores Python considera False sin escribirlo explícitamente.

- Crea una variable 'lectura' con valor None y valida con 'if lectura is None'.
- Crea una lista vacía y compruébala directamente con 'if not lista'
  en lugar de 'if len(lista) == 0'.
- Enumera qué valores son "falsy" en Python (None, 0, "", [], {}, False)
  probándolos todos dentro de un bucle.
- Usa 'is None' en vez de '== None', y explica qué diferencia hay.
"""

# A. None representa "ausencia de valor". Se compara con 'is', no con '=='
lectura = None
if lectura is None:
    print("No hay lectura disponible todavía (sensor sin datos).")
else:
    print(f"Lectura recibida: {lectura}")

# B. Una lista vacía es "falsy": 'if not lista' es más idiomático que
# 'if len(lista) == 0', y funciona igual para diccionarios y strings vacíos
errores = []
if not errores:
    print("No se registraron errores.")
else:
    print(f"Se registraron {len(errores)} errores.")

# C. Valores considerados "falsy" (equivalentes a False en un if)
valores_falsy = [None, 0, 0.0, "", [], {}, False]
print("--- Prueba de valores 'falsy' ---")
for valor in valores_falsy:
    if not valor:
        print(f"{valor!r} se comporta como False")

# D. 'is None' compara IDENTIDAD (es el mismo objeto None); '== None'
# compara VALOR y puede dar resultados inesperados con ciertos objetos
# personalizados. La convención en Python es siempre usar 'is None'.
dato = 0
print(f"¿dato is None?: {dato is None}")   # False: 0 no es None, aunque sea "falsy"
print(f"¿not dato?: {not dato}")           # True: 0 SÍ es "falsy"
