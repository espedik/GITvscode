# ==============================================================================
# 📔 NOTAS TÉCNICAS: CONTEO Y VALIDACIÓN DE FORMATO
# ==============================================================================
# .count(sub)     : Cuenta cuántas veces aparece una subcadena.
# .startswith(sub): ¿El string empieza con X? Devuelve True/False.
# .endswith(sub)  : ¿El string termina con X? Devuelve True/False.
# Muy usados para validar protocolos, extensiones de archivo o cabeceras
# de una trama antes de procesarla.
# ==============================================================================

# 🛠️ EJERCICIO 14: VALIDADOR DE ARCHIVOS DE LOG (SOLUCIÓN)
archivo = "reporte_turno_noche_2026.log"
trama = "STX;DATA;DATA;DATA;ETX"

# A. Verificamos que el archivo tenga la extensión correcta
es_log_valido = archivo.endswith(".log")

# B. Verificamos que la trama empiece con el byte de inicio esperado (STX)
inicio_valido = trama.startswith("STX")

# C. Contamos cuántos bloques de datos trae la trama
bloques_data = trama.count("DATA")

print(f"Archivo: {archivo}")
print(f"¿Es un archivo .log válido?: {es_log_valido}")
print(f"¿La trama empieza con STX?: {inicio_valido}")
print(f"Cantidad de bloques 'DATA' encontrados: {bloques_data}")
