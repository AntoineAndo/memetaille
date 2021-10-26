const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../db/models/users');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
	'signup',
	new localStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
    passReqToCallback: true,
	},
	async (req, email, password, done) => {
		try {
      const user = await UserModel.create({
        email: req.body.email, 
        password: req.body.password,
        username: req.body.username,
        height: req.body.height, 
      });

			return done(null, user);
		} catch (error) {
			done(error);
		}
	})
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });
        console.log(user);
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: 'tonkotsu',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    }, (token, done) => {
      try {
        return done(null, token);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

/*
passport.use(
  new facebookStrategy({
    clientID: '242011321231099',
    clientSecret: 'a98d0d69a9812ec7b5cb0c12a4bf737c',
    callbackURL: 'http://localhost:3000/auth/fb/callback',
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log("^ profile");
    //UserModel.findOrCreate()

    done(null, 'test');
  }))
*/