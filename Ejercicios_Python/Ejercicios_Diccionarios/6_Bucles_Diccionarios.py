"""
6. EL FILTRO DE SENSORES CRÍTICOS
Objetivo: Automatizar el filtrado de datos dentro de un diccionario.

- Crea un diccionario 'lecturas' con nombres de sensores y sus valores.
- Crea un diccionario vacío llamado 'criticos'.
- Recorre 'lecturas' con un bucle 'for' usando .items(); si el valor supera
  un umbral (ej. 50), agrégalo a 'criticos'.
- Al final, imprime el conteo total de sensores críticos encontrados.
"""

# A. Diccionario de lecturas mixtas
lecturas = {
    "Temp_Motor": 85.5,
    "Presion_Aceite": 40.2,
    "Nivel_Bateria": 12.6,
    "Temp_Escape": 95.0,
    "Voltaje_Sistema": 60.1
}

# B. Diccionario vacío para recolectar solo los valores críticos
criticos = {}

# C. Recorremos 'lecturas' con .items() para obtener clave y valor a la vez
for nombre, valor in lecturas.items():
    # D. Lógica de filtrado: Si el valor supera el umbral, es crítico
    if valor > 50:
        criticos[nombre] = valor
        print(f"⚠️ Sensor crítico detectado: {nombre} = {valor}")

# E. Resultado final usando len() para el conteo
total_criticos = len(criticos)

print("--- Resumen del Análisis ---")
print(f"Total de sensores procesados: {len(lecturas)}")
print(f"Total de sensores críticos: {total_criticos}")
print(f"Detalle de críticos: {criticos}")
