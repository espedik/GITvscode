#Technical Rules:
#• Altitude Envelope: 0 to 50,000 ft.

#• Pressure Envelope: 8 to 15 psi.

#• EMERGENCY: Altitude > 30,000 OR Pressure < 10.

#• STANDBY: Altitude < 10,000 AND Pressure > 13.
from typing import Tuple

def control_oxygen_flow(altitude, cabin_psi):
    if altitude > 30000 or cabin_psi < 10:
        status = "EMERGENCY"
    elif altitude < 10000 and cabin_psi > 13:
        status = "STANDBY"
    else:
        status = "NORMAL"

    flow_rate = altitude / cabin_psi
    return status, flow_rate


def control_oxygen_flow(altitude:float, cabin_psi:float) -> Tuple[str,float]:

    Max_Altitude_FT = 50000
    Emergency_Altitude_FT=30000
    Standby_Altitude_FT = 10000

    PRESS_MIN_SAFE_PSI = 10.0
    PRESS_STANDBY_THRESHOLD_PSI = 13.0
    PRESS_CRITICAL_FAILURE_PSI = 0.0


    if altitude > 30000 or cabin_psi < 10:
        status = "EMERGENCY"
    elif altitude < 10000 and cabin_psi > 13:
        status = "STANDBY"
    else:
        status = "NORMAL"

    flow_rate = altitude / cabin_psi
    return status, flow_rate