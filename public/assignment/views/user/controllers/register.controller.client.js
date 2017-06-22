/**
 * Created by krish on 6/21/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function init() {

        }
        init();

        function register(user) {
            if(user.password != user.passConfirm) {
                vm.error = "Please repeat the correct password."
            } else {
                delete user['passConfirm'];
                user._id = (new Date()).getTime().toString();
                UserService.createUser(user);
                if(user) {
                    $location.url("/user/" + user._id);
                } else {
                    vm.error = "registration failed!";
                }
            }
        }
    }
})();