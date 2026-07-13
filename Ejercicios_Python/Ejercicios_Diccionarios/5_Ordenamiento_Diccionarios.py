"""
5. RANKING DE ERRORES POR FRECUENCIA
Objetivo: Ordenar un diccionario según sus claves o sus valores.

- Crea un diccionario 'conteo_errores' donde cada clave es un ID de error
  y el valor es cuántas veces ocurrió.
- Ordena las claves alfabéticamente usando sorted() sobre el diccionario.
- Ordena los pares (clave, valor) de mayor a menor frecuencia usando
  sorted() con .items() y una función lambda como key.
"""

# A. Diccionario con la frecuencia de cada error detectado
conteo_errores = {"ERR-05": 3, "ERR-01": 7, "ERR-08": 1, "ERR-03": 5}

# B. Ordena las claves alfabéticamente
# sorted() sobre un diccionario itera y ordena SUS CLAVES por defecto.
claves_ordenadas = sorted(conteo_errores)
print(f"IDs de error ordenados: {claves_ordenadas}")
# Salida: ['ERR-01', 'ERR-03', 'ERR-05', 'ERR-08']

# C. Ordena los pares (clave, valor) de mayor a menor frecuencia
# .items() nos da tuplas (clave, valor). Usamos una lambda para decirle a
# sorted() que compare por el segundo elemento de la tupla (el valor, x[1]).
ranking = sorted(conteo_errores.items(), key=lambda x: x[1], reverse=True)
print(f"Ranking de errores más frecuentes: {ranking}")
# Salida: [('ERR-01', 7), ('ERR-03', 5), ('ERR-05', 3), ('ERR-08', 1)]

# D. Reporte legible del ranking
print("\n--- TOP ERRORES DEL SISTEMA ---")
for id_error, veces in ranking:
    print(f"{id_error}: {veces} ocurrencias")
