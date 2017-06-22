/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController(WidgetService, $routeParams, $location) {
        var model = this;
        model.update = update;
        model.deleteWidget = deleteWidget;

        function init() {
            model.userId = $routeParams.uid;
            model.websiteId = $routeParams.wid;
            model.pageId = $routeParams.pid;
            model.getOptions = WidgetService.getOptions();
            model.widget = WidgetService.findWidgetById($routeParams.wgid);
        }

        init();

        function update() {
            var widget = WidgetService.updateWidget(model.widget._id, model.widget);
            if (widget) {
                navigateToWidgets();
            } else {
                model.error = "Widget updation failed!";
            }
        }

        function deleteWidget() {
            WidgetService.deleteWidget(model.widget._id);
            navigateToWidgets();
        }

        function navigateToWidgets() {
            var index = $location.path().lastIndexOf("/");
            $location.url($location.path().substring(0, index));
        }
    }
})();