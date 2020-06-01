var clicks = 0;
function pluszSor(konyv) {
  var table = document.getElementById("konyveim");
  var rownumber = clicks;
  var row = table.insertRow(rownumber);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = konyv.szerzo;
  cell2.innerHTML = konyv.cim;
  cell3.innerHTML = konyv.tipus;
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);
  cell4.innerHTML = konyv.kiadaseve;
  cell5.innerHTML = konyv.kiadasszam;
  cell6.innerHTML = konyv.sorozatcim;
  cell7.innerHTML = konyv.sorozatszam;
  
  cell4.setAttribute("class", "moreless");
  cell5.setAttribute("class", "moreless");
  cell6.setAttribute("class", "moreless");
  cell7.setAttribute("class", "moreless");
  cell4.setAttribute("style", "display: none;");
  cell5.setAttribute("style", "display: none;");
  cell6.setAttribute("style", "display: none;");
  cell7.setAttribute("style", "display: none;");
  
  var cell8 = row.insertCell(7);
  cell8.innerHTML = `<a href="#/egykonyv"><button style="width: 90px;" onclick="tobb('${konyv._id}')">Több</button></a>`;
  cell8.setAttribute("style", "text-align: center;")
}

function listazas(sorrend) {
  document.getElementById("konyveim").innerHTML = "";
  clicks = 0;
  document.getElementById("konyvtar").style.display = "none";
  superagent
    .get('/konyvlelistazas')
//    .query({ format: 'json' })
    .query({sort: JSON.stringify(sorrend)})
    .then(function(response) {
      var konyvek = response.body;
      for (var i = 0; i < konyvek.length; i++) {
        pluszSor(konyvek[clicks]);
        clicks += 1;
      }
      document.getElementById("loading").style.display = "none";
      document.getElementById("konyvtar").style.display = "table";
      $('#konyvtar').DataTable( {
        "columns": [
          null,
          null,
          { "orderable": false },
          { "orderable": false },
          { "orderable": false },
          { "orderable": false },
          { "orderable": false },
          { "orderable": false },
        ]
      } );
    });
}
listazas();

function tobb(konyvid) {
  superagent
    .post("/egykonyvadat")
    .set('content-type', 'application/json')
    .send(JSON.stringify({id: konyvid}))
    .then(res => {
      console.log(konyvid);
    });
}

function tobbGomb(){
  var gomb = document.createElement("BUTTON");
  var t = document.createTextNode("Többet");
  gomb.appendChild(t);
  document.getElementById("tobbkevesebb").appendChild(gomb);
  gomb.setAttribute("id", "more");
  gomb.setAttribute("onclick", "TpluszK()");
}
tobbGomb();

var y = document.getElementsByClassName("moreless");
  var i;
  for (i = 0; i < y.length; i++) {
    y[i].style.display = "none";
    }

function TpluszK(){
  var x = document.getElementById("more");
  
  if (x.innerHTML === "Többet") {
    x.innerHTML = "Kevesebbet";
    for (i = 0; i < y.length; i++) {
    y[i].style.display = "table-cell";
    }
  } else {
    x.innerHTML = "Többet";
    for (i = 0; i < y.length; i++) {
    y[i].style.display = "none";
    }
  }
}

// document.getElementById("szerzo").onclick = function() {
//   listazas({szerzo: 1});
// }

/*document.getElementById("cim").onclick = function() {
  listazas({cim: 1});
}

/*function autocomplete(inp, arr) {
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
  /*inp.addEventListener("keydown", function(e) {
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

*/