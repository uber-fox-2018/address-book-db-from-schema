const db = require('./config.js');

db.serialize(()=> {
    db.serialize( () => {
        let contacts = `CREATE TABLE IF NOT EXISTS contacts (
            id	    INTEGER PRIMARY KEY AUTOINCREMENT,
            name	VARCHAR,
            company	VARCHAR,
            phoneNumber	VARCHAR,
            email	VARCHAR
        );`;
        db.run(contacts);
    });
    
    db.serialize( () => {
        let groups = `CREATE TABLE IF NOT EXISTS groups (
            id	INTEGER PRIMARY KEY AUTOINCREMENT,
            name	VARCHAR
        );`;
        db.run(groups);
    });

    db.serialize( () => {
        let contact_group = `CREATE TABLE IF NOT EXISTS contact_group (
            id	INTEGER PRIMARY KEY AUTOINCREMENT,
            contactId	INTEGER,
            groupId	INTEGER,
            FOREIGN KEY(contactId) REFERENCES contacts(id),
            FOREIGN KEY(groupId) REFERENCES groups(id)
        );`;
        db.run(contact_group);
    });
});

db.close();






