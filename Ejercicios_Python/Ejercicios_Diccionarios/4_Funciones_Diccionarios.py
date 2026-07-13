"""
4. ANÁLISIS DE LECTURAS POR SENSOR
Objetivo: Usar matemáticas básicas sobre los valores de un diccionario.

- Crea un diccionario 'lecturas' donde cada clave es el nombre de un sensor
  y el valor es su última lectura numérica.
- Calcula la suma total y el promedio de las lecturas usando .values().
- Encuentra cuál es el sensor con el valor MÁS ALTO usando max() con key=.
- Verifica si la clave "Temp_Motor" existe en el diccionario usando 'in'.
"""

# A. Diccionario de lecturas por sensor
lecturas = {
    "Temp_Motor": 85.5,
    "Presion_Aceite": 40.2,
    "Nivel_Bateria": 12.6,
    "Temp_Ambiente": 22.3
}

# B. Suma total y promedio usando .values()
suma_total = sum(lecturas.values())
promedio = suma_total / len(lecturas)
print(f"Suma total de lecturas: {suma_total}")
print(f"Promedio general: {promedio:.2f}")

# C. Sensor con el valor más alto usando max() con key=
# 'key=lecturas.get' le dice a max() que compare por el VALOR de cada clave,
# no por el nombre de la clave en sí (que compararía alfabéticamente).
sensor_max = max(lecturas, key=lecturas.get)
print(f"Sensor con la lectura más alta: {sensor_max} ({lecturas[sensor_max]})")

# D. Verifica si la clave "Temp_Motor" existe usando 'in'
# En diccionarios, 'in' revisa las CLAVES, no los valores. Es una operación O(1).
if "Temp_Motor" in lecturas:
    print("✅ El sensor 'Temp_Motor' está registrado.")
else:
    print("❌ El sensor 'Temp_Motor' no se encuentra registrado.")
