var amqp = require('amqp'),
    async = require("async"),
    redis = require("redis"),
    config = require("./config"),
    redisUtils = require("./redisUtils"),
    redisConn;

var connection = amqp.createConnection({ host: config.cementServer.host });

connection.on('ready', function () {
    connection.queue('cemento', function(q){
        q.bind('#');

        // Receive messages
        q.subscribe(function (message) {
            redisConn.lpush(config.steelProducer.type, message.id);
        });
    });
});