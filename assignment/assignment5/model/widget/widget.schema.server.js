/**
 * Created by krish on 7/20/2017.
 */
var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({


    _page: {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel', required: true},
    type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT', 'TEXT']},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: {type: Number, min: 1, max: 6},
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated: {type: Date, default: new Date()}

}, {collection: 'Widget'});

module.exports = widgetSchema;