# ==============================================================================
# 📔 NOTAS TÉCNICAS: MÉTODOS DE TRANSFORMACIÓN
# ==============================================================================
# .strip(): Elimina espacios (o caracteres) al inicio y al final.
# .replace(viejo, nuevo): Cambia una parte del texto por otra.
# .upper() / .lower(): Cambia el "case" del texto.
# ==============================================================================

# 🛠️ EJERCICIO 2: LIMPIEZA DE LOGS (SOLUCIÓN)
entrada = "   ERROR: sensor fuera de rango   "

# 1. Quitar espacios y pasar a mayúsculas
limpio = entrada.strip().upper()

# 2. Reemplazar etiqueta para escalarlo
final = limpio.replace("ERROR", "CRÍTICO")

print(f"Mensaje procesado: '{final}'")
# Resultado esperado: "CRÍTICO: SENSOR FUERA DE RANGO"

#