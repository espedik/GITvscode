"""
16. AUDITORÍA DE VALORES ÚNICOS
Objetivo: Detectar qué componentes comparten el mismo estado en una prueba masiva.

- Tienes: estados = {"CPU": "OK", "RAM": "FAIL", "Disco": "OK", "Ventilador": "FAIL", "GPU": "OK"}.
- Usa set() sobre .values() para obtener los estados únicos posibles.
- Usa .setdefault() para agrupar, en un nuevo diccionario, la lista de
  componentes que comparten cada estado.
- Imprime el resultado agrupado.
"""
# ==============================================================================
# 📔 NOTAS TÉCNICAS: SET() PARA VALORES ÚNICOS Y .setdefault()
# ==============================================================================
# Un 'Set' no permite duplicados, así que convertir los .values() de un
# diccionario en un set nos dice cuántas categorías distintas existen.
#
# .setdefault(clave, valor_por_defecto) es ideal para agrupar datos: si la
# clave ya existe devuelve su valor actual, y si no existe la crea con el
# valor por defecto (evitando un KeyError).
# ==============================================================================

# A. Diccionario con el estado de cada componente
estados = {"CPU": "OK", "RAM": "FAIL", "Disco": "OK", "Ventilador": "FAIL", "GPU": "OK"}

# B. Obtiene los estados únicos posibles usando set()
estados_unicos = set(estados.values())
print(f"Estados posibles detectados: {estados_unicos}")  # Salida: {'OK', 'FAIL'}

# C. Agrupa los componentes por estado usando .setdefault()
agrupado = {}
for componente, estado in estados.items():
    # Si 'estado' aún no es una clave en 'agrupado', la crea con lista vacía [].
    # Si ya existe, simplemente devuelve la lista que ya tenía.
    agrupado.setdefault(estado, []).append(componente)

# D. Resultados
print("--- AUDITORÍA AGRUPADA POR ESTADO ---")
print(f"Componentes agrupados: {agrupado}")
# Salida: {'OK': ['CPU', 'Disco', 'GPU'], 'FAIL': ['RAM', 'Ventilador']}
