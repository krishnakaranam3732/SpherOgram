/**
 * Created by krish on 6/22/17.
 */
module.exports = function (app) {

    var userModel = require('../../common/model/user/user.model.server');

    var passport = require('../../common/strategies/passport.strategy');

    //bcrypt
    var bcrypt = require("bcrypt-nodejs");


    app.post('/api/project/user', isAdmin, createUser);

    app.get('/api/project/user', isAdminOrUser, findUserByUserDetails);

    app.get('/api/project/user/:userId', isAdminOrUser, findUserById);

    app.put('/api/project/user/:userId', isAdminOrUser, updateUser);

    app.delete('/api/project/user/:userId', isAdminOrUser, deleteUser);

    app.post('/api/project/login', login);

    app.get('/api/project/validateSession', validateSession);

    app.get('/api/project/logout', logout);

    app.post('/api/project/register', register);

    app.get('/auth/project/facebook', passport.authenticate('facebook', {scope: 'email'}));

    app.get('/api/project/users', isAdmin, findAllUsers);

    app.get('/api/project/verifyAdmin', verifyAdmin);


    app.get('/auth/project/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project',
            failureRedirect: '/project/login'
        }));

    app.get('/auth/project/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    app.get('/auth/project/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project',
            failureRedirect: '/project/login'
        }));


    function createUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel.createUser(user)
            .then(function (user) {
                if (user) {
                    res.json(user);
                }
                else {
                    res.status(400).send(' User could not be created: ' + err);
                }
            }, function (err) {
                res.status(400).send(' User could not be created: ' + err);
            });
    }

    function findUserByUserDetails(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            userModel.findUserByUserName(username)
                .then(function (user) {
                    if (user) {
                        if (bcrypt.compareSync(password, user.password)) {
                            res.json(user);
                        }
                        else {
                            res.status(404).send(' Incorrect Password ');
                        }
                    }
                    else {
                        res.status(404).send(' Incorrect Username / Password ');
                    }
                }, function (err) {
                    res.status(404).send(' Incorrect Username / Password ');
                });
        }
        else if (username) {
            userModel.findUserByUserName(username).then(function (user) {
                if (user) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }
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
                }
                else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        if (user.newPassword) {
            user.password = bcrypt.hashSync(user.newPassword);
            delete user.newPassword;
        }
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
                    if (req.user._id.toString() === userId) {
                        req.logout();
                    }
                    res.sendStatus(200);
                }
                else {
                    res.status(404).send('User not found');
                }
            }, function (err) {
                res.status(400).send(' User could not be deleted' + err);
            });
    }

    /* function login(req, res) {
     var user = req.user;
     res.json(user);
     }*/

    function login(req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).send(info.message);
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.json(user);
            });
        })(req, res, next);
    }

    function validateSession(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        }
        else {
            res.sendStatus(401);
        }
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel.createUser(user)
            .then(function (user) {
                if (user) {
                    req.login(user, function () {
                        res.sendStatus(200);
                    }, function (err) {
                        res.status(400).send(' User could not be created: ' + err);
                    });
                }
                else {
                    res.status(400).send(' User could not be created: ' + err);
                }
            }, function (err) {
                res.status(400).send(' User could not be created: ' + err);
            });
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                if (users) {
                    res.send(users);
                }
                else {
                    res.status(404).send('Users not found');
                }
            }, function (err) {
                res.status(404).send('Users not found');
            });
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
        if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') !== -1) {
            next();
        }
        else if (req.isAuthenticated() && req.user._id.toString() === req.params.userId) {
            next();
        }
        else {
            res.sendStatus(401);
        }

    }

    function verifyAdmin(req, res) {
        if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') !== -1) {
            res.json(req.user);
        }
        else {
            res.sendStatus(401);
        }

    }
};