// hello world
console.log('server started');

var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = process.env.DBCONNECTION;
var sessionsecret = process.env.SESSIONSECRET;

const http = require('http').Server(app);
const io = require('socket.io')(http); //io, socket.io-bol

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var fileupload = require('express-fileupload');
app.use(fileupload());

var csvParser = require('csv-parse');

var webToken = require('jsonwebtoken');
var jwt = require('express-jwt');
var secretMiddleware = jwt({ secret: sessionsecret,
                            getToken: function (req){
                              return req.cookies['session'];
                            }});
var crypto = require('crypto');

app.post('/egykonyvfeltoltes', secretMiddleware, function(request, response) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var konyv = request.body;
    konyv.felhasznalo = request.user.felhasznalo;
    dbo.collection("konyvek").insert(request.body, function(err, result) {
      if (err) throw err;
      db.close();
    });
  });
  response.send();
  console.log(request.body);
});

app.post('/blogbejegyzesfel', secretMiddleware, function(request, response) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var bejegyzesfel = request.body;
    bejegyzesfel.felhasznalo = request.user.felhasznalo;
    bejegyzesfel.idopont = Date.now();
    dbo.collection("bejegyzes").insert(bejegyzesfel, function(err, result) {
      if (err) throw err;
      db.close();
    });
  });
  response.send();
  console.log(request.body);
});

app.post('/hozzaszolfel', secretMiddleware, function(request, response) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var hozzaszolas = request.body;
    hozzaszolas.felhasznalo = request.user.felhasznalo;
    hozzaszolas.ido = Date.now();
    //hozzaszolas.id = request.cookies['bejegyzesid'];
    dbo.collection("hozzaszolas").insert(hozzaszolas, function(err, result) {
      if (err) throw err;
      db.close();
    });
  });
  response.send();
  console.log(request.body);
});

app.post('/csvfeltolt', secretMiddleware, function(request, response) {
  response.send();
  var tomb = request.files.file.data.toString("utf8");
  csvParser(tomb, {
    delimiter: ';'
  }, function(err, output){
    console.log(output);
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var hossz = output.length;
      var konyvek = [];
      for(var i = 0; i < hossz; i++){
        var konyv = output[i];
        var jobbkonyv = {
          felhasznalo: request.user.felhasznalo,
          szerzo: konyv[0],
          cim: konyv[1],
          kiadaseve: konyv[2] ? konyv[2] : "",
          kiadasszam: konyv[3],
          tipus: konyv[4],
          sorozatcim: konyv[5],
          sorozatszam: konyv[6],
          //files: konyv[7],
        };
        konyvek[i] = jobbkonyv;
      }
        dbo.collection("konyvekcsv").insertMany(konyvek, function(err, result) {
          if (err) throw err;
          db.close();
        });
    });
    response.send();
  });
});


/*app.post('/temavalasztas', function(request, response) {
  response.cookie('tema',request.body.temavalasz, { maxAge: 900000, httpOnly: true });
  response.send();
  console.log(request.body.felhasznalonev);
});*/

app.post('/temavalasztas', function(request, response) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var tema = request.body;
    dbo.collection("temak").insert(tema, function(err, result) {
      if (err) throw err;
      db.close();
    });
  });
  response.send();
  console.log(request.body);
});

app.get('/konyvlelistazas', secretMiddleware, function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { felhasznalo : req.user.felhasznalo};
    var sort = {cim: 1};
    if (req.query.sort){
      sort = {};
      var sorrend = JSON.parse(req.query.sort);
      Object.keys(sorrend).forEach(function(a){
        sort[a] = parseInt(sorrend[a], 10);
      });
    }
    dbo.collection("konyvek").find(query).collation({locale:"hu", caseFirst: "off"}).sort(sort).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });
});

//autocomletenel van hasznalva
app.get('/osszeskonyv', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("konyvek").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });
});

app.get('/bejegyzesek', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query;
    if(req.query.temanev) { query = { tema : req.query.temanev }; }
    else { query = {};}
    dbo.collection("bejegyzes").find(query).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });
});

app.get('/hozzaszolasokle', function(request, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = {bejegyzesid: request.query.bejegyzesid};
    console.log(query);
    // var query = { tema : req.cookies['tema'] };
    dbo.collection("hozzaszolas").find(query).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });
});

app.get('/temalistazas', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("temak").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });
});


app.post('/egykonyvtorles', function(request, response) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("konyvek").deleteOne({_id: new mongodb.ObjectID(request.body.id)}, function(err, result) {
      if (err) throw err;
      db.close();
    });
  });
  response.send();
  console.log(request.body);
  });

function jelszoellenorzes(jelszo, hash, salt){
  var tempHash = crypto.scryptSync(jelszo, salt, 64);
  tempHash = tempHash.toString("hex");
  return (tempHash === hash);
}

