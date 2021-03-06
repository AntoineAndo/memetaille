var express = require('express');
var router = express.Router();

var UserModel = require('../db/models/users.js');
var userController = require("../controllers/usersController.js")

var passport = require("passport")

//Requete GET pour lister tous les utilisateurs de même taille
router.get('/', userController.index);

//Requete POST pour insérer un utilisateur
router.post('/register', userController.user_create_post)

//Requete POST pour authentifier l'utilisateur
router.post('/login', 
			passport.authenticate("local", { session: false }), 
			userController.user_login)
//router.post('/login', passport.authenticate("local"), userController.user_login)

//Requete GET pour récupérer un utilisateur par son username
router.get('/:username', userController.user_get)


module.exports = router;