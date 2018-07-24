const db = require('./conf')

let tableContact = `CREATE TABLE IF NOT EXISTS contacts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name VARCHAR (25),
                    company_name VARCHAR (50),
                    phone VARCHAR (50) UNIQUE,
                    email TEXT UNIQUE)`

let tableGroup = `CREATE TABLE IF NOT EXISTS groups (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name VARCHAR (25))`

let tableGroupContact = `CREATE TABLE IF NOT EXISTS contactGroup (
                         id INTEGER PRIMARY KEY AUTOINCREMENT,
                         contactId INTEGER,
                         groupId INTEGER ,
                         FOREIGN KEY (contactId) REFERENCES Contacts(id),
                         FOREIGN KEY (groupId) REFERENCES Groups(id))`

db.serialize(function(){
    db.run(tableContact)
    db.run(tableGroup)
    db.run(tableGroupContact)
})

    
