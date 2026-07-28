diccionario = {
"nombre" : "adan",
"apellido" : "Martinez",
"edad" : 30
}

print (diccionario)

# --- CARACTERÍSTICAS DE LOS DICCIONARIOS EN PYTHON ---

# 1. Definición: Se usan llaves {} y pares de "clave": "valor"
usuario = {
    "nombre": "Alex",
    "edad": 25,
    "es_pro": True
}

# 2. Acceso por Clave: No usas números de índice, usas la clave (key)
# print(usuario[0]) <-- Esto daría error
print(usuario["nombre"]) # Imprime "Alex"

# 3. Mutabilidad: Puedes cambiar los valores, añadir nuevos o borrarlos
usuario["edad"] = 26          # Actualiza un valor
usuario["ciudad"] = "Madrid"  # Añade un par nuevo
del usuario["es_pro"]         # Borra una clave

# 4. Claves Únicas: No puede haber dos llaves con el mismo nombre.
# Si repites una, la última sobrescribe a la anterior.
config = {"tema": "oscuro", "tema": "claro"} # Quedará como {"tema": "claro"}

# 5. Tipos de datos flexibles: 
# Las LLAVES deben ser inmutables (strings, números, tuplas).
# Los VALORES pueden ser cualquier cosa (listas, otros diccionarios, etc.)
diccionario_complejo = {
    "hobbies": ["leer", "correr"],
    "redes": {"twitter": "@user"}
}

# 6. Orden: Desde Python 3.7, los diccionarios mantienen el 
# orden de inserción de los elementos.

# 7. Métodos útiles:
claves = usuario.keys()    # Obtiene solo los nombres de las etiquetas
valores = usuario.values()  # Obtiene solo los datos guardados
items = usuario.items()    # Obtiene ambos en parejas (tuplas)