import os
import unittest
from random import randint

def limpiar_terminal():
    if os.name == 'nt':
        os.system('cls')
    else:
        os.system('clear')

# Llama a la función justo antes de tus pruebas
limpiar_terminal()

def calculate_engine_health(temp, pressure):
    # Lógica de estados del motor
    if 150 <= temp <= 250:
        if 30 <= pressure <= 50:
            status = "Optimal Temperature and Optimal pressure"
        else:
            status = "Optimal Temperature and High Pressure Alert"
    else:
        if 30 <= pressure <= 50:
            status = "Critical Temperature and Optimal pressure"
        else:
            status = "Critical Temperature and High Pressure Alert"
    
    # Cálculo de salud
    try:
        health_score = (temp / pressure) * 100
    except ZeroDivisionError:
        # Nota: unittest fallará si esperas un número y recibes esta tupla
        return "Error pression is:", 0.0
    
    return health_score

# --- AQUÍ EMPIEZA LO QUE TE FALTABA PARA UNITTEST ---

class TestEngineHealth(unittest.TestCase):
    
    def test_optimal_conditions(self):
        """Prueba con los valores exactos del límite inferior óptimo"""
        result = calculate_engine_health(150, 30)
        self.assertEqual(result, 500.0)

    def test_high_values(self):
        """Prueba con los valores exactos del límite superior óptimo"""
        result = calculate_engine_health(250, 50)
        self.assertEqual(result, 500.0)

    def test_zero_pressure(self):
        """Prueba el manejo de división por cero"""
        result = calculate_engine_health(250, 0)
        # Verificamos que devuelva la tupla de error que definiste
        self.assertEqual(result, ("Error pression is:", 0.0))

    def test_random_values(self):
        """Prueba con valores aleatorios dentro del rango"""
        temp = randint(150, 250)
        press = randint(30, 50)
        result = calculate_engine_health(temp, press)
        self.assertIsInstance(result, float)

if __name__ == "__main__":
    unittest.main()