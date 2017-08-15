/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", pageListController);
    function pageListController(pageService, $routeParams, $anchorScroll) {

        var pageCtrl = this;
        pageCtrl.userId = $routeParams.userId;
        pageCtrl.websiteId = $routeParams.websiteId;

        function init() {
            pageService.findPageByWebsiteId(pageCtrl.websiteId)
                .then(displayPage, pageError);
        }

        init();

        function displayPage(pages) {
            pageCtrl.pages = pages;
        }

        function pageError() {
            pageCtrl.error = "Oops! Something went wrong. Please try again later";
            $anchorScroll('top');
        }


    }
})();