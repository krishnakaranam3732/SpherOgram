/**
 * Created by krish on 6/21/17.
 */
(function (){
    angular
        .module("WebAppMaker")
        .service("WebsiteService", WebsiteService)

    function WebsiteService(){
		var websites =   [
							{ "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
							{ "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
							{ "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
							{ "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
							{ "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
							{ "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
							{ "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
						];

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
		return api;

        function createWebsite(userId, website) {
            website.developerId = userId;
            website._id = (new Date()).getTime().toString();
            websites.push(website);
            return website;
        }

        function findWebsitesByUser(userId) {
            var userWebsites = []
            for(var w in websites) {
				website = websites[w];
                if(website.developerId == userId) {
                    userWebsites.push(website);
                }
            }
            return userWebsites;
        }

        function findWebsiteById(websiteId) {
            for(var w in websites) {
				website = websites[w];
                if(website._id == websiteId) {
                    return angular.copy(website);
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            var webIndex = findWebIndexById(websiteId);
            if( webIndex == null)
            {
                return null;
            }
            else
            {
                websites[webIndex] = website;
                return websites[webIndex];
            }
        }

        function deleteWebsite(websiteId) {
            var webIndex = findWebIndexById(websiteId);
            if(webIndex == null)
            {
                return false;
            }
            else
            {
                websites.splice(webIndex, 1);
                return true;
            }
        }

        function findWebIndexById(websiteId) {
            for(var w = 0; w < websites.length; w++)
            {
                if( websites[w]._id == websiteId)
                    return w;
            }
            return null;
        }
    }

})();