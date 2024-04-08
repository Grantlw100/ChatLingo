const { User, Message, Room, ContactList, Group, Translation, Notification } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { translateText } = require('../utils/translate');
const { lang2lang } = require('../utils/translationMessage');
const { createNotification } = require('../utils/notification');

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
    updatedUser: async (parent, args, context) => {
        if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                args,
                { new: true }
            );

            return updatedUser;


        }
        throw new AuthenticationError('You need to be logged in!');
    },
    deleteUser: async (parent, args, context) => {
        if (context.user) {
            const deletedUser = await User.findByIdAndDelete(context.user._id);

            return deletedUser;
        }

        throw new AuthenticationError('You need to be logged in!');
    },
    addContactList: async (parent, args) => {
        const contactList = await ContactList.create(args);
        return contactList;
    },
    addContact: async (parent, { contactId }, context) => {
        if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { contactList: contactId } },
                { new: true }
            ).populate('ContactList');

            return updatedUser;
        }

        throw new AuthenticationError('You need to be logged in!');
    },
    removeContact: async (parent, { contactId }, context) => {
        if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { contactList: contactId } },
                { new: true }
            ).populate('ContactList');  

            return updatedUser;
        }

        throw new AuthenticationError('You need to be logged in!');
    },
    addGroup: async (parent, args) => {
        const group = await Group.create(args);
        return group;
    },
    removeGroup: async (parent, { groupId }, context) => {
        if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { groups: groupId } },
                { new: true }
            ).populate('groups');

            return updatedUser;
        }

        throw new AuthenticationError('You need to be logged in!');
    },
    addToGroup: async (parent, { groupId }, context) => {
        if (context.user) {
            const updatedGroup = await Group.findByIdAndUpdate(
                { _id: groupId },
                { $addToSet: { users: context.user._id } },
                { new: true }
            ).populate('users');

            return updatedGroup;
        }

        throw new AuthenticationError('You need to be logged in!');
    },
    removeFromGroup: async (parent, { groupId }, context) => {
        if (context.user) {
            const updatedGroup = await Group.findByIdAndUpdate(
                { _id: groupId },
                { $pull: { users: context.user._id } },
                { new: true }
            ).populate('users');

            return updatedGroup;
        }

        throw new AuthenticationError('You need to be logged in!');
    },
    addMessage: async (parent, { messageContent, roomId, userIds }, context) => {
        if (!context.user) {
            throw new AuthenticationError('You need to be logged in!');
        }
    
        const users = await User.find({_id: {$in: userIds}});
        const languageSet = new Set(users.map(user => user.language));
    
        const translations = {};
        for (let lang of languageSet) {
            const translationResult = await translateText(messageContent, lang);
            translations[lang] = translationResult.translatedText;
        }
    
        const messages = users.map(user => {
            const lang2langPlaceholder = lang2lang(context.user.language, user.language); // Assuming context.user.language exists
    
            return {
                originalContent: messageContent,
                translationContent: translations[user.language], 
                translation: lang2langPlaceholder,
                sender: context.user._id,
                receiver: user._id,
                room: roomId,
            };
        });
    
        await Message.insertMany(messages);
    
        messages.forEach(async message => {
            await createNotification({
                message: `New message from ${context.user.username}`,
                senderId: context.user._id,
                receiverId: message.receiver,
                roomId: roomId,
                type: 'Message', 
            });
        });
    
        return messages;
    },
    deleteMessage: async (parent, { _id }, context) => {
        if (context.user) {
            const message = await Message.findOneAndDelete({ _id, sender: context.user._id });

            return message;

        }
        throw new AuthenticationError('You need to be logged in!');

    },
    deleteMessages: async (parent, { room }, context) => {
        if (context.user) {
            const messages = await Message.deleteMany({ room, sender: context.user._id });

            return messages;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    addRoom: async (parent, args) => {
        const room = await Room.create(args);
        return room;
    },
    deleteRoom: async (parent, { _id }, context) => {
        if (context.user) {
            const room = await Room.findOneAndDelete({ _id, users: context.user._id });

            return room;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    addTranslation: async (parent, args) => {
        const translation = await Translation.create(args);
        return translation;
    },
    deleteTranslation: async (parent, { _id }, context) => {
        if (context.user) {
            const translation = await Translation.findOneAndDelete({ _id, user: context.user._id });

            return translation;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    addNotification: async (parent, args) => {
        const notification = await Notification.create(args);
        return notification;
    },
    deleteNotification: async (parent, { _id }) => {
        const notification = await Notification.findOneAndDelete({ _id });

        return notification;
    }
},
Subscription: {
    messageAdded: {
        subscribe: () => pubsub.asyncIterator(['MESSAGE_ADDED']),
    },
    },      
};


module.exports = resolvers;
