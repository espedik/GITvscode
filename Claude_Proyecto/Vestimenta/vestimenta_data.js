// ─── DATOS: guardarropa y guía de compras de Adán ─────────────────────────────
// Precios en MXN, rangos aproximados de tiendas disponibles en CDMX (2026). No son
// precios en vivo de ninguna API — hay que revisarlos de vez en cuando a mano.
//
// Los links de compra (campo `u`) son la tienda oficial real de cada marca en México,
// verificados uno por uno (código 200/302 con navegador real, no solo por nombre) el
// 2026-08-03 — varias búsquedas por "tienda oficial México" de estas marcas devuelven
// sobre todo dominios apócrifos/typosquatting (uniqlomx.com.mx, aldo-mexico.com,
// lacoste-mexico.com.mx, etc., ninguno es el sitio real). Donde no existe una tienda
// oficial mexicana verificable, se deja sin link (ver notas por marca abajo) en vez de
// inventar uno.

const BASICOS = [
  {id:'b1', img:'images/basicos/playera-blanca-lisa.jpg', nombre:'Playera blanca lisa',
    uso:'La base de casi cualquier outfit casual — sola, debajo de una camisa abierta o de una chamarra.',
    compra:[{t:'Uniqlo (Supima/Airism)',p:'$299-399'},{t:'Zara',p:'$299-449',u:'https://www.zara.com/mx/'},{t:'H&M (paquete de 2-3)',p:'$199-299 c/u',u:'https://www2.hm.com/es_mx/index.html'}],
    tip:'Compra 3-4 — es la prenda que más se desgasta con uso diario. No inviertas de más aquí.'},
  {id:'b2', img:'images/basicos/playera-negra-lisa.jpg', nombre:'Playera negra lisa',
    uso:'Igual de versátil que la blanca, pero disimula más y se ve mejor de noche — tu base para looks de fiesta.',
    compra:[{t:'Uniqlo',p:'$299-399'},{t:'Zara',p:'$299-449',u:'https://www.zara.com/mx/'},{t:'H&M',p:'$199-299',u:'https://www2.hm.com/es_mx/index.html'}],
    tip:'Igual que la blanca: ten 2-3, no solo una.'},
  {id:'b3', img:'images/basicos/jeans-azul-clasico.jpg', nombre:'Jeans azul clásico (corte recto/slim)',
    uso:'La prenda que más combinaciones desbloquea — de casual de fin de semana hasta viernes de oficina.',
    compra:[{t:'Levi\'s 511/505',p:'$999-1,499',u:'https://www.levi.com.mx/'},{t:'Zara',p:'$699-899',u:'https://www.zara.com/mx/'},{t:'C&A / Suburbia',p:'$499-699',u:'https://www.cyc.com.mx/'}],
    tip:'Prioriza corte recto o slim (no skinny, no ancho) — es el que mejor combina con zapato formal y sneaker por igual.'},
  {id:'b4', img:'images/basicos/pantalon-chino-caqui.jpg', nombre:'Pantalón chino caqui',
    uso:'El puente entre casual y trabajo — más formal que un jean, más cómodo que un pantalón de vestir.',
    compra:[{t:'Dockers',p:'$899-1,199',u:'https://www.dockers.com.mx/'},{t:'Zara',p:'$699-899',u:'https://www.zara.com/mx/'},{t:'H&M',p:'$549-699',u:'https://www2.hm.com/es_mx/index.html'}],
    tip:'Un caqui y un azul marino cubren el 90% de los casos — no necesitas más de 2 colores para empezar.'},
  {id:'b5', img:'images/basicos/camisa-vestir-blanca.jpg', nombre:'Camisa de vestir blanca',
    uso:'Pieza obligatoria para oficina y bodas — la más "cara" en percepción por el precio que realmente cuesta.',
    compra:[{t:'Zara',p:'$599-799',u:'https://www.zara.com/mx/'},{t:'Massimo Dutti',p:'$999-1,299',u:'https://www.massimodutti.com/mx/'},{t:'Amazon (Van Heusen/Perry Ellis outlet)',p:'$450-650',u:'https://www.amazon.com.mx/'}],
    tip:'Busca "easy iron" o "no plancha" — te ahorra tiempo entre semana antes de entrar a ALTEN.'},
  {id:'b6', img:'images/basicos/sudadera-hoodie.jpg', nombre:'Sudadera / hoodie',
    uso:'Capa intermedia para el clima frío de CDMX (octubre-febrero) y para los días de home office.',
    compra:[{t:'Nike',p:'$999-1,399',u:'https://www.nike.com/mx/'},{t:'Adidas',p:'$999-1,399',u:'https://www.adidas.mx/'},{t:'Zara / Bershka',p:'$499-699',u:'https://www.bershka.com/mx/'},{t:'Amazon básicos',p:'$350-500',u:'https://www.amazon.com.mx/'}],
    tip:'Gris, negro o azul marino — evita estampados grandes si quieres que combine con todo lo demás.'},
  {id:'b7', img:'images/basicos/polo-pique.jpg', nombre:'Polo piqué',
    uso:'Punto medio entre playera y camisa — "smart casual" para un sábado arreglado o una junta informal.',
    compra:[{t:'Zara / C&A',p:'$399-599',u:'https://www.zara.com/mx/'},{t:'Nautica (outlet)',p:'$700-900',u:'https://www.nautica.com.mx/'},{t:'Lacoste (aspiracional)',p:'$1,999+',u:'https://www.lacoste.com/mx/'}],
    tip:'Con un chino y mocasín es de los combos que más rinden por peso invertido.'},
  {id:'b8', img:'images/basicos/cinturon-cuero.jpg', nombre:'Cinturón de piel (café o negro, o reversible)',
    uso:'Detalle que se nota más de lo que parece — combina con zapato derby y mocasín, obligatorio con chino/vestir.',
    compra:[{t:'Amazon (piel genuina)',p:'$250-400',u:'https://www.amazon.com.mx/'},{t:'Zara',p:'$399-499',u:'https://www.zara.com/mx/'},{t:'Aldo',p:'$500-700',u:'https://www.elpalaciodehierro.com/marcas/aldo/'}],
    tip:'Si compras uno reversible café/negro te ahorras comprar dos.'},
];

