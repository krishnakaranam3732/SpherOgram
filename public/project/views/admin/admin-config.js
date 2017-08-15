/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .config(AdminConfig);
    function AdminConfig($routeProvider) {
        $routeProvider
            .when('/userSettings', {
                templateUrl: 'views/admin/templates/admin-user-setting.view.client.html',
                controller: 'AdminUserSettingController',
                controllerAs: 'AdminUserSettingCtrl',
                resolve: {
                    currentUser: validateSession
                }
            })
            .when('/edituserSettings', {
                templateUrl: 'views/admin/templates/admin-edit-user-setting.view.client.html',
                controller: 'AdminUserSettingController',
                controllerAs: 'AdminUserSettingCtrl',
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

