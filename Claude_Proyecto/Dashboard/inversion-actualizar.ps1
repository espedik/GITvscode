# inversion-actualizar.ps1 — el puente entre los botones 🤖 del panel "Qué invertir hoy" del
# Dashboard y Claude Code. Lo lanza Windows cuando la página navega a
#   claudeinv://actualizar?ctx=…   → los tres perfiles (inversion-hoy.js)
#   claudeinv://superalto?ctx=…    → la pestaña Riesgo súper alto (inversion-superalto.js)
# o a mano con inversion-actualizar.bat (usa el último contexto guardado de ese modo).
#
# Qué hace, en orden:
#   1. Saca del enlace el contexto (los saldos reales que mandó la página, JSON en base64url)
#      y lo guarda en inversion-<modo>-contexto.json.
#   2. Arma el prompt: el texto de inversion-<modo>-prompt.js + ese contexto.
#   3. Corre `claude -p` con salida estructurada (inversion-<modo>-esquema.json), sin herramientas
#      de archivo — solo las de web — y con un system prompt corto en vez del de Claude Code (la
#      mitad de tokens, medido: 13.7k contra 27.6k).
#   4. Valida el JSON y escribe el .js de forma atómica (temporal + Move-Item). Si algo falla,
#      el archivo anterior se queda intacto.
#
# Instalar el protocolo una sola vez:  .\inversion-actualizar.ps1 -Instalar   (o el .bat)
param(
  [string]$Url = '',
  [ValidateSet('perfiles', 'superalto')] [string]$Modo = 'perfiles',
  [switch]$Instalar,
  [string]$Modelo = 'opus',
  [string]$Esfuerzo = '',
  [switch]$SinBusqueda,   # sin web: menos de la mitad de tokens (medido: 92k con 3 búsquedas), pero tasas y precios de memoria
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
  Fin 'Ya puedes usar los botones 🤖 del Dashboard. La primera vez el navegador pregunta si abre PowerShell: marca "permitir siempre".' 0
}

# ── Los dos modos: qué archivos usa cada uno y cómo se llama a Claude ────────────────────────
if ($Url -match '^claudeinv://([a-z]+)') { if ($Matches[1] -eq 'superalto') { $Modo = 'superalto' } else { $Modo = 'perfiles' } }
$MODOS = @{
  perfiles = @{
    prompt = 'inversion-prompt.js'; esquema = 'inversion-esquema.json'; destino = 'inversion-hoy.js'
    variable = 'INVERSION_HOY'; contexto = 'inversion-contexto.json'; web = @('WebSearch'); esfuerzo = 'medium'
    sistema = 'Eres un asesor de inversión personal. Respondes únicamente con la salida estructurada que se te pide, en español de México. No uses ninguna herramienta salvo WebSearch, y como máximo 3 veces.'
    nombre = 'los tres perfiles'
  }
  superalto = @{
    prompt = 'inversion-superalto-prompt.js'; esquema = 'inversion-superalto-esquema.json'; destino = 'inversion-superalto.js'
    variable = 'INVERSION_SUPERALTO'; contexto = 'inversion-superalto-contexto.json'; web = @('WebSearch', 'WebFetch'); esfuerzo = 'medium'   # Adán, 21-sep-2026: "no quiero que se gasten muchos tokens, ponle medium"
    sistema = 'Eres un analista de acciones de alto riesgo. Investigas a fondo con WebSearch y WebFetch (entre 6 y 12 búsquedas) antes de responder, y respondes únicamente con la salida estructurada que se te pide, en español de México. Ninguna otra herramienta.'
    nombre = 'la apuesta de riesgo súper alto'
  }
}
$M = $MODOS[$Modo]
if (-not $Esfuerzo) { $Esfuerzo = $M.esfuerzo }

