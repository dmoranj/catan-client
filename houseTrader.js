var request = require("request"),
    async = require("async"),
    redis = require("redis"),
    config = require("./config"),
    redisUtils = require("./redisUtils"),
    redisConn;

function getDesigns(callback) {
    var options = {
       url: config.centralServer.url + "/design",
       method: "GET"
    }

    request(options, function (error, response, body) {
        if (error) {
            callback(error);
        } else if (response.statusCode == 200) {
            callback(null, JSON.parse(body));
        } else {
            callback("Unexpected response getting designs: " + response.statusCode);
        }
    });
}

function retrieveResource(redisConn, resourceId, callback) {
    redisConn.brpop(resourceId, 0, function (error, res) {
        if (error) {
            callback(error);
        } else {
            console.log("Resource [" + res[1] + "] obtained");
            callback(null, res[1]);
        }
    });
}

function getDesignResources(resources, redisConn, callback) {
    async.mapSeries(resources, async.apply(retrieveResource, redisConn), callback);
}

function buyHouse(designId, resources, callback) {
    var options = {
        url: config.centralServer.url + "/house",
        method: "POST",
        json: {
            resources: resources,
            designId: designId,
            login: config.local.login
        }
    };

    request(options, function (error, response, body) {
        if (error) {
            callback(error);
        } else if (response.statusCode == 200) {
            console.log("House [" + designId + "] bought");
            callback(null, body);
        } else {
            callback("Unexpected response buying house: " + response.statusCode);
        }
    });
    /*
    console.log("Compra: " + JSON.stringify(options, null, 4));
    callback(null);*/
}

function trade(design, callback) {
    var redisConn = redisUtils.getRedisConnection();

    async.forever(function (innerCallback) {
        async.waterfall([
            async.apply(getDesignResources, design.resources, redisConn),
            async.apply(buyHouse, design.id)
        ], function (error) {
            if (error) {
                console.log("An error occurred buying the house: " + error);
            }

            innerCallback(null);
        });
    }, callback);
}

function distributeWork(designs, callback) {
    async.map(designs, trade, callback);
}

function startBuying(callback) {
    async.waterfall([
        getDesigns,
        distributeWork
    ], callback);
}

startBuying(function (error) {
    console.log("Bought with error [" + error + "]");
})