/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .controller("HomeController", homeController);
    function homeController($interval,currentUser, $route,userService) {

        var homeCtrl = this;
        homeCtrl.url = "img/photosphere.jpg";
        homeCtrl.logout = logout;

        homeCtrl.currentUser = currentUser;

        function logout() {
            userService.logout().then(
                function () {
                    $route.reload()
                }, profileError);
        }

        function profileError() {
            homeCtrl.error = "Oops! Something went wrong. Please try again later";
        }
        

    }
})();