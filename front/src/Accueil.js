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
    serv = new Serveur(urlSocket);
    sessionStorage.setItem('mySocket', serv);
    //serv.waitOpen();
    Serveur.getInstance().socket.onmessage = function (event) {
        console.log(event.data);
        if(event.data == "$AWAITING") {
            console.log("En attente");
            //TODO charger l'url de la page d'attente
            $("#selection").hide();
            $("#waitingId").show();
            attenteJ2();
        }
    }

}

function attenteJ2() {
    mySocket = Serveur.getInstance().socket;
    mySocket.onmessage = function (event) {
        if (event.data == "$READY") {
            console.log("Serveur ready!")
            //TODO charger la page de plateau
            $("#waitingId").hide();
            $("#boardGame").show();
            $("#turn").show();
            $("#boardContainer").show();
            /*var id = document.getElementById("idPartieAttente").innerText;
            var getUrl = window.location;
            var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('src/')[0] + "src/";
            document.location.href = baseUrl + "boardGame.html?id=" + id;*/
        } else {
            console.log(event.data);
        }
    }
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
    var id = document.getElementById("idPartie").value;
    if(id !== "") {
        urlSocket += id;
        serv = new Serveur(urlSocket);
        sessionStorage.setItem('mySocket', serv);
        mySocket = Serveur.getInstance().socket;
        serv.waitOpen();
        mySocket.onmessage = function (event) {
            console.log(event.data);
            if(event.data == "#Room joined") {
                $("#selection").hide();
                $("#waitingId").hide();
                $("#boardContainer").show();
            }
        }
    } else {
        console.log("ID Mauvais");
    }


}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}