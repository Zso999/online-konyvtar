function newTema() {
  var x = document.getElementById("Tema");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

  var y = document.getElementById("pluszgomb");
  y.classList.toggle("kicsi");
}

function showAjanlas() {
document.getElementById("ajanlasok").style.display = "block";
}
function closeAjanlas() {
document.getElementById("ajanlasok").style.display = "none";
}

HTMLElement.prototype.serialize = function() {
  var obj = {};
  var elements = this.querySelectorAll("input, select, textarea");
  for (var i = 0; i < elements.length; ++i) {
    var element = elements[i];
    var name = element.name;
    var value = element.value;

    if (name) {
      obj[name] = value;
    }
  }
  return JSON.stringify(obj);
};

console.log(document.getElementById("bejegyez").serialize());

function rogzites() {
  superagent
    .post("/blogbejegyzesfel")
    .set("content-type", "application/json")
    .send(document.getElementById("bejegyez").serialize())
    .then(res => {
      alert("Sikeres küldés! :D");
      document.getElementById("bejegyez").reset();
    });
}

function hozzaszolt(formid) {
  superagent
    .post("/hozzaszolfel")
    .set("content-type", "application/json")
    .send(document.getElementById(formid).serialize())
    .then(res => {
      alert("Sikeres küldés! :D");
      document.getElementById(formid).reset();
    });
  /*superagent
    .post("/bejegyzesid")
    .set("content-type", "application/json")
    .send(JSON.stringify({id: konyvid}))
    .then(res => {

    });*/
}

let temabeallitva;
function onListazas() {
  document.getElementById("bejegyzesek").innerHTML = "";
  document.getElementById("loading").style.display = "block";
  superagent
    .get("/bejegyzesek")
    .query({temanev: temabeallitva})
    .then(function(response) {
    var clicks = 0;
    var bejegyzesek = response.body;
    for (var i = 0; i < bejegyzesek.length; i++) {
      kiirBejegyzes(bejegyzesek[clicks], clicks);
      onHozzaszolas(bejegyzesek[clicks]._id);
      //console.log(bejegyzesek[i]._id);
      //console.log(bejegyzesek[i]);
      //console.log("clicks" + clicks);
      clicks += 1;
    }
    document.getElementById("loading").style.display = "none";
  });
}
onListazas();


function onHozzaszolas(bejegyezesid) {
  document.getElementById("loading").style.display = "block";
  superagent
    .get("/hozzaszolasokle")
    .query({bejegyzesid: bejegyezesid})
    .then(function(response) {
    var click = 0;
    //console.log("hozzaszolasok");
    //console.log(response.body);
    var hozzaszolasok = response.body;
    for (var i = 0; i < hozzaszolasok.length; i++) {
      kiirHozzaszolas(hozzaszolasok[click], bejegyezesid);
      click += 1;
    }
    document.getElementById("loading").style.display = "none";
  });
}


var clicksi = 0;
function onTema() {
  clicksi = 0;
  document.getElementById("loading").style.display = "block";
  superagent.
  get("/temalistazas")
  .then(function(response) {
    //console.log(response.body);
    var temak = response.body;
    for (var i = 0; i < temak.length; i++) {
      kiirTema(temak[clicksi]);
      clicksi += 1;
    }
    document.getElementById("loading").style.display = "none";
  });
}

onTema();

function temavalasz() {
  superagent
    .post("/temavalasztas")
    .set("content-type", "application/json")
    .send(document.getElementById("temavalasztas").serialize())
    .then(res => {
      alert("Sikeres küldés! :D");
      document.getElementById("temavalasztas").reset();
    });
}

/*function showHozzaszolas(hanyadik) {
  console.log("hanyadik"+hanyadik);
  var h = document.getElementsByClassName("h");
  console.log(h);
  if(h[hanyadik].style.display === "none"){
     h[hanyadik].style.display = "block";
     } else {
       h[hanyadik].style.display = "none";
     }
}*/

