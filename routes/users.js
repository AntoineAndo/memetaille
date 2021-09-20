var express = require('express');
var router = express.Router();

var UserModel = require('../db/models/users.js');
var userController = require("../controllers/usersController.js")

//Requete GET pour lister tous les utilisateurs de même taille
router.get('/', userController.index);

//Requete POST pour insérer un utilisateur
router.post('/', userController.user_create_post)

//Requete GET pour récupérer un utilisateur par son username
router.get('/:username', userController.user_get)

module.exports = router;