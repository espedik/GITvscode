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
  {id:'b1', nombre:'Playera blanca lisa',
    uso:'La base de casi cualquier outfit casual — sola, debajo de una camisa abierta o de una chamarra.',
    compra:[{t:'Uniqlo (Supima/Airism)',p:'$299-399'},{t:'Zara',p:'$299-449',u:'https://www.zara.com/mx/'},{t:'H&M (paquete de 2-3)',p:'$199-299 c/u',u:'https://www2.hm.com/es_mx/index.html'}],
    tip:'Compra 3-4 — es la prenda que más se desgasta con uso diario. No inviertas de más aquí.'},
  {id:'b2', nombre:'Playera negra lisa',
    uso:'Igual de versátil que la blanca, pero disimula más y se ve mejor de noche — tu base para looks de fiesta.',
    compra:[{t:'Uniqlo',p:'$299-399'},{t:'Zara',p:'$299-449',u:'https://www.zara.com/mx/'},{t:'H&M',p:'$199-299',u:'https://www2.hm.com/es_mx/index.html'}],
    tip:'Igual que la blanca: ten 2-3, no solo una.'},
  {id:'b3', nombre:'Jeans azul clásico (corte recto/slim)',
    uso:'La prenda que más combinaciones desbloquea — de casual de fin de semana hasta viernes de oficina.',
    compra:[{t:'Levi\'s 511/505',p:'$999-1,499',u:'https://www.levi.com.mx/'},{t:'Zara',p:'$699-899',u:'https://www.zara.com/mx/'},{t:'C&A / Suburbia',p:'$499-699',u:'https://www.cyc.com.mx/'}],
    tip:'Prioriza corte recto o slim (no skinny, no ancho) — es el que mejor combina con zapato formal y sneaker por igual.'},
  {id:'b4', nombre:'Pantalón chino caqui',
    uso:'El puente entre casual y trabajo — más formal que un jean, más cómodo que un pantalón de vestir.',
    compra:[{t:'Dockers',p:'$899-1,199',u:'https://www.dockers.com.mx/'},{t:'Zara',p:'$699-899',u:'https://www.zara.com/mx/'},{t:'H&M',p:'$549-699',u:'https://www2.hm.com/es_mx/index.html'}],
    tip:'Un caqui y un azul marino cubren el 90% de los casos — no necesitas más de 2 colores para empezar.'},
  {id:'b5', nombre:'Camisa de vestir blanca',
    uso:'Pieza obligatoria para oficina y bodas — la más "cara" en percepción por el precio que realmente cuesta.',
    compra:[{t:'Zara',p:'$599-799',u:'https://www.zara.com/mx/'},{t:'Massimo Dutti',p:'$999-1,299',u:'https://www.massimodutti.com/mx/'},{t:'Amazon (Van Heusen/Perry Ellis outlet)',p:'$450-650',u:'https://www.amazon.com.mx/'}],
    tip:'Busca "easy iron" o "no plancha" — te ahorra tiempo entre semana antes de entrar a ALTEN.'},
  {id:'b6', nombre:'Sudadera / hoodie',
    uso:'Capa intermedia para el clima frío de CDMX (octubre-febrero) y para los días de home office.',
    compra:[{t:'Nike',p:'$999-1,399',u:'https://www.nike.com/mx/'},{t:'Adidas',p:'$999-1,399',u:'https://www.adidas.mx/'},{t:'Zara / Bershka',p:'$499-699',u:'https://www.bershka.com/mx/'},{t:'Amazon básicos',p:'$350-500',u:'https://www.amazon.com.mx/'}],
    tip:'Gris, negro o azul marino — evita estampados grandes si quieres que combine con todo lo demás.'},
  {id:'b7', nombre:'Polo piqué',
    uso:'Punto medio entre playera y camisa — "smart casual" para un sábado arreglado o una junta informal.',
    compra:[{t:'Zara / C&A',p:'$399-599',u:'https://www.zara.com/mx/'},{t:'Nautica (outlet)',p:'$700-900',u:'https://www.nautica.com.mx/'},{t:'Lacoste (aspiracional)',p:'$1,999+',u:'https://www.lacoste.com/mx/'}],
    tip:'Con un chino y mocasín es de los combos que más rinden por peso invertido.'},
  {id:'b8', nombre:'Cinturón de piel (café o negro, o reversible)',
    uso:'Detalle que se nota más de lo que parece — combina con zapato derby y mocasín, obligatorio con chino/vestir.',
    compra:[{t:'Amazon (piel genuina)',p:'$250-400',u:'https://www.amazon.com.mx/'},{t:'Zara',p:'$399-499',u:'https://www.zara.com/mx/'},{t:'Aldo',p:'$500-700',u:'https://www.elpalaciodehierro.com/marcas/aldo/'}],
    tip:'Si compras uno reversible café/negro te ahorras comprar dos.'},
];

