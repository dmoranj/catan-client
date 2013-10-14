var redis = require("redis"),
    config = require("./config");

function getRedisConnection() {
    cli = redis.createClient(config.redis.port, config.redis.host);

    cli.select(config.redis.database);

    cli.on('error', function(err){
        console.log("Couldn't recover from redis error");
        process.exit(1);
    });

    return cli;
}

exports.getRedisConnection = getRedisConnection;