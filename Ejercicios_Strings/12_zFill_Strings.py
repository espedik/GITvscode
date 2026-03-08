# 🛠️ 12_Padding_Zfill.py
id_corto = "A15"

# Rellenamos con ceros a la izquierda hasta tener 8 caracteres
id_completo = id_corto.zfill(8)

print(f"ID Original: {id_corto}")
print(f"ID para Protocolo: {id_completo}")

# Image of [Python string zfill and padding for hardware IDs]