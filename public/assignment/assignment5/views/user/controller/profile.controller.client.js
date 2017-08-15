/**
 * Created by krish on 6/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);
    function profileController($location, userService, $routeParams, $anchorScroll, $route) {

        var profileCtrl = this;

        profileCtrl.updateProfile = updateProfile;
        profileCtrl.userId = $routeParams.userId;
        profileCtrl.reloadPage = reloadPage;
        profileCtrl.deleteUser = deleteUser;

        function init() {
            userService.findUserById(profileCtrl.userId)
                .then(displayUser, profileError);
        }

        init();

        function updateProfile() {
            profileCtrl.error = null;
            profileCtrl.message = null;
            if (profileCtrl.password !== profileCtrl.verifyPassword) {
                profileCtrl.error = " Password does not match ";
                $anchorScroll('top');
                return;
            }
            if (profileCtrl.password !== null && (typeof profileCtrl.password !== 'undefined') && profileCtrl.password !== '') {
                profileCtrl.currentUser.password = profileCtrl.password;
            }
            userService.updateUser(profileCtrl.userId, profileCtrl.currentUser)
                .then(function () {
                    profileCtrl.message = ' Profile has been updated successfully';
                    $anchorScroll('top');
                }, profileError);

        }


        function deleteUser() {
            profileCtrl.error = null;
            profileCtrl.message = null;
            userService.deleteUser(profileCtrl.userId).then(
                function () {
                    $location.url('/');
                }, profileError);
        }

        function reloadPage() {
            $route.reload();
        }

        function displayUser(user) {
            profileCtrl.currentUser = user;
        }

        function profileError() {
            profileCtrl.error = "Oops! Something went wrong. Please try again later";
            $anchorScroll('top');
        }

    }
})();