const CHAQUETAS = [
  {id:'c1', nombre:'Chamarra de mezclilla (denim/trucker)',
    uso:'Capa casual todo terreno — funciona sola en clima templado o como capa extra sobre un hoodie en frío.',
    compra:[{t:'Levi\'s Trucker',p:'$1,499-1,899',u:'https://www.levi.com.mx/'},{t:'Zara / Bershka',p:'$699-999',u:'https://www.bershka.com/mx/'},{t:'Pull&Bear',p:'$599-799',u:'https://www.pullandbear.com/mx/'}],
    tip:'Es de las piezas con mejor relación uso/precio de todo el clóset — combina con casi cualquier básico de la lista.'},
  {id:'c2', nombre:'Chamarra bomber',
    uso:'Look urbano, clima templado (marzo-mayo, septiembre-octubre en CDMX) — más deportiva que la de mezclilla.',
    compra:[{t:'Zara / Bershka',p:'$799-1,199',u:'https://www.bershka.com/mx/'},{t:'Nike Sportswear',p:'$1,499-1,999',u:'https://www.nike.com/mx/'},{t:'Amazon',p:'$600-900',u:'https://www.amazon.com.mx/'}],
    tip:'Negra o verde militar son las que menos pasan de moda.'},
  {id:'c3', nombre:'Chamarra de cuero (biker)',
    uso:'La pieza que más "eleva" un outfit de fiesta o casual nocturno — inversión más fuerte, pero dura años.',
    compra:[{t:'Zara (piel sintética, buena opción de entrada)',p:'$1,999-2,999',u:'https://www.zara.com/mx/'},{t:'Piel genuina en outlet/segunda mano (Marketplace, Bazar del Chopo)',p:'$1,500-3,000+'}],
    tip:'Con tu situación de deuda actual, esta es de las últimas en la lista de prioridad — no es esencial, es "cuando el presupuesto lo permita".'},
  {id:'c4', nombre:'Rompevientos / impermeable ligero',
    uso:'Para ciclismo, senderismo (ver sección Deportes en Mi Rutina) y la temporada de lluvias de CDMX (junio-septiembre).',
    compra:[{t:'Decathlon (Quechua)',p:'$499-799',u:'https://www.decathlon.com.mx/'},{t:'Adidas',p:'$899-1,299',u:'https://www.adidas.mx/'},{t:'Nike / Columbia',p:'$999-1,599',u:'https://www.columbia.com.mx/'}],
    tip:'Empaquetable (se dobla en su propia bolsa) si planeas llevarlo en mochila para salidas en bici o senderismo.'},
  {id:'c5', nombre:'Chamarra acolchada (puffer)',
    uso:'Para las mañanas frías de diciembre-enero en CDMX — más abrigo que un hoodie, más ligera que un abrigo.',
    compra:[{t:'Uniqlo Ultra Light Down (mejor relación calidad-precio)',p:'$999-1,299'},{t:'Zara',p:'$1,199-1,699',u:'https://www.zara.com/mx/'},{t:'Columbia',p:'$1,499-1,999',u:'https://www.columbia.com.mx/'}],
    tip:'La versión "ultra light" se compacta en su bolsillo — útil si viajas a Alemania por la Maestría, donde el frío es serio de verdad. Ojo: Uniqlo no tiene tienda oficial en México (ver nota de abajo) — esta opción es para comprarla durante un viaje a EUA/España/Alemania, o vía reventa verificada.'},
  {id:'c6', nombre:'Blazer casual (no de traje)',
    uso:'Sube de nivel un jean+playera para una cena o evento semi-formal sin llegar a traje completo.',
    compra:[{t:'C&A',p:'$799-1,099',u:'https://www.cyc.com.mx/'},{t:'Zara / H&M',p:'$999-1,499',u:'https://www.zara.com/mx/'},{t:'Massimo Dutti',p:'$1,899-2,499',u:'https://www.massimodutti.com/mx/'}],
    tip:'Azul marino es el color que más veces vas a poder reusar, en trabajo y en fiesta.'},
];

const ZAPATOS = [
  {id:'z1', nombre:'Sneakers blancos minimalistas',
    uso:'El zapato más versátil del clóset — combina con todo excepto trabajo formal y bodas.',
    compra:[{t:'Amazon / marcas propias',p:'$500-800',u:'https://www.amazon.com.mx/'},{t:'Zara / C&A',p:'$699-999',u:'https://www.zara.com/mx/'},{t:'Adidas Stan Smith',p:'$1,799-2,199',u:'https://www.adidas.mx/'}],
    tip:'Blancos lisos, sin logos grandes — se ven bien más tiempo y no pasan de moda cada temporada.'},
  {id:'z2', nombre:'Botines Chelsea',
    uso:'Puente entre casual y semi-formal, buenos compañeros del jean o el chino en clima frío.',
    compra:[{t:'Zara',p:'$999-1,399',u:'https://www.zara.com/mx/'},{t:'Flexi',p:'$1,299-1,699',u:'https://www.flexi.com.mx/'},{t:'Aldo',p:'$1,599-2,199',u:'https://www.elpalaciodehierro.com/marcas/aldo/'}],
    tip:'Negro combina con más piezas que café si solo vas a comprar un par.'},
  {id:'z3', nombre:'Zapato derby café',
    uso:'Para trabajo y para bodas de día — el zapato formal que más veces vas a usar.',
    compra:[{t:'Amazon (marcas propias)',p:'$700-999',u:'https://www.amazon.com.mx/'},{t:'Flexi',p:'$1,199-1,599',u:'https://www.flexi.com.mx/'},{t:'Aldo',p:'$1,499-1,999',u:'https://www.elpalaciodehierro.com/marcas/aldo/'}],
    tip:'Café combina con chino y jean azul mejor que el negro — el negro resérvalo para trajes.'},
  {id:'z4', nombre:'Tenis de running',
    uso:'Específicos para correr o caminata larga — no son los mismos que necesitas para levantar peso en el gym.',
    compra:[{t:'Innovasport (outlet, ofertas frecuentes)',p:'variable',u:'https://www.innovasport.com/'},{t:'Adidas Runfalcon / Nike Revolution',p:'$1,299-1,799',u:'https://www.adidas.mx/'},{t:'Asics Gel',p:'$2,199-2,999',u:'https://www.asics.com/mx/es-mx/'}],
    tip:'Si vas a correr en serio, ve a que te midan la pisada — evita lesiones de rodilla a la larga.'},
  {id:'z5', nombre:'Tenis de entrenamiento cruzado (cross-training)',
    uso:'Suela plana y estable para sentadilla/peso muerto — distintos a los de running, clave si Hyrox va en serio (ver sección Deportes en Mi Rutina).',
    compra:[{t:'Reebok Nano',p:'$2,499-3,199',u:'https://www.reebok.mx/'},{t:'Nike Metcon',p:'$2,999-3,699',u:'https://www.nike.com/mx/'}],
    tip:'Es la inversión de zapato con mayor prioridad si de verdad te metes a entrenar para Hyrox — un tenis de running pierde estabilidad al levantar peso.'},
  {id:'z6', nombre:'Mocasines',
    uso:'Para trabajo casual o eventos donde el tenis no encaja pero el traje tampoco.',
    compra:[{t:'Amazon',p:'$600-900',u:'https://www.amazon.com.mx/'},{t:'Flexi',p:'$999-1,399',u:'https://www.flexi.com.mx/'},{t:'Aldo',p:'$1,299-1,799',u:'https://www.elpalaciodehierro.com/marcas/aldo/'}],
    tip:'Sin calcetín visible (calcetín invisible) es el look que mejor le queda a este zapato.'},
];

