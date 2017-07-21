//using express with node js
var express = require('express');

//initialize app as an express application
var app = express();

//process.env.port - assigned port number in heroku
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./common/app.js')();

require('./assignment/assignment4/app.js')(app);
require('./assignment/assignment5/app.js')(app);

app.listen(port);

console.log("listening from " + port);