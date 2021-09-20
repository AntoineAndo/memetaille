var express = require('express');
var router = express.Router();

var UserModel = require('../db/models/users.js');

var connectToDatabase = require('../db/connection')

/* GET users listing. */
router.get('/', async function(req, res, next) {

	const users = await UserModel.find({});

		console.log(users)

	try{
		res.status(200).send(users)
	}catch(error){
		console.log(error)
		res.status(500).send(error)
	}
});

router.get("/test", async function(req, res, next){
	const testUser = new UserModel({
		name 	: "testUser",
		active	: true,
		height	: 180
	})

	try{
		await testUser.save()
		res.send(testUser)
	}catch(error){
		console.log(error)
		res.status(500).send(error)
	}

	res.status(200)
})

module.exports = router;