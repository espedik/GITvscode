# ==============================================================================
# 📔 NOTAS TÉCNICAS: FORMATEO AVANZADO CON F-STRINGS
# ==============================================================================
# f"{valor:<10}"  : Alinea a la izquierda dejando 10 espacios de ancho.
# f"{valor:>10}"  : Alinea a la derecha dejando 10 espacios de ancho.
# f"{valor:^10}"  : Centra el valor en 10 espacios de ancho.
# f"{numero:.2f}" : Redondea un decimal a 2 cifras después del punto.
# f"{numero:05d}" : Rellena un entero con ceros a la izquierda hasta 5 dígitos.
# IMPORTANTE: si concatenas varios campos con ancho, deja siempre un separador
# (espacio, "|", etc.) entre ellos, o el resultado se leerá como un solo número.
# ==============================================================================

# 🛠️ EJERCICIO 16: REPORTE TABULADO DE SENSORES (SOLUCIÓN)
sensores = [
    ("SNS-01", 25.678, 3),
    ("SNS-14", 101.2, 27),
    ("SNS-99", 9.5, 145),
]

print(f"{'ID':<8} | {'Temp(C)':>10} | {'Ciclos':>8}")
for id_sensor, temperatura, ciclos in sensores:
    # A. ID alineado a la izquierda, temperatura y ciclos a la derecha
    # B. La temperatura se redondea a 2 decimales con .2f
    # C. Un separador " | " evita que los campos se lean como un solo número
    print(f"{id_sensor:<8} | {temperatura:>10.2f} | {ciclos:>8d}")

# D. El zero-padding (05d) se usa para IDs numéricos, no para tablas con columnas
numero_lote = 7
print(f"\nCódigo de lote generado: LOTE-{numero_lote:05d}")
