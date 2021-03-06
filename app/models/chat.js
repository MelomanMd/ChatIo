const chatModel = require('../database').models.chat;
const {
	ObjectId
  } = require('mongodb');

const find = (id) => {
	return chatModel.findOne({_id: id});
};

const create = (data, callback) => {
	new chatModel(data).save(callback);
};

var findChatMessages = (room, id) => {
	let where = { room: ObjectId(room) };
	if (id) {
		where = { room: ObjectId(room), _id: {$lt: ObjectId(id)} };
	}

	return chatModel.find(where)
		.limit(10)
		.sort({$natural: -1})
		.populate('from', '_id username online')
		.populate('to', '_id username online')
		.populate('reply.message', 'message');
};

const removeMessages = (messages, user, callback) => {
	return chatModel.deleteMany({_id: {$in: messages}, from: user}, callback);
};

const edit = (data, callback) => {
	return chatModel.findOneAndUpdate({_id: data._id}, {message: data.message}, {returnOriginal: false}, callback);
};

module.exports = { 
	find,
	findChatMessages,
	create,
	removeMessages,
	edit
};