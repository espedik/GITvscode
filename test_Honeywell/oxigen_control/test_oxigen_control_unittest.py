import unittest
import os
from random import randint

# --- UTILIDAD PARA LIMPIAR TERMINAL ---
def limpiar_terminal():
    if os.name == 'nt': os.system('cls')
    else: os.system('clear')

# --- FUNCIÓN LÓGICA ---
def control_oxygen_flow(altitude: float, cabin_psi: float):
    # Regla: Altitud 0-50k, Presión 8-15 psi
    status = "VALID ALTITUDE AND CABIN"
    
    # 1. Validación de rangos y estados
    if (0 <= altitude <= 50000) and (8 <= cabin_psi <= 15):
        if altitude >= 30000 or cabin_psi <= 10:
            status = "EMERGENCY"
        elif altitude <= 10000 and cabin_psi >= 13:
            status = "STANDBY"
            
    elif (0 <= altitude <= 50000) and (cabin_psi == 0):
        status = "CABIN psi error"
    else: 
        status = "SENSOR_OUT_OF_RANGE"

    # 2. Cálculo seguro (Manejo de errores de hardware/división)
    try:
        flow_rate = altitude / cabin_psi
    except ZeroDivisionError:
        # Si la presión es 0, priorizamos el mensaje de error de hardware
        return "HARDWARE_FAILURE_ZERO_PSI", 0.0

    return status, flow_rate

# --- CLASE DE PRUEBAS (UNITTEST) ---
class TestOxygenSystem(unittest.TestCase):

    def test_emergency_condition(self):
        """Prueba si detecta emergencia por altitud alta"""
        status, _ = control_oxygen_flow(35000, 12)
        self.assertEqual(status, "EMERGENCY")

    def test_standby_condition(self):
        """Prueba modo standby en condiciones seguras bajas"""
        status, _ = control_oxygen_flow(5000, 14)
        self.assertEqual(status, "STANDBY")

    def test_out_of_range(self):
        """Prueba altitudes fuera de los límites del sensor"""
        status, _ = control_oxygen_flow(60000, 12)
        self.assertEqual(status, "SENSOR_OUT_OF_RANGE")

    def test_hardware_failure_zero(self):
        """Prueba el manejo de división por cero"""
        status, flow = control_oxygen_flow(10000, 0)
        self.assertEqual(status, "HARDWARE_FAILURE_ZERO_PSI")
        self.assertEqual(flow, 0.0)

    def test_random_flight_data(self):
        """Prueba con datos aleatorios dentro de rango normal"""
        alt = randint(15000, 25000)
        psi = randint(11, 12)
        status, _ = control_oxygen_flow(alt, psi)
        self.assertEqual(status, "VALID ALTITUDE AND CABIN")

# --- EJECUCIÓN ---
if __name__ == '__main__':
    limpiar_terminal()
    print("Iniciando pruebas del sistema de oxígeno...\n")
    # El parámetro exit=False es para que no cierre la consola antes de tiempo
    unittest.main(exit=False)