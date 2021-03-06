const express	= require('express');
const router 	= express.Router();
const passport 	= require('passport');
const User = require('../models/user');
const Chat = require('../models/chat');
const Room = require('../models/room');
const Utils = require('../helpers/date_helper');
const Attachment = require('../models/attachtment');

router.get('/', (req, res) => {
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

router.post('/login', passport.authenticate('local', {
	successRedirect: '/chat', 
	failureRedirect: '/',
	failureFlash: true
}));

router.get('/logout', (req, res) => {
	req.logout();
	req.session.destroy(() => {
		res.redirect('/');
	});
});

router.post('/register', (req, res) => {

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
				User.create(credentials, (err) => {
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

router.get('/chat', [User.isAuthenticated, async (req, res) => {
	if (req.isAuthenticated()) {
		var userId = req.user.id;

		let chatData = {
			me: await User.findById(userId),
			he: {},
			usersList: await User.usersList(req.user._id),
			messages: [],
			room: {}
		};

		res.render('chats', {
			chatData
		});

	} else {
		res.redirect('/');
	}
}]);

router.get('/chat/:id', [User.isAuthenticated, async (req, res) => {
	if (req.isAuthenticated()) {
		var chatId = req.params.id;
		var userId = req.user.id;

		if (!chatId || !userId) {
			res.redirect('/');
		}

		const room = await Room.findOrCreate([chatId, userId]).then(room => room);
		if (!room) {
			res.redirect('/');
		}

		const msg_list = await Chat.findChatMessages(room._id, 0);

		const messages = await Promise.all(msg_list.reverse().map(async message => ({
			id: message.id,
			message: message.message,
			me: message.from.id === userId,
			user: message.from,
			created: Utils.dateTime(message.created),
			reply: message.reply,
			image: await Attachment.findOne({message: message.id}).then(image => {
				if (image && image.name) {
					return `/uploads/${image.name}`;
				}
			})
		})));

		let chatData = {
			me: await User.findById(userId),
			he: await User.findById(chatId),
			usersList: await User.usersList(req.user._id),
			messages,
			room
		};

		res.render('chats', {
			chatData
		});

	}  else {
		res.redirect('/');
	}
}]);

module.exports = router;