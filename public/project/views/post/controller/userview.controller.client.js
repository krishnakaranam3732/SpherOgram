/**
 * Created by krish on 6/27/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .controller("UserViewController", UserViewController);
    function UserViewController(searchService,$routeParams,userService,$location) {

        var UserViewCtrl = this;
        UserViewCtrl.username = $routeParams.username;
        UserViewCtrl.findPostsByOwner = findPostsByOwner;
        UserViewCtrl.findUserByUsername = findUserByUsername;

        function init() {
            console.log("Started Working "+UserViewCtrl.username);
            findUserByUsername(UserViewCtrl.username);
            findPostsByOwner(UserViewCtrl.username);
        }

        init();


        function findPostsByOwner(username) {
            searchService.findPostsByOwner(username)
                .then(function (posts) {
                    console.log(posts);
                    UserViewCtrl.posts = posts;
                }, PostError);
        }

        function findUserByUsername(username) {
            searchService.findUserByUsername(username)
                .then(function (user) {
                    console.log(user);
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