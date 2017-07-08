/**
 * Created by krish on 7/7/17.
 */
module.exports = function (app) {

    var users = [
        {
            _id: "123",
            username: "alice",
            password: "alice",
            firstName: "Alice",
            lastName: "Wonder",
            email: "alice.wonder@gmail.com"
        },
        {
            _id: "234",
            username: "bob",
            password: "bob",
            firstName: "Bob",
            lastName: "Marley",
            email: "bob.marley@gmail.com"
        },
        {
            _id: "345",
            username: "charly",
            password: "charly",
            firstName: "Charly",
            lastName: "Garcia",
            email: "charly.garcia@gmail.com"
        },
        {
            _id: "456",
            username: "jannunzi",
            password: "jannunzi",
            firstName: "Jose",
            lastName: "Annunzi",
            email: "jose.annunzi@gmail.com"
        }
    ];

    app.post('/api/assignment4/user', createUser);

    app.get('/api/assignment4/user', findUserByUserDetails);

    app.get('/api/assignment4/user/:userId', findUserById);

    app.put('/api/assignment4/user/:userId', updateUser);

    app.delete('/api/assignment4/user/:userId', deleteUser);

    function createUser(req, res) {
        var user = req.body;
        user._id = new Date().getTime() + "";
        users.push(user);
        res.json(user);
    }

    function findUserByUserDetails(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            var user = findUserByCredentials(username, password);
            if (user) {
                res.json(user);
            }
            else {
                user = findUserByUsername(username);
                if (user) {
                    res.status(400).send(' Incorrect Password ');
                }
                else {
                    res.status(400).send(' Incorrect Username / Password ');
                }
            }
        }
        else if (username) {
            var user = findUserByUsername(username);
            if (user) {
                res.sendStatus(200);
            }
            else {
                res.sendStatus(400);
            }
        }
    }

    function findUserByUsername(username) {
        var user = users.find(function (user) {
            return user.username === username;
        });
        if (typeof user === 'undefined') {
            return null;
        }
        return user;
    }

    function findUserByCredentials(username, password) {
        var user = users.find(function (user) {
            return (user.username === username && user.password === password);
        });
        if (typeof user === 'undefined') {
            return null;
        }
        return user;
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var user = findUser(userId);
        if (user) {
            res.json(user);
        }
        else {
            res.sendStatus(400);
        }
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        var userToBeUpdated = findUser(userId);
        if (userToBeUpdated) {
            var index = users.indexOf(userToBeUpdated);
            users[index] = user;
            res.sendStatus(200);
        }
        else {
            res.sendStatus(400);
        }
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        var userToBeDeleted = findUser(userId);
        if (userToBeDeleted) {
            var index = users.indexOf(userToBeDeleted);
            users.splice(index, 1);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(400);
        }
    }

    function findUser(userId) {
        var user = users.find(function (user) {
            return user._id === userId;
        });

        if (typeof user === 'undefined') {
            return null;
        }
        return user;
    }
};