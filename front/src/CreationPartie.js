/**
 * On attend qu'un autre joueur rejoigne la partie et que le serveur nous confirme la room
 * @param event
 */
//mySocket.onmessage = function (event) {
    //TODO charger la page de plateau
//}

var parameters = location.search.substring(1).split("&");
var idPartieRandom = parameters[0].split("=")[1];
document.getElementById("idPartieAttente").innerText = idPartieRandom;