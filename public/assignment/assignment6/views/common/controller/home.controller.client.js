/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("HomeController", homeController);
    function homeController(currentUser, userService, $route) {

        var homeCtrl = this;
        homeCtrl.logout = logout;

        homeCtrl.user = currentUser;

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