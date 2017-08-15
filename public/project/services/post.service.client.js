/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .factory("postService", postService);
    function postService($http) {
        var postURL = '/api/project/post';

        var api = {
            createPost: createPost,
            findPostById: findPostById,
            findPostsByUser: findPostsByUser,
            deletePost: deletePost,
            recentlySharedPosts: recentlySharedPosts,
            likePost: likePost,
            unLikePost: unLikePost
        };
        return api;

        this.createPost = createPost;
        this.findPostById = findPostById;
        this.findPostsByUser = findPostsByUser;
        this.deletePost = deletePost;
        this.recentlySharedPosts = recentlySharedPosts;
        this.likePost = likePost;
        this.unLikePost = unLikePost;

        function createPost(post) {
            var url = postURL;
            return $http.post(url, post)
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

        function findPostsByUser(userId) {
            var url = postURL + '/user/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePost(postId) {
            var url = postURL + '/' + postId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function recentlySharedPosts() {
            var url = '/api/project/feed';
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

        function unLikePost(recipeId) {
            var url = postURL + '/unLike/' + postId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }




    }
})();