# --- CARACTERÍSTICAS DE LAS LISTAS EN PYTHON ---

# 1. Definición: Se crean usando corchetes []
mi_lista = ["Python", "JavaScript", 2026,2026]

# 2. Mutabilidad: Es su mayor diferencia con las tuplas.
# Puedes cambiar elementos individualmente.
mi_lista[1] = "C++" # Ahora la lista es ["Python", "C++", 2026]

# 3. Dinamismo: Puedes añadir o quitar elementos en cualquier momento
mi_lista.append("Java")    # Añade al final
mi_lista.insert(0, "Go")   # Añade en una posición específica
mi_lista.pop()             # Elimina el último elemento

# 4. Heterogeneidad: Al igual que las tuplas, aceptan cualquier tipo de dato
# (Incluso puedes meter listas dentro de otras listas)
mi_mix = ["Texto", 42, 1.5, True, [1, 2, 3]]

# 5. Orden e Indexación: Mantienen el orden en que se insertan los datos
# y se accede a ellos mediante su índice (empezando en 0)
print(mi_lista[2]) # Imprime "Go"

# 6. Duplicados: Permiten tener el mismo valor varias veces
numeros = [1, 2, 2, 3, 3, 3]

print(mi_lista)

# 7. Métodos integrados: Tienen muchas funciones útiles para manipularlas
#mi_lista.sort()    # Ordena la lista (si los tipos son compatibles)
#mi_lista.reverse() # Invierte el orden de la lista