//using express with node js
var express = require('express');

//initialize app as an express application
var app = express();

//process.env.port - if we are deploying in heroku we are assigned a port number
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//cookie-parser
var cookieParser  = require('cookie-parser');
app.use(cookieParser());

//express-session
var session       = require('express-session');
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));

//passport-js
var passport      = require('passport');
app.use(passport.initialize());
app.use(passport.session());

require('./common/app.js')();

require('./assignment/assignment4/app.js')(app);

require('./assignment/assignment5/app.js')(app);

require('./assignment/assignment6/app.js')(app);

require('./project/app.js')(app);

app.listen(port);

console.log("listening from " + port);