var async = require("async"),
    config = require('./config'),
    apply = async.apply,
    Stocked = require("./model/StockedResource"),
    redisUtils = require("./redisUtils"),
    CatalogItem = require("./model/CatalogItem");

function getResource(connection, resourceType, callback) {
    connection.brpop(resourceType, 0, function (error, res) {
        if (error) {
            callback(error);
        } else {
            console.log("Resource [" + res[1] + "] obtained");
            callback(null, res[1]);
        }
    });
}

function saveResource(resourceType, value, callback) {
    var resource = new Stocked();

    resource.type = resourceType;
    resource.value = value;

    resource.save(function (error, data) {
        callback(error);
    });
}

function stockResource(connection, resourceType, callback) {
    async.waterfall([
        apply(getResource, connection, resourceType),
        apply(saveResource, resourceType)
    ], callback);
}

function retrieveStock(catalogItem, callback) {
    var redisConn = redisUtils.getRedisConnection();

    Stocked.find({type: catalogItem.type}, function (error, data) {
        if (error) {
            callback(new Error("Couldn't retrieve stock for type [" + catalogItem.type
                + "] : " + error))
        } else {
            async.times(
                config.stock.expected - data.length,
                apply(stockResource, redisConn, catalogItem.type),
                callback);
        }
    });
}

function getStock() {
    CatalogItem.find({}, function (error, data) {
        if (error) {
            console.error("Couldn't access Catalog to launch workers");
        } else {
            async.forEach(data, retrieveStock, function (error) {
                console.log("Finished replenighing");
            });
        }
    });
}

getStock();

function start() {

}

exports.start = start;