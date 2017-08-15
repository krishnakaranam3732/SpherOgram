/**
 * Created by krish on 7/20/2017.
 */

var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({

    _website: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel', required: true},
    name: {type: String, required: true},
    title: String,
    description: String,
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}],
    dateCreated: {type: Date, default: new Date()}
}, {collection: 'Page'});

module.exports = pageSchema;