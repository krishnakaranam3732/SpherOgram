/**
 * Created by krish on 6/21/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService,$location,$routeParams) {
        
		var pcmodel = this;
		var userId = $routeParams['uid'];
		console.log(userId);
        pcmodel.update = update;
        pcmodel.deleteUser = deleteUser;

        function init() {
            pcmodel.user = UserService.findUserById(userId);
            if(user) {
                pcmodel.user = user;
				console.log(user.userId);
            } else {
                pcmodel.error = "User Id does not exist"
            }
        }
        init();

        function update(newUser) {
            var user = UserService.updateUser(pcmodel.user._id, newUser);
            if(user) {
                pcmodel.message = "User updated successfully!";
            } else {
                pcmodel.error = "update failed";
            }
        }

        function deleteUser() {
            UserService.deleteUser(pcmodel.user._id);
            var index = $location.path().lastIndexOf("/");
            var path = $location.path().substring(0, index);
            index = path.lastIndexOf("/");
            $location.url(path.substring(0, index));
        }
    }
})();