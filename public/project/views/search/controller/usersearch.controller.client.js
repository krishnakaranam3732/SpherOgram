/**
 * Created by krish on 6/27/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .controller("UserSearchController", UserSearchController);
    function UserSearchController(searchService,userService,$location) {

        var UserSearchCtrl = this;
        UserSearchCtrl.findUserByUsername = findUserByUsername;

        function findUserByUsername(title) {
            searchService.findUserByUsername(title)
                .then(function (user) {
                    console.log(user);
                    UserSearchCtrl.user = user;
                }, userError);
        }

        function userError() {
            UserSearchCtrl.error = " No user found with the username ";
        }
}
})();