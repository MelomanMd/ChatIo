var Chat = require('../models/chat');
var User = require('../models/user');
var Utils = require('../helpers/date_helper');

var ioEvents = (io) => {
	io.on('connection', (socket) => {

		socket.on('joinRoom', (room) => {
			socket.join(room);
		});

		socket.on('newMessage', (data) => {
			Chat.create({room: data.room, from: data.from, to: data.to, message: data.message, created: data.date}, () => {
				socket.broadcast.to(data.room).emit('receiveMessage', data);
				console.log(`user-room-${data.to}`);
				socket.broadcast.to(`user-room-${data.to}`).emit('new', data.from);
			});
		});

		socket.on('loadMessages', async (room, page) => {
			await Chat.findChatMessages(room, page).then(messages => {
				var msg_list = [];

				messages.forEach(item => {
					var message = {
						id: item.id,
						message: item.message,
						me: item.from._id === socket.request.session.passport.user,
						user: item.from,
						created: Utils.dateTime(item.created)
					};
					msg_list.push(message);

				});

				socket.emit('preloadMessages', msg_list);
			});
		});

		socket.on('typing', (status, room) => {
			socket.broadcast.to(room).emit('typing', status);
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
			User.updateUser(user, {online: 'online'}, () => {
				socket.broadcast.emit('userOnline', user);
			});
		});

		socket.on('disconnect', () => {
			const user = socket.request.session.passport?.user;
			if (user) {
				socket.leave(user);
				User.updateUser(user, {online: 'offline'}, () => {
					socket.broadcast.emit('userOffline', user);
				});
			}
			// socket.disconnect();
		});

	});

	ioEvents(io);

	return server;
}

module.exports = init;