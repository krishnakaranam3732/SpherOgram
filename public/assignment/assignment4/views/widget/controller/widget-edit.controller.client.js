/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", widgetEditController);
    function widgetEditController($location, widgetService, $routeParams, $anchorScroll, $mdDialog) {

        var widgetEditCtrl = this;
        widgetEditCtrl.userId = $routeParams.userId;
        widgetEditCtrl.websiteId = $routeParams.websiteId;
        widgetEditCtrl.pageId = $routeParams.pageId;
        widgetEditCtrl.widgetId = $routeParams.widgetId;
        widgetEditCtrl.deleteWidget = deleteWidget;
        widgetEditCtrl.updateWidget = updateWidget;
        widgetEditCtrl.uploadImage = uploadImage;
        widgetEditCtrl.showFlickrSearch = showFlickrSearch;

        function init() {
            widgetService.findWidgetById(widgetEditCtrl.widgetId)
                .then(displayWidget, widgetError);
        }

        init();

        function uploadImage() {
            widgetEditCtrl.message = null;
            widgetEditCtrl.error = null;
            var file = document.getElementById('upload').files[0];
            var form = new FormData();
            form.append('uploadFile', file);
            widgetService.uploadImage(form)
                .then(function (text) {
                    widgetEditCtrl.currentWidget.url = text;
                    widgetEditCtrl.message = "Image uploaded successfully";
                    document.getElementById('upload').value = null;
                    $anchorScroll('top');
                }, uploadError);

        }

        function displayWidget(widget) {
            widgetEditCtrl.currentWidget = widget;
        }

        function widgetError() {
            widgetEditCtrl.error = "Oops! Something went wrong. Please try again later";
            $anchorScroll('top');
        }

        function deleteWidget() {
            widgetEditCtrl.message = null;
            widgetEditCtrl.error = null;
            widgetService.deleteWidget(widgetEditCtrl.widgetId)
                .then(function () {
                    $location.url('/user/' + widgetEditCtrl.userId + '/website/' + widgetEditCtrl.websiteId + '/page/' + widgetEditCtrl.pageId + '/widget');
                }, widgetError);
        }

        function updateWidget() {
            widgetEditCtrl.message = null;
            widgetEditCtrl.error = null;
            if ((widgetEditCtrl.currentWidget.widgetType === 'HEADING' || widgetEditCtrl.currentWidget.widgetType === 'HTML') && (widgetEditCtrl.currentWidget.text === null || typeof widgetEditCtrl.currentWidget.text === 'undefined' || widgetEditCtrl.currentWidget.text === '')) {
                widgetEditCtrl.error = " Text is mandatory ";
                $anchorScroll('top');
                return;
            }
            else if ((widgetEditCtrl.currentWidget.widgetType === 'IMAGE' || widgetEditCtrl.currentWidget.widgetType === 'YOUTUBE') && (widgetEditCtrl.currentWidget.url === null || typeof widgetEditCtrl.currentWidget.url === 'undefined' || widgetEditCtrl.currentWidget.url === '')) {
                widgetEditCtrl.error = " Invalid URL format ";
                $anchorScroll('top');
                return;
            }
            if (widgetEditCtrl.currentWidget.widgetType === 'HEADING' && typeof widgetEditCtrl.currentWidget.size === 'undefined') {
                widgetEditCtrl.error = " Please enter a valid size ";
                $anchorScroll('top');
                return;
            }
            widgetService.updateWidget(widgetEditCtrl.widgetId, widgetEditCtrl.currentWidget)
                .then(function () {
                    $location.url('/user/' + widgetEditCtrl.userId + '/website/' + widgetEditCtrl.websiteId + '/page/' + widgetEditCtrl.pageId + '/widget');
                }, widgetError);
        }

        function uploadError() {
            widgetEditCtrl.error = "File upload failed. Please try again later";
            $anchorScroll('top');
        }

        function showFlickrSearch(ev) {
            $mdDialog.show({
                controller: 'FlickrSearchController',
                controllerAs: 'DialogCtrl',
                templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
            })
                .then(function(url) {
                    widgetEditCtrl.currentWidget.url = url;
                }, function () {
                    
                });
        }


    }
})();