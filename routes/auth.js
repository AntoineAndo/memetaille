var express = require('express');
var router = express.Router();
var userController = require("../controllers/usersController.js")
var passport = require("passport")


//Requete POST pour insérer un utilisateur
router.post('/register', passport.authenticate('signup', { session: false }), userController.user_create_post);

//Requete POST pour authentifier l'utilisateur
router.post('/login', userController.user_login);

// Authentification FB
router.post('/fb', userController.user_fb_login);

module.exports = router;
