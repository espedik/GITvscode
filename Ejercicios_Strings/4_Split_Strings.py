# ==============================================================================
# 📔 NOTAS TÉCNICAS: SEGMENTACIÓN
# ==============================================================================
# .split(separador): Rompe el string y lo convierte en una LISTA. 
# Es el puente entre los dos temas que estás aprendiendo.
# ==============================================================================

# 🛠️ EJERCICIO 4: ANALIZADOR DE COMANDOS (SOLUCIÓN)
comando = "SET_TEMP:25:UNIT:CELSIUS:MODE:AUTO"

# 1. Convertir a lista usando el separador ':'
partes = comando.split(":")

# 2. Contar ocurrencias y buscar posición
conteo_mode = comando.count("MODE")
posicion_unit = comando.find("UNIT")

print(f"Lista de parámetros: {partes}")
print(f"La palabra 'MODE' aparece {conteo_mode} vez/veces.")
print(f"La sección 'UNIT' empieza en el índice: {posicion_unit}")


# 🛠️ EJERCICIO 9: REORDENAMIENTO DE SECUENCIA (SOLUCIÓN)
secuencia = "STOP,START,WAIT,CALIBRATE"
lista_pasos = secuencia.split(",")
secuencia_invertida = []

# Usamos el rango para recorrer la lista de atrás hacia adelante
# Pero para seguir tu regla: range(0, len(lista), 1)
for i in range(0, len(lista_pasos), 1):
    # Insertamos cada elemento al inicio para invertir la lista
    elemento = lista_pasos[i]
    secuencia_invertida.insert(0, elemento)

secuencia_final = " -> ".join(secuencia_invertida)

print(f"Secuencia Final: {secuencia_final}")

#