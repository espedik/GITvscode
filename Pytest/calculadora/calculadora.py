import math

class Calculadora:
    def sumar(self, a, b): 
        return a + b
    
    def restar(self, a, b): 
        return a - b
    
    def multiplicar(self, a, b): 
        return a * b
    
    def dividir(self, a, b):
        if b == 0: raise ValueError("No se puede dividir por cero")
        return a / b

    def potencia(self, base, exponente):
        return base ** exponente

    def raiz_cuadrada(self, n):
        if n < 0: raise ValueError("No existe raíz de números negativos")
        return math.sqrt(n)

    def porcentaje(self, total, porcentaje):
        return (total * porcentaje) / 100