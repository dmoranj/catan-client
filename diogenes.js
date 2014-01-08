var request = require("request"),
    async = require("async"),
    redis = require("redis"),
    config = require("./config"),
    redisUtils = require("./redisUtils"),
    redisConn;

function chop(url, callback) {
    var options = {
        url: url + "/cajondesastre",
        method: "GET"
    }

    request(options, function(error, response, body) {

        var parsedBody = JSON.parse(body);

        if (response.statusCode == 200) {
            console.log("I got a " + parsedBody.name + "! -> " + parsedBody.id);
            redisConn.lpush("barrilDiogenes", JSON.stringify(parsedBody));
        } else {
            console.log("No Thing to get :(");
        }

        setTimeout(async.apply(callback, error, body), config.diogenes.period);
    });
}

redisConn = redisUtils.getRedisConnection();

async.forever(async.apply(chop, config.diogenes.url), function (error) {
    console.log("Got: " + JSON.stringify(error, null, 4));
});