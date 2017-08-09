/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", websiteNewController);
    function websiteNewController($location, websiteService, $route, $anchorScroll, currentUser) {

        var websiteNewCtrl = this;
        websiteNewCtrl.userId = currentUser._id;
        websiteNewCtrl.reloadPage = reloadPage;
        websiteNewCtrl.createWebsite = createWebsite;

        function init() {
            websiteService.findWebsiteByUser(websiteNewCtrl.userId)
                .then(displayWebsites, websiteError);
        }

        init();

        function displayWebsites(websites) {
            websiteNewCtrl.websites = websites;
        }

        function websiteError() {
            websiteNewCtrl.error = "Oops! Something went wrong. Please try again later";
            $anchorScroll('top');
        }

        function reloadPage() {
            $route.reload();
        }

        function createWebsite() {
            websiteService.createWebsite(websiteNewCtrl.userId, websiteNewCtrl.newWebsite)
                .then(function () {
                    $location.url("/website");
                }, websiteError);
        }

    }
})();