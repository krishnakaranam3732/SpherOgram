/**
 * Created by krish on 7/6/17.
 */
var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({

    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true},
    name: {type: String, required: true},
    description: String,
    pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'}],
    dateCreated: {type: Date, default: new Date()}

}, {collection: 'Website'});

module.exports = websiteSchema;