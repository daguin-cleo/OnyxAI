/**
 * On attend qu'un autre joueur rejoigne la partie et que le serveur nous confirme la room
 * @param event
 */
var mySocket;

$("#waitingId").onvisibilitychange = function () {
    mySocket = Serveur.getInstance().socket;
    console.log(mySocket);
    window.mySocket.onmessage = function (event) {
        if (event.data == "READY") {
            console.log("Serveur ready!")
            //TODO charger la page de plateau
            $("#waitingId").hide();
            var id = document.getElementById("idPartieAttente").innerText;
            var getUrl = window.location;
            var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('src/')[0] + "src/";
            document.location.href = baseUrl + "boardGame/boardGame.html?id=" + id;
        } else {
            console.log(event.data);
        }
    }
}


