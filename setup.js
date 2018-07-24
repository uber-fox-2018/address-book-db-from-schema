const db = require('./models/db')

class createDatabase {
    static createTable(){
        let query_contact = `CREATE TABLE Contacts (
                             id INTEGER PRIMARY KEY AUTOINCREMENT,
                             name VARCHAR,
                             company VARCHAR,
                             phone VARCHAR,
                             email VARCHAR UNIQUE)`

        let query_group = `CREATE TABLE Groups (
                           id INTEGER PRIMARY KEY AUTOINCREMENT,
                           group_name VARCHAR)`

        let query_groupContacts = `CREATE TABLE groupContacts (
                                   id INTEGER PRIMARY KEY AUTOINCREMENT,
                                   contactId INTEGER,
                                   groupId INTEGER,
                                   FOREIGN KEY (contactId) REFERENCES Contacts(id),
                                   FOREIGN KEY (groupId) REFERENCES Groups(id))`

        db.serialize(function(){
            db.run(query_contact, function(err){
                if (err) throw err
                console.log(`contacts table has been created!`);
            })

            db.run(query_group, function(err) {
                if(err) throw err
                console.log(`groups table has been created!`);
            })
            
            db.run(query_groupContacts, function(err) {
                if (err) throw err
                console.log(`groupContacts table has been created!`);
            })
        })
    }
}

createDatabase.createTable()