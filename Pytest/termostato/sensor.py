# El Proyecto: Validador de Termostato Industrial
# Imagina un sistema que debe alertar si la temperatura de un proceso sale de un rango seguro (por ejemplo, entre 0°C y 100°C).1.
# La Implementación (sensor.py)Crea este archivo con la lógica de control. 
 
# Aquí aplicaremos una fórmula básica de conversión: F = (C * 9/5) + 32


class ValidadorSensor:
    def __init__(self, min_seguro=0, max_seguro=100):
        self.min_seguro = min_seguro
        self.max_seguro = max_seguro

    def es_rango_seguro(self, celsius):
        if not isinstance(celsius, (int, float)):
            raise TypeError("La temperatura debe ser un número")
        return self.min_seguro <= celsius <= self.max_seguro

    def convertir_a_fahrenheit(self, celsius):
        return (celsius * 9/5) + 32