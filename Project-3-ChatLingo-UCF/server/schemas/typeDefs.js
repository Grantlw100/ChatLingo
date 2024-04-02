const typeDefs = `
    type User {
        _id: ID
        username: String
        firstName: String
        lastName: String
        email: String
        friends: [User]
        groups: [Group]
        messages: [Message]
        translations: [Translation]
        colorTheme: String
        language: String
        contactList: [ContactList]
    }
    type Message {
        _id: ID
        messageContent: String
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
        messages: [Message]
    }
    
    type Translation {
        _id: ID
        original: String
        translation: String
        user: User
        languageToLanguage: String
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
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
        addFriend(friendId: ID!): User
        addGroup(name: String!): Group
        addMessage(message: String!, roomId: ID!): Message
        addRoom(name: String!): Room
        addTranslation(original: String!, translation: String!): Translation
    }

    type Subscription {
        messageAdded(roomId: ID!): Message
    }
`;

module.exports = typeDefs;