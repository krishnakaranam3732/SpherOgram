/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooseController", widgetChooseController);
    function widgetChooseController($location, $routeParams) {

        var widgetChooseCtrl = this;
        widgetChooseCtrl.userId = $routeParams.userId;
        widgetChooseCtrl.websiteId = $routeParams.websiteId;
        widgetChooseCtrl.pageId = $routeParams.pageId;
        widgetChooseCtrl.widgetTypeList = ['Header', 'Image', 'YouTube', 'HTML'];
        widgetChooseCtrl.navigateNewWidget = navigateNewWidget;

        function navigateNewWidget(widgetType) {
            widgetType = widgetType.toUpperCase();
            if (widgetType === 'HEADER') {
                widgetType = 'HEADING';
            }
            $location.url('/user/' + widgetChooseCtrl.userId + '/website/' + widgetChooseCtrl.websiteId + '/page/' + widgetChooseCtrl.pageId + '/widget/' + widgetType + '/new');
        }


    }
})();