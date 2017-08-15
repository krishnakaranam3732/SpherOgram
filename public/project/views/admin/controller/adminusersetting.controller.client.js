/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .controller("AdminUserSettingController", AdminUserSettingController);
    function AdminUserSettingController($location, userService, $anchorScroll, $route) {

        var AdminUserSettingCtrl = this;
        AdminUserSettingCtrl.admin = currentUser;
        AdminUserSettingCtrl.updateProfile = updateProfile;
        AdminUserSettingCtrl.createProfile = createProfile;
        AdminUserSettingCtrl.reset = reset;

        function init() {
            userService.findAllUsers().then(function (users) {
                AdminUserSettingCtrl.users = users;
            });
            AdminUserSettingCtrl.tab = 0;
        }

        init();

        function updateProfile(user) {
            AdminUserSettingCtrl.message = null;
            AdminUserSettingCtrl.error = null;
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
                AdminUserSettingCtrl.error = " One role is required ";
                $anchorScroll('error');
            }
            else {
                user.roles = roles;
                userService.updateUser(user._id, user)
                    .then(function () {
                        AdminUserSettingCtrl.message = 'User updated successfully';
                        userService.findAllUsers().then(function (users) {
                            AdminUserSettingCtrl.users = users;
                            $anchorScroll('message');
                            if (AdminUserSettingCtrl.admin._id === user._id) {
                                setTimeout(
                                    function () {
                                        $route.reload();
                                    }, 1000);
                            }
                        }, function () {
                            $route.reload();
                        })
                    }, function () {
                        AdminUserSettingCtrl.error = " Something went wrong. Please try later";
                        $anchorScroll('error');
                    });
            }

        }

        function createProfile() {
            AdminUserSettingCtrl.userError = null;
            if (AdminUserSettingCtrl.user.password !== AdminUserSettingCtrl.verifyPassword) {
                AdminUserSettingCtrl.userError = " Password does not match ";
                var element = document.getElementById('inputPassword');
                element.focus();
                $anchorScroll('top');
            }
            else {
                userService.findUserByUsername(AdminUserSettingCtrl.user.username)
                    .then(function () {
                        AdminUserSettingCtrl.userError = " Username already exists";
                        $anchorScroll('top');
                    }, function () {
                        if (!AdminUserSettingCtrl.user._admin && !AdminUserSettingCtrl.user._user) {
                            AdminUserSettingCtrl.userError = " Please Check the checkboxes User or Admin ";
                            $anchorScroll('top');
                        } else if (AdminUserSettingCtrl.user._admin && AdminUserSettingCtrl.user._user)
                        {
                            AdminUserSettingCtrl.user.roles = ['ADMIN','USER'];
                            return userService.createUser(AdminUserSettingCtrl.user);
                            $anchorScroll('top');
                        } else if (AdminUserSettingCtrl.user._admin)
                        {
                            AdminUserSettingCtrl.user.roles = ['ADMIN'];
                            return userService.createUser(AdminUserSettingCtrl.user);
                            $anchorScroll('top');
                        } else if (AdminUserSettingCtrl.user._user)
                        {
                            AdminUserSettingCtrl.user.roles = ['USER'];
                            return userService.createUser(AdminUserSettingCtrl.user);
                            $anchorScroll('top');
                        }

                        return AdminUserSettingCtrl.userError;
                    })
                    .then(function (status) {
                        if (status) {
                            AdminUserSettingCtrl.message = 'User created successfully';
                            userService.findAllUsers().then(function (users) {
                                AdminUserSettingCtrl.users = users;
                                AdminUserSettingCtrl.tab = 0;
                                $anchorScroll('message');
                            });
                        }
                    }, function () {
                        AdminUserSettingCtrl.userError = "Oops! Something went wrong. Please try again later";
                        $anchorScroll('top');
                    });
            }
        }

        function reset() {
            AdminUserSettingCtrl.userError = null;
            AdminUserSettingCtrl.message = null;
            AdminUserSettingCtrl.error = null;
            AdminUserSettingCtrl.user = null;
            AdminUserSettingCtrl.verifyPassword = null;
        }

    }
})();