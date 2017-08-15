/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);
    function loginController($location, userService, $anchorScroll) {

        var loginCtrl = this;

        loginCtrl.login = login;

        function login() {
            loginCtrl.error = null;
            userService.findUserByCredentials(loginCtrl.username, loginCtrl.password)
                .then(function (userResponse) {
                    if (angular.isObject(userResponse)) {
                        $location.url('/user/' + userResponse._id);
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