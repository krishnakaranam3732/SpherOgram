/**
 * Created by krish on 7/6/17.
 */

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    username: {type: String, unique: true, required: true},
    password: {type: String},
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    dateCreated: {type: Date, default: new Date()},
    roles: [{type: String, enum: ['USER', 'ADMIN'], default: 'USER'}],
    google: {
        id: String,
        token: String
    },
    facebook: {
        id: String,
        token: String
    }

}, {collection: 'User'});

module.exports = userSchema;
