/**
 * Created by krish on 7/20/2017.
 */
module.exports = function (app) {

    var pageModel = require('./../model/page/page.model.server');

    app.post('/api/assignment5/website/:websiteId/page', createPage);

    app.get('/api/assignment5/website/:websiteId/page', findAllPagesForWebsite);

    app.get('/api/assignment5/page/:pageId', findPageById);

    app.put('/api/assignment5/page/:pageId', updatePage);

    app.delete('/api/assignment5/page/:pageId', deletePage);

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
};