// Accesorios — nueva categoría (2026-08-03), pedida explícitamente por Adán junto con
// mejores fotos y links reales. Mismo formato que Básicos/Chaquetas/Zapatos.
const ACCESORIOS = [
  {id:'a1', nombre:'Reloj análogo (acero, esfera oscura)',
    uso:'El único accesorio que se nota en cualquier outfit, de la oficina a una boda — una pieza sencilla y de calidad rinde más que varias baratas.',
    compra:[{t:'Casio (colección "duro/dive", buena entrada)',p:'$800-1,500',u:'https://www.amazon.com.mx/'},{t:'Fossil',p:'$2,000-3,500',u:'https://www.amazon.com.mx/'},{t:'Tommy Hilfiger (outlet)',p:'$1,800-2,800',u:'https://www.amazon.com.mx/'}],
    tip:'Correa de acero o piel negra/café combina con más outfits que una de colores — es la que más vas a usar a diario.'},
  {id:'a2', nombre:'Lentes de sol (aviador o Wayfarer clásico)',
    uso:'Protección real (CDMX está a 2,240 msnm, la radiación UV es más fuerte) y el accesorio que más rápido "sube" un outfit casual.',
    compra:[{t:'Ray-Ban',p:'$2,800-4,200',u:'https://www.ray-ban.com/mexico'},{t:'Hawkers (opción económica)',p:'$600-900',u:'https://www.amazon.com.mx/'},{t:'Polaroid (buena relación calidad-precio)',p:'$800-1,200',u:'https://www.amazon.com.mx/'}],
    tip:'Confirma que digan "protección UV400" — unos lentes oscuros sin ese filtro dilatan la pupila y dejan pasar más luz dañina, no menos.'},
  {id:'a3', nombre:'Mochila de trabajo/diario (lona o piel, corte limpio)',
    uso:'Para la laptop, la ropa de gym y el día a día — una mochila de corte limpio (no de mezclilla o outdoor técnico) se ve bien encima de cualquier outfit de la lista.',
    compra:[{t:'Herschel',p:'$1,800-2,600',u:'https://www.amazon.com.mx/'},{t:'Tommy Hilfiger / Nike (versión urbana, no deportiva técnica)',p:'$1,200-2,000',u:'https://www.nike.com/mx/'},{t:'Amazon (lona, buena entrada)',p:'$500-900',u:'https://www.amazon.com.mx/'}],
    tip:'Un solo color sólido (negro, azul marino, verde olivo) combina con más outfits que una con estampados o muchos colores.'},
  {id:'a4', nombre:'Corbata lisa o de patrón sutil (azul marino o vino)',
    uso:'Para boda formal de noche o una junta importante — una corbata de mal gusto arruina un traje bueno, y una buena eleva uno sencillo.',
    compra:[{t:'Zara',p:'$399-599',u:'https://www.zara.com/mx/'},{t:'Massimo Dutti',p:'$699-999',u:'https://www.massimodutti.com/mx/'},{t:'Amazon (seda, buena entrada)',p:'$300-500',u:'https://www.amazon.com.mx/'}],
    tip:'Patrón geométrico pequeño o lisa — evita estampados grandes, animal print o "de ocurrencia" (es para elevar el traje, no para llamar la atención).'},
  {id:'a5', nombre:'Cartera delgada (bifold o cardholder)',
    uso:'Una cartera abultada de tanta tarjeta/recibo se nota bajo el pantalón — una versión delgada de piel se ve mejor y dura más.',
    compra:[{t:'Amazon (piel genuina, buena entrada)',p:'$300-500',u:'https://www.amazon.com.mx/'},{t:'Fossil',p:'$800-1,300',u:'https://www.amazon.com.mx/'},{t:'Aldo',p:'$600-900',u:'https://www.elpalaciodehierro.com/marcas/aldo/'}],
    tip:'Formato "cardholder" (solo tarjetas + unos billetes doblados) si ya usas poco el efectivo — es lo que menos abulta.'},
];

