# inversion-actualizar.ps1 — el puente entre el botón "Actualizar con Claude" del Dashboard y
# Claude Code. Lo lanza Windows cuando el Dashboard navega a claudeinv://actualizar?ctx=…, o
# a mano con inversion-actualizar.bat (usa el último contexto guardado).
#
# Qué hace, en orden:
#   1. Saca del enlace el contexto (los saldos reales que mandó la página, JSON en base64url)
#      y lo guarda en inversion-contexto.json.
#   2. Arma el prompt: inversion-prompt.txt + ese contexto.
#   3. Corre `claude -p` con salida estructurada (inversion-esquema.json), sin herramientas de
#      archivo — solo WebSearch, que el prompt limita a 3 — y con un system prompt corto en vez
#      del de Claude Code (la mitad de tokens, medido: 13.7k contra 27.6k).
#   4. Valida el JSON y escribe inversion-hoy.js de forma atómica (temporal + Move-Item). Si
#      algo falla, el archivo anterior se queda intacto.
#
# Instalar el protocolo una sola vez:  .\inversion-actualizar.ps1 -Instalar   (o el .bat)
param(
  [string]$Url = '',
  [switch]$Instalar,
  [string]$Modelo = 'opus',
  [string]$Esfuerzo = 'medium',
  [switch]$SinBusqueda,   # sin WebSearch: menos de la mitad de tokens (medido: 92k con 3 búsquedas), pero tasas y precios de memoria
  [switch]$SinPausa
)
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [Text.Encoding]::UTF8
$OutputEncoding = [Text.Encoding]::UTF8
$AQUI = Split-Path -Parent $MyInvocation.MyCommand.Path
$UTF8 = New-Object System.Text.UTF8Encoding($false)

function Pausa([string]$msg) {
  if ($SinPausa) { return }
  try { [void](Read-Host ($msg + ' · Enter para cerrar')) } catch {}
}
function Fin([string]$msg, [int]$codigo) {
  Write-Host ''
  Write-Host $msg
  Pausa ''
  exit $codigo
}

# ── Instalar: registra claudeinv:// en HKCU (no pide administrador) ──────────────────────────
if ($Instalar) {
  $pwsh = Get-Command pwsh -ErrorAction SilentlyContinue
  if ($pwsh) { $exe = $pwsh.Source } else { $exe = (Get-Command powershell).Source }
  $script = Join-Path $AQUI 'inversion-actualizar.ps1'
  $cmd = ('"{0}" -NoProfile -ExecutionPolicy Bypass -File "{1}" -Url "%1"' -f $exe, $script)
  $base = 'HKCU:\Software\Classes\claudeinv'
  New-Item -Path $base -Force | Out-Null
  Set-ItemProperty -Path $base -Name '(default)' -Value 'URL:Claude · Qué invertir hoy'
  Set-ItemProperty -Path $base -Name 'URL Protocol' -Value ''
  New-Item -Path "$base\shell\open\command" -Force | Out-Null
  Set-ItemProperty -Path "$base\shell\open\command" -Name '(default)' -Value $cmd
  Write-Host '✅ Protocolo claudeinv:// registrado para este usuario.'
  Write-Host ('   Abre: ' + $cmd)
  Fin 'Ya puedes usar el botón 🤖 del Dashboard. La primera vez el navegador pregunta si abre PowerShell: marca "permitir siempre".' 0
}

