/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .config(UserConfig);
    function UserConfig($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'registerCtrl'
            })
			.when('/discover', {
                templateUrl: 'views/user/templates/discover.view.client.html',
                controller: 'DiscoverController',
                controllerAs: 'discoverCtrl'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'profileCtrl',
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
                    deferred.reject();
                    $location.url('/login');
                });
            return deferred.promise;
        }
    }
})();

