import pytest

# =================================================================
# LÓGICA DE NEGOCIO (SISTEMA DE MONITOREO DE MOTOR)
# =================================================================

def calculate_engine_health(temp, pressure):
    """
    Calcula el estado del motor y su índice de salud.
    Maneja señales de sensores y detecta fallas críticas.
    """
    # 1. Manejo de excepciones para operaciones aritméticas y tipos de datos
    try:
        health_score = round((temp / pressure) * 100, 2)
    except ZeroDivisionError:
        # Crucial para QA: Capturar el fallo de hardware (presión 0)
        return "CRITICAL_ERROR: Zero Pressure Signal", 0.0
    except (TypeError, ValueError):
        # Captura datos corruptos o tipos de datos inválidos (None, strings)
        return "CRITICAL_ERROR: Invalid Sensor Data Type", 0.0

    # 2. Evaluación de rangos de Temperatura (150 - 250)
    if 150 <= temp <= 250:
        t_status = "TEMP_OK"
    elif temp < 150:
        t_status = "TEMP_LOW"
    else:
        t_status = "TEMP_HIGH"

    # 3. Evaluación de rangos de Presión (30 - 50)
    if 30 <= pressure <= 50:
        p_status = "PRES_OK"
    elif pressure < 30:
        p_status = "PRES_LOW"
    else:
        p_status = "PRES_HIGH"

    # 4. Generación de estado combinado (Multidimensional)
    status_code = f"{t_status} | {p_status}"
    
    return status_code, health_score


# =================================================================
# SUITE DE PRUEBAS (BVA + PARTICIÓN DE EQUIVALENCIA)
# =================================================================

@pytest.mark.parametrize("temp, pressure, exp_status, exp_score", [
    # --- Casos Nominales (Partición de Equivalencia) ---
    (200, 40, "TEMP_OK | PRES_OK", 500.0),
    
    # --- BVA: Límites de Temperatura ---
    (150, 40, "TEMP_OK | PRES_OK", 375.0),     # Límite inferior exacto
    (149, 40, "TEMP_LOW | PRES_OK", 372.5),    # Justo debajo del límite
    (250, 40, "TEMP_OK | PRES_OK", 625.0),     # Límite superior exacto
    (251, 40, "TEMP_HIGH | PRES_OK", 627.5),   # Justo arriba del límite
    
    # --- BVA: Límites de Presión ---
    (200, 30, "TEMP_OK | PRES_OK", 666.67),    # Límite inferior exacto
    (200, 29, "TEMP_OK | PRES_LOW", 689.66),   # Justo debajo del límite
    (200, 50, "TEMP_OK | PRES_OK", 400.0),     # Límite superior exacto
    (200, 51, "TEMP_OK | PRES_HIGH", 392.16),  # Justo arriba del límite
    
    # --- Casos Combinados (Doble Falla) ---
    (140, 25, "TEMP_LOW | PRES_LOW", 560.0),   # Ambas señales bajas
    (260, 60, "TEMP_HIGH | PRES_HIGH", 433.33) # Ambas señales altas
])
def test_engine_health_matrix(temp, pressure, exp_status, exp_score):
    """Valida la lógica combinada de estados y precisión del score."""
    status, score = calculate_engine_health(temp, pressure)
    assert status == exp_status
    assert score == exp_score


def test_safety_critical_division_by_zero():
    """Verifica el manejo de excepción cuando el sensor de presión marca 0."""
    status, score = calculate_engine_health(200, 0)
    assert "Zero Pressure" in status
    assert score == 0.0


def test_robustness_invalid_input():
    """Verifica que el sistema no 'truene' ante tipos de datos inesperados."""
    status, score = calculate_engine_health("200", None)
    assert "Invalid Sensor Data Type" in status
    assert score == 0.0