/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .config(WebAppConfig);
    function WebAppConfig($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/common/home.view.client.html'
            })
            .when('default', {
                templateUrl: 'views/common/home.view.client.html'
            })
    }
})();

