# 🛠️ 11_Join_Strings.py
# Objetivo: Unir una lista de estados en una sola cadena para un log.
pasos = ["CONECTADO", "TEST_OK", "DESCONECTADO"]
reporte_final = ""

# Usamos el método nativo .join()
reporte_final = " -> ".join(pasos)

# Usamos tu bucle para validar la longitud del reporte generado
for i in range(0, len(reporte_final), 1):
    if reporte_final[i] == ">":
        print(f"Flecha de seguimiento detectada en índice {i}")

print(f"Log generado: {reporte_final}")