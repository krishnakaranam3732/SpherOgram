/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .config(WebAppConfig);
    function WebAppConfig($routeProvider) {
        $routeProvider
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                controller: 'AdminController',
                controllerAs: 'adminCtrl',
                resolve: {
                    currentUser: verifyAdmin
                }
            });

        function verifyAdmin(userService, $q, $location) {
            var deferred = $q.defer();
            userService.verifyAdmin()
                .then(function (user) {
                    deferred.resolve(user);
                }, function () {
                    deferred.reject();
                    $location.url('/');
                });
            return deferred.promise;
        }
    }
})();

