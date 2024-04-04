const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message',
        },
    ],
    senderDesiredLanguage: {
        type: Schema.Types.ObjectId,
        ref: 'Language',
    },
    receiverDesiredLanguages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Language',
        },
    ],
    Notification: {
        type: Schema.Types.ObjectId,
        ref: 'Notification',
    },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;

