"""
10. RESPALDO DE CONFIGURACIÓN
Objetivo: Aprender a resetear datos sin perder la referencia original.

- Crea un diccionario 'estado_actual' con 3 pares clave-valor.
- Crea una copia de seguridad llamada 'backup' usando .copy().
- Vacía el diccionario original 'estado_actual' usando .clear().
- Imprime ambos diccionarios para demostrar que el backup sobrevivió.
"""

# A. Diccionario con el estado actual del sistema
estado_actual = {"cpu": "OK", "ram": "OK", "disco": "WARNING"}

# B. Crea una copia de seguridad llamada 'backup' usando .copy()
# Como AI Software Test Engineer, esto permite guardar evidencias antes
# de que el sistema reinicie el estado para la siguiente prueba.
backup = estado_actual.copy()

# C. Vacía el diccionario original usando .clear()
# Esto simula un "Reset" de configuración tras procesar los datos.
estado_actual.clear()

# D. Imprime ambos diccionarios para demostrar que el backup sobrevivió
print("--- GESTIÓN DE MEMORIA ---")
print(f"Estado Actual (Original): {estado_actual}")  # Salida: {}
print(f"Estado del Backup (Copia): {backup}")         # Salida: {'cpu': 'OK', 'ram': 'OK', 'disco': 'WARNING'}

# E. PRUEBA DE IDENTIDAD:
# Verificamos si son objetos diferentes en la memoria RAM.
if estado_actual is not backup:
    print("✅ Confirmado: Son objetos independientes en memoria.")
