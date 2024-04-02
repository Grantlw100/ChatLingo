const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
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
    });

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;

// Path: Project-3-ChatLingo-UCF/server/models/message.js