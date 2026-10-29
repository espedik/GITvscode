#!/usr/bin/env python
"""Las fotos de Habilidades Base: buscar candidatas, verlas en una hoja de contacto y bajar las elegidas con su crédito.

  python hb-fotos.py buscar <ficha> <consultas.json>   candidatas de Wikimedia Commons y de Openverse (StockSnap, Rawpixel,
                                                        Nappy: CC0) y sus hojas de contacto, en la carpeta temporal
  python hb-fotos.py bajar  <ficha> <elegidas.json>    cada elegida, a 1024 px de ancho, en Dashboard/fotos-base/
                                                        <ficha>-<paso>.jpg; imprime los créditos (autor · fuente · licencia)

consultas.json: [{"k": 0, "t": "título corto", "q": ["consulta de Commons", "ov:stock CC0 de Openverse", "fl:Flickr vía Openverse"]}, …]
                (k = índice del paso)
elegidas.json:  {"0": 3, "1": 5, "2": "otra:4", …}  (el número que la hoja pinta sobre cada candidata de ese paso;
                «otra:4» la toma de una segunda búsqueda guardada como «otra»; «otra:5:4», de su fila 5)

Las búsquedas se guardan en caché (Openverse permite 200 al día sin cuenta y tarda ~40 s cada una). La carpeta temporal es
$HB_FOTOS_TMP o <temp>/hb-fotos; nada de eso va al repo.
"""
import io, json, os, re, sys, tempfile, time, urllib.parse
from concurrent.futures import ThreadPoolExecutor
from threading import Semaphore
import requests
import socket, urllib3.util.connection as _conexion
# Solo IPv4: en esta red cada conexión por IPv6 se queda 21 s esperando antes de caer a IPv4.
_conexion.allowed_gai_family = lambda: socket.AF_INET
from PIL import Image, ImageDraw, ImageFont, ImageOps

AQUI = os.path.dirname(os.path.abspath(__file__))
DESTINO = os.path.join(AQUI, 'fotos-base')
TMP = os.environ.get('HB_FOTOS_TMP') or os.path.join(tempfile.gettempdir(), 'hb-fotos')
UA = {'User-Agent': 'ClaudeProyecto-HabilidadesBase/1.0 (https://github.com/espedik/GITvscode; dashboard personal, uso no comercial)'}
COMMONS = 'https://commons.wikimedia.org/w/api.php'
OV = 'https://api.openverse.org/v1/images/'
NO_FOTO = re.compile(r'clipart|clip art|illustration|vector|png|psd|mockup|template|drawing|sticker|icon|logo|pattern|collage|cartoon|diagram|infographic', re.I)
os.makedirs(TMP, exist_ok=True)
OV_TURNO = Semaphore(2)   # Openverse sin cuenta: 20 por minuto
C_TURNO = Semaphore(2)    # Commons: de dos en dos

def cache(nombre, fn):
    p = os.path.join(TMP, 'cache-' + re.sub(r'[^a-z0-9]+', '-', nombre.lower())[:90] + '.json')
    if os.path.exists(p): return json.load(open(p, encoding='utf-8'))
    r = fn()
    if r: json.dump(r, open(p, 'w', encoding='utf-8'), ensure_ascii=False)   # una búsqueda vacía o fallida se repite la próxima vez
    return r

def limpio(html):
    # el autor como lo da la fuente, sin la basura de Commons: «No machine-readable author provided. X assumed…»,
    # «X - Wikimedia Commons - © CC BY-SA», «Anonymous (Japan)Unknown author»
    t = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', html or '')).strip()
    m = re.search(r'No machine-readable author provided\.\s*(\S+) assumed', t)
    if m: t = m.group(1)
    t = re.split(r'\s+-\s+Wikimedia Commons|\s+\(Chữ|\s*\(talk\)|\s+-\s+\S+@\S+|\s*\S+@\S+', t)[0].strip()   # sin correos
    if not t or re.search(r'unknown author|anonymous|desconocido', t, re.I): return 'Autor desconocido'
    return t[:60].strip()

def commons(q, n=14):
    def pide():
        pages = []
        for intento in range(4):   # Commons limita a quien pide muy seguido: se espera y se reintenta
            try:
                with C_TURNO:
                    r = requests.get(COMMONS, params={'action': 'query', 'format': 'json', 'generator': 'search', 'gsrnamespace': 6,
                        'gsrsearch': q + ' filetype:bitmap', 'gsrlimit': 40, 'prop': 'imageinfo', 'iiprop': 'url|size|extmetadata|mime',
                        'iiurlwidth': 330, 'iiextmetadatafilter': 'Artist|LicenseShortName'}, headers=UA, timeout=40)
                pages = sorted((r.json().get('query') or {}).get('pages', {}).values(), key=lambda p: p.get('index', 99)); break
            except Exception:
                time.sleep(8 * (intento + 1))
        out = []
        for p in pages:
            ii = (p.get('imageinfo') or [{}])[0]; m = ii.get('extmetadata') or {}
            w, h = ii.get('width', 0), ii.get('height', 0)
            if ii.get('mime') not in ('image/jpeg', 'image/png') or w < 1000 or not h or not (0.62 <= w / h <= 2.1): continue
            out.append({'src': 'c', 'titulo': p['title'], 'thumb': ii.get('thumburl'), 'pagina': ii.get('descriptionurl'), 'w': w, 'h': h,
                        'autor': limpio((m.get('Artist') or {}).get('value')), 'lic': (m.get('LicenseShortName') or {}).get('value', ''),
                        'fuente': 'Wikimedia Commons'})
        return out
    return cache('c-' + q, pide)[:n]

