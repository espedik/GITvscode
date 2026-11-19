@echo off
rem Sube a GitHub lo que anotas en el navegador de esta PC (habitos, auditoria, saldos de Finanzas con el Bitcoin, mis cifras).
rem   Doble clic ............................ lo sube ahora
rem   subir-mis-datos.bat /instalar ......... lo sube solo cada noche a las 23:30 (tarea de Windows "Subir mis datos")
rem   subir-mis-datos.bat /quitar ........... quita esa tarea
rem Lo hace Dashboard\subir-mis-datos.js.
chcp 65001 >nul
cd /d "%~dp0"
if /i "%~1"=="/instalar" goto instalar
if /i "%~1"=="/quitar" goto quitar
node Dashboard\subir-mis-datos.js
if /i not "%~1"=="/auto" pause
exit /b

:instalar
powershell -NoProfile -Command "$n = (Get-Command node).Source; $js = Join-Path '%~dp0' 'Dashboard\subir-mis-datos.js'; $a = New-ScheduledTaskAction -Execute $n -Argument $js -WorkingDirectory '%~dp0'; $t = New-ScheduledTaskTrigger -Daily -At 23:30; $s = New-ScheduledTaskSettingsSet -StartWhenAvailable -DontStopIfGoingOnBatteries -AllowStartIfOnBatteries; Register-ScheduledTask -TaskName 'Subir mis datos' -Description 'Sube a GitHub lo que anotas en el Dashboard y en Finanzas (Claude_Proyecto\subir-mis-datos.bat)' -Action $a -Trigger $t -Settings $s -Force | Out-Null; 'Listo: cada noche a las 23:30 (o al prender la PC si estaba apagada) se suben tus datos.'"
pause
exit /b

:quitar
schtasks /delete /tn "Subir mis datos" /f
pause
exit /b
