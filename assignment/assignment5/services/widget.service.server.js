/**
 * Created by krish on 7/20/2017.
 */
module.exports = function (app) {

    var widgetModel = require('./../model/widget/widget.model.server');

    var widgets = [
            {"_id": "123", "type": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "type": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "type": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "type": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "type": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "type": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "type": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/../../../public/assignment/assignment5/uploads')
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

    app.post('/api/assignment5/page/:pageId/widget', createWidget);

    app.get('/api/assignment5/page/:pageId/widget', findAllWidgetsForPage);

    app.put('/api/assignment5/page/:pageId/widget', reorderWidgets);

    app.get('/api/assignment5/widget/:widgetId', findWidgetById);

    app.put('/api/assignment5/widget/:widgetId', updateWidget);

    app.delete('/api/assignment5/widget/:widgetId', deleteWidget);

    app.post('/api/assignment5/upload', upload.single('uploadFile'), uploadImage);

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

        var myFile = req.file
        var filename = myFile.filename;
        var path = myFile.path;
        var destination = myFile.destination;
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        var url = '/assignment/assignment5/uploads/' + filename;
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
};