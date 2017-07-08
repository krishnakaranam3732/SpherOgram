/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("websiteService", websiteService);
    function websiteService($http) {

        this.createWebsite = createWebsite;
        this.findWebsiteById = findWebsiteById;
        this.findWebsiteByUser = findWebsiteByUser;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        var userURL = '/api/assignment4/user';
        var websiteURL = '/api/assignment4/website';


        function createWebsite(userId, website) {
            var url = userURL + '/' + userId + '/website';
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWebsiteById(websiteId) {
            var url = websiteURL + '/' + websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWebsiteByUser(userId) {
            var url = userURL + '/' + userId + '/website';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWebsite(websiteId, website) {
            var url = websiteURL + '/' + websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(websiteId) {
            var url = websiteURL + '/' + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();