def control_oxygen_flow(altitude : float, cabin_psi: float):
    # MISSION RULE: Altitude 0-50,000 ft. Pressure 8-15 psi.
    # Emergency if Altitude > 30k OR Pressure < 10.
    
    if  (0 <= altitude and altitude <= 50000) and (8 <= cabin_psi and cabin_psi <= 15):


        if altitude >= 30000 or cabin_psi <= 10:
            status = "EMERGENCY"
        elif altitude <= 10000 and cabin_psi >= 13:
            status = "STANDBY"

        status = "VALID ALTITTUDE AND CABIN" 
    elif  (0 <= altitude and altitude <= 50000) and (cabin_psi == 0):
        status = "CABIN psi error"   
    else: 
        status = "SENSOR_OUT_OF_RANGE"


    # Bug: Potential division by zero if pressure is incorrectly read as 0
    try:
        flow_rate = altitude / cabin_psi
        return status, flow_rate
    
    except ZeroDivisionError:
        return "HARDWARE_FAILURE_ZERO_PSI", 0.0

    


print(control_oxygen_flow(50000.0,8.0))