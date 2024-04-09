import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout 
  }
`;


export const ADD_USER = gql`
mutation addUser(
  $username: String!
  $firstName: String!
  $lastName: String!
  $email: String!
  $password: String!
  $colorTheme: String
  $languageCode: String
) {
  addUser(
    username: $username
    firstName: $firstName
    lastName: $lastName
    email: $email
    password: $password
    colorTheme: $colorTheme
    languageCode: $languageCode
  ) {
    token
    user {
      _id
      username
      email
      colorTheme
      language {
        _id
        code
      }
    }
  }
}
`;

export const UPDATE_USER = gql`
mutation updateUser(
  $username: String
  $firstName: String
  $lastName: String
  $email: String
  $password: String
  $colorTheme: String
  $languageCode: String
) {
  updateUser(
    username: $username
    firstName: $firstName
    lastName: $lastName
    email: $email
    password: $password
    colorTheme: $colorTheme
    languageCode: $languageCode
  ) {
    _id
    username
    firstName
    lastName
    email
    colorTheme
    language {
      code
      name
    }
  }
}
`;

export const ADD_CONTACT_LIST = gql`
  mutation addContactList {
    addContactList {
      _id
    }
  }
`;

export const ADD_CONTACT = gql`
  mutation addContact($contactId: ID!) {
    addContact(contactId: $contactId) {
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


export const REMOVE_CONTACT = gql`
  mutation removeContact($contactId: ID!) {
    removeContact(contactId: $contactId) {
      _id
      username
      email
    }
  }
`;

export const ADD_GROUP = gql`
  mutation addGroup($name: String!) {
    addGroup(name: $name) {
      _id
      name
    }
  }
`;

export const REMOVR_GROUP = gql`
  mutation removeGroup($groupId: ID!) {
    removeGroup(groupId: $groupId) {
      _id
      name
    }
  }
`;

export const ADD_TO_GROUP = gql`
  mutation addToGroup($groupId: ID!) {
    addToGroup(groupId: $groupId) {
      _id
      name
    }
  }
`;

export const REMOVE_FROM_GROUP = gql`
  mutation removeFromGroup($groupId: ID!) {
    removeFromGroup(groupId: $groupId) {
      _id
      name
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($message: String!, $receiverId: ID!) {
    addMessage(message: $message, receiverId: $receiverId) {
      _id
      message
      sender {
        _id
        username
      }
      receiver {
        _id
        username
      }
      timestamp
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation deleteMessage($messageId: ID!) {
    deleteMessage(messageId: $messageId) {
      _id
      message
      sender {
        _id
        username
      }
      receiver {
        _id
        username
      }
      timestamp
    }
  }
`;

export const DELETE_MESSAGES = gql`
  mutation deleteMessages {
    deleteMessages {
      _id
      message
      sender {
        _id
        username
      }
      receiver {
        _id
        username
      }
      timestamp
    }
  }
`;

export const ADD_ROOM = gql`
  mutation addRoom($name: String!) {
    addRoom(name: $name) {
      _id
      name
    }
  }
`;

export const DELETE_ROOM = gql`
  mutation deleteRoom($roomId: ID!) {
    deleteRoom(roomId: $roomId) {
      _id
      name
    }
  }
`;

export const ADD_TRANSLATION = gql`
  mutation addTranslation(
    $senderDesiredLanguage: ID!
    $receiverDesiredLanguage: ID!
    $translationMessage: String!
  ) {
    addTranslation(
      senderDesiredLanguage: $senderDesiredLanguage
      receiverDesiredLanguage: $receiverDesiredLanguage
      translationMessage: $translationMessage
    ) {
      _id
      senderDesiredLanguage {
        _id
        name
      }
      receiverDesiredLanguage {
        _id
        name
      }
      translationMessage
    }
  }
`;

export const DELETE_TRANSLATION = gql`
  mutation deleteTranslation($translationId: ID!) {
    deleteTranslation(translationId: $translationId) {
      _id
      senderDesiredLanguage {
        _id
        name
      }
      receiverDesiredLanguage {
        _id
        name
      }
      translationMessage
    }
  }
`;

export const ADD_NOTIFICATION = gql`
  mutation addNotification($messageId: ID!, $receiverId: ID!) {
    addNotification(messageId: $messageId, receiverId: $receiverId) {
      _id
      message {
        _id
        message
        sender {
          _id
          username
        }
        receiver {
          _id
          username
        }
        timestamp
      }
      receiver {
        _id
        username
      }
      timestamp
    }
  }
`;

export const DELETE_NOTIFICATION = gql`
  mutation deleteNotification($notificationId: ID!) {
    deleteNotification(notificationId: $notificationId) {
      _id
      message {
        _id
        message
        sender {
          _id
          username
        }
        receiver {
          _id
          username
        }
        timestamp
      }
      receiver {
        _id
        username
      }
      timestamp
    }
  }
`;

