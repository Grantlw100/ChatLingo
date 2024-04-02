const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactListSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    contacts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

const ContactList = mongoose.model('ContactList', contactListSchema);

module.exports = ContactList;