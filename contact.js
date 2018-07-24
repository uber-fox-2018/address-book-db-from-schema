const db = require('./config.js');

class Contact {
    
    constructor(id, name, company, phone, email) {
        this.table = 'contacts';
        this.id = id;
        this.name = name;
        this.company = company;
        this.phone = phone;
        this.email = email;
    }

    addContact(name, company, phone, email) {
        this.name = name;
        this.company = company;
        this.phone = phone;
        this.email = email;
        
        let query = `INSERT INTO ${this.table}(name, company, phoneNumber, email)
                    VALUES("${this.name}", "${this.company}", "${this.phone}", "${this.email}")`;
        db.run(query)
    }

    contactList(cb) {
        let query = `SELECT * FROM ${this.table}`;
        db.all(query, (err, data) => {
            cb(data)
        })
    }

    updateContact(id, name, company, phone, email) {
        this.id = id;
        this.name = name;
        this.company = company;
        this.phone = phone;
        this.email = email;

        let query = `UPDATE ${ this.table } SET 
            name = "${ this.name }", company = "${ this.company }", 
            phoneNumber = "${ this.phone }", email = "${ this.email }"  WHERE id = "${ this.id }"`;
		db.run(query, (err) => { })
    }

    deleteContact(id) {
        this.id = id;
        let query = `DELETE FROM ${ this.table }  WHERE id = "${ this.id }"`;
		db.run(query, (err) => { })
    }

}

module.exports = Contact