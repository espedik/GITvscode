


entrada = "aabcccccaaa"
salida = ""
contador = 0 

for i in range(len(entrada)):
    # 1. Siempre aumentamos el contador para la letra actual
    contador = contador + 1
    
    # 2. ¿Es la última letra? O ¿Es diferente a la que viene después?
    if i + 1 == len(entrada) or entrada[i] != entrada[i+1]:
        # Aquí es donde usamos tu sintaxis de acumulador
        salida = salida + entrada[i] + str(contador)
        
        # 3. Importante: Reiniciamos el contador para la siguiente letra
        contador = 0

print(f"Entrada: {entrada}")
print(f"Salida:  {salida}")