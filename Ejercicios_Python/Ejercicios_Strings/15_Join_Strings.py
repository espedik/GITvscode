# ==============================================================================
# 📔 NOTAS TÉCNICAS: ENSAMBLADO CON .join()
# ==============================================================================
# "separador".join(lista): Toma una LISTA de strings y los une en un solo
# string, colocando el separador entre cada elemento. Es lo opuesto a .split().
# Es mucho más eficiente que concatenar con '+' dentro de un bucle.
# ==============================================================================

# 🛠️ EJERCICIO 15: ENSAMBLADOR DE TRAMAS (SOLUCIÓN)
fragmentos = ["STX", "ID:014", "TEMP:25.6", "STATUS:OK", "ETX"]

# A. Unimos los fragmentos con ';' para reconstruir la trama completa
trama_completa = ";".join(fragmentos)

# B. También podemos unir sin separador (cadena vacía) para pegar caracteres
codigo_barras = ["4", "5", "0", "1", "2"]
numero_serie = "".join(codigo_barras)

print(f"Fragmentos originales: {fragmentos}")
print(f"Trama ensamblada: {trama_completa}")
print(f"Número de serie ensamblado: {numero_serie}")

# C. Round-trip: separamos y volvemos a unir para confirmar que es reversible
fragmentos_recuperados = trama_completa.split(";")
print(f"¿El round-trip conserva los datos?: {fragmentos_recuperados == fragmentos}")
