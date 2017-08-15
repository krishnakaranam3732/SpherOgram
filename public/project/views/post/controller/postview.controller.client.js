/**
 * Created by krish on 6/27/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .controller("PostViewController", PostViewController);
    function PostViewController(postService,userService,$location) {

        var PostViewCtrl = this;
        PostViewCtrl.findUserByUsername = findUserByUsername;

        function init() {
            postService.findPostById()
                .then(function (post) {
                    PostViewCtrl.post = post;
                    PostViewCtrl.currentPost = post;
                }, postError);
        }

        init();

        function likePost() {
            if (!PostViewCtrl.currentPost.liked) {
                postService.likePost(PostViewCtrl.currentPost._id)
                    .then(function (post) {
                        PostViewCtrl.currentPost.liked = true;
                    });
            }
            else {
                postService.unLikePost(PostViewCtrl.currentPost._id)
                    .then(function (post) {
                        PostViewCtrl.currentPost.liked = false;
                    });
            }
        }

        function postError() {
            PostViewCtrl.error = " Post not found ";
        }
}
})();