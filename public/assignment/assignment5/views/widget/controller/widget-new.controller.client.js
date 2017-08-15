/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", widgetNewController);
    function widgetNewController($location, widgetService, $routeParams, $anchorScroll, $mdDialog) {

        var widgetNewCtrl = this;
        widgetNewCtrl.userId = $routeParams.userId;
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
            var file = document.getElementById('upload').files[0];
            var form = new FormData();
            form.append('uploadFile', file);
            widgetService.uploadImage(form)
                .then(function (text) {
                    widgetNewCtrl.currentWidget.url = text;
                    widgetNewCtrl.message = "Image uploaded successfully";
                    document.getElementById('upload').value = null;
                    $anchorScroll('top');
                }, uploadError);

        }


        function createNewWidget() {
            widgetNewCtrl.message = null;
            widgetNewCtrl.error = null;
            if (widgetNewCtrl.currentWidget === null || typeof widgetNewCtrl.currentWidget === 'undefined' || widgetNewCtrl.currentWidget === '') {
                widgetNewCtrl.currentWidget = {
                    widgetType: widgetNewCtrl.widgetType
                };
            }
            widgetNewCtrl.currentWidget.widgetType = widgetNewCtrl.widgetType;
            if ((widgetNewCtrl.currentWidget.widgetType === 'HEADING' || widgetNewCtrl.currentWidget.widgetType === 'HTML') && (widgetNewCtrl.currentWidget.text === null || typeof widgetNewCtrl.currentWidget.text === 'undefined' || widgetNewCtrl.currentWidget.text === '')) {
                widgetNewCtrl.error = " Text is mandatory ";
                $anchorScroll('top');
                return;
            }
            else if ((widgetNewCtrl.currentWidget.widgetType === 'IMAGE' || widgetNewCtrl.currentWidget.widgetType === 'YOUTUBE') && (widgetNewCtrl.currentWidget.url === null || typeof widgetNewCtrl.currentWidget.url === 'undefined' || widgetNewCtrl.currentWidget.url === '')) {
                widgetNewCtrl.error = " Invalid URL format ";
                $anchorScroll('top');
                return;
            }
            if (widgetNewCtrl.currentWidget.widgetType === 'HEADING' && typeof widgetNewCtrl.currentWidget.size === 'undefined') {
                widgetNewCtrl.error = " Please enter a valid size ";
                $anchorScroll('top');
                return;
            }
            widgetService.createWidget(widgetNewCtrl.pageId, widgetNewCtrl.currentWidget)
                .then(function () {
                    $location.url('/user/' + widgetNewCtrl.userId + '/website/' + widgetNewCtrl.websiteId + '/page/' + widgetNewCtrl.pageId + '/widget');
                }, widgetError);

        }

        function deleteWidget() {
            widgetNewCtrl.message = null;
            widgetNewCtrl.error = null;
            $location.url('/user/' + widgetNewCtrl.userId + '/website/' + widgetNewCtrl.websiteId + '/page/' + widgetNewCtrl.pageId + '/widget');
        }

        function widgetError() {
            widgetNewCtrl.error = "Oops! Something went wrong. Please try again later";
            $anchorScroll('top');
        }

        function uploadError() {
            widgetNewCtrl.error = "File upload failed. Please try again later";
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
                    widgetNewCtrl.currentWidget.url = url;
                }, function () {

                });
        }

    }
})();