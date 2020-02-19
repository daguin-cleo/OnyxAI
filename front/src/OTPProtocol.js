
const SERVER_MESSAGE_TYPE = {
    ERROR   : "!",
    INFO    : "#",
    RESULT  : "=",
    COMMAND : "$"
};

const SERVER_MESSAGE_TYPE_PARSE = {
    ERROR   : "error",
    INFO    : "info",
    RESULT  : "result",
    COMMAND : "command"
};

function parseOTPMessage(rawMessage)
{
    var type = rawMessage.substring(0, 1);
    var message = rawMessage.substring(1);

    switch (type) {
        case SERVER_MESSAGE_TYPE.ERROR:
            type = SERVER_MESSAGE_TYPE_PARSE.ERROR;
            break;
        case SERVER_MESSAGE_TYPE.INFO:
            type = SERVER_MESSAGE_TYPE_PARSE.INFO;
            break;
        case SERVER_MESSAGE_TYPE.RESULT:
            type = SERVER_MESSAGE_TYPE_PARSE.RESULT;
            break;
        case SERVER_MESSAGE_TYPE.COMMAND:
            type = SERVER_MESSAGE_TYPE_PARSE.COMMAND;
            break;
    }

    return { "type" : type, "message" : message };
}

/*
 * message :
 * {
 *      "type"
 *      "content"
 * }
 */
function encodeOTPMessage(message)
{
    var type = message.type;
    var messageContent = message.content;

    switch (type) {
        case SERVER_MESSAGE_TYPE_PARSE.ERROR:
            type = SERVER_MESSAGE_TYPE.ERROR;
            break;
        case SERVER_MESSAGE_TYPE_PARSE.INFO:
            type = SERVER_MESSAGE_TYPE.INFO;
            break;
        case SERVER_MESSAGE_TYPE_PARSE.RESULT:
            type = SERVER_MESSAGE_TYPE.RESULT;
            break;
        case SERVER_MESSAGE_TYPE_PARSE.COMMAND:
            type = SERVER_MESSAGE_TYPE.COMMAND;
            break;
    }

    return type + messageContent;
}


function sendOTPMessage(message, callback)
{
    message = encodeOTPMessage(message);
    Serveur.getInstance().sendMessage(message, callback);
}