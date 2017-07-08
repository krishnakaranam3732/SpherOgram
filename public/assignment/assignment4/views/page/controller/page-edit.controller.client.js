/**
 * Created by shravass on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", pageEditController);
    function pageEditController($location, pageService, $routeParams, $route, $anchorScroll) {

        var pageEditCtrl = this;
        pageEditCtrl.userId = $routeParams.userId;
        pageEditCtrl.websiteId = $routeParams.websiteId;
        pageEditCtrl.pageId = $routeParams.pageId;
        pageEditCtrl.updatePage = updatePage;
        pageEditCtrl.reloadPage = reloadPage;
        pageEditCtrl.deletePage = deletePage;

        function init() {
            pageService.findPageByWebsiteId(pageEditCtrl.websiteId)
                .then(displayPages, pageError);
            pageService.findPageById(pageEditCtrl.pageId)
                .then(displayPage, pageError);
        }

        init();

        function displayPages(pages) {
            pageEditCtrl.pages = pages;
        }

        function displayPage(page) {
            pageEditCtrl.currentPage = page;
        }

        function pageError() {
            pageEditCtrl.error = "Oops! Something went wrong. Please try again later";
            $anchorScroll('top');
        }

        function reloadPage() {
            $route.reload();
        }

        function updatePage() {
            pageService.updatePage(pageEditCtrl.pageId, pageEditCtrl.currentPage)
                .then(function () {
                    $location.url('/user/' + pageEditCtrl.userId + '/website/' + pageEditCtrl.websiteId + '/page');

                }, pageError);
        }

        function deletePage() {
            pageService.deletePage(pageEditCtrl.pageId)
                .then(function () {
                    $location.url('/user/' + pageEditCtrl.userId + '/website/' + pageEditCtrl.websiteId + '/page');
                }, pageError);
        }

    }
})();