const CHAQUETAS = [
  {id:'c1', img:'images/chaquetas/chamarra-mezclilla.jpg', nombre:'Chamarra de mezclilla (denim/trucker)',
    uso:'Capa casual todo terreno — funciona sola en clima templado o como capa extra sobre un hoodie en frío.',
    compra:[{t:'Levi\'s Trucker',p:'$1,499-1,899',u:'https://www.levi.com.mx/'},{t:'Zara / Bershka',p:'$699-999',u:'https://www.bershka.com/mx/'},{t:'Pull&Bear',p:'$599-799',u:'https://www.pullandbear.com/mx/'}],
    tip:'Es de las piezas con mejor relación uso/precio de todo el clóset — combina con casi cualquier básico de la lista.'},
  {id:'c2', img:'images/chaquetas/chamarra-bomber.jpg', nombre:'Chamarra bomber',
    uso:'Look urbano, clima templado (marzo-mayo, septiembre-octubre en CDMX) — más deportiva que la de mezclilla.',
    compra:[{t:'Zara / Bershka',p:'$799-1,199',u:'https://www.bershka.com/mx/'},{t:'Nike Sportswear',p:'$1,499-1,999',u:'https://www.nike.com/mx/'},{t:'Amazon',p:'$600-900',u:'https://www.amazon.com.mx/'}],
    tip:'Negra o verde militar son las que menos pasan de moda.'},
  {id:'c3', img:'images/chaquetas/chamarra-cuero.jpg', nombre:'Chamarra de cuero (biker)',
    uso:'La pieza que más "eleva" un outfit de fiesta o casual nocturno — inversión más fuerte, pero dura años.',
    compra:[{t:'Zara (piel sintética, buena opción de entrada)',p:'$1,999-2,999',u:'https://www.zara.com/mx/'},{t:'Piel genuina en outlet/segunda mano (Marketplace, Bazar del Chopo)',p:'$1,500-3,000+'}],
    tip:'Con tu situación de deuda actual, esta es de las últimas en la lista de prioridad — no es esencial, es "cuando el presupuesto lo permita".'},
  {id:'c4', img:'images/chaquetas/rompevientos.jpg', nombre:'Rompevientos / impermeable ligero',
    uso:'Para ciclismo, senderismo (ver sección Deportes en Mi Rutina) y la temporada de lluvias de CDMX (junio-septiembre).',
    compra:[{t:'Decathlon (Quechua)',p:'$499-799',u:'https://www.decathlon.com.mx/'},{t:'Adidas',p:'$899-1,299',u:'https://www.adidas.mx/'},{t:'Nike / Columbia',p:'$999-1,599',u:'https://www.columbia.com.mx/'}],
    tip:'Empaquetable (se dobla en su propia bolsa) si planeas llevarlo en mochila para salidas en bici o senderismo.'},
  {id:'c5', img:'images/chaquetas/chamarra-acolchada-puffer.jpg', nombre:'Chamarra acolchada (puffer)',
    uso:'Para las mañanas frías de diciembre-enero en CDMX — más abrigo que un hoodie, más ligera que un abrigo.',
    compra:[{t:'Uniqlo Ultra Light Down (mejor relación calidad-precio)',p:'$999-1,299'},{t:'Zara',p:'$1,199-1,699',u:'https://www.zara.com/mx/'},{t:'Columbia',p:'$1,499-1,999',u:'https://www.columbia.com.mx/'}],
    tip:'La versión "ultra light" se compacta en su bolsillo — útil si viajas a Alemania por la Maestría, donde el frío es serio de verdad. Ojo: Uniqlo no tiene tienda oficial en México (ver nota de abajo) — esta opción es para comprarla durante un viaje a EUA/España/Alemania, o vía reventa verificada.'},
  {id:'c6', img:'images/chaquetas/blazer-casual.jpg', nombre:'Blazer casual (no de traje)',
    uso:'Sube de nivel un jean+playera para una cena o evento semi-formal sin llegar a traje completo.',
    compra:[{t:'C&A',p:'$799-1,099',u:'https://www.cyc.com.mx/'},{t:'Zara / H&M',p:'$999-1,499',u:'https://www.zara.com/mx/'},{t:'Massimo Dutti',p:'$1,899-2,499',u:'https://www.massimodutti.com/mx/'}],
    tip:'Azul marino es el color que más veces vas a poder reusar, en trabajo y en fiesta.'},
];

