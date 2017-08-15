/**
 * Created by krish on 6/27/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .controller("FeedViewController", FeedViewController);
    function FeedViewController(postService,userService,searchService,$routeParams,$route) {

        var FeedViewCtrl = this;
        FeedViewCtrl.userId = $routeParams.userId;
        console.log("feed view controller "+FeedViewCtrl.userId);
        FeedViewCtrl.feedposts = [];
        function init() {postService.recentlySharedPosts(FeedViewCtrl.userId)
            .then(function (posts) {
                FeedViewCtrl.posts = posts;
                FeedViewCtrl.posts.forEach(
                    function(item,index){
                    });
                searchService.findUserById(FeedViewCtrl.userId)
                    .then(function (user) {
                        FeedViewCtrl.user = user;
                        FeedViewCtrl.posts.forEach(function(postitem,index1){
                            FeedViewCtrl.user.following.forEach(function(followingitem,index2){
                                searchService.findUserById(followingitem)
                                    .then(function (user) {
                                        FeedViewCtrl.tmpUsername = user.username;
                                        if (postitem.description == FeedViewCtrl.tmpUsername)
                                        {
                                            postitem.URL="https://maps.googleapis.com/maps/api/streetview?size=640x640&pano="+postitem.pano_id+"&heading=151.78&pitch=-0.76&key=AIzaSyDa5tElq2T9VB42EmrHyTMlSlEbJmmgib8";
                                            FeedViewCtrl.feedposts.push(postitem);
                                        }
                                    }, postError);

                            });
                        });
                    }, postError);
            }, postError);
        }
        init();



        function postError() {
            FeedViewCtrl.error = " Post not found ";
        }
}
})();