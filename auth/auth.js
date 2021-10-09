const passport = require('passport');
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
  new JWTstrategy(
    {
      secretOrKey: 'tonkotsu',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('jwt')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);