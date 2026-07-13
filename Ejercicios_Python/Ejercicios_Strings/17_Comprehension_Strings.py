# ==============================================================================
# 📔 NOTAS TÉCNICAS: LIST COMPREHENSION SOBRE STRINGS
# ==============================================================================
# Un string es iterable, así que se puede recorrer con comprehension igual
# que una lista: [operacion(c) for c in cadena if condicion].
# Es la forma más rápida de filtrar o transformar caracteres uno por uno.
# ==============================================================================

# 🛠️ EJERCICIO 17: FILTRO DE CARACTERES DE UNA TRAMA (SOLUCIÓN)
trama_cruda = "S1N2S-0v1a4_T3E5M0P"

# A. Extraemos solo los dígitos de la trama usando comprehension + .isdigit()
digitos = [caracter for caracter in trama_cruda if caracter.isdigit()]
print(f"Dígitos encontrados: {digitos}")

# B. Extraemos solo las letras y las unimos de nuevo en un string con join()
letras = "".join([caracter for caracter in trama_cruda if caracter.isalpha()])
print(f"Solo letras: {letras}")

# C. Transformamos cada carácter a mayúscula solo si es una letra (comprehension + if/else)
transformado = "".join(
    [c.upper() if c.isalpha() else c for c in trama_cruda]
)
print(f"Trama con letras en mayúscula: {transformado}")

# D. Contamos cuántas vocales tiene un texto usando comprehension + len()
texto = "sensor de temperatura activo"
vocales = [c for c in texto if c in "aeiou"]
print(f"Total de vocales en '{texto}': {len(vocales)}")
