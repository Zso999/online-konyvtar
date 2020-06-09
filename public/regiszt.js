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

function regisztracio() {
  superagent
    .post("/regisztracio")
    .set('content-type', 'application/json')
    .send(document.getElementById("regisztral").serialize())
    .then(res => {
        window.location.hash = "/signin";
    });
}
document.getElementById("regisztgomb").onclick = regisztracio;
//$.validate({
//  form : '#regisztral',
//  modules : 'toggleDisabled, security',
  //validateOnBlur : false,
//});
