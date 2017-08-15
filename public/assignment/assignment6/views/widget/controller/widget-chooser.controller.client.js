/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooseController", widgetChooseController);
    function widgetChooseController($location, $routeParams, currentUser) {

        var widgetChooseCtrl = this;
        widgetChooseCtrl.userId = currentUser._id;
        widgetChooseCtrl.websiteId = $routeParams.websiteId;
        widgetChooseCtrl.pageId = $routeParams.pageId;
        widgetChooseCtrl.widgetTypeList = ['Header', 'Image', 'YouTube', 'HTML', 'Text'];
        widgetChooseCtrl.navigateNewWidget = navigateNewWidget;

        function navigateNewWidget(widgetType) {
            widgetType = widgetType.toUpperCase();
            if (widgetType === 'HEADER') {
                widgetType = 'HEADING';
            }
            $location.url('/website/' + widgetChooseCtrl.websiteId + '/page/' + widgetChooseCtrl.pageId + '/widget/' + widgetType + '/new');
        }
    }
})();