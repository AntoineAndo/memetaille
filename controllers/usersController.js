var UserModel = require("../db/models/users.js");
const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectId;
var passport = require('passport');
var request = require('request');


exports.user_get = async function(req, res){
	const users = await UserModel.find({username: req.params.username})

	//If the user isn't found
	if(users.length == 0){
		res.status(404).send({
			"status": 404,
			"error"	: "User not found"
		});
	}else{
		res.status(200).send(users[0]);
	}
}

exports.user_create_post = function(req, res, next){
	res.status(200).send({
		message: 'Signup successful',
		user: req.user,
	});
}

exports.user_login = async function(req, res, next){
	passport.authenticate('login', { session: false}, function(err, user, info){
		req.login(
			user,
			{ session: false },
			async (error) => {
				if(error) return next(error);

				const payload = {
					...user,
					exp: Math.floor(Date.now() / 1000) + (60*60*60)
				};

				const token = jwt.sign(payload, 'tonkotsu');

				return res.status(200).send({user,token});
			}
		)
	})(req, res, next)
}

exports.user_fb_login = async function(req, res, next){
	const accessToken = req.body.token;

	// Verify access token
	request(`https://graph.facebook.com/me?access_token=${accessToken}`, async function (error, response, body) {
		if (!error && response.statusCode == 200) {
			//Access token is valid
			const newFacebookID = JSON.parse(body).id;

			//findOrCreate user
			UserModel.findOne({ facebookID: newFacebookID }, async (err, user) => {
		        if(!user){
					user = await UserModel.create({
						facebookID: newFacebookID, 
					});

		        }

				req.login(
					user,
					{ session: false },
					async (error) => {
						if(error) return next(error);

						const payload = {
							...user,
							exp: Math.floor(Date.now() / 1000) + (60*60)
						};

						const token = jwt.sign(payload, 'tonkotsu');

						return res.status(200).json({user,token});
					}
				)

			});
		}
	})
}


exports.user_profile_secured = function(req, res, next){
	passport.authenticate('bearer', { session: false }, function(err, user, info){
		if(err){
			console.log("error");
			console.log(err);
		}
		res.status(200).send("ok");
	});
}