# ==============================================================================
# 📔 NOTAS TÉCNICAS: CONSTRUCCIÓN POR POSICIÓN
# ==============================================================================
# Como los strings son inmutables, para "cambiar" algo con un bucle, 
# empezamos con un string vacío y le vamos sumando caracteres.
# ==============================================================================

# 🛠️ EJERCICIO 8: ANONIMIZACIÓN DE DATOS (SOLUCIÓN)
ip_cruda = "192.168.1.1"
ip_segura = ""

for i in range(0, len(ip_cruda), 1):
    # Si el carácter es un punto, lo cambiamos por una 'X'
    if ip_cruda[i] == ".":
        ip_segura += "X"
    else:
        # Si no es punto, dejamos el número original
        ip_segura += ip_cruda[i]

print(f"IP Original: {ip_cruda}")
print(f"IP Protegida: {ip_segura}")

# ==============================================================================
# 📔 NOTAS TÉCNICAS: .replace(viejo, nuevo)
# ==============================================================================
# El método busca TODAS las apariciones de la subcadena y las cambia.
# Es ideal para cambiar formatos de archivos o etiquetas de sensores.
# ==============================================================================

# 🛠️ EJERCICIO 20: LIMPIEZA DE SEPARADORES (SOLUCIÓN)
trama = "ID:001;TEMP:25;STATUS:OK"

# Cambiamos los puntos y coma por barras inclinadas
trama_nueva = trama.replace(";", " / ")

# Usamos tu bucle para imprimir cada carácter del resultado final
print("--- Trama Procesada ---")
for i in range(0, len(trama_nueva), 1):
    print(f"Índice {i}: {trama_nueva[i]}")

print(f"\nResultado final: {trama_nueva}")

#