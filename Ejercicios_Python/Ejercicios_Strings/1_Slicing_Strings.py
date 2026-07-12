# ==============================================================================
# 📔 NOTAS TÉCNICAS: ÍNDICES Y REBANADAS (SLICING)
# ==============================================================================
# Un string es una secuencia de caracteres. 
# Sintaxis: cadena[inicio:fin:paso]
# - El índice 'fin' no se incluye en el resultado.
# - El índice '-1' siempre es el último carácter.
# ==============================================================================

# 🛠️ EJERCICIO 1: ANATOMÍA DE UN VIN (SOLUCIÓN)
vin = "1HGCM82635A001234"

# A. Primer carácter (País de origen)
pais = vin[0]

# B. Últimos 6 caracteres (Número de serie)
serie = vin[-6:]

# C. Model Code (Índices del 3 al 8)
modelo = vin[3:8]

# D. VIN invertido (Truco del espejo)
vin_espejo = vin[::-1]

print(f"País: {pais} | Serie: {serie} | Modelo: {modelo}")
print(f"VIN Invertido: {vin_espejo}")

# ==============================================================================
# 📔 NOTAS TÉCNICAS: EL TERCER PARÁMETRO DEL SLICE [inicio:fin:paso]
# ==============================================================================
# El 'paso' determina cuántos caracteres saltar.
# paso 2: toma uno sí, uno no.
# paso -1: invierte la cadena.
# ==============================================================================

# 🛠️ EJERCICIO 8: FILTRADO DE SEÑALES (SOLUCIÓN)
# Supongamos que recibes lecturas intercaladas: "A1B2C3D4" (Letra=Sensor, Número=Valor)
trama = "A1B2C3D4"

# 1. Extraer solo los nombres de los sensores (letras en índices pares)
sensores = trama[0::2] # Empieza en 0, hasta el final, de 2 en 2

# 2. Extraer solo los valores (números en índices impares)
valores = trama[1::2] # Empieza en 1, hasta el final, de 2 en 2

print(f"Sensores detectados: {sensores}") # ABCD
print(f"Valores reportados: {valores}")   # 1234