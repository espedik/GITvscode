/* Los saldos de Finanzas de la PC, para el dispositivo que no tiene Finanzas: deudas, fondo, inversiones, activos y el
   Bitcoin en un lote, más lo que queda en la quincena. Sin movimientos ni notas. Lo escribe el hook de pre-commit
   (Dashboard/habitos-exportar.js): no se edita a mano. */
window.FINANZAS_SYNC = {
  "exportado": "2026-11-03T04:40:49.461Z",
  "fecha": "2026-11-02",
  "gastar": 1409,
  "datos": {
   "debts": [
    {
     "id": "d001",
     "name": "Tarjeta BBVA",
     "type": "credit_card",
     "total": 39000,
     "balance": 2300,
     "rate": 55.7,
     "min": 1500,
     "day": 11,
     "start": "2024-01-22",
     "noInterest": 0,
     "fecha": "2026-10-31",
     "planAl": "2026-11-02",
     "omitidos": []
    },
    {
     "id": "d002",
     "name": "Tarjeta Banamex",
     "type": "credit_card",
     "total": 14349.72,
     "balance": 0,
     "rate": 55.7,
     "min": 810,
     "day": 8,
     "start": "2024-06-18",
     "noInterest": 0
    },
    {
     "id": "d003",
     "name": "Crédito Automotriz",
     "type": "car",
     "total": 315800,
     "balance": 279363.48,
     "rate": 12.99,
     "min": 6700,
     "day": 15,
     "start": "2026-01-01",
     "fecha": "2026-10-15"
    },
    {
     "id": "d004",
     "name": "Apple Watch MSI (TC Banamex)",
     "type": "other",
     "total": 10248,
     "balance": 0,
     "rate": 0,
     "min": 854,
     "day": 18,
     "start": "2025-09-16"
    },
    {
     "id": "d007",
     "name": "Boletos Ticketmaster (MSI)",
     "type": "other",
     "total": 3780,
     "balance": 0,
     "rate": 0,
     "min": 1260,
     "day": 0,
     "start": "2026-04-20"
    },
    {
     "id": "d008",
     "name": "iPhone 15 (crédito AT&T)",
     "type": "other",
     "total": 13337.46,
     "balance": 9385.62,
     "rate": 0,
     "min": 493.98,
     "day": 1,
     "start": "2026-03-20",
     "fecha": "2026-11-01"
    },
    {
     "id": "d009",
     "name": "Zap Stylo (MSI TC BBVA)",
     "type": "other",
     "total": 1002,
     "balance": 0,
     "rate": 0,
     "min": 167,
     "day": 22,
     "start": "2026-03-22"
    },
    {
     "id": "d010",
     "name": "Merpago*Merca (MSI TC BBVA)",
     "type": "other",
     "total": 1791,
     "balance": 0,
     "rate": 0,
     "min": 597,
     "day": 22,
     "start": "2026-05-22"
    },
    {
     "id": "d011",
     "name": "Mercado Pago (MSI TC BBVA)",
     "type": "other",
     "total": 2151,
     "balance": 0,
     "rate": 0,
     "min": 717,
     "day": 22,
     "start": "2026-05-22"
    },
    {
     "id": "d012",
     "name": "Deuda del departamento",
     "type": "loan",
     "total": 13000,
     "balance": 0,
     "rate": 0,
     "min": 0,
     "day": 0,
     "start": "2026-09-16"
    }
   ],
   "investments": [
    {
     "id": "i004",
     "name": "Depósito de renta",
     "type": "otro",
     "invested": 11250,
     "value": 11250,
     "date": "2024-01-01",
     "rate": 0
    }
   ],
   "activos": [
    {
     "id": "ac001",
     "name": "BYD Dolphin Mini",
     "type": "vehiculo",
     "value": 415000
    },
    {
     "id": "ac002",
     "name": "iPhone 15",
     "type": "electronico",
     "value": 14000
    },
    {
     "id": "ac003",
     "name": "Apple Watch",
     "type": "electronico",
     "value": 9500
    },
    {
     "id": "ac004",
     "name": "Monitores HP (x2)",
     "type": "electronico",
     "value": 4000
    },
    {
     "id": "ac005",
     "name": "iPad 11",
     "type": "electronico",
     "value": 10000
    },
    {
     "id": "ac006",
     "name": "Control PS5",
     "type": "electronico",
     "value": 5000
    },
    {
     "id": "ac015",
     "name": "PS5",
     "type": "electronico",
     "value": 5000
    },
    {
     "id": "ac007",
     "name": "PC Zephyrus G16",
     "type": "electronico",
     "value": 50000
    },
    {
     "id": "ac008",
     "name": "Silla Interstuhl",
     "type": "mueble",
     "value": 3000
    },
    {
     "id": "ac009",
     "name": "Monitor portátil",
     "type": "electronico",
     "value": 1500
    },
    {
     "id": "ac010",
     "name": "iPhone 15 Pro Max",
     "type": "electronico",
     "value": 15000
    },
    {
     "id": "ac011",
     "name": "iPhone 12 Mini",
     "type": "electronico",
     "value": 3600
    },
    {
     "id": "ac012",
     "name": "Pantalla 50 pulgadas",
     "type": "electronico",
     "value": 5000
    },
    {
     "id": "ac013",
     "name": "Cuenta BBVA",
     "type": "liquido",
     "value": 1300
    },
    {
     "id": "ac014",
     "name": "Efectivo",
     "type": "liquido",
     "value": 600
    }
   ],
   "goals": [
    {
     "id": "ef-001",
     "name": "Fondo de emergencia (CETES)",
     "icon": "🛡️",
     "target": 10000,
     "current": 6000,
     "date": ""
    },
    {
     "id": "g001",
     "name": "Maestría en Alemania",
     "icon": "🎓",
     "target": 398000,
     "date": "2027-09-01"
    }
   ],
   "btcHistory": [
    {
     "id": "total",
     "btc": 0.000041,
     "usd": 5485
    }
   ],
   "currentBtcPrice": 76953,
   "usdMxn": 18.58,
   "emergencyFund": 6000
  }
};
