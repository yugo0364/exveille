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
  console.log(req.params.telephone);
  db.collection('adresse').findOneAndDelete(req.body, (err, result) => {
      if (err) return console.log(err);
      console.log('delete dans la BD');
      res.redirect('/');
    });
});


app.post('/adresse',  (req, res) => {
  db.collection('adresse').save(req.body, (err, result) => {
      if (err) return console.log(err);
      console.log('sauvegarder dans la BD');
      res.redirect('/');
    });
});

app.post('/mod',  (req, res) => {
  console.log(req.params.id);

  /*  db.collection('adresse').save(req.body, (err, result) => {
      if (err) return console.log(err);
      console.log('sauvegarder dans la BD');
      res.redirect('/');
    });
*/
  db.collection('adresse').findAndModify({
    query: { id: req.params.id },
    sort: { cno: 1 },
    update: { $inc: 
      { nom: req.params.nom,prenom: req.params.prenom,telephone: req.params.telephone,adresse: req.params.adresse,codepostal: req.params.codepostal} }
    })
});

