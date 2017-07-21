/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("FooterController", footerController);
    function footerController($routeParams) {

        var footerCtrl = this;

        footerCtrl.userId = $routeParams.userId;


    }
})();