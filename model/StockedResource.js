var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    db = require('./dbConn').db();

var StockedResource = new Schema({
    type: String,
    value: Array
});

module.exports = db.model('StockedResource', StockedResource);