const typeDefs = `
    type User {
        _id: ID
        username: String
        firstName: String
        lastName: String
        email: String
        groups: [Group]
        messages: [Message]
        translations: [Translation]
        colorTheme: String
        language: [Language]
        contactList: [ContactList]
    }
    type Message {
        _id: ID
        originalContent: String
        translationContent: String
        sender: User
        receiver: User
        room: Room
        translation: Translation
    }
    type Room {
        _id: ID
        name: String
        users: [User]
        messages: [Message]
        senderDesiredLanguage: Language
        receiverDesiredLanguages: [Language]
        Notification: [Notification]
    }
    type ContactList {
        _id: ID
        user: User
        contacts: [User]
    }
    type Group {
        _id: ID
        name: String
        users: [User]
    }
    type Translation {
        _id: ID
        senderDesiredLanguage: Language
        senderId: User
        receiverDesiredLanguage: Language
        receiverId: User
        translationMessage: String
        timestamp: String
    }
    type Notification {
        _id: ID
        message: Message
        sender: User
        receiver: User
        timestamp: String
        room: Room
        read: Boolean
        type: String
    }
    
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        messages: [Message]
        message(_id: ID!): Message
        rooms: [Room]
        room(_id: ID!): Room
        contactLists: [ContactList]
        contactList(_id: ID!): ContactList
        groups: [Group]
        group(_id: ID!): Group
        translations: [Translation]
        translation(_id: ID!): Translation
        notifications: [Notification]
        notification(_id: ID!): Notification
        languages: [Language]
        language(_id: ID!): Language
    }

    type Mutation {
        login(email: String!, password: String!): Auth done
        addUser(username: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
        updateUser(username: String, firstName: String, lastName: String, email: String, password: String): User
        deleteUser(_id: ID!): User
        addContactList: ContactList
        addContact(contact: ID!): ContactList
        removeContact(contact: ID!): ContactList
        addGroup(name: String!): Group
        removeGroup(group: ID!): User
        addToGroup(group: ID!): Group
        removeFromGroup(group: ID!): Group
        addMessage(message: String!, roomId: ID!): Message
        deleteMessage(_id: ID!): Message
        deleteMessages(roomId: ID!): Room
        addRoom(name: String!): Room
        deleteRoom(_id: ID!): Room
        addTranslation(original: String!, translation: String!): Translation
        deleteTranslation(_id: ID!): Translation
        addNotification(message: ID!, sender: ID!, receiver: ID!, room: ID!): Notification
        deleteNotification(_id: ID!): Notification
    }

    type Subscription {
        messageAdded(roomId: ID!): Message
    }
`;

module.exports = typeDefs;