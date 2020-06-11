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

console.log(window.location);
function belepes() {
  superagent
    .post("/bejelentkezes")
    .set('content-type', 'application/json')
    .send(document.getElementById("bejelentkezik").serialize())
    .then(res => {
      //  window.location = "konyv/sajatkonyvtar.html";
        profilnev();
        location.reload();
    });
}
