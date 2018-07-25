const db = require('./db.js')

function createTabel(){
    db.serialize(function(){

        db.run(`CREATE TABLE IF NOT EXISTS Contacts 
                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR, office VARCHAR, phone VARCHAR UNIQUE,
                 email TEXT UNIQUE)`)
        
        db.run(`CREATE TABLE IF NOT EXISTS Groups 
               (id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR)`)

        db.run(`CREATE TABLE IF NOT EXISTS ContactGroup 
                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                contactId INTEGER,
                groupId INTEGER,
                FOREIGN KEY (contactId) REFERENCES Contacts(id),
                FOREIGN KEY (groupId) REFERENCES Groups(id))`)

    })

    
}

createTabel()