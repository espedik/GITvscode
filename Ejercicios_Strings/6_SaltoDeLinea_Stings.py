# ==============================================================================
# 📔 NOTAS TÉCNICAS: CARACTERES DE ESCAPE
# ==============================================================================
# \n : Salto de línea (Enter).
# \t : Tabulación (Tab).
# \" : Incluir comillas dobles dentro de un string de comillas dobles.
# ==============================================================================

# 🛠️ EJERCICIO 6: EL TRADUCTOR DE BYTES (SOLUCIÓN)
# Construimos un reporte multilínea en una sola variable
reporte_hw = "Reporte de Hardware:\n\tCPU: \"Intel Core\"\n\tRAM: '16GB'"

print(reporte_hw)

# TIP: También puedes usar comillas triples para textos largos
reporte_pro = """
Detalle del Sistema:
-------------------
Estado: OK
Versión: 1.0.2
"""
print(reporte_pro)