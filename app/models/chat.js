var chatModel = require('../database').models.chat;

const create = (data, callback) => {
	new chatModel(data).save(callback);
};

const findChatMessages = (room, offset) => {
	return chatModel.find({ room: room })
		.sort({_id: 1})
		.limit(10)
		.populate('from', '_id username online')
		.populate('to', '_id username online');
};

module.exports = { 
	findChatMessages,
	create
};