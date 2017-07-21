/**
 * Created by krish on 7/20/2017.
 */
module.exports = function () {

    var mongoose = require('mongoose');

    mongoose.Promise = require('q').Promise;

    // Local connection String
    var connectionString = "mongodb://localhost/webdev_summer_2017";

    if (process.env.MLAB_USERNAME_WEBDEV && process.env.MLAB_PASSWORD_WEBDEV) {
        connectionString = "mongodb://"+process.env.MLAB_USERNAME_WEBDEV + ":" +
            process.env.MLAB_PASSWORD_WEBDEV + "@" +
            process.env.MLAB_HOST_WEBDEV + ':' +
            process.env.MLAB_PORT_WEBDEV + '/' +
            process.env.MLAB_APP_NAME_WEBDEV;
    }

    mongoose.connect(connectionString, {
        useMongoClient: true
    });

    console.log("Successfully connected with mongo db "+ connectionString);

};