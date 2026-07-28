import pytest
from random import randint

# 1. Tu función original (la lógica que queremos probar)
def control_oxygen_flow(altitude: float, cabin_psi: float):
    status = "VALID ALTITUDE AND CABIN" # Corregido el typo de 'ALTITTUDE'

    if (0 <= altitude <= 50000) and (8 <= cabin_psi <= 15):
        if altitude >= 30000 or cabin_psi <= 10:
            status = "EMERGENCY"
        elif altitude <= 10000 and cabin_psi >= 13:
            status = "STANDBY"
    elif (0 <= altitude <= 50000) and (cabin_psi == 0):
        status = "CABIN psi error"   
    else: 
        status = "SENSOR_OUT_OF_RANGE"

    try:
        flow_rate = altitude / cabin_psi
        return status, flow_rate
    
    except ZeroDivisionError:
        return "HARDWARE_FAILURE_ZERO_PSI", 0.0

# 2. Pruebas Unitarias con Pytest
def test_emergency_high_altitude():
    # Caso: Altitud alta (40k) y presión normal (12) -> Debe ser EMERGENCY
    status, flow = control_oxygen_flow(40000, 12)
    assert status == "EMERGENCY"
    assert flow == 40000 / 12

def test_emergency_low_pressure():
    # Caso: Presión baja (9) aunque la altitud sea baja -> Debe ser EMERGENCY
    status, flow = control_oxygen_flow(5000, 9)
    assert status == "EMERGENCY"

def test_standby_mode():
    # Caso: Altitud baja y presión alta -> STANDBY
    status, flow = control_oxygen_flow(5000, 14)
    assert status == "STANDBY"

def test_zero_pressure_error():
    # Caso: División por cero
    status, flow = control_oxygen_flow(10000, 0)
    assert status == "HARDWARE_FAILURE_ZERO_PSI"
    assert flow == 0.0

def test_random_valid_values():
    # Usando lo que aprendiste de randint para una prueba aleatoria controlada
    alt = randint(15000, 25000)
    psi = randint(11, 12)
    status, flow = control_oxygen_flow(alt, psi)
    assert status == "VALID ALTITUDE AND CABIN"