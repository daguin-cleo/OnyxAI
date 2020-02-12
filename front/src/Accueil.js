//Back du front de la page d'accueil

//TODO Mettre l'url du serveur
var urlSocket = "ws://localhost:8989/room/";
var serv, id;

//TODO function human et ia pour les onclick
/**
 * Onclick function pour créer une partie et jouer avec un autre joueur sur un autre PC
 */
function human() {
    //Création de l'id de la partie
    id = randomIntFromInterval(1000, 9999);
    //On créer la webSocket avec le nouvel id
    urlSocket += id;
    document.getElementById("idPartieAttente").textContent = id;
    $("#selection").hide();
    $("#waitingId").show();
    serv = new Serveur(urlSocket);
    sessionStorage.setItem('mySocket', serv);
    serv.waitOpen();
    Serveur.getInstance().socket.onmessage = function (event) {
        console.log(event.data);
        if(event.data == "$ AWAITING") {
            //TODO charger l'url de la page d'attente
            //$("#selection").hide();
            //$("#waitingId").show();
        }
    }

}

var getId = function () {
    return id;
}

/**
 * Onclick function pour créer une partie et jouer avec une IA
 */
function ia() {

}

/**
 * On click function pour rejoindre une partie
 */
function getPartie() {
    var id = document.getElementById("idPartie");
    var msg = {
        text: id
    }
    //On envoie l'id au serveur
    mySocket.send(JSON.stringify(msg));
    mySocket.onmessage = function (event) {
        //TODO charger l'url de la partie
    }
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}