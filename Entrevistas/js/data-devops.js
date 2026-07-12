
// ══════════════════════════════════════════════════════════════════
//  DEVOPS_RICH — CI/CD, Docker, Linux
// ══════════════════════════════════════════════════════════════════
const DEVOPS_RICH = {

'cicd-conceptos': `
<div class="plan-card">
  <div class="plan-card-title">⚙️ CI/CD — Integración y Entrega Continua</div>
  <div class="plan-block">
    <div class="plan-time">CI — Integración Continua</div>
    <div class="plan-content">
      <h4>Cada commit dispara el pipeline</h4>
      <p><b>Continuous Integration (CI):</b> Cada commit se integra automáticamente al código base principal. El pipeline CI ejecuta:<br>
      1. Build / compilación<br>
      2. Análisis estático (linting, MISRA, SonarQube)<br>
      3. Tests unitarios e integración<br>
      4. Reporte de cobertura<br>
      <b>Objetivo:</b> Detectar regresiones y conflictos lo antes posible (fail fast). Un bug encontrado en CI cuesta 10x menos que en producción.</p>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">CD — Entrega Continua</div>
    <div class="plan-content">
      <h4>Deploy automático al pasar CI</h4>
      <p><b>Continuous Delivery:</b> El código validado se puede desplegar en cualquier momento de forma manual pero rápida. El pipeline prepara el artefacto (binario, imagen Docker, paquete).<br>
      <b>Continuous Deployment:</b> El deploy a producción es completamente automático al pasar todos los tests. No hay aprobación manual.<br>
      En automoción: "producción" puede ser el servidor de validación, el repositorio de binarios de firmware, o el ambiente de testing HIL.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre CI/CD...</p>
</div>`,

'jenkins': `
<div class="plan-card">
  <div class="plan-card-title">🏗️ Jenkins — CI/CD con Jenkinsfile</div>
  <div class="plan-block">
    <div class="plan-time">Jenkinsfile</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Groovy — Jenkinsfile pipeline declarativo</div><pre>
pipeline {
    agent { label 'linux-python' }

    environment {
        PYTHONPATH = "\${WORKSPACE}/src"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install') {
            steps {
                sh 'pip install -r requirements.txt'
            }
        }
        stage('Lint') {
            steps {
                sh 'flake8 src/ --max-line-length=100'
            }
        }
        stage('Test') {
            steps {
                sh 'pytest tests/ --junitxml=test-results.xml --cov=src --cov-report=xml'
            }
            post {
                always {
                    junit 'test-results.xml'
                    publishCoverage adapters: [coberturaAdapter('coverage.xml')]
                }
            }
        }
    }
    post {
        failure {
            mail to: 'team@example.com',
                 subject: "FAILED: \${env.JOB_NAME}",
                 body: "Pipeline falló. Ver: \${env.BUILD_URL}"
        }
    }
}</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Jenkins...</p>
</div>`,

'docker-intro': `
<div class="plan-card">
  <div class="plan-card-title">🐳 Docker — Introducción</div>
  <div class="plan-block">
    <div class="plan-time">Contenedor vs VM</div>
    <div class="plan-content">
      <h4>¿Por qué Docker?</h4>
      <p><b>VM (Virtual Machine):</b> Virtualiza el hardware completo. Incluye un OS completo. Pesada (GBs), lenta de arrancar (minutos).<br>
      <b>Contenedor Docker:</b> Virtualiza solo el espacio de usuario. Comparte el kernel del host. Ligero (MBs), arranca en segundos. Aísla procesos mediante namespaces y cgroups del kernel Linux.<br>
      <b>Image:</b> Plantilla inmutable de filesystem con todo lo que necesita la app. Se construye una vez, se corre muchas veces.<br>
      <b>Container:</b> Instancia en ejecución de una image. Efímero por defecto: al parar, el estado se pierde (a menos que uses volumes).<br>
      <b>Docker Hub:</b> Registro público de imágenes. <code>python:3.11-slim</code>, <code>ubuntu:22.04</code>, <code>postgres:15</code>.</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Docker...</p>
</div>`,

'docker-comandos': `
<div class="plan-card">
  <div class="plan-card-title">💻 Comandos Docker esenciales</div>
  <div class="plan-block">
    <div class="plan-time">Referencia rápida</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Shell — Comandos Docker</div><pre>
<span class="c-cm"># Imágenes</span>
docker pull python:3.11-slim          <span class="c-cm"># descargar imagen</span>
docker images                          <span class="c-cm"># listar imágenes</span>
docker rmi python:3.11-slim            <span class="c-cm"># eliminar imagen</span>
docker build -t myapp:latest .         <span class="c-cm"># construir desde Dockerfile</span>

<span class="c-cm"># Contenedores</span>
docker run python:3.11-slim python --version
docker run -it python:3.11-slim bash   <span class="c-cm"># interactivo</span>
docker run -d -p 8080:80 nginx         <span class="c-cm"># background, mapeo de puerto</span>
docker run --rm myapp:latest           <span class="c-cm"># elimina al terminar</span>
docker run -v $(pwd):/app myapp        <span class="c-cm"># montar directorio</span>

<span class="c-cm"># Gestión de contenedores</span>
docker ps                              <span class="c-cm"># contenedores corriendo</span>
docker ps -a                           <span class="c-cm"># todos (incluye detenidos)</span>
docker stop container_id               <span class="c-cm"># detener</span>
docker rm container_id                 <span class="c-cm"># eliminar</span>
docker logs -f container_id            <span class="c-cm"># ver logs en tiempo real</span>
docker exec -it container_id bash      <span class="c-cm"># shell en container corriendo</span>
docker inspect container_id            <span class="c-cm"># metadatos completos</span>
docker stats                           <span class="c-cm"># uso de recursos en tiempo real</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus comandos Docker de referencia...</p>
</div>`,

'docker-compose': `
<div class="plan-card">
  <div class="plan-card-title">🎵 Docker Compose — Múltiples servicios</div>
  <div class="plan-block">
    <div class="plan-time">docker-compose.yml</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">YAML — docker-compose.yml</div><pre>
version: "3.9"

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - ./src:/app/src          <span class="c-cm"># hot reload en desarrollo</span>

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "user"]
      interval: 5s
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:

<span class="c-cm"># Comandos:</span>
<span class="c-cm"># docker compose up -d          # iniciar en background</span>
<span class="c-cm"># docker compose down           # detener y eliminar</span>
<span class="c-cm"># docker compose logs -f app    # ver logs del servicio app</span>
<span class="c-cm"># docker compose exec app bash  # shell en el contenedor app</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Docker Compose...</p>
</div>`,

'docker-dockerfile': `
<div class="plan-card">
  <div class="plan-card-title">📄 Dockerfile — Construir imágenes</div>
  <div class="plan-block">
    <div class="plan-time">Dockerfile Python</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Dockerfile — Python app</div><pre>
<span class="c-cm"># Base image (slim = más pequeña, sin extras)</span>
FROM python:3.11-slim

<span class="c-cm"># Directorio de trabajo en el contenedor</span>
WORKDIR /app

<span class="c-cm"># Primero copiar solo requirements (cache layer)</span>
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

<span class="c-cm"># Luego copiar el código (capa que cambia más)</span>
COPY src/ ./src/

<span class="c-cm"># Variables de entorno</span>
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

<span class="c-cm"># Exponer puerto (documentación, no abre el puerto)</span>
EXPOSE 8080

<span class="c-cm"># Usuario no-root (seguridad)</span>
RUN useradd -m appuser
USER appuser

<span class="c-cm"># Comando al iniciar el contenedor</span>
CMD ["python", "-m", "uvicorn", "src.main:app", "--host", "0.0.0.0"]

<span class="c-cm"># ENTRYPOINT vs CMD:</span>
<span class="c-cm"># ENTRYPOINT: comando fijo (no sobreescribible fácil)</span>
<span class="c-cm"># CMD: default pero sobreescribible: docker run img pytest</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Dockerfile...</p>
</div>`,

'linux-bash': `
<div class="plan-card">
  <div class="plan-card-title">🐧 Linux / Bash — Comandos esenciales</div>
  <div class="plan-block">
    <div class="plan-time">Navegación y archivos</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Shell — Comandos Linux esenciales</div><pre>
<span class="c-cm"># Navegación</span>
ls -la                        <span class="c-cm"># listar con detalles y ocultos</span>
cd /path/to/dir && pwd        <span class="c-cm"># cambiar y mostrar directorio</span>
find /var/log -name "*.log" -mtime -7  <span class="c-cm"># logs de los últimos 7 días</span>

<span class="c-cm"># Archivos</span>
cp -r src/ dest/              <span class="c-cm"># copiar recursivo</span>
mv archivo.py nuevo_nombre.py
rm -rf directorio/            <span class="c-cm"># eliminar recursivo (⚠️ cuidado)</span>
cat archivo.txt               <span class="c-cm"># mostrar contenido</span>
tail -f /var/log/app.log      <span class="c-cm"># seguir log en tiempo real</span>
head -n 100 archivo.log       <span class="c-cm"># primeras 100 líneas</span>

<span class="c-cm"># Búsqueda</span>
grep -r "parse_can" src/      <span class="c-cm"># buscar en directorio</span>
grep -n "ERROR" app.log | tail -20
grep -E "ERROR|WARN" *.log    <span class="c-cm"># regex</span>

<span class="c-cm"># Procesos</span>
ps aux | grep python          <span class="c-cm"># procesos Python</span>
kill -9 PID                   <span class="c-cm"># matar proceso</span>
top / htop                    <span class="c-cm"># monitor de recursos</span>

<span class="c-cm"># Permisos</span>
chmod 755 script.sh           <span class="c-cm"># rwxr-xr-x</span>
chmod +x script.sh            <span class="c-cm"># hacer ejecutable</span>
chown user:group archivo

<span class="c-cm"># Red</span>
ssh user@192.168.1.100        <span class="c-cm"># conectar por SSH</span>
scp archivo.py user@host:/destino/
curl -X GET http://api/status
netstat -tlnp                 <span class="c-cm"># puertos abiertos</span></pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus comandos Linux de referencia...</p>
</div>`,

'linux-nav': `
<div class="plan-card">
  <div class="plan-card-title">🗂️ Navegación del sistema de archivos</div>
  <div class="plan-block">
    <div class="plan-time">Listado y exploración</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>ls</td><td>Lista contenido del directorio</td><td><code>ls -la /etc</code></td><td><code>-l</code> detallado, <code>-a</code> ocultos, <code>-h</code> legible, <code>-R</code> recursivo, <code>-t</code> por tiempo</td><td>ls -lah es el combo estándar</td></tr>
          <tr><td>pwd</td><td>Muestra el directorio actual (Print Working Directory)</td><td><code>pwd</code></td><td><code>-L</code> lógico (con symlinks), <code>-P</code> físico (real)</td><td></td></tr>
          <tr><td>cd</td><td>Cambia de directorio</td><td><code>cd /var/log</code></td><td><code>cd ~</code> home, <code>cd -</code> anterior, <code>cd ..</code> subir uno, <code>cd ../../</code> subir dos</td><td><code>cd -</code> alterna con el dir previo</td></tr>
          <tr><td>tree</td><td>Muestra árbol de directorios visual</td><td><code>tree -L 2 /home</code></td><td><code>-L n</code> profundidad, <code>-a</code> ocultos, <code>-d</code> solo dirs, <code>-I "*.pyc"</code> ignorar patrón</td><td>Puede no estar instalado: <code>apt install tree</code></td></tr>
          <tr><td>pushd / popd</td><td>Navega guardando historial de dirs</td><td><code>pushd /tmp</code></td><td><code>dirs</code> muestra la pila</td><td>Muy útil en scripts</td></tr>
          <tr><td>realpath</td><td>Resuelve la ruta absoluta real</td><td><code>realpath ../config.py</code></td><td></td><td>Resuelve symlinks</td></tr>
          <tr><td>basename</td><td>Extrae el nombre de archivo de una ruta</td><td><code>basename /home/user/app.py</code> → <code>app.py</code></td><td><code>basename file.tar.gz .gz</code> → <code>file.tar</code></td><td></td></tr>
          <tr><td>dirname</td><td>Extrae el directorio de una ruta</td><td><code>dirname /home/user/app.py</code> → <code>/home/user</code></td><td></td><td>Muy usado en scripts</td></tr>
          <tr><td>file</td><td>Detecta el tipo de archivo</td><td><code>file binary_file</code></td><td></td><td>No se basa en la extensión</td></tr>
          <tr><td>stat</td><td>Información detallada de un archivo</td><td><code>stat /etc/passwd</code></td><td></td><td>Muestra inode, permisos, timestamps</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Ejemplos prácticos</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Shell — Navegación avanzada</div><pre>
<span class="c-cm"># Listar archivos ordenados por tamaño descendente</span>
ls -lhS /var/log | head -10

<span class="c-cm"># Listar solo archivos .py modificados hoy</span>
ls -la --time-style=+%F | grep $(date +%F)

<span class="c-cm"># Ver árbol de un proyecto Python (ignorar .git y __pycache__)</span>
tree -I ".git|__pycache__|*.pyc" -L 3

<span class="c-cm"># Navegar con historial</span>
pushd /var/log   <span class="c-cm"># ir a /var/log, guardar ubicación actual</span>
pushd /tmp       <span class="c-cm"># ir a /tmp, guardar /var/log</span>
popd             <span class="c-cm"># volver a /var/log</span>
popd             <span class="c-cm"># volver al dir original</span>

<span class="c-cm"># Ruta del script que se está ejecutando</span>
SCRIPT_DIR=$(dirname "$(realpath "$0")")</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre navegación Linux...</p>
</div>`,

'linux-archivos': `
<div class="plan-card">
  <div class="plan-card-title">📁 Gestión de archivos y directorios</div>
  <div class="plan-block">
    <div class="plan-time">Copiar, mover, eliminar</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>cp</td><td>Copia archivos o directorios</td><td><code>cp -r src/ dest/</code></td><td><code>-r</code> recursivo, <code>-p</code> preservar permisos/timestamps, <code>-u</code> solo si más nuevo, <code>-v</code> verbose</td><td><code>-r</code> es obligatorio para directorios</td></tr>
          <tr><td>mv</td><td>Mueve o renombra archivos</td><td><code>mv old.py new.py</code></td><td><code>-i</code> pedir confirmación, <code>-u</code> solo si más nuevo, <code>-v</code> verbose</td><td>No hay "mover recursivo" — mv ya cubre directorios</td></tr>
          <tr><td>rm</td><td>Elimina archivos o directorios</td><td><code>rm -rf /tmp/test/</code></td><td><code>-r</code> recursivo, <code>-f</code> forzar (sin confirmación), <code>-i</code> interactivo, <code>-v</code> verbose</td><td><code>rm -rf /</code> es destructivo e irreversible</td></tr>
          <tr><td>mkdir</td><td>Crea directorios</td><td><code>mkdir -p /opt/app/logs</code></td><td><code>-p</code> crear padres intermedios sin error, <code>-m 755</code> con permisos</td><td><code>-p</code> evita el error si ya existe</td></tr>
          <tr><td>touch</td><td>Crea archivo vacío o actualiza timestamp</td><td><code>touch app.py config.yaml</code></td><td><code>-t YYYYMMDDhhmm</code> timestamp específico</td><td></td></tr>
          <tr><td>ln</td><td>Crea enlaces (hard o simbólico)</td><td><code>ln -s /opt/app app_link</code></td><td><code>-s</code> simbólico (symlink), sin <code>-s</code> = hard link</td><td>Symlink apunta a ruta; hard link apunta a inode</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Lectura y texto</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>cat</td><td>Muestra o concatena contenido</td><td><code>cat file1.txt file2.txt &gt; merged.txt</code></td><td><code>-n</code> número de líneas, <code>-A</code> muestra caracteres especiales</td><td></td></tr>
          <tr><td>less</td><td>Paginador interactivo (recomendado)</td><td><code>less /var/log/syslog</code></td><td><code>/patrón</code> buscar, <code>n</code> siguiente, <code>q</code> salir, <code>G</code> ir al final</td><td>Más potente que <code>more</code></td></tr>
          <tr><td>head</td><td>Primeras N líneas de un archivo</td><td><code>head -n 50 app.log</code></td><td><code>-n N</code> número de líneas, <code>-c N</code> bytes</td><td></td></tr>
          <tr><td>tail</td><td>Últimas N líneas de un archivo</td><td><code>tail -f /var/log/app.log</code></td><td><code>-n N</code> líneas, <code>-f</code> follow (tiempo real), <code>-F</code> follow con reopen</td><td><code>-f</code> es esencial para debug de logs</td></tr>
          <tr><td>wc</td><td>Cuenta líneas, palabras, bytes</td><td><code>wc -l archivo.txt</code></td><td><code>-l</code> líneas, <code>-w</code> palabras, <code>-c</code> bytes, <code>-m</code> caracteres</td><td></td></tr>
          <tr><td>diff</td><td>Diferencias entre archivos</td><td><code>diff -u orig.py nuevo.py</code></td><td><code>-u</code> unified (formato git), <code>-r</code> recursivo entre dirs</td><td></td></tr>
          <tr><td>tee</td><td>Escribe a archivo Y a stdout simultáneamente</td><td><code>make 2&gt;&amp;1 | tee build.log</code></td><td><code>-a</code> append en lugar de sobrescribir</td><td>Útil para guardar salida de compilación</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Ejemplos de uso</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Shell — Archivos y directorios</div><pre>
<span class="c-cm"># Crear estructura de proyecto completa en un comando</span>
mkdir -p myproject/{src,tests,docs,logs}

<span class="c-cm"># Backup de archivo antes de editar</span>
cp config.yaml config.yaml.bak

<span class="c-cm"># Copiar preservando permisos y timestamps (ideal para deployments)</span>
cp -rp /opt/app_old/ /opt/app_new/

<span class="c-cm"># Ver en tiempo real los últimos errores del sistema</span>
tail -f /var/log/syslog | grep -i error

<span class="c-cm"># Contar líneas de todos los .py del proyecto</span>
find . -name "*.py" | xargs wc -l | sort -n | tail -20

<span class="c-cm"># Crear symlink: /usr/local/bin/python → python3</span>
ln -s /usr/bin/python3 /usr/local/bin/python</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre gestión de archivos...</p>
</div>`,

'linux-busqueda': `
<div class="plan-card">
  <div class="plan-card-title">🔍 Búsqueda y filtrado de archivos y texto</div>
  <div class="plan-block">
    <div class="plan-time">grep — Búsqueda en texto</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>grep</td><td>Busca patrón en archivos</td><td><code>grep -rn "TODO" src/</code></td><td><code>-r</code> recursivo, <code>-n</code> número de línea, <code>-i</code> case-insensitive, <code>-v</code> invertir, <code>-c</code> contar</td><td></td></tr>
          <tr><td>grep -E</td><td>Expresiones regulares extendidas</td><td><code>grep -E "ERROR|WARN" *.log</code></td><td><code>-E</code> regex extendida (egrep)</td><td></td></tr>
          <tr><td>grep -l</td><td>Muestra solo nombres de archivo con matches</td><td><code>grep -rl "import can" src/</code></td><td><code>-l</code> solo archivos, <code>-L</code> archivos SIN coincidencia</td><td></td></tr>
          <tr><td>grep -A/B/C</td><td>Contexto alrededor del match</td><td><code>grep -C 3 "Exception" app.log</code></td><td><code>-A N</code> N líneas después, <code>-B N</code> antes, <code>-C N</code> ambos</td><td>Esencial para debug de logs</td></tr>
          <tr><td>grep -P</td><td>Perl-compatible regex (más potente)</td><td><code>grep -P "\d{4}-\d{2}-\d{2}" log</code></td><td><code>-P</code> Perl regex, <code>-o</code> solo la parte que hace match</td><td></td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">find — Búsqueda de archivos</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>find -name</td><td>Busca por nombre</td><td><code>find /home -name "*.log"</code></td><td><code>-iname</code> case-insensitive</td><td></td></tr>
          <tr><td>find -type</td><td>Filtra por tipo</td><td><code>find . -type f -name "*.py"</code></td><td><code>-type f</code> archivos, <code>-type d</code> directorios, <code>-type l</code> symlinks</td><td></td></tr>
          <tr><td>find -mtime</td><td>Busca por tiempo de modificación</td><td><code>find /var -mtime -7 -name "*.log"</code></td><td><code>-mtime -N</code> últimos N días, <code>+N</code> más de N días, <code>-mmin -60</code> última hora</td><td></td></tr>
          <tr><td>find -size</td><td>Busca por tamaño</td><td><code>find / -size +100M</code></td><td><code>+Nc</code> bytes, <code>+Nk</code> KB, <code>+NM</code> MB</td><td></td></tr>
          <tr><td>find -exec</td><td>Ejecuta comando en cada resultado</td><td><code>find . -name "*.pyc" -exec rm {} \;</code></td><td><code>-exec cmd {} \;</code> uno a uno, <code>-exec cmd {} +</code> en lote (más rápido)</td><td>Mucho más potente que <code>-delete</code></td></tr>
          <tr><td>find -newer</td><td>Más reciente que un archivo</td><td><code>find . -newer config.py</code></td><td></td><td></td></tr>
          <tr><td>locate</td><td>Búsqueda rápida por base de datos</td><td><code>locate "*.conf" | grep nginx</code></td><td><code>-i</code> case-insensitive</td><td>Requiere <code>updatedb</code>; no muestra archivos nuevos</td></tr>
          <tr><td>which / whereis</td><td>Localiza ejecutables</td><td><code>which python3</code></td><td><code>whereis</code> incluye man pages y fuentes</td><td></td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">awk, sed, cut — Procesamiento de texto</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>awk</td><td>Procesamiento de campos/columnas</td><td><code>awk '{print $1, $3}' archivo.txt</code></td><td><code>-F ":"</code> delimitador, <code>NR</code> número de fila, <code>NF</code> número de campos</td><td>Lenguaje completo; muy potente para parsear logs</td></tr>
          <tr><td>awk con condición</td><td>Filtra y transforma</td><td><code>awk -F: '$3 &gt; 1000 {print $1}' /etc/passwd</code></td><td><code>BEGIN{}</code> antes, <code>END{}</code> al final</td><td></td></tr>
          <tr><td>sed</td><td>Editor de flujo (stream editor)</td><td><code>sed 's/foo/bar/g' file.txt</code></td><td><code>-i</code> editar en lugar, <code>-n</code> suprimir salida, <code>d</code> borrar línea, <code>p</code> imprimir</td><td><code>-i</code> modifica el archivo sin backup</td></tr>
          <tr><td>sed con rango</td><td>Actúa en líneas específicas</td><td><code>sed '5,10d' file.txt</code></td><td><code>/patrón/d</code> borrar líneas con patrón</td><td></td></tr>
          <tr><td>cut</td><td>Extrae columnas o caracteres</td><td><code>cut -d: -f1,3 /etc/passwd</code></td><td><code>-d</code> delimitador, <code>-f</code> campos, <code>-c</code> posición de carácter</td><td></td></tr>
          <tr><td>tr</td><td>Traduce o elimina caracteres</td><td><code>echo "HELLO" | tr 'A-Z' 'a-z'</code></td><td><code>-d</code> eliminar chars, <code>-s</code> comprimir repetidos</td><td></td></tr>
        </tbody>
      </table>
      <div class="code-block"><div class="code-lang">Shell — Ejemplos de búsqueda y procesamiento</div><pre>
<span class="c-cm"># Buscar todos los TODO en el código fuente</span>
grep -rn "TODO\|FIXME\|HACK" src/ --include="*.py"

<span class="c-cm"># Encontrar los 10 archivos .log más grandes</span>
find /var/log -name "*.log" -exec du -h {} \; | sort -rh | head -10

<span class="c-cm"># Extraer todas las IPs de un log de nginx</span>
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -20

<span class="c-cm"># Reemplazar todas las ocurrencias de "localhost" por "prod-server" en un .env</span>
sed -i 's/localhost/prod-server/g' .env

<span class="c-cm"># Extraer solo el campo de usuario del /etc/passwd (campo 1)</span>
cut -d: -f1 /etc/passwd

<span class="c-cm"># Eliminar archivos .pyc más antiguos de 30 días</span>
find . -name "*.pyc" -mtime +30 -delete</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre búsqueda y filtrado...</p>
</div>`,

'linux-procesos': `
<div class="plan-card">
  <div class="plan-card-title">⚙️ Procesos, jobs y servicios del sistema</div>
  <div class="plan-block">
    <div class="plan-time">Ver y gestionar procesos</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>ps</td><td>Lista procesos en ejecución</td><td><code>ps aux | grep python</code></td><td><code>aux</code> todos los procesos con usuario/CPU/mem, <code>-ef</code> formato completo, <code>--sort=-%cpu</code> ordenar por CPU</td><td><code>a</code>=todos, <code>u</code>=usuario, <code>x</code>=sin terminal</td></tr>
          <tr><td>top</td><td>Monitor de procesos interactivo</td><td><code>top -u www-data</code></td><td><code>-u user</code> filtrar por usuario, <code>-p PID</code> proceso específico; en interactivo: <code>k</code> kill, <code>q</code> salir, <code>1</code> por CPU</td><td>htop es más visual si está instalado</td></tr>
          <tr><td>htop</td><td>Monitor mejorado e interactivo</td><td><code>htop -u appuser</code></td><td>F5=árbol, F6=sort, F9=kill, F4=filter</td><td>Instalar: <code>apt install htop</code></td></tr>
          <tr><td>pstree</td><td>Árbol de procesos</td><td><code>pstree -p</code></td><td><code>-p</code> muestra PIDs</td><td></td></tr>
          <tr><td>pgrep</td><td>Busca procesos por nombre y retorna PID</td><td><code>pgrep -l python</code></td><td><code>-l</code> con nombre, <code>-u user</code> por usuario</td><td></td></tr>
          <tr><td>lsof</td><td>Lista archivos abiertos por procesos</td><td><code>lsof -i :8080</code></td><td><code>-i :port</code> por puerto, <code>-u user</code> por usuario, <code>-p PID</code> por proceso</td><td>Muy útil para saber qué usa un puerto</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Controlar procesos</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>kill</td><td>Envía señal a un proceso por PID</td><td><code>kill -9 1234</code></td><td><code>-9</code> SIGKILL (forzar), <code>-15</code> SIGTERM (graceful), <code>-HUP</code> reiniciar, <code>-l</code> listar señales</td><td><code>-9</code> no permite cleanup; usar <code>-15</code> primero</td></tr>
          <tr><td>killall</td><td>Mata procesos por nombre</td><td><code>killall -9 python3</code></td><td></td><td>Mata TODOS los procesos con ese nombre</td></tr>
          <tr><td>pkill</td><td>Mata proceso por patrón de nombre</td><td><code>pkill -f "worker.py"</code></td><td><code>-f</code> busca en el comando completo, <code>-u user</code></td><td></td></tr>
          <tr><td>nice</td><td>Lanza proceso con prioridad ajustada</td><td><code>nice -n 10 python script.py</code></td><td>Rango: <code>-20</code> (alta prioridad) a <code>+19</code> (baja). Solo root puede usar valores negativos</td><td></td></tr>
          <tr><td>renice</td><td>Cambia prioridad de proceso en ejecución</td><td><code>renice +5 -p 1234</code></td><td><code>-p PID</code>, <code>-u user</code></td><td></td></tr>
          <tr><td>nohup</td><td>Ejecuta proceso inmune a SIGHUP (cierre de terminal)</td><td><code>nohup python server.py &amp;</code></td><td>Salida va a <code>nohup.out</code> por defecto</td><td>Usar con <code>&amp;</code> para background</td></tr>
          <tr><td>disown</td><td>Desvincula job de la sesión actual</td><td><code>disown %1</code></td><td><code>-h</code> solo inmune a HUP</td><td>Después de <code>&amp;</code> sin nohup</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Jobs y servicios systemd</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>jobs</td><td>Lista jobs en segundo plano de la sesión</td><td><code>jobs -l</code></td><td><code>-l</code> con PIDs</td><td></td></tr>
          <tr><td>bg / fg</td><td>Envía job a background / foreground</td><td><code>bg %1</code> / <code>fg %2</code></td><td><code>%N</code> número de job, <code>%%</code> job actual</td><td><code>Ctrl+Z</code> pausa proceso; <code>bg</code> lo reanuda en fondo</td></tr>
          <tr><td>systemctl</td><td>Gestiona servicios systemd</td><td><code>systemctl status nginx</code></td><td><code>start</code> / <code>stop</code> / <code>restart</code> / <code>reload</code> / <code>enable</code> / <code>disable</code> / <code>status</code></td><td><code>enable</code> = arranca al boot</td></tr>
          <tr><td>journalctl</td><td>Logs del sistema (systemd journal)</td><td><code>journalctl -u nginx -f</code></td><td><code>-u service</code> por servicio, <code>-f</code> follow, <code>-n N</code> últimas N líneas, <code>--since "1 hour ago"</code></td><td></td></tr>
          <tr><td>service</td><td>Gestiona servicios (SysV / compat)</td><td><code>service nginx restart</code></td><td></td><td>Compatibilidad; systemctl es el moderno</td></tr>
        </tbody>
      </table>
      <div class="code-block"><div class="code-lang">Shell — Gestión de procesos en producción</div><pre>
<span class="c-cm"># Ver proceso que usa el puerto 8080</span>
lsof -i :8080
ss -tlnp | grep 8080

<span class="c-cm"># Matar proceso gracefully, luego forzar si no responde</span>
kill -15 $(pgrep -f "worker.py")
sleep 5
kill -9 $(pgrep -f "worker.py") 2>/dev/null

<span class="c-cm"># Correr script en background con logs</span>
nohup python3 long_task.py &gt; output.log 2&gt;&amp;1 &amp;
echo "PID: $!"

<span class="c-cm"># Ver logs de un servicio systemd en tiempo real</span>
journalctl -u myapp.service -f --output=short-iso

<span class="c-cm"># Top 5 procesos que más CPU consumen</span>
ps aux --sort=-%cpu | head -6</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre procesos Linux...</p>
</div>`,

'linux-permisos': `
<div class="plan-card">
  <div class="plan-card-title">🔐 Permisos, usuarios y grupos</div>
  <div class="plan-block">
    <div class="plan-time">Entender los permisos Unix</div>
    <div class="plan-content">
      <h4>Modelo de permisos rwx</h4>
      <p>Cada archivo tiene 3 conjuntos de permisos: <b>owner (u)</b>, <b>group (g)</b>, <b>others (o)</b>.<br>
      Cada conjunto: <b>r</b>=read (4), <b>w</b>=write (2), <b>x</b>=execute (1).</p>
      <table class="kv-table">
        <thead><tr><th>Notación</th><th>Octal</th><th>Significado</th><th>Uso típico</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>rwxr-xr-x</td><td>755</td><td>Owner: rwx | Group: r-x | Others: r-x</td><td>Ejecutables, directorios públicos</td><td></td></tr>
          <tr><td>rw-r--r--</td><td>644</td><td>Owner: rw- | Group: r-- | Others: r--</td><td>Archivos de configuración</td><td></td></tr>
          <tr><td>rw-------</td><td>600</td><td>Solo el owner puede leer/escribir</td><td>Claves SSH, archivos privados</td><td>Obligatorio para <code>~/.ssh/id_rsa</code></td></tr>
          <tr><td>rwxrwxrwx</td><td>777</td><td>Todos tienen todos los permisos</td><td>Evitar en producción</td><td>Riesgo de seguridad</td></tr>
          <tr><td>rwsr-xr-x</td><td>4755</td><td>SUID bit: corre como owner</td><td><code>passwd</code>, <code>sudo</code></td><td>Usar con extremo cuidado</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">chmod, chown, chgrp</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>chmod</td><td>Cambia permisos de archivo</td><td><code>chmod 755 script.sh</code></td><td><code>+x</code> añadir ejecutable, <code>-x</code> quitar, <code>u+rw</code> al owner, <code>o-rwx</code> quitar a otros, <code>-R</code> recursivo</td><td><code>-R</code> afecta dirs Y archivos; usar con cuidado</td></tr>
          <tr><td>chown</td><td>Cambia propietario (y grupo)</td><td><code>chown user:group archivo</code></td><td><code>-R</code> recursivo, <code>user:</code> solo usuario, <code>:group</code> solo grupo</td><td>Requiere privilegios root o sudo</td></tr>
          <tr><td>chgrp</td><td>Cambia grupo de un archivo</td><td><code>chgrp www-data /var/www</code></td><td><code>-R</code> recursivo</td><td></td></tr>
          <tr><td>umask</td><td>Define permisos predeterminados</td><td><code>umask 022</code></td><td>022 = archivos 644, dirs 755; 027 = archivos 640, dirs 750</td><td>Los permisos asignados = 777 - umask</td></tr>
          <tr><td>getfacl / setfacl</td><td>ACLs extendidas (más granular)</td><td><code>setfacl -m u:juan:rx /data</code></td><td><code>-m</code> modificar, <code>-x</code> eliminar, <code>-b</code> limpiar todas</td><td>Requiere filesystem con ACL habilitado</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">sudo, usuarios y grupos</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>sudo</td><td>Ejecuta comando como superusuario</td><td><code>sudo apt install nginx</code></td><td><code>-u user</code> como otro usuario, <code>-i</code> shell root completo, <code>-s</code> shell sin env de root, <code>!!:</code> repetir último como sudo</td><td>Nunca usar <code>sudo -i</code> si no es necesario</td></tr>
          <tr><td>su</td><td>Cambia de usuario</td><td><code>su - www-data</code></td><td><code>-</code> carga el entorno del usuario</td><td></td></tr>
          <tr><td>id</td><td>Muestra UID, GID y grupos del usuario</td><td><code>id username</code></td><td></td><td></td></tr>
          <tr><td>groups</td><td>Lista grupos del usuario actual</td><td><code>groups</code></td><td></td><td></td></tr>
          <tr><td>useradd</td><td>Crea un nuevo usuario</td><td><code>useradd -m -s /bin/bash appuser</code></td><td><code>-m</code> crear home, <code>-s</code> shell, <code>-G</code> grupos adicionales</td><td>Usar <code>adduser</code> en Debian/Ubuntu para versión interactiva</td></tr>
          <tr><td>usermod</td><td>Modifica usuario existente</td><td><code>usermod -aG docker $USER</code></td><td><code>-aG</code> añadir a grupo (sin -a elimina otros grupos)</td><td><code>-a</code> es obligatorio con <code>-G</code></td></tr>
          <tr><td>passwd</td><td>Cambia contraseña</td><td><code>passwd username</code></td><td><code>-l</code> bloquear, <code>-u</code> desbloquear, <code>-e</code> expirar</td><td></td></tr>
          <tr><td>visudo</td><td>Edita el archivo sudoers de forma segura</td><td><code>sudo visudo</code></td><td></td><td>Nunca editar /etc/sudoers directamente</td></tr>
        </tbody>
      </table>
      <div class="code-block"><div class="code-lang">Shell — Permisos y usuarios</div><pre>
<span class="c-cm"># Hacer ejecutable y darle los permisos correctos a un script</span>
chmod +x deploy.sh
chmod 750 deploy.sh    <span class="c-cm"># solo owner y grupo pueden ejecutar</span>

<span class="c-cm"># Dar propiedad de un directorio completo a un usuario</span>
sudo chown -R appuser:appgroup /opt/myapp

<span class="c-cm"># Agregar usuario al grupo docker (requiere logout/login)</span>
sudo usermod -aG docker $USER

<span class="c-cm"># Ver permisos en formato octal</span>
stat -c "%a %n" /etc/passwd   <span class="c-cm"># muestra: 644 /etc/passwd</span>

<span class="c-cm"># Corregir permisos de directorio .ssh</span>
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre permisos Linux...</p>
</div>`,

'linux-red': `
<div class="plan-card">
  <div class="plan-card-title">🌐 Red, SSH y transferencia de archivos</div>
  <div class="plan-block">
    <div class="plan-time">SSH — Secure Shell</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>ssh</td><td>Conexión remota segura</td><td><code>ssh user@192.168.1.100</code></td><td><code>-p port</code> puerto, <code>-i key.pem</code> clave privada, <code>-L 8080:localhost:80</code> local forward, <code>-R</code> reverse forward, <code>-N</code> sin comandos</td><td></td></tr>
          <tr><td>ssh-keygen</td><td>Genera par de claves SSH</td><td><code>ssh-keygen -t ed25519 -C "email"</code></td><td><code>-t</code> tipo (ed25519, rsa), <code>-b</code> bits, <code>-C</code> comentario</td><td>ed25519 es más seguro que RSA</td></tr>
          <tr><td>ssh-copy-id</td><td>Copia clave pública al servidor remoto</td><td><code>ssh-copy-id user@host</code></td><td><code>-i</code> archivo de clave específico</td><td></td></tr>
          <tr><td>scp</td><td>Copia archivos por SSH</td><td><code>scp -r src/ user@host:/dest/</code></td><td><code>-r</code> recursivo, <code>-P port</code> puerto, <code>-i</code> clave, <code>-C</code> comprimir</td><td>No muestra progreso por defecto</td></tr>
          <tr><td>rsync</td><td>Sincronización eficiente (solo diferencias)</td><td><code>rsync -avz src/ user@host:/dest/</code></td><td><code>-a</code> archive (permisos+recursivo), <code>-v</code> verbose, <code>-z</code> comprimir, <code>--delete</code> borrar en dest, <code>--dry-run</code> simular</td><td>Mucho más eficiente que scp para sincronizar</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">curl y wget</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>curl</td><td>Transfiere datos desde/a URLs</td><td><code>curl -X GET http://api/status</code></td><td><code>-X</code> método, <code>-H</code> header, <code>-d</code> body, <code>-o</code> guardar archivo, <code>-L</code> seguir redirects, <code>-s</code> silencioso, <code>-v</code> verbose</td><td></td></tr>
          <tr><td>curl POST JSON</td><td>Envía JSON a una API</td><td><code>curl -X POST -H "Content-Type: application/json" -d '{"key":"val"}' http://api</code></td><td></td><td></td></tr>
          <tr><td>curl -u</td><td>Autenticación básica</td><td><code>curl -u user:pass http://api/data</code></td><td></td><td></td></tr>
          <tr><td>wget</td><td>Descarga archivos de la web</td><td><code>wget -O output.tar.gz https://url</code></td><td><code>-O</code> nombre de salida, <code>-P</code> directorio, <code>-c</code> continuar descarga, <code>-q</code> silencioso, <code>-r</code> recursivo</td><td></td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Diagnóstico de red</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>ping</td><td>Comprueba conectividad</td><td><code>ping -c 4 8.8.8.8</code></td><td><code>-c N</code> N paquetes, <code>-i</code> intervalo</td><td></td></tr>
          <tr><td>traceroute</td><td>Traza la ruta de paquetes</td><td><code>traceroute google.com</code></td><td></td><td></td></tr>
          <tr><td>netstat</td><td>Estadísticas de red y puertos</td><td><code>netstat -tlnp</code></td><td><code>-t</code> TCP, <code>-u</code> UDP, <code>-l</code> escuchando, <code>-n</code> numérico, <code>-p</code> proceso</td><td>Deprecado; preferir <code>ss</code></td></tr>
          <tr><td>ss</td><td>Estadísticas de sockets (moderno)</td><td><code>ss -tlnp | grep 8080</code></td><td><code>-t</code> TCP, <code>-u</code> UDP, <code>-l</code> listen, <code>-n</code> numérico, <code>-p</code> proceso</td><td>Reemplaza a netstat</td></tr>
          <tr><td>ip</td><td>Configuración de red</td><td><code>ip addr show</code></td><td><code>ip addr</code> interfaces, <code>ip route</code> rutas, <code>ip link</code> estado de interfaces</td><td>Reemplaza a ifconfig</td></tr>
          <tr><td>dig / nslookup</td><td>Resolución DNS</td><td><code>dig google.com A</code></td><td><code>+short</code> respuesta breve</td><td></td></tr>
          <tr><td>nc (netcat)</td><td>Swiss army knife de red</td><td><code>nc -zv host 80</code></td><td><code>-z</code> scan sin enviar datos, <code>-v</code> verbose, <code>-l</code> modo server</td><td></td></tr>
        </tbody>
      </table>
      <div class="code-block"><div class="code-lang">Shell — Ejemplos de red y SSH</div><pre>
<span class="c-cm"># Tunnel: acceder a puerto 5432 (PostgreSQL) remoto en local</span>
ssh -L 5432:localhost:5432 user@prod-server -N &amp;

<span class="c-cm"># Sincronizar código con servidor (solo archivos cambiados)</span>
rsync -avz --exclude=".git" --exclude="__pycache__" ./ user@server:/opt/app/

<span class="c-cm"># Test de API REST con curl + formato JSON bonito</span>
curl -s http://localhost:8080/api/v1/status | python3 -m json.tool

<span class="c-cm"># Ver qué proceso escucha en el puerto 443</span>
sudo ss -tlnp | grep :443

<span class="c-cm"># Comprobar si un puerto TCP está abierto sin telnet</span>
nc -zv 192.168.1.100 8080 &amp;&amp; echo "OPEN" || echo "CLOSED"

<span class="c-cm"># Copiar clave pública en un paso</span>
cat ~/.ssh/id_ed25519.pub | ssh user@host "mkdir -p ~/.ssh &amp;&amp; cat >> ~/.ssh/authorized_keys"</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre red y SSH...</p>
</div>`,

'linux-pipes': `
<div class="plan-card">
  <div class="plan-card-title">🔗 Pipes, redirección y procesamiento de texto</div>
  <div class="plan-block">
    <div class="plan-time">Redirección de entrada/salida</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Operador</th><th>Descripción</th><th>Ejemplo</th><th>Detalle</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>&gt;</td><td>Redirige stdout a archivo (sobrescribe)</td><td><code>echo "hola" &gt; archivo.txt</code></td><td>File descriptor 1 (stdout)</td><td>Sobrescribe el archivo si existe</td></tr>
          <tr><td>&gt;&gt;</td><td>Redirige stdout a archivo (append)</td><td><code>echo "log" &gt;&gt; app.log</code></td><td>Añade al final sin sobrescribir</td><td></td></tr>
          <tr><td>&lt;</td><td>Redirige stdin desde archivo</td><td><code>python3 script.py &lt; input.txt</code></td><td>File descriptor 0 (stdin)</td><td></td></tr>
          <tr><td>2&gt;</td><td>Redirige stderr a archivo</td><td><code>comando 2&gt; errores.log</code></td><td>File descriptor 2 (stderr)</td><td></td></tr>
          <tr><td>2&gt;&amp;1</td><td>Redirige stderr a stdout</td><td><code>make 2&gt;&amp;1 | tee build.log</code></td><td>Unifica stdout y stderr</td><td>El orden importa: <code>cmd &gt; f 2&gt;&amp;1</code></td></tr>
          <tr><td>&amp;&gt;</td><td>Redirige stdout Y stderr juntos</td><td><code>cmd &amp;&gt; output.log</code></td><td>Equivalente a <code>cmd &gt; f 2&gt;&amp;1</code></td><td>Bash-specific</td></tr>
          <tr><td>|</td><td>Pipe: stdout de cmd1 → stdin de cmd2</td><td><code>ps aux | grep python | wc -l</code></td><td>Conecta comandos en cadena</td><td></td></tr>
          <tr><td>tee</td><td>Copia stdin a stdout Y a archivo</td><td><code>make 2&gt;&amp;1 | tee build.log</code></td><td><code>-a</code> append</td><td>Ver salida y guardar simultáneamente</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">xargs — pasar argumentos desde stdin</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>xargs</td><td>Construye y ejecuta comandos desde stdin</td><td><code>find . -name "*.log" | xargs rm</code></td><td><code>-I {}</code> placeholder, <code>-n N</code> N args por llamada, <code>-P N</code> N procesos paralelos, <code>-0</code> null separador</td><td>Usar <code>-0</code> con <code>find -print0</code> para nombres con espacios</td></tr>
          <tr><td>xargs con {}</td><td>Controla dónde va el argumento</td><td><code>find . -name "*.py" | xargs -I {} cp {} /backup/</code></td><td></td><td></td></tr>
          <tr><td>xargs paralelo</td><td>Ejecuta en paralelo</td><td><code>cat urls.txt | xargs -P 4 -I {} curl -O {}</code></td><td></td><td>Útil para operaciones batch</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">sort, uniq, head, tail, cut — Procesamiento de texto</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>sort</td><td>Ordena líneas</td><td><code>sort -k2 -n -r datos.txt</code></td><td><code>-n</code> numérico, <code>-r</code> reverso, <code>-k N</code> por columna N, <code>-u</code> único, <code>-h</code> human-readable sizes</td><td></td></tr>
          <tr><td>uniq</td><td>Elimina líneas duplicadas contiguas</td><td><code>sort archivo.txt | uniq -c</code></td><td><code>-c</code> contar ocurrencias, <code>-d</code> solo duplicadas, <code>-u</code> solo únicas</td><td>Requiere <code>sort</code> previo para duplicados no contiguos</td></tr>
          <tr><td>head</td><td>Primeras N líneas</td><td><code>head -20 archivo.log</code></td><td><code>-n N</code> líneas, <code>-c N</code> bytes</td><td></td></tr>
          <tr><td>tail</td><td>Últimas N líneas</td><td><code>tail -f /var/log/syslog</code></td><td><code>-n N</code>, <code>-f</code> follow, <code>-F</code> follow con reopen</td><td></td></tr>
          <tr><td>cut</td><td>Extrae columnas de texto delimitado</td><td><code>cut -d, -f2,4 data.csv</code></td><td><code>-d</code> delimitador, <code>-f</code> campos, <code>-c</code> caracteres</td><td></td></tr>
          <tr><td>paste</td><td>Combina líneas de archivos</td><td><code>paste file1.txt file2.txt</code></td><td><code>-d ","</code> delimitador</td><td></td></tr>
          <tr><td>column</td><td>Alinea datos en columnas</td><td><code>cat data.csv | column -t -s,</code></td><td><code>-t</code> tabla, <code>-s</code> separador</td><td>Hace los CSV legibles en terminal</td></tr>
        </tbody>
      </table>
      <div class="code-block"><div class="code-lang">Shell — Pipelines avanzados</div><pre>
<span class="c-cm"># Top 10 IPs con más errores 500 en nginx</span>
grep " 500 " /var/log/nginx/access.log \
  | awk '{print $1}' \
  | sort | uniq -c | sort -rn \
  | head -10

<span class="c-cm"># Contar líneas de código Python (excluyendo comentarios y blank lines)</span>
find . -name "*.py" -exec cat {} \; \
  | grep -v "^#" | grep -v "^$" \
  | wc -l

<span class="c-cm"># Buscar y eliminar archivos temporales en paralelo</span>
find /tmp -name "tmp_*" -mtime +1 -print0 \
  | xargs -0 -P 4 rm -f

<span class="c-cm"># Extraer emails únicos de un log</span>
grep -oE "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" app.log \
  | sort -u

<span class="c-cm"># Guardar stdout en archivo Y ver en terminal simultáneamente</span>
python3 test_suite.py 2&gt;&amp;1 | tee test_results.log</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre pipes y redirección...</p>
</div>`,

'linux-bash-script': `
<div class="plan-card">
  <div class="plan-card-title">📜 Bash scripting — Fundamentos completos</div>
  <div class="plan-block">
    <div class="plan-time">Variables y parámetros especiales</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Variable</th><th>Descripción</th><th>Ejemplo</th><th>Detalle</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>$VAR</td><td>Valor de variable</td><td><code>NAME="world"; echo "Hello $NAME"</code></td><td>Siempre usar comillas: <code>"$VAR"</code></td><td>Sin espacios alrededor del <code>=</code></td></tr>
          <tr><td>$0</td><td>Nombre del script</td><td><code>echo "Script: $0"</code></td><td></td><td></td></tr>
          <tr><td>$1 .. $9 / \${10}</td><td>Argumentos posicionales</td><td><code>./deploy.sh prod 8080</code> → <code>$1=prod</code></td><td></td><td>Usar <code>\${10}</code> para más de 9</td></tr>
          <tr><td>$#</td><td>Número de argumentos</td><td><code>echo "Args: $#"</code></td><td></td><td></td></tr>
          <tr><td>$@</td><td>Todos los argumentos (como lista)</td><td><code>for arg in "$@"; do echo $arg; done</code></td><td>Preserva espacios por argumento</td><td>Preferir <code>"$@"</code> sobre <code>$*</code></td></tr>
          <tr><td>$?</td><td>Exit code del último comando</td><td><code>grep pattern file; echo "Exit: $?"</code></td><td>0=éxito, ≠0=error</td><td></td></tr>
          <tr><td>$$</td><td>PID del script actual</td><td><code>echo "PID: $$"</code></td><td>Para crear archivos temporales únicos</td><td></td></tr>
          <tr><td>$!</td><td>PID del último proceso en background</td><td><code>cmd &amp;; echo "PID: $!"</code></td><td></td><td></td></tr>
          <tr><td>\${VAR:-default}</td><td>Valor por defecto si vacío</td><td><code>ENV=\${1:-"dev"}</code></td><td><code>:=</code> asigna; <code>:?</code> error si vacío</td><td></td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Control de flujo</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Bash — if, for, while, case, funciones</div><pre>
<span class="c-cm">#!/bin/bash</span>
<span class="c-kw">set</span> -euo pipefail   <span class="c-cm"># -e=salir en error, -u=error en var no definida, -o pipefail</span>

<span class="c-cm"># ─── IF / ELSE ─────────────────────────────────────────────────</span>
<span class="c-kw">if</span> [[ "$ENV" == "prod" ]]; <span class="c-kw">then</span>
    echo "Producción"
<span class="c-kw">elif</span> [[ "$ENV" == "staging" ]]; <span class="c-kw">then</span>
    echo "Staging"
<span class="c-kw">else</span>
    echo "Desarrollo"
<span class="c-kw">fi</span>

<span class="c-cm"># Pruebas de archivo</span>
[[ -f "config.yaml" ]] &amp;&amp; echo "Archivo existe"
[[ -d "/opt/app" ]]    || mkdir -p /opt/app
[[ -z "$VAR" ]]        &amp;&amp; echo "Variable vacía"
[[ -n "$VAR" ]]        &amp;&amp; echo "Variable tiene valor"

<span class="c-cm"># ─── FOR ───────────────────────────────────────────────────────</span>
<span class="c-kw">for</span> i <span class="c-kw">in</span> {1..5}; <span class="c-kw">do</span>
    echo "Item $i"
<span class="c-kw">done</span>

<span class="c-kw">for</span> file <span class="c-kw">in</span> *.log; <span class="c-kw">do</span>
    echo "Procesando: $file"
    gzip "$file"
<span class="c-kw">done</span>

<span class="c-cm"># ─── WHILE ─────────────────────────────────────────────────────</span>
count=0
<span class="c-kw">while</span> [[ $count -lt 5 ]]; <span class="c-kw">do</span>
    echo "Count: $count"
    ((count++))
<span class="c-kw">done</span>

<span class="c-cm"># Leer archivo línea a línea</span>
<span class="c-kw">while</span> IFS= <span class="c-kw">read</span> -r line; <span class="c-kw">do</span>
    echo "Línea: $line"
<span class="c-kw">done</span> &lt; input.txt

<span class="c-cm"># ─── CASE ──────────────────────────────────────────────────────</span>
<span class="c-kw">case</span> "$1" <span class="c-kw">in</span>
    start)  systemctl start myapp ;;
    stop)   systemctl stop myapp ;;
    status) systemctl status myapp ;;
    *)      echo "Uso: $0 {start|stop|status}"; exit 1 ;;
<span class="c-kw">esac</span>

<span class="c-cm"># ─── FUNCIONES ─────────────────────────────────────────────────</span>
<span class="c-fn">log_info</span>() {
    echo "[$(date +%Y-%m-%dT%H:%M:%S)] INFO: $*"
}

<span class="c-fn">check_dependencies</span>() {
    <span class="c-kw">local</span> deps=("python3" "git" "curl")
    <span class="c-kw">for</span> dep <span class="c-kw">in</span> "\${deps[@]}"; <span class="c-kw">do</span>
        <span class="c-kw">if</span> ! command -v "$dep" &amp;&gt;/dev/null; <span class="c-kw">then</span>
            echo "ERROR: $dep no está instalado"
            exit 1
        <span class="c-kw">fi</span>
    <span class="c-kw">done</span>
}

<span class="c-cm"># ─── ARRAYS ────────────────────────────────────────────────────</span>
servers=("web01" "web02" "db01")
echo "Total: \${#servers[@]}"          <span class="c-cm"># longitud</span>
echo "Primero: \${servers[0]}"         <span class="c-cm"># elemento</span>
<span class="c-kw">for</span> s <span class="c-kw">in</span> "\${servers[@]}"; <span class="c-kw">do</span>
    echo "Server: $s"
<span class="c-kw">done</span>

<span class="c-cm"># ─── SUBSTITUCIÓN DE COMANDOS ──────────────────────────────────</span>
current_date=$(date +%Y-%m-%d)
file_count=$(find . -name "*.py" | wc -l)
echo "Fecha: $current_date — $file_count archivos Python"</pre></div>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Best practices y tabla de tests</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Test / Operador</th><th>Descripción</th><th>Ejemplo</th><th>Tipo</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>-f / -d / -e</td><td>Es archivo / es directorio / existe</td><td><code>[[ -f "file.txt" ]]</code></td><td>Archivo</td><td></td></tr>
          <tr><td>-r / -w / -x</td><td>Tiene permiso lectura / escritura / ejecución</td><td><code>[[ -x "/usr/bin/python3" ]]</code></td><td>Archivo</td><td></td></tr>
          <tr><td>-z / -n</td><td>String vacío / no vacío</td><td><code>[[ -z "$VAR" ]]</code></td><td>String</td><td></td></tr>
          <tr><td>== / !=</td><td>Igualdad / desigualdad de strings</td><td><code>[[ "$a" == "$b" ]]</code></td><td>String</td><td></td></tr>
          <tr><td>-eq / -ne / -lt / -gt</td><td>Igualdad y comparación numérica</td><td><code>[[ $n -gt 5 ]]</code></td><td>Numérico</td><td>Solo para enteros</td></tr>
          <tr><td>&amp;&amp; / ||</td><td>AND / OR lógico</td><td><code>cmd1 &amp;&amp; cmd2</code></td><td>Control</td><td></td></tr>
          <tr><td>set -e</td><td>Exit en cualquier error</td><td><code>set -euo pipefail</code></td><td>Seguridad</td><td>Siempre al inicio de scripts de producción</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre Bash scripting...</p>
</div>`,

'linux-monitoreo': `
<div class="plan-card">
  <div class="plan-card-title">📊 Monitoreo del sistema y gestión de logs</div>
  <div class="plan-block">
    <div class="plan-time">Recursos del sistema</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>df</td><td>Espacio en disco por filesystem</td><td><code>df -h</code></td><td><code>-h</code> human-readable, <code>-T</code> tipo de filesystem, <code>-i</code> inodos</td><td>Revisar <code>Use%</code>; si llega a 100% el sistema falla</td></tr>
          <tr><td>du</td><td>Uso de disco por directorio/archivo</td><td><code>du -sh /var/*</code></td><td><code>-s</code> total del directorio, <code>-h</code> legible, <code>-a</code> también archivos, <code>--max-depth=N</code></td><td></td></tr>
          <tr><td>free</td><td>Memoria RAM y swap disponible</td><td><code>free -m</code></td><td><code>-m</code> MB, <code>-g</code> GB, <code>-h</code> auto, <code>-s N</code> actualizar cada N seg</td><td><code>available</code> es la métrica real de RAM libre</td></tr>
          <tr><td>vmstat</td><td>Estadísticas de VM (CPU, memoria, IO)</td><td><code>vmstat 2 5</code></td><td><code>vmstat N M</code> cada N segs, M veces</td><td><code>si/so</code> = swap in/out; si &gt;0 hay problema</td></tr>
          <tr><td>iostat</td><td>Estadísticas de IO de discos</td><td><code>iostat -x 2</code></td><td><code>-x</code> extendido, <code>-d</code> solo discos</td><td>Instalar: <code>apt install sysstat</code></td></tr>
          <tr><td>uptime</td><td>Tiempo encendido y carga promedio</td><td><code>uptime</code></td><td></td><td>Load avg 1/5/15 min; ideal &lt;= núcleos CPU</td></tr>
          <tr><td>lscpu</td><td>Información de la CPU</td><td><code>lscpu</code></td><td></td><td>Ver núcleos, sockets, hilos</td></tr>
          <tr><td>uname</td><td>Información del kernel y SO</td><td><code>uname -a</code></td><td><code>-r</code> versión kernel, <code>-m</code> arquitectura</td><td></td></tr>
          <tr><td>watch</td><td>Ejecuta comando repetidamente</td><td><code>watch -n 2 "df -h"</code></td><td><code>-n N</code> intervalo en segundos, <code>-d</code> resaltar diferencias</td><td></td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">Logs del sistema</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>journalctl</td><td>Logs del journal systemd</td><td><code>journalctl -u nginx -f</code></td><td><code>-u service</code> por servicio, <code>-f</code> follow, <code>-n N</code> últimas N líneas, <code>--since "2h ago"</code>, <code>-p err</code> solo errores, <code>-b</code> desde el último boot</td><td>Sistema moderno; reemplaza /var/log/syslog</td></tr>
          <tr><td>dmesg</td><td>Mensajes del kernel (ring buffer)</td><td><code>dmesg | tail -50</code></td><td><code>-T</code> timestamps legibles, <code>-l err,warn</code> filtrar nivel, <code>-w</code> watch</td><td>Ver errores de hardware, driver, boot</td></tr>
          <tr><td>tail -f</td><td>Sigue un log en tiempo real</td><td><code>tail -f /var/log/app.log</code></td><td><code>-F</code> reopen si el archivo se rota</td><td></td></tr>
          <tr><td>logrotate</td><td>Rotación y compresión automática de logs</td><td><code>logrotate -f /etc/logrotate.conf</code></td><td><code>-f</code> forzar rotación</td><td>Configurar en <code>/etc/logrotate.d/</code></td></tr>
        </tbody>
      </table>
      <div class="code-block"><div class="code-lang">Shell — Diagnóstico de sistema</div><pre>
<span class="c-cm"># Script de diagnóstico rápido del sistema</span>
echo "=== CARGA ==="
uptime

echo "=== MEMORIA ==="
free -h

echo "=== DISCO ==="
df -h | grep -v tmpfs

echo "=== TOP 5 PROCESOS POR MEMORIA ==="
ps aux --sort=-%mem | head -6 | awk '{printf "%-20s %5s%% %5s%%\n", $11, $3, $4}'

echo "=== ERRORES RECIENTES (kernel) ==="
dmesg -T -l err,warn | tail -10

echo "=== CONEXIONES ACTIVAS ==="
ss -s

<span class="c-cm"># Encontrar qué directorio consume más espacio</span>
du -h --max-depth=2 / 2>/dev/null | sort -rh | head -15

<span class="c-cm"># Monitor en vivo cada 3 segundos</span>
watch -n 3 -d "free -h &amp;&amp; echo '---' &amp;&amp; df -h | grep /dev/sda"

<span class="c-cm"># Logs de error del último servicio que falló</span>
journalctl -u myapp.service -n 100 -p err --no-pager</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre monitoreo Linux...</p>
</div>`,

'linux-paquetes': `
<div class="plan-card">
  <div class="plan-card-title">📦 Gestión de paquetes en Linux</div>
  <div class="plan-block">
    <div class="plan-time">apt / apt-get — Debian & Ubuntu</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>apt update</td><td>Actualiza la lista de paquetes disponibles</td><td><code>sudo apt update</code></td><td></td><td>Siempre ejecutar antes de instalar</td></tr>
          <tr><td>apt upgrade</td><td>Actualiza todos los paquetes instalados</td><td><code>sudo apt upgrade -y</code></td><td><code>-y</code> no preguntar, <code>full-upgrade</code> puede eliminar paquetes conflictivos</td><td><code>dist-upgrade</code> es más agresivo</td></tr>
          <tr><td>apt install</td><td>Instala uno o más paquetes</td><td><code>sudo apt install nginx python3-pip</code></td><td><code>-y</code> sin confirmación, <code>--no-install-recommends</code> solo lo necesario</td><td></td></tr>
          <tr><td>apt remove</td><td>Elimina paquete (mantiene config)</td><td><code>sudo apt remove nginx</code></td><td></td><td></td></tr>
          <tr><td>apt purge</td><td>Elimina paquete Y archivos de configuración</td><td><code>sudo apt purge nginx</code></td><td></td><td>Elimina configs; irreversible</td></tr>
          <tr><td>apt autoremove</td><td>Elimina dependencias huérfanas</td><td><code>sudo apt autoremove</code></td><td></td><td>Ejecutar periódicamente</td></tr>
          <tr><td>apt search</td><td>Busca paquetes por nombre o descripción</td><td><code>apt search "python can"</code></td><td></td><td></td></tr>
          <tr><td>apt show</td><td>Información de un paquete</td><td><code>apt show python3-pip</code></td><td></td><td></td></tr>
          <tr><td>apt list</td><td>Lista paquetes instalados/disponibles</td><td><code>apt list --installed | grep python</code></td><td><code>--installed</code>, <code>--upgradable</code></td><td></td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">dpkg, snap y otros gestores</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>dpkg -i</td><td>Instala paquete .deb local</td><td><code>sudo dpkg -i package.deb</code></td><td></td><td>Después usar <code>apt install -f</code> para corregir dependencias</td></tr>
          <tr><td>dpkg -l</td><td>Lista paquetes instalados</td><td><code>dpkg -l | grep "^ii" | grep python</code></td><td><code>-l pattern</code> filtrar</td><td></td></tr>
          <tr><td>dpkg -r</td><td>Elimina paquete .deb</td><td><code>sudo dpkg -r paquete</code></td><td></td><td></td></tr>
          <tr><td>snap install</td><td>Instala paquete snap (sandboxed)</td><td><code>sudo snap install code --classic</code></td><td><code>--classic</code> sin sandbox (para IDEs), <code>--channel</code> versión</td><td>Inicia más lento; mayor aislamiento</td></tr>
          <tr><td>snap list</td><td>Lista snaps instalados</td><td><code>snap list</code></td><td></td><td></td></tr>
          <tr><td>snap refresh</td><td>Actualiza snaps</td><td><code>sudo snap refresh code</code></td><td></td><td></td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="plan-block">
    <div class="plan-time">pip — Paquetes Python</div>
    <div class="plan-content">
      <table class="kv-table">
        <thead><tr><th>Comando</th><th>Descripción</th><th>Ejemplo</th><th>Opciones clave</th><th>⚠️ Aviso</th></tr></thead>
        <tbody>
          <tr><td>pip install</td><td>Instala paquete Python</td><td><code>pip install requests==2.31.0</code></td><td><code>--upgrade</code> actualizar, <code>--user</code> sin sudo, <code>-e .</code> editable (dev)</td><td>Usar siempre en virtualenv</td></tr>
          <tr><td>pip install -r</td><td>Instala desde requirements.txt</td><td><code>pip install -r requirements.txt</code></td><td></td><td></td></tr>
          <tr><td>pip freeze</td><td>Lista paquetes instalados con versiones</td><td><code>pip freeze &gt; requirements.txt</code></td><td></td><td></td></tr>
          <tr><td>pip list</td><td>Lista paquetes instalados</td><td><code>pip list --outdated</code></td><td><code>--outdated</code> los que tienen update</td><td></td></tr>
          <tr><td>pip show</td><td>Información de un paquete</td><td><code>pip show numpy</code></td><td></td><td></td></tr>
          <tr><td>pip uninstall</td><td>Desinstala paquete</td><td><code>pip uninstall requests -y</code></td><td></td><td></td></tr>
          <tr><td>python -m venv</td><td>Crea entorno virtual</td><td><code>python3 -m venv .venv</code></td><td></td><td>Siempre usar: <code>source .venv/bin/activate</code></td></tr>
        </tbody>
      </table>
      <div class="code-block"><div class="code-lang">Shell — Flujo completo de setup en Linux</div><pre>
<span class="c-cm"># 1. Actualizar sistema</span>
sudo apt update &amp;&amp; sudo apt upgrade -y

<span class="c-cm"># 2. Instalar dependencias del sistema</span>
sudo apt install -y python3 python3-pip python3-venv git curl build-essential

<span class="c-cm"># 3. Crear entorno virtual Python</span>
python3 -m venv .venv
source .venv/bin/activate

<span class="c-cm"># 4. Instalar dependencias Python</span>
pip install --upgrade pip
pip install -r requirements.txt

<span class="c-cm"># 5. Verificar instalación</span>
python3 -c "import sys; print(sys.version)"
pip list | grep -E "can|serial|pytest"

<span class="c-cm"># Inspeccionar qué paquete instaló un binario</span>
dpkg -S $(which python3)

<span class="c-cm"># Agregar repositorio PPA externo</span>
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.12</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre gestión de paquetes...</p>
</div>`,

'py-logging': `
<div class="plan-card">
  <div class="plan-card-title">📝 Python Logging</div>
  <div class="plan-block">
    <div class="plan-time">Configuración de logging</div>
    <div class="plan-content">
      <div class="code-block"><div class="code-lang">Python — Logging completo</div><pre>
<span class="c-kw">import</span> logging, json
<span class="c-kw">from</span> logging.handlers <span class="c-kw">import</span> RotatingFileHandler

<span class="c-cm"># Niveles: DEBUG < INFO < WARNING < ERROR < CRITICAL</span>

<span class="c-cm"># Configuración básica</span>
logging.basicConfig(
    level=logging.INFO,
    format=<span class="c-st">"%(asctime)s %(name)s %(levelname)s %(message)s"</span>,
    handlers=[
        logging.StreamHandler(),                       <span class="c-cm"># consola</span>
        RotatingFileHandler(<span class="c-st">"app.log"</span>, maxBytes=<span class="c-nb">10_000_000</span>, backupCount=<span class="c-nb">3</span>)
    ]
)

<span class="c-cm"># Logger por módulo (mejor práctica)</span>
logger = logging.getLogger(__name__)

<span class="c-kw">def</span> <span class="c-fn">procesar_datos</span>(frame):
    logger.debug(<span class="c-kw">f</span><span class="c-st">f"Frame recibido: {frame}"</span>)          <span class="c-cm"># solo en debug</span>
    <span class="c-kw">try</span>:
        resultado = parse(frame)
        logger.info(<span class="c-kw">f</span><span class="c-st">f"Procesado: {resultado}"</span>)
        <span class="c-kw">return</span> resultado
    <span class="c-kw">except</span> ValueError <span class="c-kw">as</span> e:
        logger.error(<span class="c-kw">f</span><span class="c-st">f"Error parsing frame: {e}"</span>, exc_info=<span class="c-kw">True</span>)

<span class="c-cm"># JSON logging (para CI/log aggregators)</span>
<span class="c-kw">class</span> <span class="c-fn">JSONFormatter</span>(logging.Formatter):
    <span class="c-kw">def</span> <span class="c-fn">format</span>(<span class="c-bi">self</span>, record):
        <span class="c-kw">return</span> json.dumps({
            <span class="c-st">"time"</span>: <span class="c-bi">self</span>.formatTime(record),
            <span class="c-st">"level"</span>: record.levelname,
            <span class="c-st">"msg"</span>: record.getMessage()
        })</pre></div>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre logging en Python...</p>
</div>`,

'triage-ci': `
<div class="plan-card">
  <div class="plan-card-title">🔍 Triage de fallos en CI/CD</div>
  <div class="plan-block">
    <div class="plan-time">Metodología</div>
    <div class="plan-content">
      <h4>Reproduce → Aisla → Root cause → Documenta</h4>
      <p><b>Paso 1 — Clasificar el fallo:</b><br>
      • <b>Determinista:</b> Falla siempre con el mismo código. → Es un bug real en el código o en el test.<br>
      • <b>Flaky (intermitente):</b> A veces pasa, a veces falla. → Es infra, race condition, o dependencia externa.<br><br>
      <b>Paso 2 — Señales de infra/tooling (no código):</b><br>
      • Falla solo en un runner específico.<br>
      • Error de timeout o conexión (no assertion error).<br>
      • Falla en el step de setup, no en el test real.<br>
      • Retry automático resuelve el problema.<br>
      • No se reproduce localmente.<br><br>
      <b>Paso 3 — Root cause:</b><br>
      • Lee los logs completos del step fallido.<br>
      • Compara con el último run exitoso: ¿qué cambió?<br>
      • Busca el exit code: 1=assertion, 124=timeout, 137=OOM.<br><br>
      <b>Paso 4 — Documenta y automatiza:</b><br>
      • Escribe un runbook: "Si ves X error, haz Y".<br>
      • Agrega retry automático para fallos de infra conocidos.<br>
      • Crea un dashboard de flakiness (% de fallos no deterministas).</p>
    </div>
  </div>
</div>
<div class="notes-card" style="margin-top:16px">
  <div class="notes-card-label">Mis notas</div>
  <p class="notes-placeholder">Agrega aquí tus notas sobre triage en CI...</p>
</div>`,

};  // fin DEVOPS_RICH
