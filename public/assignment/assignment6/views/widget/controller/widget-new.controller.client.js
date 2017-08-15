/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", widgetNewController);
    function widgetNewController($location, widgetService, $routeParams, $anchorScroll, $mdDialog, currentUser) {

        var widgetNewCtrl = this;
        widgetNewCtrl.userId = currentUser._id;
        widgetNewCtrl.websiteId = $routeParams.websiteId;
        widgetNewCtrl.pageId = $routeParams.pageId;
        widgetNewCtrl.widgetType = $routeParams.widgetType;
        widgetNewCtrl.createNewWidget = createNewWidget;
        widgetNewCtrl.deleteWidget = deleteWidget;
        widgetNewCtrl.uploadImage = uploadImage;
        widgetNewCtrl.showFlickrSearch = showFlickrSearch;

        function uploadImage() {
            widgetNewCtrl.message = null;
            widgetNewCtrl.error = null;
            var $loadButton = $('#uploadButton');
            $loadButton.button('loading');
            var file = document.getElementById('upload').files[0];
            var form = new FormData();
            form.append('uploadFile', file);
            widgetService.uploadImage(form)
                .then(function (text) {
                    $loadButton.button('reset');
                    widgetNewCtrl.currentWidget.url = text;
                    widgetNewCtrl.message = "Image uploaded successfully";
                    document.getElementById('upload').value = null;
                    $anchorScroll('top');
                }, function (err) {
                    $loadButton.button('reset');
                    widgetNewCtrl.error = "File upload failed. Please try again later";
                    $anchorScroll('top');
                });
        }

        function createNewWidget() {
            widgetNewCtrl.message = null;
            widgetNewCtrl.error = null;
            if (widgetNewCtrl.currentWidget === null || typeof widgetNewCtrl.currentWidget === 'undefined' || widgetNewCtrl.currentWidget === '') {
                widgetNewCtrl.currentWidget = {
                    type: widgetNewCtrl.widgetType
                };
            }
            widgetNewCtrl.currentWidget.type = widgetNewCtrl.widgetType;
            if (widgetNewCtrl.currentWidget.name === null || typeof widgetNewCtrl.currentWidget.name === 'undefined' || widgetNewCtrl.currentWidget.name === '') {
                widgetNewCtrl.error = " Name is mandatory ";
                var element = document.getElementById('name');
                element.focus();
                $anchorScroll('top');
                return;
            }
            if ((widgetNewCtrl.currentWidget.type === 'HEADING' || widgetNewCtrl.currentWidget.type === 'HTML' || widgetNewCtrl.currentWidget.type === 'TEXT') && (widgetNewCtrl.currentWidget.text === null || typeof widgetNewCtrl.currentWidget.text === 'undefined' || widgetNewCtrl.currentWidget.text === '')) {
                widgetNewCtrl.error = " Text is mandatory ";
                var element = document.getElementById('text');
                element.focus();
                $anchorScroll('top');
                return;
            }
            else if ((widgetNewCtrl.currentWidget.type === 'IMAGE' || widgetNewCtrl.currentWidget.type === 'YOUTUBE') && (widgetNewCtrl.currentWidget.url === null || typeof widgetNewCtrl.currentWidget.url === 'undefined' || widgetNewCtrl.currentWidget.url === '')) {
                widgetNewCtrl.error = " Invalid URL format ";
                var element = document.getElementById('url');
                element.focus();
                $anchorScroll('top');
                return;
            }
            if (widgetNewCtrl.currentWidget.type === 'HEADING' && typeof widgetNewCtrl.currentWidget.size === 'undefined') {
                widgetNewCtrl.error = " Please enter a valid size ";
                var element = document.getElementById('size');
                element.focus();
                $anchorScroll('top');
                return;
            }
            widgetService.createWidget(widgetNewCtrl.pageId, widgetNewCtrl.currentWidget)
                .then(function () {
                    $location.url('/website/' + widgetNewCtrl.websiteId + '/page/' + widgetNewCtrl.pageId + '/widget');
                }, widgetError);
        }

        function deleteWidget() {
            widgetNewCtrl.message = null;
            widgetNewCtrl.error = null;
            $location.url('/website/' + widgetNewCtrl.websiteId + '/page/' + widgetNewCtrl.pageId + '/widget');
        }

        function widgetError() {
            widgetNewCtrl.error = "Oops! Something went wrong. Please try again later";
            $anchorScroll('top');
        }

        function showFlickrSearch(ev) {
            $mdDialog.show({
                controller: 'FlickrSearchController',
                controllerAs: 'DialogCtrl',
                templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
                .then(function (url) {
                    widgetNewCtrl.currentWidget.url = url;
                }, function () {

                });
        }
    }
})();