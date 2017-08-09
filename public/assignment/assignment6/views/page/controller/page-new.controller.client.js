/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", pageNewController);
    function pageNewController($location, pageService, $routeParams, $route, $anchorScroll, currentUser) {

        var pageNewCtrl = this;
        pageNewCtrl.userId = currentUser._id;
        pageNewCtrl.websiteId = $routeParams.websiteId;
        pageNewCtrl.reloadPage = reloadPage;
        pageNewCtrl.createPage = createPage;

        function init() {
            pageService.findPageByWebsiteId(pageNewCtrl.websiteId)
                .then(displayPage, pageError);
        }

        init();

        function displayPage(pages) {
            pageNewCtrl.pages = pages;
        }

        function pageError() {
            pageNewCtrl.error = "Oops! Something went wrong. Please try again later";
            $anchorScroll('top');
        }

        function reloadPage() {
            $route.reload();
        }

        function createPage() {
            pageService.createPage(pageNewCtrl.websiteId, pageNewCtrl.newPage)
                .then(function () {
                    $location.url('/website/' + pageNewCtrl.websiteId + '/page');
                }, pageError);
        }

    }
})();