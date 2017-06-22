/**
 * Created by krish on 6/21/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController(WebsiteService, $routeParams, $location) {
        var vm = this;
        vm.update = update;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById($routeParams.wid);
        }
        init();

        function update(newWebsite) {
            var website = WebsiteService.updateWebsite(newWebsite._id, newWebsite);
            if(website) {
                navigateToWebsites();
            } else {
                vm.error = "website update failed!"
            }
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.website._id);
            navigateToWebsites();
        }

        function navigateToWebsites() {
            var index = $location.path().lastIndexOf("/");
            $location.url($location.path().substring(0, index));
        }
    }
})();