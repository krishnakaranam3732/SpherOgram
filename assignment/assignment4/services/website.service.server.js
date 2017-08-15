/**
 * Created by krish on 7/7/17.
 */
module.exports = function (app) {

    var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Social Networking site"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Micro blogging service"},
            {
                "_id": "456",
                "name": "Gizmodo",
                "developerId": "456",
                "description": "And it was great and shockingly revealing about how things are going to go. As usual, we dissected the whole thing for you."
            },
            {
                "_id": "890",
                "name": "Go",
                "developerId": "123",
                "description": "Go is an abstract strategy board game for two players, in which the aim is to surround more territory than the opponent"
            },
            {
                "_id": "567",
                "name": "Tic Tac Toe",
                "developerId": "123",
                "description": "Tic-tac-toe is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid"
            },
            {
                "_id": "678",
                "name": "Checkers",
                "developerId": "123",
                "description": "Play checkers with the computer or with friends in this easy to use HTML5 Checkers game"
            },
            {
                "_id": "789",
                "name": "Chess",
                "developerId": "234",
                "description": "Play chess on Chess.com - the #1 chess community with millions of members around the world. Fun stats, analysis, and training tools for players of all levels"
            },
            {
                "_id": "345",
                "name": "Amazon",
                "developerId": "345",
                "description": "Online shopping from the earth's biggest selection of books, magazines, music, DVDs, videos, electronics, computers, software, apparel & accessories, shoes ..."
            }
        ];

    app.post('/api/assignment4/user/:userId/website', createWebsite);

    app.get('/api/assignment4/user/:userId/website', findAllWebsitesForUser);

    app.get('/api/assignment4/website/:websiteId', findWebsiteById);

    app.put('/api/assignment4/website/:websiteId', updateWebsite);

    app.delete('/api/assignment4/website/:websiteId', deleteWebsite);


    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;
        website._id = new Date().getTime() + "";
        website.developerId = userId;
        websites.push(website);
        res.sendStatus(200);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var results = [];
        for (var website in websites) {
            if (websites[website].developerId == userId) {
                results.push(websites[website]);
            }
        }
        res.send(results);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        var website = findWebsite(websiteId);
        if (website) {
            res.json(website);
        }
        else {
            res.sendStatus(404);
        }
    }

    function findWebsite(websiteId) {
        var website = websites.find(function (website) {
            return website._id === websiteId;
        });

        if (typeof website === 'undefined') {
            return null;
        }
        return website;
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;
        var websiteToBeUpdated = findWebsite(websiteId);
        if (websiteToBeUpdated) {
            var index = websites.indexOf(websiteToBeUpdated);
            websites[index] = website;
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var websiteToBeDeleted = findWebsite(websiteId);
        if (websiteToBeDeleted) {
            var index = websites.indexOf(websiteToBeDeleted);
            websites.splice(index, 1);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
};