# ── 1. El contexto ───────────────────────────────────────────────────────────────────────────
$ctxPath = Join-Path $AQUI $M.contexto
$ctx = $null
if ($Url -match 'ctx=([A-Za-z0-9_-]+)') {
  $b64 = $Matches[1].Replace('-', '+').Replace('_', '/')
  while ($b64.Length % 4 -ne 0) { $b64 += '=' }
  $ctx = $UTF8.GetString([Convert]::FromBase64String($b64))
  [IO.File]::WriteAllText($ctxPath, $ctx, $UTF8)
  Write-Host ('📥 Contexto recibido del Dashboard (' + $M.nombre + ').')
} elseif (Test-Path $ctxPath) {
  $ctx = [IO.File]::ReadAllText($ctxPath, $UTF8)
  Write-Host ('📂 Sin enlace: uso el último contexto guardado de ' + $M.nombre + ' (' + (Get-Item $ctxPath).LastWriteTime.ToString('d MMM HH:mm') + ').')
} else {
  Fin ('❌ No hay contexto para ' + $M.nombre + '. Abre el Dashboard y pulsa su botón 🤖: la página manda tus saldos reales.') 1
}
try { $null = $ctx | ConvertFrom-Json } catch { Fin ('❌ El contexto no es JSON válido: ' + $_.Exception.Message) 1 }

# ── 2. El prompt (entre los acentos graves del .js) y el esquema ─────────────────────────────
$js = [IO.File]::ReadAllText((Join-Path $AQUI $M.prompt), $UTF8)
$mp = [regex]::Match($js, '(?s)`(.*)`')
if (-not $mp.Success) { Fin ('❌ No encuentro el texto del prompt en ' + $M.prompt) 1 }
$prompt = $mp.Groups[1].Value.Trim()
if ($SinBusqueda) { $prompt = "HOY NO TIENES BÚSQUEDA WEB: usa lo que sabes y dilo en el resumen. Ignora lo que diga abajo sobre buscar.`n`n" + $prompt }
$prompt += "`n`nCONTEXTO DE ADÁN (JSON, saldos reales de hoy):`n" + $ctx
$esquema = ([IO.File]::ReadAllText((Join-Path $AQUI $M.esquema), $UTF8) | ConvertFrom-Json) | ConvertTo-Json -Depth 20 -Compress
$sistema = [string]$M.sistema

# Si esto corre desde dentro de una sesión de Claude Code, la variable bloquea el arranque.
Remove-Item Env:CLAUDECODE -ErrorAction SilentlyContinue
Remove-Item Env:CLAUDE_CODE_ENTRYPOINT -ErrorAction SilentlyContinue

# ── 3. Claude ────────────────────────────────────────────────────────────────────────────────
$web = $M.web; if ($SinBusqueda) { $web = @('') }
$tarda = 'suele tardar 1-3 minutos'; if ($Modo -eq 'superalto') { $tarda = 'investiga en la web, suele tardar 3-6 minutos' }
Write-Host ('⏳ Claude (' + $Modelo + ', ' + $Esfuerzo + ') está pensando en ' + $M.nombre + '… ' + $tarda + '. No cierres esta ventana.')
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
# Si el modelo pedido choca con el límite de sesión de la suscripción ("You've hit your session
# limit"), se reintenta una vez con Sonnet: mejor una apuesta de Sonnet hoy que ninguna hasta que
# el límite se reinicie. La pestaña muestra qué modelo la escribió (_meta.modelo).
$intentos = @($Modelo); if ($Modelo -ne 'sonnet') { $intentos += 'sonnet' }
$j = $null
foreach ($modeloIntento in $intentos) {
  $salida = $prompt | & $claude -p --no-session-persistence --tools $web --output-format json `
    --model $modeloIntento --effort $Esfuerzo --system-prompt $sisArg --json-schema $esqArg 2>&1 | Out-String
  # La respuesta cruda queda en TEMP para poder mirarla si algo sale raro; no va al repo.
  try { [IO.File]::WriteAllText((Join-Path $env:TEMP ('inversion-claude-salida-' + $Modo + '.json')), $salida, $UTF8) } catch {}
  $j = $null
  try { $j = $salida | ConvertFrom-Json } catch {}
  if (-not $j) { Fin ('❌ Claude no devolvió JSON. Salida:' + "`n" + $salida.Substring(0, [Math]::Min(1500, $salida.Length))) 1 }
  if ($j.is_error -and ([string]$j.result) -match 'limit' -and $modeloIntento -ne $intentos[-1]) {
    Write-Host ('⚠️  ' + $modeloIntento + ' está en su límite de sesión (' + $j.result + '). Reintento con sonnet…')
    continue
  }
  break
}
$seg = [int]((Get-Date) - $t0).TotalSeconds
if ($j.is_error) { Fin ('❌ Claude respondió con error: ' + $j.result) 1 }

