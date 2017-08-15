/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .config(WebAppConfig);
    function WebAppConfig($routeProvider) {
        $routeProvider
            .when('/website/:websiteId/page', {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: 'PageListController',
                controllerAs: 'pageCtrl',
                resolve: {
                    currentUser: validateSession
                }
            })
            .when('/website/:websiteId/page/new', {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: 'PageNewController',
                controllerAs: 'pageNewCtrl',
                resolve: {
                    currentUser: validateSession
                }
            })
            .when('/website/:websiteId/page/:pageId', {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'PageEditController',
                controllerAs: 'pageEditCtrl',
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

