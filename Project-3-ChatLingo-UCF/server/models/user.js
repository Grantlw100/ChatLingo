const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    firstName : {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v);
            },
            message: props => `${props.value} is not a valid password!`
        },
    },
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User',
        },
    ],
    groups: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        },
    ],
    messages: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Message',
        },
    ],
    translations: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Translation',
        },
    ],
    contactList: {
        type: Schema.Types.ObjectId,
        ref: 'ContactList',
    },
    colorTheme: {
        type: String,
        default: 'light',
    },
    language: {
        type: String,
        default: 'en',
    },

}, {
    timestamps: true,
    });

const User = mongoose.model('User', userSchema);

userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User;