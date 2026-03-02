from typing import Tuple  # Lo correcto es 'typing' no 'types'
import unittest 

def landing_gear_logic(Airspeed_KTS: float, Altitude_FT: float, gear_down: bool ) -> Tuple[str, float]:
    OVER_AIRSPEED_KTS = 250
    MAX_AIRSPEED_KTS = 220
    MAX_ALTITUDE_FT = 15000
    
    resultado = "GEAR_UP" # Valor por defecto

    # Cambiamos 'while' por 'if' para que el código avance
    if gear_down == True: 
        if Airspeed_KTS > OVER_AIRSPEED_KTS:
            resultado = "OVERSPEED"
        elif Airspeed_KTS < MAX_AIRSPEED_KTS and Altitude_FT < MAX_ALTITUDE_FT:
            resultado = "DEPLOY_OK"
        else:
            resultado = "REJECTED"
            
    try:    
        drag = (Airspeed_KTS * 1.5) / Altitude_FT
        return resultado, drag
    except ZeroDivisionError:
        return resultado, 0.0
    
class TestLanding_gear_logic (unittest.TestCase):
    def test_Overspeed_(self):
        # Ejecuta la lógica y verifica si el resultado es el esperado
        resultado, _ = landing_gear_logic(251, 20003, True)
        self.assertEqual(resultado, "OVERSPEED")
        pass

# Esta es la forma correcta de iniciar el ejecutor de pruebas
if __name__ == "__main__":
    unittest.main()