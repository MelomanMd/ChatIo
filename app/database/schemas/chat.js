var Mongoose = require('mongoose');

var ChatSchema = new Mongoose.Schema({
    room: { type: Mongoose.Schema.Types.ObjectId, index: true, ref: 'room' },
    from: { type: Mongoose.Schema.Types.ObjectId, index: true, ref: 'user' },
    to: { type: Mongoose.Schema.Types.ObjectId, index: true, ref: 'user'  },
    message: { type: Mongoose.Schema.Types.String, default: null },
    created:  { type: Mongoose.Schema.Types.Date, index: true, default: Date.now }
});


var chatModel = Mongoose.model('chat', ChatSchema);

module.exports = chatModel;