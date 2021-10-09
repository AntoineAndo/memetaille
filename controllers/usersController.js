var UserModel = require("../db/models/users.js");
var io = require("socket.io-client");
const jwt = require('jsonwebtoken');

var passport = require('passport');

exports.index = async function(req, res){

	var socket = io("http://localhost:3000");
	socket.on("connect", () => {  console.log(socket.id); });
	socket.on("data", () => { console.log("DAATAA")})

	const users = await UserModel.find({});

	try{
		res.status(200).send(users)
	}catch(error){
		console.log(error)
		res.status(500).send(error)
	}
}

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
					exp: Math.floor(Date.now() / 1000) + (60 * 60)
				};

				const token = jwt.sign(payload, 'tonkotsu');

				return res.status(200).send({user,token});
			}
		)
	})(req, res, next)
}

exports.user_profile = function(req, res, next){
    res.status(200).send({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.jwt
    })
}