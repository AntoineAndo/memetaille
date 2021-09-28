var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const UserModel = require("./db/models/users.js");

require('dotenv').config()

//var authenticationRouter = require('./routes/authentication');

const passport = require('passport');
const bodyParser = require('body-parser');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

var app = express();

app.use(logger('dev'));
app.use(cors());
/*
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);
app.use(cookieParser());

//app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');
const { MONGODB_URI, MONGODB_DB } = process.env

mongoose
	.connect(MONGODB_URI, { useNewUrlParser: true })
	.then(() => {
		console.log("Connection successful")

		//Initializing Passport	
		app.use(passport.initialize());
		app.use(passport.session());

		//Creates a passport "local" strategy
		passport.use(UserModel.createStrategy());
		passport.serializeUser(UserModel.serializeUser());
		passport.deserializeUser(UserModel.deserializeUser());

		//Routes initialization
		var usersRouter = require('./routes/users');
		app.use('/users', usersRouter);
	})



app.use(express.static('public'));
app.use(express.static('dist'));

/* Routing setup */
//app.use('/api/login', authenticationRouter);

/*
UserDetails.register({username:'paul', active: false}, 'paul');
UserDetails.register({username:'jay', active: false}, 'jay');
UserDetails.register({username:'roy', active: false}, 'roy');
*/


module.exports = app;
