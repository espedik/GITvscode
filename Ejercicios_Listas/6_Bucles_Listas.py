"""
6. EL FILTRO DE ALERTAS CRÍTICAS
Objetivo: Automatizar el filtrado de datos negativos o erróneos.

- Crea una lista llamada 'lecturas' con valores positivos y negativos.
- Crea una lista vacía llamada 'alertas'.
- Recorre 'lecturas' con un bucle 'for'; si el valor es menor a 0, agrégalo a 'alertas'.
- Al final, imprime el conteo total de alertas encontradas.
"""

# A. Lista de telemetría con valores mixtos (Voltajes o Temperaturas)
lecturas = [12.5, -3.2, 14.8, 0.0, -1.5, 13.2, -0.1, 15.6]

# B. Lista vacía para recolectar solo los errores (valores negativos)
alertas = []

# C. Recorremos la lista 'lecturas'
# 'dato' es una variable temporal que toma el valor de cada elemento en cada vuelta.
for dato in lecturas:
    # D. Lógica de filtrado: Si el valor es menor a 0, es una anomalía
    if dato < 0:
        alertas.append(dato)
        print(f"⚠️ Alerta detectada: Valor anómalo de {dato}")


# E. Resultado final usando len() para el conteo
total_alertas = len(alertas)

print("--- Resumen del Análisis ---")
print(f"Total de lecturas procesadas: {len(lecturas)}")
print(f"Total de fallos encontrados: {total_alertas}")
print(f"Lista de fallos: {alertas}")