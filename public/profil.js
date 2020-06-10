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

function jelszovaltoztatas(){
  superagent
    .post("/jelszovaltoztatas")
    .set('content-type', 'application/json')
    .send(document.getElementById("jelszovaltoztatas").serialize())
    .then(res => {
        kilepes();
    });
}
document.getElementById("jelszovaltgomb").onclick = jelszovaltoztatas;
$.validate({
  form : '#jelszovaltoztatas',
  modules : 'toggleDisabled, security',
  language : myLanguage,
  errorMessagePosition : 'top',
});
