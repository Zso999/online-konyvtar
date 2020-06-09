function profilnev(){
  superagent
    .get('/profil')
    .then(function(response) {
      var profilnev = response.text;
      if(document.getElementsByClassName("dropdown2") != undefined){
        var profilok = document.getElementsByClassName("dropdown2");
        profilok[0].style.display = "block";
      }
      /*if(document.getElementsByClassName("kfelvev") != undefined){
         var konyvfelvetel = document.getElementsByClassName("kfelvev");
         for(var i = 0; i < konyvfelvetel.length; i++)
           konyvfelvetel[i].style.display = "block";
         }*/
      if(document.getElementById("loading") != undefined)
        document.getElementById("loading").style.display = "block";
      if(document.getElementById("kepek") != undefined)
        document.getElementById("kepek").style.display = "none";
      document.getElementById("belepes").style.display = "none";
      document.getElementById("profilgomb").innerHTML = profilnev;
      document.getElementById("regisztracio").style.display = "none";
      document.getElementById("kfelvev").href = "#/konyvfelvetel";
    })
    .catch(function(){
      var profilok = document.getElementsByClassName("dropdown2");
      profilok[0].style.display = "none";
      /*if(document.getElementsByClassName("kfelvev") != undefined){
        var konyvfelvetel = document.getElementsByClassName("kfelvev")
        for(var i = 0; i < konyvfelvetel.length; i++)
          konyvfelvetel[i].style.display = "none";
      }*/
      document.getElementById("kfelvev").href = "#/signin";
      if(document.getElementById("loading") != undefined)
        document.getElementById("loading").style.display = "none";
      document.getElementById("belepes").style.display = "block";
      if(document.getElementById("kepek") != undefined)
        document.getElementById("kepek").style.display = "block";
      document.getElementById("regisztracio").style.display = "block";
  });
}

profilnev();


function kilepes(){
  superagent
    .post('/kilepes')
    .then(function(response) {
      profilnev();
      window.location.hash = "/signin";
    });
}
document.getElementById("kilepes").onclick = kilepes;

function lemenu(){
  var lista = document.getElementById("profillista");
  if(lista.style.display === "block") lista.style.display = "none";
  else lista.style.display = "block";
}

document.getElementById("profilgomb").onclick = lemenu;

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn2')) {
    var dropdowns = document.getElementsByClassName("dropdown2-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.style.display === "block") {
        openDropdown.style.display = "none";
      }
    }
  }
}

/*function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

/*function profilnev() {
  var profil = getCookie("felhasznalo");
  /*if (profil == undefined) {
    document.getElementById("profilnev").innerHTML = "Belépés";
  } else {
    document.getElementById("profilnev").innerHTML = document.cookies;
  //}
}

profilnev();*/
