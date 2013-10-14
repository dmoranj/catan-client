var amqp = require('amqp'),
    async = require("async"),
    redis = require("redis"),
    config = require("./config"),
    redisUtils = require("./redisUtils"),
    redisConn;

var connection = amqp.createConnection({ host: config.cementServer.host });

redisConn = redisUtils.getRedisConnection();

connection.on('ready', function () {
    connection.queue('cemento', function(q){
        q.bind('#');

        q.subscribe(function (message) {
            console.log("Cement collected: " + message.id);
            redisConn.lpush(config.cementServer.type, message.id);
        });
    });
});