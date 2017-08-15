/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", websiteListController);
    function websiteListController(websiteService, $anchorScroll, currentUser) {

        var websiteCtrl = this;
        websiteCtrl.userId = currentUser._id;

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