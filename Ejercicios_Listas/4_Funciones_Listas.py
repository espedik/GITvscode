"""
4. ANÁLISIS DE TELEMETRÍA
Objetivo: Usar matemáticas básicas sobre listas de datos.

- Crea una lista con 10 temperaturas desordenadas (ej. [22.5, 18.0, 30.2, ...]).
- Encuentra e imprime el valor máximo (max) y el mínimo (min).
- Calcula la suma total de las lecturas y el promedio:
  Promedio = \frac{\sum \text{Valores}}{\text{Total de elementos}}
- Verifica si el valor 25.0 existe en la lista usando el operador 'in'.
"""

# A. Crea una lista con 10 temperaturas desordenadas
temperaturas = [22.5, 18.0, 30.2, 25.0, 27.4, 19.8, 21.0, 28.5, 24.1, 26.3]

# B. Encuentra e imprime el valor máximo y el mínimo
t_max = max(temperaturas)
t_min = min(temperaturas)
print(f"Temperatura Máxima: {t_max}°C") # Salida: 30.2
print(f"Temperatura Mínima: {t_min}°C") # Salida: 18.0

# C. Calcula la suma total y el promedio
# La fórmula matemática aplicada es:
# $$Promedio = \frac{\sum \text{Temperaturas}}{\text{Total de elementos}}$$
suma_total = sum(temperaturas)
conteo = len(temperaturas)
promedio = suma_total / conteo

print(f"Suma total de lecturas: {suma_total}")
print(f"Promedio del sensor: {promedio:.2f}°C")

# D. Verifica si el valor 25.0 existe en la lista usando 'in'
# El operador 'in' es fundamental para los "Asserts" en testing.
if 25.0 in temperaturas:
    print("✅ El valor 25.0 fue detectado en la telemetría.")
else:
    print("❌ El valor 25.0 no se encuentra en los registros.")