"""
4. CONDICIONALES ANIDADOS (if DENTRO de if)
Objetivo: Tomar decisiones que dependen de otra decisión previa.

- Crea variables 'dispositivo_activo' (bool) y 'temperatura' (número).
- Usa un 'if' externo para verificar si el dispositivo está activo.
- Dentro de ese bloque, usa otro 'if/else' para evaluar la temperatura
  SOLO si el dispositivo está activo.
- Compara el resultado con la alternativa de usar 'and' (ejercicio 5) para
  notar cuándo conviene anidar y cuándo combinar condiciones.
"""

dispositivo_activo = True
temperatura = 45.0

# A. Primero se verifica la condición "externa": ¿el dispositivo está activo?
if dispositivo_activo:
    print("Dispositivo activo. Evaluando temperatura...")

    # B. Este bloque SOLO se alcanza si el 'if' externo fue True.
    # Es una decisión que depende completamente de la anterior.
    if temperatura > 40:
        print("🔥 Temperatura crítica: iniciar apagado de emergencia.")
    else:
        print("✅ Temperatura dentro de rango normal.")
else:
    # C. Si el dispositivo está apagado, ni siquiera tiene sentido revisar
    # la temperatura, así que ese bloque nunca se ejecuta.
    print("Dispositivo apagado. No se evalúa temperatura.")

# D. Ejemplo con 3 niveles de anidamiento: dispositivo, modo y temperatura
modo = "AUTO"
if dispositivo_activo:
    if modo == "AUTO":
        if temperatura > 40:
            print("Modo AUTO: reduciendo potencia automáticamente.")
        else:
            print("Modo AUTO: operación normal.")
    else:
        print(f"Modo manual ({modo}): el operador decide.")
