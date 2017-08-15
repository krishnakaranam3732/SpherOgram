/**
 * Created by krish on 7/20/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("AdminController", AdminController);

    function AdminController(currentUser, userService, $anchorScroll, $route) {
        var adminCtrl = this;
        adminCtrl.admin = currentUser;
        adminCtrl.updateProfile = updateProfile;
        adminCtrl.createProfile = createProfile;
        adminCtrl.reset = reset;

        function init() {
            userService.findAllUsers().then(function (users) {
                adminCtrl.users = users;
            });
            adminCtrl.tab = 0;
        }

        init();

        function updateProfile(user) {
            adminCtrl.message = null;
            adminCtrl.error = null;
            var admin = document.getElementById(user._id + '_ADMIN').checked;
            var user_role = document.getElementById(user._id + '_USER').checked;
            var roles = [];
            if (admin) {
                roles.push('ADMIN');
            }
            if (user_role) {
                roles.push('USER');
            }
            if (roles.length === 0) {
                adminCtrl.error = " One role is required ";
            }
            else {
                user.roles = roles;
                userService.updateUser(user._id, user)
                    .then(function () {
                        adminCtrl.message = 'User updated successfully';
                        userService.findAllUsers().then(function (users) {
                            adminCtrl.users = users;
                            $anchorScroll('message');
                            if (adminCtrl.admin._id === user._id) {
                                setTimeout(
                                    function () {
                                        $route.reload();
                                    }, 1000);
                            }
                        }, function () {
                            $route.reload();
                        })
                    }, function () {
                        adminCtrl.error = " Something went wrong. Please try later";
                        $anchorScroll('error');
                    });
            }

        }

        function createProfile() {
            adminCtrl.userError = null;
            if (adminCtrl.user.password !== adminCtrl.verifyPassword) {
                adminCtrl.userError = " Password does not match ";
                var element = document.getElementById('inputPassword');
                element.focus();
                $anchorScroll('top');
            }
            else {
                userService.findUserByUsername(adminCtrl.user.username)
                    .then(function () {
                        adminCtrl.userError = " Username already exists";
                        $anchorScroll('top');
                    }, function () {
                        return userService.createUser(adminCtrl.user);
                    })
                    .then(function (status) {
                        if (status) {
                            adminCtrl.message = 'User created successfully';
                            userService.findAllUsers().then(function (users) {
                                adminCtrl.users = users;
                                adminCtrl.tab = 0;
                                $anchorScroll('message');
                            });
                        }
                    }, function () {
                        adminCtrl.userError = "Oops! Something went wrong. Please try again later";
                        $anchorScroll('top');
                    });
            }
        }

        function reset() {
            adminCtrl.userError = null;
            adminCtrl.message = null;
            adminCtrl.error = null;
            adminCtrl.user = null;
        }
    }
})();