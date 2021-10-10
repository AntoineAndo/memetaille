var express = require('express');
var router = express.Router();

var UserModel = require('../db/models/users.js');
var userController = require("../controllers/usersController.js")

var passport = require("passport")

//Requete GET pour lister tous les utilisateurs de même taille
router.get('/', userController.index);

//Requete POST pour insérer un utilisateur
router.post('/register', passport.authenticate('signup', { session: false }), userController.user_create_post);

//Requete POST pour authentifier l'utilisateur
router.post('/login', userController.user_login);
//router.post('/login', passport.authenticate("local"), userController.user_login)

// router.get('/:id', passport.authenticate('jwt', { session: false }), userController.user_profile);
// router.get('/:id', userController.user_profile_secured);
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





//Requete GET pour récupérer un utilisateur par son username
//router.get('/:username', userController.user_get);
module.exports = router;