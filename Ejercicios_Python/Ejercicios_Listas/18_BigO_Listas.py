"""
18. ANÁLISIS DE EFICIENCIA (TEÓRICO)
Objetivo: Evaluar el rendimiento de tus scripts para Honeywell/Google.

- Tienes una lista de 1,000,000 de registros.
- En un comentario, responde cuál de estas operaciones es más rápida y por qué:
  A) Acceder al elemento en la posición 500,000 (lista[500000]).
  B) Buscar si el valor 'ERROR_CRITICO' existe en la lista (if 'ERROR_CRITICO' in lista).

Pista: Investiga la complejidad $O(1)$ vs $O(n)$.
"""

# ==============================================================================
# 📔 NOTAS TÉCNICAS: COMPLEJIDAD TEMPORAL (BIG O)
# ==============================================================================
# La eficiencia se mide en cómo crece el tiempo de ejecución según el tamaño (n)
# de los datos.
#
# 1. O(1) - Constante: Es instantáneo. No importa si tienes 10 o 10 millones 
#    de datos, el tiempo es el mismo.
# 2. O(n) - Lineal: El tiempo crece proporcionalmente a los datos. Si tienes 
#    el doble de datos, tarda el doble de tiempo.
# ==============================================================================

"""
RESPUESTA AL DESAFÍO:
---------------------
Escenario: Lista de 1,000,000 de registros.

A) Acceder a lista[500000]: Es una operación O(1). 
   Python sabe exactamente en qué dirección de memoria está ese índice. 
   Es INSTANTÁNEO.

B) 'ERROR_CRITICO' in lista: Es una operación O(n). 
   Python tiene que empezar desde el índice 0 y preguntar "es este?" uno por uno 
   hasta llegar al final. En el peor caso, revisará el millón de registros.

CONCLUSIÓN: 
La opción A es muchísimo más rápida que la opción B para grandes volúmenes 
de datos.
"""

# ==============================================================================