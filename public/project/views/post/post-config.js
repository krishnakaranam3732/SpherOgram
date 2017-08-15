/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .config(PostConfig);
    function PostConfig($routeProvider) {
        $routeProvider

            .when('/user/post/:postId', {
                templateUrl: 'views/post/templates/post.view.client.html',
                controller: 'PostViewController',
                controllerAs: 'PostViewCtrl',
                resolve: {
                    currentUser: validateSession
                }
            })
            .when('/feed/:userId', {
            templateUrl: 'views/post/templates/feed.view.client.html',
            controller: 'FeedViewController',
            controllerAs: 'FeedViewCtrl',
            resolve: {
                currentUser: validateSession
            }
            })
            .when('/user/discover/post', {
                templateUrl: 'views/post/templates/discover-post-add.view.client.html',
                controller: 'DiscoverPostAddController',
                controllerAs: 'DiscoverPostAddCtrl',
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

