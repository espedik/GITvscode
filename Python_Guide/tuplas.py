# --- CARACTERÍSTICAS DE LAS TUPLAS EN PYTHON ---

# 1. Definición: Se crean usando paréntesis () en lugar de corchetes
mi_tupla = ("Python", "Strings", 2026)

# 2. Inmutabilidad: Es su característica principal. 
# No puedes cambiar, agregar o eliminar elementos después de crearla.
# mi_tupla[0] = "Java"  <-- Esto lanzaría un error (TypeError)

# 3. Heterogeneidad: Pueden contener múltiples tipos de datos a la vez
# (Strings, enteros, flotantes, booleanos e incluso otras tuplas)
mi_mix = ("Texto", 100, 3.14, True)

# 4. Indexación y Orden: Tienen un orden definido y cada elemento 
# tiene un índice (empezando desde el 0)
primer_elemento = mi_mix[0] # Esto devolvería "Texto"

# 5. Permiten duplicados: A diferencia de los sets, puedes repetir valores
duplicados = ("rojo", "azul", "rojo", "rojo")

# 6. Regla del elemento único: Si solo quieres un elemento, 
# DEBES poner una coma al final o Python lo verá como un string simple
tupla_un_item = ("soy una tupla",) 
no_es_tupla = ("soy solo un string")

# 7. Rendimiento: Son más rápidas que las listas y consumen menos memoria
# porque su tamaño y contenido son fijos en el sistema.

print(duplicados[1]) #Imprime el segundo elemento