def openverse(q, n=12, fuentes='stocksnap,rawpixel,nappy'):
    def pide():
        res = []
        for intento in range(4):
            try:
                with OV_TURNO:
                    r = requests.get(OV, params={'q': q, 'page_size': 20, 'source': fuentes}, headers=UA, timeout=120)   # sin cuenta, 20 como máximo
                if r.status_code == 429: time.sleep(30); continue
                res = r.json().get('results', []); break
            except Exception:
                time.sleep(5)
        out = []
        for x in res:
            w, h = x.get('width') or 0, x.get('height') or 0
            u = x.get('url') or ''
            if NO_FOTO.search(x.get('title') or '') or 'image_png' in u or w < 1000 or not h or not (0.62 <= w / h <= 2.1): continue
            # la miniatura directa de su fuente: la de Openverse pasa por su servidor, tarda y gasta el cupo del día
            th = re.sub(r'_[bhkc]\.jpg$', '_n.jpg', u) if 'staticflickr' in u else u
            fuente = {'stocksnap': 'StockSnap', 'rawpixel': 'Rawpixel', 'nappy': 'Nappy', 'flickr': 'Flickr', 'wikimedia': 'Wikimedia Commons'}.get(x.get('source'), x.get('source'))
            out.append({'src': 'o', 'titulo': x.get('title'), 'thumb': th, 'url': u, 'pagina': x.get('foreign_landing_url'),
                        'w': w, 'h': h, 'autor': limpio(x.get('creator')) if x.get('creator') else 'Autor desconocido',
                        'lic': ('CC0 1.0' if x.get('license') == 'cc0' else 'CC ' + (x.get('license') or '').upper() + ' ' + (x.get('license_version') or '')).strip(),
                        'fuente': fuente})
        return out
    return cache('o-' + fuentes[:6] + '-' + q, pide)[:n]

BAJA_TURNO = Semaphore(2)
def baja(url, timeout=60):
    # de dos en dos y, si el servidor dice «demasiadas» (429), se espera y se reintenta
    for intento in range(5):
        with BAJA_TURNO:
            r = requests.get(url, headers=UA, timeout=timeout)
        if r.status_code == 429: time.sleep(10 * (intento + 1)); continue
        r.raise_for_status(); return r.content
    r.raise_for_status()

def fuente(tam):
    for f in ('C:/Windows/Fonts/segoeuib.ttf', 'C:/Windows/Fonts/arialbd.ttf'):
        if os.path.exists(f): return ImageFont.truetype(f, tam)
    return ImageFont.load_default()

