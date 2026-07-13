"""
10. FOR vs WHILE: ¿CUÁNDO USAR CADA UNO?
Objetivo: Entender la diferencia práctica y reproducir un 'for' con 'while'.

- Usa un 'for' para recorrer una lista de intentos de conexión (caso ideal
  para 'for': se conoce de antemano cuántos elementos hay).
- Usa un 'while' para reintentar una conexión hasta que sea exitosa o se
  alcance un máximo de intentos (caso ideal para 'while': no se sabe de
  antemano cuántas vueltas tomará).
- Reproduce manualmente el comportamiento de range(0, 5) usando un 'while'
  con contador, para entender qué hace 'for' internamente.
"""

# A. 'for' es ideal cuando ya sabes CUÁNTOS elementos vas a recorrer
intentos = ["FAIL", "FAIL", "OK", "OK", "FAIL"]
print("--- Revisión de todos los intentos (for) ---")
for intento in intentos:
    print(f"Resultado: {intento}")

# B. 'while' es ideal cuando NO sabes cuántas vueltas tomará, solo la
# CONDICIÓN de parada (aquí: hasta conectar o agotar los intentos)
import random

random.seed(7)
max_intentos = 5
intento_actual = 0
conectado = False

print("--- Reintentando conexión (while) ---")
while intento_actual < max_intentos and not conectado:
    intento_actual += 1
    conectado = random.choice([True, False])
    print(f"Intento {intento_actual}: {'Conectado' if conectado else 'Fallido'}")

if conectado:
    print(f"Conexión exitosa en el intento {intento_actual}.")
else:
    print("Se agotaron los intentos sin conectar.")

# C. Reproducir range(0, 5) manualmente con while, para ver qué hace 'for'
print("--- range(0, 5) simulado con while ---")
i = 0
while i < 5:
    print(i)
    i += 1
