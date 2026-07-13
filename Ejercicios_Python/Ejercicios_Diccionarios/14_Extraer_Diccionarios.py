"""
14. DESEMPAQUETADO DE PARÁMETROS (KWARGS UNPACKING)
Objetivo: Pasar un diccionario completo como argumentos de una función.

- Crea una función 'conectar_dispositivo' que reciba los parámetros
  'puerto', 'baudrate' y 'timeout'.
- Crea un diccionario 'parametros' con esas tres claves.
- Llama a la función pasando el diccionario desempaquetado con doble
  asterisco (**parametros).
- Imprime el resultado dentro de la función.
"""

# ==============================================================================
# 📔 NOTAS TÉCNICAS: DICTIONARY UNPACKING CON **
# ==============================================================================
# El doble asterisco (**) permite "desempaquetar" un diccionario para que
# cada par clave-valor se convierta en un argumento con nombre (keyword
# argument) al llamar a una función.
#
# Regla: Las claves del diccionario deben coincidir EXACTAMENTE con los
# nombres de los parámetros de la función.
# ==============================================================================


def conectar_dispositivo(puerto, baudrate, timeout):
    print(f"Conectando por {puerto} a {baudrate} baudios (timeout={timeout}s)...")


# A. Diccionario con los parámetros de conexión
parametros = {"puerto": "COM3", "baudrate": 9600, "timeout": 5}

# B. Llama a la función desempaquetando el diccionario con **
conectar_dispositivo(**parametros)

# C. Comparación: sin desempaquetar tendrías que escribir esto manualmente
conectar_dispositivo(puerto=parametros["puerto"], baudrate=parametros["baudrate"], timeout=parametros["timeout"])
