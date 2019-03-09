/**
 * Created by krish on 6/27/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .controller("UserViewController", UserViewController);
    function UserViewController(postService,searchService,$routeParams,userService,$route) {

        var UserViewCtrl = this;
        UserViewCtrl.userId = $routeParams.userId;
        UserViewCtrl.follow = follow;
        UserViewCtrl.findUserById = findUserById;
        function init() {
            findUserById(UserViewCtrl.userId);
            searchService.findPostsByOwner(UserViewCtrl.userId)
                .then(function (posts) {
                        posts.forEach(function(post,index){
                        post.URL = "https://maps.googleapis.com/maps/api/streetview?size=640x640&pano="+post.pano_id+"&heading=151.78&pitch=-0.76&key=AIzaSyASnCH-vhDoB1GRXorM0ctYDVwEILiUYf4";
                            }, PostError);
                UserViewCtrl.posts = posts;
                }, PostError);
        }

        init();

        function findUserById(userId) {
            searchService.findUserById(userId)
                .then(function (user) {
                    UserViewCtrl.user = user;
                    UserViewCtrl.user.followed = currentUser.following.indexOf(user._id.toString()) !== -1;
                }, userError);
        }

        function follow() {
            if (!UserViewCtrl.user.followed) {
                searchService.follow(UserViewCtrl.user._id)
                    .then(function (user) {
                        UserViewCtrl.user.followed = true;
                    });
            }
            else {
                searchService.unfollow(UserViewCtrl.user._id)
                    .then(function (user) {
                        UserViewCtrl.user.followed = false;
                    });
            }
        }

        function userError() {
            UserViewCtrl.error = " No user Found ";
        }
        function PostError() {
            UserViewCtrl.error = " No Posts found for this user ";
        }
        function postDelError() {
            PostViewCtrl.error = " Post not deleted ";
        }

}
})();