/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .config(SearchConfig);
    function SearchConfig($routeProvider) {
        $routeProvider

            .when('/search', {
                templateUrl: 'views/search/templates/search-user.view.client.html',
                controller: 'UserSearchController',
                controllerAs: 'UserSearchCtrl',
                resolve: {
                    currentUser: validateSession
                }
            })
            .when('/user/:userId', {
                templateUrl: 'views/search/templates/search-user-result.view.client.html',
                controller: 'UserViewController',
                controllerAs: 'UserViewCtrl',
                resolve: {
                    currentUser: validateSession
                }
            });

        function validateSession(userService, $q, $location) {
            var deferred = $q.defer();
            userService.validateSession()
                .then(function (user) {
                    deferred.resolve(user);
                    currentUser = user;
                }, function () {
                    deferred.reject();
                    $location.url('/login');
                });
            return deferred.promise;
        }
    }
})();

