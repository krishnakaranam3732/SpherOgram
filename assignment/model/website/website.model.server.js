/**
 * Created by krish on 7/6/17.
 */
var websiteSchema = require('./website.schema.server');

var mongoose = require('mongoose');

var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

var userModel = require('../../../common/model/user/user.model.server');

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;

module.exports = websiteModel;


function createWebsiteForUser(website, userId) {
    website._user = userId;
    return websiteModel.create(website)
        .then(function (website) {
            return userModel.addWebsite(userId, website._id);
        }, function (err) {
            return null;
        })
}

function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user: userId})
        .populate('_user')
        .exec();
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, updateWebsite) {
    return websiteModel.findOneAndUpdate({_id: websiteId}, {$set: updateWebsite});
}

function deleteWebsite(websiteId) {
    return websiteModel.findById(websiteId)
        .populate('_user')
        .exec()
        .then(function (website) {
                if (website) {
                    var index = website._user.websites.indexOf(website._id);
                    website._user.websites.splice(index, 1);
                    return website._user.save()
                        .then(function (status) {
                            return websiteModel.findOneAndRemove({_id: websiteId});
                        }, function (err) {
                            return null;
                        });
                }
                else {
                    return null;
                }
            }, function (err) {
                return null;
            }
        )

}

function addPage(websiteId, pageId) {
    return websiteModel.findWebsiteById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        })

}