/**
 * Created by krish on 6/21/17.
 */
(function (){
    angular
        .module("WebAppMaker")
        .service("UserService", UserService)

    function UserService(){
        var users =   [
                      {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
                      {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
                      {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
                      {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
                      ];

        var api = {
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
			"findUserByCredentials": findUserByCredentials,
            "createUser": createUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
		return api;

        function findUserById(userId){
            for (var u in users) {
                user = users[u];
                if(parseInt(user._id) == userId) {
                    return user;
                }
            }
            return null;
        }

        function findUserByUsername(username){
			for (var u in users) {
                user = users[u];
                if(user.username == username) {
                    return user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password){
            for (var u in users) {
                user = users[u];
                if(user.username == username && user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function createUser(user){
            users.push(user);
        }

        function updateUser(userId, user){
            var index = findUserIndexById(userId);
            if( index == null)
            {
                return null;
            }
            else
            {
                users[index] = user;
                return users[index];
            }
        }

        function deleteUser(userId){
			var index = findUserIndexById(userId);
            if( index == null)
            {
                return null;
            }
            else
            {
                users.splice(index, 1);
            }		
        }

        function findUserIndexById(userId) {
            for(var u = 0; u < users.length; u++)
            {
                if( users[u]._id == userId)
                    return u;
            }
            return null;
        }

    }

})();