$datos = $j.structured_output
if (-not $datos) {
  # Sin salida estructurada: se intenta leer el texto como JSON (quitando ``` si los trae).
  $txt = [string]$j.result
  $txt = $txt -replace '^\s*```(json)?\s*', '' -replace '\s*```\s*$', ''
  try { $datos = $txt | ConvertFrom-Json } catch { Fin ('❌ La respuesta no trae JSON utilizable:' + "`n" + $txt.Substring(0, [Math]::Min(800, $txt.Length))) 1 }
}
if ($Modo -eq 'perfiles') {
  foreach ($k in 'veredicto', 'mercado', 'perfiles', 'fuentes') {
    if (-not $datos.PSObject.Properties[$k]) { Fin ('❌ Al JSON le falta "' + $k + '". No toco ' + $M.destino + '.') 1 }
  }
  foreach ($p in 'seguro', 'medio', 'alto') {
    $pf = $datos.perfiles.$p
    if (-not $pf) { Fin ('❌ Falta el perfil "' + $p + '".') 1 }
    $suma = 0; foreach ($a in $pf.activos) { $suma += [double]$a.pct }
    if ([Math]::Abs($suma - 100) -gt 1) { Write-Host ('⚠️  Los porcentajes de "' + $p + '" suman ' + $suma + ', no 100. Se guarda igual; la plantilla normaliza.') }
  }
  $titulo = [string]$datos.veredicto.titulo
} else {
  foreach ($k in 'resumen', 'principal', 'alternativas', 'reglas', 'fuentes') {
    if (-not $datos.PSObject.Properties[$k]) { Fin ('❌ Al JSON le falta "' + $k + '". No toco ' + $M.destino + '.') 1 }
  }
  if (-not $datos.principal.ticker) { Fin '❌ La apuesta principal no trae ticker. No toco nada.' 1 }
  $titulo = [string]$datos.principal.empresa + ' (' + [string]$datos.principal.ticker + ') · ' + [string]$datos.principal.caidaDesdeMax + ' % desde el máximo'
}

# ── 4. Escribir el .js de datos ──────────────────────────────────────────────────────────────
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
$salidaTok = 0; if ($u) { $salidaTok = [int]$u.output_tokens }
$meta = [ordered]@{
  generado  = (Get-Date).ToString('yyyy-MM-ddTHH:mm:sszzz')
  modelo    = $modelo
  tokens    = $tokens                       # todo lo procesado, sumando cada vuelta (búsquedas incluidas)
  salida    = $salidaTok
  turnos    = [int]$j.num_turns
  segundos  = $seg
  costoUsd  = [math]::Round([double]$j.total_cost_usd, 4)
}
$datos | Add-Member -NotePropertyName '_meta' -NotePropertyValue ([pscustomobject]$meta) -Force
$json = $datos | ConvertTo-Json -Depth 20
$texto = "// Generado por inversion-actualizar.ps1 (" + $Modo + ") el $($meta.generado) — NO se edita a mano: lo escribe Claude.`n" +
         "// Es el ÚNICO archivo que cambia al actualizar " + $M.nombre + "; la plantilla (dashboard.html) lo pinta.`n" +
         "window." + $M.variable + " = " + $json + ";`n"
$destino = Join-Path $AQUI $M.destino
$tmp = $destino + '.tmp'
[IO.File]::WriteAllText($tmp, $texto, $UTF8)
Move-Item -Path $tmp -Destination $destino -Force

Write-Host ''
Write-Host ('✅ ' + $M.destino + ' actualizado · ' + $modelo + ' · ' + $tokens.ToString('N0') + ' tokens (' + $salidaTok + ' de salida) · ' + $meta.turnos + ' turnos · ' + $seg + ' s')
Write-Host ('   ' + $titulo)
Fin 'El Dashboard se repinta solo si está abierto; si no, ábrelo.' 0
