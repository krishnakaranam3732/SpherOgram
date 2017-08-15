/**
 * Created by krish on 7/22/17.
 */
//passport

var passport = require('passport');
var userModel = require('../model/user/user.model.server');
var bcrypt = require("bcrypt-nodejs");

passport.serializeUser(serializeUser);
function serializeUser(user, done) {
    done(null, user);
}

passport.deserializeUser(deserializeUser);
function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );
}

//passport local strategy
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
//local strategy function
function localStrategy(username, password, done) {
    userModel
        .findUserByUserName(username, password)
        .then(
            function (user) {
                if (user) {
                    if (user.password && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, {message: 'Invalid Password'});
                    }
                }
                else {
                    return done(null, false, {message: 'Incorrect Username / Password'});
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

//passport facebook
var FacebookStrategy = require('passport-facebook').Strategy;

//facebook config
var facebookConfig = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'emails', 'displayName', 'name']
};
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

//facebook strategy
function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newFacebookUser = {
                        username: emailParts[0] + '_facebook',
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: email,
                        facebook: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFacebookUser);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        )
        .then(
            function (user) {
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

//passport google
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//google config
var googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));

//google strategy
function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username: emailParts[0] + '_google',
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: email,
                        google: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        )
        .then(
            function (user) {
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

module.exports = passport;