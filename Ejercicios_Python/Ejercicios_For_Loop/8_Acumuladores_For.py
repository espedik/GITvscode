"""
8. PATRÓN DE ACUMULADORES Y CONTADORES
Objetivo: Usar variables externas al bucle para acumular resultados.

- Crea una lista 'lecturas' con al menos 8 valores numéricos.
- Usa un acumulador para calcular la suma total dentro de un 'for'.
- Usa un contador para saber cuántos valores superan un umbral determinado.
- Calcula el promedio, el máximo y el mínimo manualmente con un solo bucle
  (sin usar sum(), max() ni min()).
"""

lecturas = [12.5, 18.2, 9.7, 21.4, 15.0, 7.3, 19.9, 11.1]
umbral = 15.0

# A. Acumulador de suma: se inicializa en 0 ANTES del bucle
suma_total = 0

# B. Contador de valores que superan el umbral: también se inicializa antes
total_sobre_umbral = 0

# C. Variables para llevar el máximo y el mínimo "vistos hasta ahora"
maximo = lecturas[0]
minimo = lecturas[0]

for valor in lecturas:
    # D. En cada vuelta, el acumulador SUMA el valor actual al total previo
    suma_total += valor

    if valor > umbral:
        total_sobre_umbral += 1

    if valor > maximo:
        maximo = valor
    if valor < minimo:
        minimo = valor

promedio = suma_total / len(lecturas)

print(f"Suma total: {suma_total:.1f}")
print(f"Promedio: {promedio:.2f}")
print(f"Máximo: {maximo}")
print(f"Mínimo: {minimo}")
print(f"Lecturas por encima de {umbral}: {total_sobre_umbral}")
