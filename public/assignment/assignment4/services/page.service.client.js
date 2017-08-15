/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("pageService", pageService);
    function pageService($http) {

        this.createPage = createPage;
        this.findPageById = findPageById;
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        var websiteURL = '/api/assignment4/website';
        var pageURL = '/api/assignment4/page';

        function createPage(websiteId, page) {
            var url = websiteURL + '/' + websiteId + '/page';
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageById(pageId) {
            var url = pageURL + '/' + pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageByWebsiteId(websiteId) {
            var url = websiteURL + '/' + websiteId + '/page';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePage(pageId, page) {
            var url = pageURL + '/' + pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(pageId) {
            var url = pageURL + '/' + pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();