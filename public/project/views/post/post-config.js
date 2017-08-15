/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .config(PostConfig);
    function PostConfig($routeProvider) {
        $routeProvider

            .when('/post/:postId', {
                templateUrl: 'views/post/templates/post.view.client.html',
                controller: 'PostViewController',
                controllerAs: 'PostViewCtrl',
                resolve: {
                    currentUser: validateSession
                }
            })
            .when('/post/user/:username', {
                templateUrl: 'views/post/templates/search-user-result.view.client.html',
                controller: 'UserPostController',
                controllerAs: 'UserPostCtrl',
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

