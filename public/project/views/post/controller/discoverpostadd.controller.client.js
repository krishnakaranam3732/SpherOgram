/**
 * Created by krish on 6/10/17.
 */
(function () {
    angular
        .module("Sphereogram")
        .controller("DiscoverPostAddController", DiscoverPostAddController);
    function DiscoverPostAddController(postService,userService,$anchorScroll) {

        var DiscoverPostAddCtrl = this;

        DiscoverPostAddCtrl.createPost = createPost;
        DiscoverPostAddCtrl.searchPost = searchPost;
        DiscoverPostAddCtrl.currentUser = currentUser;
        DiscoverPostAddCtrl.message1 = null;
        DiscoverPostAddCtrl.error1 = null;
        DiscoverPostAddCtrl.message2 = null;
        DiscoverPostAddCtrl.error2 = null;
        DiscoverPostAddCtrl.place = null;
        var postObj = {
            description: "",
            pano_id: "",
            lat: 0,
            lng: 0,
            owner: DiscoverPostAddCtrl.currentUser._id
        };

        DiscoverPostAddCtrl.post = postObj;

        function init() {
        }
        init();

        function createPost()
        {   DiscoverPostAddCtrl.message2 = null;
            DiscoverPostAddCtrl.error2 = null;
            console.log("creating");
            if (DiscoverPostAddCtrl.post.pano_id === null || typeof DiscoverPostAddCtrl.post.pano_id === 'undefined' || DiscoverPostAddCtrl.post.pano_id === '') {
                DiscoverPostAddCtrl.error = " Panorama Id is mandatory ";
                var element = document.getElementById('pano_id');
                element.focus();
                $anchorScroll('top');
                return;
            }

            DiscoverPostAddCtrl.post.description= DiscoverPostAddCtrl.currentUser.username;
            DiscoverPostAddCtrl.post.owner= DiscoverPostAddCtrl.currentUser._id;

            postService.createPost(DiscoverPostAddCtrl.post)
                .then(function (post) {
                    DiscoverPostAddCtrl.message2 = " Post Created Successfully! ";
                    $anchorScroll('top');
                    });
        }

        function searchPost(place)
        {       console.log("place"+place);
            postService.searchPost(place)
                .then(function (response) {
                    if(response.status== "OK") {
                        DiscoverPostAddCtrl.response = response;
                        DiscoverPostAddCtrl.post.lat = response.location.lat;
                        DiscoverPostAddCtrl.post.lng = response.location.lng;
                        DiscoverPostAddCtrl.post.pano_id = response.pano_id;
                        DiscoverPostAddCtrl.URL = "https://maps.googleapis.com/maps/api/streetview?size=640x640&pano=" + response.pano_id + "&heading=151.78&pitch=-0.76&key=AIzaSyASnCH-vhDoB1GRXorM0ctYDVwEILiUYf4";
                    } });
        }

    }
})();