import os
import unittest
from random import randint

def limpiar_terminal():
    # 'nt' es para Windows, 'posix' para Mac y Linux
    if os.name == 'nt':
        os.system('cls')
    else:
        os.system('clear')

# Llama a la función justo antes de tus pruebas
limpiar_terminal()



def calculate_engine_health(temp, pressure):
    # La temperatura de operación segura es entre 150 y 250 grados
    # La presión segura es entre 30 y 50 psi
    
    if 150 <= temp and temp <= 250:
        
        if 30 <= pressure and pressure <= 50:
            status = "Optimal Temperature and Optimal pressure"
            print('Temperature:',temp,'Pressure:',pressure)
        else:
            status = "Optimal Temperature and High Pressure Alert"
            print('Temperature:',temp,'Pressure:',pressure)
    else:
        if 30 <= pressure and pressure <= 50:
            status = "Critical Temperature and Optimal pressure"
            print('Temperature:',temp,'Pressure:',pressure)
        else:
            status = "Critical Temperature and High Pressure Alert"
            print('Temperature:',temp,'Pressure:',pressure)
    try:
        health_score = (temp / pressure) * 100

    except ZeroDivisionError:
        return ("Error pression is:"), 0.0
    

    return health_score


def test_calculate_engine_health():
    print("Pruebas")
    assert calculate_engine_health(150, 30) == 500

if __name__ == "__main__":
    test_calculate_engine_health()


# Ejemplo de uso que falla:
# print(calculate_engine_health(150, 30))
#print(calculate_engine_health(149, 29))
#print(calculate_engine_health(151, 31))

#print(calculate_engine_health(250, 50))
#print(calculate_engine_health(249, 49))
#print(calculate_engine_health(251, 51))

#print(calculate_engine_health(251, 0))

#print(calculate_engine_health(randint(150, 250), randint(30, 50)))