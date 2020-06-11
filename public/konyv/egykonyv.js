function kiiradat() {
  document.getElementById("loading").style.display = "block";
  document.getElementById("keret").style.display = "none";
  superagent
    .get('/konyvadat')
    .then(function(response) {
      console.log(response.body);
      var konyv = response.body[0];
      document.getElementById("boritokep").src = konyv.fedlap;
      document.getElementById("konyvszerzo").innerHTML = konyv.szerzo;
      document.getElementById("konyvcim").innerHTML = konyv.cim;
      document.getElementById("konyvformatum").innerHTML = konyv.tipus;
      document.getElementById("konyvkiadaseve").innerHTML = konyv.kiadaseve;
      document.getElementById("konyvkiadasszama").innerHTML = konyv.kiadasszam;
      document.getElementById("torlesgomb").onclick = "torles('${konyv._id}')";
      //document.getElementById("szerkesztgomb").innerHTML = `<button onclick="">Szerkesztés</button>`;
      if(konyv.sorozatcim == ""){
        var ketsor = document.getElementsByClassName("egysoradat");
        for (var i = 0; i < ketsor.length; i++) {
          ketsor[i].style.display = "none";
        }
      } else {
        document.getElementById("konyvsorozatcime").innerHTML = konyv.sorozatcim;
        document.getElementById("konyvsorozatszam").innerHTML = konyv.sorozatszam;
      }
      document.getElementById("loading").style.display = "none";
      document.getElementById("keret").style.display = "block";
    });
}

kiiradat();

function kepkiir(){
	var borito = document.getElementById("boritokep");
	var adat = document.getElementById("adatokjobb");
	var kep = document.getElementById("kep");
	if(document.getElementById("boritokep").src != ""){
		kep.style.width = "49%";
		kep.style.display = "block";
		adat.style.width = "49%";
		//console.log("A kép létezik");
	} else {
		kep.style.display = "none";
		adat.style.width = "100%";
		//console.log("A kép nem létezik");
	}
}

kepkiir();

function torles(konyvid) {
  superagent
    .post("/egykonyvtorles")
    .set('content-type', 'application/json')
    .send(JSON.stringify({id: konyvid}))
    .then(res => {
      alert("Sikeres törlés! :D");
     // document.getElementById("myTable").innerHTML = '';
      window.location = "#/sajatkonyvtar";
      //console.log("Relokáció2")
    });
}
