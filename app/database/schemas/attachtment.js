var Mongoose = require('mongoose');

var AttachtmentsSchema = new Mongoose.Schema({
    message: { type: Mongoose.Schema.Types.ObjectId, ref: 'chat' },
    name: { type: Mongoose.Schema.Types.String },
    created:  { type: String, default: null }
});


var attachtmentsModel = Mongoose.model('attachtments', AttachtmentsSchema);

module.exports = attachtmentsModel;