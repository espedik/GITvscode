class Calculadora:


    def multiplicacion(self, entrada1, entrada2):
        salida = entrada1 * entrada2
        return print(salida)
    
    def division(self, entrada1, entrada2):
        salida = entrada1 / entrada2
        return print(salida)
    
    def resta(self, entrada1, entrada2):
        salida = entrada1 - entrada2
        return print(salida)
        


# Creamos el primer objeto (una Casio gris)

#mi_casio = Calculadora("Casio", "Gris")

# Creamos el segundo objeto (una HP negra)
#mi_hp = Calculadora("HP", "Negra")

Calcula = Calculadora()

Calcula.multiplicacion(3,6)
Calcula.division(3,6)
Calcula.resta(3,6)