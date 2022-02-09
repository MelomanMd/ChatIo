const userModel = require('../database').models.user;

var create = (data, callback) => {
	var newUser = new userModel(data);
	newUser.save(callback);
};

var findOne = (data, callback) => {
	userModel.findOne(data, callback);
}

var findById = (id, callback) => {
	if (!callback) {
		return userModel.findById(id);
	}
	userModel.findById(id, callback);
}

var usersList = function (id) {
	return userModel.find({_id: { $nin: [ id ] }});
}

var updateUser = function (id, data, callback) {
	userModel.updateOne({_id: id}, { $set: data }, callback);
};

var isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/');
	}
};

module.exports = { 
	create,
	findOne,
	findById,
	isAuthenticated,
	usersList,
	updateUser
};