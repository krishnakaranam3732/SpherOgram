/**
 * Created by krish on 6/27/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .controller("PostViewController", PostViewController);
    function PostViewController(postService,userService,$routeParams,$route) {

        var PostViewCtrl = this;
        PostViewCtrl.postId = $routeParams.postId;
        PostViewCtrl.likePost = likePost;
        PostViewCtrl.deletePost = deletePost;

        function init() {
            postService.findPostById(PostViewCtrl.postId)
                .then(function (post) {
                    PostViewCtrl.post = post;
                    PostViewCtrl.URL = "https://maps.googleapis.com/maps/api/streetview?size=640x640&pano="+post.pano_id+"&heading=151.78&pitch=-0.76&key=AIzaSyASnCH-vhDoB1GRXorM0ctYDVwEILiUYf4";
                        PostViewCtrl.currentPost = post;
                    post.liked = post.likedUsers.indexOf(currentUser._id.toString()) !== -1;
                    if(currentUser._id.toString() === post.owner)
                    {
                        PostViewCtrl.currentPost.canDelete = "truth";
                    }
                }, postError);
        }
        init();

        function likePost() {
            if (!PostViewCtrl.currentPost.liked) {
                postService.likePost(PostViewCtrl.postId)
                    .then(function (post) {
                        PostViewCtrl.currentPost.liked = true;
                    });
            }
            else {
                postService.unLikePost(PostViewCtrl.postId)
                    .then(function (post) {
                        PostViewCtrl.currentPost.liked = false;
                    });
            }
        }

        function deletePost() {
            PostViewCtrl.error = null;
            postService.deletePost(PostViewCtrl.postId)
                .then(function (post) {
                    console.log("Post Deleted");
                }, postDelError);
        }

        function postError() {
            PostViewCtrl.error = " Post not found ";
        }
        function postDelError() {
            PostViewCtrl.error = " Post not deleted ";
        }
}
})();