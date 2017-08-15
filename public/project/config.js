/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .config(HomeConfig);
    function HomeConfig($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/common/templates/home.view.client.html',
                controller: 'HomeController',
                controllerAs: 'homeCtrl',
                resolve: {
                    currentUser: validateSession
                }
            })
            .when('default', {
                templateUrl: 'views/common/templates/home.view.client.html',
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
                    $location.url('/');
                });
            return deferred.promise;
        }
    }
})();

