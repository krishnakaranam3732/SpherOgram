/**
 * Created by shravass on 7/6/17.
 */
var recipeSchema = require('./recipe.schema.server');

var mongoose = require('mongoose');

var recipeModel = mongoose.model('RecipeModel', recipeSchema);

recipeModel.createRecipe = createRecipe;
recipeModel.findRecipeById = findRecipeById;
recipeModel.findRecipesByOwner = findRecipesByOwner;
recipeModel.findRecipeByEdmamURI = findRecipeByEdmamURI;
recipeModel.findRecipeByLabelAndOwner = findRecipeByLabelAndOwner;
recipeModel.updateRecipe = updateRecipe;
recipeModel.deleteRecipe = deleteRecipe;
recipeModel.shareRecipe = shareRecipe;
recipeModel.unShareRecipe = unShareRecipe;
recipeModel.recentlySharedRecipes = recentlySharedRecipes;
recipeModel.mostLikedRecipes = mostLikedRecipes;

module.exports = recipeModel;


function createRecipe(recipe) {
    return recipeModel.create(recipe);
}

function findRecipeById(recipeId) {
    return recipeModel.findById(recipeId).populate('owner').exec();
}

function findRecipesByOwner(userId) {
    return recipeModel.find({owner: userId});
}

function findRecipeByEdmamURI(edmamURI) {
    return recipeModel.findOne({edmamURI: edmamURI});
}

function findRecipeByLabelAndOwner(label, owner) {
    return recipeModel.findOne({label: {$regex: ".*" + label + ".*", $options: 'i'}, owner: owner});
}

function updateRecipe(recipeId, updateRecipe) {
    return recipeModel.findOneAndUpdate({_id: recipeId}, {$set: updateRecipe});
}

function deleteRecipe(recipeId) {
    return recipeModel.findById(recipeId)
        .then(function (recipe) {
            return recipeModel.findOneAndRemove({_id: recipeId});
        }, function (err) {
            return null;
        });

}

function shareRecipe(recipeId) {
    return recipeModel.findOneAndUpdate({_id: recipeId}, {$set: {shared: true, dateShared: new Date()}});
}

function unShareRecipe(recipeId) {
    return recipeModel.findOneAndUpdate({_id: recipeId}, {$set: {shared: false, dateShared: null}});
}

function recentlySharedRecipes() {
    return recipeModel.find({shared: true}).sort({dateShared: -1}).limit(3).populate('owner');
}

function mostLikedRecipes() {
    return recipeModel.aggregate([{
        "$project": {
            "_id": 1,
            "label": 1,
            "image": 1,
            "edamamRecipe": 1,
            "likedUsers": 1,
            "owner": 1,
            "length": {"$size": "$likedUsers"}
        }
    }, {'$match': {'length': {'$gt': 0}}}, {"$sort": {"length": -1}}, {"$limit": 3}])
        .then(function (recipes) {
            return recipeModel.populate(recipes, {path: "owner"});
        })
}