/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", widgetListController);
    function widgetListController($location, widgetService, $routeParams, $sce, $anchorScroll) {

        var widgetCtrl = this;
        widgetCtrl.userId = $routeParams.userId;
        widgetCtrl.websiteId = $routeParams.websiteId;
        widgetCtrl.pageId = $routeParams.pageId;
        widgetCtrl.trustHtml = trustHtml;
        widgetCtrl.embedYouTube = embedYouTube;
        widgetCtrl.trustImage = trustImage;

        function init() {
            widgetService.findWidgetByPageId(widgetCtrl.pageId)
                .then(displayWidgets, widgetError);
        }

        init();

        function displayWidgets(widgets) {
            widgetCtrl.widgets = widgets;
        }

        function widgetError() {
            widgetCtrl.error = "Oops! Something went wrong. Please try again later";
            $anchorScroll('top');
        }

        function trustHtml(text) {
            return $sce.trustAsHtml(text);
        }

        function trustImage(url) {
            return $sce.trustAsUrl(url);
        }

        function embedYouTube(url) {
            var embedURL = "https://www.youtube.com/embed/";
            var linkSplit = url.split('/');
            embedURL += linkSplit[linkSplit.length - 1];
            return $sce.trustAsResourceUrl(embedURL);
        }

    }
})();