/* ═══════════════════════════════════════════════════════════════════════════════════════════════
   LAS NOTICIAS DE INVERSIÓN, SIN IA — lo corre el hook de pre-commit de la PC
   ═══════════════════════════════════════════════════════════════════════════════════════════════
   Adán, 17-nov-2026: "en qué invertir hoy también depende de la IA y eso ya no lo quiero… ponle la
   habilidad de que me muestre noticias concretas de recomendaciones en qué invertir, ya no quiero
   depender de mi suscripción a Claude".

   Lee Google Noticias (México, en español) con una búsqueda por tema, se queda con lo reciente de cada
   uno, quita lo repetido y deja solo medios de México (en cripto, cualquiera que no sea de otro país), y
   escribe `Dashboard/noticias-inversion.js`:
     window.NOTICIAS_INVERSION = { generado, temas: [{id, t, q, dias}], items: [{t, u, f, fuente, dominio, tema, rec}] }
   `rec` marca un titular que recomienda algo («dónde invertir», «conviene», «¿es momento de comprar?»…).
   Qué invertir hoy lo carga con <script src>, en la PC y —con el push— en el iPad. Además, una tarea de GitHub
   (.github/workflows/noticias-inversion.yml) lo corre cada 4 horas y publica el JSON en la rama `datos-noticias`;
   el panel usa el más nuevo de los dos, así hay noticias frescas aunque no haya commit. Las búsquedas viven solo
   aquí: el panel toma los nombres de los temas del propio archivo. El navegador no puede leer Google
   Noticias directo (CORS) y los lectores de RSS gratuitos fallan o piden llave; Node desde la PC, sí.

   Google permite su RSS para leerlo en un lector personal y no comercial: es este uso.

     node Dashboard/noticias-actualizar.js                 # escribe noticias-inversion.js si tiene más de una hora
     node Dashboard/noticias-actualizar.js --add           # y lo agrega al commit (así lo llama el hook)
     node Dashboard/noticias-actualizar.js --ya            # aunque tenga menos de una hora
     node Dashboard/noticias-actualizar.js --ya --json x   # y el JSON puro en x (así lo llama la tarea de GitHub)
     NOTICIAS_DIR=carpeta node Dashboard/noticias-actualizar.js --ya   # lee <tema>.xml de una carpeta (pruebas)
   Nunca detiene un commit: sin red o sin noticias, lo dice en una línea y deja el archivo anterior.
   ═══════════════════════════════════════════════════════════════════════════════════════════════ */
const fs = require('fs'), path = require('path');

const TEMAS = [
  // Solo titulares que recomiendan algo (`soloRec`): es la pestaña que dice qué conviene.
  { id: 'recomendaciones', t: 'Recomendaciones', dias: 30, soloRec: true,
    q: '("en qué invertir" OR "dónde invertir" OR "recomendaciones de inversión" OR "conviene invertir" OR "mejores inversiones") México' },
  { id: 'cetes', t: 'CETES y tasas', dias: 7, q: '(CETES OR Cetesdirecto OR "tasa de Banxico")' },
  { id: 'bolsa', t: 'Bolsa y ETFs', dias: 7, q: '(BMV OR "S&P 500" OR ETF OR acciones) (analistas OR recomiendan OR comprar) México' },
  // Bitcoin es el mismo en todas partes: aquí no se pide que el medio sea de México, solo que no sea de otro país.
  { id: 'cripto', t: 'Cripto', dias: 3, q: '(bitcoin OR criptomonedas) precio', global: true },
];
// Los medios que cuentan para tu dinero en México: cualquier dominio .mx y estos; lo demás (España, Argentina, notas de
// otros temas) se queda fuera aunque Google lo traiga.
const MEDIOS = ['gbm.com', 'bloomberglinea.com', 'mx.investing.com', 'unotv.com', 'milenio.com', 'elceo.com'];
const OTRO_PAIS = /\.(ar|es|pe|cl|co|ve|uy|bo|py|ec)$/i;
const deMexico = d => /\.mx$/i.test(d) || MEDIOS.some(m => d === m || d.endsWith('.' + m));
const POR_TEMA = 12;
// Un titular que recomienda algo: es lo que el panel marca primero.
const REC = /(d[oó]nde invertir|en qu[eé] invertir|recomiend|recomendaci|conviene|mejores (acciones|fondos|inversiones|opciones|etf)|vale la pena|(es|buen) momento (para|de) comprar|¿comprar|qu[eé] comprar|superan? a (los )?cetes|oportunidad de inversi)/i;
const OTRO_TEMA = /\b(argentin|colombia|chile|per[uú]|espa[ñn]a|venezuel|brasil)/i;

