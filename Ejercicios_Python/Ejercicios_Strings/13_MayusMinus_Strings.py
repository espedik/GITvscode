# ==============================================================================
# 📔 NOTAS TÉCNICAS: MAYÚSCULAS Y MINÚSCULAS
# ==============================================================================
# .upper()     : Convierte TODO el string a mayúsculas.
# .lower()     : Convierte TODO el string a minúsculas.
# .capitalize(): Pone en mayúscula solo la primera letra, el resto en minúscula.
# .title()     : Pone en mayúscula la primera letra de CADA palabra.
# .swapcase()  : Invierte mayúsculas por minúsculas y viceversa.
# Estos métodos NO modifican el string original (son inmutables), devuelven
# uno nuevo. Muy usados para normalizar datos antes de comparar (ej. logins).
# ==============================================================================

# 🛠️ EJERCICIO 13: NORMALIZADOR DE IDs DE SENSOR (SOLUCIÓN)
id_crudo = "sns-014_temperatura"
nombre_operario = "juan carlos perez"

# A. Normalizamos el ID a mayúsculas para comparaciones estrictas en el sistema
id_normalizado = id_crudo.upper()

# B. Convertimos el nombre a formato "Título" para mostrarlo en un reporte
nombre_formateado = nombre_operario.title()

# C. Comparación segura ignorando el caso original con .lower()
entrada_usuario = "SNS-014_TEMPERATURA"
coincide = entrada_usuario.lower() == id_crudo.lower()

print(f"ID original: {id_crudo}")
print(f"ID normalizado: {id_normalizado}")
print(f"Nombre del operario: {nombre_formateado}")
print(f"¿La entrada coincide con el ID (sin importar mayúsculas)?: {coincide}")
