/**
 * Created by krish on 7/20/2017.
 */
module.exports = function (app) {

    var userModel = require('../../../common/model/user/user.model.server');

    app.post('/api/assignment5/user', createUser);

    app.get('/api/assignment5/user', findUserByUserDetails);

    app.get('/api/assignment5/user/:userId', findUserById);

    app.put('/api/assignment5/user/:userId', updateUser);

    app.delete('/api/assignment5/user/:userId', deleteUser);

    function createUser(req, res) {
        var user = req.body;
        console.log("called")
        userModel.createUser(user)
            .then(function (user) {
                if (user) {
                    res.json(user);
                    console.log("created")
                }
                else {
                    console.log("notcreated")
                    res.status(400).send(' User could not be created: ' + err);
                }
            }, function (err) {
                res.status(400).send(' User could not be created: ' + err);
                console.log("nope")
            });
    }

    function findUserByUserDetails(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {

            userModel.findUserByCredentials(username, password)
                .then(function (user) {
                    if (user) {
                        res.json(user);
                    }
                    else {
                        userModel.findUserByUserName(username).then(function (user) {
                            res.status(404).send(' Incorrect Password ');
                        }, function (err) {
                            res.status(404).send(' Incorrect Username / Password ');
                        });
                    }
                }, function (err) {
                    userModel.findUserByUserName(username).then(function (user) {
                        res.status(404).send(' Incorrect Password ');
                    }, function (err) {
                        res.status(404).send(' Incorrect Username / Password ');
                    });
                });
        }
        else if (username) {
            userModel.findUserByUserName(username).then(function (user) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(400);

            });
        }
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel.findUserById(userId)
            .then(function (user) {
                if (user) {
                    res.json(user);
                    console.log("found")
                }
                else {
                    res.sendStatus(404);
                    console.log("not found")
                }
            }, function (err) {
                res.sendStatus(404);
                console.log("def not found")
            });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        userModel.updateUser(userId, user)
            .then(function (user) {
                if (user) {
                    res.sendStatus(200);
                }
                else {
                    res.status(404).send('User not found');
                }
            }, function (err) {
                res.status(400).send(' User could not be updated' + err);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel.deleteUser(userId)
            .then(function (user) {
                if (user) {
                    res.sendStatus(200);
                }
                else {
                    res.status(404).send('User not found');
                }
            }, function (err) {
                res.status(400).send(' User could not be deleted' + err);
            });
    }
};