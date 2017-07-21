/**
 * Created by krish on 7/20/2017.
 */
var pageSchema = require('./page.schema.server');

var mongoose = require('mongoose');

var pageModel = mongoose.model('PageModel', pageSchema);

var websiteModel = require('./../website/website.model.server');

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;

module.exports = pageModel;


function createPage(page, websiteId) {
    page._website = websiteId;
    return pageModel.create(page)
        .then(function (page) {
            return websiteModel.addPage(websiteId, page._id);
        }, function (err) {
            return null;
        })
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website: websiteId})
        .populate('_website')
        .exec();
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, updatePage) {
    return pageModel.findOneAndUpdate({_id: pageId}, {$set: updatePage});
}

function deletePage(pageId) {
    return pageModel.findById(pageId)
        .populate('_website')
        .exec()
        .then(function (page) {
                if (page) {
                    var index = page._website.pages.indexOf(page._id);
                    page._website.pages.splice(index, 1);
                    return page._website.save()
                        .then(function (status) {
                            return pageModel.findOneAndRemove({_id: pageId});
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

function addWidget(pageId, widgetId) {
    return pageModel.findPageById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        })
}