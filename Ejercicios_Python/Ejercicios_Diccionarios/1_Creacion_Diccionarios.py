"""
1. LA FICHA TÉCNICA DEL DISPOSITIVO
Objetivo: Aprender a crear diccionarios y acceder a sus valores por clave.

- Crea un diccionario llamado 'dispositivo' con las claves "nombre", "modelo",
  "voltaje" y "estado" (ej. "OK").
- Imprime el valor de "nombre" usando corchetes [].
- Imprime el valor de "voltaje" usando el método .get().
- Intenta acceder a una clave que no existe (ej. "fabricante") usando .get()
  con un valor por defecto "Desconocido", para evitar un error.
"""

dispositivo = {
    "nombre": "Sensor_Termico_01",
    "modelo": "ST-2200",
    "voltaje": 5.0,
    "estado": "OK"
}

print(dispositivo["nombre"])
print(dispositivo.get("voltaje"))
print(dispositivo.get("fabricante", "Desconocido"))
