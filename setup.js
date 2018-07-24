const db = require('./db')

class Create {
    
    static tableContacs() {
        let query = `CREATE TABLE IF NOT EXISTS Contacts (
                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                     name VARCHAR(100),
                     telp VARCHAR(12),
                     company VARCHAR(50),
                     email VARCHAR(50),
                     UNIQUE(telp)
                     UNIQUE(email)
                    )`
                    db.run(query, (err) => {
                        if(err) throw err;
                    })
    }

    static tableGroups() {
        let query = `CREATE TABLE IF NOT EXISTS Groups (
                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                     name VARCHAR(100)
                     )`
                     db.run(query, (err) => {
                        if(err) throw err;
                    })
    }

    static tableContacGroup() {
        let query = `CREATE TABLE IF NOT EXISTS ContacGroups (
                     id INTEGER PRIMARY KEY AUTOINCREMENT, 
                     contactId INTEGER,
                     groupId INTEGER,
                     FOREIGN KEY(contactId) REFERENCES Contacts(id),
                     FOREIGN KEY(groupId) REFERENCES Groups(id)
                     )`
                     db.run(query, (err) => {
                        if(err) throw err;
                    })
    }

}

Create.tableContacs()
Create.tableGroups()
Create.tableContacGroup()