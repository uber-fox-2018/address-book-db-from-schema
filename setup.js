const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('address_book.db');

const createContactTable = `
  CREATE TABLE IF NOT EXISTS contacts (
    contactId INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR, 
    phoneNumber INTEGER,
    company VARCHAR,
    email VARCHAR
  );
`;

db.run(createContactTable, err => {
  err ? console.log(err) : console.log('Table successfully created.');
});

const createGroupTable = `
  CREATE TABLE IF NOT EXISTS groups (
    groupId INTEGER PRIMARY KEY AUTOINCREMENT, 
    name VARCHAR, 
    description TEXT
  );
`;

db.run(createGroupTable, err => {
  err ? console.log(err) : console.log(`Table successfully created.`);
});

const createGroupContacts = `
  CREATE TABLE IF NOT EXISTS groupContacts (
    groupContactId INTEGER PRIMARY KEY AUTOINCREMENT, 
    groupId INTEGER FOREIGNKEY,
    contactId INTEGER FOREIGNKEY
  );
`;

db.run(createGroupContacts, err => {
  err ? console.log(err) : console.log(`Table successfully created.`);
});