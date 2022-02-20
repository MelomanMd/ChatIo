const Mongoose = require('mongoose');

const RoomSchema = new Mongoose.Schema({
    users: [{
        type: Mongoose.Schema.Types.ObjectId, index: true
    }]
});


const chatRoom = Mongoose.model('room', RoomSchema);

module.exports = chatRoom;