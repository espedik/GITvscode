"""

8. LOCALIZADOR DE FALLOS
Objetivo: Encontrar la ubicación y recurrencia de errores.

- Crea una lista 'logs' con varios estados: ["OK", "FAIL", "OK", "OK", "FAIL"].
- Usa .count() para saber cuántos "FAIL" hubo en total.
- Usa .index() para encontrar en qué posición ocurrió el PRIMER "FAIL".
- Imprime ambos resultados con mensajes claros.

"""

# A. Crea una lista 'logs' con varios estados de ejecución
logs = ["OK", "FAIL", "OK", "OK", "FAIL"]

# B. Usa .count() para saber cuántos "FAIL" hubo en total
# Esto es vital para calcular el "Pass Rate" de tus pruebas en Google/Intelliswift.
total_fallos = logs.count("FAIL")

# C. Usa .index() para encontrar la posición del PRIMER "FAIL"
# Recuerda: .index() solo devuelve el primero que encuentra de izquierda a derecha.
indice_primer_fallo = logs.index("FAIL")

# D. Imprime ambos resultados con mensajes profesionales
print(f"--- REPORTE DE EJECUCIÓN ---")
print(f"Total de estados analizados: {len(logs)}")
print(f"Número de fallos detectados: {total_fallos}")
print(f"El primer fallo ocurrió en el paso número: {indice_primer_fallo}")

# E. TIP PRO: Si quieres la posición humana (empezando en 1), suma 1 al índice
print(f"Ubicación humana del primer error: {indice_primer_fallo + 1}")