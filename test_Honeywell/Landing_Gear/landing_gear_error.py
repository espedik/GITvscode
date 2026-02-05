#Safety Requirements (ASIL-D):

# V-MAX-EXTEND: Gear can only be deployed if Airspeed < 220 knots.

# A-MAX-EXTEND: Gear should only be deployed if Altitude < 15,000 ft.

# WARNING: Trigger 'OVERSPEED_GEAR' if Airspeed > 250 knots while Gear is DOWN.

# CALC: Compute 'Drag Factor' = (Airspeed * 1.5) / Altitude.



def landing_gear_logic(airspeed, altitude, is_gear_down):
    # Bug 1: Dangerous logical operator
    if airspeed < 220 or altitude < 15000:
        action = "DEPLOY_ALLOWED"
    else:
        action = "RETAIN_STATE"

    # Bug 2: Missing overspeed check for gear structural integrity
    if airspeed > 250:
        status = "SPEED_ALERT"
    
    # Bug 3: Immediate crash at touchdown (Altitude = 0)
    drag_factor = (airspeed * 1.5) / altitude
    return action, drag_factor