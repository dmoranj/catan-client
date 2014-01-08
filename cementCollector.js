var amqp = require('amqp'),
    async = require("async"),
    redis = require("redis"),
    config = require("./config"),
    redisUtils = require("./redisUtils"),
    redisConn;

var connection = amqp.createConnection({ host: config.cementServer.host });

redisConn = redisUtils.getRedisConnection();

var options = {

};

connection.on('ready', function () {
    console.log("Cement collector ready");

    connection.queue('cemento', options, function(q){
        console.log("Reading cement queue");

        q.bind('#');

        q.subscribe(function (message) {
            console.log("Cement collected: " + message.id);
            redisConn.lpush(config.cementServer.type, message.id);
        });
    });
});