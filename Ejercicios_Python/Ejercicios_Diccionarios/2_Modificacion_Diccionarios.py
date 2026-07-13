"""
2. GESTIÓN DE CONFIGURACIÓN DE PRUEBA
Objetivo: Practicar la inserción, actualización y eliminación dinámica de claves.

- Crea un diccionario vacío llamado 'config_test'.
- Agrega 3 claves con sus valores usando asignación directa (ej. config_test["puerto"] = "COM3").
- Actualiza el valor de una clave existente.
- Elimina una clave con .pop() y otra con del.
"""

config_test = {}

config_test["puerto"] = "COM3"
config_test["baudrate"] = 9600
config_test["timeout"] = 5
print(config_test)

config_test["baudrate"] = 115200
print(config_test)

valor_eliminado = config_test.pop("timeout")
print(f"# Nota: Se eliminó 'timeout' con valor '{valor_eliminado}' usando .pop().")
print(config_test)

del config_test["puerto"]
print(f"# Nota: Se eliminó 'puerto' usando 'del'.")
print(config_test)
