class Serveur {
    constructor(url) {
        this.url = url;
        if(!Serveur.instance) {
            this.socket = new WebSocket(url);
            Serveur.instance = this;
        }
        return Serveur.instance;
    }

    static getInstance() {
        return Serveur.instance;
    }

    waitOpen() {
        Serveur.instance.onopen = function (event) {
            console.log("Server and client are connecting together !");
            return;
        }
    }
}
