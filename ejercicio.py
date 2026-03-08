import pytest
from typing import List, Dict

# --- La función a probar ---
def validateConfig(lines: List[str]) -> Dict[str, str]:
    directorio = {}
    for i, line in enumerate(lines, start=1):
        stripped = line.strip()
        if not stripped or stripped.startswith('#'):
            continue
            
        if stripped.count('=') != 1:
            raise ValueError(f"Invalid format on line: {i}")
            
        key, value = stripped.split('=')
        key, value = key.strip(), value.strip()
        
        if not key or not value:
            raise ValueError(f"Invalid format on line: {i}. Key and value must be non-empty")
            
        if key in directorio:
            raise ValueError(f"Duplicate key found on line {i}: {key}")
            
        directorio[key] = value
    return directorio

# --- Suite de Pruebas con Pytest ---

def test_valid_config():
    """Caso feliz: Configuración válida con comentarios y espacios"""
    input_data = [
        "host=localhost",
        "port=8080",
        "# este es un comentario",
        "  ", # línea vacía
        "debug=true"
    ]
    expected = {
        "host": "localhost",
        "port": "8080",
        "debug": "true"
    }
    assert validateConfig(input_data) == expected

@pytest.mark.parametrize("lines, expected_error", [
    # 1. Error de formato (sin '=' o más de uno)
    (["host localhost"], "Invalid format on line: 1"),
    (["port=8080=extra"], "Invalid format on line: 1"),
    
    # 2. Key o Value vacíos tras hacer strip
    (["=value"], "Invalid format on line: 1. Key and value must be non-empty"),
    (["key="], "Invalid format on line: 1. Key and value must be non-empty"),
    (["  =  "], "Invalid format on line: 1. Key and value must be non-empty"),
    
    # 3. Llaves duplicadas
    (["user=admin", "user=guest"], "Duplicate key found on line 2: user"),
])
def test_validation_errors(lines, expected_error):
    """Prueba que se lancen los ValueError correctos"""
    with pytest.raises(ValueError) as excinfo:
        validateConfig(lines)
    assert str(excinfo.value) == expected_error

def test_ignoring_comments_only():
    """Prueba que si solo hay comentarios, devuelva un dict vacío"""
    input_data = ["# comment 1", "# comment 2"]
    assert validateConfig(input_data) == {}