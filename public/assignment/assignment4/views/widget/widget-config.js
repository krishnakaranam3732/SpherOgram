/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .config(WebAppConfig);
    function WebAppConfig($routeProvider) {
        $routeProvider
            .when('/user/:userId/website/:websiteId/page/:pageId/widget', {
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'WidgetListController',
                controllerAs: 'widgetCtrl'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/new', {
                templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
                controller: 'WidgetChooseController',
                controllerAs: 'widgetChooseCtrl'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetType/new', {
                templateUrl: 'views/widget/templates/widget-new.view.client.html',
                controller: 'WidgetNewController',
                controllerAs: 'widgetEditCtrl'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId', {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'WidgetEditController',
                controllerAs: 'widgetEditCtrl'
            })
    }
})();

