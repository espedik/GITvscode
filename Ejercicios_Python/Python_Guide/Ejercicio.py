entrada = "aabcccccaaa"
salida = ""
contador = 0 


for i in range(0,len(entrada),1):
    contador = contador + 1
    if i+1 == len(entrada) or entrada[i] != entrada[i+1]: 

        salida = salida + entrada[i] + str(contador)
        contador = 0
        
    print(salida)