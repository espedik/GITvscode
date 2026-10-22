/* Las marcas de hábitos de la PC, para tus otros dispositivos. Lo escribe el hook de pre-commit
   (Dashboard/habitos-exportar.js) con lo que guarda el Chrome de la PC: no se edita a mano. */
window.HABITOS_SYNC = {
  "exportado": "2026-10-22T04:03:34.462Z",
  "datos": {
    "desde": "2026-09-11",
    "mig": 12,
    "def": [
      {"id":"gym","nombre":"Gimnasio","ancla":"Tras el CENLEX · el sábado a las 07:35","color":"#ff8a3d","dow":[1,2,3,4,5,6],"ico":"pesa","hora":"18:15","pasos":["Series, reps y peso de cada ejercicio: en Ejercicio, en la barra de arriba."],"gym":true},
      {"id":"ale","nombre":"Clase de alemán","ancla":"CENLEX · ESCA Santo Tomás, hasta las 18:00","color":"#ffd93d","dow":[1,2,3,4,5],"ico":"habla","hora":"17:00","pasos":["Sales de ALTEN a las 16:40 y manejas unos 20 min al CENLEX.","Clase de 17:00 a 18:00 · vas por el Kapitel {{kapitelAleman}}.","Lleva anotadas las 3 palabras que no te salieron en la clase anterior.","A las 18:00, del CENLEX al gimnasio: unos 15 min."]},
      {"id":"leer","nombre":"Leer 10 páginas","ancla":"En el cierre del día","color":"#b06eff","dow":"todos","ico":"libro","hora":"21:45","pasos":["10 páginas es el mínimo para marcarlo; el bloque completo son 30 min."],"rutina":"wd-cierre","sec":"Lectura"},
      {"id":"agua","nombre":"Agua · 3 litros","ancla":"Botella llena al salir","color":"#00b8d9","dow":"todos","ico":"gota","meta":3,"hora":"","pasos":["Litro 1: la botella llena al salir de casa, terminada antes de comer.","Litro 2: en ALTEN por la tarde, antes de salir al CENLEX.","Litro 3: entre el gimnasio y la cena.","Marca un litro cada vez que termines la botella: tres toques y el día está."]},
      {"id":"sueno","nombre":"Dormir 7 h","ancla":"Luz fuera a las 23:40","color":"#818cf8","ico":"luna","dow":"todos","desde":"2026-09-11","hora":"23:40","pasos":["Pantallas fuera a las {{horaRutinaNoche}}, al cerrar la app: la rutina de la noche y la meditación van sin celular.","Luz fuera a las {{horaDormir}}: son {{horasSueno}} hasta las {{horaDespertar}}, justo el mínimo. Cada media hora que te pases se nota al día siguiente.","Celular fuera del cuarto: es lo que hace que despertar sin snooze funcione."]},
      {"id":"piel","nombre":"Rutina de la noche","ancla":"Piel, minoxidil y suplementos","color":"#fb7185","ico":"chispa","dow":"todos","desde":"2026-09-11","hora":"23:00","rutina":"wd-pm"},
      {"id":"app","nombre":"Construir esta app","ancla":"10 min antes de arrancar · y de 22:30 a 23:00","hora":"06:43","color":"#22d3ee","ico":"codigo","dow":[1,2,3,4,5],"desde":"2026-09-12","pasos":["Por la mañana, 10 min: abre el proyecto y anota UNA mejora concreta para hoy.","De {{horaApp}} a {{horaRutinaNoche}}: constrúyela, pruébala en el navegador y súbela a GitHub. Es la última pantalla del día.","Si no cabe en 30 min, pártela. Lo que suba hoy tiene que funcionar; lo demás espera a mañana, no al sueño."],"flex":true},
      {"id":"fase0","nombre":"Plan Maestro · 1h15","ancla":"La tarea de la fase que toca esta semana","hora":"20:00","color":"#8b5cf6","ico":"diana","dow":[1,2,3,4,5],"desde":"2026-09-12","pasos":["1h15 de avance en la tarea de la fase que toca esta semana: la marca el tablero del Plan Maestro.","Antes de empezar, decide qué vas a tener hecho a las 21:15. Una cosa, no tres.","Sin Didi ni celular en este bloque: es el único hueco de trabajo profundo del día."],"flex":true},
      {"id":"linkedin","nombre":"Posts del negocio de tu papá","ancla":"Al llegar a ALTEN, antes del correo · 20 min","hora":"08:30","color":"#4ade80","ico":"pluma","dow":[1,3,5],"flex":true,"pasos":["Abre Posts: trae listo el post de hoy de Aeroresinas —reparación de helicópteros— y el de Heliescala —helicópteros a escala—.","Publica los dos en LinkedIn —en la página de cada empresa, y compártelos desde el perfil de tu papá— y su versión corta en Facebook.","Cada uno cierra con el WhatsApp de su web: el cliente que llegue ya sabe dónde escribir.","Contesta comentarios y mensajes ese mismo día. 20 min y fuera."],"desde":"2026-09-21"},
      {"id":"alcohol","nombre":"Cero alcohol","ancla":"Todo el día · si se antoja, agua mineral o té","hora":"","color":"#4ade80","ico":"loto","dow":"todos","pasos":["Se marca al cerrar el día si no tomaste nada: ni una.","Si se antoja: agua mineral con limón o un té, y cambia de lugar si hace falta.","Si recaes, márcalo como fallado y anota qué lo disparó en la ficha de Dejar el alcohol de Mis Metas. Mañana sigue la cadena."],"desde":"2026-10-01"}
    ],
    "marcas": {
      "2026-09-11": {"app":1,"ale":1,"piel":1,"sueno":1,"agua":3,"fase0":1},
      "2026-09-12": {"app":1,"gym":1,"fase0":1,"piel":1,"sueno":1,"agua":3},
      "2026-09-13": {"app":1,"piel":1,"agua":3,"sueno":1},
      "2026-09-14": {"app":1,"ale":1,"gym":1,"piel":1,"sueno":1,"agua":3},
      "2026-09-15": {"ale":1,"app":1,"gym":1,"piel":1,"sueno":1,"agua":3},
      "2026-09-16": {"app":1},
      "2026-09-17": {"ale":1,"app":1,"gym":1,"fase0":1,"piel":1,"sueno":1,"agua":3},
      "2026-09-18": {"app":1,"ale":1,"fase0":1,"piel":1,"sueno":1,"agua":3},
      "2026-09-19": {"app":1,"fase0":1,"piel":1,"sueno":1},
      "2026-09-20": {"app":1,"fase0":1,"piel":1,"agua":3},
      "2026-09-21": {"app":1,"fase0":1,"piel":1,"sueno":1},
      "2026-09-24": {"gym":1,"app":1,"piel":1},
      "2026-09-25": {"gym":1,"app":1,"piel":1},
      "2026-09-28": {"ale":1,"piel":1,"sueno":1,"agua":3},
      "2026-09-29": {"ale":1,"piel":1,"sueno":1,"agua":3},
      "2026-09-30": {"app":1,"ale":1,"piel":1,"sueno":1,"agua":3},
      "2026-10-01": {"app":1,"ale":1,"piel":1,"sueno":1,"agua":3,"gym":1},
      "2026-10-02": {"app":1,"ale":1,"gym":1,"fase0":1,"piel":1,"sueno":1,"agua":3,"alcohol":1},
      "2026-10-03": {"app":1,"gym":1,"fase0":1,"piel":1,"agua":3},
      "2026-10-05": {"app":1,"ale":1,"fase0":1,"piel":1,"sueno":1,"agua":3,"alcohol":1},
      "2026-10-06": {"app":1,"agua":3,"sueno":1,"alcohol":1,"fase0":1,"ale":1},
      "2026-10-07": {"app":1,"agua":3,"sueno":1,"alcohol":1,"fase0":1,"ale":1},
      "2026-10-08": {"app":1,"agua":3,"sueno":1,"alcohol":1,"fase0":1,"gym":1,"ale":1},
      "2026-10-09": {"app":1,"agua":3,"sueno":1,"alcohol":1,"fase0":1,"ale":1,"piel":1},
      "2026-10-10": {"gym":1,"piel":1,"sueno":1,"alcohol":1,"agua":3},
      "2026-10-11": {"alcohol":1,"sueno":1,"piel":1,"agua":3,"fase0":1,"app":1},
      "2026-10-12": {"ale":1,"fase0":1,"piel":1,"sueno":1,"agua":3,"alcohol":1,"app":1},
      "2026-10-13": {"ale":1,"gym":1,"fase0":1,"piel":1,"sueno":1,"agua":3,"alcohol":1,"app":1},
      "2026-10-14": {"app":1,"ale":1,"fase0":1,"piel":1,"sueno":1,"agua":3,"alcohol":1},
      "2026-10-15": {"app":1,"ale":1,"piel":1,"sueno":1,"agua":3,"alcohol":1},
      "2026-10-16": {"ale":1,"gym":1,"fase0":1,"piel":1,"sueno":1,"agua":3,"alcohol":1},
      "2026-10-17": {"gym":1,"fase0":1,"piel":1,"sueno":1,"agua":3,"alcohol":1},
      "2026-10-18": {"app":1,"fase0":1,"piel":1,"sueno":1,"agua":3,"alcohol":1},
      "2026-10-19": {"app":1}
    }
  }
};
