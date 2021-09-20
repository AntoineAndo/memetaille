var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

require('dotenv').config()

//var authenticationRouter = require('./routes/authentication');
var usersRouter = require('./routes/users');

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

app.use(passport.initialize());
app.use(passport.session());



const mongoose = require('mongoose');
const { MONGODB_URI, MONGODB_DB } = process.env

mongoose
	.connect(MONGODB_URI, { useNewUrlParser: true })
	.then(() => {
		app.use('/users', usersRouter);
	})



app.use(express.static('public'));
app.use(express.static('dist'));

/* Routing setup */
//app.use('/api/login', authenticationRouter);


/* MONGOOSE SETUP */
/*
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb+srv://memetailleUser:papillon44@cluster0.ofx2k.mongodb.net/memetaille?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: String,
  password: String
});

UserSchema.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('memetaille', UserSchema, 'users'); //Nom de la DB, Schema, nom de la collection


passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());
*/

/*
UserDetails.register({username:'paul', active: false}, 'paul');
UserDetails.register({username:'jay', active: false}, 'jay');
UserDetails.register({username:'roy', active: false}, 'roy');
*/


module.exports = app;
