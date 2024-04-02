const mongoose = require('mongoose');
const { Schema } = mongoose;

const translationSchema = new Schema({
    original: {
        type: String,
        required: true,
    },
    translation: {
        type: String,
        required: true,
    },
    languageToLanguage: {
        type: String,
        required: true,
    },
    user: {
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
