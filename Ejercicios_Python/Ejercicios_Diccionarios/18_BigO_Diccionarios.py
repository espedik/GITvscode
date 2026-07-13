"""
18. ANÁLISIS DE EFICIENCIA (TEÓRICO)
Objetivo: Evaluar el rendimiento de un diccionario frente a una lista para Honeywell/Google.

- Tienes un diccionario de 1,000,000 de registros (clave -> valor) y una
  lista equivalente de 1,000,000 de tuplas (clave, valor).
- En un comentario, responde cuál de estas operaciones es más rápida y por qué:
  A) Buscar si la clave 'ID_004500' existe en el diccionario (if 'ID_004500' in diccionario).
  B) Buscar si la clave 'ID_004500' existe en la lista de tuplas (recorriendo una por una).

Pista: Investiga cómo funciona una tabla hash frente a una búsqueda lineal.
"""

# ==============================================================================
# 📔 NOTAS TÉCNICAS: TABLA HASH (DICT) VS BÚSQUEDA LINEAL (LISTA)
# ==============================================================================
# Un diccionario en Python está implementado internamente como una TABLA HASH.
# Cada clave se convierte en una posición de memoria calculada matemáticamente
# (hash), por lo que Python "salta" directo a esa posición sin recorrer nada.
#
# Una lista, en cambio, no tiene esa estructura: para saber si un elemento
# existe, Python debe revisarlo uno por uno desde el principio.
# ==============================================================================

"""
RESPUESTA AL DESAFÍO:
---------------------
Escenario: 1,000,000 de registros.

A) 'ID_004500' in diccionario: Es una operación O(1) - Constante.
   Python calcula el hash de la clave y va directo a su posición en memoria.
   No importa si hay 10 o 10 millones de registros, el tiempo es el mismo.

B) 'ID_004500' in lista_de_tuplas: Es una operación O(n) - Lineal.
   Python tiene que recorrer tupla por tupla, comparando la clave de cada
   una, hasta encontrarla o llegar al final. En el peor caso, revisará
   el millón de registros.

CONCLUSIÓN:
La opción A (diccionario) es muchísimo más rápida que la opción B (lista)
para búsquedas por clave en grandes volúmenes de datos. Por eso, cuando el
acceso frecuente es "buscar algo por su identificador", un diccionario es
casi siempre la estructura correcta.
"""

# ==============================================================================
