"""
1. LA CONDICIÓN BÁSICA (if)
Objetivo: Ejecutar código solo cuando se cumple una condición.

- Crea una variable 'temperatura' con un valor numérico.
- Usa un 'if' para imprimir una alerta solo si la temperatura supera 30.
- Usa un segundo 'if' independiente para verificar si la temperatura es
  exactamente 0.
- Recuerda: si la condición es False, el bloque simplemente se salta;
  no hay ningún error ni mensaje.
"""

# A. Variable a evaluar
temperatura = 34.5

# B. El bloque indentado debajo del 'if' SOLO se ejecuta si la condición es True
if temperatura > 30:
    print(f"⚠️ Alerta: temperatura de {temperatura}°C supera el límite seguro.")

# C. Un 'if' independiente evalúa su propia condición, sin relación con el anterior
if temperatura == 0:
    print("El sensor marca cero grados exactos.")

# D. Si ninguna condición se cumple, el programa sigue sin imprimir nada
print("Verificación de temperatura finalizada.")
