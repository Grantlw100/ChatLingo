const db = require('./connection');
const {User, Message, Room, ContactList, Group, Translation} = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    await cleanDB('User', 'users');
    await cleanDB('Message', 'messages');
    await cleanDB('Room', 'rooms');
    await cleanDB('ContactList', 'contactlists');
    await cleanDB('Group', 'groups');
    await cleanDB('Translation', 'translations');


  const modelName1 = await modelName1.insertMany([
    ]);

  console.log('modelName1 seeded');

  const modelName2 = await modelName2.insertMany([
  ]);

  console.log('products seeded');

  await User.create({
    username: 'user1',
    firstName: 'user',
    lastName: '1',
    email: 'email@testmail.com',
    password: 'password12345',
    modelRelated: [
    ]
  });

  await User.create({
    username: 'user2',
    firstName: 'user',
    lastName: '2',
    email: 'email@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