# ── 1. El contexto ───────────────────────────────────────────────────────────────────────────
$ctxPath = Join-Path $AQUI 'inversion-contexto.json'
$ctx = $null
if ($Url -match 'ctx=([A-Za-z0-9_-]+)') {
  $b64 = $Matches[1].Replace('-', '+').Replace('_', '/')
  while ($b64.Length % 4 -ne 0) { $b64 += '=' }
  $ctx = $UTF8.GetString([Convert]::FromBase64String($b64))
  [IO.File]::WriteAllText($ctxPath, $ctx, $UTF8)
  Write-Host '📥 Contexto recibido del Dashboard.'
} elseif (Test-Path $ctxPath) {
  $ctx = [IO.File]::ReadAllText($ctxPath, $UTF8)
  Write-Host ('📂 Sin enlace: uso el último contexto guardado (' + (Get-Item $ctxPath).LastWriteTime.ToString('d MMM HH:mm') + ').')
} else {
  Fin '❌ No hay contexto. Abre el Dashboard y pulsa "Actualizar con Claude": la página manda tus saldos reales.' 1
}
try { $null = $ctx | ConvertFrom-Json } catch { Fin ('❌ El contexto no es JSON válido: ' + $_.Exception.Message) 1 }

# ── 2. El prompt y el esquema ────────────────────────────────────────────────────────────────
$prompt  = [IO.File]::ReadAllText((Join-Path $AQUI 'inversion-prompt.txt'), $UTF8)
$prompt += "`n`nCONTEXTO DE ADÁN (JSON, saldos reales de hoy):`n" + $ctx
$esquema = ([IO.File]::ReadAllText((Join-Path $AQUI 'inversion-esquema.json'), $UTF8) | ConvertFrom-Json) | ConvertTo-Json -Depth 20 -Compress
$sistema = 'Eres un asesor de inversión personal. Respondes únicamente con la salida estructurada que se te pide, en español de México. No uses ninguna herramienta salvo WebSearch, y como máximo 3 veces.'

# Si esto corre desde dentro de una sesión de Claude Code, la variable bloquea el arranque.
Remove-Item Env:CLAUDECODE -ErrorAction SilentlyContinue
Remove-Item Env:CLAUDE_CODE_ENTRYPOINT -ErrorAction SilentlyContinue

# ── 3. Claude ────────────────────────────────────────────────────────────────────────────────
Write-Host ('⏳ Claude (' + $Modelo + ') está pensando… suele tardar 1-2 minutos. No cierres esta ventana.')
$t0 = Get-Date
# PowerShell 5 no escapa las comillas al pasar argumentos a un .exe; 7.3+ sí. Se escapan a mano
# solo en el 5, para que el esquema llegue entero en los dos.
$esqArg = $esquema
if ($PSVersionTable.PSVersion.Major -lt 7) { $esqArg = $esquema.Replace('"', '\"') }
$sisArg = $sistema
if ($PSVersionTable.PSVersion.Major -lt 7) { $sisArg = $sistema.Replace('"', '\"') }
# `claude` en PowerShell es un shim .ps1 de npm que reenvía a claude.exe; se llama al .exe directo
# para que los argumentos pasen por una sola capa de escapado.
$claude = (Get-Command claude -ErrorAction Stop).Source
if ($claude -like '*.ps1') {
  $exeShim = Join-Path (Split-Path $claude) 'node_modules\@anthropic-ai\claude-code\bin\claude.exe'
  if (Test-Path $exeShim) { $claude = $exeShim }
}
$herr = 'WebSearch'; if ($SinBusqueda) { $herr = ''; $prompt = $prompt.Replace('Puedes usar WebSearch como máximo 3 veces', 'HOY NO tienes búsqueda web: usa lo que sabes y dilo en mercado.resumen. (Ignora esto: Puedes usar WebSearch como máximo 3 veces') }
$salida = $prompt | & $claude -p --no-session-persistence --tools $herr --output-format json `
  --model $Modelo --effort $Esfuerzo --system-prompt $sisArg --json-schema $esqArg 2>&1 | Out-String
$seg = [int]((Get-Date) - $t0).TotalSeconds
# La respuesta cruda queda en TEMP para poder mirarla si algo sale raro; no va al repo.
try { [IO.File]::WriteAllText((Join-Path $env:TEMP 'inversion-claude-salida.json'), $salida, $UTF8) } catch {}

$j = $null
try { $j = $salida | ConvertFrom-Json } catch {}
if (-not $j) { Fin ('❌ Claude no devolvió JSON. Salida:' + "`n" + $salida.Substring(0, [Math]::Min(1500, $salida.Length))) 1 }
if ($j.is_error) { Fin ('❌ Claude respondió con error: ' + $j.result) 1 }

