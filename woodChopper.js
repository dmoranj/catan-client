var request = require("request"),
    async = require("async"),
    redis = require("redis"),
    config = require("./config"),
    redisUtils = require("./redisUtils"),
    redisConn;

function chop(url, callback) {
    var options = {
        url: url + "/chop",
        method: "GET"
    }

    request(options, function(error, response, body) {

        var parsedBody = JSON.parse(body);

        if (response.statusCode == 200) {
            console.log("Chopped! -> " + parsedBody.id);
            redisConn.lpush(config.woodChopper.type, parsedBody.id);
        } else {
            console.log("No " + config.woodChopper.type + " to chop :(");
        }

        setTimeout(async.apply(callback, error, body), config.woodChopper.period);
    });
}

redisConn = redisUtils.getRedisConnection();

async.forever(async.apply(chop, config.woodChopper.url), function (error) {
    console.log("Chopped: " + JSON.stringify(error, null, 4));
});