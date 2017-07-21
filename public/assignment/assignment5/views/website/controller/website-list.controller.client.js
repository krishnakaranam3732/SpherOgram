/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", websiteListController);
    function websiteListController(websiteService, $routeParams, $anchorScroll) {

        var websiteCtrl = this;
        websiteCtrl.userId = $routeParams.userId;

        function init() {
            websiteService.findWebsiteByUser(websiteCtrl.userId)
                .then(displayWebsite, websiteError);
        }

        init();

        function displayWebsite(websiteList) {
            websiteCtrl.websites = websiteList;
        }

        function websiteError() {
            websiteCtrl.error = "Oops! Something went wrong. Please try again later";
            $anchorScroll('top');
        }

    }
})();