/**
 * Created by krish on 6/27/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .controller("UserSearchController", UserSearchController);
    function UserSearchController(searchService,userService,$route) {

        var UserSearchCtrl = this;
        UserSearchCtrl.follow = follow;
        UserSearchCtrl.findUserByUsername = findUserByUsername;

        function findUserByUsername(title) {
            searchService.findUserByUsername(title)
                .then(function (user) {
                    UserSearchCtrl.user = user;
                    UserSearchCtrl.user.followed = currentUser.following.indexOf(user._id.toString()) !== -1;
                }, userError);
        }

        function follow() {
            if (!UserSearchCtrl.user.followed) {
                searchService.follow(UserSearchCtrl.user._id)
                    .then(function (user) {
                        UserSearchCtrl.user.followed = true;
                    });
            }
            else {
                searchService.unfollow(UserSearchCtrl.user._id)
                    .then(function (user) {
                        UserSearchCtrl.user.followed = false;
                    });
            }
        }

        function userError() {
            UserSearchCtrl.error = " No user found with the username ";
        }
}
})();