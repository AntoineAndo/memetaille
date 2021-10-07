var UserModel = require("../db/models/users.js");
var io = require("socket.io-client");

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

exports.user_create_post = async function(req, res, next){

	var newUser = {
		username 	: req.body.username,
		email		: req.body.email,
		height		: req.body.height
	}

	try{
		UserModel.register(newUser, req.body.password, function(err, result){
			if(err){
				//403 Forbidden
				res.status(403).send(err)
			}else{
				res.status(200).send(newUser)
			}
		})
	}catch(error){

	}
}

exports.user_login = async function(req, res, next){

	console.log(req);
	res.status(200).send(req.user);

/*
	var authenticate = UserModel.authenticate();

	//Authenticate based on the request's body
	authenticate(req.body.email, req.body.password, function(err, user){
		if(err){
			res.status(401).send(err)
		}else{

			//If login fails
			if(user == false){
				return res.status(401).send({
					"error"		: true,
					"message" 	: "Connection failed"
				})
			}else{
				//If login is successful
				res.status(200).send(user);
			}
		}
	});
*/
}