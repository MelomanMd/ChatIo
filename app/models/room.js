const roomModel = require('../database').models.room;

const find = (data, callback) => {
	if (!callback) {
		return roomModel.find({ users: { $all: data } });
	}

	roomModel.find({ users: { $all: data} }, callback);
};

const findOrCreate = async (users) => {
	const room = await roomModel.findOne({ users: { $all: users } }).then(room => room);
	if (room) {
		return room;
	} else {
		return create({users: users});
	}
};

const create = (data, callback) => {
	return new roomModel(data).save(callback);
};

module.exports = { 
	create,
    find,
	findOrCreate
};