function kiirBejegyzes(bejegyzes) {
  //bejegyzes.idopont
  //.setAttribute("", "");
  //console.log("valami");
  //console.log(annyiadik);
  var bej = document.getElementById("bejegyzesek");

  const milliseconds = bejegyzes.idopont;
  const dateObject = new Date(milliseconds);
  const ido = dateObject.toLocaleDateString();
  var felhasznalo = bejegyzes.felhasznalo;
  if (felhasznalo === null) felhasznalo = "ismeretlen";

  var dki = document.createElement("DIV");
  var d = document.createTextNode("");
  dki.appendChild(d);
  bej.appendChild(dki);

  dki.setAttribute("class", "bejegyz");
  dki.setAttribute("id", bejegyzes._id);

  var em = document.createElement("EM");
  var e = document.createTextNode(ido+"-án "+felhasznalo+" írta:");
  em.appendChild(e);
  dki.appendChild(em);

  em.setAttribute("class", "fejlec");

  var dszov = document.createElement("DIV");
  var dsz = document.createTextNode(bejegyzes.message + "\n");
  dszov.appendChild(dsz);
  dki.appendChild(dszov);

  dszov.setAttribute("class", "szoveg");

  var form = document.createElement("FORM");
  var texti = document.createTextNode("");
  form.appendChild(texti);
  dki.appendChild(form);

  form.setAttribute("class", "hozzaszolok");
  form.setAttribute("method", "post");
  form.setAttribute("action", "/hozzaszol");
  form.setAttribute("id", "formid_"+bejegyzes._id);

  var hozzaszolas = document.createElement("INPUT");
  var texting = document.createTextNode("");
  hozzaszolas.appendChild(texting);
  form.appendChild(hozzaszolas);

  hozzaszolas.setAttribute("type", "text");
  hozzaszolas.setAttribute("class", "hozzaszolni");
  hozzaszolas.setAttribute("name", "uzenet");

  var id = document.createElement("INPUT");
  form.appendChild(id);

  id.setAttribute("type", "hidden");
  id.setAttribute("value", bejegyzes._id);
  id.setAttribute("name", "bejegyzesid");

  var hozza = document.createElement("BUTTON");
  var textin = document.createTextNode("Rögzít");
  hozza.appendChild(textin);
  form.appendChild(hozza);

  hozza.setAttribute("class", "hozzaszoltam");
  hozza.setAttribute("type", "button");
  hozza.setAttribute("onclick", "hozzaszolt('formid_"+bejegyzes._id+"')");

  var dhozza = document.createElement("A");
  var dh = document.createTextNode("\n Hozzászólások");
  dhozza.appendChild(dh);
  dki.appendChild(dhozza);

  dhozza.setAttribute("class", "hozzagomb");
}

function temabeallit(tema){
  temabeallitva = tema;
  onListazas();
}

function kiirTema(tema) {
  var block = document.createElement("A");
  var text = document.createTextNode(tema.ujtema);
  block.appendChild(text);
  document.getElementById("mindentema").appendChild(block);
  block.onclick = function(){temabeallit(tema.ujtema)};

  var block1 = document.createElement("OPTION");
  var text1 = document.createTextNode(tema.ujtema);
  block1.appendChild(text1);
  document.getElementById("téma").appendChild(block1);
}

{
  var dropdown = document.getElementsByClassName("dropdown-btn");
  var i;
  {
    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }
  }
}

function kiirHozzaszolas(hozzaszolasok, bejegyzes){
  //console.log(bejegyzes);
  var dki = document.getElementById(bejegyzes);

  const milliseconds = hozzaszolasok.ido;
  const dateObject = new Date(milliseconds);
  const ido = dateObject.toLocaleDateString();
  var felhasznalo = hozzaszolasok.felhasznalo;
  if (felhasznalo === null) felhasznalo = "ismeretlen";

  var em = document.createElement("EM");
  var e = document.createTextNode(ido+"-án "+felhasznalo+" írta:");
  em.appendChild(e);
  dki.appendChild(em);

  em.setAttribute("class", "hfejlec");

  var dszov = document.createElement("DIV");
  var dsz = document.createTextNode(hozzaszolasok.uzenet);
  dszov.appendChild(dsz);
  dki.appendChild(dszov);
  dszov.setAttribute("class", "hszoveg");

  var hr = document.createElement("HR");
  dki.appendChild(hr);
  hr.setAttribute("class", "hr");
}

/*
function tobb(bejegyzesid) {
  superagent
    .post("/egybejegyzes")
    .set('content-type', 'application/json')
    .send(JSON.stringify({id: bejegyzesid}))
    .then(res => {
      console.log(bejegyzesid);
    });
}
*/
