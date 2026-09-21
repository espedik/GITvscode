// Generado por inversion-actualizar.ps1 (perfiles) el 2026-09-21T14:41:18-06:00 — NO se edita a mano: lo escribe Claude.
// Es el ÚNICO archivo que cambia al actualizar los perfiles segura y medio; la plantilla (dashboard.html) lo pinta.
window.INVERSION_HOY = {
  "mercado": {
    "resumen": "CETES a 28 días pagan 6.25% bruto (subasta del 15-sep), ligera alza desde 6.13%. El S&P 500 (VOO ~$698) sigue en máximos, +13.6% en el año y sobre sus medias de 50 y 200 días, aunque el impulso ya depende de utilidades, no de múltiplos. BTC ronda $77-81 mil, ánimo neutral-alcista peleando por recuperar los $80 mil. Buen momento para comprar parejo cada lunes, sin adivinar el techo.",
    "cetesTasa": 6.25,
    "senales": [
      {
        "t": "CETES 28d en 6.25%",
        "d": "Subió de 6.13% a 6.25% en septiembre; la parte segura rinde bien y sin sustos.",
        "tono": "ok"
      },
      {
        "t": "S&P 500 en máximos",
        "d": "VOO sobre medias de 50 y 200 días, pero caro; entra por partes, no de golpe.",
        "tono": "neutro"
      },
      {
        "t": "BTC lateral",
        "d": "Cerca de $80 mil, ánimo neutral. Es tu parte volátil: mantenla chica.",
        "tono": "alerta"
      },
      {
        "t": "Tarifas y tasas altas",
        "d": "Aranceles y rendimientos del Tesoro elevados pueden subir la volatilidad.",
        "tono": "neutro"
      }
    ]
  },
  "perfiles": {
    "seguro": {
      "lema": "Dormir tranquilo y sin sustos",
      "paraQuien": "Para ti si no quieres ver caídas y necesitas el dinero de la maestría de Esslingen líquido y firme para octubre de 2028. Estabilidad por encima de rendimiento.",
      "horizonte": "1 a 3 años",
      "riesgo": 1,
      "rendAnual": [
        5.5,
        6.5
      ],
      "caidaMax": "Casi nula. CETES y fondos de deuda gubernamental no se desploman; a lo más rinden un poco menos si bajan las tasas.",
      "resumen": "Tus $20,000 al mes casi todo a CETES en Cetesdirecto más un fondo de deuda gubernamental en GBM+. Rinde ~6% seguro y sirve directo para juntar los $500,000 de la maestría. Con tu margen de ~$31,000 al mes, esta es la ruta que no te quita el sueño.",
      "activos": [
        {
          "nombre": "CETES 28 días",
          "ticker": "CETES",
          "tipo": "Deuda del gobierno",
          "pct": 80,
          "donde": "Cetesdirecto",
          "porque": "Es lo más seguro de México: le prestas al gobierno a 28 días al 6.25%. Reinviertes cada mes y ese dinero queda listo y líquido para la maestría de 2028.",
          "vigilar": "La tasa en cada subasta (banxico.org.mx). Si baja mucho, pasa a plazos de 91-182 días.",
          "riesgo": "Casi cero. El único riesgo real es que la inflación coma parte del rendimiento."
        },
        {
          "nombre": "Fondo deuda gubernamental (BONDDIA)",
          "ticker": "BONDDIA",
          "tipo": "Fondo de deuda liquidez",
          "pct": 20,
          "donde": "GBM+",
          "porque": "Da liquidez diaria a tasa parecida a CETES sin amarrar plazo. Útil para el dinero que quieres poder mover rápido dentro de GBM+.",
          "vigilar": "El rendimiento diario y la comisión anual del fondo; que no se coma la tasa.",
          "riesgo": "Muy bajo. Deuda del gobierno de corto plazo; puede rendir poco si bajan tasas."
        }
      ],
      "porque": [
        "Necesitas los ~$500,000 de la maestría en euros/dólares para 2028.",
        "A ese plazo no puedes arriesgar el capital en algo que caiga.",
        "CETES al 6.25% ya te da rendimiento real decente hoy.",
        "Ya juntaste $53,740; esta ruta lo hace crecer sin sobresaltos."
      ],
      "contra": [
        "No te va a hacer rico: ~6% anual y punto.",
        "Si la inflación sube, el rendimiento real se achica.",
        "Te pierdes las subidas fuertes de bolsa a largo plazo."
      ],
      "reglas": [
        "Compra: cada lunes metes tu parte a CETES 28d y reinviertes al vencer.",
        "Vende: solo cuando toque pagar la maestría; antes no lo tocas.",
        "Rebalancea: revisa la tasa cada mes; si CETES cae fuerte, alarga plazo a 91-182d."
      ],
      "esteMes": "Abre o revisa Cetesdirecto y programa reinversión automática de CETES 28d. Manda ~$16,000 a CETES y ~$4,000 a BONDDIA en GBM+. Súmalo a tus $1,500 fijos de CETES."
    },
    "medio": {
      "lema": "Sembrar 10 años sin mirar",
      "paraQuien": "Para ti como inversor pasivo que aguanta bajones a cambio de crecer de verdad en 10+ años. Tienes 31; el tiempo juega a tu favor.",
      "horizonte": "10+ años",
      "riesgo": 3,
      "rendAnual": [
        6,
        10
      ],
      "caidaMax": "Puede caer 30-35% en un mal año (VOO cayó -34% en 2020 y -25% en 2022). Se recupera con los años si no vendes en pánico.",
      "resumen": "El clásico del inversor pasivo: mayoría en VOO (S&P 500), CETES como colchón y una pizca de BTC. Tus $20,000 al mes comprando cada lunes 10 años vencen a casi todo. No es para el dinero de la maestría, es para tu patrimonio de largo plazo.",
      "activos": [
        {
          "nombre": "Vanguard S&P 500 ETF",
          "ticker": "VOO",
          "tipo": "ETF de acciones EE.UU.",
          "pct": 65,
          "donde": "GBM+",
          "porque": "Las 500 empresas más grandes de EE.UU. en un solo boleto. Histórico ~7-10% anual real. Es el núcleo de cualquier cartera pasiva a 10 años.",
          "vigilar": "No mires el precio semanal. Compra parejo aunque esté en máximos ($698 hoy).",
          "riesgo": "Volátil: -34% en 2020, -25% en 2022. Solo duele si vendes en la caída."
        },
        {
          "nombre": "CETES 28 días",
          "ticker": "CETES",
          "tipo": "Deuda del gobierno",
          "pct": 25,
          "donde": "Cetesdirecto",
          "porque": "Tu ancla estable al 6.25%. Baja el vaivén de la cartera y te da pólvora seca para comprar VOO barato cuando el mercado cae.",
          "vigilar": "La tasa en cada subasta; si baja mucho pierde atractivo frente al ETF.",
          "riesgo": "Casi nulo. Su único costo es rendir menos que la bolsa a largo plazo."
        },
        {
          "nombre": "Bitcoin",
          "ticker": "BTC",
          "tipo": "Cripto (fuera de GBM+)",
          "pct": 10,
          "donde": "Bitso",
          "porque": "Una pizca de alto potencial que no mueve la cartera si sale mal. Ya sabes comprarlo en exchange. 10% es suficiente para notar la subida sin arriesgar el plan.",
          "vigilar": "Ronda $80 mil. No le metas más del 10% ni promedies a la baja con emoción.",
          "riesgo": "Brutal: cayó -77% en 2022. Da por hecho que puede caer a la mitad."
        }
      ],
      "porque": [
        "Tienes 31 y 10+ años: el interés compuesto es tu mejor arma.",
        "VOO indexado le gana a la mayoría de fondos activos a largo plazo.",
        "CETES te sostiene los nervios en las caídas y te deja comprar barato.",
        "Comprar cada lunes te quita la tentación de adivinar el mercado."
      ],
      "contra": [
        "Vas a ver números rojos: prepárate para caídas de 30%+.",
        "No es dinero para la maestría; ese va en el perfil seguro.",
        "BTC puede irse a la mitad; solo mete lo que aguantes perder."
      ],
      "reglas": [
        "Compra: cada lunes repartes tu monto en 65/25/10, pase lo que pase.",
        "Vende: no vendes por miedo; solo rebalanceas o ante meta a 10 años.",
        "Rebalancea: 1 o 2 veces al año vuelve a 65/25/10; si BTC crece mucho, recórtalo."
      ],
      "esteMes": "En GBM+ compra VOO por ~$13,000 este lunes. Mete ~$5,000 a CETES (además de tus $1,500 fijos) y ~$2,000 a BTC en Bitso. Repite cada lunes sin mirar precios."
    }
  },
  "fuentes": [
    {
      "t": "Banxico — tasas de valores gubernamentales",
      "u": "https://www.banxico.org.mx"
    },
    {
      "t": "Cetesdirecto — CETES 28 días",
      "u": "https://www.cetesdirecto.com/tablas/valores_gubernamentales/cetes.html"
    },
    {
      "t": "Ficha VOO — Vanguard S&P 500 ETF",
      "u": "https://stockanalysis.com/etf/voo/"
    },
    {
      "t": "GBM+ — plataforma de inversión",
      "u": "https://www.gbm.com"
    },
    {
      "t": "Bitso — comprar Bitcoin",
      "u": "https://bitso.com"
    }
  ],
  "_meta": {
    "generado": "2026-09-21T14:41:18-06:00",
    "modelo": "claude-opus-4-8",
    "tokens": 77304,
    "salida": 4359,
    "turnos": 5,
    "segundos": 98,
    "costoUsd": 0.4709
  }
};
