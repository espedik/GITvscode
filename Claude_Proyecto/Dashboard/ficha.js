// La ficha de producto y de libro. Vive aparte porque la usan varias apps:
// el dashboard, en la lista de la compra, y Coach, donde los libros salen
// nombrados 58 veces. Copiar el molde en cada una era justo la duplicación
// que este proyecto persigue.
//
// Necesita `datos-maestros.js` cargado antes: todo el contenido sale de ahí.
const PF_FORMAS={
  bomba:'<rect x="30" y="50" width="60" height="120" rx="9" fill="@A@"/><rect x="30" y="50" width="60" height="120" rx="9" fill="none" stroke="@S@" stroke-width="1.2"/><path d="M30 98h60v54a9 9 0 0 1-9 9H39a9 9 0 0 1-9-9z" fill="@B@" opacity=".92"/><rect x="48" y="38" width="24" height="13" rx="3" fill="@B@"/><rect x="53" y="16" width="9" height="23" rx="4" fill="@B@"/><path d="M57.5 20h12a7 7 0 0 1 7 7v4" fill="none" stroke="@B@" stroke-width="7" stroke-linecap="round"/>',
  gotero:'<rect x="38" y="74" width="44" height="92" rx="4" fill="@A@"/><rect x="38" y="74" width="44" height="92" rx="4" fill="none" stroke="@S@" stroke-width="1.2"/><rect x="43" y="90" width="34" height="62" rx="2" fill="#fff" opacity=".9"/><rect x="46" y="98" width="28" height="3" rx="1.5" fill="@B@" opacity=".55"/><rect x="46" y="105" width="20" height="2.4" rx="1.2" fill="@B@" opacity=".3"/><path d="M50 74V64h20v10z" fill="@A@"/><path d="M50 74V64h20v10" fill="none" stroke="@S@" stroke-width="1.2"/><rect x="48" y="20" width="24" height="45" rx="5" fill="@B@"/><rect x="48" y="20" width="24" height="8" rx="4" fill="#fff" opacity=".2"/>',
  tubo:'<rect x="48" y="16" width="24" height="30" rx="4" fill="@B@"/><rect x="48" y="16" width="24" height="7" rx="3.5" fill="#fff" opacity=".28"/><path d="M50 46c0 8-14 12-14 26v80h48V72c0-14-14-18-14-26z" fill="@A@"/><path d="M50 46c0 8-14 12-14 26v80h48V72c0-14-14-18-14-26z" fill="none" stroke="@S@" stroke-width="1.2"/><rect x="36" y="104" width="48" height="48" fill="@B@" opacity=".88"/><rect x="33" y="150" width="54" height="14" rx="3" fill="@B@"/><rect x="33" y="150" width="54" height="14" rx="3" fill="none" stroke="@S@" stroke-width="1"/>',
  tarro:'<path d="M30 90h60v52a14 14 0 0 1-14 14H44a14 14 0 0 1-14-14z" fill="@A@"/><path d="M30 90h60v52a14 14 0 0 1-14 14H44a14 14 0 0 1-14-14z" fill="none" stroke="@S@" stroke-width="1.2"/><rect x="38" y="106" width="44" height="4" rx="2" fill="@B@" opacity=".5"/><rect x="38" y="115" width="30" height="3" rx="1.5" fill="@B@" opacity=".28"/><rect x="25" y="56" width="70" height="35" rx="7" fill="@B@"/><rect x="25" y="56" width="70" height="8" rx="4" fill="#fff" opacity=".22"/><rect x="25" y="84" width="70" height="7" fill="#000" opacity=".12"/>',
  bote:'<rect x="26" y="62" width="68" height="108" rx="7" fill="@A@"/><rect x="26" y="62" width="68" height="108" rx="7" fill="none" stroke="@S@" stroke-width="1.2"/><rect x="26" y="88" width="68" height="56" fill="@B@" opacity=".9"/><rect x="22" y="34" width="76" height="29" rx="6" fill="@B@"/><rect x="22" y="34" width="76" height="6" rx="3" fill="#fff" opacity=".22"/>',
  botella:'<path d="M44 44c0 9-16 13-16 28v86a10 10 0 0 0 10 10h44a10 10 0 0 0 10-10V72c0-15-16-19-16-28z" fill="@A@"/><path d="M44 44c0 9-16 13-16 28v86a10 10 0 0 0 10 10h44a10 10 0 0 0 10-10V72c0-15-16-19-16-28z" fill="none" stroke="@S@" stroke-width="1.2"/><rect x="28" y="92" width="64" height="52" fill="@B@" opacity=".9"/><rect x="42" y="18" width="36" height="27" rx="5" fill="@B@"/><rect x="42" y="18" width="36" height="6" rx="3" fill="#fff" opacity=".26"/><rect x="46" y="41" width="28" height="4" rx="2" fill="#000" opacity=".14"/>',
  tela:'<path d="M20 54h80a6 6 0 0 1 6 6v72c0 7-7 11-14 9-12-4-22-4-32 0s-20 4-32 0c-7-2-14-2-14-9V60a6 6 0 0 1 6-6z" fill="@A@"/><path d="M20 54h80a6 6 0 0 1 6 6v72c0 7-7 11-14 9-12-4-22-4-32 0s-20 4-32 0c-7-2-14-2-14-9V60a6 6 0 0 1 6-6z" fill="none" stroke="@S@" stroke-width="1.2"/><path d="M14 70h92" fill="none" stroke="@B@" stroke-width="3.5" opacity=".45"/><path d="M30 112q30 12 60 0M30 96q30 12 60 0" fill="none" stroke="@B@" stroke-width="2" opacity=".22"/><rect x="68" y="58" width="30" height="8" rx="4" fill="@B@" opacity=".5"/>',
  pastillas:'<rect x="30" y="58" width="60" height="112" rx="7" fill="@B@"/><rect x="30" y="58" width="60" height="112" rx="7" fill="none" stroke="@S@" stroke-width="1.2"/><rect x="35" y="84" width="50" height="62" rx="4" fill="#fff" opacity=".93"/><rect x="41" y="94" width="38" height="4" rx="2" fill="@B@" opacity=".65"/><rect x="41" y="103" width="26" height="3" rx="1.5" fill="@B@" opacity=".4"/><rect x="26" y="34" width="68" height="26" rx="5" fill="@A@"/><rect x="26" y="34" width="68" height="26" rx="5" fill="none" stroke="@S@" stroke-width="1.2"/><rect x="26" y="34" width="68" height="6" rx="3" fill="#fff" opacity=".5"/>',
  caja:'<path d="M30 56h58v112H30z" fill="@A@"/><path d="M88 56l14-10v112l-14 10z" fill="@B@" opacity=".35"/><path d="M30 56l14-10h58l-14 10z" fill="@B@" opacity=".2"/><path d="M30 56h58v112H30zM88 56l14-10v112l-14 10zM30 56l14-10h58l-14 10z" fill="none" stroke="@S@" stroke-width="1.2" stroke-linejoin="round"/><rect x="30" y="96" width="58" height="26" fill="@B@" opacity=".85"/><rect x="37" y="132" width="32" height="4" rx="2" fill="@B@" opacity=".45"/><rect x="37" y="141" width="22" height="3" rx="1.5" fill="@B@" opacity=".3"/>',
  polvo:'<rect x="22" y="60" width="76" height="110" rx="9" fill="@A@"/><rect x="22" y="60" width="76" height="110" rx="9" fill="none" stroke="@S@" stroke-width="1.2"/><rect x="22" y="86" width="76" height="62" fill="@B@" opacity=".88"/><rect x="32" y="98" width="46" height="5" rx="2.5" fill="#fff" opacity=".55"/><rect x="32" y="110" width="30" height="4" rx="2" fill="#fff" opacity=".35"/><rect x="18" y="32" width="84" height="30" rx="6" fill="@B@"/><rect x="18" y="32" width="84" height="7" rx="3.5" fill="#fff" opacity=".24"/>',
  sobre:'<path d="M28 46h64v112H28z" fill="@A@"/><path d="M28 46h64v112H28z" fill="none" stroke="@S@" stroke-width="1.2"/><path d="M28 46h64v9H28zM28 149h64v9H28z" fill="@B@" opacity=".3"/><path d="M28 55h64M28 149h64" fill="none" stroke="@S@" stroke-width=".9" stroke-dasharray="3 3"/><rect x="28" y="84" width="64" height="40" fill="@B@" opacity=".85"/><rect x="38" y="96" width="44" height="5" rx="2.5" fill="#fff" opacity=".5"/>',
  bolsa:'<path d="M22 74h76a8 8 0 0 1 8 8v62a10 10 0 0 1-10 10H24a10 10 0 0 1-10-10V82a8 8 0 0 1 8-8z" fill="@A@"/><path d="M22 74h76a8 8 0 0 1 8 8v62a10 10 0 0 1-10 10H24a10 10 0 0 1-10-10V82a8 8 0 0 1 8-8z" fill="none" stroke="@S@" stroke-width="1.2"/><rect x="14" y="94" width="92" height="12" fill="@B@" opacity=".85"/><circle cx="86" cy="100" r="5" fill="@A@" stroke="@S@" stroke-width="1"/><path d="M48 74V58a12 12 0 0 1 24 0v16" fill="none" stroke="@B@" stroke-width="5" stroke-linecap="round"/>',
  barra:'<path d="M34 74h52v82a12 12 0 0 1-12 12H46a12 12 0 0 1-12-12z" fill="@A@"/><path d="M34 74h52v82a12 12 0 0 1-12 12H46a12 12 0 0 1-12-12z" fill="none" stroke="@S@" stroke-width="1.2"/><rect x="34" y="98" width="52" height="42" fill="@B@" opacity=".85"/><rect x="30" y="38" width="60" height="38" rx="6" fill="@B@"/><rect x="30" y="38" width="60" height="8" rx="4" fill="#fff" opacity=".22"/>',
  cepillo:'<g stroke="@B@" stroke-width="3.6" stroke-linecap="round"><path d="M44 34V20M51 32V17M58 31V16M65 32V17M72 34V20"/></g><rect x="40" y="32" width="36" height="26" rx="13" fill="@A@"/><rect x="40" y="32" width="36" height="26" rx="13" fill="none" stroke="@S@" stroke-width="1.2"/><path d="M53 58h10l3 14H50z" fill="@B@"/><path d="M50 72h20v82a10 10 0 0 1-20 0z" fill="@B@"/><path d="M53 58h10l3 14H50zM50 72h20v82a10 10 0 0 1-20 0z" fill="none" stroke="@S@" stroke-width="1.1"/><rect x="54" y="104" width="12" height="34" rx="6" fill="@A@" opacity=".45"/>',
  utensilio:'<path d="M44 154L74 62" fill="none" stroke="@A@" stroke-width="7" stroke-linecap="round"/><path d="M76 154L46 62" fill="none" stroke="@A@" stroke-width="7" stroke-linecap="round"/><path d="M44 154L74 62M76 154L46 62" fill="none" stroke="@S@" stroke-width="1" stroke-linecap="round"/><circle cx="46" cy="46" r="13" fill="none" stroke="@B@" stroke-width="6"/><circle cx="74" cy="46" r="13" fill="none" stroke="@B@" stroke-width="6"/><circle cx="60" cy="112" r="4.5" fill="@B@"/>',
  aparato:'<rect x="40" y="30" width="40" height="140" rx="12" fill="@A@"/><rect x="40" y="30" width="40" height="140" rx="12" fill="none" stroke="@S@" stroke-width="1.2"/><rect x="40" y="82" width="40" height="52" fill="@B@" opacity=".85"/><rect x="46" y="22" width="28" height="12" rx="3" fill="@B@"/><g stroke="@A@" stroke-width="2.2" stroke-linecap="round" opacity=".9"><path d="M49 24v-6M55 24v-6M61 24v-6M67 24v-6"/></g><circle cx="60" cy="150" r="7" fill="@B@" opacity=".55"/><circle cx="60" cy="150" r="7" fill="none" stroke="@S@" stroke-width="1"/>',
  pano:'<path d="M20 68h80a6 6 0 0 1 6 6v58a8 8 0 0 1-8 8H22a8 8 0 0 1-8-8V74a6 6 0 0 1 6-6z" fill="@A@"/><path d="M20 68h80a6 6 0 0 1 6 6v58a8 8 0 0 1-8 8H22a8 8 0 0 1-8-8V74a6 6 0 0 1 6-6z" fill="none" stroke="@S@" stroke-width="1.2"/><rect x="36" y="60" width="48" height="18" rx="8" fill="@B@"/><rect x="14" y="100" width="92" height="28" fill="@B@" opacity=".8"/><rect x="30" y="110" width="42" height="5" rx="2.5" fill="#fff" opacity=".55"/>',
  libro:'<path d="M30 22h56a6 6 0 0 1 6 6v118a6 6 0 0 1-6 6H30z" fill="@A@"/><path d="M30 22h56a6 6 0 0 1 6 6v118a6 6 0 0 1-6 6H30z" fill="none" stroke="@S@" stroke-width="1.2"/><path d="M22 22h12v130H22a4 4 0 0 1-4-4V26a4 4 0 0 1 4-4z" fill="@B@"/><rect x="42" y="46" width="40" height="5" rx="2.5" fill="@B@" opacity=".85"/><rect x="42" y="58" width="30" height="4" rx="2" fill="@B@" opacity=".45"/><rect x="42" y="118" width="24" height="4" rx="2" fill="@B@" opacity=".35"/><g stroke="@S@" stroke-width=".8" opacity=".5"><path d="M92 34v112M89 30v120"/></g>',
  gafas:'<circle cx="32" cy="94" r="21" fill="@A@" opacity=".45"/><circle cx="88" cy="94" r="21" fill="@A@" opacity=".45"/><circle cx="32" cy="94" r="21" fill="none" stroke="@B@" stroke-width="5.5"/><circle cx="88" cy="94" r="21" fill="none" stroke="@B@" stroke-width="5.5"/><path d="M53 88q7-6 14 0" fill="none" stroke="@B@" stroke-width="5.5" stroke-linecap="round"/><path d="M12 86L4 74M108 86l8-12" fill="none" stroke="@B@" stroke-width="5.5" stroke-linecap="round"/>',
  gotas:'<path d="M36 82h48v66a14 14 0 0 1-14 14H50a14 14 0 0 1-14-14z" fill="@A@"/><path d="M36 82h48v66a14 14 0 0 1-14 14H50a14 14 0 0 1-14-14z" fill="none" stroke="@S@" stroke-width="1.2"/><rect x="36" y="100" width="48" height="40" fill="@B@" opacity=".85"/><rect x="44" y="110" width="32" height="4" rx="2" fill="#fff" opacity=".6"/><rect x="44" y="119" width="20" height="3" rx="1.5" fill="#fff" opacity=".4"/><rect x="47" y="66" width="26" height="17" rx="3" fill="@B@"/><path d="M53 66V48a7 7 0 0 1 14 0v18z" fill="@B@" opacity=".85"/><path d="M60 22c5 7 8 11 8 15a8 8 0 0 1-16 0c0-4 3-8 8-15z" fill="@B@" opacity=".5"/>',
};
function pfEnvaseSvg(envase,a,b){
  const f=PF_FORMAS[envase]; if(!f) return '';
  return '<svg class="pf-env" viewBox="0 0 120 180" aria-hidden="true">'+
    '<ellipse cx="60" cy="172" rx="33" ry="4.5" fill="rgba(0,0,0,.12)"/>'+
    f.split('@A@').join(a).split('@B@').join(b).split('@S@').join('rgba(0,0,0,.17)')+'</svg>';
}
const PF_AYUDA={acne:'Acn\u00e9',manchas:'Manchas',arrugas:'Arrugas',sensibilidad:'Sensibilidad'};
// Cada categor\u00eda con ficha expone en el maestro el mismo par
// `textoCompra`/`deTextoCompra`, as\u00ed que aqu\u00ed solo hay que saber a qui\u00e9n preguntar.
const PF_FUENTES={
  skincare:    function(){ return window.CIFRAS.RUTINA_PIEL; },
  cabello:     function(){ return window.CIFRAS.RUTINA_PELO; },
  suplementos: function(){ return window.CIFRAS.SUPLEMENTOS; },
  higiene:     function(){ return window.CIFRAS.KIT_HIGIENE; },
  ojos:        function(){ return window.CIFRAS.CUIDADO_OJOS; },
  libros:      function(){ return window.CIFRAS.BIBLIOTECA; },
};
function pfFuente(cat){
  const f=PF_FUENTES[cat]; if(!f||!window.CIFRAS) return null;
  const o=f(); return (o&&o.deTextoCompra) ? o : null;
}
function pfProducto(cat,txt){
  const o=pfFuente(cat); return o ? o.deTextoCompra(txt) : null;
}
// El r\u00f3tulo de arriba: la categor\u00eda del producto si la tiene, y si no el grupo
// al que pertenece \u2014 en higiene y ojos el grupo ES la explicaci\u00f3n ("Al volante").
function pfRotulo(cat,p){
  if(p.cat) return p.cat;
  const o=pfFuente(cat);
  if(o&&o.grupos){
    const g=o.grupos.filter(function(g){ return g.items.indexOf(p)>=0; })[0];
    if(g) return g.n;
  }
  return cat==='suplementos' ? 'Suplemento' : '';
}
// Los pasos salen de `am.uso`/`pm.uso`/`extra.uso`: el "cómo se aplica" ya estaba
// escrito para la rutina, y aquí se lee — no se copia.
function pfPaso(tono,etq,nombre,meta,texto){
  return '<div class="pf-paso" style="--c:var(--pf-'+tono+')">'+
    '<span class="pf-mom">'+etq+'</span>'+
    '<div class="pf-paso-c">'+
    ((nombre||meta)?'<div class="pf-paso-h">'+
      (nombre?'<span class="pf-paso-n">'+nombre+'</span>':'')+
      (meta?'<span class="pf-paso-m">'+meta+'</span>':'')+'</div>':'')+
    '<div class="pf-paso-u">'+texto+'</div></div></div>';
}
// Se decide por lo que el producto TIENE, no por su categor\u00eda: skincare reparte
// el uso en `am`/`pm`/`extra` porque son dos rutinas distintas; el resto lo tiene
// en un solo `uso`. En ninguno de los casos se escribe aqu\u00ed: se lee del maestro.
function pfPasosHtml(cat,p){
  if(p.am||p.pm||p.extra){
    return [['am','AM','am'],['pm','PM','pm'],['extra','EXTRA','mint']].map(function(m){
      const d=p[m[0]]; if(!d) return '';
      return pfPaso(m[2],m[1],d.etiqueta||p.cat,d.min?d.min+' min':'',d.uso);
    }).join('');
  }
  // Los suplementos no tienen `uso`, y no hace falta: lo que hay que saber para
  // tomarlos es la dosis y el momento, y eso s\u00ed est\u00e1 en el maestro.
  if(cat==='suplementos'){
    const esAm=p.momento==='am';
    return pfPaso(esAm?'am':'pm',esAm?'AM':'PM',
      esAm?'Por la ma\u00f1ana':'Por la noche','',
      '<b>'+(p.dosis||'')+'</b>'+(p.cuando?', '+p.cuando:'')+'.');
  }
  if(!p.uso) return '<p class="pf-p">Sin instrucciones en el maestro.</p>';
  // En cabello el "cu\u00e1ndo" son los d\u00edas de la semana, que ya calcula el maestro.
  if(cat==='cabello'){
    const o=pfFuente(cat), c=o&&o.diasTexto?o.diasTexto(p):'';
    return pfPaso(p.tono||'teal','USO',p.cat||'',c||'',p.uso);
  }
  // Sin nombre: en higiene y ojos el r\u00f3tulo es el grupo, y ya sale en la cabecera.
  return pfPaso('teal','USO','','',p.uso);
}
// Las cifras que tienen sentido para ESTE producto. Higiene y ojos no tienen
// dosis ni duraci\u00f3n, y su precio vive en la tabla del dashboard, no en el maestro.
function pfCifrasHtml(cat,txt,p){
  const o=pfFuente(cat), C=[];
  const num=function(x){ return typeof x==='number'&&isFinite(x)&&x>0; };
  if(o&&o.costoMes&&num(o.costoMes(p))) C.push(['$'+o.costoMes(p),'/mes','Lo que cuesta']);
  // El precio lo sabe la lista de la compra del dashboard, no la ficha: si la
  // app que la carga no la tiene — Coach, por ejemplo — la cifra no sale.
  else { const pr=typeof lcPrecioOtros==='function'?lcPrecioOtros(cat,txt):null; if(pr&&pr.amazon) C.push(['$'+pr.amazon,'','Precio aprox.']); }
  if(o&&o.duracionDias&&num(o.duracionDias(p))) C.push([o.duracionDias(p),'d\u00edas','Dura un envase']);
  const cont=p.contenido!=null?p.contenido:p.envase;
  if(num(cont)&&p.unidad) C.push([cont,p.unidad,'Contenido']);
  if(!C.length) return '';
  return '<div class="pf-cifras">'+C.map(function(c){
    return '<div class="pf-c"><div class="pf-c-v">'+c[0]+(c[1]?'<em>'+c[1]+'</em>':'')+'</div>'+
      '<div class="pf-c-k">'+c[2]+'</div></div>';
  }).join('')+'</div>';
}
// Una crema se aplica, una c\u00e1psula se toma y unas chanclas se usan.
const PF_TITULO_USO={skincare:'C\u00f3mo se aplica',cabello:'C\u00f3mo se aplica',
                     suplementos:'C\u00f3mo se toma',higiene:'C\u00f3mo se usa',ojos:'C\u00f3mo se usa'};
