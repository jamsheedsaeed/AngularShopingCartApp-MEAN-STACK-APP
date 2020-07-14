var Cart = require('../models/cart.js');
var User = require('../models/user.js');

module.exports = function(app, express, io){

	var api = express.Router();

	api.route('/AddtoCart')
		.post(function(req, res){
			var cart = new Cart({
				creator: req.decoded.id,
                pname: req.body.pname,
                price: req.body.price,
                url: req.body.url
			});

			cart.save(function(err, newStory){
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


        api.get('/me', function(req, res){
            res.json(req.decoded);
        });


	return api;
}