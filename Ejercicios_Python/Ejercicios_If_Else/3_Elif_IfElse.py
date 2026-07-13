"""
3. MÚLTIPLES CAMINOS (if / elif / else)
Objetivo: Elegir entre más de dos opciones, evaluándolas en orden.

- Crea una variable 'codigo_error' (número entero).
- Usa if/elif/elif/.../else para clasificar el código en categorías:
  0 -> "Sin errores", 1-10 -> "Error leve", 11-50 -> "Error grave",
  cualquier otro caso -> "Error crítico".
- Recuerda: Python evalúa las condiciones EN ORDEN y se detiene en la
  PRIMERA que sea True; el resto de bloques ni se revisan.
"""

# A. Variable a clasificar
codigo_error = 27

# B. Python revisa cada condición en orden hasta encontrar la primera True
if codigo_error == 0:
    categoria = "Sin errores"
elif codigo_error <= 10:
    categoria = "Error leve"
elif codigo_error <= 50:
    categoria = "Error grave"
else:
    categoria = "Error crítico"

print(f"Código {codigo_error} clasificado como: {categoria}")

# C. IMPORTANTE: el orden de las condiciones importa. Si hubiéramos puesto
# "codigo_error <= 50" ANTES de "codigo_error <= 10", el caso "Error leve"
# nunca se alcanzaría, porque el elif anterior ya lo habría capturado.

# D. Probamos la clasificación con varios valores
for valor in [0, 5, 30, 100]:
    if valor == 0:
        print(f"{valor}: Sin errores")
    elif valor <= 10:
        print(f"{valor}: Error leve")
    elif valor <= 50:
        print(f"{valor}: Error grave")
    else:
        print(f"{valor}: Error crítico")
