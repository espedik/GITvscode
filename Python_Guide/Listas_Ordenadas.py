nums1 = [1, 2, 3, 0, 0, 0, 0]
m = 3
nums2 = [-4, 2, 3, 9]
n = 4

# Creamos la variable resultado como una copia de los datos reales de nums1
# más los datos de nums2 para luego ordenarlos.
# O bien, usamos el espacio que ya tiene nums1.
resultado = [0] * (m + n)

# Punteros para rastrear en qué número vamos de cada lista
p1 = 0
p2 = 0

# Usamos un ciclo for para llenar cada posición de 'resultado'
for i in range(m + n):
    # Si ya se acabaron los elementos de nums2, o si todavía hay en nums1 
    # y el de nums1 es menor o igual al de nums2:
    if p2 >= n or (p1 < m and nums1[p1] <= nums2[p2]):
        resultado[i] = nums1[p1]
        p1 += 1
    else:
        # De lo contrario, tomamos el de nums2
        resultado[i] = nums2[p2]
        p2 += 1

print(f"Lista 1 original: {nums1}")
print(f"Lista 2 original: {nums2}")
print(f"Resultado final guardado: {resultado}")

 
   
    