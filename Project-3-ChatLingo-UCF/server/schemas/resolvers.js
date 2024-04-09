const { User, Message, Room, ContactList, Group, Translation, Language, Notification } = require('../models');
const { signToken, createAuthenticationError } = require('../utils/auth');
const { translateText } = require('../utils/translate');
const { lang2lang } = require('../utils/translationMessageHelper');
const { createNotification } = require('../utils/notification');
const bcrypt = require('bcrypt');
const findLanguageByCode = async (code) => {
    return await Language.findOne({ code    });
};

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (!context.user) throw createAuthenticationError('You must be logged in!');
        
    
        const user = await User.findById(context.user._id)
            .populate({
                path: 'groups',
                populate: [
                '_id',
                'name',
                {
                    path: 'users',
                    select: 'username'
                },
                {
                    path: 'room',
                    select: ['name', '_id']
                }
        ]
            })
            .populate({
                path: 'messages',
                populate: [
                    {
                        path: 'sender',
                        select: 'username'
                    },
                    {
                        path: 'receiver',
                        select: 'username' 
                    },
                    {
                        path: 'room',
                        select: ['name', '_id']
                    },
                        'originalContent',
                        'translationContent']
            })
            .populate({
                path: 'language',
                populate: ['flag', 'name', 'code']
            })
            .populate({
                path: 'notifications',
                populate: ['message', 
                'sender', 
                'receiver', 
                {
                    path: 'room',
                    select: ['name', '_id']
                    }, 
                    'read', 
                    'type', 
                    'timestamp'
                ]
            })
            .populate({
                path: 'translations',
                populate: ['senderId', 'receiverId', 'senderDesiredLanguage', 'receiverDesiredLanguage']
            })
            .populate({
                path: 'contactList',
                populate: { path: 'contacts', select: 'username' }
            });

        return user;
    },
    users: async () => {
        const users = await User.find()
            .populate({
                path: 'messages',
                populate: { path: 'sender', select: 'username' } // Assuming 'sender' is a field in 'messages' that references 'User'
            })
            .populate({
                path: 'contactList',
                populate: { path: 'contacts', select: 'username' } // Adjust according to your schema
            })
            .populate('groups', 'name') // Just an example, adjust according to needs
            .populate('language', 'name'); // Adjust to populate only necessary fields from 'language'
        return users;
    },
    
    user: async (parent, {username}) => {
        const user = User.findOne({username}).populate({
            path:'contactList',
            populate: { path: 'contacts', select: 'username' }    
    })
    .populate({
        path: 'groups',
        populate: ['_id', 'name', { path: 'users', select: 'username' }]
    })
    .populate({
        path: 'language',
        populate: ['flag', 'name', 'code']
    })
    
    console.log(user);
        return user;
    },
    messages: async () => {
        return Message.find().populate('sender').populate('receiver').populate('room');
    },
    message: async (parent, { _id }) => {
        return Message.findOne({ _id }).populate('sender').populate('receiver').populate('room');
    },
    rooms: async () => {
        return Room.find().populate('users').populate('messages').populate('Notification');
    },
    room: async (parent, { _id }) => {
        return Room.findOne({ _id }).populate('users').populate('messages').populate('Notification');
    },
    contactList: async () => {
        return ContactList.find().populate('user').populate('contacts');
    },
    contactLists: async () => {
        return ContactList.find().populate('user').populate('contacts');
    },
    groups: async () => {
        return Group.find().populate('users');
    },
    translations: async () => {
        return Translation.find().populate('senderId').populate('receiverId');
    },
    notification: async (parent, { _id }) => {
        return Notification.findOne({ _id }).populate('message').populate('sender').populate('receiver').populate('room');
    },
    notifications: async () => {
        return Notification.find().populate('message').populate('sender').populate('receiver').populate('room');
    },
    group: async (parent, { _id }) => {
        return Group.findOne({ _id }).populate('users');
    },
    translation: async (parent, { _id }) => {
        return Translation.findOne({ _id }).populate('senderId').populate('receiverId');
    },
},
  Mutation: {
    login: async (parent, { email, password }) => {
        const user = await User.findOne({
            email
        });
        
        if (!user) {
            throw createAuthenticationError('No user found with this email address');
        }
        
        console.log(user); 
        console.log(password);
        const correctPw = await user.isCorrectPassword(password);
        
        console.log("JWT Secret:", process.env.SECRET);
        if (!correctPw) {
            throw createAuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);
        return { token, user };
    },
    logout: async (parent, args, context) => {
        if (context.user) {
            return context.user;
        }
        throw createAuthenticationError('You need to be logged in!');

    },
    addUser: async (parent, { languageCode, password, ...otherArgs }) => {
        console.log("Adding user with language code:", password)
        
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            throw new Error('Password does not meet complexity requirements.');
        }
    
        const language = await Language.findOne({ code: languageCode });
        if (!language) {
            throw new Error(`Language with code ${languageCode} not found.`);
        }
    
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        // Include the hashed password and language ID in the user's data
        const userArgs = {
            ...otherArgs,
            password: hashedPassword,
            language: language._id,
        };
    
        // Create the user
        const user = await User.create(userArgs);
    
        // After user creation, create a new ContactList and link it to the user
        const newContactList = await ContactList.create({ user: user._id, contacts: [] });
    
        // Update the user document with the contactList ID
        user.contactList = newContactList._id;
        await user.save();
    
        const token = signToken(user);
        
        return { token, user };
    },
    
    updateUser: async (parent, { password, languageCode, ...args }, context) => {
        if (!context.user) {
          throw new Error('You need to be logged in!');
        }
      
        let updateObject = args;
      
        if (password) {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(password, saltRounds);
          updateObject.password = hashedPassword;
        }
      
        if (languageCode) {
          const language = await Language.findOne({ code: languageCode });
          if (!language) {
            throw new Error(`Language with code '${languageCode}' not found.`);
          }
          updateObject.language = language._id;
        }
      
        await User.findByIdAndUpdate(context.user._id, updateObject, { new: true });
        
        // Generate a new token for the updated user
        const updatedUser = await User.findById(context.user._id);
        const token = signToken(updatedUser);
      
        return { user: updatedUser, token };
      },      
    deleteUser: async (parent, args, context) => {
        if (context.user) {
            const deletedUser = await User.findByIdAndDelete(context.user._id);

            return deletedUser;
        }

        throw createAuthenticationError('You need to be logged in!');
    },
    addContactList: async (parent, args) => {
        const contactList = await ContactList.create(args);
        return contactList;
    },
    addContact: async (parent, { contactId }, context) => {
        if (!context.user) throw new AuthenticationError('You must be logged in!');
    
        // Find the user's contact list
        const contactList = await ContactList.findOne({ user: context.user._id });
        if (!contactList) throw new Error('Contact list not found.');
    
        // Add the contact if it's not already in the list
        if (!contactList.contacts.includes(contactId)) {
            contactList.contacts.push(contactId);
            await contactList.save();
        }
        
        return await User.findById(context.user._id).populate('contactList');
    },
    removeContact: async (parent, { contactId }, context) => {
        if (!context.user) throw new AuthenticationError('You must be logged in!');
    
        const contactList = await ContactList.findOne({ user: context.user._id });
        if (!contactList) throw new Error('Contact list not found.');
    
        contactList.contacts = contactList.contacts.filter(id => id.toString() !== contactId);
        await contactList.save();
    
        return await User.findById(context.user._id).populate('contactList');
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

        throw createAuthenticationError('You need to be logged in!');
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

        throw createAuthenticationError('You need to be logged in!');
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

        throw createAuthenticationError('You need to be logged in!');
    },
    addMessage: async (parent, { messageContent, roomId, userIds }, context) => {
        if (!context.user) {
            throw createAuthenticationError('You need to be logged in!');
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
        throw createAuthenticationError('You need to be logged in!');

    },
    deleteMessages: async (parent, { room }, context) => {
        if (context.user) {
            const messages = await Message.deleteMany({ room, sender: context.user._id });

            return messages;
        }
        throw createAuthenticationError('You need to be logged in!');
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
        throw createAuthenticationError('You need to be logged in!');
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
        throw createAuthenticationError('You need to be logged in!');
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
