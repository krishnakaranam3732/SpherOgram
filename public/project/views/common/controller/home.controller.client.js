/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .controller("HomeController", homeController);
    function homeController($interval,currentUser, $location) {

        var homeCtrl = this;
        homeCtrl.url = "img/photosphere.jpg";

        function init() {
        }

        init();

        

    }
})();