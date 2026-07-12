# ==============================================================================
# 📔 NOTAS TÉCNICAS: FORMATO CON F-STRINGS
# ==============================================================================
# Es la forma más rápida y moderna de concatenar en Python.
# Permite formatear números: {variable:.2f} (para 2 decimales).
# Permite alinear texto: {variable:>15} (15 espacios a la derecha).
# ==============================================================================

# 🛠️ EJERCICIO 3: GENERADOR DE REPORTES (SOLUCIÓN)
sensor = "Termocupla"
valor = 23.5678
estado = "Activo"

# Creamos el reporte con formato profesional
# :.2f redondea el voltaje o temperatura para el log
# :>15 empuja el nombre del sensor para que los reportes salgan alineados
reporte = f"DISPOSITIVO: {sensor:>15} | LECTURA: {valor:.2f}°C | STATUS: {estado}"

print(reporte)