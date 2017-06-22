/**
 * Created by krish on 6/21/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController(PageService, $routeParams, $location) {
        var vm = this;
        vm.update = update;
        vm.deletePage = deletePage;

        function init() {
            vm.userId = $routeParams.uid;
            vm.pages = PageService.findPageByWebsiteId($routeParams.wid);
            vm.page = PageService.findPageById($routeParams.pid);
        }
        init();

        function update(newPage) {
            var page = PageService.updatePage(newPage._id, newPage);
            if(page) {
                navigateToPages();
            } else {
                vm.error = "New page creation failed!";
            }
        }

        function deletePage() {
            PageService.deletePage(vm.page._id);
            navigateToPages();
        }

        function navigateToPages() {
            var index = $location.path().lastIndexOf("/");
            $location.url($location.path().substring(0, index));
        }
    }
})();