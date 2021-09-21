var UserModel = require("../db/models/users.js");

exports.index = async function(req, res){
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

	const testUser = new UserModel({
		username 	: req.body.username,
		email		: req.body.email,
		height		: req.body.height
	})

	await testUser.setPassword(req.body.password);

	try{
		await testUser.save()

		res.status(200).send(testUser)
	}catch(error){
		console.log("==============error=============");
		console.log(error);

		//E11000 duplicate key error collection
		//Si l'utilisateur existe déja en base de donnée
		if(error.code == 11000){
			//403 Forbidden
			res.status(403).send(error)

			return;
		}else{
			res.status(500).send(error)
		}
	}
}

exports.user_login = async function(req, res, next){

	//Authenticate based on the request's body
	const { user } = await UserModel.authenticate()(req.body.username, req.body.password);

	//If login fails
	if(user == false){
		return res.status(401).send({
			"error"		: true,
			"message" 	: "Connection failed"
		})
	}

	res.status(200).send(user);
}