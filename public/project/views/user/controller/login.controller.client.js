/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .controller("LoginController", loginController);
    function loginController($location, userService, $anchorScroll) {

        var loginCtrl = this;

        loginCtrl.login = login;

        function login() {
            loginCtrl.error = null;
            userService.login(loginCtrl.username, loginCtrl.password)
                .then(function (userResponse) {
                    if (angular.isObject(userResponse)) {
                        $location.url('/');
                    }
                    else {
                        if (userResponse) {
                            loginCtrl.error = userResponse;
                        }
                        else {
                            loginCtrl.error = " Oops! Something went wrong. Please try again later ";
                        }
                        $anchorScroll('top');
                    }
                })
        }

    }
})();