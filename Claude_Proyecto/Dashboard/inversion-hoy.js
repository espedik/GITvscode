// Generado por inversion-actualizar.ps1 el 2026-09-21T06:40:39-06:00 — NO se edita a mano: lo escribe Claude.
// Es el ÚNICO archivo que cambia al actualizar; la plantilla (dashboard.html) lo pinta.
window.INVERSION_HOY = {
  "veredicto": {
    "titulo": "Cierra tu fondo y mata la tarjeta al 55.7%",
    "texto": "Estás en Fase 0. Tu fondo va en $6,000 de $10,000: te faltan $4,000. Con tus $1,500 quincenales a CETES lo cierras en ~6 semanas. Antes que nada liquida la tarjeta BBVA ($900 al 55.7%): es la fuga más cara que tienes. Todavía no toca invertir en bolsa; tu plan manda: primero fondo completo, luego deudas caras, y hasta entonces el paso 3.",
    "montoMensual": 3000,
    "cuandoInvertir": "Cuando el fondo llegue a $10,000 (aprox. noviembre 2026) y la tarjeta esté en cero, pasas al paso 3 e inviertes tu margen."
  },
  "mercado": {
    "resumen": "CETES a 28 días subieron a 6.25% anual (subasta del 15-sep): un piso sólido y sin riesgo. El S&P 500 (VOO ~$700) sigue en máximos, +13.6% en 2026, pero tasas altas y aranceles meten volatilidad. Bitcoin consolida cerca de $77-78k, lateral y sin tendencia clara. Buen momento para lo aburrido: fondo y deuda.",
    "cetesTasa": 6.25,
    "senales": [
      {
        "t": "CETES 28 días",
        "d": "Subieron a 6.25% anual; rinde seguro mientras completas tu fondo.",
        "tono": "ok"
      },
      {
        "t": "S&P 500 (VOO)",
        "d": "En máximos (~$700), +13.6% en 2026; fuerte pero caro.",
        "tono": "neutro"
      },
      {
        "t": "Bitcoin",
        "d": "Cerca de $77-78k, lateral y sin momentum claro.",
        "tono": "neutro"
      },
      {
        "t": "Aranceles y tasas",
        "d": "Nuevos riesgos comerciales y rendimientos altos pueden subir la volatilidad.",
        "tono": "alerta"
      }
    ]
  },
  "perfiles": {
    "seguro": {
      "lema": "Dormir tranquilo, cero sustos",
      "paraQuien": "Para ti ahora: aún construyes tu fondo y no quieres ver números rojos. Casi todo en deuda del gobierno, con un toque de bolsa.",
      "horizonte": "Ahora y hasta 2028",
      "riesgo": 2,
      "rendAnual": [
        5,
        7
      ],
      "caidaMax": "Casi nula. CETES no cae; el 10% en VOO puede bajar 30% en un mal año, pero pesa tan poco que apenas se siente.",
      "resumen": "70% CETES, 20% fondo de deuda gubernamental y 10% ETF del S&P 500. Rinde ~6% seguro con un toque de bolsa para no perderle a la inflación. Ideal mientras cierras fondo y deudas.",
      "activos": [
        {
          "nombre": "CETES 28 días",
          "ticker": "CETES",
          "tipo": "Deuda gob. MXN",
          "pct": 70,
          "donde": "Cetesdirecto",
          "porque": "Es tu fondo de emergencia: líquido cada 28 días, sin riesgo y hoy al 6.25%. Aquí van tus $1,500 quincenales hasta llegar a $10,000.",
          "vigilar": "La tasa en cada subasta de Banxico (martes) y reinvertir al vencer.",
          "riesgo": "Prácticamente cero. El único riesgo real es la inflación si supera la tasa."
        },
        {
          "nombre": "BONDDIA",
          "ticker": "BONDDIA",
          "tipo": "Fondo deuda gob.",
          "pct": 20,
          "donde": "GBM+",
          "porque": "Fondo de deuda gubernamental de disponibilidad diaria: rinde parecido a CETES pero lo sacas cualquier día. Buen colchón líquido dentro de GBM.",
          "vigilar": "La comisión del fondo y que sea 100% deuda gubernamental.",
          "riesgo": "Muy bajo; solo variaciones diarias mínimas."
        },
        {
          "nombre": "Vanguard S&P 500",
          "ticker": "VOO",
          "tipo": "ETF EE. UU.",
          "pct": 10,
          "donde": "GBM+",
          "porque": "Un 10% en las 500 mayores empresas de EE. UU. para que tu dinero crezca por encima de la inflación sin arriesgar el grueso.",
          "vigilar": "Que sea dinero que no necesites 5+ años y el tipo de cambio USD/MXN.",
          "riesgo": "Cayó 34% en 2020 y 25% en 2022; aquí pesa poco, casi no lo sientes."
        }
      ],
      "porque": [
        "Tu fondo aún no está completo: la prioridad es tenerlo seguro y a la mano.",
        "CETES al 6.25% te paga bien sin exponerte a caídas.",
        "El 10% en VOO evita que la inflación te gane a largo plazo."
      ],
      "contra": [
        "Rinde poco: no hará crecer tu patrimonio rápido.",
        "Casi todo en pesos: no protege contra una devaluación.",
        "A 10 años, quedarte aquí te deja dinero sobre la mesa."
      ],
      "reglas": [
        "Compra: $1,500 cada quincena a CETES hasta llegar a $10,000.",
        "Vende: solo si es emergencia real o para pagar deuda cara.",
        "Rebalancea: revisa una vez al mes, 20 min los lunes."
      ],
      "esteMes": "Mete tus $1,500 quincenales a CETES: te faltan $4,000 para el fondo. En paralelo, liquida la tarjeta BBVA de $900 al 55.7%. No abras VOO todavía; primero fondo lleno."
    },
    "medio": {
      "lema": "El piloto automático de 10 años",
      "paraQuien": "Para cuando ya tengas fondo y deudas caras controladas. Inversión pasiva que mantienes una década sin voltear a verla.",
      "horizonte": "10+ años",
      "riesgo": 3,
      "rendAnual": [
        6,
        11
      ],
      "caidaMax": "En un mal año puede bajar 25-30%. Es normal en bolsa; con horizonte largo se recupera.",
      "resumen": "50% S&P 500, 30% CETES, 15% mundo (VT) y 5% Bitcoin. La cartera que un inversor pasivo mantiene 10 años: crece con la bolsa global y CETES amortigua las caídas.",
      "activos": [
        {
          "nombre": "Vanguard S&P 500",
          "ticker": "VOO",
          "tipo": "ETF EE. UU.",
          "pct": 50,
          "donde": "GBM+",
          "porque": "El corazón de la cartera: 500 empresas de EE. UU. Históricamente 6-10% anual a largo plazo. Simple, barato y diversificado.",
          "vigilar": "El tipo de cambio USD/MXN y no vender en las caídas.",
          "riesgo": "-34% en 2020, -25% en 2022; se recuperó en 1-2 años."
        },
        {
          "nombre": "CETES 28 días",
          "ticker": "CETES",
          "tipo": "Deuda gob. MXN",
          "pct": 30,
          "donde": "Cetesdirecto",
          "porque": "Tu ancla estable al 6.25%. Amortigua cuando la bolsa cae y te da con qué comprar barato al rebalancear.",
          "vigilar": "La tasa en cada subasta y reinvertir al vencer.",
          "riesgo": "Casi nulo; solo la inflación."
        },
        {
          "nombre": "Vanguard Total World",
          "ticker": "VT",
          "tipo": "ETF global",
          "pct": 15,
          "donde": "GBM+",
          "porque": "Acciones de todo el mundo (Europa, Asia, emergentes) para no depender solo de EE. UU.",
          "vigilar": "Se solapa con VOO en EE. UU. y el tipo de cambio.",
          "riesgo": "Similar a VOO; cae en crisis globales."
        },
        {
          "nombre": "Bitcoin",
          "ticker": "BTC",
          "tipo": "Cripto",
          "pct": 5,
          "donde": "Bitso",
          "porque": "Un 5% chico en Bitcoin: si sube, ayuda; si se hunde, no te tumba la cartera. Cómpralo en Bitso, no en GBM+.",
          "vigilar": "Su volatilidad brutal; no pasar del 5%.",
          "riesgo": "Cayó 77% en 2022. Solo con dinero que aguantes perder."
        }
      ],
      "porque": [
        "Es la fórmula aburrida que funciona: índices baratos a 10 años.",
        "CETES al 30% suaviza las caídas y te deja rebalancear.",
        "VT suma el resto del mundo; BTC agrega chispa controlada."
      ],
      "contra": [
        "Verás caídas de 25-30% y hay que aguantarlas sin vender.",
        "No le ganarás al mercado; solo lo sigues.",
        "El 5% de BTC puede irse a la mitad sin avisar."
      ],
      "reglas": [
        "Compra: aporte fijo cada lunes, pase lo que pase con el precio.",
        "Vende: no vendes por miedo; solo al necesitar el dinero.",
        "Rebalancea: 1-2 veces al año vuelve a 50/30/15/5."
      ],
      "esteMes": "Aún no: primero cierra tu fondo ($4,000) y la tarjeta al 55.7%. Cuando eso esté, arranca con VOO y CETES los lunes. Deja el BTC para el final y en Bitso."
    },
    "alto": {
      "lema": "Crecer fuerte, aguantar sustos",
      "paraQuien": "Para dinero a 10+ años que no tocarás y con estómago para caídas grandes. Nada de esto es para tu maestría de 2028.",
      "horizonte": "10+ años",
      "riesgo": 5,
      "rendAnual": [
        8,
        18
      ],
      "caidaMax": "Puede desplomarse 40-50% en un mal año entre tecnología y Bitcoin. Solo si aguantas verlo sin vender.",
      "resumen": "40% Nasdaq (QQQ), 25% S&P 500, 25% Bitcoin y 10% CETES. Máximo crecimiento y máxima volatilidad. Solo con dinero de largo plazo que no necesites y nervios de acero.",
      "activos": [
        {
          "nombre": "Invesco QQQ",
          "ticker": "QQQ",
          "tipo": "ETF tecnología",
          "pct": 40,
          "donde": "GBM+",
          "porque": "Las 100 mayores del Nasdaq: tecnología y crecimiento. Más rendimiento potencial, pero también más golpes.",
          "vigilar": "Está muy concentrado en tech; el tipo de cambio USD/MXN.",
          "riesgo": "-33% en 2022. Sube y baja más fuerte que el S&P."
        },
        {
          "nombre": "Vanguard S&P 500",
          "ticker": "VOO",
          "tipo": "ETF EE. UU.",
          "pct": 25,
          "donde": "GBM+",
          "porque": "Base más estable dentro del perfil agresivo: las 500 de EE. UU. para no ir todo a tech y cripto.",
          "vigilar": "El tipo de cambio USD/MXN; no vender en pánico.",
          "riesgo": "-34% en 2020, -25% en 2022; se recuperó."
        },
        {
          "nombre": "Bitcoin",
          "ticker": "BTC",
          "tipo": "Cripto",
          "pct": 25,
          "donde": "Bitso",
          "porque": "Peso real en Bitcoin por su potencial de subida; ~$77k hoy. Cómpralo en Bitso, ya sabes cómo.",
          "vigilar": "Volatilidad extrema; no rebasar tu tolerancia real.",
          "riesgo": "Cayó 77% en 2022. Puede repetirse en cualquier ciclo."
        },
        {
          "nombre": "CETES 28 días",
          "ticker": "CETES",
          "tipo": "Deuda gob. MXN",
          "pct": 10,
          "donde": "Cetesdirecto",
          "porque": "Un ancla mínima al 6.25% para tener liquidez y comprar barato tras las caídas.",
          "vigilar": "La tasa en subasta y reinvertir al vencer.",
          "riesgo": "Casi nulo; solo la inflación."
        }
      ],
      "porque": [
        "Tienes 31 y horizonte de 10+ años para aguantar la volatilidad.",
        "QQQ y BTC ofrecen el mayor potencial de crecimiento.",
        "Un 10% en CETES te deja pólvora seca para las caídas."
      ],
      "contra": [
        "Caídas de 40-50% son posibles y hay que soportarlas enteras.",
        "El 25% en BTC puede perder tres cuartas partes de su valor.",
        "Nada aquí sirve para metas a corto plazo como la maestría."
      ],
      "reglas": [
        "Compra: aporte fijo cada lunes; promedia el precio.",
        "Vende: solo al rebalancear o si cambia tu horizonte.",
        "Rebalancea: 1-2 veces al año; recorta lo que se disparó."
      ],
      "esteMes": "Este perfil no es para hoy. Cierra fondo y tarjeta primero. Y recuerda: el dinero de tu maestría 2028 NO va aquí, va seguro. Esto es solo para largo plazo que no tocas."
    }
  },
  "fuentes": [
    {
      "t": "CETES hoy — tasas por plazo",
      "u": "https://cetes.app/cetes-hoy"
    },
    {
      "t": "Banxico — convocatoria de valores gubernamentales",
      "u": "https://www.banxico.org.mx/apps/dao-web/4/54/4/convocatoriagubernamental.html"
    },
    {
      "t": "Cetesdirecto — tabla de valores gubernamentales",
      "u": "https://www.cetesdirecto.com/tablas/valores_gubernamentales/cetes.html"
    },
    {
      "t": "VOO — ficha del ETF (stockanalysis)",
      "u": "https://stockanalysis.com/etf/voo/"
    },
    {
      "t": "Precio de Bitcoin (Fortune)",
      "u": "https://fortune.com/article/price-of-bitcoin-09-01-2026/"
    }
  ],
  "_meta": {
    "generado": "2026-09-21T06:40:39-06:00",
    "modelo": "claude-opus-4-8",
    "tokens": 92731,
    "salida": 11379,
    "turnos": 5,
    "segundos": 152,
    "costoUsd": 0.6943
  }
};
