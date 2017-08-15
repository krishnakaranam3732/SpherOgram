/**
 * Created by shravass on 7/6/17.
 */

var mongoose = require('mongoose');

var favouritesSchema = mongoose.Schema({

    startDate: Date,
    endDate: Date,
    category: {type: String, enum: ['RECIPE', 'MEALPLAN']},
    recipe: {type: mongoose.Schema.Types.ObjectId, ref: 'RecipeModel'},
    mealPlan: {type: mongoose.Schema.Types.ObjectId, ref: 'MealPlanModel'},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}

}, {collection: 'Favourites'});

module.exports = favouritesSchema;