app.post('/bejelentkezes', function(request, response) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = {nev : request.body.felhasznalonev};
    dbo.collection("felhasznalo").findOne(query, function(err, result) {
      if (err) throw err;
      //console.log(result);
      try {
        if(jelszoellenorzes(request.body.jelszo, result.jelszo, result.salt)){
        var signed = webToken.sign({felhasznalo : request.body.felhasznalonev}, sessionsecret, {expiresIn : "10h"});
        response.cookie('session',signed, { maxAge: 900000, httpOnly: true });
      } else{
        response.status(401);
      }
      }
      catch (err){
        console.log(err);
        console.log(err.message);
      }
      response.send();
      db.close();
    });
  });
});

app.post('/regisztracio', function(request, response) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto.scryptSync(request.body.jelszo, salt, 64);
    hash = hash.toString("hex");
    var user = {
      nev : request.body.felhasznalonev,
      jelszo : hash,
      salt : salt,
      email: request.body.email
    };
    dbo.collection("felhasznalo").insert(user, function(err, result) {
      if (err) throw err;
      response.send();
      db.close();
    });
  });
});

app.post('/jelszovaltoztatas', secretMiddleware, function(request, response) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var felhasznalonev = request.user.felhasznalo;
    var query = {nev : felhasznalonev};
    dbo.collection("felhasznalo").findOne(query, function(err, result) {
      if (err) throw err;
      try {
        if(jelszoellenorzes(request.body.regijelszo, result.jelszo, result.salt)){
          var salt = crypto.randomBytes(16).toString('hex');
          var hash = crypto.scryptSync(request.body.ujjelszo, salt, 64);
          hash = hash.toString("hex");
          var newvalues = { $set: {jelszo: hash, salt: salt} };
          dbo.collection("felhasznalo").updateOne(query, newvalues, function(err, res) {
            if (err) throw err;
          });
        } else{
          response.status(401);
        }
      }
      catch (err){
        console.log(err);
        console.log(err.message);
      }
      response.send();
      db.close();
    });
  });
});

app.get('/profil', secretMiddleware, function(request, response) {
  response.send(request.user.felhasznalo);
  console.log(request.user.felhasznalo);
});

app.post('/kilepes', function(request, response) {
  response.clearCookie('session');
  response.send();
});

app.post('/egykonyvadat', function(request, response) {
  response.cookie('egykonyvid',request.body.id, { maxAge: 900000, httpOnly: true });
  response.send();
  console.log(request.body.id);
});

app.get('/konyvadat', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { _id : new mongodb.ObjectID(req.cookies['egykonyvid']) };
    dbo.collection("konyvek").find(query).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      console.log(result);
      db.close();
    });
  });
});

/*
app.post('/bejegyzesid', function(request, response) {
  response.cookie('bejegyzesid',request.body.id, { maxAge: 900000, httpOnly: true });
  response.send();
  console.log(request.body.id);
});

app.get('/bejegyzesadat', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { id : req.cookies['bejegyzesid'] };
    dbo.collection("hozzaszolas").find(query).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      console.log(result);
      db.close();
    });
  });
});
*/



/*
  //connect to mongodb
//MongoClient.connect(url, function(err, db) {
  //if(err){
    //throw err;
  //}
  //console.log("Mongodb connected...");

  //connect to socket.io
  io.on('connection', (socket) => {
    //let chat = db.collection("chats");
    console.log("socket.io connected....");
    
    //create function to send status
    sendStatus = function(s) {
      socket.emit('status', s)
    }

    //get chasts from mongo collection
    chat.find().limit(100).sort({_id:1}).toArray(function(err, res) {
      if(err){
        throw err;
      }

      //emit the messages
      socket.emit('output', res);
    });

    socket.emit('output', 'Hello World');
    
    //handle input events
    socket.on('input', function(data) {
      let name = data.name;
      let message = data.message;

      //check for name and message
      if(name == '' || message == ''){
        //send error status
        sendStatus('Kérlek add meg az üzenetet!')
      } else {
        //insert message
        /*chat.insert({name: name, message: message}, function() {
          client.emit('output', [data]);

          //send status
          sendStatus({
            message: "Az üzenet el lett küldve",
            clear: true
          });
        });
      }
    });

    //handle clear
    socket.on('clear', function(data) {
      //remove all chats from collection
      //chat.remove({}, function() {
        //emit cleared
        socket.emit('cleared');
      //});
    });
  });
//});
*/

app.use(express.static('public'));
app.use(express.static('blog'));
app.use(express.static('felvesz'));
app.use(express.static('konyv'));
app.use(express.static('kolcson'));


var listener = http.listen(process.env.PORT || 3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

io.on('connection', function(socket) {
console.log('user connected....');
});