def buscar(ficha, consultas):
    C = json.load(open(consultas, encoding='utf-8'))
    def de_uno(c):
        vistos, cand = set(), []
        for q in c['q']:
            lst = openverse(q[3:]) if q.startswith('ov:') else openverse(q[3:], fuentes='flickr') if q.startswith('fl:') else commons(q)
            for x in lst:
                clave = x.get('pagina') or x.get('thumb')
                if clave in vistos: continue
                vistos.add(clave); cand.append(x)
        return c['k'], cand[:int(c.get('n', 8))]
    with ThreadPoolExecutor(6) as ex: filas = dict(ex.map(de_uno, C))
    todas = {str(k): v for k, v in filas.items()}
    json.dump(todas, open(os.path.join(TMP, ficha + '-cand.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    # las miniaturas
    trabajo = [(k, i, x['thumb']) for k, v in filas.items() for i, x in enumerate(v)]
    def mini(t):
        k, i, u = t
        p = os.path.join(TMP, 'th-%s-%s-%d.jpg' % (ficha, k, i))
        if not os.path.exists(p):
            try: Image.open(io.BytesIO(baja(u, 40))).convert('RGB').save(p, quality=85)
            except Exception: return None
        return p
    with ThreadPoolExecutor(10) as ex: list(ex.map(mini, trabajo))
    # las hojas: una fila por paso, hasta 8 candidatas numeradas
    TW, TH, LW, PAD = 210, 140, 170, 6
    porHoja, titulos = 9, {c['k']: c.get('t', '') for c in C}
    ks = [c['k'] for c in C]
    f1, f2 = fuente(20), fuente(15)
    hojas = []
    for h0 in range(0, len(ks), porHoja):
        grupo = ks[h0:h0 + porHoja]
        W = LW + 8 * (TW + PAD); H = len(grupo) * (TH + PAD) + PAD
        im = Image.new('RGB', (W, H), (245, 245, 247)); d = ImageDraw.Draw(im)
        for r, k in enumerate(grupo):
            y = PAD + r * (TH + PAD)
            d.text((8, y + 4), 'Paso %d' % (k + 1), fill=(20, 20, 20), font=f1)
            palabras, lin, ys = titulos.get(k, '').split(), '', y + 32
            for w in palabras:
                if d.textlength(lin + ' ' + w, font=f2) > LW - 14: d.text((8, ys), lin.strip(), fill=(70, 70, 80), font=f2); ys += 18; lin = ''
                lin += ' ' + w
            if lin: d.text((8, ys), lin.strip(), fill=(70, 70, 80), font=f2)
            for i, x in enumerate(filas.get(k, [])):
                p = os.path.join(TMP, 'th-%s-%s-%d.jpg' % (ficha, k, i))
                if not os.path.exists(p): continue
                t = ImageOps.fit(Image.open(p), (TW, TH))
                X = LW + i * (TW + PAD); im.paste(t, (X, y))
                d.rectangle([X, y, X + 30, y + 24], fill=(0, 0, 0)); d.text((X + 6, y + 1), str(i + 1), fill=(255, 255, 255), font=f1)
                if x['src'] == 'o': d.rectangle([X + TW - 14, y, X + TW, y + 14], fill=(40, 120, 255))
        p = os.path.join(TMP, '%s-hoja-%d.jpg' % (ficha, h0 // porHoja + 1)); im.save(p, quality=80); hojas.append(p)
    print(json.dumps({'hojas': hojas, 'por_paso': {str(k): len(v) for k, v in filas.items()}}, ensure_ascii=False))

def bajar(ficha, elegidas):
    E = json.load(open(elegidas, encoding='utf-8')); grupos = {}
    def cand(g): return grupos.setdefault(g, json.load(open(os.path.join(TMP, g + '-cand.json'), encoding='utf-8')))
    os.makedirs(DESTINO, exist_ok=True); out = {}
    def una(par):
        k, n = par   # n: el número en la hoja; «otra:3» la toma de esa fila en la búsqueda «otra»; «otra:5:3», de su fila 5
        partes = str(n).split(':')
        g, fila, n = (ficha, k, partes[0]) if len(partes) == 1 else (partes[0], k, partes[1]) if len(partes) == 2 else partes
        x = cand(g)[str(fila)][int(n) - 1]
        if x['src'] == 'c':
            r = requests.get(COMMONS, params={'action': 'query', 'format': 'json', 'titles': x['titulo'], 'prop': 'imageinfo', 'iiprop': 'url', 'iiurlwidth': 1280}, headers=UA, timeout=40)
            u = list(r.json()['query']['pages'].values())[0]['imageinfo'][0]['thumburl']
        else: u = x['url']
        im = Image.open(io.BytesIO(baja(u, 120))); im = ImageOps.exif_transpose(im).convert('RGB')
        if im.width > 1024: im = im.resize((1024, round(im.height * 1024 / im.width)), Image.LANCZOS)
        nombre = '%s-%d.jpg' % (ficha, int(k) + 1)
        im.save(os.path.join(DESTINO, nombre), quality=82, optimize=True, progressive=True)
        lic = {'Public domain': 'dominio público', 'CC0': 'CC0 1.0'}.get(x['lic'], x['lic']) or 'licencia libre'
        return str(k), {'foto': nombre, 'cred': '%s · %s · %s' % (x['autor'], x['fuente'], lic), 'pagina': x.get('pagina'), 'px': list(im.size)}
    def segura(par):
        try: return una(par)
        except Exception as e: return str(par[0]), {'error': str(e)[:160]}
    with ThreadPoolExecutor(3) as ex:
        for k, v in ex.map(segura, E.items()): out[k] = v
    viejo = os.path.join(TMP, ficha + '-creditos.json')   # se suma a lo ya bajado: así se puede repetir solo lo que falló
    if os.path.exists(viejo):
        antes = json.load(open(viejo, encoding='utf-8')); antes.update({k: v for k, v in out.items() if 'error' not in v or 'error' in antes.get(k, {'error': 1})}); out = antes
    json.dump(out, open(os.path.join(TMP, ficha + '-creditos.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(json.dumps(out, ensure_ascii=False, indent=1))

if __name__ == '__main__':
    if len(sys.argv) < 4 or sys.argv[1] not in ('buscar', 'bajar'): sys.exit(__doc__)
    (buscar if sys.argv[1] == 'buscar' else bajar)(sys.argv[2], sys.argv[3])
