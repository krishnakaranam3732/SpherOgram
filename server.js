//using express with node js
var express = require('express');

//initialize app as an express application
var app = express();

//process.env.port - if we are deploying in heroku we are assigned a port number
var port = process.env.PORT || 5000;
//printing
console.log(process.env.PORT);

app.use(express.static(__dirname + '/public'));

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./assignment/assignment4/app.js')(app);

app.listen(port);

console.log("Port: " + port);