@echo off
rem Doble clic: pide a Claude la inversion de hoy con el ultimo contexto que mando el Dashboard.
cd /d "%~dp0"
where pwsh >nul 2>nul && (pwsh -NoProfile -ExecutionPolicy Bypass -File "%~dp0inversion-actualizar.ps1") || (powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0inversion-actualizar.ps1")
