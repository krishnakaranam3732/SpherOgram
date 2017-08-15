/**
 * Created by krish on 6/22/17.
 */
module.exports = function (app) {

    var websiteModel = require('../../model/website/website.model.server');

    app.post('/api/assignment6/user/:userId/website', validateSession, createWebsite);

    app.get('/api/assignment6/user/:userId/website', validateSession, findAllWebsitesForUser);

    app.get('/api/assignment6/website/:websiteId', validateSession, findWebsiteById);

    app.put('/api/assignment6/website/:websiteId', validateSession, updateWebsite);

    app.delete('/api/assignment6/website/:websiteId', validateSession, deleteWebsite);


    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;

        websiteModel.createWebsiteForUser(website, userId)
            .then(function (website) {
                if (website) {
                    res.json(website);
                }
                else {
                    res.status(400).send(' Website could not be created: ' + err);
                }
            }, function (err) {
                res.status(400).send(' Website could not be created: ' + err);
            });

    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        websiteModel.findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.send(websites);
            }, function (err) {
                res.status(404).send(' Websites not found ');
            });

    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel.findWebsiteById(websiteId)
            .then(function (website) {
                if (website) {
                    res.json(website);
                }
                else {
                    res.status(404).send(' Website not found ');
                }
            }, function (err) {
                res.status(404).send(' Website not found ');
            });
    }


    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;
        websiteModel.updateWebsite(websiteId, website)
            .then(function (website) {
                if (website) {
                    res.json(website);
                }
                else {
                    res.status(404).send(' Website not found ');
                }
            }, function (err) {
                res.status(400).send(' Website could not be updated ' + err);
            });
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel.deleteWebsite(websiteId)
            .then(function (website) {
                if (website) {
                    res.json(website);
                }
                else {
                    res.status(404).send(' Website not found ');
                }
            }, function (err) {
                res.status(400).send(' Website could not be deleted ' + err);
            });

    }

    function validateSession(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.roles.indexOf('USER') !== -1) {
                if (req.params.userId) {
                    if (req.user._id.toString() === req.params.userId) {
                        next();
                    }
                    else {
                        res.status(401).send('You do not have permission to view this page');
                    }
                }
                else {
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