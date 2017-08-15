/**
 * Created by krish on 6/27/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .controller("UserViewController", UserViewController);
    function UserViewController(searchService,$routeParams,userService,$location) {

        var UserViewCtrl = this;
        UserViewCtrl.userId = $routeParams.userId;
        //var username = UserViewCtrl.username;
        UserViewCtrl.findUserById = findUserById;

        function init() {
            findUserById(UserViewCtrl.userId);
            searchService.findPostsByOwner(UserViewCtrl.userId)
                .then(function (posts) {
                    UserViewCtrl.posts = posts;
                }, PostError);
        }

        init();

        function findUserById(userId) {
            searchService.findUserById(userId)
                .then(function (user) {
                    UserViewCtrl.user = user;
                }, userError);
        }

        function userError() {
            UserViewCtrl.error = " No user Found ";
        }
        function PostError() {
            UserViewCtrl.error = " No Posts found for this user ";
        }
}
})();