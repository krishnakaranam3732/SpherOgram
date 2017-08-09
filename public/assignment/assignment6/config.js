/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .config(WebAppConfig);
    function WebAppConfig($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/common/home.view.client.html',
                controller: 'HomeController',
                controllerAs: 'homeCtrl',
                resolve: {
                    currentUser: validateSession
                }
            })
            .when('default', {
                templateUrl: 'views/common/home.view.client.html',
                controller: 'HomeController',
                controllerAs: 'homeCtrl',
                resolve: {
                    currentUser: validateSession
                }
            });

        function validateSession(userService, $q, $location) {
            var deferred = $q.defer();
            userService.validateSession()
                .then(function (user) {
                    deferred.resolve(user);
                }, function () {
                    deferred.resolve(null);
                });
            return deferred.promise;
        }
    }
})();

