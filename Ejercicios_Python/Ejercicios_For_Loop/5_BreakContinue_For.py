"""
5. CONTROL DE FLUJO: break Y continue
Objetivo: Alterar el recorrido normal de un bucle según una condición.

- Crea una lista 'trama' con varios códigos de estado, incluyendo un "ABORT".
- Recorre la lista y usa 'break' para detener el bucle apenas encuentres "ABORT".
- Crea una lista 'lecturas' con valores válidos y algunos None.
- Recorre 'lecturas' y usa 'continue' para saltarte los valores None sin
  detener el bucle, sumando solo los válidos.
"""

# A. 'break' corta el bucle POR COMPLETO en cuanto se cumple la condición
trama = ["OK", "OK", "WARNING", "ABORT", "OK", "OK"]

print("--- Procesando trama hasta encontrar ABORT ---")
for codigo in trama:
    if codigo == "ABORT":
        print("Señal de ABORT detectada. Deteniendo procesamiento.")
        break
    print(f"Procesando código: {codigo}")

# B. 'continue' salta SOLO la iteración actual y sigue con la siguiente
lecturas = [12.5, None, 14.2, None, 9.8, 11.1]

suma = 0
validos = 0
print("--- Sumando solo lecturas válidas (ignorando None) ---")
for lectura in lecturas:
    if lectura is None:
        continue
    suma += lectura
    validos += 1

print(f"Total de lecturas válidas: {validos}")
print(f"Suma de lecturas válidas: {suma:.1f}")
