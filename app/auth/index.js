const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

passport.use(new LocalStrategy((username, password, done) => {
	User.findOne({ username: new RegExp(username, 'i') }, (err, user) => {
		if (err) {
			return done(err);
		}

		if (!user) {
			return done(null, false, { message: 'Incorrect username or password.' });
		}

		user.validatePassword(password, (err, isMatch) => {
			if (err) {
				return done(err);
			}

			if (!isMatch) {
				return done(null, false, { message: 'Incorrect username or password.' });
			}

			return done(null, user);
		});

	});
}));

module.exports = passport;