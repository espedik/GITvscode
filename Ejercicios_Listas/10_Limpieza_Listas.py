"""
10. LIMPIEZA DE BUFFER
Objetivo: Aprender a resetear datos sin perder la referencia.

- Crea una lista 'buffer_datos' con 5 números aleatorios.
- Crea una copia de seguridad llamada 'backup' usando .copy().
- Vacía la lista original 'buffer_datos' usando .clear().
- Imprime ambas listas para demostrar que el backup sobrevivió.
"""

# A. Crea una lista 'buffer_datos' con 5 números (simulando lecturas)
buffer_datos = [10.2, 15.5, 12.1, 18.9, 14.3]

# B. Crea una copia de seguridad llamada 'backup' usando .copy()
# Como AI Software Test Engineer, esto te permite guardar evidencias antes
# de que el sistema limpie los logs para la siguiente prueba.
backup = buffer_datos.copy()

# C. Vacía la lista original 'buffer_datos' usando .clear()
# Esto simula un "Reset" de hardware o de memoria tras procesar los datos.
buffer_datos.clear()

# D. Imprime ambas listas para demostrar que el backup sobrevivió
print("--- GESTIÓN DE MEMORIA ---")
print(f"Estado del Buffer (Original): {buffer_datos}") # Salida: []
print(f"Estado del Backup (Copia):     {backup}")       # Salida: [10.2, 15.5, 12.1, 18.9, 14.3]

# E. PRUEBA DE IDENTIDAD:
# Verificamos si son objetos diferentes en la memoria RAM.
if buffer_datos is not backup:
    print("✅ Confirmado: Son objetos independientes en memoria.")