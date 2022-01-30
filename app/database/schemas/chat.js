var Mongoose = require('mongoose');

var ChatSchema = new Mongoose.Schema({
    from: { type: Mongoose.Schema.Types.ObjectId, ref: "user" },
    to: { type: Mongoose.Schema.Types.ObjectId, ref: "user"  },
    message: { type: String, default: null },
    created:  { type: String, default: null }
});


var chatModel = Mongoose.model('chat', ChatSchema);

module.exports = chatModel;