//requires
var fs = require("fs");
var http = require("http");
/*------*/

var str;
fs.readFile('tab.json', 'utf8', function (err, data) {
  if (err) throw err;
  var obj = JSON.parse(data);
  str=readData(obj);
});





/*fn----*/
function readData(objs){
	var str="<h1>Les Province</h1><table><tr><td>Nom Province</td><td>tag</td></tr>";
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
