const fs = require('fs')
const db = require('../db')

class Contact {

    static create(name, telp, company, email, callback) {
        let queryCreate = `INSERT INTO Contacts (name, telp, company, email)
                           VALUES ("${name}", "${telp}", "${company}", "${email}");`
                           db.run(queryCreate, (err) => {
                               if(err) throw err.message;
                           })
                           callback(null,name)
    }

    static update (id, name, telp, company, email, callback) {
        let queryUpdate = `UPDATE Contacts
                           SET name = "${name}", telp = "${telp}", company = "${company}", email = "${email}"
                           WHERE id = "${id}"`
                           db.run(queryUpdate, (err) => {
                               if(err) throw err.message;
                           })
                           callback(null, name)
    }

    static delete (id, callback) {
        let queryDelete = `DELETE FROM Contacts 
                           WHERE id = ${id}`
                           db.run(queryDelete, (err) => {
                               if(err) throw err.message;
                           })
                           callback(null, id)

    }

    static show (callback) {
        let queryShow = `SELECT * FROM Contacts`
                         db.each(queryShow, (err, data) => {
                             if(err) {
                                err.message;
                             }else {
                                callback(null, data)
                             }
                         })
                        
    }

    static transfer (callback) {
        let contacts = JSON.parse(fs.readFileSync('./data/contacts.json', 'utf8'))
        
        db.serialize(() => {
            for(let i=0; i<contacts.length; i++){
                let query = `INSERT INTO Contacts
                             (name, telp, company, email)
                             VALUES ("${contacts[i].name}", "${contacts[i].telp}", "${contacts[i].company}", "${contacts[i].email}")`
                             db.run(query, (err) => {
                                 if(err) throw err.message;
                             })
            }
            callback(null)
        })
        
    }

}

module.exports = Contact;