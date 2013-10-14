var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    db = require('./dbConn').db();

var CatalogItem = new Schema({
    id: String,
    type: String,
    price: Array
});

module.exports = db.model('CatalogItem', CatalogItem);