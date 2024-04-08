import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      firstName
      lastName
      email
      groups {
        _id
        name
        users {
          _id
          username
        }
      }
      messages {
        _id
        originalContent
        translationContent
        sender {
          _id
          username
        }
        receiver {
          _id
          username
        }
        room {
          _id
          name
        }
        translation {
          _id
          translationMessage
        }
      }
      notifications {
        _id
        message {
          _id
          originalContent
          translationContent
        }
        sender {
          _id
          username
        }
        receiver {
          _id
          username
        }
        timestamp
        room {
          _id
          name
        }
        read
        type
      }
      translations {
        _id
        senderDesiredLanguage
        senderId {
          _id
          username
        }
        receiverDesiredLanguage
        receiverId {
          _id
          username
        }
        translationMessage
        timestamp
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      groups {
        _id
        name
        users {
          _id
          username
        }
      }
      translations {
        _id
        senderDesiredLanguage
        senderId {
          _id
          username
        }
        receiverDesiredLanguage
        receiverId {
          _id
          username
        }
        translationMessage
        timestamp
      }
      contactList {
        _id
        user {
          _id
          username
        }
        contacts {
          _id
          username
        }
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      groups {
        _id
        name
        users {
          _id
          username
        }
      }
      translations {
        _id
        senderDesiredLanguage
        senderId {
          _id
          username
        }
        receiverDesiredLanguage
        receiverId {
          _id
          username
        }
        translationMessage
        timestamp
      }
      contactList {
        _id
        user {
          _id
          username
        }
        contacts {
          _id
          username
        }
      }
    }
  }
`;

export const QUERY_MESSAGES = gql`
  query messages {
    messages {
      _id
      originalContent
      translationContent
      sender {
        _id
        username
      }
      receiver {
        _id
        username
      }
      room {
        _id
        name
      }
      translation {
        _id
        translationMessage
      }
    }
  }
`;

export const QUERY_MESSAGE = gql`
  query message($id: ID!) {
    message(_id: $id) {
      _id
      originalContent
      translationContent
      sender {
        _id
        username
      }
      receiver {
        _id
        username
      }
      room {
        _id
        name
      }
      translation {
        _id
        translationMessage
      }
    }
  }
`;

export const QUERY_ROOMS = gql`
  query rooms {
    rooms {
      _id
      name
      users {
        _id
        username
      }
      messages {
        _id
        originalContent
        translationContent
        sender {
          _id
          username
        }
        receiver {
          _id
          username
        }
        room {
          _id
          name
        }
        translation {
          _id
          translationMessage
        }
      }
      senderDesiredLanguage
      receiverDesiredLanguages
      Notification {
        _id
        message {
          _id
          originalContent
          translationContent
        }
        sender {
          _id
          username
        }
        receiver {
          _id
          username
        }
        timestamp
        read
        type
      }
    }
  }
`;

export const QUERY_ROOM = gql`
  query room($id: ID!) {
    room(_id: $id) {
      _id
      name
      users {
        _id
        username
      }
      messages {
        _id
        originalContent
        translationContent
        sender {
          _id
          username
        }
        receiver {
          _id
          username
        }
        room {
          _id
          name
        }
        translation {
          _id
          translationMessage
        }
      }
      senderDesiredLanguage
      receiverDesiredLanguages
      Notification {
        _id
        message {
          _id
          originalContent
          translationContent
        }
        sender {
          _id
          username
        }
        receiver {
          _id
          username
        }
        timestamp
        read
        type
      }
    }
  }
`;

export const QUERY_CONTACTLISTS = gql`
  query contactLists {
    contactLists {
      _id
      user {
        _id
        username
      }
      contacts {
        _id
        username
      }
    }
  }
`;

export const QUERY_CONTACTLIST = gql`
  query contactList($id: ID!) {
    contactList(_id: $id) {
      _id
      user {
        _id
        username
      }
      contacts {
        _id
        username
      }
    }
  }
`;

export const QUERY_GROUPS = gql`
  query groups {
    groups {
      _id
      name
      users {
        _id
        username
      }
    }
  }
`;

export const QUERY_GROUP = gql`
  query group($id: ID!) {
    group(_id: $id) {
      _id
      name
      users {
        _id
        username
      }
    }
  }
`;

export const QUERY_TRANSLATIONS = gql`
  query translations {
    translations {
      _id
      senderDesiredLanguage
      senderId {
        _id
        username
      }
      receiverDesiredLanguage
      receiverId {
        _id
        username
      }
      translationMessage
      timestamp
    }
  }
`;

export const QUERY_TRANSLATION = gql`
  query translation($id: ID!) {
    translation(_id: $id) {
      _id
      senderDesiredLanguage
      senderId {
        _id
        username
      }
      receiverDesiredLanguage
      receiverId {
        _id
        username
      }
      translationMessage
      timestamp
    }
  }
`;

export const QUERY_NOTIFICATIONS = gql`
  query notifications {
    notifications {
      _id
      message {
        _id
        originalContent
        translationContent
      }
      sender {
        _id
        username
      }
      receiver {
        _id
        username
      }
      timestamp
      room {
        _id
        name
      }
      read
      type
    }
  }
`;

export const QUERY_NOTIFICATION = gql`
  query notification($id: ID!) {
    notification(_id: $id) {
      _id
      message {
        _id
        originalContent
        translationContent
      }
      sender {
        _id
        username
      }
      receiver {
        _id
        username
      }
      timestamp
      room {
        _id
        name
      }
      read
      type
    }
  }
`;

export const QUERY_LANGUAGES = gql`
  query languages {
    languages {
      _id
      name
    }
  }
`;

export const QUERY_LANGUAGE = gql`
  query language($id: ID!) {
    language(_id: $id) {
      _id
      name
    }
  }
`;

