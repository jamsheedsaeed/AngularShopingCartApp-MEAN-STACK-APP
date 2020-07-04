var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require("./config");
var mongoose = require('mongoose');
var app = express();


var http = require('http').Server(app);
var io = require('socket.io')(http);

mongoose.connect(config.database, function(err){
	if(err){
		console.log("Unable to conect to database...");
		console.log("... " + config.database);
	} else {
		console.log("COnnected to DB");
	}
});



//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

var api = require('./app/routes/api')(app, express, io);
app.use('/api', api);


app.get('*', function(req, res){
	res.sendFile(__dirname + "/public/app/views/index.html")
});

http.listen(config.port, function(err){
	if(err){
		console.log(err);
	} else {
		console.log("Listening on port " + config.port);
	}
})