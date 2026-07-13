"""
17. FORMATEO DE REPORTE FINAL
Objetivo: Generar un reporte de texto profesional a partir de un diccionario.

- Tienes: resultados = {"Conectado": True, "Autenticado": True, "Lectura_OK": False}.
- Usa .items() junto con una f-string dentro de un bucle 'for' para generar
  una línea de reporte por cada paso.
- Usa .join() sobre una lista generada con comprehension para crear un
  único string con todos los pasos separados por " | ".
- Imprime ambos resultados.
"""

# ==============================================================================
# 📔 NOTAS TÉCNICAS: DE DICCIONARIO A REPORTE DE TEXTO
# ==============================================================================
# .join() sigue siendo un método de STRING, no de diccionario. Para usarlo
# con un diccionario primero debemos transformar sus pares clave-valor en
# una lista de strings, normalmente con una comprehension.
# ==============================================================================

# A. Diccionario con el resultado de cada paso de una prueba
resultados = {"Conectado": True, "Autenticado": True, "Lectura_OK": False}

# B. Genera una línea de reporte por cada paso usando .items()
print("--- REPORTE PASO A PASO ---")
for paso, exito in resultados.items():
    estado = "✅ OK" if exito else "❌ FALLO"
    print(f"{paso}: {estado}")

# C. Convierte los pares en una lista de strings con comprehension
# y únelos con .join() usando " | " como separador.
lineas = [f"{paso}={exito}" for paso, exito in resultados.items()]
reporte_flujo = " | ".join(lineas)

# D. Resultado final
print("\n--- REPORTE COMPACTO ---")
print(reporte_flujo)  # Salida: Conectado=True | Autenticado=True | Lectura_OK=False
