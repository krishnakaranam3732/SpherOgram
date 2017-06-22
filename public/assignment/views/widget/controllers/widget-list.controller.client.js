/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController(WidgetService, $routeParams, $sce) {
        var model = this;
        model.checkSafeURL = checkSafeURL;
        model.getSafeHTML = getSafeHTML;

        function init() {
            model.userId = $routeParams.uid;
            model.websiteId = $routeParams.wid;
            model.pageId = $routeParams.pid;
            model.widgets = WidgetService.findWidgetsByPageId(model.pageId);
        }
        init();

        function checkSafeURL(widgetUrl) {
            var parts = widgetUrl.split('/');
            var id = parts[parts.length-1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function getSafeHTML(text) {
            return $sce.trustAsHtml(text);
        }
    }
})();