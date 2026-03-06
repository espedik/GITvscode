import pytest
from sensor import ValidadorSensor

@pytest.fixture
def validador():
    # Iniciamos el sensor con rango estándar 0-100
    return ValidadorSensor(0, 100)

# --- PRUEBAS DE RANGO (BOUNDARY TESTING) ---

def test_temperatura_en_limite_inferior(validador):
    assert validador.es_rango_seguro(0) is True

def test_temperatura_en_limite_superior(validador):
    assert validador.es_rango_seguro(100) is True

def test_temperatura_fuera_por_debajo(validador):
    assert validador.es_rango_seguro(-0.1) is False

def test_temperatura_fuera_por_encima(validador):
    assert validador.es_rango_seguro(100.1) is False

# --- PRUEBAS DE CONVERSIÓN ---

def test_conversion_congelacion(validador):
    assert validador.convertir_a_fahrenheit(0) == 32

def test_conversion_ebullicion(validador):
    assert validador.convertir_a_fahrenheit(100) == 212

# --- PRUEBAS DE ERRORES ---

def test_entrada_no_numerica(validador):
    with pytest.raises(TypeError):
        validador.es_rango_seguro("25°C")

# --- REPORTE AUTOMÁTICO ---
# --- Bloque de Automatización de Reportes ---
if __name__ == "__main__":
    argumentos = [
        "-v",
        "--html=reporte_detallado.html",
        "--self-contained-html",
        "--cov=calculadora",
        "--cov-report=term-missing"
    ]
    pytest.main(argumentos)