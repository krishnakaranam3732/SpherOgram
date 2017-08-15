/**
 * Created by krish on 7/6/17.
 */
var userSchema = require('./user.schema.server');

var mongoose = require('mongoose');

var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUserName = findUserByUserName;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.findAllUsers = findAllUsers;

module.exports = userModel;


function createUser(user) {
    if (!user.roles) {
        user.roles = ['USER'];
    }
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUserName(username) {
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

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

function findUserByFacebookId(fbId) {
    return userModel.findOne({'facebook.id': fbId});
}

function findAllUsers() {
    return userModel.find();
}