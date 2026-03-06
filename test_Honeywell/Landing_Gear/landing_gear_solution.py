#Safety Requirements (ASIL-D):

# V-MAX-EXTEND: Gear can only be deployed if Airspeed < 220 knots.

# A-MAX-EXTEND: Gear should only be deployed if Altitude < 15,000 ft.

# WARNING: Trigger 'OVERSPEED_GEAR' if Airspeed > 250 knots while Gear is DOWN.

# CALC: Compute 'Drag Factor' = (Airspeed * 1.5) / Altitude.



from typing import Tuple, Optional

# Constants for Honeywell Standard
V_MAX_DEPLOY_KNOTS = 220.0
V_MAX_STRUCTURAL_KNOTS = 250.0
ALT_MAX_DEPLOY_FT = 15000.0

def landing_gear_logic(airspeed_kt: float, altitude_ft: float, is_gear_down: bool) -> Tuple[str, float]:
    """
    LGCS Safety Logic. Handles deployment envelopes and 
    structural integrity warnings.
    """
    # 1. Input Validation & Physical Envelopes
    if airspeed_kt < 0 or altitude_ft < 0:
        return "SENSOR_MALFUNCTION", 0.0

    # 2. Deployment Logic (Strict AND condition)
    if airspeed_kt < V_MAX_DEPLOY_KNOTS and altitude_ft < ALT_MAX_DEPLOY_FT:
        action = "DEPLOY_ALLOWED"
    else:
        action = "OUT_OF_ENVELOPE"

    # 3. Structural Integrity Warning (Overspeed)
    status = "NOMINAL"
    if is_gear_down and airspeed_kt > V_MAX_STRUCTURAL_KNOTS:
        status = "OVERSPEED_GEAR_WARNING"

    # 4. Defensive Arithmetic (Touchdown Protection)
    try:
        # Use a safety floor for altitude to avoid division by zero
        # or handle explicit 0 state for ground operations
        if altitude_ft == 0:
            drag_factor = 0.0 # Ground mode
        else:
            drag_factor = round((airspeed_kt * 1.5) / altitude_ft, 2)
    except ZeroDivisionError:
        drag_factor = 0.0

    return f"{action} | {status}", drag_factor
   