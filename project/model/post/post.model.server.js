/**
 * Created by krish on 7/6/17.
 */
var userSchema = require('./../post/post.schema.server');
var postSchema = require('./../../../common/model/user/user.schema.server');

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

module.exports = postModel;


function createPost(post) {
    return postModel.create(post);
}

function findPostById(postId) {
    return postModel.findById(postId).populate('owner').exec();
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
    return postModel.findById(postId)
        .then(function (post) {
            return postModel.findOneAndRemove({_id: postId});
        }, function (err) {
            return null;
        });
}

function sharePost(postId) {
    return postModel.findOneAndUpdate({_id: postId}, {$set: {shared: true, dateShared: new Date()}});
}

function unSharePost(postId) {
    return postModel.findOneAndUpdate({_id: postId}, {$set: {shared: false, dateShared: null}});
}

function recentlySharedPosts() {
    return postModel.find({shared: true}).sort({dateShared: -1}).limit(3).populate('owner');
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