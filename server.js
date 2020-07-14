var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require("./config");
var mongoose = require('mongoose');
var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());
var http = require('http').Server(app);
var io = require('socket.io')(http);


process.env.jwtsecret = '$2a$06$GXmQiERBvYRGD91bIJLWRO2m4WGUpj7IRuSuve3pZ3B5rRtLIzm33';

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
var cartapi = require('./app/routes/cartapi')(app, express, io);
app.use('/api', api);
app.use('/api', cartapi);

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