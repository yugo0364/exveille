const fs = require("fs");
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const app = express();
app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public
app.use(bodyParser.json())  // pour traiter les données JSON

var http = require("http");
var prov={};
var db; // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017/cprovinces', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(8081, () => {
    console.log('connexion à la BD et on écoute sur le port 8081')
  });
});





app.get('/',  (req, res) => {
   console.log('la route route get / = ' + req.url);
 
    var cursor = db.collection('provinces').find().toArray(function(err, resultat){
       if (err) return console.log(err);
    // renders index.ejs
    // affiche le contenu de la BD
    res.render('index.ejs', {adresse: resultat});

    });
    

});


app.get('/provinces',  (req, res) => {
  console.log("lire Json");
  fs.readFile('provinces.json', 'utf8', function (err, data) {
  if (err) throw err;
  rel = JSON.parse(data);
   console.log(data);
   res.render('index.ejs', {adresse: rel});


});
  /*db.collection('cprovinces').save(req.body, (err, result) => {
      if (err) return console.log(err);
      console.log('sauvegarder dans la BD');
      res.redirect('/');
    });*/
});


app.get('/colletion',  (req, res) => {

      res.redirect('/');
});
 <!---->
app.get('/add',  (req, res) => {
      var val=Math.round(Math.random()*100)+100;

      db.collection('provinces').insert( { 
      "code": "QC",  
      "nom" : "Québec",
      "capital" :   val    }, (err, result) => {
      if (err) return console.log(err);
      console.log('ajout dans la BD');
      res.redirect('/'); 

    });
});
   app.get('/detruire',  (req, res) => {
     db.collection('provinces').remove({}, (err, result) => {
      if (err) return console.log(err);
      console.log('detruire dans la BD');
      res.redirect('/'); 

    });
});
  function valeur(obj) {
    var result = [];
    for (var i=0;obj.length;i++) {
      result.push(obj[i]);
    }
    return result;
}

app.get('/addall',  (req, res) => {
  var gime;
  fs.readFile('provinces.json', 'utf8', function (err, data) {
  if (err) throw err;
  gime = JSON.parse(data); console.log(gime);
  db.collection('provinces').insertMany(gime, (err, result) => {
      if (err) return console.log(err);
      console.log('ajouts dans la BD');
      res.redirect('/'); 

    });});

     

     
});
