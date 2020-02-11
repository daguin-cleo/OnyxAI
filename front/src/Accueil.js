//Back du front de la page d'accueil

//TODO Mettre l'url du serveur
//window.mySocket = new WebSocket("todo");

/*mySocket.onopen = function (event) {
    print("Server and client are connecting together !");
};*/

//TODO function human et ia pour les onclick
/**
 * Onclick function pour créer une partie et jouer avec un autre joueur sur un autre PC
 */
function human() {
    //Création de l'id de la partie
    var id = randomIntFromInterval(1000, 9999);
    var msg = {
        text: id
    }
    //TODO On envoie l'id au serveur
    //mySocket.send(JSON.stringify(msg));
    //TODO charger l'url de la page d'attente
    var getUrl = window.location;
    var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1]
        + "/" + getUrl.pathname.split('/')[2] + "/" + getUrl.pathname.split('/')[3]
        + "/" + getUrl.pathname.split('/')[4] + "/";
    console.log(baseUrl);
    document.location.href= baseUrl + "waitingId.html?id=" + id;

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