/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .factory("postService", postService);
    function postService($http) {
        var postURL = '/api/project/user/post';

        var api = {
            createPost: createPost,
            findPostById: findPostById,
            findPostsByUser: findPostsByUser,
            deletePost: deletePost,
            recentlySharedPosts: recentlySharedPosts,
            likePost: likePost,
            unLikePost: unLikePost,
            findpostiflikedbyuser:findpostiflikedbyuser,
            searchPost:searchPost
        };
        return api;

        this.createPost = createPost;
        this.searchPost = searchPost;
        this.findPostById = findPostById;
        this.findPostsByUser = findPostsByUser;
        this.deletePost = deletePost;
        this.recentlySharedPosts = recentlySharedPosts;
        this.likePost = likePost;
        this.unLikePost = unLikePost;
        this.findpostiflikedbyuser = findpostiflikedbyuser;

        function createPost(post) {
            var url = postURL;
            return $http.post(url, post)
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    return error.data;
                });
        }

        function searchPost(place) {
            var url = "https://maps.googleapis.com/maps/api/streetview/metadata?size=640x640&location="+place+"&key=AIzaSyDa5tElq2T9VB42EmrHyTMlSlEbJmmgib8";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    return error.data;
                });
        }

        function findPostById(postId) {
            var url = postURL + '/' + postId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findpostiflikedbyuser(userId,postId) {
            var url = postURL + '/liked/' + postId + "/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPostsByUser(userId) {
            var url = postURL + '/user/' + userId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePost(postId) {
            var url = postURL + '/delete/' + postId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function recentlySharedPosts(userId) {
            var url = '/api/project/feed/'+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function likePost(postId) {
            var url = postURL + '/like/' + postId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function unLikePost(postId) {
            var url = postURL + '/unLike/' + postId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


    }
})();