function pfCard(titulo,dentro,extra){
  return '<div class="pf-card'+(extra?' '+extra:'')+'">'+
    '<div class="pf-t"><span class="b"></span>'+titulo+'</div>'+dentro+'</div>';
}
// Las dos fotos vienen de internet. Si no llegan — sin red, o el servidor
// caido — se dibuja el envase en su lugar: mas vale una silueta que un hueco.
function pfSinFoto(img){
  const o=pfFuente(img.dataset.pfCat); if(!o) return;
  const lista=o.productos||o.lista||o.todos||[];
  const p=lista.filter(function(x){ return x.id===img.dataset.pf; })[0];
  const caja=img.parentElement; if(!p||!caja) return;
  // Un libro sin portada se dibuja como libro, con el color de su tema.
  const esLibro=img.dataset.pfCat==='libros';
  const frasco=p.frasco||(esLibro?'libro':null); if(!frasco) return;
  const m=p.marca||{a:'#f4f2ee',b:'#8a5a2b'};
  caja.innerHTML=pfEnvaseSvg(frasco,m.a,m.b)+
    '<span class="pf-orig">'+(esLibro?'Sin portada libre':'Envase dibujado')+'</span>';
}
// En skincare y cabello el nombre lleva marca y solo se aceptaron fotos del
// producto EXACTO. En las otras tres el art\u00edculo es gen\u00e9rico ("Cortau\u00f1as de mano
// y de pie"), y la foto ense\u00f1a ese tipo de cosa, no el bote que va a comprar: decir
// "foto del producto" ah\u00ed ser\u00eda mentir.
function pfOrigen(cat){
  return (cat==='skincare'||cat==='cabello') ? 'Foto del producto' : 'Foto de referencia';
}
// La ficha de un libro. Mismo molde que la de un producto \u2014 misma caja, mismo
// hero, mismas tarjetas \u2014 con SUS campos: de un libro no interesa el "c\u00f3mo se
// aplica" sino de qu\u00e9 trata y qu\u00e9 dice.
function pfLibroHtml(cat,txt,p){
  const f=p.ficha, o=pfFuente(cat);
  const grupo=(o&&o.grupos||[]).filter(function(g){ return g.items.indexOf(p)>=0; })[0];
  const media=p.portada
    ? '<img src="'+p.portada+'" alt="'+p.t.replace(/"/g,'&quot;')+'" '+
      'data-pf="'+p.id+'" data-pf-cat="'+cat+'" onerror="pfSinFoto(this)">'+
      '<span class="pf-orig">Portada</span>'
    : pfEnvaseSvg(p.frasco||'libro',(p.marca||{}).a||'#f4f2ee',(p.marca||{}).b||'#8a5a2b')+
      '<span class="pf-orig">Sin portada libre</span>';
  const pr=typeof lcPrecioOtros==='function'?lcPrecioOtros(cat,txt):null;
  const C=[];
  if(p.anio) C.push([p.anio,'','Publicado']);
  if(p.pags) C.push([p.pags,'p\u00e1gs','Extensi\u00f3n']);
  if(pr&&pr.amazon) C.push(['$'+pr.amazon,'','Precio aprox.']);
  const cifras=C.length?'<div class="pf-cifras">'+C.map(function(c){
    return '<div class="pf-c"><div class="pf-c-v">'+c[0]+(c[1]?'<em>'+c[1]+'</em>':'')+'</div>'+
      '<div class="pf-c-k">'+c[2]+'</div></div>';
  }).join('')+'</div>':'';
  return '<div class="pf pf-libro" style="--tono:var(--pf-teal)'+
      (grupo&&grupo.color?';--lomo:'+grupo.color:'')+'">'+
    '<button class="pf-x" onclick="pfCerrar()" aria-label="Cerrar">\u2715</button>'+
    '<div class="pf-hero">'+
      '<div class="pf-foto">'+media+'</div>'+
      '<div class="pf-id">'+
        '<div class="pf-ojo"><i></i>'+(grupo?grupo.n:'Libro').toUpperCase()+'</div>'+
        '<h2 class="pf-h1">'+p.t+'</h2>'+
        '<div class="pf-act"><svg viewBox="0 0 24 24">'+
          '<circle cx="12" cy="8" r="3.6"/>'+
          '<path d="M5.5 20a6.5 6.5 0 0 1 13 0"/></svg>'+
          p.a+'</div>'+
        cifras+
      '</div>'+
    '</div>'+
    '<div class="pf-cuerpo">'+
      '<div class="pf-col">'+
        pfCard('De qu\u00e9 trata','<p class="pf-p destacado">'+f.sobre+'</p>')+
        pfCard('Lo que dice','<p class="pf-p">'+f.resumen+'</p>')+
      '</div>'+
      '<div class="pf-col">'+
        pfCard('Por qu\u00e9 est\u00e1 en tu lista','<p class="pf-p">'+f.porQue+'</p>')+
        pfCard('La idea que m\u00e1s rinde','<p class="pf-p">'+f.idea+'</p>','pf-tarda')+
        pfCard('Cu\u00e1ndo leerlo','<p class="pf-p">'+f.cuando+'</p>')+
      '</div>'+
    '</div>'+
  '</div>';
}
function pfHtml(cat,txt,p){
  if(cat==='libros') return pfLibroHtml(cat,txt,p);
  const f=p.ficha;
  const media=p.foto
    ? '<img src="'+p.foto+'" alt="'+p.n.replace(/"/g,'&quot;')+'" '+
        'data-pf="'+p.id+'" data-pf-cat="'+cat+'" onerror="pfSinFoto(this)">'+
      '<span class="pf-orig">'+pfOrigen(cat)+'</span>'
    : pfEnvaseSvg(p.frasco,p.marca.a,p.marca.b)+'<span class="pf-orig">Envase dibujado</span>';
  const chips=(p.ayuda||[]).map(function(k){
    return PF_AYUDA[k]
      ? '<span class="pf-chip" style="--c:var(--pf-'+k+')">'+PF_AYUDA[k]+'</span>' : '';
  }).join('');
  const marca=p.clave?' \u00b7 CLAVE':(p.opcional?' \u00b7 OPCIONAL':'');
  // `sirve` y `ojo` pueden venir ya escritos en el producto: los suplementos los
  // tienen desde antes como `porQue` y `ojo`, y repetirlos en la ficha ser\u00eda
  // crear el segundo sitio donde vive el mismo dato.
  const sirve=f.sirve||p.porQue||'';
  const ojo=f.ojo||p.ojo||'';
  return '<div class="pf" style="--tono:var(--pf-'+(p.tono||'teal')+')">'+
    '<button class="pf-x" onclick="pfCerrar()" aria-label="Cerrar">\u2715</button>'+
    '<div class="pf-hero">'+
      '<div class="pf-foto">'+media+'</div>'+
      '<div class="pf-id">'+
        '<div class="pf-ojo"><i></i>'+pfRotulo(cat,p).toUpperCase()+marca+'</div>'+
        '<h2 class="pf-h1">'+p.n+'</h2>'+
        '<div class="pf-act"><svg viewBox="0 0 24 24"><path d="M12 2v20M2 12h20"/></svg>'+
          f.activo+'</div>'+
        (chips?'<div class="pf-chips">'+chips+'</div>':'')+
        pfCifrasHtml(cat,txt,p)+
      '</div>'+
    '</div>'+
    '<div class="pf-cuerpo">'+
      '<div class="pf-col">'+
        pfCard('Qu\u00e9 es','<p class="pf-p destacado">'+f.que+'</p>')+
        pfCard(cat==='skincare'?'Qu\u00e9 le hace a tu piel':'C\u00f3mo funciona',
               '<p class="pf-p">'+f.hace+'</p>')+
        (sirve?pfCard('Para qu\u00e9 te sirve a ti','<p class="pf-p">'+sirve+'</p>'):'')+
      '</div>'+
      '<div class="pf-col">'+
        pfCard(PF_TITULO_USO[cat]||'C\u00f3mo se usa',pfPasosHtml(cat,p))+
        pfCard('Cu\u00e1ndo se nota','<p class="pf-p">'+f.tarda+'</p>','pf-tarda')+
        (ojo?pfCard('Ojo con esto','<p class="pf-p">'+ojo+'</p>','pf-ojo-card'):'')+
        (p.aviso?pfCard('Antes de empezar','<p class="pf-p">'+p.aviso+'</p>','pf-aviso'):'')+
      '</div>'+
    '</div>'+
  '</div>';
}
// Se entra por el texto del renglón, que es lo único que la lista conoce.
// `deTextoCompra` lo deshace en el maestro, que es donde se armó.
function pfAbrir(cat,txt){
  const p=pfProducto(cat,txt); if(!p||!p.ficha) return;
  const o=document.getElementById('pfFondo'); if(!o) return;
  o.innerHTML=pfHtml(cat,txt,p);
  o.classList.add('open');
  document.body.style.overflow='hidden';
}
function pfCerrar(){
  const o=document.getElementById('pfFondo'); if(!o) return;
  o.classList.remove('open'); o.innerHTML='';
  document.body.style.overflow='';
}
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    const o=document.getElementById('pfFondo');
    if(o&&o.classList.contains('open')) pfCerrar();
  }
});
