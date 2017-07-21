/**
 * Created by krish on 7/20/2017.
 */
var mongoose = require('mongoose');

var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUserName = findUserByUserName;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;

module.exports = userModel;


function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUserName(username) {
    console.log("model fUBUN")
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, updateUser) {
    return userModel.findOneAndUpdate({_id: userId}, {$set: updateUser});
}

function deleteUser(userId) {
    return userModel.findOneAndRemove({_id: userId});
}

function addWebsite(userId, websiteId) {
    return userModel.findUserById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        })
}