var CatalogItem = require("./model/CatalogItem"),
    Offer = require("./model/Offer"),
    uuid = require("node-uuid");

function findHandler (res, next, error, data) {
    if (error) {
        next(error);
    } else if (!data) {
        next(new Error("Couldn't find any data"));
    } else {
        res.json(200, data);
    }
}

function listResources(req, res, next) {
    CatalogItem.find({}, findHandler.bind(this, res, next));
}

function getResourcePrice(req, res, next) {
    CatalogItem.findOne({id: req.params.id}, findHandler.bind(this, res, next));
}

function buyResource(req, res, next) {

}

function addCatalogItem(req, res, next) {
    var newCatalogItem = new CatalogItem();

    newCatalogItem.id = uuid.v4();
    newCatalogItem.price = req.body.price;
    newCatalogItem.type = req.body.type;

    newCatalogItem.save(function (error, data) {
        if (error) {
            next(error);
        } else {
            res.json(200, data);
        }
    });
}

function removeCatalogItem(req, res, next) {
    CatalogItem.remove({id: req.params.id}, function (error, data) {
        if (error) {
            next(error);
        } else {
            res.json(200, { result: "OK" });
        }
    });
}

module.exports = {
    listResources: listResources,
    getResourcePrice: getResourcePrice,
    buyResource: buyResource,
    addCatalogItem: addCatalogItem,
    removeCatalogItem: removeCatalogItem
}