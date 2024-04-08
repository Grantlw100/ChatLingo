const mongoose = require('mongoose');

const { Schema } = mongoose;

const notificationSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
    },
    read: {
        type: Boolean,
        default: false,
    },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;