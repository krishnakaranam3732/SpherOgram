/**
 * Created by krish on 7/6/17.
 */
var postSchema = require('./../post/post.schema.server');
var userSchema = require('./../../../common/model/user/user.schema.server');

var mongoose = require('mongoose');

var userModel = mongoose.model('userModel', userSchema);
var postModel = mongoose.model('postModel', postSchema);

postModel.createPost = createPost;
postModel.findPostById = findPostById;
postModel.findPostsByOwner = findPostsByOwner;
postModel.findPostByDescriptionAndOwner = findPostByDescriptionAndOwner;
postModel.updatePost = updatePost;
postModel.deletePost = deletePost;
postModel.sharePost = sharePost;
postModel.unSharePost = unSharePost;
postModel.recentlySharedPosts = recentlySharedPosts;
postModel.mostLikedPosts = mostLikedPosts;
postModel.findpostiflikedbyuser = findpostiflikedbyuser;

module.exports = postModel;


function createPost(post) {
    return postModel.create(post);
}

function findPostById(postId) {
    return postModel.findById(postId);
}

function findPostsByOwner(userId) {
    return postModel.find({owner: userId});
}

function findPostByDescriptionAndOwner(description, owner) {
    return postModel.findOne({description: {$regex: ".*" + description + ".*", $options: 'i'}, owner: owner});
}

function updatePost(postId, updatePost) {
    return postModel.findOneAndUpdate({_id: postId}, {$set: updatePost});
}

function deletePost(postId) {
    return postModel
        .remove({_id: postId})
        .then(function (status) {
            return status;
        });
}

function sharePost(postId) {
    return postModel.findOneAndUpdate({_id: postId}, {$set: {shared: true, dateShared: new Date()}});
}

function findpostiflikedbyuser(userId,postId) {
    return postModel.find({_id: postId, likedUsers: userId});
}

function unSharePost(postId) {
    return postModel.findOneAndUpdate({_id: postId}, {$set: {shared: false, dateShared: null}});
}

function recentlySharedPosts(userId) {
    return postModel.find().sort({dateShared: -1}).limit(30).populate('owner');
}

function mostLikedPosts() {
    return postModel.aggregate([{
        "$project": {
            "_id": 1,
            "description": 1,
            "pano_id": 1,
            "likedUsers": 1,
            "owner": 1,
            "length": {"$size": "$likedUsers"}
        }
    }, {'$match': {'length': {'$gt': 0}}}, {"$sort": {"length": -1}}, {"$limit": 3}])
        .then(function (posts) {
            return postModel.populate(posts, {path: "owner"});
        })
}