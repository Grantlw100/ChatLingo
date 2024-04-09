const db = require('./connection');
const {User, Message, Room, ContactList, Group, Translation, Notification, Language} = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    await cleanDB('User', 'users');
    await cleanDB('Message', 'messages');
    await cleanDB('Room', 'rooms');
    await cleanDB('ContactList', 'contactlists');
    await cleanDB('Group', 'groups');
    await cleanDB('Translation', 'translations');
    await cleanDB('Notification', 'notifications');
    await cleanDB('Language', 'languages');



  process.exit();
});
