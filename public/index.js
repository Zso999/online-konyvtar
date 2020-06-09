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

var myLanguage = {
        errorTitle: 'Sikertelen küldés!',
        requiredFields: 'Nincs mindegyik mező kitöltve!',
        badTime: 'You have not given a correct time',
        badEmail: 'Érvénytelen email-cím',
        badTelephone: 'You have not given a correct phone number',
        badSecurityAnswer: 'You have not given a correct answer to the security question',
        badDate: 'You have not given a correct date',
        lengthBadStart: 'The input value must be between ',
        lengthBadEnd: ' characters',
        lengthTooLongStart: 'The input value is longer than ',
        lengthTooShortStart: 'The input value is shorter than ',
        notConfirmed: 'Input values could not be confirmed',
        badDomain: 'Incorrect domain value',
        badUrl: 'The input value is not a correct URL',
        badCustomVal: 'The input value is incorrect',
        andSpaces: ' and spaces ',
        badInt: 'The input value was not a correct number',
        badSecurityNumber: 'Your social security number was incorrect',
        badUKVatAnswer: 'Incorrect UK VAT Number',
        badStrength: 'The password isn\'t strong enough',
        badNumberOfSelectedOptionsStart: 'You have to choose at least ',
        badNumberOfSelectedOptionsEnd: ' answers',
        badAlphaNumeric: 'The input value can only contain alphanumeric characters ',
        badAlphaNumericExtra: ' and ',
        wrongFileSize: 'The file you are trying to upload is too large (max %s)',
        wrongFileType: 'Only files of type %s is allowed',
        groupCheckedRangeStart: 'Please choose between ',
        groupCheckedTooFewStart: 'Please choose at least ',
        groupCheckedTooManyStart: 'Please choose a maximum of ',
        groupCheckedEnd: ' item(s)',
        badCreditCard: 'The credit card number is not correct',
        badCVV: 'The CVV number was not correct',
        wrongFileDim : 'Incorrect image dimensions,',
        imageTooTall : 'the image can not be taller than',
        imageTooWide : 'the image can not be wider than',
        imageTooSmall : 'the image was too small',
        min : 'min',
        max : 'max',
        imageRatioNotAccepted : 'Image ratio is not accepted'
    };


$.validate({
  form : '#regisztral',
  modules : 'toggleDisabled, security',
  language : myLanguage,
  errorMessagePosition : 'top',
  //validateOnBlur : false,
});

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
