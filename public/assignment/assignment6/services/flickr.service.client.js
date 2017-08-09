/**
 * Created by krish on 6/27/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service('flickrService', flickrService);

    function flickrService($http) {

        this.searchPhotos = searchPhotos;
        var key = "0ab3dd354c377b086c873109cbbcbb22";
		var secret = "ba00c0eb2f90bc98";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();