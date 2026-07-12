# ==============================================================================
# 📔 NOTAS TÉCNICAS: ITERACIÓN POR ÍNDICE
# ==============================================================================
# Al usar range(0, len(cadena), 1), la variable 'i' representa el número
# de la posición (0, 1, 2...). Para obtener la letra, usamos cadena[i].
# ==============================================================================

# 🛠️ EJERCICIO 7: CONTADOR DE ALERTAS (SOLUCIÓN)
trama_datos = "OK-OK-ERROR-OK-FAIL-OK-ERROR"

conteo_e = 0
# Recorremos el string usando su longitud total
for i in range(0, len(trama_datos), 1):
    # Accedemos al carácter en la posición actual
    if trama_datos[i] == "E":
        conteo_e += 1

print(f"Análisis de trama: Se detectaron {conteo_e} inicios de error ('E').")

#