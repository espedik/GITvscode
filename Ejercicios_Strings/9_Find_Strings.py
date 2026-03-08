# 🛠️ 14_Busqueda_Segura.py
log = "TEMP:25.5;STATUS:OK"

# Buscamos 'ERROR' de forma segura
posicion = log.find("ERROR")

if posicion == -1:
    print("✅ El log está limpio de errores.")
else:
    # Usamos el bucle para analizar la zona del error
    for i in range(posicion, len(log), 1):
        print(f"Analizando falla en índice {i}: {log[i]}")