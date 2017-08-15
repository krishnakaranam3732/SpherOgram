/**
 * Created by krish on 6/22/17.
 */
module.exports = function (app) {

    var searchModel = require('../model/search/search.model.server');

    app.get('/api/project/search/:username', isAdminOrUser, findUserByUsername);
    app.get('/api/project/search/userId/:userId', isAdminOrUser, findUserById);
    app.get('/api/project/posts/:userId', validateSession, findPostsByOwner);

    function findUserByUsername(req, res) {
        var username = req.params.username;
        searchModel.findUserByUserName(username)
            .then(function (user) {
                if (user) {
                    res.json(user);
                }
                else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        searchModel.findUserById(userId)
            .then(function (user) {
                if (user) {
                    res.json(user);
                }
                else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function findPostsByOwner(req, res) {
        var userId = req.params.userId;
        searchModel.findPostsByOwner(userId)
            .then(function (posts) {
                res.send(posts);
            }, function (err) {
                res.status(404).send(' Post nnot found ');
            });
    }

    function validateSession(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.roles.indexOf('USER') !== -1) {
                if (req.params.postId) {
                    searchModel.findPostById(req.params.postId)
                        .then(function (post) {
                            if (post) {
                                next();
                            }
                            else {
                                res.status(401).send('Post nott available');
                            }
                        }, function () {
                            res.status(401).send('Post noot available');
                        })
                }
                else {
                    next();
                }
            }
            else {
                res.status(401).send('You do not have permission to view this page. Not a valid USER');
            }
        }
        else {
            res.status(401).send('Your session has expired');
        }
    }

    function isAdmin(req, res, next) {
        if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') !== -1) {
            next();
        }
        else {
            res.sendStatus(401);
        }
    }

    function isAdminOrUser(req, res, next) {
        if (req.isAuthenticated() && req !=null) {
            //console.log("because 1 : "+req);
            next();
        }
        else if (req.isAuthenticated() && req.user._id.toString() === req.params.userId) {
            //console.log("because 2 : "+req);
            next();
        }
        else {
            //console.log("because 3 : "+req);
            res.sendStatus(401);
        }
    }

};