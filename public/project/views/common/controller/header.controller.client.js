/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .controller("HeaderController", headerController);
    function headerController(userService, $route) {

        var headerCtrl = this;
        headerCtrl.logout = logout;

        function init() {
            userService.validateSession()
                .then(function (user) {
                    headerCtrl.user = user;
                }, function () {
                    headerCtrl.user = null;
                });
        }

        init();

        function logout() {
            userService.logout().then(
                function () {
                    $route.reload();
                }, function () {
                    $route.reload();
                });
        }


    }
})();