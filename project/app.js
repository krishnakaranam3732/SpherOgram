/**
 * Created by krish on 6/22/17.
 */
module.exports = function (app) {
    require('./services/user.service.server')(app);
    require('./services/post.service.server')(app);
    require('./services/search.service.server')(app);
};