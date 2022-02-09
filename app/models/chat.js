var chatModel = require('../database').models.chat;

const create = (data, callback) => {
	new chatModel(data).save(callback);
};

const findChatMessages = (room, offset) => {
	return chatModel.find({ room: room }).sort({'created': -1}).skip(offset * 10).limit(10).populate('from').populate('to');
};

module.exports = { 
	findChatMessages,
	create
};