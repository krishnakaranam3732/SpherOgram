/**
 * Created by krish on 6/22/17.
 */
module.exports = function (app) {

    var pageModel = require('../../model/page/page.model.server');

    var websiteModel = require('../../model/website/website.model.server');

    app.post('/api/assignment6/website/:websiteId/page', validateSession, createPage);

    app.get('/api/assignment6/website/:websiteId/page', validateSession, findAllPagesForWebsite);

    app.get('/api/assignment6/page/:pageId', validateSession, findPageById);

    app.put('/api/assignment6/page/:pageId', validateSession, updatePage);

    app.delete('/api/assignment6/page/:pageId', validateSession, deletePage);

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        pageModel.createPage(page, websiteId)
            .then(function (page) {
                if (page) {
                    res.json(page);
                }
                else {
                    res.status(400).send(' Page could not be created: ' + err);
                }
            }, function (err) {
                res.status(400).send(' Page could not be created: ' + err);
            })

    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        pageModel.findAllPagesForWebsite(websiteId)
            .then(function (websites) {
                res.send(websites);
            }, function (err) {
                res.status(404).send(' Pages not found ');
            })
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel.findPageById(pageId)
            .then(function (page) {
                if (page) {
                    res.json(page);
                }
                else {
                    res.status(404).send(' Page not found ');
                }
            }, function (err) {
                res.status(404).send(' Page not found ');
            })

    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        pageModel.updatePage(pageId, page)
            .then(function (page) {
                if (page) {
                    res.json(page);
                }
                else {
                    res.status(404).send(' Page not found ');
                }
            }, function (err) {
                res.status(400).send(' Page could not be updated ' + err);
            });

    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel.deletePage(pageId)
            .then(function (page) {
                if (page) {
                    res.json(page);
                }
                else {
                    res.status(404).send(' Page not found ');
                }
            }, function (err) {
                res.status(400).send(' Page could not be deleted ' + err);
            });
    }

    function validateSession(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.roles.indexOf('USER') !== -1) {
                if (req.params.websiteId) {
                    websiteModel.findWebsiteById(req.params.websiteId)
                        .then(function (website) {
                            if (website._user.toString() === req.user._id.toString()) {
                                next();
                            }
                            else {
                                res.status(401).send('You do not have permission to view this page');
                            }
                        }, function () {
                            res.status(401).send('Website not available');
                        })
                }
                else {
                    pageModel.findWebsiteForPage(req.params.pageId)
                        .then(function (page) {
                            if (page._website._user.toString() === req.user._id.toString()) {
                                next();
                            }
                            else {
                                res.status(401).send('You do not have permission to view this page');
                            }
                        }, function () {
                            res.status(401).send('Website not available');
                        })
                }
            }
            else {
                res.status(401).send('You do not have permission to view this page');
            }

        }
        else {
            res.status(401).send('Your session has expired');
        }
    }
};