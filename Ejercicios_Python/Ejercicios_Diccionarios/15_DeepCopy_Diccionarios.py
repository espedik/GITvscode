"""
15. CLONACIÓN SEGURA DE CONFIGURACIONES ANIDADAS
Objetivo: Aprender la diferencia entre copia superficial y profunda en diccionarios.

- Importa el módulo 'copy'.
- Crea un diccionario anidado: configuracion = {"red": {"ip": "192.168.1.1", "puerto": 80}}.
- Crea 'config_test' usando copy.deepcopy(configuracion).
- Cambia un valor dentro de 'config_test' y demuestra con un print que
  el diccionario 'configuracion' original NO cambió.
"""
# ==============================================================================
# 📔 NOTAS TÉCNICAS: SHALLOW COPY (SUPERFICIAL) VS DEEP COPY (PROFUNDA)
# ==============================================================================
# 1. .copy(): Es una copia superficial. Copia el diccionario exterior, pero
#    los objetos internos (los sub-diccionarios) siguen siendo los mismos
#    en la memoria.
# 2. copy.deepcopy(): Crea una réplica total. Clona el diccionario exterior
#    y todos los sub-diccionarios de forma independiente.
# ==============================================================================

import copy

# A. Crea un diccionario anidado: configuracion
configuracion = {"red": {"ip": "192.168.1.1", "puerto": 80}}

# B. Crear 'config_test' usando deepcopy()
# Esto garantiza que si modificamos config_test, la original no sufra cambios.
config_test = copy.deepcopy(configuracion)

# C. Modificamos un valor dentro de 'config_test' (clave anidada "puerto")
config_test["red"]["puerto"] = 8080

# D. Demostración con prints
print("--- PRUEBA DE CLONACIÓN SEGURA ---")
print(f"Original (configuracion): {configuracion}")  # Salida: {'red': {'ip': '192.168.1.1', 'puerto': 80}}
print(f"Copia de Test (config_test): {config_test}")  # Salida: {'red': {'ip': '192.168.1.1', 'puerto': 8080}}
