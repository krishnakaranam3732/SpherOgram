/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .controller("RegisterController", registerController);
    function registerController($location, userService, $anchorScroll) {

        var registerCtrl = this;

        registerCtrl.register = register;

        function register() {
            registerCtrl.error = null;
            if (registerCtrl.user.password !== registerCtrl.verifyPassword) {
                registerCtrl.error = " Password does not match ";
                var element = document.getElementById('inputPassword');
                element.focus();
                $anchorScroll('top');
            }
            else {
                userService.findUserByUsername(registerCtrl.user.username)
                    .then(function () {
                        registerCtrl.error = " Username already exists";
                        $anchorScroll('top');
                    }, function () {
                        registerCtrl.user.roles = "USER";
                        userService.register(registerCtrl.user)
                            .then(function (user) {
                                $location.url('/profile');

                            }, function () {
                                registerCtrl.error = "Oops! Something went wrong. Please try again later";
                                $anchorScroll('top');
                            })
                    })
            }

        }

    }
})();