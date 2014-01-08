var async = require("async"),
    redis = require("./redisUtils").getRedisConnection(),
    StockedResource = require("./model/StockedResource"),
    CatalogItem = require("./model/CatalogItem"),
    uuid = require("node-uuid"),
    config = require("./config");

function stockResource(thingData, callback) {
    var thingData = JSON.parse(thingData[1]),
        stocked = new StockedResource();

    stocked.type = thingData.name;
    stocked.value = thingData.id;

    stocked.save(callback);
}

function createOffer(stockedItem, number, callback) {
    var newCatalogItem = new CatalogItem();

    newCatalogItem.id = uuid.v4();
    newCatalogItem.price = ["Cemento", "Madera", "Metal"];
    newCatalogItem.type = stockedItem.type;

    newCatalogItem.save(callback);

    console.log("Offer Created for type: " + stockedItem.type);
}

function processNextThing(callback) {
    function handleError(error, results) {
        if (error) {
            console.log("Error creating offer: " + error);
            callback(error);
        } else {
            setTimeout(function throttle() {
                callback(null);
            }, config.merchant.period);
        }
    }

    async.waterfall([
        redis.brpop.bind(redis, "barrilDiogenes", 0),
        stockResource,
        createOffer
    ], handleError);
}

function startBroker() {
    async.forever(processNextThing);
}

exports.start = startBroker;


startBroker();