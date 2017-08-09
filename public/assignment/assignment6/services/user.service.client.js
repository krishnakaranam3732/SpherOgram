/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);
    function userService($http) {
        var userURL = '/api/assignment6/user';
        var assignmentURL = '/api/assignment6';

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            validateSession: validateSession,
            logout: logout,
            register: register,
            verifyAdmin: verifyAdmin,
            findAllUsers: findAllUsers
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

        function login(username, password) {
            var credentials = {
                username: username,
                password: password
            };
            var url = assignmentURL + '/login';
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    return error.data;
                });

        }

        function validateSession() {
            var url = assignmentURL + '/validateSession';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = assignmentURL + '/logout';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            var url = assignmentURL + '/register';
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function verifyAdmin() {
            var url = assignmentURL + '/verifyAdmin';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers() {
            var url = assignmentURL + '/users';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();