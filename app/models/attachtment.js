const attachtmentModel = require('../database').models.attachtment;

const create = (data, callback) => {
	new attachtmentModel(data).save(callback);
};

const findOne = (data, callback) => {
	if (!callback) {
		return attachtmentModel.findOne(data);
	}

	attachtmentModel.findOne(data, callback);
}

module.exports = { 
	create,
	findOne
};