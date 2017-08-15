/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .controller("FooterController", footerController);
    function footerController(userService) {

        var footerCtrl = this;

        function init() {
            userService.validateSession()
                .then(function (user) {
                    footerCtrl.user = user;
                }, function () {
                    footerCtrl.user = null;
                });
        }

        init();
    }
})();