const Mongoose 	= require('mongoose');

const dbURI = 'mongodb+srv://main:main@cluster0.q6tys.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
Mongoose.connect(dbURI, { useNewUrlParser: true });


Mongoose.connection.on('error', (err) => {
	if (err) {
		throw err;
	}
});


Mongoose.Promise = global.Promise;

module.exports = { Mongoose, 
	models: {
		user: require('./schemas/user'),
		chat: require('./schemas/chat'),
		room: require('./schemas/room'),
		attachtment: require('./schemas/attachtment')
	}
};