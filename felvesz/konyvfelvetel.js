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
  //return JSON.stringify(obj);
  return obj;
};

console.log(document.getElementById("felvetel").serialize());

function konyvfeltoltes(fedlap){
  var form = document.getElementById("felvetel").serialize();
  if (fedlap) form.fedlap = fedlap;
  superagent
      .post("/egykonyvfeltoltes")
      .set("content-type", "application/json")
      .send(JSON.stringify(form))
      .then(res => {
        alert("Sikeres könyvfelvétel!");
        document.getElementById("felvetel").reset();
        autocom();
        autocomplete(document.getElementById("szerzo"), szerzok);
        autocomplete(document.getElementById("cim"), cimek);
  });
}

function rogzites() {
  
  var file = document.querySelector("input[type=file]")["files"][0];
  var reader = new FileReader();
  var baseString;
  if(file){
  reader.onloadend = function() {
    baseString = reader.result;
    var fedlap = baseString;
    console.log(baseString);
    konyvfeltoltes(fedlap);
  };
  console.log(file);
  reader.readAsDataURL(file);
  } else {
    konyvfeltoltes();
  }
}

function sorKiir() {
  var checkBox = document.getElementById("sorResz");
  var text = document.getElementById("sorInfo");
  var text1 = document.getElementById("sorInfosz");
  if (checkBox.checked == true) {
    text.style.display = "block";
    text1.style.display = "block";
  } else {
    text.style.display = "none";
    text1.style.display = "none";
  }
}

function csvfeltoltes() {
  superagent
    .post("/csvfeltolt")
    .send(new FormData(document.getElementById("csvfeltolt")))
    .then(res => {
      alert("Sikeres feltöltés!");
      document.getElementById("csvfeltolt").reset();
    });
}

var cimek = [];
var szerzok = [];
var sorozatcimek = [];
var cimDb, szerzoDb, sorozatcimDb;

function autocom() {
  cimek = [];
  szerzok = [];
  sorozatcimek = [];
  cimDb = 0;
  szerzoDb = 0;
  sorozatcimDb = 0;
  superagent
    .get('/osszeskonyv')
    .then(function(response) {
      var konyvek = response.body;
      for (var i = 0; i < konyvek.length; i++) {
        //console.log(konyvek.length);
        if(i < konyvek.length-1){
          for (var j = i+1; j < konyvek.length; j++) {
            if(konyvek[i].szerzo == konyvek[j].szerzo){
              j = konyvek.length;
            } else if(j == konyvek.length - 1){
              szerzok[szerzoDb] = konyvek[i].szerzo;
              szerzoDb++;
            }
          }
          for (var j = i+1; j < konyvek.length; j++) {
            if(konyvek[i].cim == konyvek[j].cim){
              j = konyvek.length;
            } else if(j == konyvek.length - 1){
              cimek[cimDb] = konyvek[i].cim;
              cimDb++;
            }
          }
          for (var j = i+1; j < konyvek.length; j++) {
            if(konyvek[i].sorozatcim != ""){
              if(konyvek[i].sorozatcim == konyvek[j].sorozatcim){
                j = konyvek.length;
              } else if(j == konyvek.length - 1){
                sorozatcimek[sorozatcimDb] = konyvek[i].sorozatcim;
                sorozatcimDb++;
              }
            }
          }
        } else {
          szerzok[szerzoDb] = konyvek[i].szerzo;
          cimek[cimDb] = konyvek[i].cim;
          if(konyvek[i].sorozatcim != "") sorozatcimek[sorozatcimDb] = konyvek[i].sorozatcim;
        }
      }
    });
}

autocom();

function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

function Help(){
  var h = document.getElementById("help");
  if(h.style.display === "none"){
    h.style.display = "block";
  } else {
    h.style.display = "none";
  }
}

profilnev();