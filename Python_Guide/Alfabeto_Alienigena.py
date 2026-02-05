palabras = ["apple", "appld", "applc"]
alfabeto = "zxywvutsrqponmlkjihgfedcba"
directorio = {}

for i in range(0,len(alfabeto),1):
    directorio[alfabeto[i]] = i + 1

print(directorio)


for i in range(0,len(palabras),1):

    if i+1 < len(palabras):
        p1 = palabras[i]
        p2 = palabras[i+1]
        
        for j in range(0,min(len(p1),len(p2)),1):
            print("--------",p1,"VS",p2,"--------" )
            if directorio[p1[j]] > directorio[p2[j]]:
        #        print("P1:",p1[j],"P2",p2[j],"----------- P1 es menor (INCORRECTO)")
                orden_correcto = False
                break
            
            elif directorio[p1[j]] == directorio[p2[j]]:
        #        print("P1:",p1[j],"P2",p2[j],"----------- iguales (CORRECTO)")
                orden_correcto = True

            else:
        #        print("P1:",p1[j],"P2",p2[j],"----------- P2 es menor (CORRECTO)")
                orden_correcto = True

if orden_correcto == True:
    print("CORRECTO")
else:
    print("INCORRECTO")
               
        
