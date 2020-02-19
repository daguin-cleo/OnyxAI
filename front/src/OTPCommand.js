

const REQUEST_TYPE = {
    ERROR   : "!",
    INFO    : "#",
    RESULT  : "=",
    COMMAND : "$"
};

function treatOTPMessage(rawMessage)
{
    var type = rawMessage.substring(0, 1);
    var message = rawMessage.substring(1);

    switch (type) {
        case REQUEST_TYPE.ERROR:
            console.log("ERROR : " + message);
            treatError(message);
            break;
        case REQUEST_TYPE.INFO:
            console.log("INFO : " + message);
            treatInfo(message);
            break;
        case REQUEST_TYPE.RESULT:
            console.log("RESULT : " + message);
            treatResult(message);
            break;
        case REQUEST_TYPE.COMMAND:
            console.log("COMMAND : " + message);
            treatCommand(message);
            break;
    }
}

function treatError(error) { }

function treatInfo(info) { }

function treatResult(result) { }

function treatCommand(command) { }

function sendCoord(coord, callback)
{
    Serveur.getInstance().sendMessage(coord, callback);
}