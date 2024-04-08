// utils/notificationHelpers.js
const Notification = require('../models/Notification'); // Adjust the path as necessary

async function createNotification({ message, senderId, receiverId, roomId, type }) {
    type = req.body.type;
    switch  (type) {
        case 'Group':
            message = `${senderId} added you to a Group ${roomId}`;
            break;
        case 'Contact':
            message = `${senderId} added you to a contact list ${roomId}`;
            break;
        case 'Room':
            message = `${senderId} added you to a room ${roomId}`;
            break;
        default:
            message = `${senderId} sent you a message in room ${roomId}`;
            break;
    }
  const notification = await Notification.create({
    message,
    sender: senderId,
    receiver: receiverId,
    room: roomId,
    type, // Consider adding a 'type' field to distinguish between notification causes
    read: false,
  });

  return notification;
}

module.exports = {
  createNotification,
};
