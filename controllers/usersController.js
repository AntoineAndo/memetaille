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
		username 	: "testUser",
		active		: true,
		height		: 180
	})

	await testUser.setPassword("12345678");

	try{
		await testUser.save()
		res.send(testUser)
	}catch(error){
		console.log(error)
		res.status(500).send(error)
	}

	res.status(200)
}

exports.user_login = async function(req, res, next){
	const { user } = await UserModel.authenticate()('testUser', '125678');

	res.status(200).send(user);
}