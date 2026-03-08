# ==============================================================================
# 📔 NOTAS TÉCNICAS: MÉTODOS DE VALIDACIÓN (.is...)
# ==============================================================================
# Devuelven True o False. Ideales para poner dentro de un 'if'.
# .isdigit(): ¿Son solo números?
# .isalnum(): ¿Son letras y números (sin signos)?
# .startswith() / .endswith(): ¿Empieza o termina con X?
# ==============================================================================

# 🛠️ EJERCICIO 5: VALIDADOR DE TELEMETRÍA (SOLUCIÓN)
id_sensor = "S001"
lectura = "25"

# Validaciones críticas para un Test Engineer
es_numero = lectura.isdigit()
es_id_valido = id_sensor.startswith("S") and id_sensor[1:].isdigit()

print(f"¿La lectura es procesable como número?: {es_numero}")
print(f"¿El ID sigue el formato de protocolo (S + número)?: {es_id_valido}")