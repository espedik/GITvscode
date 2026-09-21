@echo off
rem Doble clic una sola vez: registra claudeinv:// para que el boton del Dashboard abra Claude Code.
cd /d "%~dp0"
where pwsh >nul 2>nul && (pwsh -NoProfile -ExecutionPolicy Bypass -File "%~dp0inversion-actualizar.ps1" -Instalar) || (powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0inversion-actualizar.ps1" -Instalar)
