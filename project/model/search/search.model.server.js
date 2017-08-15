/**
 * Created by krish on 7/6/17.
 */
var postSchema = require('./../post/post.schema.server');
var userSchema = require('./../../../common/model/user/user.schema.server');

var mongoose = require('mongoose');

var userModel2 = mongoose.model('userModel2', userSchema);
var postModel2 = mongoose.model('postModel2', postSchema);

var searchModel = mongoose.model('searchModel', userSchema);

searchModel.findPostsByOwner = findPostsByOwner;
searchModel.findUserByUserName = findUserByUserName;
searchModel.findUserById = findUserById;

module.exports = searchModel;

function findPostsByOwner(userId) {
    console.log("search model server findPostsByOwner "+ userId);
    console.log("search model server findPostsByOwner "+ postModel2.findById({owner: userId}));
    return postModel2.findById({owner: userId});
}

function findUserByUserName(username) {
    console.log("search model server "+ username);
    return userModel2.findOne({username: username});
}

function findUserById(userId) {
    console.log("search model server byId "+ userId);
    console.log("search model server byId res "+ userModel2.findById(userId));
    return userModel2.findById(userId);
}
