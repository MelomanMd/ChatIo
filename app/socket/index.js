const fs = require('fs');
const path = require('path');
const Chat = require('../models/chat');
const User = require('../models/user');
const Attachment = require('../models/attachtment');
const dateUtils = require('../helpers/date_helper');

const ioEvents = (io) => {
	io.on('connection', (socket) => {

		socket.on('joinRoom', (room) => {
			socket.join(room);
		});

		socket.on('newMessage', (data) => {
			Chat.create({room: data.room, from: data.from, to: data.to, message: data.message, created: data.date}, (error, message) => {

				if (error) {
					console.log(error);
				}

				if (data.file && data.filename) {
					const buffer = Buffer.from(data.file);
					fs.createWriteStream(path.dirname(__dirname) + '../../public/uploads/' + data.filename).write(buffer);
	
					Attachment.create({message: message._id, name:  data.filename, created: data.date});

					data.image = '../../uploads/' +  data.filename;
				}


				socket.broadcast.to(data.room).emit('receiveMessage', data);

				socket.broadcast.emit('notification', data.to, data.from);
			});
		});

		socket.on('loadMessages', async (room, page) => {
		
			let msg_list = [];
			await Chat.findChatMessages(room, page).then((messages) => {
				messages.reverse().forEach(async (item) => {
					const message_item = {
						id: item.id,
						message: item.message,
						me: item.from.id === socket.request.session.passport.user,
						user: item.from,
						created: dateUtils.dateTime(item.created),
						image: await Attachment.findOne({message: item.id}).then(image => {
							if (image && image.name) {
								return `../../uploads/${image.name}`;
							}
						})
					};
					msg_list.push(message_item);
				});
			});

			console.log(msg_list);

			socket.emit('preloadMessages', msg_list);
		});

		socket.on('typing', (status, room) => {
			socket.broadcast.to(room).emit('typing', status);
		});

	});
}


const init = (app) => {

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
			socket.disconnect();
		});

	});

	ioEvents(io);

	return server;
}

module.exports = init;