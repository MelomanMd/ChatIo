var express	 	= require('express');
var router 		= express.Router();
var passport 	= require('passport');

var User = require('../models/user');
var Chat = require('../models/chat');

var Utils = require('../helpers/date_helper');

router.get('/', (req, res, next) => {
	if (req.isAuthenticated()) {
		res.redirect('/chat');
	} else {
		res.render('login', {
			success: req.flash('success')[0],
			errors: req.flash('error'), 
			showRegisterForm: req.flash('showRegisterForm')[0]
		});
	}
});

router.get('/chat/:id', [User.isAuthenticated, async (req, res, next) => {
	if (req.isAuthenticated()) {
		var chatId = req.params.id;
		var userId = req.user.id;

		if (!chatId || !userId) {
			return;
		}

		let chatData = {
			me: await User.findById(userId),
			he: await User.findById(chatId)
		};

		const users_list = await User.usersList(req.user._id);

		Chat.findChat(userId, chatId, 0, (err, chat_list) => {
			if (err) {
				throw err;
			}

			var msg_list = [];
			
			chat_list.reverse().forEach(item => {
				var message = {
					id: item.id,
					message: item.message,
					me: item.from.id === userId,
					user: item.from,
					created: Utils.dateTime(item.created)
				};
				msg_list.push(message);

			});
	
			res.render('chat', {
				users_list,
				msg_list,
				chatData
			});
		});

	}  else {
		res.redirect('/');
	}
}]);

router.get('/chat', [User.isAuthenticated, async (req, res, next) => {
	if (req.isAuthenticated()) {
		const users_list = await User.usersList(req.user._id);

		var userId = req.user.id;
		let chatData = {
			me: await User.findById(userId)
		};

		res.render('chat', {
			users_list,
			chatData,
			msg_list: []
		});

	} else {
		res.redirect('/');
	}
}]);

router.get('/logout', (req, res, next) => {
	req.logout();
	req.session = null;
	res.redirect('/');
});

router.post('/login', passport.authenticate('local', { 
	successRedirect: '/chat', 
	failureRedirect: '/',
	failureFlash: true
}));

router.post('/register', (req, res, next) => {

	var credentials = {
        'username': req.body.username,
        'password': req.body.password
    };

	if (credentials.username === '' || credentials.password === '') {
		req.flash('error', 'Missing credentials');
		req.flash('showRegisterForm', true);
		res.redirect('/');
	} else {

		User.findOne({'username': new RegExp('^' + req.body.username + '$', 'i')}, (err, user) => {
			if (err) {
                throw err;
            }

            if (user) {
				req.flash('error', 'Username already exists.');
				req.flash('showRegisterForm', true);
				res.redirect('/');
			} else {
				User.create(credentials, (err, newUser) => {
					if (err) {
                        throw err;
                    }

                    req.flash('success', 'Your account has been created. Please log in.');
					res.redirect('/');
				});
			}
		});
	}
});

module.exports = router;