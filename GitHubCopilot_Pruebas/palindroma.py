def es_palindromo(palabra):
    # Convertir a minúsculas y eliminar espacios
    palabra = palabra.lower().replace(" ", "")
    # Comparar la palabra con su reverso
    return palabra == palabra[::-1]

# Pedir la palabra al usuario
palabra = input("Introduce una palabra: ")

# Verificar si es palíndromo
if es_palindromo(palabra):
    print(f"'{palabra}' es un palíndromo")
else:
    print(f"'{palabra}' no es un palíndromo")

    # Bucle para seguir pidiendo palabras
    while True:
        continuar = input("\n¿Quieres verificar otra palabra? (s/n): ")
        if continuar.lower() != 's':
            break
        palabra = input("Introduce una palabra: ")
        if es_palindromo(palabra):
            print(f"'{palabra}' es un palíndromo")
        else:
            print(f"'{palabra}' no es un palíndromo")