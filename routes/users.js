var express = require('express');
var router = express.Router();

var UserModel = require('../db/models/users.js');
var userController = require("../controllers/usersController.js")

var passport = require("passport")

//Requete GET pour lister tous les utilisateurs de même taille
router.get('/', async function(req, res, next){
	passport.authenticate('jwt', {session: false}, async function(err, user, info){
		if(!user){
			return res.status(401).json({
				'message': 'Token expired'
			});
		}

		console.log(user);
		const users = await UserModel.find({height: user._doc.height}, {password:0, updated_on:0, active:0});

		res.status(200).send(users);

	})(req, res, next);
});

router.get('/:id', function(req, res, next){
	passport.authenticate('jwt', {session: false}, function(err, user, info){
		if(!user){
			return res.status(401).json({
				'message': 'Token expired'
			});
		}
		res.status(200).send(user);

	})(req, res, next);
});

module.exports = router;