// Combos por ocasión. Cada pieza es {n, ids}: `ids` apunta a los productos reales de
// BASICOS/CHAQUETAS/ZAPATOS/ACCESORIOS, y de ahí salen la foto, el precio mínimo y si ya la
// tienes marcada. Varios ids = alternativas ("chamarra de cuero O bomber"): basta tener una.
// `ids:[]` es una prenda que NO está en el catálogo — pasa en Ejercicio y en las bodas, y la
// vista lo dice en vez de fingir que la cubre.
//
// Aquí quedan SOLO ejercicio y bodas: son las dos ocasiones que no se resuelven eligiendo
// color de playera y de pantalón. Trabajo, casual y fiestas las absorbió la sección de
// Combinaciones, que sale de la matriz de color.
const OCASIONES = {
  ejercicio: {
    titulo:'🏋️ Ejercicio', icoBadge:'Gym y Hyrox',
    intro:'Tu split de Brazos/Piernas trackeado en Mi Rutina no exige ropa especial, pero si te metes en serio a Hyrox sí importa el tenis correcto.',
    combos:[
      {nombre:'Entrenamiento de fuerza (tu split actual)',
        desc:'Lo único que realmente cambia el resultado aquí es el tenis — con suela plana tienes más estabilidad en sentadilla y peso muerto que con un tenis de running.',
        piezas:[{n:'Playera técnica dry-fit',ids:[]},{n:'Shorts o joggers deportivos',ids:[]},
                {n:'Tenis de entrenamiento cruzado',ids:['z5']}],
        total:'$2,800-4,200 (el tenis es la mayor parte del costo)'},
      {nombre:'Si Hyrox va en serio',
        desc:'Mismo combo, pero prioriza el tenis de cross-training sobre cualquier otra pieza — es literalmente la diferencia entre entrenar bien o entrenar lesionándote la estabilidad.',
        piezas:[{n:'Playera técnica dry-fit',ids:[]},{n:'Guantes o straps para sled push (opcional)',ids:[]},
                {n:'Tenis de entrenamiento cruzado',ids:['z5']}],
        total:'$3,000-4,000'},
    ]},
  bodas: {
    titulo:'💍 Bodas', icoBadge:'Invitado',
    intro:'Dos rutas según el tipo de boda — y dado que hoy priorizas liquidar deuda antes que gastar en ropa de un solo uso, renta antes de comprar si es una boda ocasional.',
    combos:[
      {nombre:'Boda formal de noche',
        desc:'Traje completo azul marino o gris — la opción segura para una boda de etiqueta o salón por la noche.',
        piezas:[{n:'Traje completo (azul marino o gris)',ids:[]},{n:'Camisa de vestir blanca',ids:['b5']},
                {n:'Corbata',ids:['a4']},{n:'Zapato oxford negro (o derby)',ids:['z3']},
                {n:'Reloj análogo',ids:['a1']}],
        total:'Renta $800-1,500 · compra $2,900-5,000'},
      {nombre:'Boda de día / jardín (muy común en México)',
        desc:'Mucho más barata que un traje completo y perfectamente aceptada en bodas mexicanas de día o al aire libre.',
        piezas:[{n:'Guayabera o camisa de lino',ids:[]},{n:'Pantalón de vestir claro',ids:[]},
                {n:'Mocasín o derby café (sin corbata)',ids:['z6','z3']}],
        total:'$1,800-3,000'},
    ]},
};
// Plan de compra por fases — mismo lenguaje de "Fases" que ya usas en tu Plan Maestro (Coach).
const FASES = [
  {n:'Fase 1', t:'Lo esencial ya', items:['Playera blanca','Playera negra','Jeans azul clásico','Sneakers blancos','Chamarra de mezclilla'], costo:'$2,500-3,500'},
  {n:'Fase 2', t:'Para el trabajo', items:['Camisa de vestir blanca','Pantalón chino','Zapato derby café','Cinturón de piel'], costo:'$2,850-4,200'},
  {n:'Fase 3', t:'Para variar', items:['Hoodie','Polo piqué','Botines Chelsea','Blazer casual o puffer (según temporada)'], costo:'$2,700-4,000'},
  {n:'Fase 4', t:'Opcional / cuando alcance', items:['Chamarra de cuero','Tenis de cross-training (si Hyrox va en serio)','Traje de boda (mejor rentar primero)','Reloj, lentes de sol, mochila, corbata y cartera (ver Accesorios)'], costo:'Variable — sin prisa'},
];

// ─── COLORIMETRÍA: qué playera va con qué pantalón ────────────────────────────
// Sustituye a las fotos de outfit. Pedido de Adán (2026-09-08): *"en vez de buscar
// imágenes feas por que no hay ninguna bonita dame como la colorimetria mejor para
// combinar playeras de diferentes colores con pantalones en especificos"*.
//
// Los hex son de TELA, no de pantalla: un blanco de camiseta es #F2EFE9 y no #FFFFFF,
// y un negro lavado tira a #1B1B1D. Sobre el fondo carbón de esta app se leen mucho
// mejor que sobre blanco, que es la razón de que la sección no tenga tarjetas claras.
//
// `reglas[pantalón][playera]` es `[veredicto, porqué]`:
//   's' va siempre · 'o' con cuidado · 'n' evítalo
// Los tres criterios detrás de cada veredicto son contraste de VALOR (claro contra
// oscuro), TEMPERATURA (cálido contra frío) y SATURACIÓN (solo una prenda saturada por
// outfit). Cuando dos prendas comparten familia de color sin salto de valor, es 'n':
// no lee como conjunto, lee como error.

