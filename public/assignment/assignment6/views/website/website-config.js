/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .config(WebAppConfig);
    function WebAppConfig($routeProvider) {
        $routeProvider
            .when('/website', {
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: 'WebsiteListController',
                controllerAs: 'websiteCtrl',
                resolve: {
                    currentUser: validateSession
                }
            })
            .when('/website/new', {
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'WebsiteNewController',
                controllerAs: 'websiteNewCtrl',
                resolve: {
                    currentUser: validateSession
                }
            })
            .when('/website/:websiteId', {
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'WebsiteEditController',
                controllerAs: 'websiteEditCtrl',
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

