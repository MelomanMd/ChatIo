const Chat = require('../models/chat');
const User = require('../models/user');
const Attachment = require('../models/attachtment');
const dateUtils = require('../helpers/date_helper');
const fileUtils = require('../helpers/file_helper');

const ioEvents = (io) => {
	io.on('connection', (socket) => {

		socket.on('joinRoom', (room) => {
			socket.join(room);
		});

		socket.on('newMessage', (data) => {
			Chat.create({room: data.room, from: data.from, to: data.to, message: data.message}, (error, message) => {

				if (error) {
					console.log(error);
				}

				if (data.file && data.filename) {

					fileUtils.saveFile(data);

					Attachment.create({message: message._id, name:  data.filename});

					data.image = '../../uploads/' +  data.filename;
				}

				socket.broadcast.to(data.room).emit('receiveMessage', data);

				socket.broadcast.emit('notification', data.to, data.from);
			});
		});

		socket.on('loadMessages', async (room, page) => {

			const msg_list = await Chat.findChatMessages(room, 0);

			const messages = await Promise.all(msg_list.map(async message => ({
				id: message.id,
				message: message.message,
				me: message.from.id === socket.request.session.passport?.user,
				user: message.from,
				created: Utils.dateTime(message.created),
				image: await Attachment.findOne({message: message.id}).then(image => {
					if (image && image.name) {
						return `../../uploads/${image.name}`;
					}
				})
			})));
		
			socket.emit('preloadMessages', messages);
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