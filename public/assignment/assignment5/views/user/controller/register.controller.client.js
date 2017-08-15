/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);
    function registerController($location, userService, $anchorScroll) {

        var registerCtrl = this;

        registerCtrl.register = register;

        function register() {
            registerCtrl.error = null;
            if (registerCtrl.user.password !== registerCtrl.verifyPassword) {
                registerCtrl.error = " Password does not match ";
                $anchorScroll('top');
            }
            else {
                userService.createUser(registerCtrl.user)
                            .then(function (user) {
                                $location.url('/user/' + user._id);
								$anchorScroll('top');
                    })
            }

        }

    }
})();