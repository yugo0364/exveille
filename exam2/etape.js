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


var str;
fs.readFile('provinces.json', 'utf8', function (err, data) {
  if (err) throw err;
  var obj = JSON.parse(data);
  str=readData(obj);
});





/*fn----*/
function readData(objs){
	var str="<h1>Les Province</h1><table><tr><td>Non Province</td><td>tag</td></tr>";
	for(var prop in objs){
		str+="<tr><td>";
		str+=objs[prop];
		str+="</td>";
		str+="<td>";
		str+=prop;
		str+="</td></tr>";
	}
	str+="</table>";
	return(str);
}

function onRequest(request, response) {
  console.log("Requête reçue.");
  response.writeHead(200, {"Content-Type": "text/html"});


  response.write(str);
  response.end();
}

http.createServer(onRequest).listen(8888);
console.log("Démarrage du serveur.");
