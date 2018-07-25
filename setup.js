var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./address.db');

function createTable() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS contacts 
            (contactId INTEGER PRIMARY KEY AUTOINCREMENT,
             name VARCHAR, 
             phoneNumber INTEGER, 
             email VARCHAR);`);

        db.run(`CREATE TABLE IF NOT EXISTS groups 
                (groupId INTEGER PRIMARY KEY AUTOINCREMENT,
                groupName VARCHAR);`);

        db.run(`CREATE TABLE IF NOT EXISTS contacts_group 
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
            groupId INTEGER,
            contactId INTEGER);`)

    })
}

createTable()
module.exports = db;