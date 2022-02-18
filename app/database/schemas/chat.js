var Mongoose = require('mongoose');

var ChatSchema = new Mongoose.Schema({
    room: { type: Mongoose.Schema.Types.ObjectId, ref: 'room' },
    from: { type: Mongoose.Schema.Types.ObjectId, ref: 'user' },
    to: { type: Mongoose.Schema.Types.ObjectId, ref: 'user'  },
    message: { type: Mongoose.Schema.Types.String, default: null },
    created:  { type: Mongoose.Schema.Types.Date, default: Date.now }
});


var chatModel = Mongoose.model('chat', ChatSchema);

module.exports = chatModel;