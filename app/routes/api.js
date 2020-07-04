var User = require('../models/user.js');
var Story = require('../models/story.js');
var config = require("../../config");
var jsonwebtoken = require('jsonwebtoken');

var secretKey = config.secretKey;

function createToken(user){
	var token = jsonwebtoken.sign({
		id: user._id,
		name: user.name,
		username: user.username
	}, secretKey, {
		expiresInMinutes: 1440
	});

	return token;
}

module.exports = function(app, express, io){

	var api = express.Router();

	api.post('/signup', function(req, res){
		var user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		});

		var token = createToken(user);

		user.save(function(err){
			if(err){
				res.send(err);
				return;
			} else {
				res.json({ 
					success: true,
					message: "User has been created!",
					token: token
				});
			}
		});
	});

	api.get('/users', function(req, res){

		User.find({}, function(err, users){
			if(err){
				res.send(err);
				return;
			}

			res.json(users);
		});
	});

	api.post('/login', function(req, res){

		User.findOne({
			username: req.body.username
		}).select('name username password').exec(function(err, user){
			if(err) throw err;


			if(!user){
				res.send({ message: "User does not exist"});
			} else if (user){
				var validPassword = user.comparePassword(req.body.password);

				if(!validPassword){
					res.send({ message: "Invalid password"});
				} else {
					// token
					var token = createToken(user);
					res.json({
						success: true,
						message: "Successful login",
						token: token
					});
				}
			}
		});
	});

	api.get('/story/all', function(req, res){
		Story.find({}, function(err, stories){
				if(err){
					res.status(500).send({message: "Cannot get stories"});
				} else {
					res.json(stories)
				}
			})
	});

	// ==============================================
	// Middleware - Anything below is secure area
	// ==============================================

	api.use(function(req, res, next){

		console.log("Somebody requested secure area!");
		var token = req.body.token || req.headers['x-access-token'];

		if(token){
			jsonwebtoken.verify(token, secretKey, function(err, decoded){
				if(err){
					res.status(403).send({success:false, message: "Failed to authenticate user"});
				} else {
					req.decoded = decoded;
					next();
				}
			}) 
		} else {
			res.status(403).send({success:false, message: "No token provided"});
		}

	});

	// ==============================================
	// ==============================================
	// ==============================================

	api.route('/story')
		.post(function(req, res){
			var story = new Story({
				creator: req.decoded.id,
				content: req.body.content
			});

			story.save(function(err, newStory){
				if(err){
					res.send(err);
					return;
				} else {
					io.emit('story', newStory)
					res.json({success: "Successfully created story"});
				}
			});
			
		})
		.get(function(req, res){
			Story.find({creator: req.decoded.id}, function(err, stories){
				if(err){
					res.status(500).send({message: "Cannot get stories"});
				} else {
					res.json(stories)
				}
			})
		});

	

	api.get('/me', function(req, res){
		res.json(req.decoded);
	});



	return api;
}


