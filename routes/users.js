var express = require('express');
var router = express.Router();

//var models = require('../db/models');
//var User = models.user;

var connectToDatabase = require('../db/connection')

/* GET users listing. */
router.get('/', async function(req, res, next) {

    const { db }  = await connectToDatabase();
    const users = await db
        .collection("users")
        .find({})
        .limit(20)
        .toArray();

    res.status(200).json(users)
});

module.exports = router;