/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .config(WebAppConfig);
    function WebAppConfig($routeProvider) {
        $routeProvider
            .when('/website/:websiteId/page/:pageId/widget', {
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'WidgetListController',
                controllerAs: 'widgetCtrl',
                resolve: {
                    currentUser: validateSession
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/new', {
                templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
                controller: 'WidgetChooseController',
                controllerAs: 'widgetChooseCtrl',
                resolve: {
                    currentUser: validateSession
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/:widgetType/new', {
                templateUrl: 'views/widget/templates/widget-new.view.client.html',
                controller: 'WidgetNewController',
                controllerAs: 'widgetEditCtrl',
                resolve: {
                    currentUser: validateSession
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/:widgetId', {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'WidgetEditController',
                controllerAs: 'widgetEditCtrl',
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

