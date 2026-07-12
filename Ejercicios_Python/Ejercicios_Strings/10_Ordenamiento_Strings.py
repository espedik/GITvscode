# 🛠️ EJERCICIO 11: ORDENAMIENTO DE ETIQUETAS (SOLUCIÓN)
tag_id = "B5A1C3"
# Primero ordenamos (devuelve una lista)
caracteres_ordenados = sorted(tag_id)
tag_final = ""

# Usamos el rango para reconstruir el string a partir de la lista ordenada
for i in range(0, len(caracteres_ordenados), 1):
    tag_final += caracteres_ordenados[i]

print(f"Tag ID normalizado: {tag_final}")