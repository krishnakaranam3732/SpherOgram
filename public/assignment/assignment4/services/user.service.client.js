/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);
    function userService($http) {
        var userURL = '/api/assignment4/user';


        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(user) {
            var url = userURL;
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = userURL + '/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = userURL + '?username=' + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = userURL + '?username=' + username + '&password=' + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    return error.data;
                });
        }

        function updateUser(userId, user) {
            var url = userURL + '/' + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = userURL + '/' + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();