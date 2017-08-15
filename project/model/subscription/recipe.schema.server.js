/**
 * Created by shravass on 7/6/17.
 */

var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({

    label: {type: String, required: true},
    image: String,
    sourceURL: String,
    yield: Number,
    healthLabels: [{type: String}],
    ingredientLines: [{type: String}],
    calories: Number,
    prepTime: Number,
    totalWeight: Number,
    totalNutrients: mongoose.Schema.Types.Mixed,
    procedure: String,
    edamamRecipe: Boolean,
    edmamURI: String,
    dateCreated: {type: Date, default: new Date()},
    shared: {type: Boolean, default: false},
    dateShared: Date,
    likedUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}

}, {collection: 'Recipe'});

module.exports = recipeSchema;