const ZAPATOS = [
  {id:'z1', img:'images/zapatos/sneakers-blancos.jpg', nombre:'Sneakers blancos minimalistas',
    uso:'El zapato más versátil del clóset — combina con todo excepto trabajo formal y bodas.',
    compra:[{t:'Amazon / marcas propias',p:'$500-800',u:'https://www.amazon.com.mx/'},{t:'Zara / C&A',p:'$699-999',u:'https://www.zara.com/mx/'},{t:'Adidas Stan Smith',p:'$1,799-2,199',u:'https://www.adidas.mx/'}],
    tip:'Blancos lisos, sin logos grandes — se ven bien más tiempo y no pasan de moda cada temporada.'},
  {id:'z2', img:'images/zapatos/botines-chelsea.jpg', nombre:'Botines Chelsea',
    uso:'Puente entre casual y semi-formal, buenos compañeros del jean o el chino en clima frío.',
    compra:[{t:'Zara',p:'$999-1,399',u:'https://www.zara.com/mx/'},{t:'Flexi',p:'$1,299-1,699',u:'https://www.flexi.com.mx/'},{t:'Aldo',p:'$1,599-2,199',u:'https://www.elpalaciodehierro.com/marcas/aldo/'}],
    tip:'Negro combina con más piezas que café si solo vas a comprar un par.'},
  {id:'z3', img:'images/zapatos/zapato-derby-cafe.jpg', nombre:'Zapato derby café',
    uso:'Para trabajo y para bodas de día — el zapato formal que más veces vas a usar.',
    compra:[{t:'Amazon (marcas propias)',p:'$700-999',u:'https://www.amazon.com.mx/'},{t:'Flexi',p:'$1,199-1,599',u:'https://www.flexi.com.mx/'},{t:'Aldo',p:'$1,499-1,999',u:'https://www.elpalaciodehierro.com/marcas/aldo/'}],
    tip:'Café combina con chino y jean azul mejor que el negro — el negro resérvalo para trajes.'},
  {id:'z4', img:'images/zapatos/tenis-running.jpg', nombre:'Tenis de running',
    uso:'Específicos para correr o caminata larga — no son los mismos que necesitas para levantar peso en el gym.',
    compra:[{t:'Innovasport (outlet, ofertas frecuentes)',p:'variable',u:'https://www.innovasport.com/'},{t:'Adidas Runfalcon / Nike Revolution',p:'$1,299-1,799',u:'https://www.adidas.mx/'},{t:'Asics Gel',p:'$2,199-2,999',u:'https://www.asics.com/mx/es-mx/'}],
    tip:'Si vas a correr en serio, ve a que te midan la pisada — evita lesiones de rodilla a la larga.'},
  {id:'z5', img:'images/zapatos/tenis-entrenamiento-cruzado.jpg', nombre:'Tenis de entrenamiento cruzado (cross-training)',
    uso:'Suela plana y estable para sentadilla/peso muerto — distintos a los de running, clave si Hyrox va en serio (ver sección Deportes en Mi Rutina).',
    compra:[{t:'Reebok Nano',p:'$2,499-3,199',u:'https://www.reebok.mx/'},{t:'Nike Metcon',p:'$2,999-3,699',u:'https://www.nike.com/mx/'}],
    tip:'Es la inversión de zapato con mayor prioridad si de verdad te metes a entrenar para Hyrox — un tenis de running pierde estabilidad al levantar peso.'},
  {id:'z6', img:'images/zapatos/mocasines.jpg', nombre:'Mocasines',
    uso:'Para trabajo casual o eventos donde el tenis no encaja pero el traje tampoco.',
    compra:[{t:'Amazon',p:'$600-900',u:'https://www.amazon.com.mx/'},{t:'Flexi',p:'$999-1,399',u:'https://www.flexi.com.mx/'},{t:'Aldo',p:'$1,299-1,799',u:'https://www.elpalaciodehierro.com/marcas/aldo/'}],
    tip:'Sin calcetín visible (calcetín invisible) es el look que mejor le queda a este zapato.'},
];

