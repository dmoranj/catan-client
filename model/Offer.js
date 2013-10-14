var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    db = require('./dbConn').db();

var Offer = new Schema({
    type: String,
    price: Array,
    merchantId: String,
    offerId: String
});

module.exports = db.model('Offer', Offer);