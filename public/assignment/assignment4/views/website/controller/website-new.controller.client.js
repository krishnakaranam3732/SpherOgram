/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", websiteNewController);
    function websiteNewController($location, websiteService, $routeParams, $route, $anchorScroll) {

        var websiteNewCtrl = this;
        websiteNewCtrl.userId = $routeParams.userId;
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
                    $location.url('/user/' + websiteNewCtrl.userId + "/website");
                }, websiteError);
        }

    }
})();