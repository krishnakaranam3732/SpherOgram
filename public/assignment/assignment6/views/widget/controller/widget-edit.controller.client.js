/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", widgetEditController);
    function widgetEditController($location, widgetService, $routeParams, $anchorScroll, $mdDialog, currentUser) {

        var widgetEditCtrl = this;
        widgetEditCtrl.userId = currentUser._id;
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
            var $loadButton = $('#uploadButton');
            $loadButton.button('loading');
            var file = document.getElementById('upload').files[0];
            var form = new FormData();
            form.append('uploadFile', file);
            widgetService.uploadImage(form)
                .then(function (text) {
                    $loadButton.button('reset');
                    widgetEditCtrl.currentWidget.url = text;
                    widgetEditCtrl.message = "Image uploaded successfully";
                    document.getElementById('upload').value = null;
                    $anchorScroll('top');
                }, function (err) {
                    $loadButton.button('reset');
                    widgetEditCtrl.error = "File upload failed. Please try again later";
                    $anchorScroll('top');
                });
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
                    $location.url('/website/' + widgetEditCtrl.websiteId + '/page/' + widgetEditCtrl.pageId + '/widget');
                }, widgetError);
        }

        function updateWidget() {
            widgetEditCtrl.message = null;
            widgetEditCtrl.error = null;
            if (widgetEditCtrl.currentWidget.name === null || typeof widgetEditCtrl.currentWidget.name === 'undefined' || widgetEditCtrl.currentWidget.name === '') {
                widgetEditCtrl.error = " Name is mandatory ";
                var element = document.getElementById('name');
                element.focus();
                $anchorScroll('top');
                return;
            }
            if ((widgetEditCtrl.currentWidget.type === 'HEADING' || widgetEditCtrl.currentWidget.type === 'HTML' || widgetEditCtrl.currentWidget.type === 'TEXT') && (widgetEditCtrl.currentWidget.text === null || typeof widgetEditCtrl.currentWidget.text === 'undefined' || widgetEditCtrl.currentWidget.text === '')) {
                widgetEditCtrl.error = " Text is mandatory ";
                var element = document.getElementById('text');
                element.focus();
                $anchorScroll('top');
                return;
            }
            else if ((widgetEditCtrl.currentWidget.type === 'IMAGE' || widgetEditCtrl.currentWidget.type === 'YOUTUBE') && (widgetEditCtrl.currentWidget.url === null || typeof widgetEditCtrl.currentWidget.url === 'undefined' || widgetEditCtrl.currentWidget.url === '')) {
                widgetEditCtrl.error = " Invalid URL format ";
                var element = document.getElementById('url');
                element.focus();
                $anchorScroll('top');
                return;
            }
            if (widgetEditCtrl.currentWidget.type === 'HEADING' && typeof widgetEditCtrl.currentWidget.size === 'undefined') {
                widgetEditCtrl.error = " Please enter a valid size ";
                var element = document.getElementById('size');
                element.focus();
                $anchorScroll('top');
                return;
            }
            if (widgetEditCtrl.currentWidget.type === 'TEXT' && !widgetEditCtrl.currentWidget.formatted) {
                /** If formatting is removed, all the related html content is removed. Needs <p> if there is no html in original text */
                widgetEditCtrl.currentWidget.text = $('<p>' + widgetEditCtrl.currentWidget.text + '</p>').text();
            }
            widgetService.updateWidget(widgetEditCtrl.widgetId, widgetEditCtrl.currentWidget)
                .then(function () {
                    $location.url('/website/' + widgetEditCtrl.websiteId + '/page/' + widgetEditCtrl.pageId + '/widget');
                }, widgetError);
        }

        function showFlickrSearch(ev) {
            $mdDialog.show({
                controller: 'FlickrSearchController',
                controllerAs: 'DialogCtrl',
                templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
            })
                .then(function (url) {
                    widgetEditCtrl.currentWidget.url = url;
                }, function () {

                });
        }
    }
})();