const COLORIMETRIA = {
  // Seis pantalones. `b3` (jeans azul clásico) y `b4` (chino caqui) ya están en BASICOS;
  // el marino lo pide el tip de b4 ("un caqui y un azul marino cubren el 90%"). Los
  // otros tres completan la semana y no están todavía en el catálogo.
  pantalones: [
    {id:'indigo', tipo:'jeans', n:'Jeans índigo', hex:'#42618A', item:'b3',
      lectura:'Frío, valor medio, saturación media. El más difícil de los seis: al ser azul y de valor medio se pelea con los azules y con los grises oscuros.'},
    {id:'oscuro', tipo:'jeans', n:'Jeans azul oscuro', hex:'#2B3A55',
      lectura:'Frío y oscuro. Aguanta mucha más saturación arriba que el índigo porque hay salto de valor. Es tu jean de viernes de oficina.'},
    {id:'negro', tipo:'jeans', n:'Jeans negro', hex:'#232326',
      lectura:'Neutro y muy oscuro. El más permisivo de tus jeans: al no tener color propio, no compite con nada de arriba.'},
    {id:'caqui', tipo:'chino', n:'Chino caqui', hex:'#C0A57C', item:'b4',
      lectura:'Cálido y claro. El único claro de los seis, así que aquí manda el pantalón: arriba conviene algo más oscuro que él.'},
    {id:'marino', tipo:'chino', n:'Chino azul marino', hex:'#293650',
      lectura:'Frío y oscuro, y liso: al no tener la textura del denim aguanta más formalidad. Es tu pantalón de junta.'},
    {id:'gris', tipo:'chino', n:'Chino gris piedra', hex:'#7D7B76',
      lectura:'Neutro de valor medio: no tiene temperatura, así que no se pelea con nada. El más permisivo de los seis y el que no tienes.'},
  ],

  // Dieciséis colores de playera. Hoy solo tienes blanca (b1) y negra (b2): las otras
  // catorce son también la lista de qué comprar, en el orden que dice la tabla.
  playeras: [
    {id:'blanco',    n:'Blanco',        hex:'#F2EFE9', item:'b1'},
    {id:'crema',     n:'Crema',         hex:'#E4D9C4'},
    {id:'grisj',     n:'Gris jaspeado', hex:'#A3A19C'},
    {id:'carbon',    n:'Carbón',        hex:'#3A3A3E'},
    {id:'negro',     n:'Negro',         hex:'#1B1B1D', item:'b2'},
    {id:'marino',    n:'Azul marino',   hex:'#22304A'},
    {id:'celeste',   n:'Celeste',       hex:'#8FB6D4'},
    {id:'oliva',     n:'Verde oliva',   hex:'#6E7448'},
    {id:'botella',   n:'Verde botella', hex:'#254A3D'},
    {id:'burdeos',   n:'Burdeos',       hex:'#6B2536'},
    {id:'rojo',      n:'Rojo ladrillo', hex:'#A93A38'},
    {id:'mostaza',   n:'Mostaza',       hex:'#C59A31'},
    {id:'terracota', n:'Terracota',     hex:'#A85C3D'},
    {id:'camel',     n:'Camel',         hex:'#B98A5B'},
    {id:'rosa',      n:'Rosa palo',     hex:'#D7A79E'},
    {id:'berenjena', n:'Berenjena',     hex:'#4B3455'},
  ],

  // ─── DE DÓNDE SALEN LAS COMBINACIONES ──────────────────────────────────────
  // Las 48 combinaciones de la sección «Combinaciones» NO están escritas a mano: son
  // las 48 celdas verdes de `reglas` cruzadas con esto. Así no pueden contradecir a la
  // matriz — si un veredicto cambia arriba, la combinación aparece o desaparece sola.
  //
  // `pant` son los pantalones que la ocasión admite y `pl` las playeras de su registro
  // (`null` = cualquiera que esté en verde). Una combinación puede caer en varias: 27
  // sirven para oficina, 18 para noche y 40 para diario, y ninguna de las 48 se queda
  // sin ocasión.
  ocasiones: [
    {id:'oficina', n:'Oficina', ico:'💼',
      pant:['marino','gris','caqui','oscuro'],
      pl:['blanco','crema','grisj','carbon','marino','celeste','oliva','botella','burdeos','camel'],
      zapato:'Derby café o mocasín',
      nota:'Nada de mostaza ni terracota aquí: funcionan de color, pero bajan el registro. Con polo piqué en vez de playera, cualquiera de estas sube un escalón.'},
    {id:'noche', n:'Noche', ico:'🌙',
      pant:['negro','oscuro','marino'],
      pl:['burdeos','negro','carbon','botella','oliva','blanco','crema','camel','mostaza'],
      zapato:'Botines Chelsea',
      nota:'Pantalón oscuro siempre: el peso abajo y el único color arriba, que es donde te miran cuando hablas.'},
    {id:'diario', n:'Diario', ico:'🙂',
      pant:['indigo','oscuro','negro','caqui','gris'], pl:null,
      zapato:'Sneakers blancos',
      nota:'Aquí entra todo lo que la matriz da por bueno. El sneaker blanco sube el valor abajo y cierra la silueta.'},
  ],

  // Dónde se compra, por tipo de prenda. Los rangos y los links son los mismos de `b1`
  // (playera lisa), `b3` (jeans) y `b4` (chino) en BASICOS, verificados uno por uno: una
  // playera burdeos cuesta lo que una blanca, así que el precio va por TIPO y no por
  // color. Poner un precio distinto para cada uno de los 16 colores sería inventarlo.
  // Uniqlo va sin link a propósito: no tiene tienda oficial en México.
  compra: {
    playera: {
      etiqueta:'Playera lisa de algodón',
      tiendas:[{t:'Uniqlo (Supima/Airism)',p:'$299-399'},
               {t:'Zara',p:'$299-449',u:'https://www.zara.com/mx/'},
               {t:'H&M',p:'$199-299',u:'https://www2.hm.com/es_mx/index.html'}],
      tip:'Lisa y sin estampado: es lo que hace que el color combine con el pantalón y no compita con él.'},
    jeans: {
      etiqueta:'Jeans corte recto o slim',
      tiendas:[{t:'Levi\'s 511/505',p:'$999-1,499',u:'https://www.levi.com.mx/'},
               {t:'Zara',p:'$699-899',u:'https://www.zara.com/mx/'},
               {t:'C&amp;A / Suburbia',p:'$499-699',u:'https://www.cyc.com.mx/'}],
      tip:'Recto o slim, no skinny ni ancho: es el corte que funciona igual con sneaker y con zapato.'},
    chino: {
      etiqueta:'Pantalón chino',
      tiendas:[{t:'Dockers',p:'$899-1,199',u:'https://www.dockers.com.mx/'},
               {t:'Zara',p:'$699-899',u:'https://www.zara.com/mx/'},
               {t:'H&M',p:'$549-699',u:'https://www2.hm.com/es_mx/index.html'}],
      tip:'El chino es lo que sube de registro un outfit sin llegar a pantalón de vestir.'},
  },

  // ─── LA TERCERA CAPA ───────────────────────────────────────────────────────
  // Una playera y un pantalón visten medio cuerpo. Lo que se ve al llegar a un sitio es
  // la capa, y la capa NO se elige por el color de la playera: se elige por el pantalón
  // —para no chocar con él— y por el registro que impone. Por eso las reglas van contra
  // los seis pantalones y no contra las dieciséis playeras.
  //
  // El rompevientos (`c4`) se queda fuera a propósito: es ropa de deporte, y el propio
  // catálogo lo dice. Meterlo aquí sería fingir que compite con un blazer.
  capas: [
    {id:'mezclilla', n:'Chamarra de mezclilla', hex:'#4A6B94', item:'c1'},
    {id:'bomber',    n:'Bomber negra',          hex:'#1E1E20', item:'c2'},
    {id:'cuero',     n:'Chamarra de cuero',     hex:'#161618', item:'c3'},
    {id:'puffer',    n:'Chamarra acolchada',    hex:'#3A3A3C', item:'c5'},
    {id:'blazer',    n:'Blazer azul marino',    hex:'#24304A', item:'c6'},
  ],

  reglasCapa: {
    mezclilla: {
      indigo: ['n','Denim sobre denim del mismo tono: es el error clásico del conjunto de mezclilla.'],
      oscuro: ['o','Va solo si la chamarra es claramente más clara que el jean. Dos tonos de diferencia, mínimo.'],
      negro:  ['s','El contraste que mejor le sienta a la mezclilla, y el más fácil de llevar.'],
      caqui:  ['s','Azul sobre tierra: el combo más sencillo que hay con esta chamarra.'],
      marino: ['o','Otra vez dos azules. Va si el chino es liso y bastante más oscuro que ella.'],
      gris:   ['s','El gris es neutro y deja que la mezclilla sea la pieza que se mira.'],
    },
    bomber: {
      indigo: ['s','Negro sobre índigo: limpio y urbano, sin pensarlo.'],
      oscuro: ['s','Igual que con el índigo, con más peso abajo.'],
      negro:  ['o','Negro con negro pide que las dos telas sean el mismo negro. Uno lavado se nota.'],
      caqui:  ['s','El contraste fuerte que al caqui le hace falta arriba.'],
      marino: ['o','Negro sobre marino es el par que más se equivoca. Con luz artificial pasa; de día, míralo.'],
      gris:   ['s','Neutro con neutro, y el negro manda. Muy limpio.'],
    },
    cuero: {
      indigo: ['s','La combinación de siempre. No hay forma de que salga mal.'],
      oscuro: ['s','Como con el índigo pero de noche: el jean oscuro sube el registro.'],
      negro:  ['s','Total black con textura: el cuero rompe el bloque y por eso funciona.'],
      caqui:  ['n','El cuero pide registro urbano y el caqui lo baja a domingo. Chocan de tono, no de color.'],
      marino: ['o','Va si el chino es oscuro y el resto neutro total. Es la menos obvia de las seis.'],
      gris:   ['s','El gris sostiene el cuero sin competir con él.'],
    },
    puffer: {
      indigo: ['s','Para el frío de verdad, y el índigo aguanta cualquier capa.'],
      oscuro: ['s','Lo mismo, con el jean que mejor se lleva con el invierno.'],
      negro:  ['s','Todo oscuro y funcional. Es lo que te vas a poner de enero.'],
      caqui:  ['o','Funciona, pero la puffer es lo más casual del clóset: con caqui se va a fin de semana.'],
      marino: ['o','Misma razón: le baja el registro a un pantalón que quiere ser formal.'],
      gris:   ['s','Gris con gris oscuro: el conjunto más discreto para el frío.'],
    },
    blazer: {
      indigo: ['o','Blazer sobre jeans va, pero el índigo medio lo casualiza. Mejor con el jean oscuro.'],
      oscuro: ['s','El smart casual de manual: blazer marino y jean oscuro.'],
      negro:  ['o','Marino sobre negro, el choque de siempre. Solo con luz artificial.'],
      caqui:  ['s','Blazer marino y chino caqui es el uniforme que nunca falla.'],
      marino: ['n','Marino sobre marino sin ser un traje parece un traje mal emparejado.'],
      gris:   ['s','La alternativa más elegante al caqui, y la que menos se ve.'],
    },
  },

  // ─── EL ZAPATO DEPENDE DEL PANTALÓN, NO DE LA OCASIÓN ──────────────────────
  // Las ocasiones traen un zapato sugerido, pero eso es un atajo: el derby café con
  // jeans negros no funciona por mucho que la ocasión sea «oficina». Lo que manda es el
  // pantalón. Los tenis de running y de cross-training (`z4`, `z5`) no están: son de
  // gimnasio y no se combinan, se usan.
  calzado: [
    {id:'sneakers', n:'Sneakers blancos', hex:'#EDEAE4', item:'z1'},
    {id:'chelsea',  n:'Botines Chelsea',  hex:'#1D1C1E', item:'z2'},
    {id:'derby',    n:'Zapato derby café',hex:'#6B4530', item:'z3'},
    {id:'mocasin',  n:'Mocasines',        hex:'#4A3226', item:'z6'},
  ],

  reglasZapato: {
    sneakers: {
      indigo: ['s','El par por defecto. Sube el valor abajo y cierra la silueta.'],
      oscuro: ['s','Con el jean oscuro se ve más intencional que con el índigo.'],
      negro:  ['s','El contraste blanco sobre negro es lo que evita que el conjunto se hunda.'],
      caqui:  ['s','Claro sobre claro, pero el blanco es frío y el caqui cálido: se separan solos.'],
      marino: ['o','Va, pero le quita a la junta lo que el chino marino le había puesto.'],
      gris:   ['s','El gris no compite con nada, y menos con un sneaker blanco.'],
    },
    chelsea: {
      indigo: ['s','Botín negro con jean: alarga la pierna y sube el registro sin esfuerzo.'],
      oscuro: ['s','El mejor zapato que le puedes poner al jean oscuro de noche.'],
      negro:  ['s','Negro con negro alarga la pierna más que ninguna otra combinación.'],
      caqui:  ['o','El negro con caqui es duro. Va, pero pide que arriba haya algo oscuro que lo acompañe.'],
      marino: ['s','Discreto y formal sin llegar a zapato de vestir.'],
      gris:   ['s','El gris deja que el botín sea lo que se mire.'],
    },
    derby: {
      indigo: ['o','El café va con el índigo, pero es zapato de chino: con jean se ve algo forzado.'],
      oscuro: ['s','Café sobre azul oscuro es de los pares más elegantes que tienes.'],
      negro:  ['n','Café con negro es el choque clásico. No hay manera de que se vea deliberado.'],
      caqui:  ['s','El par de manual: derby café y chino caqui.'],
      marino: ['s','Café sobre marino: cálido contra frío, y por eso funciona tan bien.'],
      gris:   ['s','El gris es neutro y el café aporta el único cálido. Muy limpio.'],
    },
    mocasin: {
      indigo: ['o','Con jean el mocasín pide que todo lo demás esté arreglado. Es fácil pasarse.'],
      oscuro: ['o','Mejor que con el índigo, pero sigue siendo zapato de chino.'],
      negro:  ['n','Mismo problema que el derby: café con negro no se lleva.'],
      caqui:  ['s','Lo más elegante que puedes ponerte con un chino sin llegar a zapato de vestir.'],
      marino: ['s','Con chino marino y sin calcetín a la vista es el combo de verano.'],
      gris:   ['s','Neutro abajo, cálido en el pie: funciona igual que el derby.'],
    },
  },

  // ─── LO QUE NO SE VE EN NINGUNA TABLA ──────────────────────────────────────
  // El color decide si dos prendas se llevan; esto decide si el conjunto se ve bien
  // puesto. Son las que se notan cuando fallan y nadie sabe decir por qué.
  reglas_oro: [
    {t:'El cinturón iguala al zapato',
     d:'Café con café, negro con negro. No tiene que ser el mismo tono exacto, pero sí la misma familia. Es el detalle que más se nota de los que nadie menciona.',
     p:'Por eso el cinturón reversible café/negro del catálogo rinde el doble: cubre los dos casos.'},
    {t:'Un solo color saturado por outfit',
     d:'Si la playera es mostaza, todo lo demás es neutro: pantalón, zapato, capa. Dos prendas peleando por la atención es lo que hace que un conjunto se vea disfraz.',
     p:'Los seis pantalones son neutros o casi, y eso es a propósito: el color va arriba, donde te miran.'},
    {t:'El pantalón termina donde empieza el zapato',
     d:'Sin pliegue o con uno solo. Un pantalón que se amontona sobre el zapato arruina un outfit que por color era perfecto, y es lo primero que se ve de lejos.',
     p:'Cuesta $150 en cualquier sastrería y es la mejor inversión de todo el clóset.'},
    {t:'El calcetín se resuelve, no se improvisa',
     d:'Con sneakers, invisible. Con zapato y pantalón largo, del color del pantalón — nunca blanco, y nunca más claro que él.',
     p:'La única excepción es el mocasín en verano: ahí no va calcetín a la vista.'},
    {t:'La talla manda sobre el color',
     d:'Una playera que queda bien en una talla equivocada se ve peor que un color discutible en la talla correcta. La costura del hombro cae en el hueso, no antes ni después.',
     p:'Antes de comprar por color, prueba la talla. Esta guía asume que la prenda te queda.'},
    {t:'Si no sabes, blanco arriba',
     d:'Blanco va con los seis pantalones. Es la única prenda de la que se puede decir eso, y por eso es siempre la primera compra.',
     p:'Ten tres o cuatro: es la que más se desgasta.'},
  ],

  reglas: {
    indigo: {
      blanco:   ['s','El contraste más limpio que hay. Si dudas, esta.'],
      crema:    ['s','Como el blanco pero cálido: suaviza el azul y se ve menos de uniforme.'],
      grisj:    ['s','Neutro puro. Mismo valor que el jean, pero sin color que compita.'],
      carbon:   ['s','Ancla la mitad de arriba sin el corte duro del negro.'],
      negro:    ['s','Contraste máximo. De noche y con sneaker blanco, siempre.'],
      oliva:    ['s','Cálido apagado contra azul frío: el complementario que no grita.'],
      burdeos:  ['s','Rojo oscuro contra azul es el par clásico. Con derby café.'],
      camel:    ['s','El pariente natural del denim: cálido y poco saturado, nunca choca.'],
      mostaza:  ['o','Es el complementario exacto del azul: funciona, pero manda. Deja el resto neutro.'],
      terracota:['o','Igual que la mostaza pero más apagada. Pide zapato café, no blanco.'],
      botella:  ['o','Frío y oscuro como el jean. Con índigo claro va; con oscuro se apelmaza.'],
      rojo:     ['o','Mucha saturación arriba. Que sea ladrillo, no rojo puro, y nada más de color.'],
      rosa:     ['o','Va en primavera y con jean claro. Con índigo oscuro se apaga.'],
      marino:   ['n','Dos azules que no son ni el mismo ni opuestos: lee como error, no como conjunto.'],
      celeste:  ['n','Mismo azul, distinto valor: parece intento de conjunto de mezclilla que salió mal.'],
      berenjena:['n','Morado y azul son vecinos: juntos enturbian y ninguno se lee.'],
    },
    oscuro: {
      blanco:   ['s','Contraste máximo y limpio. El combo de viernes casual.'],
      crema:    ['s','Menos duro que el blanco y más cálido. Bien con derby café.'],
      grisj:    ['s','Sube el valor sin meter color. Seguro con cualquier zapato.'],
      celeste:  ['s','Aquí sí: hay salto grande de valor entre el celeste y el índigo oscuro.'],
      camel:    ['s','Cálido claro sobre azul oscuro: el contraste de temperatura hace el trabajo.'],
      oliva:    ['s','Apagado contra apagado, pero uno cálido y otro frío. Muy usable.'],
      burdeos:  ['s','Oscuro con oscuro funciona porque el matiz es opuesto. De noche, impecable.'],
      mostaza:  ['s','El jean oscuro sostiene la saturación que el índigo medio no aguanta.'],
      negro:    ['o','Se ve bien, pero junto al negro el azul puede leerse sucio. Revísalo con luz de día.'],
      carbon:   ['o','Poco contraste de valor. Funciona si el jean es claramente más azul que gris.'],
      botella:  ['o','Dos oscuros fríos. Necesita zapato claro para no ser un bloque.'],
      terracota:['o','Buena idea, pero pide que el resto sea neutro total.'],
      rosa:     ['o','Muy claro sobre muy oscuro: el contraste es grande y el tono, delicado.'],
      marino:   ['n','Es prácticamente el mismo color: parece traje de mezclilla mal cortado.'],
      berenjena:['n','Morado sobre azul oscuro se lee como negro sucio, no como color.'],
      rojo:     ['n','Rojo puro sobre índigo oscuro es bandera, no outfit. Cámbialo por burdeos.'],
    },
    negro: {
      blanco:   ['s','El contraste más fuerte del clóset. Nunca falla, de día o de noche.'],
      crema:    ['s','Rompe la dureza del blanco y ablanda el negro. Muy bueno con Chelsea.'],
      grisj:    ['s','El degradado natural: gris arriba, negro abajo.'],
      camel:    ['s','Un cálido claro es lo que más levanta un pantalón negro.'],
      celeste:  ['s','El negro no compite con ningún azul, así que aquí sí puedes usarlo.'],
      oliva:    ['s','Apagado sobre negro se ve caro. Con sneaker blanco, muy bien.'],
      burdeos:  ['s','Vino sobre negro es el combo de noche por excelencia.'],
      mostaza:  ['s','El negro absorbe la saturación: la mostaza se ve intencional, no chillona.'],
      negro:    ['o','Total black funciona, pero solo si las dos telas son del mismo negro. Un negro lavado junto a uno nuevo se nota.'],
      carbon:   ['o','Poco contraste. Va si el gris es claramente más claro que el pantalón.'],
      botella:  ['o','Verde muy oscuro sobre negro: a distancia se pierde el verde.'],
      terracota:['o','Bien, pero el negro apaga el naranja. Elige la versión más saturada.'],
      rosa:     ['o','Contraste alto y tono suave. Funciona, pero es la más arriesgada aquí.'],
      marino:   ['n','Marino y negro es el choque clásico: con luz de día se ve equivocado, no elegante.'],
      berenjena:['n','Morado oscuro sobre negro no se lee: parece una mancha.'],
      rojo:     ['n','Rojo puro con negro es disfraz. El burdeos hace lo mismo sin el grito.'],
    },
    caqui: {
      blanco:   ['s','Claro sobre claro, pero el caqui es cálido y el blanco frío: se separan solos.'],
      marino:   ['s','El par de manual. Marino arriba, caqui abajo: no falla nunca.'],
      botella:  ['s','Verde oscuro sobre caqui: la versión menos vista del combo de arriba.'],
      negro:    ['s','Contraste fuerte y limpio. El más sencillo de todos.'],
      carbon:   ['s','Como el negro, un punto menos severo. Muy bien de oficina.'],
      burdeos:  ['s','Cálido con cálido, pero con un salto de valor grande. Funciona.'],
      oliva:    ['s','Los dos son tierra; funciona porque el oliva es mucho más oscuro.'],
      celeste:  ['s','Fresco sobre cálido. El combo de primavera más fácil que tienes.'],
      crema:    ['o','Muy parecido al caqui. Solo va si la crema es claramente más clara.'],
      camel:    ['o','Mismo problema: dos tostados. Si el valor es parecido, no.'],
      grisj:    ['o','Gris frío sobre caqui cálido puede leerse apagado. Va con zapato blanco.'],
      mostaza:  ['o','Amarillo sobre amarillo tierra. Necesita que la mostaza sea muy oscura.'],
      terracota:['o','Cálido sobre cálido otra vez: funciona en otoño, no de oficina.'],
      rojo:     ['n','Rojo sobre caqui se va a uniforme de trabajo. No es lo que buscas.'],
      rosa:     ['n','Rosa claro con caqui claro: sin contraste ni de valor ni de temperatura.'],
      berenjena:['n','Morado con caqui nunca acaba de verse deliberado.'],
    },
    marino: {
      blanco:   ['s','El uniforme seguro de oficina: blanco arriba, marino abajo.'],
      crema:    ['s','Igual pero más suave. Con mocasín es lo más elegante por lo que cuesta.'],
      celeste:  ['s','Salto de valor grande dentro del mismo azul: aquí sí funciona.'],
      camel:    ['s','Cálido claro sobre azul oscuro: el contraste más elegante de la lista.'],
      grisj:    ['s','Neutro que no compite. Seguro para junta.'],
      burdeos:  ['s','Vino con marino es un clásico de sastrería. Con derby café, perfecto.'],
      oliva:    ['s','Menos obvio que el blanco y se ve pensado.'],
      mostaza:  ['s','El marino oscuro sostiene la mostaza sin que grite.'],
      negro:    ['o','Negro sobre marino es el par que más se equivoca. Solo con luz artificial.'],
      carbon:   ['o','Poco contraste, pero funciona si el gris es claro.'],
      botella:  ['o','Dos oscuros fríos. Pide zapato claro.'],
      terracota:['o','Funciona, pero casualiza un pantalón que quiere ser formal.'],
      rosa:     ['o','Va, pero es la combinación más difícil de llevar de todas estas.'],
      marino:   ['n','Marino con marino solo funciona si es literalmente un traje. Si no, no.'],
      berenjena:['n','Morado y azul son vecinos: el conjunto sale turbio.'],
      rojo:     ['n','Demasiada saturación contra un pantalón que quiere ser formal.'],
    },
    gris: {
      blanco:   ['s','El gris no compite con nada y el blanco lo deja limpio.'],
      negro:    ['s','Contraste claro de valor, sin choque de color.'],
      marino:   ['s','Aquí el marino sí va: el gris es neutro, no azul.'],
      burdeos:  ['s','El gris hace de fondo y el vino se lee entero.'],
      botella:  ['s','Igual que el vino: el gris deja hablar al verde.'],
      oliva:    ['s','Dos apagados, y funciona porque el gris no tiene temperatura.'],
      celeste:  ['s','Fresco sobre neutro. Muy primaveral y muy fácil.'],
      terracota:['s','El mejor fondo que hay para un naranja tierra.'],
      grisj:    ['o','Gris sobre gris: solo si hay dos o tres tonos de diferencia.'],
      carbon:   ['o','Mismo caso: necesita un salto claro de valor.'],
      camel:    ['o','Va, pero el gris frío puede apagar el camel. Pruébalo con luz de día.'],
      mostaza:  ['o','El gris la sostiene, pero es mucho color para un pantalón de valor medio.'],
      crema:    ['o','Los dos son claros y apagados. Va si la crema es bastante más clara.'],
      rosa:     ['n','Rosa y gris juntos apagan: el conjunto se ve descolorido.'],
      berenjena:['n','El morado necesita un fondo neutro oscuro; el gris medio lo deja a medias.'],
      rojo:     ['n','Rojo puro sobre gris medio vibra y cansa a la vista.'],
    },
  },
};
