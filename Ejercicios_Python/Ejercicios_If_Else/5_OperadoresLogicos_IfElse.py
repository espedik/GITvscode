"""
5. OPERADORES LÓGICOS (and, or, not)
Objetivo: Combinar varias condiciones en una sola expresión booleana.

- Crea variables 'dispositivo_activo' (bool) y 'temperatura' (número).
- Usa 'and' para combinar dos condiciones que deben cumplirse AMBAS.
- Usa 'or' para una condición que se cumple si AL MENOS UNA es verdadera.
- Usa 'not' para invertir el resultado de una condición.
- Combina los tres operadores en una sola expresión, usando paréntesis
  para dejar claro el orden de evaluación.
"""

dispositivo_activo = True
temperatura = 45.0
modo_seguro = False

# A. 'and': la condición completa es True solo si AMBOS lados son True
if dispositivo_activo and temperatura > 40:
    print("🔥 Dispositivo activo Y con temperatura crítica.")

# B. 'or': la condición completa es True si AL MENOS uno de los lados es True
if temperatura > 40 or modo_seguro:
    print("Se requiere atención: temperatura alta o modo seguro activado.")

# C. 'not': invierte el valor booleano de la condición
if not dispositivo_activo:
    print("El dispositivo está apagado.")
else:
    print("El dispositivo está encendido.")

# D. Combinación de operadores: los paréntesis evitan ambigüedad y hacen
# el código más legible, aunque Python respeta la precedencia (not > and > or)
if dispositivo_activo and (temperatura > 40 or modo_seguro) and not modo_seguro:
    print("Alerta compuesta: dispositivo activo, riesgo detectado, sin modo seguro.")

# E. Cortocircuito: en 'and', si el primer operando es False, el segundo
# ni siquiera se evalúa. Esto es útil para evitar errores (ej. listas vacías).
lista_lecturas = []
if len(lista_lecturas) > 0 and lista_lecturas[0] > 10:
    print("Primera lectura mayor a 10.")
else:
    print("Lista vacía o primera lectura no supera 10 (sin errores por índice).")
