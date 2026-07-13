"""
8. LOCALIZADOR DE ESTADO POR CLAVE
Objetivo: Consultar de forma segura el estado de componentes en un diccionario.

- Crea un diccionario 'estados' con varios componentes y su estado: "OK" o "FAIL".
- Cuenta cuántos componentes están en estado "FAIL" recorriendo .values().
- Usa .get() para consultar el estado de un componente que podría no existir,
  con un valor por defecto de "NO_REGISTRADO".
- Imprime ambos resultados con mensajes claros.
"""

# A. Diccionario con el estado de cada componente
estados = {
    "CPU": "OK",
    "RAM": "FAIL",
    "Disco": "OK",
    "Ventilador": "FAIL"
}

# B. Cuenta cuántos componentes están en "FAIL"
# A diferencia de una lista, un diccionario no tiene .count(), así que
# recorremos los valores y contamos manualmente.
total_fallos = 0
for estado in estados.values():
    if estado == "FAIL":
        total_fallos += 1

# C. Usa .get() para consultar un componente que podría no existir
# Esto evita un KeyError si "GPU" nunca fue registrada en el diccionario.
estado_gpu = estados.get("GPU", "NO_REGISTRADO")

# D. Imprime ambos resultados con mensajes profesionales
print("--- REPORTE DE ESTADO DE COMPONENTES ---")
print(f"Total de componentes analizados: {len(estados)}")
print(f"Número de fallos detectados: {total_fallos}")
print(f"Estado del componente 'GPU': {estado_gpu}")
