const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const app = express();
app.set('view engine', 'ejs'); // générateur de template «ejs»
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));  // pour utiliser le dossier public

var db; // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(8081, () => {
    console.log('connexion à la BD et on écoute sur le port 8081')
  });
});





app.get('/',  (req, res) => {
   console.log('la route route get / = ' + req.url);
 
    var cursor = db.collection('adresse').find().toArray(function(err, resultat){
       if (err) return console.log(err);
    // renders index.ejs
    // affiche le contenu de la BD
    res.render('indexdel.ejs', {adresse: resultat});

    });
    

});
/*.findOneAndDelete({'telephone' : reqparamstelephone,(err, resultat)*/

app.get('/formulaire',  (req, res) => {
   console.log('la route  get / = ' + req.url);
   res.sendFile(__dirname + "/public/html/formd.html");
});
app.get('/detruire/:id',  (req, res) => {
  var id=req.params.id;
  console.log(req.params.telephone);
  db.collection('adresse').findOneAndDelete({'_id' : ObjectID(req.params.id)}, (err, result) => {
      if (err) return console.log(err);
      console.log('delete dans la BD');
      res.redirect('/');
    });
});/*
app.get('/detruire/:id', (req, res) => {
 var id = req.params.id;
 console.log(id);
 db.collection('adresse')
 .findOneAndDelete({"_id": ObjectID(req.params.id)}, (err, resultat) => {

if (err) return console.log(err)
 res.redirect('/')  // redirige vers la route qui affiche la collection
 })
})

*/
app.post('/adresse',  (req, res) => {
  db.collection('adresse').save(req.body, (err, result) => {
      if (err) return console.log(err);
      console.log('sauvegarder dans la BD');
      res.redirect('/');
    });
});
var i=0;
app.post('/mod/:id',  (req, res) => {
  console.log(req.body.nom+","+req.body.prenom+","+req.params.id);
  i++;
console.log(i+"()"+ObjectID(req.body.id));
  db.collection('adresse').update(

    {'_id' : ObjectID(req.params.id)},
    {"nom": req.body.nom,"prenom": req.body.prenom,"telephone": req.body.telephone,"adresse": req.body.adresse,"codepostal": req.body.codepostal}
    ,(err, result) => {
      if (err) return console.log(err);
      console.log('modifier dans la BD');
      res.redirect('/'); }

    );
});

 