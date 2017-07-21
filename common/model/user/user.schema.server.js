/**
 * Created by krish on 7/20/2017.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
    dateCreated: {type: Date, default: new Date()}

}, {collection: 'User'});

module.exports = userSchema;
