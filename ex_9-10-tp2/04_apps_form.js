var express = require('express');
var app = express();


app.use(express.static('public'));

//route pour afficher le formulaire
app.get('/html/04_form.html', function (req, res) {
   console.log(__dirname);
   res.sendFile( __dirname + "/html/" + "04_form.html" );
});

app.get('/', (req, res) => {
   console.log('accueil')
   res.end('<h1>Accueil</h1>')
});

app.get('/traiter_get', function (req, res) {
   // Preparer l'output en format JSON 

   console.log('la route /traiter_get');

   // on utilise l'objet req.query pour récupérer les données GET
   reponse = {
      prenom:req.query.prenom,
      nom:req.query.nom
   };


   console.log(reponse);

   
   res.end(JSON.stringify(reponse));
});




var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Exemple l'application écoute sur http://%s:%s", host, port);

});