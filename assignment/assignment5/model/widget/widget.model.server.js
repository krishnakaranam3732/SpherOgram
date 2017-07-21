/**
 * Created by krish on 7/20/2017.
 */
var widgetSchema = require('./widget.schema.server');

var mongoose = require('mongoose');

var widgetModel = mongoose.model('WidgetModel', widgetSchema);

var pageModel = require('./../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};


function createWidget(widget, pageId) {
    widget._page = pageId;
    return widgetModel.create(widget)
        .then(function (widget) {
            return pageModel.addWidget(pageId, widget._id);
        }, function (err) {
            return null;
        })
}

function findAllWidgetsForPage(pageId) {

    return pageModel.findPageById(pageId)
        .populate('widgets')
        .exec()
        .then(function (page) {
            if (page) {
                return page.widgets;
            }
            else {
                return null;
            }
        }, function (err) {
            return null;
        })
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, updateWidget) {
    return widgetModel.findOneAndUpdate({_id: widgetId}, {$set: updateWidget});
}

function deleteWidget(widgetId) {
    return widgetModel.findById(widgetId)
        .populate('_page')
        .exec()
        .then(function (widget) {
                if (widget) {
                    var index = widget._page.widgets.indexOf(widget._id);
                    widget._page.widgets.splice(index, 1);
                    return widget._page.save()
                        .then(function (status) {
                            return widgetModel.findOneAndRemove({_id: widgetId});
                        }, function (err) {
                            return null;
                        });
                }
                else {
                    return null;
                }
            }, function (err) {
                return null;
            }
        )
}

function reorderWidget(pageId, start, end) {
    return pageModel.findPageById(pageId)
        .then(function (page) {
            if (page) {
                page.widgets.move(start, end);
                return page.save();
            }
            else {
                return null;
            }
        }, function (err) {
            return null;
        })
}