const url = tema => 'https://news.google.com/rss/search?q=' + encodeURIComponent(tema.q + ' when:' + tema.dias + 'd') + '&hl=es-419&gl=MX&ceid=MX:es-419';
const limpia = s => String(s || '').replace(/<!\[CDATA\[|\]\]>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const campo = (it, k) => limpia((it.match(new RegExp('<' + k + '[^>]*>([\\s\\S]*?)</' + k + '>')) || [])[1]);

function leerRss(xml, tema, desde) {
  return [...String(xml).matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m => {
    const it = m[1], fuente = campo(it, 'source'), f = new Date(campo(it, 'pubDate'));
    const dominio = ((it.match(/<source url="https?:\/\/(?:www\.)?([^/"]+)/) || [])[1] || '').toLowerCase();
    let t = campo(it, 'title');
    if (fuente && t.endsWith(' - ' + fuente)) t = t.slice(0, -(fuente.length + 3));
    return { t, u: campo(it, 'link'), f: isNaN(f) ? null : f.toISOString(), fuente, dominio, tema: tema.id, rec: REC.test(t) };
  }).filter(x => x.t && x.t.length >= 25 && x.u && x.f && new Date(x.f) >= desde && !OTRO_TEMA.test(x.t) &&
    (tema.global ? !OTRO_PAIS.test(x.dominio) : deMexico(x.dominio)) && (!tema.soloRec || x.rec));
}

async function traer(tema) {
  if (process.env.NOTICIAS_DIR) return fs.readFileSync(path.join(process.env.NOTICIAS_DIR, tema.id + '.xml'), 'utf8');
  const r = await fetch(url(tema), { headers: { 'User-Agent': 'Mozilla/5.0 (lector personal de noticias)' }, signal: AbortSignal.timeout(8000) });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return r.text();
}

const SALIDA = path.join(__dirname, 'noticias-inversion.js');
const di = m => console.log('noticias · ' + m);
function previo() {
  try { const s = fs.readFileSync(SALIDA, 'utf8'); const m = s.match(/"generado":\s*"([^"]+)"/); return m ? new Date(m[1]) : null; }
  catch (e) { return null; }
}

(async function () {
  const args = process.argv.slice(2), ahora = new Date(), vistos = new Set(), items = [];
  if (typeof fetch !== 'function' && !process.env.NOTICIAS_DIR) return di('este Node no trae fetch (hace falta la versión 18 o más): no se actualizan');
  const antes = previo();
  if (antes && args.indexOf('--ya') < 0 && ahora - antes < 3600000) return di('al día (de hace ' + Math.round((ahora - antes) / 60000) + ' min)');
  let conNoticias = 0;
  for (const tema of TEMAS) {
    try {
      const desde = new Date(ahora - tema.dias * 86400000);
      const lista = leerRss(await traer(tema), tema, desde).sort((a, b) => b.f.localeCompare(a.f)).filter(x => {
        const k = x.t.toLowerCase().replace(/[^a-z0-9áéíóúñü]+/g, ' ').trim();
        if (vistos.has(k)) return false; vistos.add(k); return true;
      });
      // Primero lo que recomienda algo, después lo demás; cada grupo, de lo más nuevo a lo más viejo.
      const orden = lista.filter(x => x.rec).concat(lista.filter(x => !x.rec)).slice(0, POR_TEMA);
      items.push(...orden);
      if (orden.length) conNoticias++;
    } catch (e) { di(tema.id + ': no se pudo (' + e.message + ')'); }
  }
  if (!conNoticias) return di('ningún tema trajo noticias: se queda el archivo anterior');
  const datos = { generado: ahora.toISOString(), temas: TEMAS.map(x => ({ id: x.id, t: x.t, q: x.q, dias: x.dias })), items };
  fs.writeFileSync(SALIDA + '.tmp', '/* Las noticias de inversión de Qué invertir hoy, de Google Noticias. Las escribe el hook de pre-commit\n' +
    '   (Dashboard/noticias-actualizar.js): no se edita a mano. */\nwindow.NOTICIAS_INVERSION = ' + JSON.stringify(datos, null, 1) + ';\n', 'utf8');
  fs.renameSync(SALIDA + '.tmp', SALIDA);
  di(items.length + ' titulares en ' + conNoticias + ' temas');
  // La tarea de GitHub (cada 4 horas) pide además el JSON puro, que publica en la rama datos-noticias.
  const j = args.indexOf('--json');
  if (j >= 0 && args[j + 1]) { fs.writeFileSync(args[j + 1], JSON.stringify(datos) + '\n', 'utf8'); di('JSON en ' + args[j + 1]); }
  if (args.indexOf('--add') >= 0) require('child_process').spawnSync('git', ['add', SALIDA], { stdio: 'ignore' });
})().catch(e => di('no se pudo: ' + e.message));
