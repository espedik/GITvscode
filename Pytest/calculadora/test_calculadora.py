import pytest
from calculadora import Calculadora

@pytest.fixture
def calc():
    return Calculadora()

# --- Tests Básicos ---
def test_suma(calc):
    assert calc.sumar(5, 5) == 10

def test_division_error(calc):
    with pytest.raises(ValueError):
        calc.dividir(10, 0)

# --- Tests Nuevos (Funciones Extendidas) ---
def test_potencia(calc):
    assert calc.potencia(2, 3) == 8

def test_raiz_cuadrada_exacta(calc):
    assert calc.raiz_cuadrada(25) == 5

def test_raiz_cuadrada_decimal(calc):
    # Usamos approx porque la raíz de 2 es un decimal infinito
    assert calc.raiz_cuadrada(2) == pytest.approx(1.41421356)

def test_raiz_error_negativo(calc):
    with pytest.raises(ValueError):
        calc.raiz_cuadrada(-9)

def test_porcentaje(calc):
    assert calc.porcentaje(200, 15) == 30

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