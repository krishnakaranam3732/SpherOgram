/**
 * Created by krish on 7/20/2017.
 */
module.exports = function (app) {

    var websiteModel = require('./../model/website/website.model.server');

    app.post('/api/assignment5/user/:userId/website', createWebsite);

    app.get('/api/assignment5/user/:userId/website', findAllWebsitesForUser);

    app.get('/api/assignment5/website/:websiteId', findWebsiteById);

    app.put('/api/assignment5/website/:websiteId', updateWebsite);

    app.delete('/api/assignment5/website/:websiteId', deleteWebsite);


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
};