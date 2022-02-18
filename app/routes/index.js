const express	 	= require('express');
const router 		= express.Router();
const passport 	= require('passport');

const User = require('../models/user');
const Chat = require('../models/chat');
const Room = require('../models/room');
const Attachment = require('../models/attachtment');

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
			return;
		}

		let msg_list = [];
		await Chat.findChatMessages(room._id, 0).then((messages) => {
			messages.reverse().forEach(async (item) => {
				const message_item = {
					id: item.id,
					message: item.message,
					me: item.from.id === userId,
					user: item.from,
					created: Utils.dateTime(item.created),
					image: await Attachment.findOne({message: item.id}).then(image => {
						if (image && image.name) {
							return `../../uploads/${image.name}`;
						}
					})
				};

				msg_list.push(message_item);
			});
		});

		let chatData = {
			me: await User.findById(userId),
			he: await User.findById(chatId),
			usersList: await User.usersList(req.user._id),
			messages: msg_list,
			room: room
		};

		res.render('chat', {
			chatData
		});

	}  else {
		res.redirect('/');
	}
}]);

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

		res.render('chat', {
			chatData
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