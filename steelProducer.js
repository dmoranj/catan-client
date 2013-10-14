var config = require("./config"),
    request = require('request'),
    redisUtils = require("./redisUtils"),
    redisConn;

function houseInvitationHandler (socket, data) {
    var options = {
        url: config.steelProducer.url + ":" + config.steelProducer.portHttp + "/casa",
        method: "POST",
        json: {
            address: data.address
        }
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log("Error: could not connect with the server");
            socket.emit('¡Hola Don Jose!');
        } else if (response.statusCode == 200) {
            socket.emit("Por su casa yo pase", {
                certificate: body.certificate
            });
        } else {
            console.log("Error: " + response.statusCode);
            socket.emit('¡Hola Don Jose!');
        }
    });
}

function granmaDetectionHandler (socket, data) {
    var options = {
        url: config.steelProducer.url + ":" + config.steelProducer.portHttp + "/abuela",
        method: "POST",
        json: {
            grandMaName: data.grandMaName
        }
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log("Error: could not connect with the server");
        } else if (response.statusCode == 200) {
            socket.emit("A su abuela yo la vi", {
                certificate: body.certificate
            });
        } else {
            socket.emit('¡Hola Don Jose!');
            console.log("Error: " + body.message);
        }
    });
}

function endCommunication (socket, data) {
    socket.emit("¡Adios Don Jose!");

    if (data.resource) {
        console.log("Added resource: " + data.resource);
        redisConn.lpush(config.steelProducer.type, data.resource);
    } else {
        console.log("Steel depleted");
    }

    socket.emit('¡Hola Don Jose!');
}

function communicationError (socket, data) {
    socket.emit('¡Hola Don Jose!');
}

/**
 * Defines the handlers for each step of the protocol. Each handler will be defined as a separate function.
 */
function executeProtocol() {
    console.log("Initiating interchange");

    var socket = require('socket.io-client').connect(config.steelProducer.url + ":" + config.steelProducer.portSocketIO);

    socket.on('¡Hola Don Pepito!', function (data) {
        socket.emit('¡Hola Don Jose!');
    });

    socket.on('¿Paso usted por mi casa?', houseInvitationHandler.bind(this, socket));

    socket.on('¿Vio usted a mi abuela?', granmaDetectionHandler.bind(this, socket));

    socket.on('¡Adios Don Pepito!', endCommunication.bind(this, socket));

    socket.on('Error', communicationError.bind(this, socket));
}

redisConn = redisUtils.getRedisConnection();
executeProtocol();