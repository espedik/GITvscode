# --- GUÍA DE STRINGS (VERSION RECARGADA) ---

# 1. Definición: Comillas para todo
videojuego = "Elden Ring"
insulto_shakespeariano = """Tu cerebro es tan seco 
como la galleta de un marinero 
después de un viaje."""

# 2. Inmutabilidad (No puedes editar sobre lo escrito)
usuario = "Kakaroto"
# usuario[0] = "B" <-- Esto te da un error en la cara.
# Tienes que crear uno nuevo:
usuario_nuevo = "B" + usuario[1:] # "Bakaroto"

# 3. Slicing (Cortar el pastel)
# [inicio : fin : paso]
frase = "No hay sistema, joven"
print(frase[0:6])    # "No hay"
print(frase[::-1])   # "nevoj ,ametsis yah oN" (¡Al revés!)

# 4. Métodos para limpiar y transformar
# Imagina que recibes datos de un formulario mal llenado:
correo = "   CORREO_FALSO@Gmail.Com   "
limpio = correo.strip().lower() # "correo_falso@gmail.com"

# 5. Reemplazo (Útil para censura o corrección)
comentario = "Este video es una basura"
censurado = comentario.replace("basura", "*******")
print(censurado) # "Este video es una *******"

# 6. Split y Join (Desarmar y Armar)
# Ideal para manejar listas de amigos, música, etc.
playlist_cruda = "Gasolina,Despactio,Tusa"
canciones = playlist_cruda.split(",") # ['Gasolina', 'Despactio', 'Tusa']

# Ahora los unimos con un emoji o flecha
ahora_suena = " -> ".join(canciones) # "Gasolina -> Despactio -> Tusa"

# 7. f-Strings (La forma elegante de hablar)
nombre = "Adán"
puntos = 9999
mensaje = f"¡Felicidades {nombre}! Has ganado {puntos} créditos."
print(mensaje)