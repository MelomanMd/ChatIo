var chatModel = require('../database').models.chat;
var ObjectId = require('mongodb').ObjectId;

var create = (data, callback) => {
	var newMessage = new chatModel(data);
	newMessage.save(callback);
};

var findChat = (from, to, offset, callback) => {
	chatModel.find({
		$or : [
			{ $and : [
				{ 'from' : ObjectId(from) },
				{ 'to' : ObjectId(to) }
			]} ,
			{ $and : [
				{ 'from' : ObjectId(to) },
				{ 'to' : ObjectId(from) }
			]} 
		]}, callback).sort({'created': -1}).skip(offset * 10).limit(10).populate('from')
	return {};
}

module.exports = { 
	findChat,
	create
};