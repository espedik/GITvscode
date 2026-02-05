#s = "abcabcbb"
#resultado = 3

s = "jdkafnlcdsalkxcmpoiuytfccv"
#resultado = 15
diccionario = {}
contador=0
for i in range(0,len(s),1):

    if s[i] in diccionario:
        diccionario[s[i]] = diccionario[s[i]] + 1

    else:
        diccionario[s[i]] = 1

    if diccionario[s[i]] > 1:
        contador = i 
        print("numero repetido:",contador)
        contador = 0
        


print(diccionario)
# Resultado: {'a': 2, 'b': 4, 'c': 2}