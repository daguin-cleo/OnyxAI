class Serveur {
    constructor(url) {
        this.url = url;
        if(!Serveur.instance) {
            this.socket = new WebSocket(url);
            Serveur.instance = this;
        }
        init();
        return Serveur.instance;
    }

    static getInstance() {
        return Serveur.instance;
    }

    init()
    {
        Serveur.instance.onmessage = function (message) {
            treatOTPMessage(message);
        };
    }
    waitOpen() {
        Serveur.instance.onopen = function (event) {
            console.log("Server and client are connecting together !");
            return;
        }
    }
    sendMessage(message, callback)
    {
        Serveur.instance.sendMessage(message, callback);
    }
}
