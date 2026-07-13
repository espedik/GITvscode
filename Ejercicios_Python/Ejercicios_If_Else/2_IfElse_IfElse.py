"""
2. DOS CAMINOS (if / else)
Objetivo: Ejecutar un bloque u otro, garantizando que siempre pase algo.

- Crea una variable 'estado_bateria' (porcentaje de 0 a 100).
- Usa 'if/else' para imprimir "Batería OK" o "Batería baja" según si es
  mayor o igual a 20.
- Crea una función 'es_par(numero)' que use if/else para devolver True o
  False según si el número es par.
- A diferencia de un 'if' solo, con 'if/else' siempre se ejecuta EXACTAMENTE
  uno de los dos bloques.
"""

# A. Variable a evaluar
estado_bateria = 15

# B. if/else garantiza que uno de los dos mensajes SIEMPRE se imprima
if estado_bateria >= 20:
    print("🔋 Batería OK")
else:
    print("🪫 Batería baja: conectar a cargador")


# C. Función que usa if/else para devolver un resultado booleano
def es_par(numero):
    if numero % 2 == 0:
        return True
    else:
        return False


print(f"¿5 es par?: {es_par(5)}")
print(f"¿8 es par?: {es_par(8)}")
