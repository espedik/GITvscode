

entrada = "a2b1c5a3"
salida = ""
contador = 0 

for i in range(1,len(entrada),2):

    salida = salida + entrada[i-1] * int(entrada[i])
    
print(salida)