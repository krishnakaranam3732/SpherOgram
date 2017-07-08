/**
 * Created by krish on 7/7/17.
 */
(function () {
        angular
            .module("WebAppMaker")
            .controller("FlickrSearchController", FlickrSearchController);

        function FlickrSearchController($scope, $mdDialog, flickrService) {
            var dialogCtrl = this;
            this.searchPhotos = searchPhotos;
            this.selectPhoto = selectPhoto;
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            function searchPhotos(searchTerm) {
                flickrService
                    .searchPhotos(searchTerm)
                    .then(function (response) {
                        data = response.data.replace("jsonFlickrApi(", "");
                        data = data.substring(0, data.length - 1);
                        data = JSON.parse(data);
                        dialogCtrl.photos = data.photos;
                    });
            }

            function selectPhoto(photo) {
                var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
                url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
                $mdDialog.hide(url);

            }

        }
    })();