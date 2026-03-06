from typing import Tuple

def control_oxygen_flow(alt_ft: float, press_psi: float) -> Tuple[str, float]:
    # --- HONEYWELL CERTIFIED CONSTANTS ---
    ALT_MAX_LIMIT_FT = 50000.0
    ALT_EMERGENCY_THRESHOLD_FT = 30000.0
    ALT_STANDBY_THRESHOLD_FT = 10000.0
    
    PRESS_MIN_SAFE_PSI = 10.0
    PRESS_STANDBY_THRESHOLD_PSI = 13.0
    PRESS_CRITICAL_FAILURE_PSI = 0.0

    # 1. Validation Barrier
    if not (0 <= alt_ft <= ALT_MAX_LIMIT_FT) or press_psi <= PRESS_CRITICAL_FAILURE_PSI:
        return "SENSOR_FAILURE_STATE", 0.0
    
    # 2. Logic using named constants
    is_emergency = (alt_ft > ALT_EMERGENCY_THRESHOLD_FT or 
                    press_psi < PRESS_MIN_SAFE_PSI)
                    
    is_standby = (alt_ft < ALT_STANDBY_THRESHOLD_FT and 
                  press_psi > PRESS_STANDBY_THRESHOLD_PSI)
    
    if is_emergency:
        status = "EMERGENCY"
    elif is_standby:
        status = "STANDBY"
    else:
        status = "NORMAL"
    
    # 3. Defensive Arithmetic
    try:
        flow = round(alt_ft / press_psi, 2)
    except ZeroDivisionError:
        return "HARDWARE_FAULT_DIV_ZERO", 0.0
        
    return status, flow