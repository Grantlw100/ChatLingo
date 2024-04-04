const mongoose = require('mongoose');
const { Schema } = mongoose;

const translationSchema = new Schema({
    senderDesiredLanguage: {
        type: Schema.Types.ObjectId,
        ref: 'Language',
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiverDesiredLanguage: {
        type: Schema.Types.ObjectId,
        ref: 'Language',
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Translation = mongoose.model('Translation', translationSchema);

module.exports = Translation;
