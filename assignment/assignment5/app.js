/**
 * Created by krish on 6/22/17.
 */
module.exports = function (app) {
    require('./services/user.service.server')(app);
    require('./services/website.service.server')(app);
    require('./services/page.service.server')(app);
    require('./services/widget.service.server')(app);

    var mongoose = require('mongoose');

    mongoose.Promise = require('q').Promise;

    // Local connection String
    var connectionString = "mongodb://localhost/webdev_summer_2017";

    mongoose.connect(connectionString, {
        useMongoClient: true
    });;
};