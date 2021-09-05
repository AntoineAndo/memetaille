var express = require('express');
var router = express.Router();

/*
router.get('/', passport.authenticate('basic', { session: false }), function(req, res, next) {

	res.json({
        message: 'OK'
    });
});
*/

/* GET home page. */
router.post('/login', function(req, res, next) {

	passport.authenticate('local',
	(err, user, info) => {
		if (err) {
			return next(err);
		}

		if (!user) {
			return res.redirect('/test?info=' + info);
		}

		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}

			return res.redirect('/');
		});

	})(req, res, next);


    res.json({
        message: 'Test'
    });
});

module.exports = router;
