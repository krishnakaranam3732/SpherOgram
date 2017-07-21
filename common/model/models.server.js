/**
 * Created by krish on 7/20/2017.
 */
module.exports = function () {

    var mongoose = require('mongoose');

    mongoose.Promise = require('q').Promise;

    // Local connection String
    var connectionString = "mongodb://localhost/webdev_summer_2017";

    if (process.env.MLAB_USERNAME && process.env.MLAB_PASSWORD) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    mongoose.connect(connectionString, {
        useMongoClient: true
    });

    console.log("Successfully connected with mongo db "+ connectionString);

};