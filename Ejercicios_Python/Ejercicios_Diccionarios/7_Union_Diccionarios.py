"""
7. FUSIÓN DE CONFIGURACIONES
Objetivo: Aprender a combinar diccionarios de diferentes fuentes.

- Crea dos diccionarios: 'config_default' y 'config_usuario', donde
  'config_usuario' sobreescribe alguna clave de 'config_default'.
- Crea un tercer diccionario 'config_final' usando el operador '|'.
- Usa el método .update() para agregar un diccionario de 'config_extra'
  a 'config_final'.
- Imprime el diccionario final combinado.
"""

# A. Configuración por defecto y la personalizada por el usuario
config_default = {"puerto": "COM1", "baudrate": 9600, "timeout": 5}
config_usuario = {"baudrate": 115200, "modo": "debug"}

# B. Crea 'config_final' usando el operador '|' (Python 3.9+)
# NOTA: En caso de claves repetidas, el diccionario de la DERECHA gana.
# Este operador crea un diccionario NUEVO; los originales no se modifican.
config_final = config_default | config_usuario
print(f"# Configuración fusionada: {config_final}")
# Salida: {'puerto': 'COM1', 'baudrate': 115200, 'timeout': 5, 'modo': 'debug'}

# C. Usa .update() para agregar 'config_extra' a 'config_final'
# NOTA: .update() modifica 'config_final' de forma PERMANENTE (in-place),
# a diferencia de '|' que crea una copia nueva.
config_extra = {"reintentos": 3}
config_final.update(config_extra)

# D. Imprime el diccionario final combinado
print(f"# Configuración final con extras: {config_final}")
print(f"# Cantidad total de parámetros: {len(config_final)}")
