const socketIo = require('socket.io');
const passportSocketIo = require('passport.socketio');
const cookieParser = require('cookie-parser');
const Chat = require('../models/chat');
const User = require('../models/user');
const Attachment = require('../models/attachtment');
const fileUtils = require('../helpers/file_helper');
const dateUtils = require('../helpers/date_helper');
const config = require('../config');

module.exports = (server, sessionStore) => {
	const io = socketIo(server);

	io.use(passportSocketIo.authorize({
		cookieParser: cookieParser,
		key:          'express.sid',
		secret:       config.sessionSecret,
		store:        sessionStore
	}));

	io.on('connection', socket => {
		/**
		 * Get user
		 */
		const userId = socket.request.user._id;

		/**
		 * Join to chat room
		 */
		socket.on('joinRoom', roomId => {
			socket.join(roomId);
		});

		/**
		 * Online user status
		 */
		socket.on('online', (user) => {
			User.updateUser(user, {online: 'online'}, () => {
				socket.broadcast.emit('userOnline', user);
			});
		});

		/**
		 * Offline user status
		 */
		socket.on('disconnect', () => {
			if (userId) {
				User.updateUser(userId, {online: 'offline'}, () => {
					socket.broadcast.emit('userOffline', userId);
			});

			socket.leave(userId);
			}
			socket.disconnect();
		});

		/**
		 * Join to chat room
		 */
		socket.on('joinRoom', roomId => {
            socket.join(roomId);
    	});

		/**
		 * Change typing status
		 */
		socket.on('typing', (status, roomId) => {
			socket.broadcast.to(roomId).emit('typing', status);
		});

		/**
         * Create new message
         */
        socket.on('newMessage', data => {
			if (!data.edit) {
				Chat.create({room: data.room, from: data.from, to: data.to, message: data.message}, (error, message) => {

					if (error) {
						console.log(error);
					}
	
					if (data.file && data.filename) {
	
						fileUtils.saveFile(data);
	
						Attachment.create({message: message._id, name:  data.filename});
	
						data.image = '/uploads/' +  data.filename;
					}
	
					data._id = message._id;

					io.to(data.room).emit('receiveMessage', data);
	
					const notification = {
                        to: data.to,
                        from: data.from,
                        message: data.message,
                        created: message.created
                    };

					socket.broadcast.to('notifications-room').emit('notification', notification);
				});
			} else {
				Chat.edit({_id: data.editId, message: data.message}, (error, message) => {

					if (error) {
						console.log(error);
					}
	
					if (data.file && data.filename) {
	
						fileUtils.saveFile(data);
	
						Attachment.create({message: message._id, name:  data.filename});
	
						data.image = '/uploads/' +  data.filename;
					}

					data._id = data.editId;
	
					socket.broadcast.to(data.room).emit('editMessage', data);
				});
			}
		});

		/**
         * Preload messages
         */
        socket.on('loadMessages', async (room, id) => {
			const msg_list = await Chat.findChatMessages(room, id);

			const messages = await Promise.all(msg_list.map(async message => ({
				id: message._id,
				message: message.message,
                me: message.from.id === socket.request.session.user._id,
				user: message.from,
				created: dateUtils.dateTime(message.created),
				image: await Attachment.findOne({message: message._id}).then(image => {
					if (image && image.name) {
						return `/uploads/${image.name}`;
					}
				})
			})));

			socket.emit('preloadMessages', messages);
		});
	});


};