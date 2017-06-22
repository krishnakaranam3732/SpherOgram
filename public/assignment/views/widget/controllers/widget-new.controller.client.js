/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController(WidgetService, $routeParams, $location) {
        var model = this;
        model.create = create;

        function init() {
            model.userId = $routeParams.uid;
            model.websiteId = $routeParams.wid;
            model.pageId = $routeParams.pid;
            model.newWidgetHeader = {_id: "", widgetType: "HEADING", pageId: model.pageId, size: 2, text: "New Header Text"};
            model.newWidgetImage = {
                _id: "",
                widgetType: "IMAGE",
                pageId: model.pageId,
                width: "100%",
                url: "http://lorempixel.com/400/200/"
            };
            model.newWidgetYouTube = {
                _id: "",
                widgetType: "YOUTUBE",
                pageId: model.pageId,
                width: "100%",
                url: "https://youtu.be/74Cm1p3fr0g"
            };
            model.newWidgetHTML = {_id: "", widgetType: "HTML", pageId: model.pageId, text: "<p>Lorem ipsum</p>"};
        }
        init();

        function create(newWidget) {
            var widget = WidgetService.createWidget(model.pageId, newWidget);
            if(widget._id != "") {
                var index = $location.path().lastIndexOf("/");
                var navTo = $location.path().substring(0, index) + "/" + widget._id;
                $location.url(navTo);
            } else {
                model.error = "New widget creation failed!";
            }
        }
    }
})();