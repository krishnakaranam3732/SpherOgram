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
searchModel.updateUser = updateUser;
searchModel.updateRemoveUser = updateRemoveUser;


module.exports = searchModel;

function findPostsByOwner(userId) {
    return postModel2.find({owner: userId});
}

function findUserByUserName(username) {
    return userModel2.findOne({username: username});
}

function findUserById(userId) {
    return userModel2.findById(userId);
}

function updateRemoveUser(userId,remove,updateUser) {
    return userModel2.findOneAndUpdate({_id: userId}, {$pull: {following: remove}});
}

function updateUser(userId, updateUser) {
    return userModel2.findOneAndUpdate({_id: userId}, {$set: updateUser});
}