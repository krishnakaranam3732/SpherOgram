/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .factory("searchService", searchService);
    function searchService($http) {
        var searchURL = '/api/project/search';

        var api = {
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            findPostsByOwner: findPostsByOwner,
            follow: follow,
            unfollow : unfollow
        };
        return api;

        this.findUserByUsername = findUserByUsername;
        this.findUserById = findUserById;
        this.findPostsByOwner = findPostsByOwner;
        this.follow = follow;
        this.unfollow = unfollow;


        function findUserByUsername(username) {
            var url = searchURL + '/' + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = searchURL + '/userId/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPostsByOwner(userId) {
            var url = '/api/project/posts/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function follow(userId) {
            var url = '/api/project/search/user/follow/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function unfollow(userId) {
            var url = '/api/project/search/user/unfollow/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


    }
})();