/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("widgetService", widgetService);
    function widgetService($http) {

        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.findWidgetByPageId = findWidgetByPageId;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.uploadImage = uploadImage;

        var pageURL = '/api/assignment4/page';
        var widgetURL = '/api/assignment4/widget';

        function createWidget(pageId, widget) {
            var url = pageURL + '/' + pageId + '/widget';
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(widgetId) {
            var url = widgetURL + '/' + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetByPageId(pageId) {
            var url = pageURL + '/' + pageId + '/widget';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget(widgetId, widget) {
            var url = widgetURL + '/' + widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWidget(widgetId) {
            var url = widgetURL + '/' + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function uploadImage(form) {
            var url = '/api/assignment4/upload';
            return $http.post(url, form, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();