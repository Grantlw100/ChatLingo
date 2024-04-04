const { User, Message, Room, ContactList, Group, Translation, Notification } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { translateText } = require('../utils/translate');
const { lang2lang } = require('../utils/translationMessage');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
            const user = await User.findById(context.user._id).populate({
                path: 'messages',
                populate: 'sender'
            });

            user.messages.sort((a, b) => b.createdAt - a.createdAt);

            return user;
        }
        
        throw new AuthenticationError('You need to be logged in!');
    },
    users: async () => {
        return User.find().populate({
            path: 'messages',
            populate: 'sender'
        });
    },
    user: async (parent, {username}) => {
        return User.findOne({username}).populate({
            path: 'messages',
            populate: 'sender'
        });
    },
    messages: async () => {
        return Message.find().populate('sender');
    },
    message: async (parent, { _id }) => {
        return Message.findById(_id).populate('sender');
    },
    rooms: async () => {
        return Room.find().populate('users');
    },
    room: async (parent, { _id }) => {
        return Room.findById(_id).populate('users');
    },
    contactLists: async () => {
        return ContactList.find().populate('contacts');
    },
    contactList: async (parent, { _id }) => {
        return ContactList.findById(_id).populate('contacts');
    },
    groups: async () => {
        return Group.find().populate('users');
    },
    group: async (parent, { _id }) => {
        return Group.findById(_id).populate('users');
    },
    translations: async () => {
        return Translation.find().populate('user');
    },
    translation: async (parent, { _id }) => {
        return Translation.findById(_id).populate('user');
    },
},
  Mutation: {
    login: async (parent, { email, password }) => {
        const user = await User.findOne({
            email
        });
        
        if (!user) {
            throw new AuthenticationError('No user found with this email address');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);
        return { token, user };
    },
    addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
    },
    addFriend: async (parent, { friendId }, context) => {
        if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { friends: friendId } },
                { new: true }
            ).populate('friends');

            return updatedUser;
        }

        throw new AuthenticationError('You need to be logged in!');
    },
    addGroup: async (parent, args) => {
        const group = await Group.create(args);
        return group;
    },
    addMessage: async (parent, { messageContent, roomId, userIds }, context) => {
        if (!context.user) {
            throw new AuthenticationError('You need to be logged in!');
        }

        const users = await User.find({_id: {$in: userIds}});
        const languageSet = new Set(users.map(user => user.preferredLanguage));

        const translations = {};
        for (let lang of languageSet) {
            translations[lang] = await translateText(messageContent, lang);
        }

        const messages = users.map(user => ({
            originalContent: messageContent,
            translationContent: translations[user.preferredLanguage],
            sender: context.user._id,
            receiver: user._id,
            room: roomId,
        }));

        await Message.insertMany(messages);

        },
    
    addRoom: async (parent, args) => {
        const room = await Room.create(args);
        return room;
    },
    addTranslation: async (parent, args) => {
        const translation = await Translation.create(args);
        return translation;
    },
},
Subscription: {
    messageAdded: {
        subscribe: () => pubsub.asyncIterator(['MESSAGE_ADDED']),
    },
    },      
};


module.exports = resolvers;
