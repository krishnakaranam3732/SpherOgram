/**
 * Created by krish on 6/22/17.
 */
module.exports = function (app) {

    var widgetModel = require('../../model/widget/widget.model.server');
    var pageModel = require('../../model/page/page.model.server');

    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/../../../public/assignment/assignment6/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    });

    var upload = multer({
        storage: storage, fileFilter: function fileFilter(req, file, cb) {

            // The function should call `cb` with a boolean
            // to indicate if the file should be accepted
            if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
                // To accept the file pass `true`, like so:
                cb(null, true);
            }
            else {
                // To reject this file pass `false`, like so:
                cb(null, false);
            }

        }
    });

    Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
    };

    app.post('/api/assignment6/page/:pageId/widget', validateSession, createWidget);

    app.get('/api/assignment6/page/:pageId/widget', validateSession, findAllWidgetsForPage);

    app.put('/api/assignment6/page/:pageId/widget', validateSession, reorderWidgets);

    app.get('/api/assignment6/widget/:widgetId', validateSession, findWidgetById);

    app.put('/api/assignment6/widget/:widgetId', validateSession, updateWidget);

    app.delete('/api/assignment6/widget/:widgetId', validateSession, deleteWidget);

    app.post('/api/assignment6/upload', validateSession, upload.single('uploadFile'), uploadImage);

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widgetModel.createWidget(widget, pageId)
            .then(function (widget) {
                if (widget) {
                    res.json(widget);
                }
                else {
                    res.status(400).send(' Widget could not be created: ');
                }
            }, function (err) {
                res.status(400).send(' Widget could not be created: ' + err);
            })

    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel.findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.send(widgets);
            }, function (err) {
                res.status(404).send(' Widgets not found ');
            })
    }


    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                if (widget) {
                    res.json(widget);
                }
                else {
                    res.status(404).send(' Widget not found ');
                }
            }, function (err) {
                res.status(404).send(' Widget not found ');
            });
    }


    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        widgetModel.updateWidget(widgetId, widget)
            .then(function (widget) {
                if (widget) {
                    res.json(widget);
                }
                else {
                    res.status(404).send(' Widget not found ');
                }
            }, function (err) {
                res.status(400).send(' Widget could not be updated ' + err);
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel.deleteWidget(widgetId)
            .then(function (widget) {
                if (widget) {
                    res.json(widget);
                }
                else {
                    res.status(404).send(' Widget not found ');
                }
            }, function (err) {
                res.status(400).send(' Widget could not be deleted ' + err);
            });
    }

    function uploadImage(req, res) {

        var myFile = req.file;

        var filename = myFile.filename;
        var path = myFile.path;
        var destination = myFile.destination;
        var size = myFile.size;
        var mimetype = myFile.mimetype;


        var url = '/assignment/assignment6/uploads/' + filename;
        res.status(200).send(url);

    }

    function reorderWidgets(req, res) {

        var pageId = req.params.pageId;
        var initial = req.query.initial;
        var final = req.query.final;

        widgetModel.reorderWidget(pageId, initial, final)
            .then(function (page) {
                if (page) {
                    res.sendStatus(200);
                }
                else {
                    res.status(404).send(' Widget could not be reordered ');
                }
            }, function (err) {
                res.status(404).send(' Widget could not be reordered ' + err);
            })
    }

    function validateSession(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.roles.indexOf('USER') !== -1) {
                if (req.params.pageId) {
                    pageModel.findWebsiteForPage(req.params.pageId)
                        .then(function (page) {
                            if (page._website._user.toString() === req.user._id.toString()) {
                                next();
                            }
                            else {
                                res.status(401).send('You do not have permission to view this page');
                            }
                        }, function () {
                            res.status(401).send('Website not available');
                        })
                }
                else {
                    widgetModel.findWebsiteForWidget(req.params.widgetId)
                        .then(function (widget) {
                            if (widget._page._website._user.toString() === req.user._id.toString()) {
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