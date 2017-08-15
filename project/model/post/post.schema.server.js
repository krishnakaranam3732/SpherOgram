/**
 * Created by krish on 7/6/17.
 */

var mongoose = require('mongoose');

var postSchema = mongoose.Schema({

    description: {type: String},
    pano_id: String,
    lat: Number,
    lng: Number,
    dateCreated: {type: Date, default: new Date()},
    viewedUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    likedUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}

}, {collection: 'post'});

module.exports = postSchema;