$datos = $j.structured_output
if (-not $datos) {
  # Sin salida estructurada: se intenta leer el texto como JSON (quitando ``` si los trae).
  $txt = [string]$j.result
  $txt = $txt -replace '^\s*```(json)?\s*', '' -replace '\s*```\s*$', ''
  try { $datos = $txt | ConvertFrom-Json } catch { Fin ('❌ La respuesta no trae JSON utilizable:' + "`n" + $txt.Substring(0, [Math]::Min(800, $txt.Length))) 1 }
}
foreach ($k in 'veredicto', 'mercado', 'perfiles', 'fuentes') {
  if (-not $datos.PSObject.Properties[$k]) { Fin ('❌ Al JSON le falta "' + $k + '". No toco inversion-hoy.js.') 1 }
}
foreach ($p in 'seguro', 'medio', 'alto') {
  $pf = $datos.perfiles.$p
  if (-not $pf) { Fin ('❌ Falta el perfil "' + $p + '".') 1 }
  $suma = 0; foreach ($a in $pf.activos) { $suma += [double]$a.pct }
  if ([Math]::Abs($suma - 100) -gt 1) { Write-Host ('⚠️  Los porcentajes de "' + $p + '" suman ' + $suma + ', no 100. Se guarda igual; la plantilla normaliza.') }
}

# ── 4. Escribir inversion-hoy.js ─────────────────────────────────────────────────────────────
# modelUsage trae también el modelo auxiliar (haiku) que Claude Code usa por dentro: el que
# escribió la respuesta es el que más tokens de salida produjo.
$modelo = ''; $maxOut = -1
if ($j.modelUsage) {
  foreach ($pr in $j.modelUsage.PSObject.Properties) {
    if ([int]$pr.Value.outputTokens -gt $maxOut) { $maxOut = [int]$pr.Value.outputTokens; $modelo = $pr.Name }
  }
}
$u = $j.usage
$tokens = 0
if ($u) { $tokens = [int]$u.input_tokens + [int]$u.cache_creation_input_tokens + [int]$u.cache_read_input_tokens + [int]$u.output_tokens }
$meta = [ordered]@{
  generado  = (Get-Date).ToString('yyyy-MM-ddTHH:mm:sszzz')
  modelo    = $modelo
  tokens    = $tokens                       # todo lo procesado, sumando cada vuelta (búsquedas incluidas)
  salida    = $(if ($u) { [int]$u.output_tokens } else { 0 })
  turnos    = [int]$j.num_turns
  segundos  = $seg
  costoUsd  = [math]::Round([double]$j.total_cost_usd, 4)
}
$datos | Add-Member -NotePropertyName '_meta' -NotePropertyValue ([pscustomobject]$meta) -Force
$json = $datos | ConvertTo-Json -Depth 20
$js = "// Generado por inversion-actualizar.ps1 el $($meta.generado) — NO se edita a mano: lo escribe Claude.`n" +
      "// Es el ÚNICO archivo que cambia al actualizar; la plantilla (dashboard.html) lo pinta.`n" +
      "window.INVERSION_HOY = " + $json + ";`n"
$destino = Join-Path $AQUI 'inversion-hoy.js'
$tmp = $destino + '.tmp'
[IO.File]::WriteAllText($tmp, $js, $UTF8)
Move-Item -Path $tmp -Destination $destino -Force

Write-Host ''
Write-Host ('✅ inversion-hoy.js actualizado · ' + $modelo + ' · ' + $tokens.ToString('N0') + ' tokens (' + $meta.salida + ' de salida) · ' + $meta.turnos + ' turnos · ' + $seg + ' s')
Write-Host ('   ' + $datos.veredicto.titulo)
Fin 'El Dashboard se repinta solo si está abierto; si no, ábrelo.' 0
