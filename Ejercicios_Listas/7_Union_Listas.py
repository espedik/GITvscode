"""
7. FUSIÓN DE REPORTES
Objetivo: Aprender a combinar datos de diferentes fuentes.

- Crea dos listas: 'lote_A' (con 3 voltajes) y 'lote_B' (con otros 3).
- Crea una tercera lista 'reporte_total' usando el operador '+'.
- Usa el método .extend() para agregar una lista de 'errores' a 'reporte_total'.
- Imprime la longitud final del reporte.
"""

# A. Crea dos listas: 'lote_A' y 'lote_B' con 3 voltajes cada una
lote_A = [5.0, 5.1, 4.9]
lote_B = [12.0, 12.1, 11.8]

# B. Crea 'reporte_total' usando el operador '+'
# NOTA: El operador '+' genera una NUEVA lista en la memoria. 
# Las listas originales 'lote_A' y 'lote_B' permanecen intactas.
reporte_total = lote_A + lote_B

print(f"# Reporte inicial (Suma de lotes): {reporte_total}")

# C. Usa .extend() para agregar una lista de 'errores'
# NOTA: .extend() no crea una lista nueva, sino que "estira" la lista
# 'reporte_total' agregando los nuevos elementos al final. 
# Es más eficiente en términos de memoria para listas muy grandes.
errores = [-1.0, -99.9, -0.5]
reporte_total.extend(errores)

# D. Imprime la longitud final del reporte
# Usamos len() para confirmar cuántos datos procesamos en total.
print(f"# Reporte final con errores: {reporte_total}")
print(f"# Cantidad total de datos analizados: {len(reporte_total)}")