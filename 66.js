// Importation du module de gestion des événements
var events = require('events');


// Création d'un objet émetteur d'événement
var emeteurEvenement = new events.EventEmitter();

// Créer le gestionnaire d'événement  « connectHandler »
var connectHandler = function connected() {
   console.log('connexion etabli');
  
   // lancer l'événement 'donnees_recu'
   emeteurEvenement.emit('donnes_recues');
}

// Lier l'événement de connexion au gestionnaire d'événement «connectHandler»
emeteurEvenement.on('connexion', connectHandler);
 
// Lier l'événement 'data_received' à la function anonyme 
emeteurEvenement.on('donnes_recues', function(){
   console.log('Donnéees bien reçues.');
});

// Lancer l'événement 'connexion'  
emeteurEvenement.emit('connexion');

console.log("Fin du programme.");