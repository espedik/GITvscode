/* ═══════════════════════════════════════════════════════════════════════════════════════════════
   LOS PRECIOS DE QUÉ INVERTIR HOY, CON SU HISTORIA — lo corre una tarea de GitHub
   ═══════════════════════════════════════════════════════════════════════════════════════════════
   Adán, 17-nov-2026: "agrega más precios ahora, de diferentes empresas, nvidia, Microsoft, Apple, Amazon,
   etc… así como le hiciste con el dólar y el bitcoin, si es con gráfica mucho mejor".

   Lee de Yahoo Finanzas (la API de gráficas, sin llave) el precio de cada símbolo de SIMBOLOS, su cierre anterior
   y su historia —un año en días y cinco en semanas—, y escribe un JSON:
     { generado, fuente, items: [{ s, tk, n, d, tipo, m, p, pc, t, d1: [[fecha, cierre]], w5: [[fecha, cierre]] }] }
   (`s` el símbolo de Yahoo, `tk` el corto que se enseña, `m` la moneda, `p` el precio, `pc` el cierre anterior, `t` la hora
   del precio).
   La tarea .github/workflows/precios-acciones.yml lo corre en horario de bolsa y lo publica en la rama
   `datos-precios`; Qué invertir hoy lo lee de ahí (raw.githubusercontent.com sí deja leer al navegador; Yahoo
   no). Los símbolos viven solo aquí: el panel toma nombres y orden del archivo.

     node Dashboard/precios-actualizar.js salida.json
   Sale con código 1, sin escribir nada, si falla más de la mitad: así la tarea no publica un archivo a medias.
   ═══════════════════════════════════════════════════════════════════════════════════════════════ */
const fs = require('fs');

// En el orden del panel. `tk` es el nombre corto que se enseña; `d` es lo que es, en pocas palabras, para alguien que empieza a invertir.
const SIMBOLOS = [
  { s: 'VOO', tk: 'VOO', n: 'S&P 500', d: 'las 500 empresas más grandes de EE. UU., en un ETF', tipo: 'etf' },
  { s: 'NAFTRACISHRS.MX', tk: 'NAFTRAC', n: 'Bolsa Mexicana', d: 'las 35 empresas del IPC, en un ETF que se compra en pesos', tipo: 'etf' },
  { s: 'NVDA', tk: 'NVDA', n: 'NVIDIA', d: 'chips para inteligencia artificial', tipo: 'accion' },
  { s: 'MSFT', tk: 'MSFT', n: 'Microsoft', d: 'Windows, Office y la nube Azure', tipo: 'accion' },
  { s: 'AAPL', tk: 'AAPL', n: 'Apple', d: 'iPhone, Mac y servicios', tipo: 'accion' },
  { s: 'AMZN', tk: 'AMZN', n: 'Amazon', d: 'tienda en línea y la nube AWS', tipo: 'accion' },
  { s: 'GOOGL', tk: 'GOOGL', n: 'Alphabet', d: 'Google, YouTube y Android', tipo: 'accion' },
  { s: 'META', tk: 'META', n: 'Meta', d: 'Facebook, Instagram y WhatsApp', tipo: 'accion' },
  { s: 'TSLA', tk: 'TSLA', n: 'Tesla', d: 'autos eléctricos y baterías', tipo: 'accion' },
  { s: 'BTC-USD', tk: 'BTC', n: 'Bitcoin', d: 'la criptomoneda más grande', tipo: 'cripto' },
  { s: 'MXN=X', tk: 'USD/MXN', n: 'Dólar', d: 'cuántos pesos cuesta un dólar', tipo: 'divisa' },
];

const r2 = v => Math.round(v * (Math.abs(v) < 100 ? 10000 : 100)) / (Math.abs(v) < 100 ? 10000 : 100);
const espera = ms => new Promise(r => setTimeout(r, ms));

async function grafica(s, rango, intervalo) {
  let ultimo;
  for (const host of ['query1', 'query2']) {
    try {
      const r = await fetch('https://' + host + '.finance.yahoo.com/v8/finance/chart/' + encodeURIComponent(s) +
        '?range=' + rango + '&interval=' + intervalo, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(10000) });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const res = (await r.json()).chart.result[0];
      if (!res || !res.meta || !(res.meta.regularMarketPrice > 0)) throw new Error('sin precio');
      return res;
    } catch (e) { ultimo = e; }
  }
  throw ultimo;
}

// La fecha en la bolsa de ese precio (Nueva York, Ciudad de México…): se le suma su desfase y se lee en UTC.
const fechaBolsa = (seg, off) => new Date((seg + (off || 0)) * 1000).toISOString().slice(0, 10); // UTC a propósito

// [[fecha local de la bolsa, cierre]], sin huecos.
function serie(res) {
  const off = res.meta.gmtoffset, c = res.indicators.quote[0].close || [];
  return (res.timestamp || []).map((t, i) => [fechaBolsa(t, off), c[i]])
    .filter(x => x[1] != null && x[1] > 0).map(x => [x[0], r2(x[1])]);
}

(async function () {
  const salida = process.argv[2];
  if (!salida) { console.error('uso: node precios-actualizar.js salida.json'); process.exit(2); }
  const items = [], fallos = [];
  for (const S of SIMBOLOS) {
    try {
      const a = await grafica(S.s, '1y', '1d'); await espera(300);
      const b = await grafica(S.s, '5y', '1wk'); await espera(300);
      const m = a.meta, d1 = serie(a), w5 = serie(b);
      if (d1.length < 20) throw new Error('historia corta (' + d1.length + ')');
      const t = new Date(m.regularMarketTime * 1000);
      // El cierre anterior: el último día antes del de la sesión del precio (la serie diaria ya trae el de hoy).
      const hoy = fechaBolsa(m.regularMarketTime, m.gmtoffset);
      const antes = d1.filter(x => x[0] < hoy);
      const pc = antes.length ? antes[antes.length - 1][1] : null;
      // El último punto de la serie es el precio de ahora: así la gráfica termina donde dice la cifra.
      if (d1[d1.length - 1][0] === hoy) d1[d1.length - 1][1] = r2(m.regularMarketPrice); else d1.push([hoy, r2(m.regularMarketPrice)]);
      items.push({ s: S.s, tk: S.tk, n: S.n, d: S.d, tipo: S.tipo, m: m.currency || 'USD', p: r2(m.regularMarketPrice), pc,
        t: t.toISOString(), d1, w5 });
      console.log('  ' + S.n.padEnd(15) + String(r2(m.regularMarketPrice)).padStart(10) + ' ' + (m.currency || '') + '  ' + d1.length + ' días, ' + w5.length + ' semanas');
    } catch (e) { fallos.push(S.n + ': ' + e.message); }
  }
  if (fallos.length) console.log('No llegaron: ' + fallos.join(' · '));
  if (items.length < SIMBOLOS.length / 2) { console.error('Menos de la mitad de los precios: no se escribe nada.'); process.exit(1); }
  const datos = { generado: new Date().toISOString(), fuente: 'Yahoo Finanzas', items };
  fs.writeFileSync(salida + '.tmp', JSON.stringify(datos) + '\n', 'utf8'); fs.renameSync(salida + '.tmp', salida);
  console.log(items.length + ' precios en ' + salida + ' (' + Math.round(fs.statSync(salida).size / 1024) + ' KB)');
})();