// Accesorios — nueva categoría (2026-08-03), pedida explícitamente por Adán junto con
// mejores fotos y links reales. Mismo formato que Básicos/Chaquetas/Zapatos.
const ACCESORIOS = [
  {id:'a1', img:'images/accesorios/reloj.jpg', nombre:'Reloj análogo (acero, esfera oscura)',
    uso:'El único accesorio que se nota en cualquier outfit, de la oficina a una boda — una pieza sencilla y de calidad rinde más que varias baratas.',
    compra:[{t:'Casio (colección "duro/dive", buena entrada)',p:'$800-1,500',u:'https://www.amazon.com.mx/'},{t:'Fossil',p:'$2,000-3,500',u:'https://www.amazon.com.mx/'},{t:'Tommy Hilfiger (outlet)',p:'$1,800-2,800',u:'https://www.amazon.com.mx/'}],
    tip:'Correa de acero o piel negra/café combina con más outfits que una de colores — es la que más vas a usar a diario.'},
  {id:'a2', img:'images/accesorios/lentes-sol.jpg', nombre:'Lentes de sol (aviador o Wayfarer clásico)',
    uso:'Protección real (CDMX está a 2,240 msnm, la radiación UV es más fuerte) y el accesorio que más rápido "sube" un outfit casual.',
    compra:[{t:'Ray-Ban',p:'$2,800-4,200',u:'https://www.ray-ban.com/mexico'},{t:'Hawkers (opción económica)',p:'$600-900',u:'https://www.amazon.com.mx/'},{t:'Polaroid (buena relación calidad-precio)',p:'$800-1,200',u:'https://www.amazon.com.mx/'}],
    tip:'Confirma que digan "protección UV400" — unos lentes oscuros sin ese filtro dilatan la pupila y dejan pasar más luz dañina, no menos.'},
  {id:'a3', img:'images/accesorios/mochila.jpg', nombre:'Mochila de trabajo/diario (lona o piel, corte limpio)',
    uso:'Para la laptop, la ropa de gym y el día a día — una mochila de corte limpio (no de mezclilla o outdoor técnico) se ve bien encima de cualquier outfit de la lista.',
    compra:[{t:'Herschel',p:'$1,800-2,600',u:'https://www.amazon.com.mx/'},{t:'Tommy Hilfiger / Nike (versión urbana, no deportiva técnica)',p:'$1,200-2,000',u:'https://www.nike.com/mx/'},{t:'Amazon (lona, buena entrada)',p:'$500-900',u:'https://www.amazon.com.mx/'}],
    tip:'Un solo color sólido (negro, azul marino, verde olivo) combina con más outfits que una con estampados o muchos colores.'},
  {id:'a4', img:'images/accesorios/corbata.jpg', nombre:'Corbata lisa o de patrón sutil (azul marino o vino)',
    uso:'Para boda formal de noche o una junta importante — una corbata de mal gusto arruina un traje bueno, y una buena eleva uno sencillo.',
    compra:[{t:'Zara',p:'$399-599',u:'https://www.zara.com/mx/'},{t:'Massimo Dutti',p:'$699-999',u:'https://www.massimodutti.com/mx/'},{t:'Amazon (seda, buena entrada)',p:'$300-500',u:'https://www.amazon.com.mx/'}],
    tip:'Patrón geométrico pequeño o lisa — evita estampados grandes, animal print o "de ocurrencia" (es para elevar el traje, no para llamar la atención).'},
  {id:'a5', img:'images/accesorios/cartera.jpg', nombre:'Cartera delgada (bifold o cardholder)',
    uso:'Una cartera abultada de tanta tarjeta/recibo se nota bajo el pantalón — una versión delgada de piel se ve mejor y dura más.',
    compra:[{t:'Amazon (piel genuina, buena entrada)',p:'$300-500',u:'https://www.amazon.com.mx/'},{t:'Fossil',p:'$800-1,300',u:'https://www.amazon.com.mx/'},{t:'Aldo',p:'$600-900',u:'https://www.elpalaciodehierro.com/marcas/aldo/'}],
    tip:'Formato "cardholder" (solo tarjetas + unos billetes doblados) si ya usas poco el efectivo — es lo que menos abulta.'},
];

