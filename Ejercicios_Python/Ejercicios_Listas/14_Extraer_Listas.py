"""
14. DESEMPAQUETADO DE MENSAJES CAN (CAN BUS UNPACKING)
Objetivo: Aislar el Header, el Body y el Checksum de una ráfaga de datos.

- Tienes una lista: datos_can = [0x1F, 0x01, 0xFF, 0x00, 0xAB, 0x22, 0x05]
- Usa el asterisco (*) para guardar el primer elemento en 'header', 
  el último en 'checksum' y todos los del medio en una lista llamada 'payload'.
- Imprime las tres variables por separado.
"""

# ==============================================================================
# 📔 NOTAS TÉCNICAS: EXTENDED ITERABLE UNPACKING
# ==============================================================================
# El desempaquetado con '*' permite capturar múltiples elementos de una lista
# sin saber cuántos hay exactamente en medio. 
#
# Regla: Solo puedes usar UN asterisco por cada operación de desempaquetado.
# ==============================================================================

# A. Datos de ejemplo (Mensaje CAN con Header, Payload y Checksum)
# 0x1F es el Header, 0x05 es el Checksum, lo demás es la carga de datos (Payload).
datos_can = [0x1F, 0x01, 0xFF, 0x00, 0xAB, 0x22, 0x05]

# B. Uso del desempaquetado extendido
# header toma el primer valor.
# checksum toma el último valor.
# *payload toma TODO lo que quedó en medio como una lista nueva.
header, *payload, checksum = datos_can

# C. Resultados
print("--- DESEMPAQUETADO DE PROTOCOLO ---")
print(f"ID/Header (Hex): {hex(header)}")   # 0x1f
print(f"Checksum  (Hex): {hex(checksum)}") # 0x05
print(f"Payload de datos: {payload}")      # [1, 255, 0, 171, 34] (en decimal)