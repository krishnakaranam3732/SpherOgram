/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", websiteEditController);
    function websiteEditController($location, websiteService, $routeParams, $route, $anchorScroll) {

        var websiteEditCtrl = this;
        websiteEditCtrl.userId = $routeParams.userId;
        websiteEditCtrl.websiteId = $routeParams.websiteId;
        websiteEditCtrl.updateWebsite = updateWebsite;
        websiteEditCtrl.reloadPage = reloadPage;
        websiteEditCtrl.deleteWebsite = deleteWebsite;

        function init() {
            websiteService.findWebsiteByUser(websiteEditCtrl.userId)
                .then(displayWebsites, websiteError);
            websiteService.findWebsiteById(websiteEditCtrl.websiteId)
                .then(displayWebsite, websiteError);
        }

        init();

        function displayWebsites(websites) {
            websiteEditCtrl.websites = websites;
        }

        function displayWebsite(website) {
            websiteEditCtrl.currentWebsite = website;
        }

        function websiteError() {
            websiteEditCtrl.error = "Oops! Something went wrong. Please try again later";
            $anchorScroll('top');
        }

        function reloadPage() {
            $route.reload();
        }

        function updateWebsite() {
            websiteService.updateWebsite(websiteEditCtrl.websiteId, websiteEditCtrl.currentWebsite)
                .then(function () {
                    $location.url('/user/' + websiteEditCtrl.userId + "/website");
                }, websiteError);

        }

        function deleteWebsite() {
            websiteService.deleteWebsite(websiteEditCtrl.websiteId)
                .then(function () {
                    $location.url('/user/' + websiteEditCtrl.userId + "/website");
                }, websiteError);
        }

    }
})();