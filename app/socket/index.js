var Chat = require('../models/chat');
var User = require('../models/user');
var Utils = require('../helpers/date_helper');

var ioEvents = (io) => {
	io.of('/chatroom').on('connection', (socket) => {

		socket.on('joinRoom', (room, user) => {
			socket.join(room);
			socket.broadcast.to(room).emit('onlineStatus', user);
		});

		socket.on('newMessage', (data) => {
			Chat.create({from: data.from, to: data.to, message: data.message, created: data.date}, (err, message) => {
				if (err) {
					throw err;
				}

				socket.broadcast.to(data.to).emit('receiveMessage', data);
			});
		});

		socket.on('load_messages', async (from, to, page) => {
			await Chat.findChat(from, to, page, (err, chat_list) => {
				if (err) {
					throw err;
				}

				var msg_list = [];

				chat_list.forEach(item => {
					var message = {
						id: item.id,
						message: item.message,
						me: item.from.id === from,
						user: item.from,
						created: Utils.dateTime(item.created)
					};
					msg_list.push(message);

				});

				socket.emit('preloadMessages', msg_list);
			});
		})

		socket.on('typing', (status, user) => {
			socket.broadcast.to(user).emit('typing', status);
		});


	});
}


var init = (app) => {

	var server 	= require('http').Server(app);
	var io 		= require('socket.io')(server);

	io.use((socket, next) => {
		require('../session')(socket.request, {}, next);
	});

	io.on('connect', (socket) => {

		socket.on('online', (user) => {
			User.updateUser(user, {online: 'online'}, (err, data) => {
				if (err) {
					console.log('Error: ', err);
				}

				socket.broadcast.emit('user_online', user);
			});
		});

		socket.on('disconnect', () => {
			const user = socket.request.session.passport?.user;
			if (user) {
				User.updateUser(user, {online: 'offline'}, (err, data) => {
					if (err) {
						console.log('Error: ', err);
					}

					socket.broadcast.emit('user_offline', user);
				});
			}
			socket.disconnect();
		});

	});

	ioEvents(io);

	return server;
}

module.exports = init;