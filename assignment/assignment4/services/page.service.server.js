/**
 * Created by krish on 7/7/17.
 */
module.exports = function (app) {
    var pages = [
            {"_id": "321", "name": "Home", "websiteId": "456", "title": "Home Page"},
            {"_id": "231", "name": "Gizmodo-Main", "websiteId": "456", "title": "Gizmodo check in"},
            {"_id": "432", "name": "Go", "websiteId": "890", "title": "Go Game"},
            {"_id": "342", "name": "Game Description", "websiteId": "890", "title": "Go Game Description"},
            {"_id": "123", "name": "About", "websiteId": "678", "title": "Checkers - 4 Player"},
            {
                "_id": "132",
                "name": "Game Instructions",
                "websiteId": "678",
                "title": "Checkers - 4 Player Instruction manual"
            },
            {"_id": "543", "name": "Tic-Tac", "websiteId": "567", "title": "Tic Tac Toe"},
            {
                "_id": "345",
                "name": "Tic-Tac Rules",
                "websiteId": "567",
                "title": "Tic Tac Toe Rules for 2 Players"
            },
            {"_id": "879", "name": "Chess Multi Player", "websiteId": "789", "title": "Chess 2-Player"},
            {"_id": "978", "name": "Chess 1 Player", "websiteId": "789", "title": "Chess 1-Player game"},
            {"_id": "567", "name": "Men - dress", "websiteId": "345", "title": "Men - Shirts, T-Shirts, Pants"},
            {
                "_id": "675",
                "name": "Women - dress",
                "websiteId": "345",
                "title": "Women - Shirts, T-Shirts, Dresses"
            },
            {"_id": "765", "name": "Profile", "websiteId": "123", "title": "User Profile"},
            {"_id": "657", "name": "Notifications", "websiteId": "123", "title": "Notification - User activity"},
            {"_id": "145", "name": "Liked Tweets", "websiteId": "234", "title": "User Liked Tweets"},
            {"_id": "451", "name": "Popular Tweets", "websiteId": "234", "title": "User Popular Tweets"}
        ];

    app.post('/api/assignment4/website/:websiteId/page', createPage);

    app.get('/api/assignment4/website/:websiteId/page', findAllPagesForWebsite);

    app.get('/api/assignment4/page/:pageId', findPageById);

    app.put('/api/assignment4/page/:pageId', updatePage);

    app.delete('/api/assignment4/page/:pageId', deletePage);

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        page._id = new Date().getTime() + "";
        page.websiteId = websiteId;
        pages.push(page);
        res.sendStatus(200);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var results = [];
        for (var page in pages) {
            if (pages[page].websiteId == websiteId) {
                results.push(pages[page]);
            }
        }
        res.send(results);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        var page = findPage(pageId);
        if (page) {
            res.json(page);
        }
        else {
            res.sendStatus(404);
        }
    }

    function findPage(pageId) {
        var page = pages.find(function (page) {
            return page._id === pageId;
        });

        if (typeof page === 'undefined') {
            return null;
        }
        return page;
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        var pageToBeUpdated = findPage(pageId);
        if (pageToBeUpdated) {
            var index = pages.indexOf(pageToBeUpdated);
            pages[index] = page;
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        var pageToBeDeleted = findPage(pageId);
        if (pageToBeDeleted) {
            var index = pages.indexOf(pageToBeDeleted);
            pages.splice(index, 1);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    }
};