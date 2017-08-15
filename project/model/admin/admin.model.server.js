/**
 * Created by shravass on 7/6/17.
 */
var favouritesSchema = require('./favourites.schema.server');

var mongoose = require('mongoose');

var favouritesModel = mongoose.model('FavouritesModel', favouritesSchema);

favouritesModel.createFavourites = createFavourites;
favouritesModel.findFavouritesById = findFavouritesById;
favouritesModel.findFavouritesByWeek = findFavouritesByWeek;
favouritesModel.findFavouritesByEntityId = findFavouritesByEntityId;
favouritesModel.updateFavourites = updateFavourites;
favouritesModel.deleteFavourites = deleteFavourites;


module.exports = favouritesModel;


function createFavourites(favourites) {
    return favouritesModel.create(favourites);
}

function findFavouritesById(favouritesId) {
    return favouritesModel.findById(favouritesId);
}

function findFavouritesByWeek(startDate, endDate) {
    return favouritesModel.find({startDate: startDate, endDate: endDate});
}

function findFavouritesByEntityId(favourites) {
    if (favourites.category === 'RECIPE') {
        return favouritesModel.findOne({recipe: favourites.recipe, category: 'RECIPE'});
    }
    else if (favourites.category === 'MEALPLAN') {
        return favouritesModel.findOne({mealPlan: favourites.mealPlan, category: 'MEALPLAN'});
    }
}

function updateFavourites(updateFavourite) {
    return favouritesModel.findOneAndUpdate({
        startDate: updateFavourite.startDate,
        endDate: updateFavourite.endDate,
        category: updateFavourite.category
    }, {$set: updateFavourite});
}

function deleteFavourites(favouritesId) {
    return favouritesModel.findById(favouritesId)
        .then(function (favourites) {
            return favouritesModel.findOneAndRemove({_id: favouritesId});
        }, function (err) {
            return null;
        });

}
