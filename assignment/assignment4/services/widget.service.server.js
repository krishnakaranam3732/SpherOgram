/**
 * Created by krish on 7/7/17.
 */
module.exports = function (app) {

    var widgets = [
            {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/../../../public/assignment/assignment4/uploads')
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

    app.post('/api/assignment4/page/:pageId/widget', createWidget);

    app.get('/api/assignment4/page/:pageId/widget', findAllWidgetsForPage);

    app.put('/api/assignment4/page/:pageId/widget', reorderWidgets);

    app.get('/api/assignment4/widget/:widgetId', findWidgetById);

    app.put('/api/assignment4/widget/:widgetId', updateWidget);

    app.delete('/api/assignment4/widget/:widgetId', deleteWidget);

    app.post('/api/assignment4/upload', upload.single('uploadFile'), uploadImage);

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widget._id = new Date().getTime() + "";
        widget.pageId = pageId;
        widgets.push(widget);
        res.sendStatus(200);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        res.send(findWidgetsForPage(pageId));
    }

    function findWidgetsForPage(pageId) {
        var results = [];
        for (var widget in widgets) {
            if (widgets[widget].pageId == pageId) {
                results.push(widgets[widget]);
            }
        }
        return results;
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        var widget = findWidget(widgetId);
        if (widget) {
            res.json(widget);
        }
        else {
            res.sendStatus(404);
        }
    }

    function findWidget(widgetId) {
        var widget = widgets.find(function (widget) {
            return widget._id === widgetId;
        });

        if (typeof widget === 'undefined') {
            return null;
        }
        return widget;
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        var widgetToBeUpdated = findWidget(widgetId);
        if (widgetToBeUpdated) {
            var index = widgets.indexOf(widgetToBeUpdated);
            widgets[index] = widget;
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widgetToBeDeleted = findWidget(widgetId);
        if (widgetToBeDeleted) {
            var index = widgets.indexOf(widgetToBeDeleted);
            widgets.splice(index, 1);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    }

    function uploadImage(req, res) {

        var myFile = req.file;

        var filename = myFile.filename;
        var path = myFile.path;
        var destination = myFile.destination;
        var size = myFile.size;
        var mimetype = myFile.mimetype;
        console.log(myFile.filename);


        var url = '/assignment/assignment4/uploads/' + filename;
        console.log(url);
        res.status(200).send(url);
    }

    function reorderWidgets(req, res) {
        try
        {
            var pageId = req.params.pageId;
            var resultArray = findWidgetsForPage(pageId);
            var initial = req.query.initial;
            var final = req.query.final;

            var initialIndexInWidgets = widgets.indexOf(resultArray[initial]);
            var finalIndexInWidgets = widgets.indexOf(resultArray[final]);
            widgets.move(initialIndexInWidgets, finalIndexInWidgets);
            res.sendStatus(200);
        }
        catch(err)
        {
            res.sendStatus(404);
        }
    }
};