var Mongoose = require('mongoose');

var AttachtmentsSchema = new Mongoose.Schema({
    message: { type: Mongoose.Schema.Types.ObjectId, ref: 'chat' },
    name: { type: Mongoose.Schema.Types.String },
    created:  { type: Mongoose.Schema.Types.Date, default: Date.now }
});


var attachtmentsModel = Mongoose.model('attachtments', AttachtmentsSchema);

module.exports = attachtmentsModel;