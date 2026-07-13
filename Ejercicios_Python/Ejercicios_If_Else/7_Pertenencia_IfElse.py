"""
7. PERTENENCIA CON in / not in
Objetivo: Verificar si un valor existe dentro de una colección.

- Crea una lista 'codigos_validos' con varios códigos de estado permitidos.
- Usa 'in' para verificar si un código recibido está en esa lista.
- Usa 'not in' para detectar códigos que NO están permitidos y rechazarlos.
- Usa 'in' sobre un diccionario (verifica solo las claves) y sobre un
  string (verifica si es una subcadena).
"""

codigos_validos = ["OK", "WARNING", "FAIL", "RETRY"]

# A. 'in' devuelve True si el valor existe dentro de la colección
codigo_recibido = "FAIL"
if codigo_recibido in codigos_validos:
    print(f"'{codigo_recibido}' es un código reconocido por el sistema.")

# B. 'not in' es la forma más clara de escribir "no está presente"
# (mejor que 'not (codigo in lista)', que es válido pero menos legible)
codigo_desconocido = "ABORT_XYZ"
if codigo_desconocido not in codigos_validos:
    print(f"⚠️ '{codigo_desconocido}' no es un código válido. Se rechaza el mensaje.")

# C. 'in' sobre un diccionario revisa únicamente las CLAVES, no los valores
configuracion = {"modo": "AUTO", "timeout": 30}
if "timeout" in configuracion:
    print(f"Timeout configurado en: {configuracion['timeout']} segundos")

# D. 'in' sobre un string verifica si es una SUBCADENA
trama = "STX;DATA;ERROR;ETX"
if "ERROR" in trama:
    print("Se detectó la palabra 'ERROR' dentro de la trama.")
