/**
 * Created by krish on 6/22/17.
 */
module.exports = function (app) {

    var postModel = require('../model/post/post.model.server');

    app.post('/api/project/user/post', validateSession, createPost);

    app.get('/api/project/user/post/:postId', isAdminOrUser, findPostById);

    app.get('/api/project/user/post/user/:userId', validateSession, findPostsByUser);

//findPostByDescriptionAndOwner

    app.put('/api/project/user/post/:postId', validateSession, updatePost);

    app.delete('/api/project/user/post/delete/:postId', validateSession, deletePost);

    app.get('/api/project/user/post/share/:postId', validateSession, sharePost);

    app.get('/api/project/user/post/unShare/:postId', validateSession, unSharePost);

    app.get('/api/project/user/post/liked/:postId/:userId', validateSession, findpostiflikedbyuser);

    app.get('/api/project/feed/:userId', isAdminOrUser, recentlySharedPosts);

    app.get('/api/project/user/mostLikedPosts', isAdmin, mostLikedPosts);

    app.get('/api/project/user/post/like/:postId', isAdminOrUser, likePost);

    app.get('/api/project/user/post/unLike/:postId', isAdminOrUser, unLikePost);

    function createPost(req, res) {
        var post = req.body;
        post.owner = req.user._id;
            postModel.createPost(post)
                .then(function (post) {
                 if (post) {
                    res.json(post);
                        }
                 else {
                     res.status(400).send(' Post could not be created: ' + err);
                 }
                }, function (err) {
                    res.status(400).send(' Post could not be created: ' + err);
                });
                }


    function findPostById(req, res) {
        var postId = req.params.postId;
        postModel.findPostById(postId)
            .then(function (post) {
                if (post) {
                    res.json(post);
                }
                else {
                    res.status(404).send('1 Post not found ');
                }
            }, function (err) {
                res.status(404).send('2 Post not found ');
            })
    }

    function findpostiflikedbyuser(req, res) {
        var postId = req.params.postId;
        var userId = req.params.userId;
        postModel.findpostiflikedbyuser(userId,postId)
            .then(function (post) {
                if (post) {
                    res.json(post);
                }
                else {
                    res.status(404).send('1 Post not found ');
                }
            }, function (err) {
                res.status(404).send('2 Post not found ');
            })
    }

    function findPostsByUser(req, res) {
        var userId = req.userId;
        postModel.findPostsByOwner(userId)
            .then(function (posts) {
                res.send(posts);
            }, function (err) {
                res.status(404).send(' Post not found ');
            });
    }

    function updatePost(req, res) {
        var postId = req.params.postId;
        var post = req.body;
        postModel.updatePost(postId, post)
            .then(function (post) {
                if (post) {
                    res.json(post);
                }
                else {
                    res.status(404).send(' Post not found ');
                }
            }, function (err) {
                res.status(400).send(' Post could not be updated ' + err);
            });
    }

    function deletePost(req, res) {
        var postId = req.params.postId;
        postModel.deletePost(postId)
            .then(function (post) {
                if (post) {
                    res.json(post);
                }
                else {
                    res.status(404).send(' Post not found ');
                }
            }, function (err) {
                res.status(400).send(' Post could not be deleted ' + err);
            });
    }

    function validateSession(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.roles.indexOf('USER') !== -1) {
                if (req.params.postId) {
                    postModel.findPostById(req.params.postId)
                        .then(function (post) {
                            if (post) {
                                if (post.owner._id.toString() === req.user._id.toString()) {
                                    next();
                                }
                                else {
                                    res.status(401).send('You do not have permission to view this page. Not post Owner');
                                }
                            }
                            else {
                                res.status(401).send('Post not available');
                            }
                        }, function () {
                            res.status(401).send('Post not available');
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

    function sharePost(req, res) {
        var postId = req.params.postId;
        postModel.sharePost(postId)
            .then(function (post) {
                if (post) {
                    res.json(post);
                }
                else {
                    res.status(404).send(' Post not found ');
                }
            }, function (err) {
                res.status(400).send(' Post could not be shared ' + err);
            });
    }

    function unSharePost(req, res) {
        var postId = req.params.postId;
        postModel.unSharePost(postId)
            .then(function (post) {
                if (post) {
                    res.json(post);
                }
                else {
                    res.status(404).send(' Post not found ');
                }
            }, function (err) {
                res.status(400).send(' Post could not be unShared ' + err);
            });
    }

    function recentlySharedPosts(req, res) {
        postModel.recentlySharedPosts()
            .then(function (posts) {
                if (posts) {
                    res.json(posts);
                }
                else {
                    res.status(404).send(' Post not found ');
                }
            }, function (err) {
                res.status(400).send(' Post could not be retrieved ' + err);
            });
    }

    function likePost(req, res) {
        var postId = req.params.postId;
        postModel.findPostById(postId)
            .then(function (postFound) {
                if (postFound) {
                    postFound.likedUsers.push(req.user._id);
                    postModel.updatePost(postFound._id, postFound)
                        .then(function (post) {
                            if (post) {
                                res.json(post);
                            }
                            else {
                                res.status(404).send(' Post not found ');
                            }
                        }, function (err) {
                            res.status(400).send(' Post could not be updated ' + err);
                        });
                } else {
                    res.status(404).send(' Post not found ');
                }
            }, function (err) {
                res.status(400).send(' Post could not be updated ' + err);
            });
    }

    function unLikePost(req, res) {
        var postId = req.params.postId;
        postModel.findPostById(postId)
            .then(function (postFound) {
                if (postFound) {
                    postFound.likedUsers.splice(req.user._id, 1);
                    postModel.updatePost(postFound._id, postFound)
                        .then(function (post) {
                            if (post) {
                                res.json(post);
                            }
                            else {
                                res.status(404).send(' Post not found ');
                            }
                        }, function (err) {
                            res.status(400).send(' Post could not be updated ' + err);
                        });
                } else {
                    res.status(404).send(' Post not found ');
                }
            }, function (err) {
                res.status(400).send(' Post could not be updated ' + err);
            });
    }

    function mostLikedPosts(req, res) {
        postModel.mostLikedPosts()
            .then(function (posts) {
                if (posts) {
                    res.json(posts);
                }
                else {
                    res.status(404).send(' Post not found ');
                }
            }, function (err) {
                res.status(400).send(' Post could not be retrieved ' + err);
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
        if (req.isAuthenticated()) {
            next();
        }
        else if (req.isAuthenticated() && req.user._id.toString() === req.params.userId) {
            next();
        }
        else {
            res.sendStatus(401);
        }

    }

};