// Combos por ocasión — reutilizan piezas de BASICOS/CHAQUETAS/ZAPATOS/ACCESORIOS por id cuando aplica.
const OCASIONES = {
  trabajo: {
    titulo:'💼 Trabajo', icoBadge:'ALTEN · oficina',
    intro:'Business casual, no traje completo todos los días — confirma el código real de tu equipo antes de invertir fuerte, pero estos 3 combos cubren el rango completo de "seguro" a "arreglado".',
    combos:[
      {img:'images/trabajo/outfit-business-casual.jpg', nombre:'El uniforme seguro de oficina',
        desc:'La combinación que nunca falla para un día normal en ALTEN — profesional sin verte forzado.',
        piezas:['Camisa de vestir blanca','Chino caqui','Zapato derby café','Cinturón de piel'], total:'$2,850-4,200 (si compras todo nuevo)'},
      {img:'images/trabajo/pantalon-vestir-oficina.jpg', nombre:'Viernes casual',
        desc:'Para cuando el ambiente se relaja al final de la semana — igual de cómodo que un fin de semana, un poco más arreglado.',
        piezas:['Jeans azul (oscuro, sin roturas)','Polo piqué','Mocasines'], total:'$2,300-3,600'},
      {img:'images/trabajo/outfit-business-casual.jpg', nombre:'Con blazer, para una junta importante',
        desc:'Cuando necesitas verte un nivel arriba — presentación, entrevista interna, junta con cliente.',
        piezas:['Chino caqui','Camisa de vestir blanca','Blazer casual azul marino','Zapato derby','Reloj análogo'], total:'$4,450-6,900 (sumando blazer y reloj)'},
    ]},
  casual: {
    titulo:'🙂 Casual', icoBadge:'Día a día',
    intro:'El default de cuando no hay ocasión especial — la mayoría de tus días fuera del trabajo.',
    combos:[
      {img:'images/casual/outfit-casual-diario.jpg', nombre:'El default de fin de semana',
        desc:'Playera + jean + chamarra + sneaker — el combo que resuelve el 80% de los días sin pensarlo.',
        piezas:['Playera blanca o negra','Jeans azul clásico','Chamarra de mezclilla','Sneakers blancos'], total:'$2,400-3,700'},
      {img:'images/casual/outfit-casual-fin-semana.jpg', nombre:'Casual arreglado',
        desc:'Para comer fuera o una junta informal de negocio (freelance, mentoría) sin verte de oficina ni de flojera.',
        piezas:['Polo piqué','Pantalón chino','Mocasines','Lentes de sol'], total:'$3,100-4,800 (sumando lentes)'},
    ]},
  ejercicio: {
    titulo:'🏋️ Ejercicio', icoBadge:'Gym y Hyrox',
    intro:'Tu split de Brazos/Piernas trackeado en Mi Rutina no exige ropa especial, pero si te metes en serio a Hyrox sí importa el tenis correcto.',
    combos:[
      {img:'images/ejercicio/outfit-gym-entrenamiento.jpg', nombre:'Entrenamiento de fuerza (tu split actual)',
        desc:'Lo único que realmente cambia el resultado aquí es el tenis — con suela plana tienes más estabilidad en sentadilla y peso muerto que con un tenis de running.',
        piezas:['Playera técnica dry-fit','Shorts o joggers deportivos','Tenis de entrenamiento cruzado'], total:'$2,800-4,200 (el tenis es la mayor parte del costo)'},
      {img:'images/ejercicio/outfit-gym-entrenamiento.jpg', nombre:'Si Hyrox va en serio',
        desc:'Mismo combo, pero prioriza el tenis de cross-training sobre cualquier otra pieza — es literalmente la diferencia entre entrenar bien o entrenar lesionándote la estabilidad.',
        piezas:['Playera técnica dry-fit','Guantes o straps para sled push (opcional)','Tenis de entrenamiento cruzado'], total:'$3,000-4,000'},
    ]},
  bodas: {
    titulo:'💍 Bodas', icoBadge:'Invitado',
    intro:'Dos rutas según el tipo de boda — y dado que hoy priorizas liquidar deuda antes que gastar en ropa de un solo uso, renta antes de comprar si es una boda ocasional.',
    combos:[
      {img:'images/bodas/traje-formal-boda.jpg', nombre:'Boda formal de noche',
        desc:'Traje completo azul marino o gris — la opción segura para una boda de etiqueta o salón por la noche.',
        piezas:['Traje completo (azul marino o gris)','Camisa de vestir blanca','Corbata','Zapato oxford negro (o derby)','Reloj análogo'], total:'Renta $800-1,500 · compra $2,900-5,000'},
      {img:'images/bodas/corbata-formal.jpg', nombre:'Boda de día / jardín (muy común en México)',
        desc:'Mucho más barata que un traje completo y perfectamente aceptada en bodas mexicanas de día o al aire libre.',
        piezas:['Guayabera o camisa de lino','Pantalón de vestir claro','Mocasín o derby café (sin corbata)'], total:'$1,800-3,000'},
    ]},
  fiestas: {
    titulo:'🎉 Fiestas', icoBadge:'Salir de noche',
    intro:'El look clásico de "salir de noche" — y la buena noticia es que si ya compraste lo de Básicos/Chaquetas/Zapatos, no necesitas comprar nada nuevo para esto.',
    combos:[
      {img:'images/fiestas/outfit-noche-fiesta.jpg', nombre:'Salir de noche',
        desc:'Reutiliza piezas que ya están en tu lista de básicos y chaquetas — esta es la ocasión con menor costo incremental de todas.',
        piezas:['Playera negra o camisa estampada','Jeans azul oscuro','Chamarra de cuero (o bomber)','Sneakers blancos o botines Chelsea'], total:'$0 extra si ya tienes lo de arriba'},
      {img:'images/fiestas/camisa-estampada-casual.jpg', nombre:'Con camisa estampada',
        desc:'Variante más relajada — cambia la playera negra por una camisa con estampado sutil, sin fajar.',
        piezas:['Camisa estampada','Jeans azul oscuro','Sneakers blancos'], total:'$700-1,200 (solo la camisa, si no la tienes)'},
    ]},
};

// Plan de compra por fases — mismo lenguaje de "Fases" que ya usas en tu Plan Maestro (Coach).
const FASES = [
  {n:'Fase 1', t:'Lo esencial ya', items:['Playera blanca','Playera negra','Jeans azul clásico','Sneakers blancos','Chamarra de mezclilla'], costo:'$2,500-3,500'},
  {n:'Fase 2', t:'Para el trabajo', items:['Camisa de vestir blanca','Pantalón chino','Zapato derby café','Cinturón de piel'], costo:'$2,850-4,200'},
  {n:'Fase 3', t:'Para variar', items:['Hoodie','Polo piqué','Botines Chelsea','Blazer casual o puffer (según temporada)'], costo:'$2,700-4,000'},
  {n:'Fase 4', t:'Opcional / cuando alcance', items:['Chamarra de cuero','Tenis de cross-training (si Hyrox va en serio)','Traje de boda (mejor rentar primero)','Reloj, lentes de sol, mochila, corbata y cartera (ver Accesorios)'], costo:'Variable — sin prisa'},
];
