var config = require("./config"),
    request = require('request'),
    async = require("async");

function executeProtocol() {
    console.log("Initiating interchange");

    var socket = require('socket.io-client').connect(config.steelProducer.url + ":" + config.steelProducer.portSocketIO);

    socket.on('¡Hola Don Pepito!', function (data) {
        socket.emit('¡Hola Don Jose!');
    });

    socket.on('¿Pasó usted por mi casa?', function (data) {
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
                socket.emit("Por su casa yo pasé", {
                    confirmation: body.certificate
                });
            } else {
                console.log("Error: " + response.statusCode);
                socket.emit('¡Hola Don Jose!');
            }
        });
    });

    socket.on('¿Vio usted a mi abuela?', function (data) {
        var options = {
            url: config.steelProducer.url + ":" + config.steelProducer.portHttp + "/abuela",
            method: "POST",
            json: {
                granMaName: data.grandMaName
            }
        };

        request(options, function (error, response, body) {
            if (error) {
                console.log("Error: could not connect with the server");
            } else if (response.statusCode == 200) {
                socket.emit("A su abuela yo la vi", {
                    grandMaName: body.certificate
                });
            } else {
                callback(null);
                console.log("Error: " + body.message);
            }
        });
    });

    socket.on('¡Adios Don Pepito!', function (data) {
        socket.emit("¡Adios Don Jose!");

        console.log("Resource: " + JSON.stringify(data));
        socket.emit('¡Hola Don Jose!');
    });

    socket.on('Error', function (data) {
        console.log("An error occurred: " + data.message);
        socket.emit('¡Hola Don Jose!');
    })
}

executeProtocol();








