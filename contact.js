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

<<<<<<< HEAD
    // add contact in promise
=======
>>>>>>> d2c991271cdd05c20e2dc870cf36e5a414936335
    addContact(name, company, phone, email) {
        this.name = name;
        this.company = company;
        this.phone = phone;
        this.email = email;
        
<<<<<<< HEAD
        return new Promise((resolve, reject)=> {
            let query = `INSERT INTO ${this.table}(name, company, phoneNumber, email)
                    VALUES("${this.name}", "${this.company}", "${this.phone}", "${this.email}")`;
            db.run(query, function(err) {
                if(!err) {
                    let id = this.lastID;
                    resolve(id)
                } else {
                    reject(err)
                }              
            })
        })
    }

    // contact list in promise
    contactList() {
        let query = `SELECT * FROM ${this.table}`;
        return new Promise((resolve, reject)=> {
            db.all(query, (err, data) => {
                if(!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        })
        
    }

    //update in promise
=======
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

>>>>>>> d2c991271cdd05c20e2dc870cf36e5a414936335
    updateContact(id, name, company, phone, email) {
        this.id = id;
        this.name = name;
        this.company = company;
        this.phone = phone;
        this.email = email;

        let query = `UPDATE ${ this.table } SET 
            name = "${ this.name }", company = "${ this.company }", 
            phoneNumber = "${ this.phone }", email = "${ this.email }"  WHERE id = "${ this.id }"`;
<<<<<<< HEAD
        return new Promise((resolve, reject)=> {
            db.run(query, function(err) { 
                if(!err) {
                    resolve(this)
                } else {
                    reject(err)
                }
            })
        })
		
    }

    // delete contact promise
    deleteContact(id) {
        this.id = id;
        let query = `DELETE FROM ${ this.table }  WHERE id = "${ this.id }"`;
        return new Promise((resolve, reject)=> {
            db.run(query, (err) => { 
                resolve(this.id);
                reject(err);                
            })
        })
		
    }

    // find contact in promise
    findContact(id) {
        this.id = id;
        let query = `SELECT * FROM ${this.table} WHERE id = ${this.id}`;
        return new Promise((resolve, reject)=> {
            db.get(query, (err, data) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
        
=======
		db.run(query, (err) => { })
    }

    deleteContact(id) {
        this.id = id;
        let query = `DELETE FROM ${ this.table }  WHERE id = "${ this.id }"`;
		db.run(query, (err) => { })
>>>>>>> d2c991271cdd05c20e2dc870cf36e5a414936335
    }

}

module.exports = Contact