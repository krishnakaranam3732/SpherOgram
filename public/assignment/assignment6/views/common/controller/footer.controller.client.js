/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("FooterController", footerController);
    function footerController($location, $route, userService) {

        var footerCtrl = this;
        footerCtrl.logout = logout;
        footerCtrl.reloadPage = reloadPage;

        function init() {
            footerCtrl.profilePage = $location.path().includes("profile");
            userService.validateSession()
                .then(function (user) {
                    footerCtrl.user = user;
                }, function () {
                });
        }

        init();

        function logout() {
            userService.logout().then(
                function () {
                    $location.url('/');
                }, function () {
                    $location.url('/');
                });
        }

        function reloadPage() {
            $route.reload();
        }
    }
})();